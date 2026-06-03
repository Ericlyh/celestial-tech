'use client'

import { useEffect, useState, useMemo } from 'react'
import { marked, Marked, Tokens } from 'marked'
import DOMPurify from 'isomorphic-dompurify'

// Configure marked once — gfm + line breaks, no syntax highlight (we keep it portable)
const markedInstance = new Marked({
  gfm: true,
  breaks: true,
})

interface MarkdownRendererProps {
  content: string
  onHeadingsExtracted?: (headings: Array<{ id: string; text: string; level: number }>) => void
}

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^\p{Letter}\p{Number}\s-]/gu, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')

/**
 * Walk the token tree and add `id` attributes to heading tokens so we
 * can deep-link to them. Mutates the tree in place.
 */
function annotateHeadings(tokens: TokensList) {
  const seen = new Map<string, number>()
  const walk = (list: Tokens.Generic[]) => {
    for (const t of list) {
      if (t.type === 'heading') {
        const h = t as Tokens.Heading
        const base = slugify(h.text) || 'section'
        const n = (seen.get(base) ?? 0) + 1
        seen.set(base, n)
        h.text = `<a href="#${base}" class="heading-anchor" aria-hidden="true">#</a>${h.text}`
      }
    }
  }
  walk(tokens)
}

type TokensList = ReturnType<typeof markedInstance.lexer>

export default function MarkdownRenderer({ content, onHeadingsExtracted }: MarkdownRendererProps) {
  const [html, setHtml] = useState('')
  const [headings, setHeadings] = useState<Array<{ id: string; text: string; level: number }>>([])

  // Pre-parse once per content change to extract heading metadata.
  const tokens = useMemo<TokensList>(() => {
    if (!content) return [] as unknown as TokensList
    return markedInstance.lexer(content) as unknown as TokensList
  }, [content])

  useEffect(() => {
    if (!content) {
      setHtml('')
      setHeadings([])
      return
    }

    let cancelled = false

    async function parse() {
      // Re-parse from original content (tokens were mutated by annotateHeadings)
      const rawTokens = markedInstance.lexer(content) as unknown as TokensList

      // Build headings list (id, level, text)
      const found: Array<{ id: string; text: string; level: number }> = []
      const seen = new Map<string, number>()
      for (const t of rawTokens) {
        if (t.type === 'heading') {
          const h = t as Tokens.Heading
          const base = slugify(h.text) || 'section'
          const n = (seen.get(base) ?? 0) + 1
          seen.set(base, n)
          const id = base
          found.push({ id, text: h.text, level: h.depth })
          // mutate token so it renders with id
          ;(h as Tokens.Heading & { _id?: string })._id = id
        }
      }

      // Inject id into raw HTML — marked v9 doesn't let us pass attributes easily,
      // so we add an `id` attribute by hand on the emitted <hN> tags.
      let raw = await marked.parse(content)
      if (cancelled) return

      // Sanitize HTML — defense in depth against any XSS in DB content
      raw = DOMPurify.sanitize(raw as string, {
        ADD_ATTR: ['target', 'rel', 'id', 'class'],
      }) as string

      // Add ids to h2/h3 in rendered HTML, plus wrap headings with a paragraph-style
      // anchor link. Order matters: process the headings as they appear.
      let i = 0
      raw = raw.replace(/<(h[1-3])>([\s\S]*?)<\/\1>/g, (_m, tag, inner) => {
        if (i >= found.length) return _m
        const { id, text } = found[i++]
        // The inner text from marked is the escaped heading text; we strip surrounding
        // emphasis and emit it as both anchor link + visible text.
        const visible = text
        return `<${tag} id="${id}" class="md-heading"><span class="md-heading-text">${visible}</span><a href="#${id}" class="md-anchor-link" aria-label="Link to section">#</a></${tag}>`
      })

      // Inject classNames via DOM manipulation for everything else
      if (typeof window !== 'undefined') {
        const wrapper = document.createElement('div')
        wrapper.innerHTML = raw

        wrapper.querySelectorAll('h1').forEach((el) => {
          el.classList.add('text-3xl', 'md:text-4xl', 'font-bold', 'text-white', 'mt-12', 'mb-5', 'pb-3', 'border-b', 'border-stellar-cyan/20')
        })
        wrapper.querySelectorAll('h2').forEach((el) => {
          el.classList.add('md-h2')
        })
        wrapper.querySelectorAll('h3').forEach((el) => {
          el.classList.add('md-h3')
        })

        wrapper.querySelectorAll('p').forEach((el) => {
          el.classList.add('md-p')
        })

        wrapper.querySelectorAll('ul').forEach((el) => {
          el.classList.add('md-ul')
          el.querySelectorAll('li').forEach((li) => li.classList.add('md-li'))
        })
        wrapper.querySelectorAll('ol').forEach((el) => {
          el.classList.add('md-ol')
          el.querySelectorAll('li').forEach((li) => li.classList.add('md-li-numbered'))
        })

        wrapper.querySelectorAll('blockquote').forEach((el) => {
          el.classList.add('md-blockquote')
        })

        wrapper.querySelectorAll('a').forEach((el) => {
          if (el.classList.contains('md-anchor-link')) return
          el.classList.add('md-link')
          el.setAttribute('target', '_blank')
          el.setAttribute('rel', 'noopener noreferrer')
        })

        wrapper.querySelectorAll('table').forEach((el) => {
          const div = document.createElement('div')
          div.className = 'md-table-wrap'
          el.parentNode?.insertBefore(div, el)
          div.appendChild(el)
          el.classList.add('md-table')
        })
        wrapper.querySelectorAll('thead').forEach((el) => el.classList.add('md-thead'))
        wrapper.querySelectorAll('th').forEach((el) => el.classList.add('md-th'))
        wrapper.querySelectorAll('td').forEach((el) => el.classList.add('md-td'))

        wrapper.querySelectorAll('strong').forEach((el) => el.classList.add('md-strong'))
        wrapper.querySelectorAll('em').forEach((el) => el.classList.add('md-em'))

        // Code blocks: detect <pre><code class="language-X">
        wrapper.querySelectorAll('pre').forEach((el) => {
          el.classList.add('md-pre')
          const code = el.querySelector('code')
          const langMatch = code?.className?.match(/language-(\w+)/)
          const lang = langMatch?.[1] || ''
          // Build header
          const header = document.createElement('div')
          header.className = 'md-pre-header'
          const dot = document.createElement('span')
          dot.className = 'md-pre-dot'
          const langLabel = document.createElement('span')
          langLabel.className = 'md-pre-lang'
          langLabel.textContent = lang || 'text'
          header.appendChild(dot)
          header.appendChild(langLabel)
          el.insertBefore(header, el.firstChild)
        })
        wrapper.querySelectorAll('code').forEach((el) => {
          if (el.parentElement?.tagName === 'PRE') return
          el.classList.add('md-code-inline')
        })

        wrapper.querySelectorAll('hr').forEach((el) => el.classList.add('md-hr'))

        setHtml(wrapper.innerHTML)
      } else {
        setHtml(raw as string)
      }
      if (!cancelled) setHeadings(found)
      if (!cancelled) onHeadingsExtracted?.(found)
    }

    parse()
    return () => {
      cancelled = true
    }
  }, [content, onHeadingsExtracted])

  if (!content) return <div className="markdown-content" />
  return <div className="markdown-content" dangerouslySetInnerHTML={{ __html: html }} />
}

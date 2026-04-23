'use client'

import { useEffect, useState } from 'react'
import { marked } from 'marked'
import { Marked } from 'marked'

// Configure marked for GFM + line breaks using the new v9+ API
const markedInstance = new Marked({
  gfm: true,
  breaks: true,
})

interface MarkdownRendererProps {
  content: string
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const [html, setHtml] = useState('')

  useEffect(() => {
    if (!content) {
      setHtml('')
      return
    }

    let cancelled = false

    async function parseAndRender() {
      // marked.parse() is async in v9+ — must await
      const raw = await markedInstance.parse(content)
      if (cancelled) return

      // Apply HTML class mappings via DOM manipulation
      if (typeof window !== 'undefined') {
        const wrapper = document.createElement('div')
        wrapper.innerHTML = raw as string

        // Headings
        wrapper.querySelectorAll('h1').forEach(el => el.className = 'text-3xl font-bold text-white mt-10 mb-4 pb-2 border-b border-cyber-cyan/30')
        wrapper.querySelectorAll('h2').forEach(el => el.className = 'text-2xl font-bold text-white mt-10 mb-4 pl-4 border-l-2 border-cyber-cyan')
        wrapper.querySelectorAll('h3').forEach(el => el.className = 'text-xl font-semibold text-white/90 mt-8 mb-3')

        // Paragraphs
        wrapper.querySelectorAll('p').forEach(el => el.className = 'text-gray-300 leading-relaxed mb-6')

        // Lists — wrap in ul/ol with proper classes
        wrapper.querySelectorAll('ul').forEach(el => {
          el.className = 'list-none space-y-2 mb-6'
          el.querySelectorAll('li').forEach(li => {
            li.className = 'text-gray-200 leading-relaxed pl-2 relative before:absolute before:left-0 before:text-cyber-cyan before:content-["\\25E1"]'
          })
        })
        wrapper.querySelectorAll('ol').forEach(el => {
          el.className = 'list-decimal list-inside space-y-2 mb-6 text-gray-200'
        })

        // Blockquotes
        wrapper.querySelectorAll('blockquote').forEach(el => {
          el.className = 'border-l-4 border-cyber-purple pl-6 py-3 my-6 text-gray-400 italic bg-cyber-purple/5 rounded-r-lg'
        })

        // Links
        wrapper.querySelectorAll('a').forEach(el => {
          el.className = 'text-cyber-cyan hover:text-white underline underline-offset-2 transition-colors'
          el.setAttribute('target', '_blank')
          el.setAttribute('rel', 'noopener noreferrer')
        })

        // Tables — wrap in overflow-x-auto div
        wrapper.querySelectorAll('table').forEach(el => {
          const div = document.createElement('div')
          div.className = 'overflow-x-auto my-6'
          el.parentNode?.insertBefore(div, el)
          div.appendChild(el)
          el.className = 'w-full text-gray-300 text-sm border-collapse'
        })
        wrapper.querySelectorAll('thead').forEach(el => el.className = 'bg-white/5 text-white')
        wrapper.querySelectorAll('th').forEach(el => el.className = 'px-4 py-3 text-left font-semibold border border-white/5')
        wrapper.querySelectorAll('td').forEach(el => el.className = 'px-4 py-3 border border-white/5')
        wrapper.querySelectorAll('tr').forEach((el, i) => el.className = i % 2 === 0 ? '' : 'even:bg-white/[0.02]')

        // Strong, code, pre
        wrapper.querySelectorAll('strong').forEach(el => el.className = 'text-white font-semibold')
        wrapper.querySelectorAll('code').forEach(el => el.className = 'bg-white/5 px-2 py-0.5 rounded text-cyber-cyan font-mono text-sm')
        wrapper.querySelectorAll('pre').forEach(el => {
          el.className = 'bg-[#0d0d1a] border border-white/5 rounded-xl p-6 font-mono text-sm overflow-x-auto my-6'
        })
        wrapper.querySelectorAll('hr').forEach(el => el.className = 'border-white/10 my-8')

        setHtml(wrapper.innerHTML)
      } else {
        setHtml(raw as string)
      }
    }

    parseAndRender()

    return () => { cancelled = true }
  }, [content])

  if (!content) return <div className="markdown-content" />
  return <div className="markdown-content" dangerouslySetInnerHTML={{ __html: html }} />
}

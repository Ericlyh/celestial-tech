'use client'

import { useEffect, useState } from 'react'

interface Heading {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  headings: Heading[]
  label: string
}

/**
 * Floating right-rail TOC with scroll-spy. Active section is highlighted
 * with a stellar-cyan marker. Hidden on mobile (the article is short
 * enough that scroll-spy is more useful than a sticky rail).
 */
export default function TableOfContents({ headings, label }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    if (headings.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the first heading currently in the upper third of the viewport
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: '-80px 0px -65% 0px', threshold: 0 }
    )
    headings.forEach((h) => {
      const el = document.getElementById(h.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <nav aria-label={label} className="hidden lg:block sticky top-32 self-start">
      <div className="text-[10px] uppercase tracking-[0.2em] text-stellar-cyan/70 font-mono mb-4">
        {label}
      </div>
      <ul className="space-y-2 border-l border-white/[0.06] pl-4">
        {headings.map((h) => (
          <li key={h.id} className={h.level === 3 ? 'pl-4' : ''}>
            <a
              href={`#${h.id}`}
              className={`block text-sm leading-relaxed transition-colors duration-200 ${
                activeId === h.id
                  ? 'text-stellar-cyan'
                  : 'text-ink-300 hover:text-white'
              }`}
            >
              <span
                className={`inline-block w-3 mr-2 -ml-4 transition-all duration-200 ${
                  activeId === h.id
                    ? 'text-stellar-cyan opacity-100'
                    : 'text-stellar-cyan opacity-0'
                }`}
                aria-hidden="true"
              >
                —
              </span>
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

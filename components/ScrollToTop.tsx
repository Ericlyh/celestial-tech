'use client'

import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

/**
 * Floating "scroll to top" button. Appears after the user has scrolled past
 * one viewport. Pinned to the bottom-right with a stellar-cyan ring.
 */
export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // rAF-throttled so the button doesn't re-render on every scroll event
    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        setVisible((prev) => {
          const next = window.scrollY > window.innerHeight
          return next === prev ? prev : next
        })
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      className={`fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-space-mid/90 backdrop-blur-md border border-stellar-cyan/20 text-stellar-cyan flex items-center justify-center transition-all duration-300 hover:bg-stellar-cyan/10 hover:border-stellar-cyan/50 hover:-translate-y-0.5 shadow-[0_0_20px_rgba(94,234,212,0.15)] ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
      }`}
    >
      <ArrowUp size={16} />
    </button>
  )
}

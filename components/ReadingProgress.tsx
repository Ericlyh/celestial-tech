'use client'

import { useEffect, useState } from 'react'

/**
 * Top-of-page reading progress bar.
 * Pinned to the top of the viewport, fills with stellar-cyan as user scrolls
 * through the article.
 */
export default function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const article = document.getElementById('article-body')
      if (!article) {
        setProgress(0)
        return
      }
      const rect = article.getBoundingClientRect()
      const top = window.scrollY + rect.top
      const total = article.offsetHeight - window.innerHeight
      const scrolled = window.scrollY - top
      const pct = Math.max(0, Math.min(1, scrolled / Math.max(total, 1)))
      setProgress(pct)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] pointer-events-none"
      aria-hidden="true"
    >
      <div
        className="h-full bg-gradient-to-r from-stellar-cyan via-cosmic-violet to-nova-amber transition-[width] duration-150 ease-out"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  )
}

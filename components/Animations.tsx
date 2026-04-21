/* =============================================
   ANIMATIONS UTILITY LIBRARY
   Modern 2026 scroll-triggered micro-interactions
   Built on Framer Motion (already installed)
   ============================================= */

'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'

/* ─────────────────────────────────────────────
   TEXT SCRAMBLE EFFECT
   Characters randomize then resolve on load
   Inspired by: Framer/Nebula-style load animation
   ───────────────────────────────────────────── */
const CHARS = '!<>-_\\/[]{}—=+*^?#________'

export function useTextScramble(text: string, active: boolean = true) {
  const [displayText, setDisplayText] = useState(active ? text[0] ?? '' : text)
  const frameRef = useRef<number>(0)

  useEffect(() => {
    if (!active) {
      setDisplayText(text)
      return
    }

    let frame = 0
    const original = text
    const length = text.length

    const tick = () => {
      const scrambled = original
        .split('')
        .map((char, i) => {
          if (i < frame / (12 / length)) return char
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        })
        .join('')

      setDisplayText(scrambled)
      frame++
      frameRef.current = requestAnimationFrame(tick)
    }

    // Reset
    setDisplayText('')
    frame = 0
    frameRef.current = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(frameRef.current)
  }, [text, active])

  return displayText
}

export function ScrambledText({
  text,
  className,
  delay = 0,
  active = true,
}: {
  text: string
  className?: string
  delay?: number
  active?: boolean
}) {
  const [started, setStarted] = useState(false)
  const display = useTextScramble(text, started && active)

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  return <span className={className}>{display}</span>
}

/* ─────────────────────────────────────────────
   SCROLL-TRIGGERED NUMBER COUNTER
   Counts up from 0 to target when in view
   ───────────────────────────────────────────── */
export function CounterValue({
  target,
  suffix = '',
  prefix = '',
  duration = 2,
  className,
}: {
  target: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    let start: number | null = null
    const step = (timestamp: number) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / (duration * 1000), 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
      else setCount(target)
    }
    requestAnimationFrame(step)
  }, [isInView, target, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}

/* ─────────────────────────────────────────────
   STAGGERED SECTION REVEAL
   Wraps Framer Motion stagger with clip-path
   ───────────────────────────────────────────── */
export function RevealGroup({
  children,
  className,
  staggerDelay = 0.08,
  once = true,
}: {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
  once?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: staggerDelay },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function RevealItem({
  children,
  className,
  y = 24,
  duration = 0.5,
  clip = true,
}: {
  children: React.ReactNode
  className?: string
  y?: number
  duration?: number
  clip?: boolean
}) {
  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          y,
          ...(clip ? { clipPath: 'inset(0 0 100% 0)' } : {}),
        },
        visible: {
          opacity: 1,
          y: 0,
          ...(clip ? { clipPath: 'inset(0 0 0% 0)' } : {}),
        },
      }}
      transition={{ duration, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   MAGNETIC BUTTON EFFECT
   Button subtly follows cursor on hover
   ───────────────────────────────────────────── */
export function MagneticButton({
  children,
  className,
  strength = 0.3,
  onClick,
}: {
  children: React.ReactNode
  className?: string
  strength?: number
  onClick?: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    setPosition({
      x: (e.clientX - cx) * strength,
      y: (e.clientY - cy) * strength,
    })
  }, [strength])

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 })
    setHovered(false)
  }, [])

  return (
    <motion.div
      ref={ref}
      animate={position}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   GRADIENT MESH ANIMATION
   Animated gradient background orbs
   ───────────────────────────────────────────── */
export function GradientMesh({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <motion.div
        animate={{
          x: [0, 40, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute w-[500px] h-[500px] rounded-full bg-cyber-cyan/10 blur-[100px] -top-40 -left-40"
      />
      <motion.div
        animate={{
          x: [0, -50, 0],
          y: [0, 40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute w-[600px] h-[600px] rounded-full bg-cyber-purple/10 blur-[120px] top-1/2 -right-40"
      />
      <motion.div
        animate={{
          x: [0, 30, 0],
          y: [0, 50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        className="absolute w-[400px] h-[400px] rounded-full bg-cyber-cyan/8 blur-[80px] bottom-0 left-1/3"
      />
    </div>
  )
}

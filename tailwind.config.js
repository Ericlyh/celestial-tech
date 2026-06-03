/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // "Stellar Cartography" palette — deep space + stellar accents
        'deep-space': '#070A14',
        'space-mid': '#0E1322',
        'space-soft': '#161C30',
        'stellar-cyan': '#5EEAD4',
        'stellar-cyan-soft': '#A7F3D0',
        'cosmic-violet': '#A78BFA',
        'cosmic-violet-soft': '#C4B5FD',
        'nova-amber': '#F4B860',
        // Legacy aliases for backward compatibility
        'cyber-cyan': '#5EEAD4',
        'cyber-purple': '#A78BFA',
        'pure-white': '#FFFFFF',
        ink: {
          50:  '#F4F6FB',
          100: '#E2E8F0',
          200: '#CBD5E1',
          300: '#94A3B8',
          400: '#64748B',
          500: '#475569',
        },
      },
      fontFamily: {
        sans: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
        cjk: ['var(--font-noto-tc)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-grid':
          'linear-gradient(rgba(94, 234, 212, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(94, 234, 212, 0.04) 1px, transparent 1px)',
        'stellar-fade':
          'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(94, 234, 212, 0.15), transparent 70%)',
      },
      backgroundSize: {
        grid: '60px 60px',
      },
      animation: {
        'neon-pulse': 'neonPulse 2s ease-in-out infinite alternate',
        float: 'float 6s ease-in-out infinite',
        twinkle: 'twinkle 3s ease-in-out infinite',
        'orbit-slow': 'orbit 60s linear infinite',
      },
      keyframes: {
        neonPulse: {
          '0%': { opacity: '0.6', filter: 'blur(8px)' },
          '100%': { opacity: '1', filter: 'blur(12px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      boxShadow: {
        'neon-cyan': '0 0 20px rgba(94, 234, 212, 0.3), 0 0 40px rgba(94, 234, 212, 0.1)',
        'neon-purple': '0 0 20px rgba(167, 139, 250, 0.3), 0 0 40px rgba(167, 139, 250, 0.1)',
        'neon-amber': '0 0 20px rgba(244, 184, 96, 0.3), 0 0 40px rgba(244, 184, 96, 0.1)',
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
    },
  },
  plugins: [],
}

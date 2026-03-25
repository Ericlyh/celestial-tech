'use client'

import ReactMarkdown from 'react-markdown'
import type { Components } from 'react-markdown'

const components: Components = {
  h1: ({ children }) => (
    <h1 className="text-3xl font-bold text-white mt-10 mb-4 pb-2 border-b border-cyber-cyan/30">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl font-bold text-white mt-10 mb-4 pl-4 border-l-2 border-cyber-cyan">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl font-semibold text-white/90 mt-8 mb-3">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-gray-300 leading-relaxed mb-6">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="list-none space-y-2 mb-6">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside space-y-2 mb-6 text-gray-300">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="text-gray-300 leading-relaxed pl-2 relative before:absolute before:left-0 before:text-cyber-cyan before:content-['▹']">
      {children}
    </li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-cyber-purple pl-6 py-3 my-6 text-gray-400 italic bg-cyber-purple/5 rounded-r-lg">
      {children}
    </blockquote>
  ),
  code: ({ className, children, ...props }) => {
    const isInline = !className
    if (isInline) {
      return (
        <code className="bg-white/5 px-2 py-0.5 rounded text-cyber-cyan font-mono text-sm" {...props}>
          {children}
        </code>
      )
    }
    return (
      <code className={`${className} block bg-[#0d0d1a] border border-white/5 rounded-xl p-6 font-mono text-sm overflow-x-auto my-6`} {...props}>
        {children}
      </code>
    )
  },
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-cyber-cyan hover:text-white underline underline-offset-2 transition-colors"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full text-gray-300 text-sm border-collapse">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-white/5 text-white">{children}</thead>,
  th: ({ children }) => (
    <th className="px-4 py-3 text-left font-semibold border border-white/5">{children}</th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-3 border border-white/5">{children}</td>
  ),
  tr: ({ children }) => <tr className="even:bg-white/[0.02]">{children}</tr>,
  strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
  hr: () => <hr className="border-white/10 my-8" />,
}

interface MarkdownRendererProps {
  content: string
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="markdown-content">
      <ReactMarkdown components={components}>{content}</ReactMarkdown>
    </div>
  )
}

'use client'

import { marked } from 'marked'

// Configure marked for GFM + line breaks
marked.setOptions({
  gfm: true,
  breaks: true,
})

// Apply the same custom Tailwind classes the original ReactMarkdown components used
function renderContent(content: string): string {
  const dollarSign = '$'
  return content
    .replace(/<h1>/g, '<h1 class="text-3xl font-bold text-white mt-10 mb-4 pb-2 border-b border-cyber-cyan/30">')
    .replace(/<h2>/g, '<h2 class="text-2xl font-bold text-white mt-10 mb-4 pl-4 border-l-2 border-cyber-cyan">')
    .replace(/<h3>/g, '<h3 class="text-xl font-semibold text-white/90 mt-8 mb-3">')
    .replace(/<p>/g, '<p class="text-gray-300 leading-relaxed mb-6">')
    .replace(/<ul>/g, '<ul class="list-none space-y-2 mb-6">')
    .replace(/<ol>/g, '<ol class="list-decimal list-inside space-y-2 mb-6 text-gray-200">')
    .replace(/<li>/g, `<li class="text-gray-200 leading-relaxed pl-2 relative before:absolute before:left-0 before:text-cyber-cyan before:content-[" + dollarSign + "\\u25E1]">`)
    .replace(/<blockquote>/g, '<blockquote class="border-l-4 border-cyber-purple pl-6 py-3 my-6 text-gray-400 italic bg-cyber-purple/5 rounded-r-lg">')
    .replace(/<a /g, '<a class="text-cyber-cyan hover:text-white underline underline-offset-2 transition-colors" target="_blank" rel="noopener noreferrer" ')
    .replace(/<table>/g, '<div class="overflow-x-auto my-6"><table class="w-full text-gray-300 text-sm border-collapse">')
    .replace(/<\/table>/g, '</table></div>')
    .replace(/<thead>/g, '<thead class="bg-white/5 text-white">')
    .replace(/<th /g, '<th class="px-4 py-3 text-left font-semibold border border-white/5">')
    .replace(/<td /g, '<td class="px-4 py-3 border border-white/5">')
    .replace(/<tr>/g, '<tr class="even:bg-white/[0.02]">')
    .replace(/<strong>/g, '<strong class="text-white font-semibold">')
    .replace(/<hr>/g, '<hr class="border-white/10 my-8" />')
    .replace(/<code>/g, '<code class="bg-white/5 px-2 py-0.5 rounded text-cyber-cyan font-mono text-sm">')
    .replace(/<pre>/g, '<pre class="bg-[#0d0d1a] border border-white/5 rounded-xl p-6 font-mono text-sm overflow-x-auto my-6">')
}

interface MarkdownRendererProps {
  content: string
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  if (!content) return <div className="markdown-content" />
  const html = renderContent(marked.parse(content) as string)
  return (
    <div
      className="markdown-content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

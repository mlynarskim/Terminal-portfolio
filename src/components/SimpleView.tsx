import { useState, useRef, useEffect, KeyboardEvent } from 'react'
import { motion } from 'framer-motion'
import { projects } from '../data/projects'
import { useGeminiChat } from '../hooks/useGeminiChat'

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY ?? ''

const socials = [
  { label: 'GitHub',    url: 'https://github.com/mlynarskim',                      icon: '⌨️' },
  { label: 'LinkedIn',  url: 'https://www.linkedin.com/in/mateuszmlynarski/',       icon: '💼' },
  { label: 'X / Twitter', url: 'https://x.com/mlynarskimat',                       icon: '🐦' },
  { label: 'Instagram', url: 'https://www.instagram.com/mlynarskimat',              icon: '📸' },
]

const aiServices = [
  { icon: '🤖', label: 'AI Chatbots' },
  { icon: '📅', label: 'Booking Assistants' },
  { icon: '💬', label: 'Customer Support AI' },
  { icon: '🌐', label: 'AI-powered Websites' },
]

const clientDemos = [
  { icon: '💅', label: 'beauty-ai.demo', url: '/demos/beauty.html', color: '#FB7185' },
  { icon: '🔧', label: 'workshop-ai.demo', url: '/demos/workshop.html', color: '#F59E0B' },
  { icon: '🌾', label: 'agro-ai.demo', url: '/demos/agro.html', color: '#34D399' },
]

function MobileAssistant() {
  const [input, setInput] = useState('')
  const [open, setOpen] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  const { messages, loading, limitReached, sendMessage } = useGeminiChat({ apiKey: API_KEY })

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const handleSend = () => {
    if (!input.trim() || loading || limitReached) return
    sendMessage(input)
    setInput('')
    setOpen(true)
  }

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend()
  }

  return (
    <div
      className="rounded-xl border border-border overflow-hidden font-mono"
      style={{ background: '#0B0B0F' }}
    >
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border"
        style={{ background: '#12121A' }}>
        <div className="flex gap-1">
          {['#00FFB3', '#00FFB380', '#00FFB340'].map((c) => (
            <div key={c} className="w-1.5 h-1.5 rounded-full" style={{ background: c }} />
          ))}
        </div>
        <span className="text-[10px] text-muted flex-1">assistant.sh</span>
        <span className="text-[9px]" style={{ color: '#00FFB3' }}>● AI</span>
      </div>

      {open && messages.length > 0 && (
        <div className="px-4 py-3 space-y-3 max-h-64 overflow-auto">
          {messages.map((msg, i) => (
            <div key={i}>
              {msg.role === 'user' ? (
                <div className="flex items-start gap-2">
                  <span className="text-xs flex-shrink-0" style={{ color: '#00FFB3' }}>&gt;</span>
                  <span className="text-xs text-gray-200">{msg.content}</span>
                </div>
              ) : (
                <div className="pl-3 border-l-2 py-0.5" style={{ borderColor: '#00FFB330' }}>
                  <span className="text-xs text-gray-300 leading-relaxed">{msg.content}</span>
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="pl-3 border-l-2" style={{ borderColor: '#00FFB330' }}>
              <span className="text-xs text-muted animate-pulse">thinking...</span>
            </div>
          )}
          {limitReached && (
            <div className="text-center py-2">
              <div className="text-xs text-yellow-400">Demo limit reached.</div>
              <a href="mailto:mlynarski.mateusz@gmail.com"
                className="text-[10px] text-accent hover:underline">
                Contact for full implementation →
              </a>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      )}

      <div className="flex items-center gap-2 px-4 py-3 border-t border-border"
        style={{ background: '#12121A' }}>
        <span className="text-sm flex-shrink-0" style={{ color: '#00FFB3' }}>&gt;</span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          disabled={loading || limitReached}
          placeholder={limitReached ? 'Demo limit reached.' : 'Ask about projects, AI tools...'}
          className="flex-1 bg-transparent outline-none text-sm text-gray-200 placeholder-gray-600 font-mono"
          autoComplete="off"
          spellCheck={false}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || loading || limitReached}
          className="text-[10px] px-2 py-1 rounded border border-border transition-all"
          style={{ color: input.trim() ? '#00FFB3' : '#4B5563' }}
        >
          send
        </button>
      </div>
    </div>
  )
}

export default function SimpleView() {
  return (
    <div className="min-h-screen overflow-auto px-5 py-12 max-w-xl mx-auto space-y-12">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="space-y-1 pt-4">
        <h1 className="text-2xl font-bold text-gray-100">Mateusz Młynarski</h1>
        <p className="text-muted font-mono text-sm">AI Builder · iOS · Android · Web</p>
      </motion.div>

      {/* About */}
      <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 }} className="space-y-3">
        <h2 className="text-[10px] font-mono text-accent uppercase tracking-widest">About</h2>
        <p className="text-sm text-gray-300 leading-relaxed">
          I build AI-powered apps and tools for businesses that want to save time, automate tasks and stand out online.
        </p>
      </motion.section>

      {/* Business AI */}
      <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.09 }} className="space-y-3">
        <div className="flex items-center gap-2">
          <h2 className="text-[10px] font-mono text-accent uppercase tracking-widest">Business AI</h2>
          <span className="text-[9px] px-1.5 py-0.5 rounded font-mono"
            style={{ color: '#00FFB3', borderColor: '#00FFB330', background: '#00FFB310', border: '1px solid' }}>
            AI Powered
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {aiServices.map((s) => (
            <div key={s.label} className="flex items-center gap-2 border border-border rounded-lg px-3 py-2 text-xs text-gray-300 font-mono"
              style={{ background: 'rgba(26,26,31,0.6)' }}>
              <span>{s.icon}</span>
              <span>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Demo links */}
        <div className="space-y-1.5 pt-1">
          {clientDemos.map((d) => (
            <a key={d.label} href={d.url} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 border border-border rounded-xl px-3 py-2.5 transition-all font-mono text-xs"
              style={{ background: 'rgba(26,26,31,0.6)', color: d.color }}>
              <span>{d.icon}</span>
              <span className="flex-1">{d.label}</span>
              <span className="text-[9px] border rounded px-1 py-0.5"
                style={{ borderColor: `${d.color}30`, background: `${d.color}10` }}>
                AI Powered
              </span>
              <span className="text-muted">↗</span>
            </a>
          ))}
        </div>
      </motion.section>

      {/* Assistant */}
      <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="space-y-3">
        <h2 className="text-[10px] font-mono text-accent uppercase tracking-widest">Ask me anything</h2>
        <MobileAssistant />
      </motion.section>

      {/* Projects */}
      <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="space-y-3">
        <h2 className="text-[10px] font-mono text-accent uppercase tracking-widest">Projects</h2>
        {projects.map((p) => (
          <div key={p.id} className="border border-border rounded-xl p-4 space-y-2" style={{ background: 'rgba(26,26,31,0.6)' }}>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">{p.emoji}</span>
                <h3 className="font-semibold text-gray-100 text-sm">{p.name}</h3>
              </div>
              <span className="text-[9px] px-1.5 py-0.5 rounded font-mono flex-shrink-0"
                style={{ background: `${p.color}15`, color: p.color }}>
                {p.platform === 'ios' ? 'iOS' : p.platform === 'ios+android' ? 'iOS + Android' : 'Web'}
              </span>
            </div>
            <p className="text-xs text-muted font-mono">{p.tagline.split('—')[0].trim()}</p>
            <p className="text-sm text-gray-300 leading-relaxed">{p.description.slice(0, 140)}…</p>
            <div className="flex flex-wrap gap-1 pt-1">
              {p.tech.slice(0, 4).map((t) => (
                <span key={t} className="text-[9px] px-1.5 py-0.5 rounded font-mono"
                  style={{ background: `${p.color}12`, color: p.color }}>{t}</span>
              ))}
            </div>
            {p.links.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {p.links.map((link) => (
                  <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer"
                    className="text-xs font-mono text-muted hover:text-accent transition-colors flex items-center gap-1">
                    <span>{link.icon}</span><span>{link.label}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </motion.section>

      {/* Contact */}
      <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }} className="space-y-4">
        <h2 className="text-[10px] font-mono text-accent uppercase tracking-widest">Contact</h2>
        <a href="mailto:mlynarski.mateusz@gmail.com"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm"
          style={{ background: '#00FFB3', color: '#0B0B0F' }}>
          Let's build something →
        </a>
        <div className="flex flex-wrap gap-3 pt-1">
          {socials.map((s) => (
            <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-mono text-muted hover:text-accent transition-colors">
              <span>{s.icon}</span><span>{s.label}</span>
            </a>
          ))}
        </div>
      </motion.section>
    </div>
  )
}

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'

const email = 'mlynarski.mateusz@gmail.com'

const socials = [
  { label: 'GitHub', url: 'https://github.com/mlynarskim', icon: '⌨️' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/mateuszmlynarski/', icon: '💼' },
  { label: 'X / Twitter', url: 'https://x.com/mlynarskimat', icon: '🐦' },
  { label: 'Instagram', url: 'https://www.instagram.com/mlynarskimat', icon: '📸' },
  { label: 'Threads', url: 'https://www.threads.com/@mlynarskimat', icon: '🧵' },
  { label: 'ProductHunt', url: 'https://www.producthunt.com/@mateusz_mlynarski', icon: '🚀' },
]

export default function ContactApp() {
  const { t } = useLanguage()
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="h-full flex flex-col p-5 gap-5 overflow-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center pt-2"
      >
        <div className="text-3xl mb-2">👋</div>
        <h2 className="text-base font-semibold text-gray-100">{t.contact.heading}</h2>
        <p className="text-xs text-muted font-mono mt-1">{t.contact.sub}</p>
      </motion.div>

      {/* Email */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="space-y-2"
      >
        <button
          onClick={copy}
          className="w-full flex items-center justify-between gap-3 px-4 py-2.5 rounded-lg border border-border hover:border-accent/40 transition-all group font-mono text-sm"
          style={{ background: 'rgba(0,255,179,0.03)' }}
        >
          <span className="text-gray-300 text-xs truncate">{email}</span>
          <motion.span
            key={copied ? 'copied' : 'copy'}
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-xs flex-shrink-0 ${copied ? 'text-accent' : 'text-muted group-hover:text-accent'} transition-colors`}
          >
            {copied ? t.contact.copied : t.contact.copy}
          </motion.span>
        </button>

        <a
          href={`mailto:${email}`}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all hover:opacity-90 active:scale-95"
          style={{ background: '#00FFB3', color: '#0B0B0F' }}
        >
          <span>✉️</span>
          <span>{t.contact.cta}</span>
        </a>
      </motion.div>

      {/* Socials */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.14 }}
      >
        <div className="text-[10px] text-muted font-mono mb-2 uppercase tracking-wider">{t.contact.findMe}</div>
        <div className="grid grid-cols-2 gap-1.5">
          {socials.map((s) => (
            <a
              key={s.url}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-mono px-3 py-2 rounded-lg border border-border hover:border-accent/30 hover:text-accent transition-all text-gray-400"
              style={{ background: 'rgba(255,255,255,0.02)' }}
            >
              <span>{s.icon}</span>
              <span>{s.label}</span>
            </a>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

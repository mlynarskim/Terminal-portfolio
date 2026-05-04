import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { WindowId } from '../hooks/useWindowManager'

interface Command {
  id: string
  label: string
  description: string
  action: WindowId
  emoji: string
}

const commands: Command[] = [
  { id: 'projects', label: 'Projects', description: 'View all projects', action: 'projects', emoji: '📁' },
  { id: 'about', label: 'About', description: 'About Mateusz', action: 'about', emoji: '👤' },
  { id: 'contact', label: 'Contact', description: 'Get in touch', action: 'contact', emoji: '✉️' },
  { id: 'travel-rules', label: 'Open Travel Rules', description: 'iOS app · Swift', action: 'project-travel-rules', emoji: '✈️' },
  { id: 'rate-that-beach', label: 'Open Rate That Beach', description: 'iOS + Android · React Native', action: 'project-rate-that-beach', emoji: '🏖️' },
  { id: 'travel-rules-hub', label: 'Open Travel Rules HUB', description: 'Web platform', action: 'project-travel-rules-hub', emoji: '🌐' },
  { id: 'solos', label: 'Open SOLOS', description: 'AI movie curator · web app', action: 'project-solos', emoji: '🎬' },
]

interface Props {
  isOpen: boolean
  onClose: () => void
  onSelect: (windowId: WindowId) => void
}

export default function CommandPalette({ isOpen, onClose, onSelect }: Props) {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const filtered = query.trim()
    ? commands.filter(
        (c) =>
          c.label.toLowerCase().includes(query.toLowerCase()) ||
          c.description.toLowerCase().includes(query.toLowerCase())
      )
    : commands

  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setSelected(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  useEffect(() => { setSelected(0) }, [query])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return }
      if (e.key === 'ArrowDown') { e.preventDefault(); setSelected((s) => Math.min(s + 1, filtered.length - 1)) }
      if (e.key === 'ArrowUp') { e.preventDefault(); setSelected((s) => Math.max(s - 1, 0)) }
      if (e.key === 'Enter' && filtered[selected]) {
        onSelect(filtered[selected].action)
        onClose()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, filtered, selected, onClose, onSelect])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-lg z-[201] px-4"
          >
            <div className="rounded-xl border border-border overflow-hidden shadow-window" style={{ background: '#12121A' }}>
              <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
                <svg className="w-4 h-4 text-muted flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => {
                    // allow only letters, digits, spaces — no special chars or scripts
                    const safe = e.target.value.replace(/[^a-zA-Z0-9 ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g, '')
                    setQuery(safe)
                  }}
                  placeholder="Type a command..."
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  className="flex-1 bg-transparent outline-none text-sm font-mono text-gray-100 placeholder-muted"
                />
                <kbd className="text-[10px] text-muted border border-border rounded px-1 py-0.5 font-mono">esc</kbd>
              </div>

              <div className="py-1 max-h-72 overflow-y-auto">
                {filtered.length === 0 && (
                  <div className="px-4 py-6 text-center text-muted text-sm font-mono">No results</div>
                )}
                {filtered.map((cmd, i) => (
                  <button
                    key={cmd.id}
                    onClick={() => { onSelect(cmd.action); onClose() }}
                    onMouseEnter={() => setSelected(i)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors"
                    style={{ background: i === selected ? 'rgba(0,255,179,0.06)' : 'transparent' }}
                  >
                    <span className="text-lg w-6 flex-shrink-0">{cmd.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium" style={{ color: i === selected ? '#00FFB3' : '#E5E7EB' }}>
                        {cmd.label}
                      </div>
                      <div className="text-xs text-muted font-mono">{cmd.description}</div>
                    </div>
                    {i === selected && (
                      <kbd className="text-[10px] text-muted border border-border rounded px-1 py-0.5 font-mono flex-shrink-0">↵</kbd>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

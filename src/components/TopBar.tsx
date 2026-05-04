import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface TopBarProps {
  onOpenPalette: () => void
}

export default function TopBar({ onOpenPalette }: TopBarProps) {
  const [time, setTime] = useState('')
  const [date, setDate] = useState('')

  useEffect(() => {
    const update = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }))
      setDate(now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }))
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 h-10 flex items-center justify-between px-4 z-50 border-b border-border"
      style={{ background: 'rgba(11,11,15,0.85)', backdropFilter: 'blur(12px)' }}
    >
      <div className="flex items-center gap-2">
        <span className="text-accent font-mono text-sm font-semibold tracking-tight" style={{ textShadow: '0 0 12px rgba(0,255,179,0.4)' }}>
          Portfolio OS
        </span>
        <span className="text-border text-xs font-mono">v1.0</span>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={onOpenPalette}
          className="flex items-center gap-1.5 text-xs text-muted hover:text-accent transition-colors font-mono border border-border rounded px-2 py-0.5 hover:border-accent/30"
        >
          <kbd className="text-[10px]">⌘K</kbd>
          <span>palette</span>
        </button>

        <div className="text-right">
          <div className="text-xs font-mono text-gray-300">{time}</div>
          <div className="text-[10px] font-mono text-muted leading-none">{date}</div>
        </div>
      </div>
    </motion.div>
  )
}

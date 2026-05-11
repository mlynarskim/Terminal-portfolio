import { useState, useRef, useEffect, KeyboardEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGeminiChat } from '../../hooks/useGeminiChat'
import { useLanguage } from '../../contexts/LanguageContext'

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY ?? ''

export default function AssistantApp() {
  const { t } = useLanguage()
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const { messages, loading, error, limitReached, sendMessage, remaining } =
    useGeminiChat({ apiKey: API_KEY })

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSend = () => {
    if (!input.trim() || loading || limitReached) return
    sendMessage(input)
    setInput('')
  }

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend()
  }

  return (
    <div className="h-full flex flex-col font-mono" style={{ background: '#0B0B0F' }}>
      {/* Terminal header */}
      <div
        className="flex items-center gap-3 px-4 py-2.5 border-b border-border flex-shrink-0"
        style={{ background: '#12121A' }}
      >
        <div className="flex gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00FFB3' }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00FFB380' }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00FFB340' }} />
        </div>
        <span className="text-[10px] text-muted flex-1">{t.assistant.header}</span>
        <span className="text-[9px]" style={{ color: remaining <= 3 ? '#F59E0B' : '#4B5563' }}>
          {remaining}/10 {t.assistant.msgs}
        </span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-auto px-4 py-3 space-y-3">
        {/* Welcome */}
        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-3"
          >
            <div className="text-xs text-muted">
              <span style={{ color: '#00FFB3' }}>mateusz@portfolio</span>
              <span className="text-gray-600">:~$ </span>
              <span className="text-gray-400">./assistant --start</span>
            </div>
            <div className="text-sm text-gray-300 leading-relaxed pl-2 border-l-2" style={{ borderColor: '#00FFB340' }}>
              {t.assistant.welcome}
            </div>

            {/* Suggestions */}
            <div className="space-y-1 pt-1">
              <div className="text-[9px] text-muted uppercase tracking-wider">{t.assistant.quickQuestions}</div>
              <div className="flex flex-wrap gap-1.5">
                {t.assistant.suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => { sendMessage(s) }}
                    className="text-[10px] px-2 py-1 rounded border border-border hover:border-accent/40 hover:text-accent transition-all text-muted"
                    style={{ background: 'rgba(0,255,179,0.04)' }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Chat messages */}
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-0.5"
            >
              {msg.role === 'user' ? (
                <div className="flex items-start gap-2">
                  <span className="text-[10px] mt-0.5 flex-shrink-0" style={{ color: '#00FFB3' }}>
                    &gt;
                  </span>
                  <span className="text-sm text-gray-200">{msg.content}</span>
                </div>
              ) : (
                <div className="pl-4 border-l-2 py-0.5" style={{ borderColor: '#00FFB330' }}>
                  <span className="text-sm text-gray-300 leading-relaxed">{msg.content}</span>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Loading */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pl-4 border-l-2"
            style={{ borderColor: '#00FFB330' }}
          >
            <span className="text-xs text-muted">
              <span className="inline-block animate-pulse">{t.assistant.thinking}</span>
              <span className="animate-pulse">...</span>
            </span>
          </motion.div>
        )}

        {/* Error */}
        {error && (
          <div className="text-xs text-red-400 pl-4 border-l-2 border-red-500/30">
            {error}
          </div>
        )}

        {/* Limit reached */}
        {limitReached && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg p-3 border text-center"
            style={{ background: '#F59E0B10', borderColor: '#F59E0B30' }}
          >
            <div className="text-xs text-yellow-400 font-semibold mb-1">{t.assistant.limitReached}</div>
            <div className="text-[11px] text-muted">
              {t.assistant.limitSub}{' '}
              <a href="mailto:mlynarski.mateusz@gmail.com" className="text-accent hover:underline">
                mlynarski.mateusz@gmail.com
              </a>
            </div>
          </motion.div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div
        className="flex items-center gap-2 px-4 py-3 border-t border-border flex-shrink-0"
        style={{ background: '#12121A' }}
      >
        <span className="text-sm flex-shrink-0" style={{ color: '#00FFB3' }}>{'>'}</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          disabled={loading || limitReached}
          placeholder={limitReached ? t.assistant.placeholderLimit : t.assistant.placeholder}
          className="flex-1 min-w-0 bg-transparent outline-none text-sm text-gray-200 placeholder-gray-600 font-mono"
          autoComplete="off"
          spellCheck={false}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || loading || limitReached}
          className="text-[10px] px-2 py-1 rounded border transition-all flex-shrink-0 whitespace-nowrap"
          style={{
            borderColor: input.trim() && !loading && !limitReached ? '#00FFB340' : '#2A2A35',
            color: input.trim() && !loading && !limitReached ? '#00FFB3' : '#4B5563',
            background: input.trim() && !loading && !limitReached ? '#00FFB308' : 'transparent',
          }}
        >
          {t.assistant.send}
        </button>
      </div>
    </div>
  )
}

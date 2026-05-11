import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'

interface Props {
  onEnter: () => void
  onSimple: () => void
}

export default function BootScreen({ onEnter, onSimple }: Props) {
  const { t } = useLanguage()
  const [visible, setVisible] = useState(true)
  const [bootStep, setBootStep] = useState(0)
  const [showPrompt, setShowPrompt] = useState(false)

  const BOOT_LINES = [
    { text: t.boot.init, delay: 0 },
    { text: t.boot.loading, delay: 500 },
    { text: t.boot.ready, delay: 950 },
  ]

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []
    BOOT_LINES.forEach((line, i) => {
      timers.push(setTimeout(() => setBootStep(i + 1), line.delay + 200))
    })
    timers.push(setTimeout(() => setShowPrompt(true), 1400))
    return () => timers.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter') handleEnter()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const handleEnter = () => {
    setVisible(false)
    setTimeout(onEnter, 500)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 flex flex-col items-center justify-center z-[300]"
          style={{ background: '#0B0B0F' }}
        >
          {/* Subtle grid background */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(0,255,179,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,179,1) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />

          <div className="relative text-center px-8">
            {/* Boot lines */}
            <div className="mb-8 text-left font-mono text-xs" style={{ minHeight: 56 }}>
              {BOOT_LINES.map((line, i) => (
                <AnimatePresence key={i}>
                  {bootStep > i && (
                    <motion.div
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25 }}
                      style={{ color: i === BOOT_LINES.length - 1 ? '#00FFB3' : '#4B5563' }}
                    >
                      {line.text}
                    </motion.div>
                  )}
                </AnimatePresence>
              ))}
            </div>

            <AnimatePresence>
              {showPrompt && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="font-mono text-muted text-xs mb-6 tracking-widest uppercase">
                    Portfolio OS · v1.0
                  </div>

                  <motion.button
                    onClick={handleEnter}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="group relative"
                  >
                    <div
                      className="text-2xl sm:text-3xl font-mono font-medium tracking-tight mb-1"
                      style={{ color: '#00FFB3', textShadow: '0 0 30px rgba(0,255,179,0.5)' }}
                    >
                      {t.boot.pressEnter}
                      <span className="cursor-blink ml-1 opacity-70">_</span>
                    </div>
                    <div className="text-xs text-muted font-mono">{t.boot.orClick}</div>
                  </motion.button>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-12 flex items-center justify-center gap-4"
                  >
                    <button
                      onClick={handleEnter}
                      className="text-xs text-muted hover:text-gray-400 transition-colors font-mono underline underline-offset-2"
                    >
                      {t.boot.skipIntro}
                    </button>
                    <span className="text-muted/30 font-mono text-xs">·</span>
                    <button
                      onClick={onSimple}
                      className="text-xs text-muted/50 hover:text-gray-400 transition-colors font-mono underline underline-offset-2"
                    >
                      {t.boot.simpleView}
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-4 left-4 font-mono text-[10px] text-muted/40">01001101</div>
          <div className="absolute top-4 right-4 font-mono text-[10px] text-muted/40">01001111</div>
          <div className="absolute bottom-4 left-4 font-mono text-[10px] text-muted/40">01010011</div>
          <div className="absolute bottom-4 right-4 font-mono text-[10px] text-muted/40">00100000</div>

          {/* Mobile hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="absolute bottom-10 left-0 right-0 flex justify-center px-6"
          >
            <p className="text-[10px] font-mono text-muted/40 text-center">
              {t.boot.mobileHint}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

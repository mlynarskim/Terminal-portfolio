import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  onEnter: () => void
}

export default function BootScreen({ onEnter }: Props) {
  const [visible, setVisible] = useState(true)

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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="font-mono text-muted text-xs mb-6 tracking-widest uppercase">
                Mateusz OS · v1.0
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
                  Press Enter to start
                  <span className="cursor-blink ml-1 opacity-70">_</span>
                </div>
                <div className="text-xs text-muted font-mono">or click anywhere</div>
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-12"
            >
              <button
                onClick={handleEnter}
                className="text-xs text-muted hover:text-gray-400 transition-colors font-mono underline underline-offset-2"
              >
                skip intro
              </button>
            </motion.div>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-4 left-4 font-mono text-[10px] text-muted/40">01001101</div>
          <div className="absolute top-4 right-4 font-mono text-[10px] text-muted/40">01001111</div>
          <div className="absolute bottom-4 left-4 font-mono text-[10px] text-muted/40">01010011</div>
          <div className="absolute bottom-4 right-4 font-mono text-[10px] text-muted/40">00100000</div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

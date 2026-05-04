import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BootScreen from './components/BootScreen'
import TopBar from './components/TopBar'
import Desktop from './components/Desktop'
import CommandPalette from './components/CommandPalette'
import SimpleView from './components/SimpleView'
import type { WindowId } from './hooks/useWindowManager'

type Mode = 'boot' | 'desktop' | 'simple'

const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a']

function isMobileDevice() {
  return window.innerWidth < 768
}

export default function App() {
  const [mode, setMode] = useState<Mode>('boot')
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [pendingOpen, setPendingOpen] = useState<WindowId | null>(null)
  const [isMobile, setIsMobile] = useState(isMobileDevice)
  const [easterEgg, setEasterEgg] = useState(false)
  const konamiProgress = useRef(0)

  useEffect(() => {
    const onResize = () => setIsMobile(isMobileDevice())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Konami code easter egg
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === KONAMI[konamiProgress.current]) {
        konamiProgress.current++
        if (konamiProgress.current === KONAMI.length) {
          konamiProgress.current = 0
          setEasterEgg(true)
          setTimeout(() => setEasterEgg(false), 4000)
        }
      } else {
        konamiProgress.current = e.key === KONAMI[0] ? 1 : 0
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        if (mode === 'desktop') setPaletteOpen((v) => !v)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mode])

  const handleEnter = useCallback(() => {
    if (isMobile) {
      setMode('simple')
    } else {
      setMode('desktop')
    }
  }, [isMobile])

  const handlePaletteSelect = useCallback((id: WindowId) => {
    setPendingOpen(id)
  }, [])

  if (mode === 'simple') {
    return (
      <div className="min-h-screen overflow-auto" style={{ background: '#0B0B0F' }}>
        <div className="fixed top-4 right-4 z-50 flex gap-2">
          {!isMobile && (
            <button
              onClick={() => setMode('desktop')}
              className="text-xs font-mono text-muted hover:text-accent transition-colors border border-border rounded px-2 py-1"
            >
              ← OS view
            </button>
          )}
        </div>
        <SimpleView />
      </div>
    )
  }

  return (
    <div className="w-full" style={{ height: '100dvh', overflow: 'hidden', background: '#0B0B0F' }}>
      {mode === 'boot' && (
        <BootScreen onEnter={handleEnter} onSimple={() => setMode('simple')} />
      )}

      {mode === 'desktop' && (
        <>
          <TopBar onOpenPalette={() => setPaletteOpen(true)} />
          <Desktop
            onOpenPalette={() => setPaletteOpen(true)}
            externalOpen={pendingOpen}
            onExternalHandled={() => setPendingOpen(null)}
          />
          <CommandPalette
            isOpen={paletteOpen}
            onClose={() => setPaletteOpen(false)}
            onSelect={handlePaletteSelect}
          />
        </>
      )}

      {/* Konami code easter egg */}
      <AnimatePresence>
        {easterEgg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[500] flex flex-col items-center justify-center pointer-events-none"
            style={{ background: 'rgba(0,0,0,0.85)' }}
          >
            <motion.div
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.5 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="text-center font-mono"
            >
              <div className="text-6xl mb-4">🕹️</div>
              <div className="text-2xl font-bold mb-2" style={{ color: '#00FFB3' }}>
                +30 lives unlocked
              </div>
              <div className="text-sm text-muted">You found the easter egg. Congrats!</div>
              <div className="mt-4 text-xs text-muted/50">↑↑↓↓←→←→BA</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

import { useState, useEffect, useCallback } from 'react'
import BootScreen from './components/BootScreen'
import TopBar from './components/TopBar'
import Desktop from './components/Desktop'
import CommandPalette from './components/CommandPalette'
import SimpleView from './components/SimpleView'
import type { WindowId } from './hooks/useWindowManager'

type Mode = 'boot' | 'desktop' | 'simple'

function isMobileDevice() {
  return window.innerWidth < 768
}

export default function App() {
  const [mode, setMode] = useState<Mode>('boot')
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [pendingOpen, setPendingOpen] = useState<WindowId | null>(null)
  const [isMobile, setIsMobile] = useState(isMobileDevice)

  useEffect(() => {
    const onResize = () => setIsMobile(isMobileDevice())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
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
        <>
          <BootScreen onEnter={handleEnter} />
          <div className="fixed bottom-4 right-4 z-[400] flex flex-col items-end gap-2">
            {isMobile && (
              <div className="text-[10px] font-mono text-muted/60 text-right">
                mobile detected — simple view recommended
              </div>
            )}
            <button
              onClick={() => setMode('simple')}
              className="text-[10px] font-mono text-muted/50 hover:text-muted transition-colors"
            >
              simple view
            </button>
          </div>
        </>
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
    </div>
  )
}

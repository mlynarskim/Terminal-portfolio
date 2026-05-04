import { useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { WindowId } from '../hooks/useWindowManager'

interface WindowProps {
  id: WindowId
  title: string
  isOpen: boolean
  zIndex: number
  onClose: () => void
  onFocus: () => void
  initialPosition?: { x: number; y: number }
  width?: number
  height?: number
  children: React.ReactNode
}

const MIN_W = 320
const MIN_H = 240

export default function Window({
  title,
  isOpen,
  zIndex,
  onClose,
  onFocus,
  initialPosition = { x: 80, y: 60 },
  width = 640,
  height = 480,
  children,
}: WindowProps) {
  const [size, setSize] = useState({ w: width, h: height })
  const resizing = useRef(false)
  const startPos = useRef({ x: 0, y: 0 })
  const startSize = useRef({ w: width, h: height })

  const onResizeStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    resizing.current = true
    startPos.current = { x: e.clientX, y: e.clientY }
    startSize.current = { ...size }

    const onMove = (ev: MouseEvent) => {
      if (!resizing.current) return
      const dx = ev.clientX - startPos.current.x
      const dy = ev.clientY - startPos.current.y
      setSize({
        w: Math.max(MIN_W, startSize.current.w + dx),
        h: Math.max(MIN_H, startSize.current.h + dy),
      })
    }
    const onUp = () => {
      resizing.current = false
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }, [size])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          drag
          dragMomentum={false}
          dragElastic={0}
          dragListener={!resizing.current}
          initial={{ opacity: 0, scale: 0.92, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 10 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            left: initialPosition.x,
            top: initialPosition.y,
            width: size.w,
            maxWidth: 'calc(100vw - 24px)',
            maxHeight: 'calc(100vh - 56px)',
            zIndex,
          }}
          onMouseDown={onFocus}
          className="rounded-xl overflow-hidden shadow-window border border-border flex flex-col"
        >
          {/* Title bar — drag handle */}
          <div
            className="flex items-center gap-2 px-4 py-3 bg-panel border-b border-border select-none cursor-grab active:cursor-grabbing flex-shrink-0"
            style={{ touchAction: 'none' }}
          >
            <button
              onClick={(e) => { e.stopPropagation(); onClose() }}
              className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors flex-shrink-0 group relative"
              aria-label="Close"
            >
              <span className="absolute inset-0 flex items-center justify-center text-red-900 opacity-0 group-hover:opacity-100 text-[8px] font-bold leading-none">×</span>
            </button>
            <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-50 flex-shrink-0" />
            <div className="w-3 h-3 rounded-full bg-green-500 opacity-50 flex-shrink-0" />
            <span className="flex-1 text-center text-xs font-mono text-muted -ml-4 pointer-events-none">
              {title}
            </span>
          </div>

          {/* Content */}
          <div
            className="bg-panel flex-1 overflow-auto"
            style={{ height: size.h - 44 }}
          >
            {children}
          </div>

          {/* Resize handle — bottom-right corner */}
          <div
            onMouseDown={onResizeStart}
            className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize z-10 flex items-end justify-end pr-0.5 pb-0.5"
            title="Drag to resize"
          >
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
              <path d="M7 1L1 7M7 4L4 7M7 7L7 7" stroke="#4B5563" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

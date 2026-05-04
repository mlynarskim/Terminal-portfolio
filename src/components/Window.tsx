import { useRef } from 'react'
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
  const constraintsRef = useRef<HTMLDivElement>(null)

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          drag
          dragMomentum={false}
          dragElastic={0}
          initial={{ opacity: 0, scale: 0.92, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 10 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            left: initialPosition.x,
            top: initialPosition.y,
            width,
            maxWidth: 'calc(100vw - 24px)',
            maxHeight: 'calc(100vh - 80px)',
            zIndex,
          }}
          onMouseDown={onFocus}
          className="rounded-xl overflow-hidden shadow-window border border-border flex flex-col"
        >
          {/* Title bar */}
          <div
            className="flex items-center gap-2 px-4 py-3 bg-panel border-b border-border select-none cursor-grab active:cursor-grabbing"
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
            style={{ height: height - 44 }}
          >
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

import { motion, AnimatePresence } from 'framer-motion'
import { wallpapers } from '../data/wallpapers'
import type { WallpaperId } from '../data/wallpapers'
import { useLanguage } from '../contexts/LanguageContext'

interface Props {
  isOpen: boolean
  current: WallpaperId
  onSelect: (id: WallpaperId) => void
  onClose: () => void
}

export default function WallpaperPicker({ isOpen, current, onSelect, onClose }: Props) {
  const { lang } = useLanguage()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[201] w-full max-w-sm px-4"
          >
            <div
              className="rounded-2xl border border-border overflow-hidden shadow-window"
              style={{ background: '#12121A' }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                <div>
                  <h2 className="text-sm font-semibold text-gray-100">
                    {lang === 'pl' ? '🖼️ Tapeta' : '🖼️ Wallpaper'}
                  </h2>
                  <p className="text-[10px] text-muted font-mono mt-0.5">
                    {lang === 'pl' ? 'Kliknij prawym przyciskiem myszy na pulpicie' : 'Right-click on desktop to change'}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="text-muted hover:text-gray-300 transition-colors text-lg leading-none"
                >
                  ×
                </button>
              </div>

              {/* Wallpaper grid */}
              <div className="p-4 grid grid-cols-4 gap-3">
                {wallpapers.map((wp) => {
                  const selected = wp.id === current
                  return (
                    <motion.button
                      key={wp.id}
                      onClick={() => { onSelect(wp.id); onClose() }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex flex-col items-center gap-1.5 group"
                    >
                      {/* Preview swatch */}
                      <div
                        className="w-full rounded-xl overflow-hidden relative"
                        style={{
                          aspectRatio: '16/10',
                          background: wp.background,
                          border: selected
                            ? '2px solid #00FFB3'
                            : '2px solid transparent',
                          boxShadow: selected
                            ? '0 0 12px rgba(0,255,179,0.35)'
                            : 'inset 0 0 0 1px rgba(255,255,255,0.06)',
                          transition: 'border-color 0.15s, box-shadow 0.15s',
                        }}
                      >
                        {/* Grid overlay for matrix */}
                        {wp.gridColor && (
                          <div
                            className="absolute inset-0"
                            style={{
                              backgroundImage: `linear-gradient(${wp.gridColor} 1px, transparent 1px), linear-gradient(90deg, ${wp.gridColor} 1px, transparent 1px)`,
                              backgroundSize: '8px 8px',
                            }}
                          />
                        )}
                        {/* Selected checkmark */}
                        {selected && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div
                              className="w-4 h-4 rounded-full flex items-center justify-center text-[8px]"
                              style={{ background: '#00FFB3', color: '#0B0B0F' }}
                            >
                              ✓
                            </div>
                          </div>
                        )}
                      </div>
                      {/* Label */}
                      <span
                        className="text-[9px] font-mono leading-tight text-center"
                        style={{ color: selected ? '#00FFB3' : '#6B7280' }}
                      >
                        {wp.label}
                      </span>
                    </motion.button>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

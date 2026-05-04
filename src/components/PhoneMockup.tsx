import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Platform } from '../data/projects'

interface Props {
  screenshotCount?: number
  screenshots?: string[]
  color: string
  platform: Platform
  projectId: string
}

const placeholderScreens = [
  { label: 'Home', icon: '🏠' },
  { label: 'Detail', icon: '📋' },
  { label: 'Search', icon: '🔍' },
  { label: 'Profile', icon: '👤' },
  { label: 'Settings', icon: '⚙️' },
]

export default function PhoneMockup({ screenshotCount = 3, screenshots, color, platform, projectId }: Props) {
  const [current, setCurrent] = useState(0)
  const hasReal = screenshots && screenshots.length > 0
  const count = hasReal ? screenshots.length : Math.min(screenshotCount, placeholderScreens.length)
  const isAndroid = platform === 'ios+android'

  const prev = () => setCurrent((c) => (c - 1 + count) % count)
  const next = () => setCurrent((c) => (c + 1) % count)

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative flex items-center gap-3">
        {/* Prev */}
        {count > 1 && (
          <button
            onClick={prev}
            className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-muted hover:text-accent hover:border-accent/40 transition-all text-sm"
          >
            ‹
          </button>
        )}

        {/* Phone frame */}
        <div className="relative flex-shrink-0" style={{ width: 180, height: 360 }}>
          <div
            className="absolute inset-0 rounded-[32px] border-[6px]"
            style={{
              borderColor: '#2A2A35',
              background: '#1A1A20',
              boxShadow: `0 0 0 1px #111, 0 20px 40px rgba(0,0,0,0.6), 0 0 30px ${color}18`,
            }}
          >
            {/* Notch / pill */}
            {!isAndroid ? (
              <div
                className="absolute top-2 left-1/2 -translate-x-1/2 rounded-full"
                style={{ width: 60, height: 8, background: '#0B0B0F', zIndex: 2 }}
              />
            ) : (
              <div
                className="absolute top-2.5 left-1/2 -translate-x-1/2 rounded-full"
                style={{ width: 10, height: 10, background: '#0B0B0F', zIndex: 2 }}
              />
            )}

            {/* Screen area */}
            <div className="absolute rounded-[26px] overflow-hidden" style={{ inset: 2 }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${projectId}-${current}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="w-full h-full"
                  style={{ background: '#0B0B0F' }}
                >
                  {hasReal ? (
                    <img
                      src={screenshots[current]}
                      alt={`${projectId} screenshot ${current + 1}`}
                      className="w-full h-full object-cover object-top"
                      draggable={false}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col">
                      {/* Status bar */}
                      <div className="flex justify-between items-center px-3 pt-3 pb-1">
                        <span className="text-[8px] font-mono text-gray-400">9:41</span>
                        <div className="w-3 h-1.5 rounded-sm border border-gray-400 relative">
                          <div className="absolute inset-0.5 right-0.5 rounded-sm" style={{ background: color, width: '70%' }} />
                        </div>
                      </div>

                      {/* Placeholder */}
                      <div className="flex-1 flex flex-col items-center justify-center gap-3 p-4">
                        <div
                          className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                          style={{ background: `${color}18`, border: `1px solid ${color}30` }}
                        >
                          {placeholderScreens[current]?.icon}
                        </div>
                        <div className="text-center">
                          <div className="text-[10px] font-mono text-gray-300 mb-0.5">
                            {placeholderScreens[current]?.label}
                          </div>
                          <div className="text-[9px] text-muted font-mono">coming soon</div>
                        </div>
                        <div className="w-full space-y-1.5 mt-2">
                          {[80, 60, 70, 45].map((w, i) => (
                            <div
                              key={i}
                              className="h-1.5 rounded-full"
                              style={{
                                width: `${w}%`,
                                background: i === 0 ? `${color}30` : '#2A2A32',
                                marginLeft: i % 2 === 1 ? 'auto' : 0,
                              }}
                            />
                          ))}
                        </div>
                      </div>

                      {!isAndroid && (
                        <div className="flex justify-center pb-2">
                          <div className="w-16 h-1 rounded-full" style={{ background: '#3A3A42' }} />
                        </div>
                      )}
                      {isAndroid && (
                        <div className="flex justify-center gap-4 pb-2">
                          {['◀', '●', '■'].map((s) => (
                            <span key={s} className="text-[8px] text-gray-600">{s}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Side buttons */}
          <div className="absolute rounded-r-sm" style={{ right: -8, top: 60, width: 4, height: 30, background: '#2A2A35' }} />
          <div className="absolute rounded-l-sm" style={{ left: -8, top: 50, width: 4, height: 20, background: '#2A2A35' }} />
          <div className="absolute rounded-l-sm" style={{ left: -8, top: 80, width: 4, height: 30, background: '#2A2A35' }} />
        </div>

        {/* Next */}
        {count > 1 && (
          <button
            onClick={next}
            className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-muted hover:text-accent hover:border-accent/40 transition-all text-sm"
          >
            ›
          </button>
        )}
      </div>

      {/* Dots */}
      {count > 1 && (
        <div className="flex gap-1.5">
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="rounded-full transition-all"
              style={{
                width: i === current ? 16 : 6,
                height: 6,
                background: i === current ? color : '#2A2A32',
              }}
            />
          ))}
        </div>
      )}

      <p className="text-[10px] text-muted font-mono text-center">
        {isAndroid ? 'iOS + Android' : 'iOS only'}
        {hasReal ? ` · ${current + 1} / ${count}` : ' · screenshots coming soon'}
      </p>
    </div>
  )
}

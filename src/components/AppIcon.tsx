import { motion } from 'framer-motion'

interface AppIconProps {
  label: string
  emoji: string
  onClick: () => void
  isOpen?: boolean
  accentColor?: string
}

export default function AppIcon({ label, emoji, onClick, isOpen = false, accentColor = '#00FFB3' }: AppIconProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.08, y: -4 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className="flex flex-col items-center gap-2 group select-none"
      aria-label={`Open ${label}`}
    >
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl border border-border transition-all duration-200 relative overflow-hidden"
        style={{
          background: 'rgba(26,26,31,0.9)',
          boxShadow: isOpen
            ? `0 0 0 1px ${accentColor}40, 0 8px 32px rgba(0,0,0,0.4)`
            : '0 4px 16px rgba(0,0,0,0.4)',
        }}
      >
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{ background: `radial-gradient(circle at 50% 50%, ${accentColor}15, transparent 70%)` }}
        />
        <span className="relative z-10">{emoji}</span>
      </div>

      <span className="text-xs text-gray-300 font-sans font-medium max-w-[72px] text-center leading-tight">
        {label}
      </span>

      {isOpen && (
        <div
          className="w-1 h-1 rounded-full mt-[-4px]"
          style={{ background: accentColor }}
        />
      )}
    </motion.button>
  )
}

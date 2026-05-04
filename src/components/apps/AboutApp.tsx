import { motion } from 'framer-motion'

const lines = [
  { type: 'comment', text: '// mateusz.ts — last updated 2026' },
  { type: 'blank' },
  { type: 'keyword', text: 'const', label: ' mateusz = {' },
  { type: 'prop', key: 'role', value: '"Mobile App Builder"', color: '#A78BFA' },
  { type: 'prop', key: 'focus', value: '["iOS", "Android", "MVP"]', color: '#34D399' },
  { type: 'prop', key: 'mindset', value: '"Build fast, ship fast, learn fast"', color: '#FCD34D' },
  { type: 'prop', key: 'nativeTools', value: '["Swift", "SwiftUI", "Xcode"]', color: '#60A5FA' },
  { type: 'prop', key: 'crossPlatform', value: '["React Native", "Expo", "TypeScript"]', color: '#34D399' },
  { type: 'prop', key: 'backend', value: '["Firebase", "Firestore", "Node.js"]', color: '#F97316' },
  { type: 'prop', key: 'aiTools', value: '["Claude", "Cursor", "Gemini"]', color: '#C084FC' },
  { type: 'prop', key: 'availability', value: '"Open to work & new projects"', color: '#00FFB3' },
  { type: 'close', text: '}' },
]

export default function AboutApp() {
  return (
    <div className="h-full flex flex-col p-5 font-mono text-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="flex gap-1.5">
          {['#3B82F6', '#00FFB3', '#F59E0B'].map((c) => (
            <div key={c} className="w-2 h-2 rounded-full" style={{ background: c }} />
          ))}
        </div>
        <span className="text-muted text-xs">mateusz.ts</span>
      </div>

      <div className="flex-1 overflow-auto space-y-1">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04, duration: 0.2 }}
            className="flex items-start gap-4"
          >
            <span className="text-[11px] text-muted w-4 text-right flex-shrink-0 select-none">
              {line.type !== 'blank' ? i + 1 : ''}
            </span>
            {line.type === 'blank' && <div className="h-4" />}
            {line.type === 'comment' && <span className="text-gray-600">{line.text}</span>}
            {line.type === 'keyword' && (
              <span>
                <span className="text-purple-400">{line.text}</span>
                <span className="text-gray-300">{line.label}</span>
              </span>
            )}
            {line.type === 'prop' && (
              <span className="flex flex-wrap gap-x-1 min-w-0">
                <span className="text-gray-500 ml-4">  </span>
                <span className="text-blue-300">{line.key}</span>
                <span className="text-gray-500">:</span>
                <span style={{ color: line.color }}>{line.value}</span>
                <span className="text-gray-600">,</span>
              </span>
            )}
            {line.type === 'close' && <span className="text-gray-300">{line.text}</span>}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55 }}
        className="mt-4 pt-4 border-t border-border flex items-center justify-between"
      >
        <div className="flex items-center gap-2 text-xs text-muted">
          <div className="w-1.5 h-4 bg-accent cursor-blink" />
          <span className="font-mono">_</span>
        </div>
        <span
          className="text-[10px] font-mono px-2 py-0.5 rounded-full border"
          style={{ color: '#00FFB3', borderColor: '#00FFB330', background: '#00FFB312' }}
        >
          ✦ open to work
        </span>
      </motion.div>
    </div>
  )
}

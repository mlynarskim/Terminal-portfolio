import { motion } from 'framer-motion'
import { projects } from '../../data/projects'
import type { WindowId } from '../../hooks/useWindowManager'

const platformLabel: Record<string, string> = {
  ios: 'iOS',
  'ios+android': 'iOS + Android',
  web: 'Web',
}

const clientDemos = [
  {
    id: 'beauty-ai',
    name: 'beauty-ai.demo',
    emoji: '💅',
    tagline: 'AI assistant for beauty salon',
    color: '#FB7185',
    url: '/demos/beauty.html',
    tech: ['Gemini 2.5 Flash', 'AI Chat', 'Booking'],
  },
  {
    id: 'workshop-ai',
    name: 'workshop-ai.demo',
    emoji: '🔧',
    tagline: 'AI assistant for car workshop',
    color: '#F59E0B',
    url: '/demos/workshop.html',
    tech: ['Gemini 2.5 Flash', 'AI Chat', 'Diagnostics'],
  },
  {
    id: 'agro-ai',
    name: 'agro-ai.demo',
    emoji: '🌾',
    tagline: 'AI assistant for agricultural services',
    color: '#34D399',
    url: '/demos/agro.html',
    tech: ['Gemini 2.5 Flash', 'AI Chat', 'Scheduling'],
  },
]

interface Props {
  onOpenProject: (id: WindowId) => void
}

export default function ProjectsApp({ onOpenProject }: Props) {
  return (
    <div className="h-full flex flex-col p-4 gap-3 overflow-auto">
      {/* Apps */}
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xs font-mono text-muted">{projects.length} projects</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {projects.map((project, i) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05, duration: 0.2 }}
          className="rounded-xl border border-border p-3.5 transition-all group cursor-default"
          style={{ background: 'rgba(26,26,31,0.6)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = `${project.color}40`
            e.currentTarget.style.boxShadow = `0 0 20px ${project.color}10`
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = ''
            e.currentTarget.style.boxShadow = ''
          }}
        >
          <div className="flex items-start gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
              style={{ background: `${project.color}15`, border: `1px solid ${project.color}30` }}
            >
              {project.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                <h3 className="font-semibold text-gray-100 text-sm">{project.name}</h3>
                <span className="text-[9px] px-1.5 py-0.5 rounded font-mono"
                  style={{ background: `${project.color}15`, color: project.color }}>
                  {platformLabel[project.platform]}
                </span>
              </div>
              <p className="text-xs text-muted font-mono mb-2 leading-snug">{project.tagline.split('—')[0].trim()}</p>
              <div className="flex flex-wrap gap-1">
                {project.tech.slice(0, 3).map((t) => (
                  <span key={t} className="text-[9px] px-1.5 py-0.5 rounded font-mono"
                    style={{ background: `${project.color}10`, color: project.color, border: `1px solid ${project.color}20` }}>
                    {t}
                  </span>
                ))}
                {project.tech.length > 3 && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded font-mono text-muted">
                    +{project.tech.length - 3}
                  </span>
                )}
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onOpenProject(`project-${project.id}` as WindowId)}
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold font-mono flex-shrink-0"
              style={{ background: `${project.color}15`, color: project.color, border: `1px solid ${project.color}30` }}
            >
              Open
            </motion.button>
          </div>
        </motion.div>
      ))}

      {/* Client Demos */}
      <div className="flex items-center gap-2 mt-3 mb-1">
        <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: '#00FFB3' }}>
          Client Demos
        </span>
        <div className="flex-1 h-px bg-border" />
        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded border"
          style={{ color: '#00FFB3', borderColor: '#00FFB330', background: '#00FFB310' }}>
          AI Powered
        </span>
      </div>

      {clientDemos.map((demo, i) => (
        <motion.div
          key={demo.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: (projects.length + i) * 0.05, duration: 0.2 }}
          className="rounded-xl border border-border p-3.5 transition-all cursor-default"
          style={{ background: 'rgba(26,26,31,0.6)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = `${demo.color}40`
            e.currentTarget.style.boxShadow = `0 0 20px ${demo.color}10`
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = ''
            e.currentTarget.style.boxShadow = ''
          }}
        >
          <div className="flex items-start gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
              style={{ background: `${demo.color}15`, border: `1px solid ${demo.color}30` }}
            >
              {demo.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                <h3 className="font-semibold font-mono text-sm" style={{ color: demo.color }}>{demo.name}</h3>
              </div>
              <p className="text-xs text-muted font-mono mb-2 leading-snug">{demo.tagline}</p>
              <div className="flex flex-wrap gap-1">
                {demo.tech.map((t) => (
                  <span key={t} className="text-[9px] px-1.5 py-0.5 rounded font-mono"
                    style={{ background: `${demo.color}10`, color: demo.color, border: `1px solid ${demo.color}20` }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <motion.a
              href={demo.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold font-mono flex-shrink-0"
              style={{ background: `${demo.color}15`, color: demo.color, border: `1px solid ${demo.color}30` }}
            >
              Demo ↗
            </motion.a>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

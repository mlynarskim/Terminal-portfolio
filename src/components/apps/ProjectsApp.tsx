import { motion } from 'framer-motion'
import { projects } from '../../data/projects'
import type { WindowId } from '../../hooks/useWindowManager'

const platformLabel: Record<string, string> = {
  ios: 'iOS',
  'ios+android': 'iOS + Android',
  web: 'Web',
}

interface Props {
  onOpenProject: (id: WindowId) => void
}

export default function ProjectsApp({ onOpenProject }: Props) {
  return (
    <div className="h-full flex flex-col p-4 gap-3 overflow-auto">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xs font-mono text-muted">{projects.length} projects</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {projects.map((project, i) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06, duration: 0.2 }}
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
                <span
                  className="text-[9px] px-1.5 py-0.5 rounded font-mono"
                  style={{ background: `${project.color}15`, color: project.color }}
                >
                  {platformLabel[project.platform]}
                </span>
              </div>
              <p className="text-xs text-muted font-mono mb-2 leading-snug">{project.tagline.split('—')[0].trim()}</p>
              <div className="flex flex-wrap gap-1">
                {project.tech.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="text-[9px] px-1.5 py-0.5 rounded font-mono"
                    style={{ background: `${project.color}10`, color: project.color, border: `1px solid ${project.color}20` }}
                  >
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
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold font-mono flex-shrink-0 transition-all"
              style={{
                background: `${project.color}15`,
                color: project.color,
                border: `1px solid ${project.color}30`,
              }}
            >
              Open
            </motion.button>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

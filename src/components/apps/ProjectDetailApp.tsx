import { motion } from 'framer-motion'
import type { Project } from '../../data/projects'
import PhoneMockup from '../PhoneMockup'

interface Props {
  project: Project
}

export default function ProjectDetailApp({ project }: Props) {
  const isMobile = project.platform === 'ios' || project.platform === 'ios+android'
  const primaryLink = project.links.find((l) => l.primary) ?? project.links[0]
  const secondaryLinks = project.links.filter((l) => !l.primary)

  return (
    <div className="h-full flex flex-col overflow-auto">
      {/* Header */}
      <div
        className="px-5 pt-5 pb-4 flex-shrink-0"
        style={{ background: `linear-gradient(135deg, ${project.color}12, transparent)` }}
      >
        <div className="flex items-start gap-3 mb-3">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
            style={{ background: `${project.color}18`, border: `1px solid ${project.color}30` }}
          >
            {project.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-base font-bold text-gray-100">{project.name}</h2>
            <p className="text-xs font-mono text-muted">{project.tagline}</p>
          </div>
        </div>

        {/* Platform badge */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.platform === 'ios' && (
            <span className="text-[10px] px-2 py-0.5 rounded-full font-mono border"
              style={{ color: '#00FFB3', borderColor: '#00FFB330', background: '#00FFB312' }}>
              iOS · Swift · Xcode
            </span>
          )}
          {project.platform === 'ios+android' && (
            <span className="text-[10px] px-2 py-0.5 rounded-full font-mono border"
              style={{ color: '#3B82F6', borderColor: '#3B82F630', background: '#3B82F612' }}>
              iOS + Android · React Native
            </span>
          )}
          {project.platform === 'web' && (
            <span className="text-[10px] px-2 py-0.5 rounded-full font-mono border"
              style={{ color: project.color, borderColor: `${project.color}30`, background: `${project.color}12` }}>
              Web app
            </span>
          )}
        </div>

        <p className="text-sm text-gray-300 leading-relaxed">{project.description}</p>
      </div>

      {/* Content */}
      <div className="flex-1 px-5 pb-5 space-y-5 overflow-auto">
        {/* Phone mockup for mobile apps */}
        {isMobile && project.screenshotCount && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="py-2"
          >
            <PhoneMockup
              screenshotCount={project.screenshotCount}
              color={project.color}
              platform={project.platform}
              projectId={project.id}
            />
          </motion.div>
        )}

        {/* Web app screenshots placeholder */}
        {!isMobile && project.screenshotCount && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-xl border border-border overflow-hidden"
            style={{ background: '#0D0D12' }}
          >
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-3 py-2 border-b border-border">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-red-500/60" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
                <div className="w-2 h-2 rounded-full bg-green-500/60" />
              </div>
              <div className="flex-1 h-4 rounded bg-border/50 mx-2" />
            </div>
            <div
              className="flex items-center justify-center py-10 flex-col gap-2"
              style={{ background: `${project.color}06` }}
            >
              <span className="text-2xl">{project.emoji}</span>
              <span className="text-xs font-mono text-muted">screenshots coming soon</span>
            </div>
          </motion.div>
        )}

        {/* Tech stack */}
        <div>
          <div className="text-[10px] text-muted font-mono mb-2 uppercase tracking-wider">Tech stack</div>
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <motion.span
                key={t}
                whileHover={{ scale: 1.05 }}
                className="text-xs px-2 py-1 rounded-lg font-mono cursor-default"
                style={{ background: `${project.color}12`, color: project.color, border: `1px solid ${project.color}25` }}
              >
                {t}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Links */}
        {project.links.length > 0 && (
          <div className="space-y-2">
            <div className="text-[10px] text-muted font-mono mb-2 uppercase tracking-wider">Links</div>
            {primaryLink && (
              <motion.a
                href={primaryLink.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl font-semibold text-sm transition-all"
                style={{ background: project.color, color: '#0B0B0F' }}
              >
                <span>{primaryLink.icon}</span>
                <span>{primaryLink.label}</span>
                <span>→</span>
              </motion.a>
            )}
            {secondaryLinks.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {secondaryLinks.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-lg border border-border hover:border-opacity-60 transition-all text-gray-300 hover:text-white"
                    style={{ background: 'rgba(255,255,255,0.03)' }}
                  >
                    <span>{link.icon}</span>
                    <span>{link.label}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        )}

        {project.links.length === 0 && (
          <div className="text-xs font-mono text-muted border border-border rounded-lg px-3 py-2">
            🚧 Coming soon — links will be added on launch
          </div>
        )}
      </div>
    </div>
  )
}

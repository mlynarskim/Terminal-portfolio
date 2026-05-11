import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Project, BuildStatus } from '../../data/projects'
import PhoneMockup from '../PhoneMockup'
import { useLanguage } from '../../contexts/LanguageContext'

interface Props {
  project: Project
}

export default function ProjectDetailApp({ project }: Props) {
  const { t } = useLanguage()
  const [webScreen, setWebScreen] = useState(0)
  const isMobile = project.platform === 'ios' || project.platform === 'ios+android'
  const primaryLink = project.links.find((l) => l.primary) ?? project.links[0]
  const secondaryLinks = project.links.filter((l) => !l.primary)

  const statusColors: Record<BuildStatus, { color: string; bg: string; dot: string }> = {
    live:          { color: '#00FFB3', bg: '#00FFB312', dot: '#00FFB3' },
    'coming-soon': { color: '#3B82F6', bg: '#3B82F612', dot: '#3B82F6' },
    beta:          { color: '#A78BFA', bg: '#A78BFA12', dot: '#A78BFA' },
    wip:           { color: '#F59E0B', bg: '#F59E0B12', dot: '#F59E0B' },
  }

  const statusCfg = project.status ? statusColors[project.status] : null
  const statusLabel = project.status ? t.projectDetail.status[project.status] : null

  // Web screenshots
  const webScreenshots = !isMobile
    ? (project.screenshots ?? Array.from({ length: project.screenshotCount ?? 0 }, () => ''))
    : []
  const hasWebScreens = webScreenshots.some(s => s.length > 0)
  const webImages = webScreenshots.filter(s => s.length > 0)

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
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base font-bold text-gray-100">{project.name}</h2>
              {project.version && (
                <span className="text-[10px] font-mono text-muted border border-border rounded px-1.5 py-0.5">
                  v{project.version}
                </span>
              )}
            </div>
            <p className="text-xs font-mono text-muted">{project.tagline}</p>
          </div>
        </div>

        {/* Badges row */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {/* Platform badge */}
          {project.platform === 'ios' && (
            <span className="text-[10px] px-2 py-0.5 rounded-full font-mono border"
              style={{ color: '#00FFB3', borderColor: '#00FFB330', background: '#00FFB312' }}>
              {t.projectDetail.platform.ios}
            </span>
          )}
          {project.platform === 'ios+android' && (
            <span className="text-[10px] px-2 py-0.5 rounded-full font-mono border"
              style={{ color: '#3B82F6', borderColor: '#3B82F630', background: '#3B82F612' }}>
              {t.projectDetail.platform['ios+android']}
            </span>
          )}
          {project.platform === 'web' && (
            <span className="text-[10px] px-2 py-0.5 rounded-full font-mono border"
              style={{ color: project.color, borderColor: `${project.color}30`, background: `${project.color}12` }}>
              {t.projectDetail.platform.web}
            </span>
          )}

          {/* Status badge */}
          {statusCfg && statusLabel && (
            <span
              className="text-[10px] px-2 py-0.5 rounded-full font-mono border flex items-center gap-1"
              style={{ color: statusCfg.color, borderColor: `${statusCfg.color}30`, background: statusCfg.bg }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full inline-block flex-shrink-0"
                style={{
                  background: statusCfg.dot,
                  boxShadow: project.status === 'live' ? `0 0 6px ${statusCfg.dot}` : 'none',
                }}
              />
              {statusLabel}
            </span>
          )}
        </div>

        <p className="text-sm text-gray-300 leading-relaxed">{project.description}</p>
      </div>

      {/* Content */}
      <div className="flex-1 px-5 pb-5 space-y-5 overflow-auto">

        {/* Phone mockup for mobile apps */}
        {isMobile && (project.screenshots || project.screenshotCount) && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="py-2"
          >
            <PhoneMockup
              screenshotCount={project.screenshotCount}
              screenshots={project.screenshots}
              color={project.color}
              platform={project.platform}
              projectId={project.id}
            />
          </motion.div>
        )}

        {/* Web app screenshots */}
        {!isMobile && (project.screenshots || project.screenshotCount) && (
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
              <div className="flex-1 h-4 rounded bg-border/50 mx-2 flex items-center px-2">
                <span className="text-[9px] text-muted font-mono truncate">
                  {primaryLink?.url ?? project.name.toLowerCase().replace(/ /g, '') + '.app'}
                </span>
              </div>
              {webImages.length > 1 && (
                <div className="flex gap-1 ml-auto">
                  <button
                    onClick={() => setWebScreen(s => (s - 1 + webImages.length) % webImages.length)}
                    className="text-muted hover:text-accent text-xs px-1"
                  >‹</button>
                  <span className="text-[9px] text-muted font-mono self-center">{webScreen + 1}/{webImages.length}</span>
                  <button
                    onClick={() => setWebScreen(s => (s + 1) % webImages.length)}
                    className="text-muted hover:text-accent text-xs px-1"
                  >›</button>
                </div>
              )}
            </div>

            {hasWebScreens ? (
              <AnimatePresence mode="wait">
                <motion.img
                  key={webScreen}
                  src={webImages[webScreen]}
                  alt={`${project.name} screenshot ${webScreen + 1}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-full object-cover object-top"
                  style={{ maxHeight: 220 }}
                  draggable={false}
                />
              </AnimatePresence>
            ) : (
              <div
                className="flex items-center justify-center py-10 flex-col gap-2"
                style={{ background: `${project.color}06` }}
              >
                <span className="text-2xl">{project.emoji}</span>
                <span className="text-xs font-mono text-muted">{t.projectDetail.screenshotsComingSoon}</span>
              </div>
            )}

            {/* Dots for web screenshots */}
            {webImages.length > 1 && (
              <div className="flex justify-center gap-1.5 py-2 border-t border-border">
                {webImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setWebScreen(i)}
                    className="rounded-full transition-all"
                    style={{
                      width: i === webScreen ? 16 : 6,
                      height: 6,
                      background: i === webScreen ? project.color : '#2A2A32',
                    }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Tech stack */}
        <div>
          <div className="text-[10px] text-muted font-mono mb-2 uppercase tracking-wider">{t.projectDetail.techStack}</div>
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((tech) => (
              <motion.span
                key={tech}
                whileHover={{ scale: 1.05 }}
                className="text-xs px-2 py-1 rounded-lg font-mono cursor-default"
                style={{ background: `${project.color}12`, color: project.color, border: `1px solid ${project.color}25` }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Links */}
        {project.links.length > 0 && (
          <div className="space-y-2">
            <div className="text-[10px] text-muted font-mono mb-2 uppercase tracking-wider">{t.projectDetail.links}</div>
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
            {t.projectDetail.comingSoonLinks}
          </div>
        )}

        {/* Social links */}
        {project.socialLinks && project.socialLinks.length > 0 && (
          <div>
            <div className="text-[10px] text-muted font-mono mb-2 uppercase tracking-wider">{t.projectDetail.follow}</div>
            <div className="flex flex-wrap gap-2">
              {project.socialLinks.map((link) => (
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
          </div>
        )}
      </div>
    </div>
  )
}

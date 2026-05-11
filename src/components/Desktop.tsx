import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AppIcon from './AppIcon'
import Window from './Window'
import ProjectsApp from './apps/ProjectsApp'
import AboutApp from './apps/AboutApp'
import ContactApp from './apps/ContactApp'
import BusinessAIApp from './apps/BusinessAIApp'
import AssistantApp from './apps/AssistantApp'
import ProjectDetailApp from './apps/ProjectDetailApp'
import { useWindowManager } from '../hooks/useWindowManager'
import type { WindowId } from '../hooks/useWindowManager'
import { projects, currentlyBuilding } from '../data/projects'
import { useLanguage } from '../contexts/LanguageContext'

interface Props {
  onOpenPalette: () => void
  onOpenWallpaperPicker: () => void
  externalOpen: WindowId | null
  onExternalHandled: () => void
}

const statusDot: Record<string, string> = {
  'live':         '#00FFB3',
  'coming-soon':  '#3B82F6',
  'beta':         '#A78BFA',
  'wip':          '#F59E0B',
}

export default function Desktop({ onOpenPalette, onOpenWallpaperPicker, externalOpen, onExternalHandled }: Props) {
  const wm = useWindowManager()
  const { t, lang } = useLanguage()
  const [showToast, setShowToast] = useState(false)
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null)

  useEffect(() => {
    if (externalOpen) {
      wm.openWindow(externalOpen)
      onExternalHandled()
    }
  }, [externalOpen])

  useEffect(() => {
    const t1 = setTimeout(() => setShowToast(true), 1800)
    const t2 = setTimeout(() => setShowToast(false), 5200)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  // Close context menu on click anywhere
  useEffect(() => {
    const close = () => setContextMenu(null)
    window.addEventListener('click', close)
    return () => window.removeEventListener('click', close)
  }, [])

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only show on bare desktop (not inside a window or icon)
    const target = e.target as HTMLElement
    if (target.closest('[data-window]') || target.closest('[data-appicon]')) return
    e.preventDefault()
    // Keep menu within viewport
    const x = Math.min(e.clientX, window.innerWidth - 180)
    const y = Math.min(e.clientY, window.innerHeight - 80)
    setContextMenu({ x, y })
  }

  const appIcons = [
    { id: 'projects' as WindowId,    label: t.apps.projects,   emoji: '📁', color: '#00FFB3' },
    { id: 'business-ai' as WindowId, label: t.apps.businessAI, emoji: '🤖', color: '#A78BFA' },
    { id: 'assistant' as WindowId,   label: t.apps.assistant,  emoji: '💬', color: '#3B82F6' },
    { id: 'about' as WindowId,       label: t.apps.about,      emoji: '👤', color: '#F59E0B' },
    { id: 'contact' as WindowId,     label: t.apps.contact,    emoji: '✉️', color: '#FB7185' },
  ]

  const projectPositions = [
    { x: 120, y: 60 }, { x: 160, y: 80 }, { x: 200, y: 100 },
    { x: 240, y: 120 }, { x: 280, y: 140 },
  ]

  return (
    <div
      className="fixed inset-0 pt-10"
      onContextMenu={handleContextMenu}
    >
      <div className="scanline" />

      {/* Desktop icons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="absolute top-16 left-6 flex flex-col gap-5"
      >
        {appIcons.map((app) => (
          <div key={app.id} data-appicon>
            <AppIcon
              label={app.label}
              emoji={app.emoji}
              accentColor={app.color}
              isOpen={wm.isOpen(app.id)}
              onClick={() => wm.openWindow(app.id)}
            />
          </div>
        ))}
      </motion.div>

      {/* Currently building widget */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-6 right-6 font-mono"
        style={{ maxWidth: 220 }}
      >
        <div
          className="rounded-xl border border-border px-3 py-3"
          style={{ background: 'rgba(18,18,26,0.85)', backdropFilter: 'blur(12px)' }}
        >
          <div className="text-[9px] text-muted uppercase tracking-widest mb-2">{t.desktop.currentlyBuilding}</div>
          <div className="space-y-2">
            {currentlyBuilding.map((item) => (
              <div key={item.project} className="flex items-start gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full mt-1 flex-shrink-0"
                  style={{
                    background: statusDot[item.status] ?? item.color,
                    boxShadow: item.status === 'live' ? `0 0 6px ${statusDot[item.status]}` : 'none',
                  }}
                />
                <div>
                  <div className="text-[11px] text-gray-200 leading-tight">{item.project}</div>
                  <div className="text-[9px] text-muted leading-tight">{item.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Bottom hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center"
      >
        <button
          onClick={onOpenPalette}
          className="text-xs text-muted hover:text-accent transition-colors font-mono"
        >
          {t.desktop.cmdHint}
        </button>
      </motion.div>

      {/* ⌘K toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[150]"
          >
            <div
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border font-mono text-xs text-gray-300 shadow-window"
              style={{ background: 'rgba(18,18,26,0.95)', backdropFilter: 'blur(12px)' }}
            >
              <span className="text-accent">✦</span>
              {t.desktop.cmdHint}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Right-click context menu */}
      <AnimatePresence>
        {contextMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1 }}
            className="fixed z-[180] rounded-xl overflow-hidden border border-border shadow-window"
            style={{
              left: contextMenu.x,
              top: contextMenu.y,
              background: 'rgba(18,18,26,0.97)',
              backdropFilter: 'blur(16px)',
              minWidth: 168,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => { setContextMenu(null); onOpenWallpaperPicker() }}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 hover:text-accent transition-colors font-mono text-left"
            >
              <span>🖼️</span>
              <span>{lang === 'pl' ? 'Zmień tapetę' : 'Change wallpaper'}</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Windows ── */}
      <div data-window>
        <Window id="projects" title="Projects.app" isOpen={wm.isOpen('projects')} zIndex={wm.getZ('projects')}
          onClose={() => wm.closeWindow('projects')} onFocus={() => wm.focusWindow('projects')}
          initialPosition={{ x: 100, y: 55 }} width={580} height={520}>
          <ProjectsApp onOpenProject={(id) => wm.openWindow(id)} />
        </Window>

        <Window id="business-ai" title="Business AI.app" isOpen={wm.isOpen('business-ai')} zIndex={wm.getZ('business-ai')}
          onClose={() => wm.closeWindow('business-ai')} onFocus={() => wm.focusWindow('business-ai')}
          initialPosition={{ x: 140, y: 65 }} width={480} height={560}>
          <BusinessAIApp />
        </Window>

        <Window id="assistant" title="Assistant.app" isOpen={wm.isOpen('assistant')} zIndex={wm.getZ('assistant')}
          onClose={() => wm.closeWindow('assistant')} onFocus={() => wm.focusWindow('assistant')}
          initialPosition={{ x: 200, y: 75 }} width={520} height={480}>
          <AssistantApp />
        </Window>

        <Window id="about" title="About.app" isOpen={wm.isOpen('about')} zIndex={wm.getZ('about')}
          onClose={() => wm.closeWindow('about')} onFocus={() => wm.focusWindow('about')}
          initialPosition={{ x: 180, y: 80 }} width={500} height={380}>
          <AboutApp />
        </Window>

        <Window id="contact" title="Contact.app" isOpen={wm.isOpen('contact')} zIndex={wm.getZ('contact')}
          onClose={() => wm.closeWindow('contact')} onFocus={() => wm.focusWindow('contact')}
          initialPosition={{ x: 220, y: 100 }} width={400} height={440}>
          <ContactApp />
        </Window>

        {projects.map((project, i) => (
          <Window
            key={project.id}
            id={`project-${project.id}` as WindowId}
            title={project.name}
            isOpen={wm.isOpen(`project-${project.id}` as WindowId)}
            zIndex={wm.getZ(`project-${project.id}` as WindowId)}
            onClose={() => wm.closeWindow(`project-${project.id}` as WindowId)}
            onFocus={() => wm.focusWindow(`project-${project.id}` as WindowId)}
            initialPosition={projectPositions[i] ?? { x: 140 + i * 20, y: 70 + i * 20 }}
            width={500} height={560}
          >
            <ProjectDetailApp project={project} />
          </Window>
        ))}
      </div>
    </div>
  )
}

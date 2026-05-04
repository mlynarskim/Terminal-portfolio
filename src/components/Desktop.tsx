import { useEffect } from 'react'
import { motion } from 'framer-motion'
import AppIcon from './AppIcon'
import Window from './Window'
import ProjectsApp from './apps/ProjectsApp'
import AboutApp from './apps/AboutApp'
import ContactApp from './apps/ContactApp'
import ProjectDetailApp from './apps/ProjectDetailApp'
import { useWindowManager } from '../hooks/useWindowManager'
import type { WindowId } from '../hooks/useWindowManager'
import { projects } from '../data/projects'

interface Props {
  onOpenPalette: () => void
  externalOpen: WindowId | null
  onExternalHandled: () => void
}

export default function Desktop({ onOpenPalette, externalOpen, onExternalHandled }: Props) {
  const wm = useWindowManager()

  useEffect(() => {
    if (externalOpen) {
      wm.openWindow(externalOpen)
      onExternalHandled()
    }
  }, [externalOpen])

  const appIcons = [
    { id: 'projects' as WindowId, label: 'Projects', emoji: '📁', color: '#00FFB3' },
    { id: 'about' as WindowId, label: 'About', emoji: '👤', color: '#3B82F6' },
    { id: 'contact' as WindowId, label: 'Contact', emoji: '✉️', color: '#A78BFA' },
  ]

  // Staggered initial positions for project windows
  const projectPositions = [
    { x: 120, y: 60 },
    { x: 160, y: 80 },
    { x: 200, y: 100 },
    { x: 240, y: 120 },
  ]

  return (
    <div className="fixed inset-0 pt-10">
      <div className="scanline" />

      {/* Desktop icons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="absolute top-16 left-6 flex flex-col gap-5"
      >
        {appIcons.map((app) => (
          <AppIcon
            key={app.id}
            label={app.label}
            emoji={app.emoji}
            accentColor={app.color}
            isOpen={wm.isOpen(app.id)}
            onClick={() => wm.openWindow(app.id)}
          />
        ))}
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
          <kbd className="border border-border rounded px-1 py-0.5 mr-1">⌘K</kbd>
          command palette
        </button>
      </motion.div>

      {/* App windows */}
      <Window id="projects" title="Projects.app" isOpen={wm.isOpen('projects')} zIndex={wm.getZ('projects')}
        onClose={() => wm.closeWindow('projects')} onFocus={() => wm.focusWindow('projects')}
        initialPosition={{ x: 100, y: 55 }} width={580} height={480}>
        <ProjectsApp onOpenProject={(id) => wm.openWindow(id)} />
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

      {/* Project detail windows */}
      {projects.map((project, i) => (
        <Window
          key={project.id}
          id={`project-${project.id}` as WindowId}
          title={`${project.name}`}
          isOpen={wm.isOpen(`project-${project.id}` as WindowId)}
          zIndex={wm.getZ(`project-${project.id}` as WindowId)}
          onClose={() => wm.closeWindow(`project-${project.id}` as WindowId)}
          onFocus={() => wm.focusWindow(`project-${project.id}` as WindowId)}
          initialPosition={projectPositions[i] ?? { x: 140 + i * 20, y: 70 + i * 20 }}
          width={500}
          height={560}
        >
          <ProjectDetailApp project={project} />
        </Window>
      ))}
    </div>
  )
}

import { motion } from 'framer-motion'
import { projects } from '../data/projects'

const socials = [
  { label: 'GitHub', url: 'https://github.com/mlynarskim', icon: '⌨️' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/mateuszmlynarski/', icon: '💼' },
  { label: 'X / Twitter', url: 'https://x.com/mlynarskimat', icon: '🐦' },
  { label: 'Instagram', url: 'https://www.instagram.com/mlynarskimat', icon: '📸' },
]

export default function SimpleView() {
  return (
    <div className="min-h-screen overflow-auto px-5 py-12 max-w-xl mx-auto space-y-12">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="space-y-1 pt-4">
        <h1 className="text-2xl font-bold text-gray-100">Mateusz Młynarski</h1>
        <p className="text-muted font-mono text-sm">Mobile App Builder · iOS · Android · MVP</p>
      </motion.div>

      {/* About */}
      <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 }} className="space-y-3">
        <h2 className="text-[10px] font-mono text-accent uppercase tracking-widest">About</h2>
        <p className="text-sm text-gray-300 leading-relaxed">
          I build fast, focused apps for iOS and Android. If you have an idea and need someone to turn it into a product — let's talk.
        </p>
      </motion.section>

      {/* Projects */}
      <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-3">
        <h2 className="text-[10px] font-mono text-accent uppercase tracking-widest">Projects</h2>
        {projects.map((p) => (
          <div key={p.id} className="border border-border rounded-xl p-4 space-y-2" style={{ background: 'rgba(26,26,31,0.6)' }}>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">{p.emoji}</span>
                <h3 className="font-semibold text-gray-100 text-sm">{p.name}</h3>
              </div>
              <span
                className="text-[9px] px-1.5 py-0.5 rounded font-mono flex-shrink-0"
                style={{ background: `${p.color}15`, color: p.color }}
              >
                {p.platform === 'ios' ? 'iOS' : p.platform === 'ios+android' ? 'iOS + Android' : 'Web'}
              </span>
            </div>
            <p className="text-xs text-muted font-mono">{p.tagline.split('—')[0].trim()}</p>
            <p className="text-sm text-gray-300 leading-relaxed">{p.description.slice(0, 140)}…</p>
            <div className="flex flex-wrap gap-1 pt-1">
              {p.tech.slice(0, 4).map((t) => (
                <span key={t} className="text-[9px] px-1.5 py-0.5 rounded font-mono"
                  style={{ background: `${p.color}12`, color: p.color }}>
                  {t}
                </span>
              ))}
            </div>
            {p.links.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {p.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-muted hover:text-accent transition-colors flex items-center gap-1"
                  >
                    <span>{link.icon}</span>
                    <span>{link.label}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </motion.section>

      {/* Contact */}
      <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }} className="space-y-4">
        <h2 className="text-[10px] font-mono text-accent uppercase tracking-widest">Contact</h2>
        <a
          href="mailto:mlynarski.mateusz@gmail.com"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm"
          style={{ background: '#00FFB3', color: '#0B0B0F' }}
        >
          Let's build something →
        </a>
        <div className="flex flex-wrap gap-3 pt-1">
          {socials.map((s) => (
            <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-mono text-muted hover:text-accent transition-colors">
              <span>{s.icon}</span>
              <span>{s.label}</span>
            </a>
          ))}
        </div>
      </motion.section>
    </div>
  )
}

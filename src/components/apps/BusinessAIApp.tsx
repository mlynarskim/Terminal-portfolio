import { motion } from 'framer-motion'

const services = [
  {
    id: 'chatbots',
    icon: '🤖',
    title: 'AI Chatbots',
    desc: 'Custom assistants trained on your business — handle FAQs, bookings and support 24/7.',
    color: '#00FFB3',
  },
  {
    id: 'booking',
    icon: '📅',
    title: 'Booking Assistants',
    desc: 'AI that books appointments, sends reminders and reduces no-shows automatically.',
    color: '#3B82F6',
  },
  {
    id: 'support',
    icon: '💬',
    title: 'Customer Support AI',
    desc: 'Instant, accurate answers to customer questions — no waiting, no missed messages.',
    color: '#A78BFA',
  },
  {
    id: 'websites',
    icon: '🌐',
    title: 'AI-powered Websites',
    desc: 'Modern business sites with built-in AI assistants. Stand out from generic templates.',
    color: '#F59E0B',
  },
  {
    id: 'leads',
    icon: '📈',
    title: 'Lead Generation Tools',
    desc: 'AI forms and flows that qualify leads automatically before they reach you.',
    color: '#FB7185',
  },
]

const industries = [
  { icon: '💅', label: 'Beauty salons' },
  { icon: '🔧', label: 'Workshops' },
  { icon: '🍽️', label: 'Restaurants' },
  { icon: '🏪', label: 'Local businesses' },
]

export default function BusinessAIApp() {
  return (
    <div className="h-full flex flex-col overflow-auto">
      {/* Header */}
      <div
        className="px-5 pt-5 pb-4 flex-shrink-0"
        style={{ background: 'linear-gradient(135deg, rgba(0,255,179,0.08), transparent)' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border"
              style={{ color: '#00FFB3', borderColor: '#00FFB330', background: '#00FFB312' }}>
              ● AI powered
            </span>
          </div>
          <h2 className="text-base font-bold text-gray-100 leading-snug mb-1">
            AI tools and automations<br />for modern businesses
          </h2>
          <p className="text-xs font-mono text-muted">
            Ship faster. Automate more. Stand out online.
          </p>
        </motion.div>
      </div>

      {/* Content */}
      <div className="flex-1 px-5 pb-5 space-y-5 overflow-auto">

        {/* Services */}
        <div>
          <div className="text-[10px] text-muted font-mono mb-3 uppercase tracking-wider">Services</div>
          <div className="space-y-2">
            {services.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.25 }}
                className="flex items-start gap-3 rounded-xl p-3 border border-border transition-all"
                style={{ background: 'rgba(26,26,31,0.6)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${s.color}40`
                  e.currentTarget.style.background = `${s.color}06`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = ''
                  e.currentTarget.style.background = 'rgba(26,26,31,0.6)'
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
                  style={{ background: `${s.color}15`, border: `1px solid ${s.color}30` }}
                >
                  {s.icon}
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-100 mb-0.5">{s.title}</div>
                  <div className="text-xs text-muted leading-relaxed">{s.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Industries */}
        <div>
          <div className="text-[10px] text-muted font-mono mb-3 uppercase tracking-wider">Industries</div>
          <div className="grid grid-cols-2 gap-2">
            {industries.map((ind) => (
              <div
                key={ind.label}
                className="flex items-center gap-2 rounded-lg px-3 py-2 border border-border font-mono text-xs text-gray-300"
                style={{ background: 'rgba(26,26,31,0.6)' }}
              >
                <span>{ind.icon}</span>
                <span>{ind.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="space-y-2 pt-1">
          <motion.a
            href="mailto:mlynarski.mateusz@gmail.com"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl font-semibold text-sm"
            style={{ background: '#00FFB3', color: '#0B0B0F' }}
          >
            <span>✉️</span>
            <span>Contact</span>
            <span>→</span>
          </motion.a>
        </div>

        {/* Demo links */}
        <div>
          <div className="text-[10px] text-muted font-mono mb-2 uppercase tracking-wider">Live demos</div>
          <div className="space-y-1.5">
            {[
              { label: 'beauty-ai.demo', url: '/demos/beauty.html', color: '#FB7185', icon: '💅', desc: 'Nail Studio · AI chat' },
              { label: 'workshop-ai.demo', url: '/demos/workshop.html', color: '#F59E0B', icon: '🔧', desc: 'Auto-Expert · AI chat' },
              { label: 'Martur Agrousługi', url: '/demos/agro.html', color: '#34D399', icon: '🌾', desc: 'Agrousługi · Roboty Ziemne' },
            ].map((d) => (
              <a
                key={d.label}
                href={d.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-border hover:border-opacity-60 transition-all font-mono"
                style={{ background: 'rgba(26,26,31,0.6)' }}
              >
                <span className="text-base flex-shrink-0">{d.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-xs" style={{ color: d.color }}>{d.label}</div>
                  <div className="text-[9px] text-muted">{d.desc}</div>
                </div>
                <span
                  className="text-[10px] px-2 py-1 rounded-lg border flex-shrink-0 font-semibold transition-all"
                  style={{ borderColor: `${d.color}40`, background: `${d.color}12`, color: d.color }}
                >
                  Open Demo ↗
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

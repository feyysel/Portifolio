import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ChartLine, Layers, ShoppingBag, Users, FolderGit2, Car, Gift, Utensils, Lock, X, Sparkles, Mail } from 'lucide-react'
import Section from './Section.jsx'
import { profile } from '../data/profile.js'

const projectIcons = { chart: ChartLine, layers: Layers, shopping: ShoppingBag, users: Users, car: Car, gift: Gift, utensils: Utensils }

function TiltCard({ children, className = '' }) {
  const ref = useRef(null)

  const onMouseMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(1000px) rotateY(${px * 10}deg) rotateX(${py * -10}deg) translateY(-4px)`
  }

  const onMouseLeave = () => {
    if (ref.current) ref.current.style.transform = ''
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`tilt-card ${className}`}
    >
      {children}
    </div>
  )
}

function LockedProjectModal({ project, onClose }) {
  const Icon = projectIcons[project.icon] || FolderGit2

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 12 }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        onClick={(e) => e.stopPropagation()}
        className="glow-ring glass relative w-full max-w-md overflow-hidden rounded-3xl p-8 text-center"
      >
        <div className={`pointer-events-none absolute -top-28 -right-24 h-56 w-56 rounded-full bg-gradient-to-br ${project.accent} opacity-25 blur-3xl`} />
        <div className="pointer-events-none absolute -bottom-28 -left-24 h-56 w-56 rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 opacity-20 blur-3xl" />

        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white"
        >
          <X size={16} />
        </button>

        <div className="relative">
          <div className={`relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${project.accent} text-white shadow-lg`}>
            <Icon size={26} />
            <span className="absolute -right-2 -bottom-2 flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-ink text-amber-300 shadow-md">
              <Lock size={13} />
            </span>
          </div>

          <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-[11px] font-medium tracking-wide text-amber-300 uppercase">
            <Sparkles size={12} /> Not published yet
          </span>

          <h3 className="mb-2 font-display text-2xl font-bold text-white">{project.title}</h3>
          <p className="mx-auto mb-7 max-w-sm text-sm leading-relaxed text-slate-400">
            The application is not published yet. If you'd like to check it out, please contact me.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href="#contact"
              onClick={onClose}
              className={`inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br ${project.accent} px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:brightness-110`}
            >
              <Mail size={15} /> Contact me
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/10"
            >
              {profile.email}
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const [locked, setLocked] = useState(null)

  return (
    <Section id="projects" eyebrow="03 · Projects" title="Selected work that ships">
      <div className="grid gap-6 md:grid-cols-2">
        {profile.projects.map((project, i) => {
          const Icon = projectIcons[project.icon] || FolderGit2
          const isLocked = Boolean(project.locked)
          return (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.65, delay: (i % 2) * 0.12 }}
            >
              <TiltCard className="group h-full">
                <a
                  href={isLocked ? undefined : project.link}
                  target={isLocked ? undefined : '_blank'}
                  rel="noreferrer"
                  onClick={isLocked ? (e) => { e.preventDefault(); setLocked(project) } : undefined}
                  className={`glass relative flex h-full flex-col overflow-hidden rounded-3xl p-7 transition-shadow hover:shadow-2xl hover:shadow-violet-500/15 ${project.featured ? 'md:row-span-1' : ''}`}
                >
                  <div
                    className={`pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-gradient-to-br ${project.accent} opacity-15 blur-3xl transition-all duration-500 group-hover:opacity-30`}
                  />
                  <div className="mb-8 flex items-start justify-between">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${project.accent} text-white shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}
                    >
                      <Icon size={24} />
                    </div>
                    {isLocked ? (
                      <span className="flex items-center gap-1 rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-300 opacity-0 transition-all duration-300 group-hover:opacity-100">
                        <Lock size={12} /> Coming soon
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300 opacity-0 transition-all duration-300 group-hover:opacity-100">
                        Live demo <ArrowUpRight size={13} />
                      </span>
                    )}
                  </div>
                  <h3 className="mb-3 font-display text-2xl font-bold text-white">{project.title}</h3>
                  <p className="mb-6 flex-1 text-sm leading-relaxed text-slate-400">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-cyan-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </a>
              </TiltCard>
            </motion.div>
          )
        })}
      </div>

      <AnimatePresence>
        {locked && <LockedProjectModal project={locked} onClose={() => setLocked(null)} />}
      </AnimatePresence>
    </Section>
  )
}

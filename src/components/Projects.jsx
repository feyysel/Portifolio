import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, ChartLine, Layers, ShoppingBag, Users, FolderGit2, Car, Gift } from 'lucide-react'
import Section from './Section.jsx'
import { profile } from '../data/profile.js'

const projectIcons = { chart: ChartLine, layers: Layers, shopping: ShoppingBag, users: Users, car: Car, gift: Gift }

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

export default function Projects() {
  return (
    <Section id="projects" eyebrow="03 · Projects" title="Selected work that ships">
      <div className="grid gap-6 md:grid-cols-2">
        {profile.projects.map((project, i) => {
          const Icon = projectIcons[project.icon] || FolderGit2
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
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
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
                    <span className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300 opacity-0 transition-all duration-300 group-hover:opacity-100">
                      Live demo <ArrowUpRight size={13} />
                    </span>
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
    </Section>
  )
}

import { motion } from 'framer-motion'
import { Briefcase } from 'lucide-react'
import Section from './Section.jsx'
import { profile } from '../data/profile.js'

export default function Experience() {
  return (
    <Section id="experience" eyebrow="04 · Experience" title="The journey so far">
      <div className="relative ml-3 border-l border-white/10 pl-8 md:ml-6">
        {profile.experience.map((job, i) => (
          <motion.div
            key={job.company}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: i * 0.12 }}
            className="relative mb-12 last:mb-0"
          >
            <span className="absolute -left-[41px] flex h-7 w-7 items-center justify-center rounded-full border border-violet-500/40 bg-[#0a0c14]">
              <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-violet-500 to-cyan-400" />
            </span>
            <div className="group glass rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-500/10">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-display text-xl font-bold text-white">
                  {job.role}
                  <span className="text-gradient"> @ {job.company}</span>
                </h3>
                <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-cyan-300">
                  <Briefcase size={12} />
                  {job.period}
                </span>
              </div>
              <ul className="mt-4 space-y-2">
                {job.points.map((point) => (
                  <li key={point} className="flex gap-2.5 text-sm leading-relaxed text-slate-400">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

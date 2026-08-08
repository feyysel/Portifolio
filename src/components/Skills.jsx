import { motion } from 'framer-motion'
import { Code2, Sparkles, Cog, Smartphone } from 'lucide-react'
import Section from './Section.jsx'
import { profile } from '../data/profile.js'

const categoryIcons = { code: Code2, sparkles: Sparkles, cog: Cog, mobile: Smartphone }

export default function Skills() {
  return (
    <Section id="skills" eyebrow="02 · Skills" title="My technical arsenal">
      <div className="grid gap-6 md:grid-cols-3">
        {profile.skills.map((group, gi) => {
          const Icon = categoryIcons[group.icon] || Code2
          return (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: gi * 0.12 }}
              whileHover={{ y: -6 }}
              className="glass rounded-2xl p-6 transition-shadow hover:shadow-2xl hover:shadow-cyan-500/10"
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-violet-500/20 text-cyan-300">
                  <Icon size={20} />
                </div>
                <h3 className="font-display text-lg font-semibold text-white">{group.category}</h3>
              </div>
              <div className="space-y-5">
                {group.items.map((skill, si) => (
                  <div key={skill.name}>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="font-medium text-slate-300">{skill.name}</span>
                      <span className="font-mono text-xs text-violet-400">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 1.1, delay: 0.2 + si * 0.12, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full rounded-full bg-gradient-to-r from-violet-500 via-cyan-400 to-emerald-400"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}

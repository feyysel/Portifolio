import { motion } from 'framer-motion'
import { Sparkles, Orbit, Box, Zap, Bot, CheckCircle2, Code2, Smartphone, Database, GraduationCap, MapPin } from 'lucide-react'
import Section from './Section.jsx'
import { profile } from '../data/profile.js'

const serviceIcons = { orbit: Orbit, box: Box, zap: Zap, bot: Bot, code: Code2, smartphone: Smartphone, database: Database }

export default function About() {
  return (
    <Section id="about" eyebrow="01 · About" title="Turning ideas into digital experiences">
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="text-lg leading-relaxed text-slate-300"
          >
            {profile.about}
          </motion.p>
          <motion.ul
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-8 grid gap-3 sm:grid-cols-2"
          >
            {['Web development', 'Mobile apps with Flutter', 'Backend & APIs', 'Clean, scalable code'].map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm text-slate-400">
                <CheckCircle2 size={17} className="shrink-0 text-emerald-400" />
                {item}
              </li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass mt-8 rounded-2xl p-5"
          >
            <div className="mb-4 flex items-center gap-2.5 text-sm font-semibold text-white">
              <GraduationCap size={18} className="text-violet-400" />
              Education
            </div>
            <h4 className="font-display text-lg font-bold text-white">{profile.education.degree}</h4>
            <p className="mt-1 text-sm text-slate-400">{profile.education.university}</p>
            <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-cyan-300">
              <MapPin size={12} />
              {profile.education.year}
            </span>
          </motion.div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {profile.services.map((service, i) => {
            const Icon = serviceIcons[service.icon] || Sparkles
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="glass group rounded-2xl p-5 transition-shadow hover:shadow-xl hover:shadow-violet-500/10"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-400/20 text-violet-300 transition-all duration-300 group-hover:from-violet-500 group-hover:to-cyan-400 group-hover:text-black">
                  <Icon size={20} />
                </div>
                <h3 className="mb-2 font-display text-base font-semibold text-white">{service.title}</h3>
                <p className="text-sm leading-relaxed text-slate-400">{service.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}

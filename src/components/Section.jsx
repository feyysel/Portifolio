import { motion } from 'framer-motion'

export default function Section({ id, eyebrow, title, children, className = '' }) {
  return (
    <section id={id} className={`relative mx-auto max-w-6xl px-6 py-28 ${className}`}>
      <div className="mb-14">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mb-3 font-mono text-sm tracking-widest text-violet-400 uppercase"
        >
          {eyebrow}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="font-display text-4xl font-bold tracking-tight text-white md:text-5xl"
        >
          {title}
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-5 h-px w-24 bg-gradient-to-r from-violet-500 to-cyan-400"
        />
      </div>
      {children}
    </section>
  )
}

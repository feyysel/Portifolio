import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Send, MessageSquare } from 'lucide-react'
import Section from './Section.jsx'
import { profile } from '../data/profile.js'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name}`)
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  return (
    <Section id="contact" eyebrow="05 · Contact" title="Let's build something great">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-5">
          {[
            { icon: Mail, label: 'Email me', value: profile.email, href: `mailto:${profile.email}` },
            { icon: MapPin, label: 'Based in', value: profile.location },
            { icon: MessageSquare, label: 'Response time', value: 'Within 24 hours' },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass flex items-center gap-4 rounded-2xl p-5 transition-all hover:translate-x-1 hover:shadow-lg hover:shadow-violet-500/10"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-400/20 text-violet-300">
                <item.icon size={20} />
              </div>
              <div>
                <div className="text-xs font-medium tracking-wide text-slate-500 uppercase">{item.label}</div>
                {item.href ? (
                  <a href={item.href} className="font-medium text-white transition-colors hover:text-violet-300">
                    {item.value}
                  </a>
                ) : (
                  <div className="font-medium text-white">{item.value}</div>
                )}
              </div>
            </motion.div>
          ))}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-sm leading-relaxed text-slate-500"
          >
            Currently open to freelance projects, full-time roles, and speaking opportunities.
            Don't be shy — drop me a line.
          </motion.p>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          className="glass space-y-5 rounded-3xl p-7"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-300">
                Your name
              </label>
              <input
                id="name"
                required
                value={form.name}
                onChange={update('name')}
                placeholder="John Doe"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-600 transition-all focus:border-violet-500 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-300">
                Your email
              </label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={update('email')}
                placeholder="john@example.com"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-600 transition-all focus:border-violet-500 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
              />
            </div>
          </div>
          <div>
            <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-300">
              Your message
            </label>
            <textarea
              id="message"
              required
              rows={5}
              value={form.message}
              onChange={update('message')}
              placeholder="Tell me about your project..."
              className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-600 transition-all focus:border-violet-500 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
            />
          </div>
          <button
            type="submit"
            className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-violet-500 to-cyan-400 px-6 py-3.5 text-sm font-semibold text-black shadow-lg shadow-violet-500/25 transition-all hover:shadow-violet-500/45"
          >
            <span className="absolute inset-0 -translate-x-full bg-white/30 transition-transform duration-500 group-hover:translate-x-full" />
            <Send size={16} className="relative" />
            <span className="relative">{sent ? 'Opening your email client…' : 'Send Message'}</span>
          </button>
        </motion.form>
      </div>
    </Section>
  )
}

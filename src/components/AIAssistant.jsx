import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, X, Send, Settings, Sparkles, Loader2, Check } from 'lucide-react'
import { assistantConfig, aiProviders, profile } from '../data/profile.js'
import { askAssistant, getSettings, saveSettings, hasValidKey } from '../lib/assistant.js'

function SettingsPanel({ onClose, onSaved }) {
  const [settings, setSettings] = useState(getSettings())
  const [saved, setSaved] = useState(false)
  const providerOptions = Object.entries(aiProviders)

  const handleSave = () => {
    saveSettings(settings)
    setSaved(true)
    setTimeout(onClose, 800)
    onSaved()
  }

  const provider = aiProviders[settings.provider]

  return (
    <div className="border-t border-white/10 bg-white/5 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h4 className="text-sm font-semibold text-white">Assistant settings</h4>
        <button type="button" onClick={onClose} className="text-slate-400 hover:text-white" aria-label="Close settings">
          <X size={16} />
        </button>
      </div>
      <div className="space-y-3">
        <div>
          <label className="mb-1 block text-xs text-slate-400">Provider</label>
          <div className="grid grid-cols-2 gap-2">
            {providerOptions.map(([key, opt]) => (
              <button
                key={key}
                type="button"
                onClick={() => setSettings((s) => ({ ...s, provider: key, endpoint: '' }))}
                className={`rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
                  settings.provider === key
                    ? 'border-violet-500 bg-violet-500/15 text-white'
                    : 'border-white/10 bg-white/5 text-slate-400 hover:text-white'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label htmlFor="ai-key" className="mb-1 block text-xs text-slate-400">
            API key <span className="text-slate-600">({provider.keyHint})</span>
          </label>
          <input
            id="ai-key"
            type="password"
            value={settings.apiKey}
            onChange={(e) => setSettings((s) => ({ ...s, apiKey: e.target.value.trim() }))}
            placeholder="Paste your API key"
            className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-xs text-white placeholder:text-slate-600 focus:border-violet-500 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="ai-endpoint" className="mb-1 block text-xs text-slate-400">
            API endpoint <span className="text-slate-600">(optional override)</span>
          </label>
          <input
            id="ai-endpoint"
            type="text"
            value={settings.endpoint}
            onChange={(e) => setSettings((s) => ({ ...s, endpoint: e.target.value.trim() }))}
            placeholder={provider.endpoint}
            className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-xs text-white placeholder:text-slate-600 focus:border-violet-500 focus:outline-none"
          />
        </div>
        <button
          type="button"
          onClick={handleSave}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-violet-500 to-cyan-400 px-3 py-2.5 text-xs font-semibold text-black transition-all hover:brightness-110"
        >
          {saved ? <Check size={14} /> : <Settings size={14} />}
          {saved ? 'Saved' : 'Save settings'}
        </button>
      </div>
    </div>
  )
}

export default function AIAssistant() {
  const [open, setOpen] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: assistantConfig.greeting },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [configured, setConfigured] = useState(hasValidKey())
  const scrollRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, loading, open])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 250)
  }, [open])

  const send = async (text = input) => {
    const content = text.trim()
    if (!content || loading) return
    setError('')
    const next = [...messages, { role: 'user', content }]
    setMessages(next)
    setInput('')
    setLoading(true)
    try {
      const reply = await askAssistant(next.slice(1))
      setMessages((m) => [...m, { role: 'assistant', content: reply }])
    } catch (err) {
      setError(err.message)
      setMessages((m) => [
        ...m,
        { role: 'assistant', content: `⚠️ ${err.message} — open the settings (gear icon) to add an API key.` },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.4, type: 'spring', stiffness: 260, damping: 18 }}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 text-black shadow-xl shadow-violet-500/40 transition-all hover:scale-110"
        aria-label="Toggle AI assistant"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={24} />
            </motion.span>
          ) : (
            <motion.span key="bot" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <Bot size={24} />
            </motion.span>
          )}
        </AnimatePresence>
        {!open && (
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-[#05060a] bg-emerald-400" />
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="glass fixed right-4 bottom-24 z-50 flex h-[540px] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-3xl shadow-2xl shadow-black/60"
          >
            <div className="flex items-center gap-3 border-b border-white/10 bg-white/5 px-4 py-3">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400 text-black">
                <Sparkles size={17} />
                <span className="absolute -right-0.5 -bottom-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#0a0c14] bg-emerald-400" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-white">{assistantConfig.name} · AI Assistant</div>
                <div className="text-[11px] text-emerald-300">
                  {configured ? 'Online · ready to chat' : 'Setup required'}
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowSettings((s) => !s)
                  setMessages([{ role: 'assistant', content: assistantConfig.greeting }])
                }}
                className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Settings"
              >
                <Settings size={17} className={showSettings ? 'animate-spin-slow text-violet-400' : ''} />
              </button>
            </div>

            {!showSettings ? (
              <>
                <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed whitespace-pre-wrap ${
                          msg.role === 'user'
                            ? 'rounded-br-md bg-gradient-to-r from-violet-500 to-cyan-400 text-black'
                            : 'rounded-bl-md border border-white/10 bg-white/5 text-slate-200'
                        }`}
                      >
                        {msg.content}
                      </div>
                    </motion.div>
                  ))}
                  {loading && (
                    <div className="flex justify-start">
                      <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-white/10 bg-white/5 px-4 py-3">
                        {[0, 1, 2].map((i) => (
                          <motion.span
                            key={i}
                            animate={{ opacity: [0.2, 1, 0.2], y: [0, -3, 0] }}
                            transition={{ duration: 1, repeat: Infinity, delay: i * 0.18 }}
                            className="h-1.5 w-1.5 rounded-full bg-violet-400"
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {error && (
                  <div className="px-4 pb-2 text-[11px] text-amber-300">{error}</div>
                )}

                {messages.length <= 1 && !loading && (
                  <div className="flex flex-wrap gap-2 px-4 pb-3">
                    {assistantConfig.suggestedQuestions.map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => send(q)}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] text-slate-300 transition-all hover:border-violet-500/50 hover:text-white"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                )}

                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    send()
                  }}
                  className="flex items-center gap-2 border-t border-white/10 bg-white/5 p-3"
                >
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={`Ask ${assistantConfig.name} about ${profile.firstName}…`}
                    className="flex-1 rounded-xl border border-white/10 bg-black/30 px-3.5 py-2.5 text-[13px] text-white placeholder:text-slate-600 focus:border-violet-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-violet-500 to-cyan-400 text-black transition-all hover:brightness-110 disabled:opacity-40"
                    aria-label="Send message"
                  >
                    {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                  </button>
                </form>
              </>
            ) : (
              <SettingsPanel
                onClose={() => setShowSettings(false)}
                onSaved={() => setConfigured(hasValidKey())}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

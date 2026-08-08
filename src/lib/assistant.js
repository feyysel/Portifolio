import { aiProviders, assistantConfig } from '../data/profile.js'

const STORAGE_KEY = 'portfolio-ai-settings'

export function getSettings() {
  const defaults = {
    provider: assistantConfig.provider,
    endpoint: assistantConfig.endpoint,
    apiKey: '',
  }
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    return { ...defaults, ...saved }
  } catch {
    return defaults
  }
}

export function saveSettings(settings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
}

export function hasValidKey() {
  const s = getSettings()
  return Boolean(s.apiKey || s.endpoint)
}

export async function askAssistant(history) {
  const settings = getSettings()
  const provider = aiProviders[settings.provider] || aiProviders.openai
  const endpoint = settings.endpoint || provider.endpoint

  if (!settings.apiKey) {
    throw new Error('Missing API key. Open the assistant settings to add one.')
  }

  const body = provider.buildBody({
    system: assistantConfig.systemPrompt,
    history: history.map((m) => ({
      role: m.role,
      content: m.content,
    })),
  })

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${settings.apiKey}`,
  }
  if (settings.provider === 'anthropic') {
    headers['anthropic-version'] = '2023-06-01'
  }

  const res = await fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    throw new Error(`Request failed (${res.status})${detail ? `: ${detail.slice(0, 200)}` : ''}`)
  }

  const data = await res.json()
  const text = provider.extractText(data)
  if (!text) throw new Error('Empty response from provider.')
  return text
}

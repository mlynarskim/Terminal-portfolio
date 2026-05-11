import { useState, useCallback, useRef } from 'react'

const MAX_MESSAGES = 10
const GEMINI_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent'

export const PORTFOLIO_SYSTEM_PROMPT = `You are an AI assistant embedded in the portfolio of Mateusz Młynarski — an indie developer and AI builder based in Poland.

Respond briefly (1–3 sentences), professionally and naturally. Talk like a founder, not a corporate chatbot. No emoji spam.

What Mateusz builds:
- AI chatbots and assistants for local businesses (salons, workshops, restaurants, agro)
- iOS apps (Swift/SwiftUI) — e.g. Travel Rules, live on the App Store
- Cross-platform mobile apps (React Native/Expo) — e.g. Rate That Beach
- Web apps and AI-powered tools — e.g. SOLOS (AI movie curator)
- Business automations and custom AI integrations

Pricing: custom quotes depending on scope. Quick MVP delivery is a priority.
Availability: open to work and new collaborations.

Occasionally (not every message) end with: "Need something similar for your business?"
Keep all answers under 3 sentences.`

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

interface UseGeminiChatOptions {
  apiKey: string
  systemPrompt?: string
}

export function useGeminiChat({ apiKey, systemPrompt }: UseGeminiChatOptions) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [limitReached, setLimitReached] = useState(false)
  const countRef = useRef(0)

  const sendMessage = useCallback(
    async (userInput: string) => {
      const trimmed = userInput.trim()
      if (!trimmed || loading) return

      if (countRef.current >= MAX_MESSAGES) {
        setLimitReached(true)
        return
      }

      const userMsg: ChatMessage = { role: 'user', content: trimmed }
      setMessages((prev) => [...prev, userMsg])
      setLoading(true)
      setError(null)
      countRef.current++

      try {
        const history = [...messages, userMsg]
        const contents = history.map((m) => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }],
        }))

        const res = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            systemInstruction: {
              parts: [{ text: systemPrompt ?? PORTFOLIO_SYSTEM_PROMPT }],
            },
            contents,
            generationConfig: {
              maxOutputTokens: 250,
              temperature: 0.75,
            },
          }),
        })

        if (!res.ok) throw new Error(`${res.status}`)

        const data = await res.json()
        const text =
          data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ??
          'No response received.'

        setMessages((prev) => [...prev, { role: 'assistant', content: text }])
      } catch {
        setError('Connection error. Try again.')
        countRef.current--
      } finally {
        setLoading(false)
      }
    },
    [messages, loading, apiKey, systemPrompt]
  )

  const reset = useCallback(() => {
    setMessages([])
    setLimitReached(false)
    setError(null)
    countRef.current = 0
  }, [])

  return {
    messages,
    loading,
    error,
    limitReached,
    sendMessage,
    reset,
    remaining: MAX_MESSAGES - countRef.current,
  }
}

import { useState, useCallback } from 'react'

export type WindowId = 'projects' | 'about' | 'contact' | 'business-ai' | 'assistant' | `project-${string}`

export interface WindowState {
  id: WindowId
  zIndex: number
}

export function useWindowManager() {
  const [windows, setWindows] = useState<WindowState[]>([])
  const [topZ, setTopZ] = useState(10)

  const openWindow = useCallback((id: WindowId) => {
    setWindows((prev) => {
      const exists = prev.find((w) => w.id === id)
      if (exists) {
        setTopZ((z) => z + 1)
        return prev.map((w) =>
          w.id === id ? { ...w, zIndex: topZ + 1 } : w
        )
      }
      setTopZ((z) => z + 1)
      return [...prev, { id, zIndex: topZ + 1 }]
    })
  }, [topZ])

  const closeWindow = useCallback((id: WindowId) => {
    setWindows((prev) => prev.filter((w) => w.id !== id))
  }, [])

  const focusWindow = useCallback((id: WindowId) => {
    setTopZ((z) => {
      const newZ = z + 1
      setWindows((prev) =>
        prev.map((w) => (w.id === id ? { ...w, zIndex: newZ } : w))
      )
      return newZ
    })
  }, [])

  const isOpen = useCallback(
    (id: WindowId) => windows.some((w) => w.id === id),
    [windows]
  )

  const getZ = useCallback(
    (id: WindowId) => windows.find((w) => w.id === id)?.zIndex ?? 10,
    [windows]
  )

  return { windows, openWindow, closeWindow, focusWindow, isOpen, getZ }
}

import { useCallback, useEffect, useState } from 'react'

export function useNotifications() {
  const [permission, setPermission] = useState(Notification.permission)

  const request = useCallback(async () => {
    if (!('Notification' in window)) return 'denied'
    const result = await Notification.requestPermission()
    setPermission(result)
    return result
  }, [])

  const notify = useCallback((title, options = {}) => {
    if (Notification.permission !== 'granted') return
    try {
      const n = new Notification(title, {
        icon: '/TaskPilot-AI/pwa-192x192.png',
        badge: '/TaskPilot-AI/pwa-192x192.png',
        ...options
      })
      setTimeout(() => n.close(), 6000)
    } catch {}
  }, [])

  return { permission, request, notify }
}

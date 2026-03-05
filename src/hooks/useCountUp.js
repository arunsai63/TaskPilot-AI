import { useState, useEffect } from 'react'

export function useCountUp(target, duration = 600) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!target || target <= 0) { setValue(target || 0); return }
    const start = Date.now()
    let raf
    const step = () => {
      const p = Math.min((Date.now() - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(Math.round(eased * target))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [target, duration])
  return value
}

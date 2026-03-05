export const DURATION = { fast: 80, normal: 160, slow: 220, verySlow: 400 }

export const EASE = {
  out:    [0.25, 0.46, 0.45, 0.94],
  in:     [0.55, 0.055, 0.675, 0.19],
  spring: { type: 'spring', stiffness: 380, damping: 38 },
  springSnappy: { type: 'spring', stiffness: 400, damping: 25 },
  springPop:    { type: 'spring', stiffness: 500, damping: 28 },
}

export const pageVariants = {
  hidden:  { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.16, ease: EASE.out } },
  exit:    { opacity: 0,       transition: { duration: 0.08 } },
}

export const listItemVariants = {
  hidden:  { opacity: 0, y: 8 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.22, ease: EASE.out, delay: Math.min(i, 7) * 0.03 } }),
  exit:    { opacity: 0, x: -8, transition: { duration: 0.16 } },
}

export const modalOverlayVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.15 } },
  exit:    { opacity: 0, transition: { duration: 0.15 } },
}

export const modalSheetVariants = {
  hidden:  { y: '100%' },
  visible: { y: 0, transition: EASE.spring },
  exit:    { y: '100%', transition: { duration: 0.2, ease: 'easeIn' } },
}

export const modalCenterVariants = {
  hidden:  { opacity: 0, scale: 0.96, y: 8 },
  visible: { opacity: 1, scale: 1,    y: 0, transition: { duration: 0.18, ease: EASE.out } },
  exit:    { opacity: 0, scale: 0.97, y: 4, transition: { duration: 0.10 } },
}

export const statCardVariants = {
  hidden:  { opacity: 0, y: 12 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.24, ease: EASE.out, delay: i * 0.06 } }),
}

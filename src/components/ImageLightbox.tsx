import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { createPortal } from 'react-dom'

interface Props {
  images: string[]
  current: number
  alt: string
  closeLabel: string
  previousLabel: string
  nextLabel: string
  onChange: (index: number) => void
  onClose: () => void
}

export default function ImageLightbox({
  images,
  current,
  alt,
  closeLabel,
  previousLabel,
  nextLabel,
  onChange,
  onClose,
}: Props) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (images.length > 1 && event.key === 'ArrowLeft') {
        event.preventDefault()
        onChange((current - 1 + images.length) % images.length)
      }
      if (images.length > 1 && event.key === 'ArrowRight') {
        event.preventDefault()
        onChange((current + 1) % images.length)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [current, images.length, onChange, onClose])

  const image = images[current]
  if (!image) return null

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="relative flex max-h-full max-w-full items-center justify-center"
        onClick={(event) => event.stopPropagation()}
      >
        <img
          src={image}
          alt={`${alt} ${current + 1}`}
          className="max-h-[88vh] max-w-[92vw] rounded-xl object-contain shadow-2xl"
          draggable={false}
        />

        <button
          type="button"
          onClick={onClose}
          aria-label={closeLabel}
          title={closeLabel}
          className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/70 text-xl text-white transition-colors hover:border-white/50 hover:bg-black"
        >
          ×
        </button>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => onChange((current - 1 + images.length) % images.length)}
              aria-label={previousLabel}
              title={previousLabel}
              className="absolute left-2 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/70 text-2xl text-white transition-colors hover:border-white/50 hover:bg-black sm:-left-14"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => onChange((current + 1) % images.length)}
              aria-label={nextLabel}
              title={nextLabel}
              className="absolute right-2 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/70 text-2xl text-white transition-colors hover:border-white/50 hover:bg-black sm:-right-14"
            >
              ›
            </button>
            <div className="absolute bottom-2 rounded-full border border-white/15 bg-black/70 px-3 py-1 text-xs font-mono text-white">
              {current + 1} / {images.length}
            </div>
          </>
        )}
      </motion.div>
    </motion.div>,
    document.body,
  )
}

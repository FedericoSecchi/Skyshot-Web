// LightboxGallery.jsx
import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { useSwipeable } from 'react-swipeable'
import './LightboxGallery.css'

export default function LightboxGallery({ images, openIndex, onClose, onOpenAt }) {
  const overlayRef = useRef(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => onOpenAt((openIndex + 1) % images.length),
    onSwipedRight: () => onOpenAt((openIndex - 1 + images.length) % images.length),
    trackMouse: false,
  })

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        onOpenAt((openIndex - 1 + images.length) % images.length)
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        onOpenAt((openIndex + 1) % images.length)
      }
    }
    if (openIndex !== null) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [openIndex, images.length, onClose, onOpenAt])

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement && overlayRef.current?.requestFullscreen) {
      overlayRef.current.requestFullscreen()
    } else if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen()
    }
  }

  if (openIndex === null || !images[openIndex]) return null

  const currentImage = images[openIndex]
  const src = typeof currentImage === 'string' ? currentImage : currentImage.src
  const alt = typeof currentImage === 'string' ? '' : currentImage.alt || ''

  return ReactDOM.createPortal(
    <div className="lightbox-overlay" ref={overlayRef}>
      <button
        className="lightbox-close"
        onClick={onClose}
        aria-label="Close"
        type="button"
      >
        ×
      </button>
      <button
        className="lightbox-prev"
        onClick={(e) => {
          e.stopPropagation()
          onOpenAt((openIndex - 1 + images.length) % images.length)
        }}
        aria-label="Previous image"
        type="button"
      >
        ←
      </button>
      <button
        className="lightbox-next"
        onClick={(e) => {
          e.stopPropagation()
          onOpenAt((openIndex + 1) % images.length)
        }}
        aria-label="Next image"
        type="button"
      >
        →
      </button>
      <button
        className="lightbox-fullscreen"
        onClick={toggleFullscreen}
        aria-label="Toggle fullscreen"
        type="button"
      >
        {isFullscreen ? '🔙' : '🖥️'}
      </button>
      <div className="lightbox-swipe-area" {...swipeHandlers}>
        <img className="lightbox-image" src={src} alt={alt} />
      </div>
    </div>,
    document.body
  )
}

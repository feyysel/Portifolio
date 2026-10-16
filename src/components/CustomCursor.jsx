import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    const cursor = cursorRef.current
    let mouseX = -100
    let mouseY = -100

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`
      cursor.style.opacity = 1
    }

    const onLeave = () => {
      cursor.style.opacity = 0
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <svg
      ref={cursorRef}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      className="pointer-events-none fixed left-0 top-0 z-[100] opacity-0 mix-blend-difference"
      style={{ transform: 'translate(-100px, -100px)', marginLeft: '-4px', marginTop: '-4px' }}
    >
      <path
        d="M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z"
        fill="white"
      />
    </svg>
  )
}

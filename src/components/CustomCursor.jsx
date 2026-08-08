import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    let mouseX = -100
    let mouseY = -100
    let ringX = -100
    let ringY = -100
    let raf

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`
      dot.style.opacity = 1
      ring.style.opacity = 1
    }

    const onOver = (e) => {
      const interactive = e.target.closest('a, button, [role="button"], input, textarea, [data-hover]')
      ring.classList.toggle('scale-150', Boolean(interactive))
      ring.classList.toggle('bg-white/10', Boolean(interactive))
      ring.classList.toggle('border-white/40', Boolean(interactive))
    }

    const onLeave = () => {
      dot.style.opacity = 0
      ring.style.opacity = 0
    }

    const loop = () => {
      ringX += (mouseX - ringX) * 0.18
      ringY += (mouseY - ringY) * 0.18
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseleave', onLeave)
    raf = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-2 w-2 rounded-full bg-white opacity-0 mix-blend-difference"
        style={{ transform: 'translate(-100px, -100px)' }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[99] h-9 w-9 rounded-full border border-white/60 opacity-0 mix-blend-difference transition-[background-color,border-color] duration-200"
        style={{ transform: 'translate(-100px, -100px)', marginLeft: '-18px', marginTop: '-18px' }}
      />
    </>
  )
}

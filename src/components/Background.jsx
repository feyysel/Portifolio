import { useEffect, useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'

function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf
    let particles = []
    const mouse = { x: null, y: null }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const init = () => {
      const count = Math.min(90, Math.floor((window.innerWidth * window.innerHeight) / 22000))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.6 + 0.6,
        hue: Math.random() > 0.5 ? 262 : 188,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        if (mouse.x !== null) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const dist = Math.hypot(dx, dy)
          if (dist < 160) {
            p.x += (dx / dist) * 0.9
            p.y += (dy / dist) * 0.9
          }
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 90%, 72%, 0.85)`
        ctx.fill()

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]
          const dx = p.x - q.x
          const dy = p.y - q.y
          const dist = Math.hypot(dx, dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.strokeStyle = `hsla(255, 80%, 70%, ${(1 - dist / 120) * 0.22})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }

    const onMouse = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    const onLeave = () => {
      mouse.x = null
      mouse.y = null
    }

    resize()
    init()
    draw()
    window.addEventListener('resize', () => {
      resize()
      init()
    })
    window.addEventListener('mousemove', onMouse)
    window.addEventListener('mouseleave', onLeave)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-70" />
}

export default function Background() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const ySpring = useSpring(y, { stiffness: 60, damping: 20 })

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="bg-grid absolute inset-0 opacity-60" />
      <ParticleCanvas />
      <motion.div
        style={{ y: ySpring }}
        className="absolute -top-32 -left-32 h-[34rem] w-[34rem] rounded-full blur-3xl"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="h-full w-full rounded-full bg-violet-600/25" />
      </motion.div>
      <motion.div
        style={{ y: ySpring }}
        className="absolute top-1/3 -right-40 h-[30rem] w-[30rem] rounded-full blur-3xl"
        animate={{ scale: [1.1, 1, 1.1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="h-full w-full rounded-full bg-cyan-500/20" />
      </motion.div>
      <motion.div
        style={{ y: ySpring }}
        className="absolute -bottom-40 left-1/4 h-[28rem] w-[28rem] rounded-full blur-3xl"
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="h-full w-full rounded-full bg-emerald-500/15" />
      </motion.div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#05060a_82%)]" />
    </div>
  )
}

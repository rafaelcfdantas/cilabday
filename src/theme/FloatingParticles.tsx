import { motion } from 'framer-motion'

const particles = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  left: `${5 + (i * 17) % 90}%`,
  delay: (i * 0.3) % 4,
  size: 6 + (i % 4) * 3,
  color: ['#F4A127', '#E84855', '#C5299D', '#1B998B', '#FFF8F0'][i % 5],
  duration: 4 + (i % 5),
}))

export function FloatingParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            bottom: '-5%',
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
          }}
          animate={{
            y: ['0vh', '-110vh'],
            x: [0, (p.id % 2 === 0 ? 1 : -1) * 40, 0],
            rotate: [0, 360],
            opacity: [0, 0.8, 0.8, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  )
}

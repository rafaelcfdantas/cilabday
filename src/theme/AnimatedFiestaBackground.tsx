import { motion } from 'framer-motion'

const orbs = [
  { left: '10%', top: '20%', color: '#C5299D', size: 80, duration: 8 },
  { left: '85%', top: '15%', color: '#F4A127', size: 60, duration: 10 },
  { left: '75%', top: '70%', color: '#E84855', size: 100, duration: 12 },
  { left: '15%', top: '75%', color: '#1B998B', size: 70, duration: 9 },
  { left: '50%', top: '85%', color: '#F4A127', size: 50, duration: 7 },
]

export function AnimatedFiestaBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-fiesta-indigo"
        animate={{
          background: [
            'radial-gradient(ellipse 90% 70% at 50% 45%, #3d2060 0%, #2d1b4e 50%, #1a0f2e 100%)',
            'radial-gradient(ellipse 85% 65% at 45% 50%, #4a1848 0%, #2d1b4e 50%, #1a0f2e 100%)',
            'radial-gradient(ellipse 90% 70% at 55% 42%, #2a3550 0%, #2d1b4e 50%, #1a0f2e 100%)',
            'radial-gradient(ellipse 90% 70% at 50% 45%, #3d2060 0%, #2d1b4e 50%, #1a0f2e 100%)',
          ],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute inset-0"
        animate={{ opacity: [0.7, 0.95, 0.75, 0.7] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(197, 41, 157, 0.35) 0%, transparent 55%), radial-gradient(ellipse 60% 50% at 20% 80%, rgba(27, 153, 139, 0.25) 0%, transparent 50%), radial-gradient(ellipse 50% 40% at 80% 20%, rgba(244, 161, 39, 0.2) 0%, transparent 45%)',
        }}
      />

      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            left: orb.left,
            top: orb.top,
            width: orb.size,
            height: orb.size,
            backgroundColor: orb.color,
          }}
          animate={{
            x: [0, 20, -15, 0],
            y: [0, -25, 15, 0],
            scale: [1, 1.2, 0.9, 1],
            opacity: [0.15, 0.3, 0.2, 0.15],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

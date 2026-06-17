import { FiestaBackground } from '@/theme/FiestaBackground'

export function PlaceholderSlide({ isActive }: { isActive: boolean }) {
  if (!isActive) return null

  return (
    <div className="relative flex h-full w-full items-center justify-center px-6">
      <FiestaBackground />
      <p className="relative z-10 text-center font-body text-lg text-fiesta-cream/70 sm:text-xl">
        Slide 3 — coming soon
      </p>
    </div>
  )
}

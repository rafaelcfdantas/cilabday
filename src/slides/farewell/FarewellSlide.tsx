import { FiestaBackground } from '@/theme/FiestaBackground'
import { FarewellBeat } from './FarewellBeat'
import { FarewellFinale } from './FarewellFinale'
import { useFarewellPhases } from './useFarewellPhases'

export function FarewellSlide({ isActive }: { isActive: boolean }) {
  const { phase, beatIndex, segment, waveEnabled } = useFarewellPhases(isActive)

  if (!isActive) return null

  return (
    <div className="relative h-full w-full overflow-hidden">
      <FiestaBackground />
      {phase === 'beat' ? (
        <FarewellBeat beatIndex={beatIndex} segment={segment} waveEnabled={waveEnabled} />
      ) : (
        <FarewellFinale />
      )}
    </div>
  )
}

import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { motion } from 'framer-motion'
import catFeelingLove from '@assets/animations/cat_feeling_love.lottie'
import { BeatEntrance } from '../BeatEntrance'
import {
  getIdentityBlockLayoutClass,
  getIdentityPhotoColumnClass,
  getIdentityTextColumnClass,
} from '../birthStoryLayout'
import { PolaroidPhoto } from '@/components/PolaroidPhoto'
import { WaveText } from '../WaveText'

const BODY_CLASS = 'font-body text-base text-fiesta-cream/90 sm:text-lg md:text-xl'

type IdentityBlockProps = {
  beatIndex: number
  identityLine: string
  photoSrc: string
  closingLine: string
  emojis: [string, string]
  showClosing: boolean
}

function ClosingEmojis({ emojis, isActive }: { emojis: [string, string]; isActive: boolean }) {
  return (
    <div className="flex justify-center gap-3 text-3xl sm:justify-start sm:text-4xl">
      {emojis.map((emoji) => (
        <motion.span
          key={emoji}
          className="inline-block"
          initial={isActive ? { opacity: 0, scale: 0.85 } : false}
          animate={
            isActive
              ? {
                  opacity: 1,
                  scale: 1,
                  y: [0, -6, 0, -3, 0],
                }
              : { opacity: 1, scale: 1, y: 0 }
          }
          transition={{
            opacity: { duration: 0.4 },
            scale: { duration: 0.4 },
            y: isActive ? { duration: 0.75, ease: 'easeOut' } : { duration: 0 },
          }}
        >
          {emoji}
        </motion.span>
      ))}
    </div>
  )
}

export function IdentityBlock({
  beatIndex,
  identityLine,
  photoSrc,
  closingLine,
  emojis,
  showClosing,
}: IdentityBlockProps) {
  const isIdentityCurrent = beatIndex === 2
  const isClosingCurrent = beatIndex === 3

  return (
    <BeatEntrance isCurrent={isIdentityCurrent} entranceClass="animate__fadeInLeftBig">
      {(identityWave) => (
        <div className={getIdentityBlockLayoutClass()}>
          <div className={getIdentityPhotoColumnClass()}>
            <PolaroidPhoto isCurrent={isIdentityCurrent}>
              <img
                src={photoSrc}
                alt=""
                className="block max-w-44 object-cover sm:max-w-xs"
                draggable={false}
              />
            </PolaroidPhoto>
          </div>

          <div className={getIdentityTextColumnClass(showClosing)}>
            <div className={isIdentityCurrent ? 'opacity-100' : 'opacity-55'}>
              <div className="flex items-center justify-center gap-2 sm:justify-start">
                <p className="max-w-xs sm:max-w-sm">
                  <WaveText
                    text={identityLine}
                    waveEnabled={identityWave}
                    className={BODY_CLASS}
                  />
                </p>
                <motion.div
                  className="h-14 w-14 shrink-0 sm:h-16 sm:w-16"
                  animate={isIdentityCurrent ? { y: [0, -6, 0] } : { y: 0 }}
                  transition={
                    isIdentityCurrent
                      ? { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }
                      : { duration: 0.3 }
                  }
                >
                  <DotLottieReact src={catFeelingLove} loop autoplay className="h-full w-full" />
                </motion.div>
              </div>
            </div>

            {showClosing && (
              <div className="mt-3 space-y-3 sm:contents sm:space-y-0">
                <div className={isClosingCurrent ? 'opacity-100' : 'opacity-55'}>
                  <BeatEntrance isCurrent={isClosingCurrent} entranceClass="animate__fadeInRightBig">
                    {(closingWave) => (
                      <p className="max-w-sm">
                        <WaveText
                          text={closingLine}
                          waveEnabled={closingWave}
                          className={BODY_CLASS}
                        />
                      </p>
                    )}
                  </BeatEntrance>
                </div>
                <ClosingEmojis emojis={emojis} isActive={isClosingCurrent} />
              </div>
            )}
          </div>
        </div>
      )}
    </BeatEntrance>
  )
}

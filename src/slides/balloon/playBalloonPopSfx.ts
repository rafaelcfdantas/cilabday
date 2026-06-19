import pop01 from '@assets/audios/balloon_pop_01.mp3'
import pop02 from '@assets/audios/balloon_pop_02.mp3'
import pop03 from '@assets/audios/balloon_pop_03.mp3'
import pop04 from '@assets/audios/balloon_pop_04.mp3'
import pop05 from '@assets/audios/balloon_pop_05.mp3'

const POP_SFX = [pop01, pop02, pop03, pop04, pop05]

export function playBalloonPopSfx(isMuted: boolean) {
  if (isMuted) return

  const url = POP_SFX[Math.floor(Math.random() * POP_SFX.length)]
  if (!url) return

  void new Audio(url).play()
}

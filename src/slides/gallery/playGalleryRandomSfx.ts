import { GALLERY_RANDOM_SFX_POOL } from './galleryCopy'

export function playGalleryRandomSfx(isMuted: boolean) {
  if (isMuted) return

  const url = GALLERY_RANDOM_SFX_POOL[Math.floor(Math.random() * GALLERY_RANDOM_SFX_POOL.length)]
  if (!url) return

  void new Audio(url).play()
}

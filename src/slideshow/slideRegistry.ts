import { IntroSlide } from '@/slides/intro/IntroSlide'
import { BalloonGameSlide } from '@/slides/balloon/BalloonGameSlide'
import { GallerySlide } from '@/slides/gallery/GallerySlide'
import { PlaceholderSlide } from '@/slides/placeholder/PlaceholderSlide'
import { BirthStorySlide } from '@/slides/story/birth/BirthStorySlide'
import type { SlideDefinition } from './types'

export const slideRegistry: SlideDefinition[] = [
  { id: 'intro', component: IntroSlide },
  { id: 'story-birth', component: BirthStorySlide },
  { id: 'balloon-game', component: BalloonGameSlide },
  { id: 'gallery', component: GallerySlide },
  { id: 'placeholder', component: PlaceholderSlide },
]

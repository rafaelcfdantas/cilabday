import { IntroSlide } from '@/slides/intro/IntroSlide'
import { PlaceholderSlide } from '@/slides/placeholder/PlaceholderSlide'
import type { SlideDefinition } from './types'

export const slideRegistry: SlideDefinition[] = [
  { id: 'intro', component: IntroSlide },
  { id: 'placeholder', component: PlaceholderSlide },
]

import type { ComponentType } from 'react'

export type SlideProps = {
  isActive: boolean
}

export type SlideDefinition = {
  id: string
  component: ComponentType<SlideProps>
}

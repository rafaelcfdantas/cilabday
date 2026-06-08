import { AudioProvider } from '@/audio/AudioProvider'
import { SlideshowProvider } from '@/slideshow/SlideshowProvider'
import { SlideshowShell } from '@/slideshow/SlideshowShell'

export default function App() {
  return (
    <AudioProvider>
      <SlideshowProvider>
        <SlideshowShell />
      </SlideshowProvider>
    </AudioProvider>
  )
}

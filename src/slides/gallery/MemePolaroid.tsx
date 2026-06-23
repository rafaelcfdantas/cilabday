import { PolaroidPhoto } from '@/components/PolaroidPhoto'
import type { ReactNode } from 'react'
import type { GalleryItem } from './galleryTypes'

type MemePolaroidProps = {
  item: GalleryItem
  isCurrent: boolean
  actionArea: ReactNode
}

function renderMedia(item: GalleryItem) {
  if (item.media.type === 'video') {
    return (
      <video
        src={item.media.src}
        controls
        playsInline
        preload="metadata"
        aria-label={item.media.alt}
        className="h-auto max-h-[19rem] w-full rounded-sm bg-black object-contain"
      />
    )
  }

  return (
    <img
      src={item.media.src}
      alt={item.media.alt}
      className="h-auto max-h-[19rem] w-full rounded-sm object-contain"
      draggable={false}
    />
  )
}

export function MemePolaroid({ item, isCurrent, actionArea }: MemePolaroidProps) {
  return (
    <article className="mx-auto w-full max-w-sm sm:max-w-md">
      {item.title && (
        <h2 className="mb-2 text-center font-display text-xl text-fiesta-cream sm:text-2xl">{item.title}</h2>
      )}

      <PolaroidPhoto isCurrent={isCurrent} angle={item.angle} className="w-full">
        <div className="space-y-3">
          {renderMedia(item)}
          {item.description && (
            <p className="px-1 text-center font-body text-sm leading-relaxed text-fiesta-indigo sm:text-base">
              {item.description}
            </p>
          )}
          {actionArea}
        </div>
      </PolaroidPhoto>
    </article>
  )
}

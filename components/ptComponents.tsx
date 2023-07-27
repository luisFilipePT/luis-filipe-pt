import '../style/codeTheme.css'

import Image from 'next/image'
import { client } from '@/sanity/lib/client'
import { getImageDimensions } from '@sanity/asset-utils'
import imageUrlBuilder from '@sanity/image-url'
import Refractor from 'react-refractor'
// Load any languages you want to use from `refractor`
import js from 'refractor/lang/javascript'

Refractor.registerLanguage(js)

const builder = imageUrlBuilder(client)

const ImageComponent = ({ value, isInline }: any) => {
  const { width, height } = getImageDimensions(value)
  return (
    <Image
      src={builder
        .image(value)
        .width(isInline ? 100 : 800)
        .fit('max')
        .auto('format')
        .url()}
      alt={value.alt || ' '}
      loading="lazy"
      width={width}
      height={height}
      style={{
        // Display alongside text if image appears inside a block text span
        display: isInline ? 'inline-block' : 'block',
        // Avoid jumping around with aspect-ratio CSS property
        aspectRatio: width / height,
      }}
    />
  )
}

export const ptComponents = {
  block: {
    h1: ({ children }: any) => (
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        {children}
      </h3>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="mt-6 border-l-2 pl-6 italic">
        {children}
      </blockquote>
    ),
  },
  types: {
    code: ({ value }: any) => {
      if (!value?.code) {
        return null
      }

      return (
        <Refractor
          language={'js'}
          value={value.code}
          markers={value.highlightedLines}
        />
      )
    },
    image: ImageComponent,
  },
}

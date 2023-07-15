import Image from 'next/image'
import { cachedClient, client } from '@/sanity/lib/client'
import { aboutPageQuery } from '@/sanity/lib/queries'
import { PortableText } from '@portabletext/react'
import imageUrlBuilder from '@sanity/image-url'
import { Navigation } from '@/components/nav'
import { ptComponents } from '@/components/ptComponents'

const builder = imageUrlBuilder(client)
export default async function About() {
  const data = await cachedClient(aboutPageQuery)

  const [
    corporateContent,
    openSourceContent,
    creationsContent,
    writingContent,
    visionContent,
  ] = data.pageBuilder

  return (
    <main className="relative min-h-screen bg-gradient-to-tl from-zinc-800 via-zinc-400/10 to-zinc-900 pb-16 pt-6 md:pt-1">
      <Navigation />
      <div className="mx-auto max-w-7xl space-y-8 px-6 pt-16 md:space-y-16 md:pt-24 lg:px-8 lg:pt-32">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div>
            <div className="mx-auto max-w-2xl lg:mx-0">
              <p className="mt-4 pb-8 text-zinc-400">{data.pageTitle}</p>
              <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
                {data.contentIntro}
              </h2>
            </div>
            <div className="prose prose-invert py-8 text-white">
              <PortableText
                value={data.contentDescription}
                components={ptComponents}
              />
            </div>
          </div>
          <div className="mx-auto md:mr-0">
            <Image
              className="duration-600 blur-sm grayscale ease-in-out hover:blur-0"
              src={builder.image(data.image).width(300).height(600).url()}
              width={300}
              height={600}
              alt={data?.image?.alt}
            />
          </div>
        </div>
        <div className="w-full text-center">
          <h1 className="scroll-m-20 text-6xl font-thin tracking-tight transition-colors">
            My Work
          </h1>
        </div>
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          <div>
            <h1 className="py-8 text-center text-4xl text-zinc-300">
              {corporateContent.pageTitle}
            </h1>
            <div className="prose text-white">
              <PortableText value={corporateContent.content} />
            </div>
            <h1 className="py-8 text-center text-4xl text-zinc-300">
              {openSourceContent.pageTitle}
            </h1>
            <div className="prose text-white">
              <PortableText value={openSourceContent.content} />
            </div>
            <div className="flex justify-center pt-8">
              <Image
                src={builder
                  .image(openSourceContent.image)
                  .auto('format')
                  .width(200)
                  .height(200)
                  .url()}
                width={200}
                height={200}
                alt={openSourceContent?.image?.alt}
              />
            </div>
          </div>
          <div>
            <h1 className="py-8 text-center text-4xl text-zinc-300">
              {creationsContent.pageTitle}
            </h1>
            <div className="prose text-white">
              <PortableText value={creationsContent.content} />
            </div>
            <div className="flex justify-center py-8">
              <Image
                className=""
                src={builder
                  .image(creationsContent.image)
                  .auto('format')
                  .fit('max')
                  .url()}
                width={300}
                height={300}
                alt={creationsContent?.image?.alt}
              />
            </div>
            <h1 className="py-8 text-center text-4xl text-zinc-300">
              {writingContent.pageTitle}
            </h1>
            <div className="prose text-white">
              <PortableText value={writingContent.content} />
            </div>
          </div>
        </div>
        <div className="w-full p-8 text-center">
          <h1 className="scroll-m-20 text-6xl font-thin tracking-tight transition-colors">
            {visionContent.pageTitle}
          </h1>
        </div>
        <div className="mx-auto">
          <div className="prose max-w-none text-center text-white">
            <PortableText value={visionContent.content} />
          </div>
        </div>
      </div>
    </main>
  )
}

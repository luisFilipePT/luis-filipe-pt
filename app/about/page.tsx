import Image from 'next/image'
import { cachedClient, client } from '@/sanity/lib/client'
import {
  aboutPageQuery,
  navigationQuery,
  type AboutPageQuery,
  type NavigationQuery,
} from '@/sanity/lib/queries'
import { PortableText } from '@portabletext/react'
import imageUrlBuilder from '@sanity/image-url'
import { Navigation } from '@/components/nav'
import { ptComponents } from '@/components/ptComponents'

function Section({ data }: any) {
  const { pageTitle, content, image } = data

  return (
    <>
      <h1 className="py-8 text-center text-4xl text-zinc-300">{pageTitle}</h1>
      <div className="prose text-white">
        <PortableText value={content} />
      </div>
      {image && (
        <div className="flex justify-center pt-8">
          <Image
            src={builder.image(image).auto('format').fit('max').url()}
            width={300}
            height={200}
            alt={image?.alt}
          />
        </div>
      )}
    </>
  )
}

const builder = imageUrlBuilder(client)
export default async function About() {
  const [page, navigation] = await Promise.all([
    cachedClient<AboutPageQuery>(aboutPageQuery),
    cachedClient<NavigationQuery>(navigationQuery),
  ])

  const { title, description, image, sections } = page

  const lastSection = sections[sections.length - 1]

  const sectionsWithoutLast = sections.slice(0, sections.length - 1)

  const sectionPairs = sectionsWithoutLast.reduce(
    (acc: any, _: any, i: number, arr: any) =>
      i % 2 === 0 ? [...acc, arr.slice(i, i + 2)] : acc,
    []
  )

  return (
    <main className="relative min-h-screen bg-gradient-to-tl from-zinc-800 via-zinc-400/10 to-zinc-900 pb-16 pt-6 md:pt-1">
      <Navigation navigation={navigation} />
      <div className="mx-auto max-w-7xl space-y-8 px-6 pt-16 md:space-y-16 md:pt-24 lg:px-8 lg:pt-32">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div>
            <div className="mx-auto max-w-2xl lg:mx-0">
              <p className="mt-4 pb-8 text-zinc-400">{title}</p>
              <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
                Luis
              </h2>
            </div>
            <div className="prose prose-invert py-8 text-white">
              <PortableText value={description} components={ptComponents} />
            </div>
          </div>
          {image && (
            <div className="mx-auto md:mr-0">
              <Image
                className="duration-600 blur-sm grayscale ease-in-out hover:blur-0"
                src={builder.image(image).width(300).height(600).url()}
                width={300}
                height={600}
                alt={image?.alt}
              />
            </div>
          )}
        </div>
        <div className="w-full text-center">
          <h1 className="scroll-m-20 text-6xl font-thin tracking-tight transition-colors">
            My Work
          </h1>
        </div>
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          {sectionPairs.map((pair: any, i: number) => (
            <div key={i} className="space-y-8">
              {pair.map((section: any, i: number) => (
                <Section key={i} data={section} />
              ))}
            </div>
          ))}
        </div>
        <div className="w-full p-8 text-center">
          <h1 className="scroll-m-20 text-6xl font-thin tracking-tight transition-colors">
            {lastSection.pageTitle}
          </h1>
        </div>
        <div className="mx-auto">
          <div className="prose max-w-none text-center text-white">
            <PortableText value={lastSection.content} />
          </div>
        </div>
      </div>
    </main>
  )
}

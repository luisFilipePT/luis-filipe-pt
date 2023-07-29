import Image from 'next/image'
import { cachedClient } from '@/sanity/lib/client'
import { urlForImage } from '@/sanity/lib/image'
import {
  articlePathsQuery,
  articleQuery,
  navigationQuery,
  type NavigationQuery,
} from '@/sanity/lib/queries'
import { PortableText } from '@portabletext/react'
import { Navigation } from '@/components/nav'
import { ptComponents } from '@/components/ptComponents'

export async function generateStaticParams() {
  return await cachedClient(articlePathsQuery)
}

export default async function Article({ params }: { params: any }) {
  const [article, navigation] = await Promise.all([
    cachedClient(articleQuery, params),
    cachedClient<NavigationQuery>(navigationQuery),
  ])

  return (
    <main className="relative flex min-h-screen flex-col bg-gradient-to-tl from-zinc-800 via-zinc-400/10 to-zinc-950">
      <Navigation navigation={navigation} fixed={false} />
      <div className="flex flex-col items-center justify-evenly px-16 pb-4 pt-16 text-center">
        <h1 className="py-6 text-3xl font-bold tracking-tight text-zinc-100 sm:w-2/3 sm:text-4xl">
          {article.title}
        </h1>
        <p className="pb-8 text-xl text-zinc-100">{article.subTitle}</p>
        <div className="pt-6 text-xs text-zinc-100">
          {article.publishedAt && (
            <time dateTime={new Date(article.publishedAt).toISOString()}>
              {Intl.DateTimeFormat(undefined, {
                dateStyle: 'medium',
              }).format(new Date(article.publishedAt))}
            </time>
          )}
        </div>
      </div>
      <div className="grow bg-zinc-200 pb-16 pt-8">
        {article?.mainImage ? (
          <div className="relative min-h-[250px] sm:min-h-[350px] md:my-8 md:min-h-[500px]">
            <Image
              className="object-contain"
              src={urlForImage(article.mainImage)?.url()}
              fill={true}
              alt={article?.mainImage?.alt}
            />
          </div>
        ) : null}
        <div className="light:prose-inverted prose mx-auto p-6 md:prose-lg sm:p-4 md:p-0">
          <PortableText value={article.body} components={ptComponents} />
        </div>
      </div>
    </main>
  )
}

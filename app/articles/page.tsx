import Image from 'next/image'
import Link from 'next/link'
import { cachedClient } from '@/sanity/lib/client'
import { urlForImage } from '@/sanity/lib/image'
import { articlesQuery } from '@/sanity/lib/queries'
import { PortableText } from '@portabletext/react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Navigation } from '@/components/nav'

export default async function Articles() {
  const [recentArticle, ...articles] = await cachedClient(articlesQuery)

  return (
    <main className="relative min-h-screen bg-gradient-to-tl from-zinc-900 via-zinc-400/10 to-zinc-950 pb-16 pt-6 md:pt-1">
      <Navigation />
      <div className="mx-auto max-w-7xl space-y-8 px-6 pt-16 md:space-y-16 md:pt-24 lg:px-8 lg:pt-32">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="font-foldit text-8xl tracking-tight text-zinc-100">
            Articles
          </h2>
          <p className="mt-4 font-semibold text-zinc-400">
            I{'`'}m invested in writing more but for now this is it
          </p>
        </div>
        <div className="mx-auto grid grid-cols-1 gap-8 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>
                <div className="pb-6 text-xs tracking-wide text-zinc-100">
                  {recentArticle.publishedAt && (
                    <time
                      dateTime={new Date(
                        recentArticle.publishedAt
                      ).toISOString()}
                    >
                      {Intl.DateTimeFormat(undefined, {
                        dateStyle: 'medium',
                      }).format(new Date(recentArticle.publishedAt))}
                    </time>
                  )}
                </div>
                <div>{recentArticle.title}</div>
              </CardTitle>
              <CardDescription>{recentArticle.subTitle}</CardDescription>
            </CardHeader>
            <CardContent>
              {recentArticle?.mainImage ? (
                <div className="relative mb-3 min-h-[250px] sm:min-h-[350px] md:mb-5">
                  <Image
                    className="object-contain"
                    src={urlForImage(recentArticle.mainImage)?.url()}
                    fill={true}
                    alt={recentArticle?.mainImage?.alt}
                  />
                </div>
              ) : null}
              <div className="prose text-zinc-400 duration-150 group-hover:text-zinc-300">
                <PortableText value={recentArticle.tldr} />
              </div>
            </CardContent>
            <CardFooter>
              <Link
                className="flex transition hover:underline hover:duration-300 hover:ease-in"
                href={`/articles/${recentArticle.slug.current}`}
              >
                Read more <span aria-hidden="true">&rarr;</span>
              </Link>
            </CardFooter>
          </Card>

          <div className="mx-auto flex w-full flex-col gap-8 border-t border-gray-900/10 lg:mx-0 lg:border-t-0 ">
            {articles.map((article: any) => (
              <Card>
                <CardHeader>
                  <CardTitle>
                    <div className="pb-6 text-xs tracking-wide text-zinc-100">
                      {article.publishedAt && (
                        <time
                          dateTime={new Date(article.publishedAt).toISOString()}
                        >
                          {Intl.DateTimeFormat(undefined, {
                            dateStyle: 'medium',
                          }).format(new Date(article.publishedAt))}
                        </time>
                      )}
                    </div>
                    <div>{article.title}</div>
                  </CardTitle>
                  <CardDescription>{article.subTitle}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="prose text-zinc-400 duration-150 group-hover:text-zinc-300">
                    <PortableText value={article.tldr} />
                  </div>
                </CardContent>
                <CardFooter>
                  <Link
                    className="flex transition hover:underline hover:duration-300 hover:ease-in"
                    href={`/articles/${article.slug.current}`}
                  >
                    Read more <span aria-hidden="true">&rarr;</span>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

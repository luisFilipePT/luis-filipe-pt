import Link from 'next/link'
import { cachedClient } from '@/sanity/lib/client'
import {
  homePageQuery,
  navigationQuery,
  type HomePageQuery,
  type NavigationQuery,
} from '@/sanity/lib/queries'
import { PortableText } from '@portabletext/react'
import { capitalize, sortNavigation } from '@/lib/utils'
import { ParticlesWrapper } from '@/components/particles'

export default async function Home() {
  const [page, navigation] = await Promise.all([
    cachedClient<HomePageQuery>(homePageQuery),
    cachedClient<NavigationQuery>(navigationQuery),
  ])

  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      <nav className="my-16 animate-fade-in">
        <ul className="flex items-center justify-center gap-4">
          {navigation.sort(sortNavigation).map(({ slug }) => (
            <li key={slug}>
              <Link
                href={`/${slug}`}
                className="text-sm text-zinc-500 duration-500 hover:text-zinc-300 md:text-base"
              >
                {capitalize(slug)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="animate-glow hidden h-px w-screen animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 md:block" />
      <div className="absolute inset-0 -z-10 animate-fade-in">
        <ParticlesWrapper />
      </div>
      <h1 className="duration-1500 z-10 animate-title cursor-default whitespace-nowrap bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-200 via-gray-400 to-gray-600 bg-clip-text font-display text-6xl text-transparent md:text-[140px]">
        {page.title}
      </h1>
      <div className="animate-glow hidden h-px w-screen animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 md:block" />
      <div className="mx-4 my-16 animate-fade-in text-center">
        <PortableText
          value={page.description}
          components={{
            block: {
              h2: ({ children }: any) => (
                <h2 className="text-sm text-zinc-500 md:max-w-2xl md:text-base">
                  {children}
                </h2>
              ),
            },
            marks: {
              link: ({ children, value }) => {
                const rel = value.href.startsWith('/') ? undefined : 'noopener'
                return (
                  <Link
                    href={value.href}
                    rel={rel}
                    className="underline duration-500 hover:text-zinc-300"
                  >
                    {children}
                  </Link>
                )
              },
              internalLink: ({ value, children }) => {
                const { slug = {} } = value
                const href = `/${slug.current}`

                return (
                  <Link
                    href={href}
                    className="underline duration-500 hover:text-zinc-300"
                  >
                    {children}
                  </Link>
                )
              },
            },
          }}
        />
      </div>
    </main>
  )
}

import { type ReactElement } from 'react'
import Link from 'next/link'
import { Github, Twitter, Linkedin } from 'lucide-react'
import { cachedClient } from '@/sanity/lib/client'
import {
  navigationQuery,
  socialsQuery,
  type NavigationQuery,
  type SocialsQuery,
} from '@/sanity/lib/queries'
import { Card } from '@/components/ui/card'
import { Navigation } from '@/components/nav'


const Icons: Record<string, ReactElement> = {
  github: <Github size={20} />,
  twitter: <Twitter size={20} />,
  linkedin: <Linkedin size={20} />,
}

export default async function Contact() {
  const [socials, navigation] = await Promise.all([
    cachedClient<SocialsQuery>(socialsQuery),
    cachedClient<NavigationQuery>(navigationQuery),
  ])

  return (
    <main className="bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
      <Navigation navigation={navigation} />
      <div className="container mx-auto flex min-h-screen items-center justify-center px-4">
        <section className="mx-auto mt-32 grid w-full grid-cols-1 gap-8 sm:mt-0 sm:grid-cols-3 lg:gap-16">
          {socials.map((s) => (
            <Card key={s._id}>
              <Link
                href={s.link}
                target="_blank"
                rel="noopener"
                className="group relative flex flex-col items-center gap-4 p-4 duration-700 md:gap-8 md:p-16  md:py-24  lg:pb-48"
              >
                <span
                  className="absolute h-2/3 w-px bg-gradient-to-b from-zinc-500 via-zinc-500/50 to-transparent"
                  aria-hidden="true"
                />
                <span className="drop-shadow-orange relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-zinc-500 bg-zinc-900 text-sm text-zinc-200 duration-1000 group-hover:border-zinc-200 group-hover:bg-zinc-900 group-hover:text-white">
                  {Icons[s.label.toLowerCase()]}
                </span>
                <div className="z-10 flex flex-col items-center">
                  <span className="font-display text-xl font-medium text-zinc-200 duration-150 group-hover:text-white lg:text-3xl">
                    {s.handle}
                  </span>
                  <span className="mt-4 text-center text-sm text-zinc-400 duration-1000 group-hover:text-zinc-200">
                    {s.label}
                  </span>
                </div>
              </Link>
            </Card>
          ))}
        </section>
      </div>
    </main>
  )
}

'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { NavigationQuery } from '@/sanity/lib/queries'
import { Home } from 'lucide-react'
import { capitalize, cn, sortNavigation } from '@/lib/utils'

type NavigationProps = {
  navigation: NavigationQuery
  fixed?: boolean
}

export const Navigation: React.FC<NavigationProps> = ({
  fixed = true,
  navigation = [],
}) => {
  const ref = useRef<HTMLElement>(null)
  const [isIntersecting, setIntersecting] = useState(true)

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting)
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const fixedClasses = cn(
    'fixed inset-x-0 top-0 z-50 border-b backdrop-blur',
    isIntersecting
      ? 'border-transparent bg-zinc-900/0'
      : 'bg-zinc-900/500  border-zinc-800 '
  )

  return (
    <header ref={ref}>
      <div className={cn(fixed ? fixedClasses : '')}>
        <div className="container mx-auto flex flex-row-reverse items-center justify-between p-6 text-sm sm:text-base">
          <div className="group flex justify-between gap-4 text-zinc-200 md:gap-8">
            {navigation.sort(sortNavigation).map(({ slug }) => (
              <Link
                key={slug}
                aria-label={`Go to ${slug} page`}
                href={`/${slug}`}
                className="duration-200 hover:!text-zinc-200 group-hover:text-zinc-400"
              >
                {capitalize(slug)}
              </Link>
            ))}
          </div>
          <Link
            aria-label="Go to home page"
            href="/"
            className="text-zinc-200 duration-200 hover:text-zinc-100"
          >
            <Home className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </header>
  )
}

'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

type NavigationProps = {
  fixed?: boolean
}

export const Navigation: React.FC<NavigationProps> = ({ fixed = true }) => {
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
          <div className="flex justify-between gap-4 text-zinc-300 md:gap-8">
            <Link href="/projects" className="duration-200 hover:text-zinc-100">
              Projects
            </Link>
            <Link href="/about" className="duration-200 hover:text-zinc-100">
              About
            </Link>
            <Link href="/contact" className="duration-200 hover:text-zinc-100">
              Contact
            </Link>
            <Link href="/articles" className="duration-200 hover:text-zinc-100">
              Articles
            </Link>
          </div>
          <Link
            href="/"
            className="text-zinc-200 duration-200 hover:text-zinc-100"
          >
            <ArrowLeft className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </header>
  )
}

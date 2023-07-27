import Image from 'next/image'
import Link from 'next/link'
import { cachedClient } from '@/sanity/lib/client'
import { urlForImage } from '@/sanity/lib/image'
import { projectPathsQuery, projectQuery } from '@/sanity/lib/queries'
import { PortableText } from '@portabletext/react'
import { MoveRight } from 'lucide-react'
import { Navigation } from '@/components/nav'
import { ptComponents } from '@/components/ptComponents'

export async function generateStaticParams() {
  return await cachedClient(projectPathsQuery)
}

export default async function Article({ params }: { params: any }) {
  const project = await cachedClient(projectQuery, params)

  return (
    <main className="relative flex min-h-screen flex-col bg-gradient-to-tl from-zinc-800 via-zinc-400/10 to-zinc-950">
      <Navigation fixed={false} />
      <div className="flex flex-col items-center justify-evenly px-16 pb-4 pt-16 text-center">
        <h1 className="py-6 text-4xl font-bold tracking-tight text-zinc-100 sm:w-2/3 sm:text-6xl">
          {project.title}
        </h1>
        <p className="pb-8 text-xl text-zinc-100">{project.subtitle}</p>
        <div className="pt-6 font-bold text-zinc-100">
          <Link
            className="flex transition hover:underline hover:duration-300 hover:ease-in"
            href={project.url}
            target="_blank"
          >
            Website
            <span aria-hidden="true">
              <MoveRight className="pl-2" />
            </span>
          </Link>
        </div>
      </div>
      <div className="grow bg-zinc-200 pb-16 pt-8">
        {project?.image ? (
          <div className="relative min-h-[250px] drop-shadow sm:min-h-[350px] md:my-8 md:min-h-[500px]">
            <Image
              className="object-contain"
              src={urlForImage(project.image)?.url()}
              fill={true}
              priority
              alt={project?.image?.alt || 'Project website screenshot'}
            />
          </div>
        ) : null}
        <div className="light:prose-inverted prose mx-auto p-6 md:prose-lg sm:p-4 md:p-0">
          <PortableText value={project.about} components={ptComponents} />
        </div>
      </div>
    </main>
  )
}

import Image from 'next/image'
import Link from 'next/link'
import { urlForImage } from '@/sanity/lib/image'
import { type IProject } from '@/sanity/schemas/project'
import { PortableText } from '@portabletext/react'
import { MoveRight } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

type ProjectCardProps = {
  project: Readonly<
    Pick<
      IProject,
      '_id' | 'title' | 'subtitle' | 'slug' | 'summary' | 'relevance' | 'image'
    >
  >
  showImage?: boolean
}

export function ProjectCard({ project, showImage = false }: ProjectCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>{project.subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        {showImage && project?.image ? (
          <div className="relative mb-3 min-h-[250px] sm:min-h-[350px] md:mb-5">
            <Image
              className="object-contain"
              src={urlForImage(project.image)?.url()}
              fill={true}
              alt={`${project.title} image`}
              placeholder="blur"
              blurDataURL={project.image.asset?.metadata.lqip}
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ) : null}
        <div className="prose text-zinc-400 duration-150 group-hover:text-zinc-300">
          <PortableText value={project.summary} />
        </div>
      </CardContent>
      <CardFooter>
        <Link
          className="flex transition hover:underline hover:duration-300 hover:ease-in"
          href={`/projects/${project.slug.current}`}
        >
          Learn more about this project
          <span aria-hidden="true">
            <MoveRight className="pl-2" />
          </span>
        </Link>
      </CardFooter>
    </Card>
  )
}

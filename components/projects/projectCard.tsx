import Image from 'next/image'
import Link from 'next/link'
import { urlForImage } from '@/sanity/lib/image'
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

export function ProjectCard({ project, showImage = false }: any) {
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
              priority
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

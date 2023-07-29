import Link from 'next/link'
import { type IProject } from '@/sanity/schemas/project'
import { PortableText } from '@portabletext/react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

type OpenSourceProjectCard = {
  project: Readonly<
    Pick<
      IProject,
      '_id' | 'title' | 'subtitle' | 'slug' | 'summary' | 'relevance' | 'url'
    >
  >
}

export function OpenSourceProjectCard({ project }: OpenSourceProjectCard) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>
          <Link href={project.url} target="_blank" rel="noopener">
            {project.subtitle}
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="prose text-zinc-400 duration-150 group-hover:text-zinc-300">
          <PortableText value={project.summary} />
        </div>
      </CardContent>
    </Card>
  )
}

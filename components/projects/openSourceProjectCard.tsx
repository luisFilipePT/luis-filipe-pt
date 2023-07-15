import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function OpenSourceProjectCard({ project }: any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>
          <Link href={project.url} target="_blank">
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

import { cachedClient } from '@/sanity/lib/client'
import {
  contributionsQuery,
  openSourceProjectsQuery,
  workProjectsQuery,
} from '@/sanity/lib/queries'
import { Navigation } from '@/components/nav'
import { OpenSourceProjectCard } from '@/components/projects/openSourceProjectCard'
import { OpenSourceContributionCard } from '@/components/projects/osContributionCard'
import { ProjectCard } from '@/components/projects/projectCard'

export default async function Projects() {
  const [workProjects, openSourceProjects, contributions] = await Promise.all([
    cachedClient(workProjectsQuery),
    cachedClient(openSourceProjectsQuery),
    cachedClient(contributionsQuery),
  ])

  const [featuredWorkProject, proj1, proj2, ...projects] = workProjects

  return (
    <main className="relative min-h-screen bg-gradient-to-tl from-zinc-900 via-zinc-400/10 to-zinc-900 pb-16 pt-6 md:pt-1">
      <Navigation />
      <div className="mx-auto max-w-7xl px-6 pt-16 md:space-y-16 md:pt-24 lg:px-8 lg:pt-32">
        <section className="space-y-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h1 className="font-foldit text-8xl tracking-tight text-zinc-100">
              Projects
            </h1>
            <p className="mt-4 text-lg font-semibold text-zinc-400">
              Showcasing some projects I{"'"}ve worked on professionally in my
              career
            </p>
          </div>

          <div className="mx-auto grid grid-cols-1 gap-8 lg:grid-cols-2">
            <ProjectCard project={featuredWorkProject} showImage />

            <div className="mx-auto flex w-full flex-col gap-8 border-t border-gray-900/10 lg:mx-0 lg:border-t-0 ">
              {[proj1, proj2].map((project: any) => (
                <ProjectCard project={project} />
              ))}
            </div>
          </div>
          <div className="columns-1 gap-5 sm:columns-2 sm:gap-8 xl:columns-3 [&>div:not(:first-child)]:mt-8">
            {projects.map((project: any) => (
              <ProjectCard project={project} />
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <div className="hidden h-px w-full bg-zinc-800 md:block" />
          <p className="pt-8 text-lg font-semibold text-zinc-400">
            Some of the Projects I{"'"}ve created or had a relevant role in
          </p>
          <div className="columns-1 gap-5 sm:columns-2 sm:gap-8 xl:columns-3 [&>div:not(:first-child)]:mt-8">
            {openSourceProjects.map((project: any) => (
              <OpenSourceProjectCard project={project} />
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <div className="hidden h-px w-full bg-zinc-800 md:block" />
          <p className="pt-8 text-lg font-semibold text-zinc-400">
            Some of my Open-source contributions
          </p>
          <div className="columns-1 gap-5 sm:columns-2 sm:gap-8 xl:columns-3 [&>div:not(:first-child)]:mt-8">
            {contributions.map((contribution: any) => (
              <OpenSourceContributionCard contribution={contribution} />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

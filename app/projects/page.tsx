import { cachedClient } from '@/sanity/lib/client'
import {
  contributionsQuery,
  navigationQuery,
  openSourceProjectsQuery,
  projectsPageQuery,
  workProjectsQuery,
  type ContributionsQuery,
  type NavigationQuery,
  type OpenSourceProjectsQuery,
  type ProjectsPageQuery,
  type WorkProjectsQuery,
} from '@/sanity/lib/queries'
import { PortableText } from '@portabletext/react'
import { Navigation } from '@/components/nav'
import { OpenSourceProjectCard } from '@/components/projects/openSourceProjectCard'
import { OpenSourceContributionCard } from '@/components/projects/osContributionCard'
import { ProjectCard } from '@/components/projects/projectCard'

const section = {
  work: {
    id: 'work',
  },
  creations: {
    id: 'creations',
    title: "Some of the Projects I've created or had a relevant role in",
  },
  contributions: {
    id: 'contributions',
    title: 'Some of my Open-source contributions',
  },
}

export default async function Projects() {
  const [page, navigation, workProjects, openSourceProjects, contributions] =
    await Promise.all([
      cachedClient<ProjectsPageQuery>(projectsPageQuery),
      cachedClient<NavigationQuery>(navigationQuery),
      cachedClient<WorkProjectsQuery>(workProjectsQuery),
      cachedClient<OpenSourceProjectsQuery>(openSourceProjectsQuery),
      cachedClient<ContributionsQuery>(contributionsQuery),
    ])

  // ⚠️Should be at least 4 projects
  const [featuredWorkProject, proj1, proj2, ...projects] = workProjects

  return (
    <main className="relative min-h-screen bg-gradient-to-tl from-zinc-900 via-zinc-400/10 to-zinc-900 pb-16 pt-6 md:pt-1">
      <Navigation navigation={navigation} />
      <div className="mx-auto max-w-7xl px-6 pt-16 md:space-y-16 md:pt-24 lg:px-8 lg:pt-32">
        <section className="space-y-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h1 className="font-foldit text-8xl tracking-tight text-zinc-100">
              {page.title}
            </h1>
            <div className="mt-4 text-lg font-semibold text-zinc-400">
              <PortableText value={page.description} />
            </div>
          </div>

          <div className="mx-auto grid grid-cols-1 gap-8 lg:grid-cols-2">
            <ProjectCard project={featuredWorkProject} showImage />

            <div className="mx-auto flex w-full flex-col gap-8 border-t border-gray-900/10 lg:mx-0 lg:border-t-0 ">
              {[proj1, proj2].map((project: any) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          </div>
          <div className="columns-1 gap-5 sm:columns-2 sm:gap-8 xl:columns-3 [&>div:not(:first-child)]:mt-8">
            {projects.map((project: any) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        </section>

        {openSourceProjects.length > 0 && (
          <section className="space-y-8">
            <div className="hidden h-px w-full bg-zinc-800 md:block" />
            <p className="pt-8 text-lg font-semibold text-zinc-400">
              {section.creations.title}
            </p>
            <div className="columns-1 gap-5 sm:columns-2 sm:gap-8 xl:columns-3 [&>div:not(:first-child)]:mt-8">
              {openSourceProjects.map((project: any) => (
                <OpenSourceProjectCard key={project._id} project={project} />
              ))}
            </div>
          </section>
        )}

        {contributions.length > 0 && (
          <section className="space-y-8">
            <div className="hidden h-px w-full bg-zinc-800 md:block" />
            <p className="pt-8 text-lg font-semibold text-zinc-400">
              {section.contributions.title}
            </p>
            <div className="columns-1 gap-5 sm:columns-2 sm:gap-8 xl:columns-3 [&>div:not(:first-child)]:mt-8">
              {contributions.map((contribution: any) => (
                <OpenSourceContributionCard
                  key={contribution._id}
                  contribution={contribution}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}

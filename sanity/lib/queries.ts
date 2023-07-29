import { type IContribution } from '@/sanity/schemas/contribution'
import { type IPage } from '@/sanity/schemas/page'
import { type IProject } from '@/sanity/schemas/project'
import { type ISocial } from '@/sanity/schemas/social'
import { groq } from 'next-sanity'

/**
 *   /$$$$$$                      /$$           /$$
 *  /$$__  $$                    |__/          | $$
 * | $$  \__/  /$$$$$$   /$$$$$$$ /$$  /$$$$$$ | $$  /$$$$$$$
 * |  $$$$$$  /$$__  $$ /$$_____/| $$ |____  $$| $$ /$$_____/
 *  \____  $$| $$  \ $$| $$      | $$  /$$$$$$$| $$|  $$$$$$
 *  /$$  \ $$| $$  | $$| $$      | $$ /$$__  $$| $$ \____  $$
 * |  $$$$$$/|  $$$$$$/|  $$$$$$$| $$|  $$$$$$$| $$ /$$$$$$$/
 *  \______/  \______/  \_______/|__/ \_______/|__/|_______/
 */

/**
 * Get all social channels
 */
export const socialsQuery = groq`*[_type == "social"]{
    _id, label, handle, link
  }`

export type SocialsQuery = Readonly<
  Pick<ISocial, '_id' | 'label' | 'handle' | 'link'>
>[]

/**
 *  /$$$$$$$                                               /$$
 * | $$__  $$                                             | $$
 * | $$  \ $$ /$$$$$$   /$$$$$$  /$$  /$$$$$$   /$$$$$$$ /$$$$$$   /$$$$$$$
 * | $$$$$$$//$$__  $$ /$$__  $$|__/ /$$__  $$ /$$_____/|_  $$_/  /$$_____/
 * | $$____/| $$  \__/| $$  \ $$ /$$| $$$$$$$$| $$        | $$   |  $$$$$$
 * | $$     | $$      | $$  | $$| $$| $$_____/| $$        | $$ /$$\____  $$
 * | $$     | $$      |  $$$$$$/| $$|  $$$$$$$|  $$$$$$$  |  $$$$//$$$$$$$/
 * |__/     |__/       \______/ | $$ \_______/ \_______/   \___/ |_______/
 *                         /$$  | $$
 *                        |  $$$$$$/
 *                         \______/
 */

/**
 * All work projects
 */
export const workProjectsQuery = groq`*[_type == "project" && type == "work"]{
    _id, title, subtitle, slug, summary, relevance, image {
    asset-> {
        ...,
        metadata
      }
    }
  } | order(relevance asc)`

export type WorkProjectsQuery = Readonly<
  Pick<
    IProject,
    '_id' | 'title' | 'subtitle' | 'slug' | 'summary' | 'relevance' | 'image'
  >
>[]

/**
 * Open source projects, projects created or heavily contributed to
 */
export const openSourceProjectsQuery = groq`*[_type == "project" && type == "creation"]{
    _id, title, subtitle, summary, slug, url, relevance
  } | order(relevance asc)`

export type OpenSourceProjectsQuery = Readonly<
  Pick<
    IProject,
    '_id' | 'title' | 'subtitle' | 'slug' | 'summary' | 'relevance' | 'url'
  >
>[]

/**
 * All "minor" contributions to open source projects
 */
export const contributionsQuery = groq`*[_type == "contribution"]{
    _id, label, description, logo, link
  }`

export type ContributionsQuery = Readonly<
  Pick<IContribution, '_id' | 'label' | 'description' | 'logo' | 'link'>
>[]

/**
 * Single project
 */
export const projectQuery = groq`*[_type == "project" && slug.current == $slug][0]{ 
    _id,       
    slug,
    url,
    title,
    subtitle,
    tldr,
    image,
    about,
    publishedAt,
  }`

/**
 * All project slugs
 */
export const projectPathsQuery = groq`*[_type == "project" && defined(slug.current)][]{
    "params": { "slug": slug.current }
  }`

/**
 *  /$$$$$$$
 * | $$__  $$
 * | $$  \ $$ /$$$$$$   /$$$$$$   /$$$$$$   /$$$$$$$
 * | $$$$$$$/|____  $$ /$$__  $$ /$$__  $$ /$$_____/
 * | $$____/  /$$$$$$$| $$  \ $$| $$$$$$$$|  $$$$$$
 * | $$      /$$__  $$| $$  | $$| $$_____/ \____  $$
 * | $$     |  $$$$$$$|  $$$$$$$|  $$$$$$$ /$$$$$$$/
 * |__/      \_______/ \____  $$ \_______/|_______/
 *                     /$$  \ $$
 *                    |  $$$$$$/
 *                     \______/
 */

/**
 * Home page
 */
export const homePageQuery = groq`*[_type == "pageV2" && slug.current == "home"][0]{
    _id, title, description[]{
      ...,
      markDefs[]{
        ...,
        _type == "internalLink" => {
          "slug": @.reference->slug
        }
      }
    }
  }`

export type HomePageQuery = Readonly<
  Pick<IPage, '_id' | 'title' | 'description'>
>

/**
 * Projects page
 */
export const projectsPageQuery = groq`*[_type == "pageV2" && slug.current == "projects"][0]{
    _id, title, description
  }`

export type ProjectsPageQuery = Readonly<
  Pick<IPage, '_id' | 'title' | 'description'>
>

/**
 * About page
 */
export const aboutPageQuery = groq`*[_type == "pageV2" && slug.current == "about"][0]{
    _id, title, description, image, sections
  }`

export type AboutPageQuery = Readonly<
  Pick<IPage, '_id' | 'title' | 'description' | 'image' | 'sections'>
>

/**
 * Navigation
 */
export const navigationQuery = groq`*[_type == "pageV2" && slug.current != "home"] {
    "slug": slug.current
  }`

export type NavigationQuery = {
  slug: string
}[]

/**
 *   /$$$$$$              /$$     /$$           /$$
 *  /$$__  $$            | $$    |__/          | $$
 * | $$  \ $$  /$$$$$$  /$$$$$$   /$$  /$$$$$$$| $$  /$$$$$$   /$$$$$$$
 * | $$$$$$$$ /$$__  $$|_  $$_/  | $$ /$$_____/| $$ /$$__  $$ /$$_____/
 * | $$__  $$| $$  \__/  | $$    | $$| $$      | $$| $$$$$$$$|  $$$$$$
 * | $$  | $$| $$        | $$ /$$| $$| $$      | $$| $$_____/ \____  $$
 * | $$  | $$| $$        |  $$$$/| $$|  $$$$$$$| $$|  $$$$$$$ /$$$$$$$/
 * |__/  |__/|__/         \___/  |__/ \_______/|__/ \_______/|_______/
 */

/**
 * All articles
 */
export const articlesQuery = groq`*[_type == "article" && defined(slug.current)]{
    _id,       
    slug,
    title,
    subTitle,
    tldr,
    publishedAt,
    mainImage,
  } | order(publishedAt desc) [0...3]`

/**
 * Single article
 */
export const articleQuery = groq`*[_type == "article" && slug.current == $slug][0]{ 
    _id,       
    slug,
    title,
    subTitle,
    tldr,
    body,
    publishedAt,
    mainImage,
  }`

/**
 * All article slugs
 */
export const articlePathsQuery = groq`*[_type == "article" && defined(slug.current)][]{
    "params": { "slug": slug.current }
  }`

import { groq } from 'next-sanity'

// Get all social channels
export const socialsQuery = groq`*[_type == "social"]{
    _id, label, handle, link
  }`

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

// Get all work projects
export const workProjectsQuery = groq`*[_type == "project" && type == "work"]{
    _id, title, subtitle, slug, image, summary, relevance
  } | order(relevance asc)`

// Get all created projects
export const openSourceProjectsQuery = groq`*[_type == "project" && type == "creation"]{
    _id, title, subtitle, summary, slug, url, relevance
  } | order(relevance asc)`

// Get all contributions
export const contributionsQuery = groq`*[_type == "contribution"]{
    _id, label, description, logo, link
  }`

// Get a single article by its slug
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

// Get all article slugs
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

// Get About Page
export const aboutPageQuery = groq`*[_type == "page" && slug.current == "about"][0]{
    _id, pageTitle, image, slug, description, contentIntro, contentDescription, pageBuilder
  }`

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

// Get all posts
export const articlesQuery = groq`*[_type == "article" && defined(slug.current)]{
    _id,       
    slug,
    title,
    subTitle,
    tldr,
    publishedAt,
    mainImage,
  } | order(publishedAt desc) [0...3]`

// Get a single article by its slug
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

// Get all article slugs
export const articlePathsQuery = groq`*[_type == "article" && defined(slug.current)][]{
    "params": { "slug": slug.current }
  }`

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// capitalize
export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// sort navigation in order Projects About Contact Articles. Unknown strings should come last
export function sortNavigation(a: { slug: string }, b: { slug: string }) {
  const order = ['projects', 'about', 'contact', 'articles']
  const aIndex = order.indexOf(a.slug)
  const bIndex = order.indexOf(b.slug)
  if (aIndex === -1) return 1
  if (bIndex === -1) return -1
  return aIndex - bIndex
}

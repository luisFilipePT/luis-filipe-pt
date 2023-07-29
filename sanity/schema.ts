import article from '@/sanity/schemas/article'
import contribution from '@/sanity/schemas/contribution'
import { openSection } from '@/sanity/schemas/openSection'
import page from '@/sanity/schemas/page'
import { type SchemaTypeDefinition } from 'sanity'

import project from './schemas/project'
import social from './schemas/social'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [page, project, social, contribution, article, openSection],
}

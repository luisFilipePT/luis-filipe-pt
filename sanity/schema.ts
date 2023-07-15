import article from '@/sanity/schemas/article'
import contribution from '@/sanity/schemas/contribution'
import page, { openType } from '@/sanity/schemas/page'
import { type SchemaTypeDefinition } from 'sanity'

import blockContent from './schemas/blockContent'
import project from './schemas/project'
import social from './schemas/social'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project, blockContent, social, contribution, page, article, openType],
}

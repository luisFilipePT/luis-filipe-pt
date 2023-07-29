import { IOpenSection, openSection } from '@/sanity/schemas/openSection'
import {
  defineArrayMember,
  defineField,
  defineType,
  PortableTextBlock,
} from 'sanity'

export interface IPage {
  _id: string
  _type: 'pageV2'
  name: string
  title: string
  description: PortableTextBlock
  image: {
    alt: string
    caption: string
    url: string
  }
  slug: {
    current: string
  }
  sections: IOpenSection[]
}

export default defineType({
  name: 'pageV2',
  type: 'document',
  title: 'Page',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      description:
        'Not displayed in the website but used for Navigation, SEO (metadata) and Studio purposes.',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      description: 'Optional. Not used in all pages.',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      description: 'Optional. Not used in all pages.',
      type: 'array',
      of: [
        defineArrayMember({
          title: 'Block',
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
          ],
          lists: [],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
            annotations: [
              {
                title: 'Link',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                  },
                ],
              },
              {
                name: 'internalLink',
                type: 'object',
                title: 'Internal link',
                fields: [
                  {
                    name: 'reference',
                    type: 'reference',
                    title: 'Reference',
                    to: [{ type: 'pageV2' }],
                  },
                ],
              },
            ],
          },
        }),
      ],
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'image',
      title: 'Image',
      description: 'Optional. Not used in all pages.',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          title: 'Alt Text',
          name: 'alt',
          type: 'string',
        },
        {
          title: 'Caption',
          name: 'caption',
          type: 'string',
        },
      ],
    }),
    {
      title: 'Section builder',
      name: 'sections',
      type: 'array',
      of: [{ type: openSection.name }],
    },
  ],
  preview: {
    select: {
      title: 'name',
    },
  },
})

import { defineField, defineType, PortableTextBlock } from 'sanity'

export interface IOpenSection {
  _id: string
  _type: 'open'
  pageTitle: string
  content: PortableTextBlock[]
  image: {
    alt: string
    caption: string
    url: string
  }
}

export const openSection = defineType({
  title: 'Content Section',
  name: 'open',
  type: 'document',
  fields: [
    defineField({
      title: 'Section Title',
      name: 'pageTitle',
      type: 'string',
    }),
    defineField({
      title: 'Content',
      name: 'content',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'image',
      title: 'Image',
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
  ],
})

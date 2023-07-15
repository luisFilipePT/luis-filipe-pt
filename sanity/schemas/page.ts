import { defineField, defineType } from 'sanity'

export const openType = defineType({
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

export default defineType({
  name: 'page',
  type: 'document',
  title: 'Page',
  fields: [
    defineField({
      name: 'pageTitle',
      title: 'Page Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'pageTitle',
        maxLength: 96,
      },
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
    defineField({
      name: 'contentIntro',
      title: 'Intro',
      type: 'string',
    }),
    defineField({
      name: 'contentDescription',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    {
      title: 'Page builder',
      name: 'pageBuilder',
      type: 'array',
      of: [{ type: openType.name }],
    },
  ],
})

import { defineField, defineType } from 'sanity'

export interface ISocial {
  _id: string
  _type: 'social'
  label: string
  handle: string
  link: string
}

export default defineType({
  name: 'social',
  title: 'Social',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
    }),
    defineField({
      name: 'handle',
      title: 'Handle',
      type: 'string',
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'string',
    }),
  ],
})

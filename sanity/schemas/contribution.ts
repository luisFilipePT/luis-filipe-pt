import { defineField, defineType } from 'sanity'

export interface IContribution {
  _id: string
  _type: 'contribution'
  label: string
  description: string
  logo: string
  link: string
}

export default defineType({
  name: 'contribution',
  title: 'Contribution',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'string',
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'string',
    }),
  ],
})

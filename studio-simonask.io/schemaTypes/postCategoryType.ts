import {defineField, defineType} from 'sanity'

export const postCategoryType = defineType({
  name: 'postCategory',
  title: 'Post category',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'Category shown on the homepage writing list, e.g. Analytics, Career.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background color',
      type: 'color',
      description: 'Tag background on the homepage. Text color is chosen automatically for contrast.',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'label',
      color: 'backgroundColor.hex',
    },
    prepare({title, color}) {
      return {
        title: title || 'Category',
        subtitle: color ? color : 'No color',
      }
    },
  },
})

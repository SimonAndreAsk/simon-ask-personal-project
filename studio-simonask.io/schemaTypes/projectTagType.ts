import {defineField, defineType} from 'sanity'

export const projectTagType = defineType({
  name: 'projectTag',
  title: 'Project tag',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'Tool or technology name, e.g. GA4, React, Sanity.',
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
        title: title || 'Tag',
        subtitle: color ? color : 'No color',
      }
    },
  },
})

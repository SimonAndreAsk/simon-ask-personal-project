import {defineField, defineType} from 'sanity'

export const figureType = defineType({
  name: 'figure',
  title: 'Figure',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'caption',
      type: 'string',
    }),
  ],
  preview: {
    select: {media: 'image', caption: 'caption'},
    prepare({media, caption}) {
      return {
        title: caption || 'Figure',
        media,
      }
    },
  },
})

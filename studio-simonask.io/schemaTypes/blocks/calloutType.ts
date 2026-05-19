import {defineField, defineType} from 'sanity'

export const calloutType = defineType({
  name: 'callout',
  title: 'Callout',
  type: 'object',
  fields: [
    defineField({
      name: 'tone',
      title: 'Tone',
      type: 'string',
      options: {
        list: [
          {title: 'Note', value: 'note'},
          {title: 'Info', value: 'info'},
          {title: 'Warning', value: 'warning'},
        ],
        layout: 'radio',
      },
      initialValue: 'note',
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {text: 'text', tone: 'tone'},
    prepare({text, tone}) {
      return {
        title: text || 'Callout',
        subtitle: tone,
      }
    },
  },
})

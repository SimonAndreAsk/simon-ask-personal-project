import {defineField, defineType} from 'sanity'

export const codeBlockType = defineType({
  name: 'codeBlock',
  title: 'Code block',
  type: 'object',
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      options: {
        list: [
          {title: 'TypeScript', value: 'typescript'},
          {title: 'JavaScript', value: 'javascript'},
          {title: 'CSS', value: 'css'},
          {title: 'HTML', value: 'html'},
          {title: 'Shell', value: 'shell'},
          {title: 'JSON', value: 'json'},
          {title: 'Plain text', value: 'text'},
        ],
      },
      initialValue: 'typescript',
    }),
    defineField({
      name: 'code',
      type: 'text',
      rows: 12,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {code: 'code', language: 'language'},
    prepare({code, language}) {
      return {
        title: code?.slice(0, 48) || 'Code block',
        subtitle: language,
      }
    },
  },
})

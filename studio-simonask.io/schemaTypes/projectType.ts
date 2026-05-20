import {defineField, defineType} from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  groups: [
    {name: 'details', title: 'Details', default: true},
    {name: 'media', title: 'Media'},
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      group: 'details',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Project link',
      type: 'url',
      group: 'details',
      description: 'Repository, live site, or case study URL.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      group: 'details',
      description: 'Short blurb shown on the homepage.',
    }),
    defineField({
      name: 'image',
      title: 'Thumbnail',
      type: 'image',
      group: 'media',
      description: 'Optional — shown next to the title on the homepage.',
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      group: 'details',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
  ],
})

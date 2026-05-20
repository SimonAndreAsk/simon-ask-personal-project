import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Drafts')
        .child(
          S.documentList()
            .title('Drafts')
            .filter('_type == "post" && _id in path("drafts.**")')
            .defaultOrdering([{field: '_updatedAt', direction: 'desc'}]),
        ),
      S.listItem()
        .title('Published')
        .child(
          S.documentList()
            .title('Published')
            .filter('_type == "post" && !(_id in path("drafts.**"))')
            .defaultOrdering([{field: 'publishedAt', direction: 'desc'}]),
        ),
      S.divider(),
      S.listItem()
        .title('All posts')
        .child(
          S.documentList()
            .title('All posts')
            .filter('_type == "post"')
            .defaultOrdering([{field: 'publishedAt', direction: 'desc'}]),
        ),
      S.divider(),
      S.listItem()
        .title('Projects')
        .child(
          S.documentList()
            .title('Projects')
            .filter('_type == "project"')
            .defaultOrdering([{field: 'publishedAt', direction: 'desc'}]),
        ),
      S.listItem()
        .title('Project tags')
        .child(
          S.documentList()
            .title('Project tags')
            .filter('_type == "projectTag"')
            .defaultOrdering([{field: 'label', direction: 'asc'}]),
        ),
      S.listItem()
        .title('Experience')
        .child(
          S.documentList()
            .title('Experience')
            .filter('_type == "experience"')
            .defaultOrdering([{field: 'publishedAt', direction: 'desc'}]),
        ),
    ])

function required(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(
      `Missing ${name}. Copy .env.example to .env.local and set your Sanity project ID.`,
    )
  }
  return value
}

export const studioProjectId = required('SANITY_STUDIO_PROJECT_ID')

export const studioDataset =
  process.env.SANITY_STUDIO_DATASET ?? 'production'

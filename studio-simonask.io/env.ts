function required(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(
      `Missing ${name}. For local dev: copy .env.example to .env.local. For deploy: set in .env.production or sanity.io/manage → Studios → Environment variables.`,
    )
  }
  return value
}

export const studioProjectId = required('SANITY_STUDIO_PROJECT_ID')

export const studioDataset =
  process.env.SANITY_STUDIO_DATASET ?? 'production'

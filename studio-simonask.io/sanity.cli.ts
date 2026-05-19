import {defineCliConfig} from 'sanity/cli'

import {studioDataset, studioProjectId} from './env'

export default defineCliConfig({
  api: {
    projectId: studioProjectId,
    dataset: studioDataset,
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
    appId: 'fjc7b1ag3yzef2bxbi4cdzzd',
  },
  studioHost: 'simonaskio',
})

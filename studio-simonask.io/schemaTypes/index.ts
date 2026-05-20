import {blockContentType} from './blockContentType'
import {calloutType} from './blocks/calloutType'
import {codeBlockType} from './blocks/codeBlockType'
import {figureType} from './blocks/figureType'
import {experienceType} from './experienceType'
import {postCategoryType} from './postCategoryType'
import {postType} from './postType'
import {projectTagType} from './projectTagType'
import {projectType} from './projectType'

export const schemaTypes = [
  postType,
  projectType,
  projectTagType,
  postCategoryType,
  experienceType,
  blockContentType,
  calloutType,
  figureType,
  codeBlockType,
]

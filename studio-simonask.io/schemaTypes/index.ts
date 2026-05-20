import {blockContentType} from './blockContentType'
import {calloutType} from './blocks/calloutType'
import {codeBlockType} from './blocks/codeBlockType'
import {figureType} from './blocks/figureType'
import {postType} from './postType'
import {projectType} from './projectType'

export const schemaTypes = [
  postType,
  projectType,
  blockContentType,
  calloutType,
  figureType,
  codeBlockType,
]

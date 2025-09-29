import type { Grammar } from './Grammar.js'
import { createNamePathParslet } from '../parslets/NamePathParslet.js'
import { createNameParslet } from '../parslets/NameParslet.js'
import { stringValueParslet } from '../parslets/StringValueParslet.js'
import { numberParslet } from '../parslets/NumberParslet.js'
import { createSpecialNamePathParslet } from '../parslets/SpecialNamePathParslet.js'

export const createPathGrammars = ({
  module, strictMode, asyncFunctionBody
}: {
  module: boolean,
  strictMode: boolean,
  asyncFunctionBody: boolean
}): {
  basePathGrammar: Grammar,
  pathGrammar: Grammar
} => {
  const basePathGrammar: Grammar = [
    createNameParslet({
      module, strictMode, asyncFunctionBody,
      allowReservedWords: false,
      allowedAdditionalTokens: ['external', 'module']
    }),
    stringValueParslet,
    numberParslet,
    createNamePathParslet({
      allowSquareBracketsOnAnyType: false,
      allowJsdocNamePaths: true,
      pathGrammar: null
    })
  ]

  const pathGrammar: Grammar = [
    ...basePathGrammar,
    createSpecialNamePathParslet({
      allowedTypes: ['event'],
      pathGrammar: basePathGrammar
    })
  ]

  return {
    basePathGrammar,
    pathGrammar
  }
}

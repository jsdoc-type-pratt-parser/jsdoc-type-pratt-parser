import { Grammar } from './Grammar'
import { NameParslet } from '../parslets/NameParslet'
import { StringValueParslet } from '../parslets/StringValueParslet'
import { NumberParslet } from '../parslets/NumberParslet'
import { SpecialNamePathParslet } from '../parslets/SpecialNamePathParslet'
import { NamePathParslet } from '../parslets/NamePathParslet'

export const pathGrammar: Grammar = () => {
  const basePathGrammar = {
    prefixParslets: [
      new NameParslet({
        allowedAdditionalTokens: ['external', 'module']
      }),
      new StringValueParslet(),
      new NumberParslet()
    ],
    infixParslets: [
      new NamePathParslet({
        allowJsdocNamePaths: true,
        pathGrammar: null
      })
    ]
  }

  return {
    prefixParslets: [
      ...basePathGrammar.prefixParslets,
      new SpecialNamePathParslet({
        allowedTypes: ['event'],
        pathGrammar: () => basePathGrammar
      })
    ],
    infixParslets: basePathGrammar.infixParslets
  }
}

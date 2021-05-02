import { Grammar } from './Grammar'
import { baseGrammar } from './baseGrammar'
import { FunctionParslet } from '../parslets/FunctionParslet'
import { NamePathParslet } from '../parslets/NamePathParslet'
import { KeyValueParslet } from '../parslets/KeyValueParslet'

export const closureGrammar: Grammar = () => {
  const {
    prefixParslets,
    infixParslets
  } = baseGrammar()

  return {
    prefixParslets: [
      ...prefixParslets,
      new FunctionParslet({
        allowWithoutParenthesis: false,
        allowNamedParameters: ['this', 'new'],
        allowNoReturnType: true
      })
    ],
    infixParslets: [
      ...infixParslets,
      new NamePathParslet({
        allowJsdocNamePaths: false
      }),
      new KeyValueParslet({
        allowOnlyNameOrNumberProperties: true
      })
    ]
  }
}

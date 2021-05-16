import { Grammar } from './Grammar'
import { baseGrammar } from './baseGrammar'
import { FunctionParslet } from '../parslets/FunctionParslet'
import { NamePathParslet } from '../parslets/NamePathParslet'
import { KeyValueParslet } from '../parslets/KeyValueParslet'
import { TypeOfParslet } from '../parslets/TypeOfParslet'
import { VariadicParslet } from '../parslets/VariadicParslet'
import { NameParslet } from '../parslets/NameParslet'
import { NotNullableParslet } from '../parslets/NotNullableParslet'

export const closureGrammar: Grammar = () => {
  const {
    prefixParslets,
    infixParslets
  } = baseGrammar()

  return {
    prefixParslets: [
      ...prefixParslets,
      new NameParslet({
        allowedAdditionalTokens: ['module', 'event', 'external']
      }),
      new TypeOfParslet(),
      new FunctionParslet({
        allowWithoutParenthesis: false,
        allowNamedParameters: ['this', 'new'],
        allowNoReturnType: true
      }),
      new VariadicParslet({
        allowEnclosingBrackets: false
      }),
      new NameParslet({
        allowedAdditionalTokens: ['keyof']
      }),
      new NotNullableParslet()
    ],
    infixParslets: [
      ...infixParslets,
      new NamePathParslet({
        allowJsdocNamePaths: false
      }),
      new KeyValueParslet({
        allowOnlyNameOrNumberProperties: true
      }),
      new NotNullableParslet()
    ]
  }
}

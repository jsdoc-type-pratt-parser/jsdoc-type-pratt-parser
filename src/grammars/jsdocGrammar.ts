import { Grammar } from './Grammar'
import { SymbolParslet } from '../parslets/SymbolParslet'
import { ArrayBracketsParslet } from '../parslets/ArrayBracketsParslet'
import { StringValueParslet } from '../parslets/StringValueParslet'
import { FunctionParslet } from '../parslets/FunctionParslet'
import { baseGrammar } from './baseGrammar'
import { NamePathParslet } from '../parslets/NamePathParslet'
import { KeyValueParslet } from '../parslets/KeyValueParslet'
import { VariadicParslet } from '../parslets/VariadicParslet'
import { ModuleParslet } from '../parslets/ModuleParslet'

export const jsdocGrammar: Grammar = () => {
  const {
    prefixParslets,
    infixParslets
  } = baseGrammar()

  return {
    prefixParslets: [
      ...prefixParslets,
      new FunctionParslet({
        allowWithoutParenthesis: true,
        allowNamedParameters: ['this', 'new'],
        allowNoReturnType: true
      }),
      new StringValueParslet(),
      new ModuleParslet(),
      new VariadicParslet({
        allowEnclosingBrackets: true
      })
    ],
    infixParslets: [
      ...infixParslets,
      new SymbolParslet(),
      new ArrayBracketsParslet(),
      new NamePathParslet({
        allowJsdocNamePaths: true
      }),
      new KeyValueParslet({
        allowOnlyNameOrNumberProperties: false
      }),
      new VariadicParslet({
        allowEnclosingBrackets: true
      })
    ]
  }
}

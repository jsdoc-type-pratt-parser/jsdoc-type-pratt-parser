import { SymbolParslet } from '../parslets/SymbolParslet'
import { ArrayBracketsParslet } from '../parslets/ArrayBracketsParslet'
import { StringValueParslet } from '../parslets/StringValueParslet'
import { FunctionParslet } from '../parslets/FunctionParslet'
import { baseGrammar } from './baseGrammar'
import { NamePathParslet } from '../parslets/NamePathParslet'
import { KeyValueParslet } from '../parslets/KeyValueParslet'
import { VariadicParslet } from '../parslets/VariadicParslet'
import { SpecialNamePathParslet } from '../parslets/SpecialNamePathParslet'
import { NameParslet } from '../parslets/NameParslet'
import { ObjectParslet } from '../parslets/ObjectParslet'
import { combineGrammars } from './combineGrammars'

export const jsdocGrammar = combineGrammars(baseGrammar, () => ({
  prefixParslets: [
    new ObjectParslet({
      allowKeyTypes: true
    }),
    new FunctionParslet({
      allowWithoutParenthesis: true,
      allowNamedParameters: ['this', 'new'],
      allowNoReturnType: true
    }),
    new StringValueParslet(),
    new SpecialNamePathParslet({
      allowedTypes: ['module', 'external', 'event']
    }),
    new VariadicParslet({
      allowEnclosingBrackets: true
    }),
    new NameParslet({
      allowedAdditionalTokens: ['keyof']
    })
  ],
  infixParslets: [
    new SymbolParslet(),
    new ArrayBracketsParslet(),
    new NamePathParslet({
      allowJsdocNamePaths: true
    }),
    new KeyValueParslet({
      allowKeyTypes: true,
      allowOptional: false,
      allowReadonly: false
    }),
    new VariadicParslet({
      allowEnclosingBrackets: true
    })
  ]
}))

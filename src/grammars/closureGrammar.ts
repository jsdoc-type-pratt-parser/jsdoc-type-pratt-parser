import { baseGrammar } from './baseGrammar'
import { FunctionParslet } from '../parslets/FunctionParslet'
import { NamePathParslet } from '../parslets/NamePathParslet'
import { KeyValueParslet } from '../parslets/KeyValueParslet'
import { TypeOfParslet } from '../parslets/TypeOfParslet'
import { VariadicParslet } from '../parslets/VariadicParslet'
import { NameParslet } from '../parslets/NameParslet'
import { ObjectParslet } from '../parslets/ObjectParslet'
import { SpecialNamePathParslet } from '../parslets/SpecialNamePathParslet'
import { SymbolParslet } from '../parslets/SymbolParslet'
import { combineGrammars } from './combineGrammars'
import { NullableInfixParslet, NullablePrefixParslet } from '../parslets/NullableParslets'
import { Grammar } from './Grammar'
import { StringValueParslet } from '../parslets/StringValueParslet'
import { NumberParslet } from '../parslets/NumberParslet'
import { OptionalParslet } from '../parslets/OptionalParslet'

export const closureGrammar = combineGrammars(baseGrammar, () => {
  const objectFieldGrammar: Grammar = () => ({
    prefixParslets: [
      new NameParslet({
        allowedAdditionalTokens: ['module', 'keyof', 'event', 'external']
      }),
      new NullablePrefixParslet(),
      new OptionalParslet(),
      new StringValueParslet(),
      new NumberParslet()
    ],
    infixParslets: [
      new NullableInfixParslet(),
      new OptionalParslet(),
      new KeyValueParslet({
        allowKeyTypes: false,
        allowOptional: false,
        allowReadonly: false
      })
    ]
  })

  return {
    prefixParslets: [
      new ObjectParslet({
        allowKeyTypes: false,
        objectFieldGrammar
      }),
      new NameParslet({
        allowedAdditionalTokens: ['event', 'external']
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
      // additional name parslet is needed for some special cases
      new NameParslet({
        allowedAdditionalTokens: ['keyof']
      }),
      new SpecialNamePathParslet({
        allowedTypes: ['module']
      })
    ],
    infixParslets: [
      new NamePathParslet({
        allowJsdocNamePaths: true
      }),
      new KeyValueParslet({
        allowKeyTypes: false,
        allowOptional: false,
        allowReadonly: false
      }),
      new SymbolParslet()
    ]
  }
})

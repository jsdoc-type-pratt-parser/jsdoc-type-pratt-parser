import { TupleParslet } from '../parslets/TupleParslet'
import { ArrayBracketsParslet } from '../parslets/ArrayBracketsParslet'
import { baseGrammar } from './baseGrammar'
import { TypeOfParslet } from '../parslets/TypeOfParslet'
import { KeyOfParslet } from '../parslets/KeyOfParslet'
import { ImportParslet } from '../parslets/ImportParslet'
import { StringValueParslet } from '../parslets/StringValueParslet'
import { FunctionParslet } from '../parslets/FunctionParslet'
import {
  ArrowFunctionParslet
} from '../parslets/ArrowFunctionParslet'
import { NamePathParslet } from '../parslets/NamePathParslet'
import { KeyValueParslet } from '../parslets/KeyValueParslet'
import { VariadicParslet } from '../parslets/VariadicParslet'
import { NameParslet } from '../parslets/NameParslet'
import { IntersectionParslet } from '../parslets/IntersectionParslet'
import { ObjectParslet } from '../parslets/ObjectParslet'
import { SpecialNamePathParslet } from '../parslets/SpecialNamePathParslet'
import { ReadonlyPropertyParslet } from '../parslets/ReadonlyPropertyParslet'
import { combineGrammars } from './combineGrammars'
import { Grammar } from './Grammar'
import { NullableInfixParslet, NullablePrefixParslet } from '../parslets/NullableParslets'
import { NumberParslet } from '../parslets/NumberParslet'
import { OptionalParslet } from '../parslets/OptionalParslet'

export const typescriptGrammar = combineGrammars(baseGrammar, () => {
  const objectFieldGrammar: Grammar = () => ({
    prefixParslets: [
      new NameParslet({
        allowedAdditionalTokens: ['module', 'event', 'keyof', 'event', 'external']
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
        allowOptional: true,
        allowReadonly: true
      })
    ]
  })

  return {
    prefixParslets: [
      new ObjectParslet({
        allowKeyTypes: false,
        objectFieldGrammar
      }),
      new TypeOfParslet(),
      new KeyOfParslet(),
      new ImportParslet(),
      new StringValueParslet(),
      new FunctionParslet({
        allowWithoutParenthesis: true,
        allowNoReturnType: false,
        allowNamedParameters: ['this', 'new']
      }),
      new TupleParslet({
        allowQuestionMark: false
      }),
      new VariadicParslet({
        allowEnclosingBrackets: false
      }),
      new NameParslet({
        allowedAdditionalTokens: ['event', 'external']
      }),
      new SpecialNamePathParslet({
        allowedTypes: ['module']
      }),
      new ReadonlyPropertyParslet()
    ],
    infixParslets: [
      new ArrayBracketsParslet(),
      new ArrowFunctionParslet(),
      new NamePathParslet({
        allowJsdocNamePaths: false
      }),
      new KeyValueParslet({
        allowKeyTypes: false,
        allowOptional: true,
        allowReadonly: true
      }),
      new IntersectionParslet()
    ]
  }
})

import { TupleParslet } from '../parslets/TupleParslet'
import { Grammar } from './Grammar'
import { ArrayBracketsParslet } from '../parslets/ArrayBracketsParslet'
import { baseGrammar } from './baseGrammar'
import { TypeOfParslet } from '../parslets/TypeOfParslet'
import { KeyOfParslet } from '../parslets/KeyOfParslet'
import { ImportParslet } from '../parslets/ImportParslet'
import { StringValueParslet } from '../parslets/StringValueParslet'
import { FunctionParslet } from '../parslets/FunctionParslet'
import {
  ArrowFunctionWithoutParametersParslet,
  ArrowFunctionWithParametersParslet
} from '../parslets/ArrowFunctionParslet'

export const typescriptGrammar: Grammar = () => {
  const {
    prefixParslets,
    infixParslets
  } = baseGrammar()

  return {
    prefixParslets: [
      ...prefixParslets,
      new TypeOfParslet(),
      new KeyOfParslet(),
      new ImportParslet(),
      new StringValueParslet(),
      new ArrowFunctionWithoutParametersParslet(),
      new FunctionParslet({
        allowWithoutParenthesis: false,
        allowNoReturnType: false
      }),
      new TupleParslet()
    ],
    infixParslets: [
      ...infixParslets,
      new ArrayBracketsParslet(),
      new ArrowFunctionWithParametersParslet()
    ]
  }
}

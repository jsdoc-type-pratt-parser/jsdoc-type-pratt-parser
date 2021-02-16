import { Grammar } from './Grammar'
import { SymbolParslet } from '../parslets/SymbolParslet'
import { ClassPathParslet } from '../parslets/ClassPathParslet'
import { ArrayBracketsParslet } from '../parslets/ArrayBracketsParslet'
import { baseGrammar } from './baseGrammar'
import { StringValueParslet } from '../parslets/StringValueParslet'
import {FunctionParslet} from "../parslets/FunctionParslet";

export const jsdocGrammar: Grammar = () => {
  const {
    prefixParslets,
    infixParslets
  } = baseGrammar()

  return {
    prefixParslets: [
      ...prefixParslets,
      new FunctionParslet({
        allowWithoutParenthesis: true
      }),
      new StringValueParslet()
    ],
    infixParslets: [
      ...infixParslets,
      new SymbolParslet(),
      new ClassPathParslet(),
      new ArrayBracketsParslet()
    ]
  }
}

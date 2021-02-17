import { Grammar } from './Grammar'
import { SymbolParslet } from '../parslets/SymbolParslet'
import { ClassPathParslet } from '../parslets/ClassPathParslet'
import { ArrayBracketsParslet } from '../parslets/ArrayBracketsParslet'
import { StringValueParslet } from '../parslets/StringValueParslet'
import { FunctionParslet } from '../parslets/FunctionParslet'
import {closureGrammar} from "./closureGrammar";

export const jsdocGrammar: Grammar = () => {
  const {
    prefixParslets,
    infixParslets
  } = closureGrammar()

  return {
    prefixParslets: [
      ...prefixParslets,
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

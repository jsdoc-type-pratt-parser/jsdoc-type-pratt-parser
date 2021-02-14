import { Grammar } from './Grammar'
import { SymbolParslet } from '../parslets/SymbolParslet'
import { ClassPathParslet } from '../parslets/ClassPathParslet'
import { ArrayBracketsParslet } from '../parslets/ArrayBracketsParslet'
import { baseGrammar } from './baseGrammar'
import {StringValueParslet} from "../parslets/StringValueParslet";

export const jsdocGrammar: Grammar = () => {
  const {
    prefixParslets,
    infixParslets
  } = baseGrammar()

  return {
    prefixParslets: [
      ...prefixParslets,
      new StringValueParslet(),
    ],
    infixParslets: [
      ...infixParslets,
      new SymbolParslet(),
      new ClassPathParslet(),
      new ArrayBracketsParslet()
    ]
  }
}

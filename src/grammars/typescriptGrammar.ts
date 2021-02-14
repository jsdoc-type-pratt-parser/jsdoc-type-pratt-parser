import { Grammar } from './Grammar'
import { ArrayBracketsParslet } from '../parslets/ArrayBracketsParslet'
import {baseGrammar} from "./baseGrammar";
import {TypeOfParslet} from "../parslets/TypeOfParslet";

export const typescriptGrammar: Grammar = () => {
  const {
    prefixParslets,
    infixParslets
  } = baseGrammar()

  return {
    prefixParslets: [
      ...prefixParslets,
      new TypeOfParslet()
    ],
    infixParslets: [
      ...infixParslets,
      new ArrayBracketsParslet()
    ]
  }
}

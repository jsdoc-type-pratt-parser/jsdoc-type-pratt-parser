import { Grammar } from './Grammar'
import { baseGrammar } from './baseGrammar'
import {FunctionParslet} from "../parslets/FunctionParslet";

export const closureGrammar: Grammar = () => {
  const {
    prefixParslets,
    infixParslets
  } = baseGrammar()

  return {
    prefixParslets: [
      ...prefixParslets,
      new FunctionParslet({
        allowWithoutParenthesis: false
      })
    ],
    infixParslets
  }
}

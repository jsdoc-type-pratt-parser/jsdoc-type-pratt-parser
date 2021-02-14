import { Grammar } from './Grammar'
import { ArrayBracketsParslet } from '../parslets/ArrayBracketsParslet'
import {baseGrammar} from "./baseGrammar";
import {TypeOfParslet} from "../parslets/TypeOfParslet";
import {PostfixVariadicParslet} from "../parslets/VariadicParslet";
import {KeyOfParslet} from "../parslets/KeyOfParslet";

export const typescriptGrammar: Grammar = () => {
  const {
    prefixParslets,
    infixParslets
  } = baseGrammar()

  return {
    prefixParslets: [
      ...prefixParslets,
      new TypeOfParslet(),
      new KeyOfParslet()
    ],
    infixParslets: [
      ...infixParslets,
      new ArrayBracketsParslet(),
      new PostfixVariadicParslet()
    ]
  }
}

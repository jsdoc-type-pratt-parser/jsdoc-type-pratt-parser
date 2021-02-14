import { Grammar } from './Grammar'
import { closureGrammar } from './closureGrammar'
import { SymbolParslet } from '../parslets/SymbolParslet'
import { ClassPathParslet } from '../parslets/ClassPathParslet'

export const jsdocGrammar: Grammar = () => {
  const {
    prefixParslets,
    infixParslets
  } = closureGrammar()

  return {
    prefixParslets: prefixParslets,
    infixParslets: [
      ...infixParslets,
      new SymbolParslet(),
      new ClassPathParslet()
    ]
  }
}

import { InfixParslet, PrefixParslet } from '../parslets/Parslet'

export type Grammar = {
  prefixParslets: PrefixParslet[]
  infixParslets: InfixParslet[]
}

export type JoinableGrammar = {
  parallel?: Grammar[]
  prefixParslets: PrefixParslet[]
  infixParslets: InfixParslet[]
}

export type GrammarFactory = () => JoinableGrammar

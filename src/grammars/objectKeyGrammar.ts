import { GrammarFactory } from './Grammar'
import { NameParslet } from '../parslets/NameParslet'
import { NullableInfixParslet, NullablePrefixParslet } from '../parslets/NullableParslets'

export const objectKeyGrammar: GrammarFactory = () => ({
  prefixParslets: [
    new NameParslet({
      allowedAdditionalTokens: []
    })
  ],
  infixParslets: [
    new NullableInfixParslet()
  ]
})
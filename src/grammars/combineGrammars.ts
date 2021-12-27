import { GrammarFactory } from './Grammar'

export function combineGrammars (grammarFactoryA: GrammarFactory, grammarFactoryB: GrammarFactory): GrammarFactory {
  return () => {
    const grammarA = grammarFactoryA()
    const grammarB = grammarFactoryB()

    return {
      prefixParslets: [
        ...grammarA.prefixParslets,
        ...grammarB.prefixParslets
      ],
      infixParslets: [
        ...grammarA.infixParslets,
        ...grammarB.infixParslets
      ]
    }
  }
}

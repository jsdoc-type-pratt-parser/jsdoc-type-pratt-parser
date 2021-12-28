import { Grammar } from './Grammar'

export function combineGrammars (grammarFactoryA: Grammar, grammarFactoryB: Grammar): Grammar {
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

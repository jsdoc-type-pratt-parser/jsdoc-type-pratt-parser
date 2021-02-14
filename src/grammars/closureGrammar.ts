import { Grammar } from './Grammar'
import { baseGrammar } from './baseGrammar'

export const closureGrammar: Grammar = () => {
  return baseGrammar()
}

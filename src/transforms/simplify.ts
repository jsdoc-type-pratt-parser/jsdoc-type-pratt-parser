import { identityTransformRules } from './identityTransformRules'
import { transform } from './transform'
import { TerminalResult } from '../result/TerminalResult'

const simplifyRules = identityTransformRules()

// remove parenthesis
simplifyRules.PARENTHESIS = (result, transform) => transform(result.element)

// remove squares around variadic parameters
const identityVariadic = simplifyRules.VARIADIC
simplifyRules.VARIADIC = (result, transform) => {
  result.meta.squareBrackets = false
  return identityVariadic(result, transform)
}

export function simplify (result: TerminalResult): TerminalResult {
  return transform(simplifyRules, result) as TerminalResult
}

import { identityTransformRules } from './identityTransformRules'
import { ParseResult } from '../ParseResult'
import { transform } from './transform'

const simplifyRules = identityTransformRules()

// remove parenthesis
simplifyRules.PARENTHESIS = (result, transform) => transform(result.element)

// remove squares around variadic parameters
const identityVariadic = simplifyRules.VARIADIC
simplifyRules.VARIADIC = (result, transform) => {
  result.meta.squareBrackets = false
  return identityVariadic(result, transform)
}

export function simplify (result: ParseResult): ParseResult {
  return transform(simplifyRules, result) as ParseResult
}

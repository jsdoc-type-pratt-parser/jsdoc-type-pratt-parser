import { NonTerminalResult } from '../ParseResult'

type TransformFunction<TransformResult> = (parseResult: NonTerminalResult) => TransformResult

type TransformRule<TransformResult, ParseResultType extends NonTerminalResult> = (parseResult: ParseResultType, transform: TransformFunction<TransformResult>) => TransformResult

export type TransformRules<TransformResult> = {
  [P in NonTerminalResult as P['type']]?: TransformRule<TransformResult, P>
}

export function transform<TransformResult>(rules: TransformRules<TransformResult>, parseResult: NonTerminalResult): TransformResult {
  const rule = rules[parseResult.type] as TransformRule<TransformResult, NonTerminalResult>
  if (rule === undefined) {
    throw new Error(`In this set of transform rules exists no rule for type ${parseResult.type}.`)
  }

  return rule(parseResult, aParseResult => transform(rules, aParseResult))
}

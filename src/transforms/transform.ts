import { FunctionResult, KeyValueResult, NonTerminalResult, ParseResult } from '../ParseResult'

type TransformFunction<TransformResult> = (parseResult: NonTerminalResult) => TransformResult

type TransformRule<TransformResult, ParseResultType extends NonTerminalResult> = (parseResult: ParseResultType, transform: TransformFunction<TransformResult>) => TransformResult

export type TransformRules<TransformResult> = {
  [P in NonTerminalResult as P['type']]: TransformRule<TransformResult, P>
}

export function transform<TransformResult> (rules: TransformRules<TransformResult>, parseResult: NonTerminalResult): TransformResult {
  const rule = rules[parseResult.type] as TransformRule<TransformResult, NonTerminalResult>
  if (rule === undefined) {
    throw new Error(`In this set of transform rules exists no rule for type ${parseResult.type}.`)
  }

  return rule(parseResult, aParseResult => transform(rules, aParseResult))
}

export function notAvailableTransform<TransformResult> (parseResult: NonTerminalResult): TransformResult {
  throw new Error('This transform is not available. Are you trying the correct parsing mode?')
}

interface SpecialFunctionParams {
  params: Array<ParseResult | KeyValueResult>
  this?: ParseResult
  new?: ParseResult
}

export function extractSpecialParams (source: FunctionResult): SpecialFunctionParams {
  const result: SpecialFunctionParams = {
    params: []
  }

  for (const param of source.parameters) {
    if (param.type === 'KEY_VALUE' && param.left.type === 'NAME') {
      if (param.left.value === 'this') {
        result.this = param.right
      }
      if (param.left.value === 'new') {
        result.new = param.right
      }
    } else {
      result.params.push(param)
    }
  }

  return result
}

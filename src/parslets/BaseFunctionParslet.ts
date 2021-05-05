import { KeyValueResult, NameResult, NonTerminalResult, ParenthesisResult, ParseResult } from '../ParseResult'
import { assertNamedKeyValueOrTerminal } from '../assertTypes'
import { UnexpectedTypeError } from '../errors'

export class BaseFunctionParslet {
  protected getParameters (value: ParenthesisResult): Array<ParseResult | KeyValueResult> {
    let parameters: Array<NonTerminalResult>
    if (value.element === undefined) {
      parameters = []
    } else if (value.element.type === 'PARAMETER_LIST') {
      parameters = value.element.elements
    } else {
      parameters = [value.element]
    }
    return parameters.map(p => assertNamedKeyValueOrTerminal(p))
  }

  protected getNamedParameters (value: ParenthesisResult): KeyValueResult[] {
    const parameters = this.getParameters(value)
    if (parameters.some(p => p.type !== 'KEY_VALUE')) {
      throw new Error('All parameters should be named')
    }
    return parameters as KeyValueResult[]
  }

  protected getUnnamedParameters (value: ParenthesisResult): ParseResult[] {
    const parameters = this.getParameters(value)
    if (parameters.some(p => p.type === 'KEY_VALUE')) {
      throw new Error('No parameter should be named')
    }
    return parameters as ParseResult[]
  }
}

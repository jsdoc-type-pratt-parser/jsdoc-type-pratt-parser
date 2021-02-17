import { KeyValueResult, NonTerminalResult, ParseResult } from '../ParseResult'
import { assertNamedKeyValueOrTerminal } from '../assertTypes'

export class BaseFunctionParslet {
  protected getParameters (value: NonTerminalResult): Array<ParseResult | KeyValueResult> {
    let parameters: Array<ParseResult | KeyValueResult>
    if (value.type === 'PARAMETER_LIST') {
      parameters = value.elements
    } else {
      parameters = [assertNamedKeyValueOrTerminal(value)]
    }
    return parameters
  }

  protected getNamedParameters (value: NonTerminalResult): KeyValueResult[] {
    const parameters = this.getParameters(value)
    if (parameters.some(p => p.type !== 'KEY_VALUE')) {
      throw new Error('All parameters should be named')
    }
    return parameters as KeyValueResult[]
  }

  protected getUnnamedParameters (value: NonTerminalResult): ParseResult[] {
    const parameters = this.getParameters(value)
    if (parameters.some(p => p.type === 'KEY_VALUE')) {
      throw new Error('No parameter should be named')
    }
    return parameters as ParseResult[]
  }
}

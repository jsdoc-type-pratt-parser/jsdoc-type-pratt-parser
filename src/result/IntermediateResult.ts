import { KeyValueResult, NonTerminalResult } from './NonTerminalResult'
import { TerminalResult } from './TerminalResult'

export interface ParameterList {
  type: 'PARAMETER_LIST'
  elements: Array<KeyValueResult | TerminalResult>
}

export type IntermediateResult = NonTerminalResult | ParameterList

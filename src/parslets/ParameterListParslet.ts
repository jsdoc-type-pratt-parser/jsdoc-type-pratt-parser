import { InfixParslet } from './Parslet'
import { TokenType } from '../lexer/Token'
import { ParserEngine } from '../ParserEngine'
import { KeyValueResult, NonTerminalResult, ParseResult } from '../ParseResult'
import { Precedence } from './Precedence'
import { assertNamedKeyValueOrTerminal } from '../assertTypes'

interface ParameterListParsletOptions {
  allowTrailingComma: boolean
}

export class ParameterListParslet implements InfixParslet {
  private readonly allowTrailingComma: boolean // TODO

  constructor (option: ParameterListParsletOptions) {
    this.allowTrailingComma = option.allowTrailingComma
  }

  accepts (type: TokenType, next: TokenType): boolean {
    return type === ','
  }

  getPrecedence (): Precedence {
    return Precedence.PARAMETER_LIST
  }

  parseInfix (parser: ParserEngine, left: NonTerminalResult): NonTerminalResult {
    const elements: Array<ParseResult|KeyValueResult> = [
      assertNamedKeyValueOrTerminal(left)
    ]
    parser.consume(',')
    do {
      const next = parser.parseNonTerminalType(Precedence.PARAMETER_LIST)
      elements.push(assertNamedKeyValueOrTerminal(next))
    } while (parser.consume(','))
    return {
      type: 'PARAMETER_LIST',
      elements
    }
  }
}

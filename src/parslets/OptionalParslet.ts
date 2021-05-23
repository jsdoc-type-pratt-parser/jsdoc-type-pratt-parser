import { InfixParslet, PrefixParslet } from './Parslet'
import { TokenType } from '../lexer/Token'
import { Precedence } from '../Precedence'
import { assertTerminal } from '../assertTypes'
import { ParserEngine } from '../ParserEngine'
import { IntermediateResult } from '../result/IntermediateResult'
import { TerminalResult } from '../result/TerminalResult'

export class OptionalParslet implements PrefixParslet, InfixParslet {
  accepts (type: TokenType, next: TokenType): boolean {
    return type === '='
  }

  getPrecedence (): Precedence {
    return Precedence.OPTIONAL
  }

  parsePrefix (parser: ParserEngine): TerminalResult {
    parser.consume('=')
    return {
      type: 'OPTIONAL',
      element: parser.parseType(Precedence.OPTIONAL),
      meta: {
        position: 'PREFIX'
      }
    }
  }

  parseInfix (parser: ParserEngine, left: IntermediateResult): TerminalResult {
    parser.consume('=')
    return {
      type: 'OPTIONAL',
      element: assertTerminal(left),
      meta: {
        position: 'SUFFIX'
      }
    }
  }
}

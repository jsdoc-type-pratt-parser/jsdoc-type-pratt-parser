import { InfixParslet, PrefixParslet } from './Parslet'
import { TokenType } from '../lexer/Token'
import { Precedence } from '../Precedence'
import { isQuestionMarkUnknownType } from './isQuestionMarkUnkownType'
import { assertTerminal } from '../assertTypes'
import { ParserEngine } from '../ParserEngine'
import { IntermediateResult } from '../result/IntermediateResult'
import { TerminalResult } from '../result/TerminalResult'

export class NullablePrefixParslet implements PrefixParslet {
  accepts (type: TokenType, next: TokenType): boolean {
    return type === '?' && !isQuestionMarkUnknownType(next)
  }

  getPrecedence (): Precedence {
    return Precedence.NULLABLE
  }

  parsePrefix (parser: ParserEngine): TerminalResult {
    parser.consume('?')
    return {
      type: 'NULLABLE',
      element: parser.parseType(Precedence.NULLABLE),
      meta: {
        position: 'PREFIX'
      }
    }
  }
}

export class NullableInfixParslet implements InfixParslet {
  accepts (type: TokenType, next: TokenType): boolean {
    return type === '?'
  }

  getPrecedence (): Precedence {
    return Precedence.NULLABLE
  }

  parseInfix (parser: ParserEngine, left: IntermediateResult): TerminalResult {
    parser.consume('?')
    return {
      type: 'NULLABLE',
      element: assertTerminal(left),
      meta: {
        position: 'SUFFIX'
      }
    }
  }
}

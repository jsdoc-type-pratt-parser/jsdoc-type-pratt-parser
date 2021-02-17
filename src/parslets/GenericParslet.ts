import { ParserEngine } from '../ParserEngine'
import { NonTerminalResult, ParseResult } from '../ParseResult'
import { TokenType } from '../lexer/Token'
import { InfixParslet } from './Parslet'
import { Precedence } from './Precedence'
import { assertTerminal } from '../assertTypes'

export class GenericParslet implements InfixParslet {
  accepts (type: TokenType, next: TokenType): boolean {
    return type === '<' || (type === '.' && next === '<')
  }

  getPrecedence (): Precedence {
    return Precedence.GENERIC
  }

  parseInfix (parser: ParserEngine, left: NonTerminalResult): ParseResult {
    parser.consume('.')
    parser.consume('<')

    const objects = []
    do {
      objects.push(parser.parseType(Precedence.PARAMETER_LIST))
    } while (parser.consume(','))

    if (!parser.consume('>')) {
      throw new Error('Unterminated generic parameter list')
    }

    return {
      type: 'GENERIC',
      subject: assertTerminal(left),
      objects
    }
  }
}

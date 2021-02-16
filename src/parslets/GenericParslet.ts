import { ParserEngine } from '../ParserEngine'
import { NonTerminalResult, ParseResult } from '../ParseResult'
import { TokenType } from '../lexer/Token'
import { Parslet } from './Parslet'
import { Precedence } from './Precedence'
import { assertTerminal } from '../assertTerminal'

export class GenericParslet implements Parslet {
  accepts (type: TokenType, next: TokenType): boolean {
    return type === '<' || (type === '.' && next === '<')
  }

  getPrecedence (): number {
    return Precedence.GENERIC
  }

  parse (parser: ParserEngine, left: NonTerminalResult): ParseResult {
    parser.consume('.')
    parser.consume('<')

    const objects = []
    do {
      objects.push(parser.parseType(Precedence.GENERIC))
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

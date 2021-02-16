import { InfixParslet } from './Parslet'
import { TokenType } from '../lexer/Token'
import { ParserEngine } from '../ParserEngine'
import { NonTerminalResult, ParseResult } from '../ParseResult'
import { Precedence } from './Precedence'

export class ClassPathParslet implements InfixParslet {
  accepts (type: TokenType, next: TokenType): boolean {
    return type === '#' || type === '~'
  }

  getPrecedence (): Precedence {
    return Precedence.POSTFIX
  }

  parseInfix (parser: ParserEngine, left: NonTerminalResult): ParseResult {
    if (left.type !== 'NAME') {
      throw new Error('All elements of class path have to be identifiers')
    }
    let result = left.name
    let lastToken = parser.getToken()
    while (parser.consume('#') || parser.consume('~') || parser.consume('/')) {
      const next = parser.parseType(Precedence.POSTFIX)
      if (next.type !== 'NAME') {
        throw new Error('All elements of class path have to be identifiers')
      }
      result += lastToken.text + next.name
      lastToken = parser.getToken()
    }
    return {
      type: 'NAME',
      name: result
    }
  }
}

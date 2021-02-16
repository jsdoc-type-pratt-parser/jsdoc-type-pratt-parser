import { InfixParslet, PrefixParslet } from './Parslet'
import { TokenType } from '../lexer/Token'
import { ParserEngine } from '../ParserEngine'
import { NonTerminalResult, ParseResult } from '../ParseResult'
import { Precedence } from './Precedence'
import { isQuestionMarkUnknownType } from './isQuestionMarkUnkownType'
import { assertTerminal } from '../assertTerminal'

export class NullablePrefixParslet implements PrefixParslet {
  accepts (type: TokenType, next: TokenType): boolean {
    return (type === '?' && !isQuestionMarkUnknownType(next)) || type === '!'
  }

  getPrecedence (): Precedence {
    return Precedence.NULLABLE
  }

  parsePrefix (parser: ParserEngine): ParseResult {
    const nullable = parser.consume('?') || !parser.consume('!')
    const value = parser.parseType(Precedence.NULLABLE)
    if (value.nullable !== undefined) {
      throw new Error('Multiple nullable modifiers on same type')
    }
    value.nullable = nullable
    return value
  }
}

export class NullableInfixParslet implements InfixParslet {
  accepts (type: TokenType, next: TokenType): boolean {
    return type === '?' || type === '!'
  }

  getPrecedence (): Precedence {
    return Precedence.NULLABLE
  }

  parseInfix (parser: ParserEngine, left: NonTerminalResult): ParseResult {
    const nullable = parser.consume('?') || !parser.consume('!')
    const value = assertTerminal(left)
    if (value.nullable !== undefined) {
      throw new Error('Multiple nullable modifiers on same type')
    }
    value.nullable = nullable
    return value
  }
}

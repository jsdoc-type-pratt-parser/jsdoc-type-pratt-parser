import { InfixParslet, PrefixParslet } from './Parslet'
import { TokenType } from '../lexer/Token'
import { ParserEngine } from '../ParserEngine'
import { NonTerminalResult, ParseResult } from '../ParseResult'
import { Precedence } from './Precedence'
import { isQuestionMarkUnknownType } from './isQuestionMarkUnkownType'
import { assertTerminal } from '../assertTerminal'

export class NullableParslet implements PrefixParslet {
  accepts (type: TokenType, next: TokenType): boolean {
    return (type === '?' && !isQuestionMarkUnknownType(next)) || type === '!'
  }

  getPrecedence (): number {
    return Precedence.PREFIX
  }

  parse (parser: ParserEngine): ParseResult {
    const nullable = parser.consume('?')
    if (!nullable) {
      parser.consume('!')
    }
    const value = parser.parseType(Precedence.PREFIX)
    if (value.nullable !== undefined) {
      throw new Error('Multiple nullable modifiers on same type')
    }
    value.nullable = nullable
    return value
  }
}

export class PostfixNullableParslet implements InfixParslet {
  accepts (type: TokenType): boolean {
    return type === '?' || type === '!'
  }

  getPrecedence (): number {
    return Precedence.POSTFIX
  }

  parse (parser: ParserEngine, left: NonTerminalResult): ParseResult {
    const nullable = parser.consume('?')
    if (!nullable) {
      parser.consume('!')
    }
    if (left.nullable !== undefined) {
      throw new Error('Multiple nullable modifiers on same type')
    }
    left.nullable = nullable
    return assertTerminal(left)
  }
}

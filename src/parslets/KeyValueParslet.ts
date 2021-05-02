import { InfixParslet } from './Parslet'
import { TokenType } from '../lexer/Token'
import { Precedence } from './Precedence'
import { ParserEngine } from '../ParserEngine'
import { NonTerminalResult } from '../ParseResult'
import { assertTerminal } from '../assertTypes'
import { UnexpectedTypeError } from '../errors'

interface KeyValueParsletOptions {
  allowOnlyNameOrNumberProperties: boolean
}

export class KeyValueParslet implements InfixParslet {
  private readonly allowOnlyNameOrNumberProperties

  constructor (opts: KeyValueParsletOptions) {
    this.allowOnlyNameOrNumberProperties = opts.allowOnlyNameOrNumberProperties
  }

  accepts (type: TokenType, next: TokenType): boolean {
    return type === ':'
  }

  getPrecedence (): Precedence {
    return Precedence.KEY_VALUE
  }

  parseInfix (parser: ParserEngine, left: NonTerminalResult): NonTerminalResult {
    parser.consume(':')
    const value = parser.parseType(Precedence.KEY_VALUE)
    if (this.allowOnlyNameOrNumberProperties && left.type !== 'NUMBER' && left.type !== 'NAME') {
      throw new UnexpectedTypeError(left)
    }
    return {
      type: 'KEY_VALUE',
      left: left.type === 'NUMBER' ? left : assertTerminal(left),
      right: value
    }
  }
}

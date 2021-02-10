import { PrefixParslet } from './Parslet'
import { TokenType } from '../lexer/Token'
import { Parser } from '../Parser'
import { ParseResult } from '../ParseResult'
import { Precedence } from './Precedence'

export class SpecialTypesParslet implements PrefixParslet {
  accepts (type: TokenType, next: TokenType): boolean {
    if (type === '?') {
      return next === 'EOF' || next === '|' || next === ',' || next === ')' || next === '>'
    }
    return type === 'null' || type === 'undefined' || type === '*'
  }

  getPrecedence (): number {
    return Precedence.SPECIAL_TYPES
  }

  parse (parser: Parser): ParseResult {
    switch (parser.getToken().type) {
      case 'null':
        parser.consume('null')
        return {
          type: 'NULL'
        }
      case 'undefined':
        parser.consume('undefined')
        return {
          type: 'UNDEFINED'
        }
      case '*':
        parser.consume('*')
        return {
          type: 'ALL'
        }
      case '?':
        parser.consume('?')
        return {
          type: 'UNKNOWN'
        }
      default:
        throw new Error('Unacceptable token: ' + parser.getToken().text)
    }
  }
}

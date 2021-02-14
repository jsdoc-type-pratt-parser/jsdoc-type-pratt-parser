import { InfixParslet } from './Parslet'
import { TokenType } from '../lexer/Token'
import { ParserEngine } from '../ParserEngine'
import { ParseResult, SymbolResult } from '../ParseResult'
import { Precedence } from './Precedence'

export class SymbolParslet implements InfixParslet {
  accepts (type: TokenType): boolean {
    return type === '('
  }

  getPrecedence (): number {
    return Precedence.POSTFIX
  }

  parse (parser: ParserEngine, left: ParseResult): ParseResult {
    if (left.type !== 'NAME') {
      throw new Error('Symbol expects a name on the left side. (Reacting on \'(\')')
    }
    parser.consume('(')
    const result: SymbolResult = {
      type: 'SYMBOL',
      name: left.name
    }
    const token = parser.getToken()
    if (parser.consume('Number') || parser.consume('Identifier')) {
      result.value = token.text
    }
    if (!parser.consume(')')) {
      throw new Error('Symbol does not end after name')
    }
    return result
  }
}

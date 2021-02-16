import { InfixParslet } from './Parslet'
import { TokenType } from '../lexer/Token'
import { ParserEngine } from '../ParserEngine'
import { NonTerminalResult, ParseResult, SymbolResult } from '../ParseResult'
import { Precedence } from './Precedence'

export class SymbolParslet implements InfixParslet {
  accepts (type: TokenType): boolean {
    return type === '('
  }

  getPrecedence (): Precedence {
    return Precedence.SYMBOL
  }

  parseInfix (parser: ParserEngine, left: NonTerminalResult): ParseResult {
    if (left.type !== 'NAME') {
      throw new Error('Symbol expects a name on the left side. (Reacting on \'(\')')
    }
    parser.consume('(')
    const result: SymbolResult = {
      type: 'SYMBOL',
      name: left.name
    }
    if (!parser.consume(')')) {
      const next = parser.parseNonTerminalType(Precedence.SYMBOL)
      if (next.type !== 'NUMBER' && next.type !== 'NAME') {
        throw new Error('Symbol value must be a number or a name')
      }
      result.value = next
      if (!parser.consume(')')) {
        throw new Error('Symbol does not end after value')
      }
    }

    return result
  }
}

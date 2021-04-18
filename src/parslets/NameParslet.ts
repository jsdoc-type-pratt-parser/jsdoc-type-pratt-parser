import { ParserEngine } from '../ParserEngine'
import { TokenType } from '../lexer/Token'
import { NameResult, ParseResult } from '../ParseResult'
import { PrefixParslet } from './Parslet'
import { Precedence } from './Precedence'

const reservedWords = [
  'null',
  'true',
  'false',
  'break',
  'case',
  'catch',
  'class',
  'const',
  'continue',
  'debugger',
  'default',
  'delete',
  'do',
  'else',
  'export',
  'extends',
  'finally',
  'for',
  'function',
  'if',
  'import',
  'in',
  'instanceof',
  'new',
  'return',
  'super',
  'switch',
  'this',
  'throw',
  'try',
  'typeof',
  'var',
  'void',
  'while',
  'with',
  'yield'
]

export class NameParslet implements PrefixParslet {
  accepts (type: TokenType, next: TokenType): boolean {
    return type === 'Identifier' || type === 'this' || type === 'new'
  }

  getPrecedence (): Precedence {
    return Precedence.PREFIX
  }

  parsePrefix (parser: ParserEngine): ParseResult {
    const token = parser.getToken()
    parser.consume('Identifier') || parser.consume('this') || parser.consume('new')
    const result: NameResult = {
      type: 'NAME',
      name: token.text,
      meta: {
        reservedWord: reservedWords.includes(token.text)
      }
    }
    return result
  }
}

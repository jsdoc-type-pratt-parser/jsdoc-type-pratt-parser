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
  accepts (type: TokenType): boolean {
    return type === 'Identifier'
  }

  getPrecedence (): number {
    return Precedence.PREFIX
  }

  parse (parser: ParserEngine): ParseResult {
    const token = parser.getToken()
    parser.consume('Identifier')
    const result: NameResult = {
      type: 'NAME',
      name: token.text
    }
    if (reservedWords.includes(token.text)) {
      result.reservedWord = true
    }
    return result
  }
}

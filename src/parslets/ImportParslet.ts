import { PrefixParslet } from './Parslet'
import { TokenType } from '../lexer/Token'
import { ParserEngine } from '../ParserEngine'
import { ParseResult } from '../ParseResult'
import { Precedence } from './Precedence'

export class ImportParslet implements PrefixParslet {
  accepts (type: TokenType, next: TokenType): boolean {
    return type === 'import'
  }

  getPrecedence (): Precedence {
    return Precedence.PREFIX
  }

  parsePrefix (parser: ParserEngine): ParseResult {
    parser.consume('import')
    if (!parser.consume('(')) {
      throw new Error('Missing parenthesis after import keyword')
    }
    const path = parser.parseType(Precedence.PREFIX)
    if (path.type !== 'STRING_VALUE') {
      throw new Error('Only string values are allowed as paths for imports')
    }
    if (!parser.consume(')')) {
      throw new Error('Missing closing parenthesis after import keyword')
    }
    return {
      type: 'IMPORT',
      element: path
    }
  }
}

import { InfixParslet } from './Parslet'
import { TokenType } from '../lexer/Token'
import { Precedence } from './Precedence'
import { ParserEngine } from '../ParserEngine'
import { NonTerminalResult, ParseResult } from '../ParseResult'
import { assertTerminal } from '../assertTypes'
import { UnexpectedTypeError } from '../errors'

type NamePathParsletOptions = {
  allowJsdocNamePaths: boolean
}

export class NamePathParslet implements InfixParslet {
  private allowJsdocNamePaths: boolean;

  constructor (opts: NamePathParsletOptions) {
    this.allowJsdocNamePaths = opts.allowJsdocNamePaths
  }

  accepts (type: TokenType, next: TokenType): boolean {
    return (type === '.' && next !== '<') || (this.allowJsdocNamePaths && (type === '~' || type === '#'))
  }

  getPrecedence (): Precedence {
    return Precedence.NAME_PATH
  }

  parseInfix (parser: ParserEngine, left: NonTerminalResult): ParseResult {
    const type = parser.getToken().text as "#" | '~' | '.'

    parser.consume('.') || parser.consume('~') || parser.consume('#')

    const next = parser.parseNonTerminalType(Precedence.NAME_PATH);

    if (next.type !== 'NAME' && next.type !== 'STRING_VALUE' && next.type !== 'NUMBER') {
      throw new UnexpectedTypeError(next);
    }

    return {
      type: 'NAME_PATH',
      left: assertTerminal(left),
      right: next,
      meta: {
        type
      }
    }
  }
}

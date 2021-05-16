import { InfixParslet } from './Parslet'
import { TokenType } from '../lexer/Token'
import { Precedence } from '../Precedence'
import { IntermediateResult, ParserEngine } from '../ParserEngine'
import { ParseResult } from '../ParseResult'
import { assertTerminal } from '../assertTypes'
import { UnexpectedTypeError } from '../errors'
import { StringValueParslet } from './StringValueParslet'

interface NamePathParsletOptions {
  allowJsdocNamePaths: boolean
}

export class NamePathParslet implements InfixParslet {
  private readonly allowJsdocNamePaths: boolean
  private readonly stringValueParslet: StringValueParslet

  constructor (opts: NamePathParsletOptions) {
    this.allowJsdocNamePaths = opts.allowJsdocNamePaths
    this.stringValueParslet = new StringValueParslet()
  }

  accepts (type: TokenType, next: TokenType): boolean {
    return (type === '.' && next !== '<') || (this.allowJsdocNamePaths && (type === '~' || type === '#'))
  }

  getPrecedence (): Precedence {
    return Precedence.NAME_PATH
  }

  parseInfix (parser: ParserEngine, left: IntermediateResult): ParseResult {
    const type = parser.getToken().text as '#' | '~' | '.'

    parser.consume('.') || parser.consume('~') || parser.consume('#')

    let next

    if (parser.getToken().type === 'StringValue') {
      next = this.stringValueParslet.parsePrefix(parser)
    } else {
      next = parser.parseIntermediateType(Precedence.NAME_PATH)
      if (next.type !== 'NAME' && next.type !== 'NUMBER') {
        throw new UnexpectedTypeError(next)
      }
    }

    return {
      type: 'NAME_PATH',
      left: assertTerminal(left),
      right: next,
      pathType: type
    }
  }
}

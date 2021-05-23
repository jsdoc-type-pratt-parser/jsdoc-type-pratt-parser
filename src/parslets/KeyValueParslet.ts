import { InfixParslet } from './Parslet'
import { TokenType } from '../lexer/Token'
import { Precedence } from '../Precedence'
import { IntermediateResult, ParserEngine } from '../ParserEngine'
import { JsdocObjectKeyValueResult, KeyValueResult } from '../ParseResult'
import { assertTerminal } from '../assertTypes'
import { UnexpectedTypeError } from '../errors'

interface KeyValueParsletOptions {
  allowKeyTypes: boolean
  allowOptional: boolean
}

export class KeyValueParslet implements InfixParslet {
  private readonly allowKeyTypes: boolean
  private readonly allowOptional: boolean

  constructor (opts: KeyValueParsletOptions) {
    this.allowKeyTypes = opts.allowKeyTypes
    this.allowOptional = opts.allowOptional
  }

  accepts (type: TokenType, next: TokenType): boolean {
    return type === ':'
  }

  getPrecedence (): Precedence {
    return Precedence.KEY_VALUE
  }

  parseInfix (parser: ParserEngine, left: IntermediateResult): KeyValueResult | JsdocObjectKeyValueResult {
    let optional = false

    if (this.allowOptional && left.type === 'NULLABLE') {
      optional = true
      left = left.element
    }

    if (left.type === 'NUMBER' || left.type === 'NAME' || left.type === 'STRING_VALUE') {
      parser.consume(':')

      let quote
      if (left.type === 'STRING_VALUE') {
        quote = left.meta.quote
      }

      return {
        type: 'KEY_VALUE',
        value: left.value.toString(),
        right: parser.parseType(Precedence.KEY_VALUE),
        optional: optional,
        meta: {
          quote
        }
      }
    } else {
      if (!this.allowKeyTypes) {
        throw new UnexpectedTypeError(left)
      }

      parser.consume(':')

      return {
        type: 'JSDOC_OBJECT_KEY_VALUE',
        left: assertTerminal(left),
        right: parser.parseType(Precedence.KEY_VALUE)
      }
    }
  }
}

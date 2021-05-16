import { InfixParslet } from './Parslet'
import { TokenType } from '../lexer/Token'
import { IntermediateResult, ParameterList, ParserEngine } from '../ParserEngine'
import { KeyValueResult, ParseResult } from '../ParseResult'
import { Precedence } from '../Precedence'
import { assertNamedKeyValueOrTerminal } from '../assertTypes'
import { NoParsletFoundError } from '../errors'

interface ParameterListParsletOptions {
  allowTrailingComma: boolean
}

export class ParameterListParslet implements InfixParslet {
  private readonly allowTrailingComma: boolean

  constructor (option: ParameterListParsletOptions) {
    this.allowTrailingComma = option.allowTrailingComma
  }

  accepts (type: TokenType, next: TokenType): boolean {
    return type === ','
  }

  getPrecedence (): Precedence {
    return Precedence.PARAMETER_LIST
  }

  parseInfix (parser: ParserEngine, left: IntermediateResult): ParameterList {
    const elements: Array<ParseResult|KeyValueResult> = [
      assertNamedKeyValueOrTerminal(left)
    ]
    parser.consume(',')
    do {
      try {
        const next = parser.parseIntermediateType(Precedence.PARAMETER_LIST)
        elements.push(assertNamedKeyValueOrTerminal(next))
      } catch (e) {
        if (this.allowTrailingComma && e instanceof NoParsletFoundError) {
          break
        } else {
          throw e
        }
      }
    } while (parser.consume(','))

    if (elements.length > 0 && elements.slice(0, -1).some(e => e.type === 'VARIADIC')) {
      throw new Error('Only the last parameter may be a rest parameter')
    }

    return {
      type: 'PARAMETER_LIST',
      elements
    }
  }
}

import { PrefixParslet } from './Parslet'
import { TokenType } from '../lexer/Token'
import { ParserEngine } from '../ParserEngine'
import { FunctionResult, ParseResult } from '../ParseResult'
import { Precedence } from './Precedence'
import { BaseFunctionParslet } from './BaseFunctionParslet'

export interface FunctionParsletOptions {
  allowNamedParameters: boolean | string[]
  allowUnnamedParameters: boolean
  allowWithoutParenthesis: boolean
}

export class FunctionParslet extends BaseFunctionParslet implements PrefixParslet {
  private readonly allowWithoutParenthesis: boolean
  private readonly allowNamedParameters: boolean | string[]
  private readonly allowUnnamedParameters: boolean

  constructor (options: FunctionParsletOptions) {
    super()
    this.allowWithoutParenthesis = options.allowWithoutParenthesis
    this.allowNamedParameters = options.allowNamedParameters
    this.allowUnnamedParameters = options.allowUnnamedParameters
  }

  accepts (type: TokenType): boolean {
    return type === 'function'
  }

  getPrecedence (): Precedence {
    return Precedence.FUNCTION
  }

  parsePrefix (parser: ParserEngine): ParseResult {
    parser.consume('function')

    const hasParenthesis = parser.consume('(')

    if (!this.allowWithoutParenthesis && !hasParenthesis) {
      throw new Error('function is missing parameter list')
    }
    const result: FunctionResult = {
      type: 'FUNCTION',
      parameters: []
    }

    if (hasParenthesis) {
      if (!parser.consume(')')) {
        const value = parser.parseNonTerminalType(Precedence.ALL)
        if (this.allowUnnamedParameters && this.allowNamedParameters !== false) {
          result.parameters = this.getParameters(value)
        } else if (this.allowNamedParameters === false) {
          result.parameters = this.getUnnamedParameters(value)
        } else if (!this.allowUnnamedParameters) {
          result.parameters = this.getNamedParameters(value)
        }

        if (Array.isArray(this.allowNamedParameters)) {
          for (const p of result.parameters) {
            if (p.type === 'KEY_VALUE' && !this.allowNamedParameters.includes(p.key.name)) {
              throw new Error(`only allowed named parameters are ${this.allowNamedParameters.join(',')} but got ${p.type}`)
            }
          }
        }

        if (!parser.consume(')')) {
          throw new Error('function parameter list is not terminated')
        }
      }

      if (parser.consume(':') && !parser.consume('void')) {
        result.returnType = parser.parseType(Precedence.PREFIX)
      }
    }

    return result
  }
}

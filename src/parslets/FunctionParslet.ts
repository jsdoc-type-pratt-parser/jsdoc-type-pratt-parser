import { PrefixParslet } from './Parslet'
import { TokenType } from '../lexer/Token'
import { ParserEngine } from '../ParserEngine'
import { FunctionResult, ParseResult } from '../ParseResult'
import { Precedence } from './Precedence'
import {assertTerminal} from "../assertTerminal";

type FunctionParsletOptions = {
  allowWithoutParenthesis: boolean
}

export class FunctionParslet implements PrefixParslet {
  private allowWithoutParenthesis: boolean;

  constructor ({ allowWithoutParenthesis }: FunctionParsletOptions) {
    this.allowWithoutParenthesis = allowWithoutParenthesis;
  }

  accepts (type: TokenType): boolean {
    return type === 'function'
  }

  getPrecedence (): number {
    return Precedence.PARENTHESIS
  }

  parse (parser: ParserEngine): ParseResult {
    parser.consume('function')

    const withoutParenthesis = !parser.consume('(')

    if (!this.allowWithoutParenthesis && withoutParenthesis) {
      throw new Error('function is missing parameter list')
    }
    const result: FunctionResult = {
      type: 'FUNCTION',
      parameters: []
    }

    if (!withoutParenthesis ) {
      if (!parser.consume(')')) {
        const value = parser.parseNonTerminalType(Precedence.PARENTHESIS)
        if (value.type === 'PARAMETER_LIST') {
          result.parameters = value.elements
        } else {
          result.parameters = [value.type === 'KEY_VALUE' ? value : assertTerminal(value)]
        }

        if (!parser.consume(')')) {
          throw new Error('function parameter list is not terminated')
        }
      }

      if (parser.consume(':')) {
        result.returnType = parser.parseType(Precedence.PREFIX)
      }
    }

    return result
  }
}

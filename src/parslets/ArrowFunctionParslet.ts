import { InfixParslet, PrefixParslet } from './Parslet'
import { TokenType } from '../lexer/Token'
import { Precedence } from '../Precedence'
import { ParserEngine } from '../ParserEngine'
import { FunctionResult, NonTerminalResult } from '../ParseResult'
import { BaseFunctionParslet } from './BaseFunctionParslet'
import { assertNamedKeyValueOrName } from '../assertTypes'
import { UnexpectedTypeError } from '../errors'

export class ArrowFunctionWithoutParametersParslet implements PrefixParslet {
  accepts (type: TokenType, next: TokenType): boolean {
    return type === '(' && next === ')'
  }

  getPrecedence (): Precedence {
    return Precedence.ARROW
  }

  parsePrefix (parser: ParserEngine): FunctionResult {
    parser.consume('(')
    parser.consume(')')
    if (!parser.consume('=>')) {
      throw new Error('Unexpected empty parenthesis. Expected \'=>\' afterwards.')
    }
    const result: FunctionResult = {
      type: 'FUNCTION',
      parameters: [],
      meta: {
        arrow: true
      }
    }
    if (!parser.consume('void')) {
      const right = parser.parseType(Precedence.ALL)
      result.returnType = right
    }
    return result
  }
}

export class ArrowFunctionWithParametersParslet extends BaseFunctionParslet implements InfixParslet {
  accepts (type: TokenType, next: TokenType): boolean {
    return type === '=>'
  }

  getPrecedence (): Precedence {
    return Precedence.ARROW
  }

  parseInfix (parser: ParserEngine, left: NonTerminalResult): FunctionResult {
    if (left.type !== 'PARENTHESIS') {
      throw new UnexpectedTypeError(left)
    }
    parser.consume('=>')
    const result: FunctionResult = {
      type: 'FUNCTION',
      parameters: this.getParameters(left).map(assertNamedKeyValueOrName),
      meta: {
        arrow: true
      }
    }
    if (!parser.consume('void')) {
      const right = parser.parseType(Precedence.ALL)
      result.returnType = right
    }
    return result
  }
}

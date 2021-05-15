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
    const hasParenthesis = parser.consume('(')
    parser.consume(')')
    if (!parser.consume('=>')) {
      throw new Error('Unexpected empty parenthesis. Expected \'=>\' afterwards.')
    }

    return {
      type: 'FUNCTION',
      parameters: [],
      arrow: true,
      parenthesis: hasParenthesis,
      returnType: parser.parseType(Precedence.ALL)
    }
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

    return {
      type: 'FUNCTION',
      parameters: this.getParameters(left).map(assertNamedKeyValueOrName),
      arrow: true,
      parenthesis: true,
      returnType: parser.parseType(Precedence.ALL)
    }
  }
}

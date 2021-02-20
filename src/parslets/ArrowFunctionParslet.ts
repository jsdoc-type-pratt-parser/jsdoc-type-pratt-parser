import { InfixParslet, PrefixParslet } from './Parslet'
import { TokenType } from '../lexer/Token'
import { Precedence } from './Precedence'
import { ParserEngine } from '../ParserEngine'
import { ArrowResult, NonTerminalResult } from '../ParseResult'
import { BaseFunctionParslet } from './BaseFunctionParslet'
import {assertNamedKeyValueOrName} from "../assertTypes";

export class ArrowFunctionWithoutParametersParslet implements PrefixParslet {
  accepts (type: TokenType, next: TokenType): boolean {
    return type === '(' && next === ')'
  }

  getPrecedence (): Precedence {
    return Precedence.ARROW
  }

  parsePrefix (parser: ParserEngine): ArrowResult {
    parser.consume('(')
    parser.consume(')')
    if (!parser.consume('=') || !parser.consume('>')) {
      throw new Error('Unexpected empty parenthesis. Expected \'=>\' afterwards.')
    }
    const result: ArrowResult = {
      type: 'FUNCTION',
      parameters: [],
      arrow: true
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
    return type === '=' && next === '>'
  }

  getPrecedence (): Precedence {
    return Precedence.ARROW
  }

  parseInfix (parser: ParserEngine, left: NonTerminalResult): ArrowResult {
    if (parser.previousToken()?.type !== ')') {
      throw new Error('Unexpected Arrow. Expected parenthesis before.')
    }
    parser.consume('=')
    parser.consume('>')
    const result: ArrowResult = {
      type: 'FUNCTION',
      parameters: this.getParameters(left).map(assertNamedKeyValueOrName),
      arrow: true
    }
    if (!parser.consume('void')) {
      const right = parser.parseType(Precedence.ALL)
      result.returnType = right
    }
    return result
  }
}

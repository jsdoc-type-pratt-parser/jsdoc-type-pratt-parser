import { InfixParslet, PrefixParslet } from './Parslet'
import { TokenType } from '../lexer/Token'
import { Precedence } from './Precedence'
import { ParserEngine } from '../ParserEngine'
import { ArrowResult, KeyValueResult, NonTerminalResult } from '../ParseResult'

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

export class ArrowFunctionWithParametersParslet implements InfixParslet {
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
    let parameters
    if (left.type === 'PARAMETER_LIST') {
      if (left.elements.some(e => e.type !== 'KEY_VALUE')) {
        throw new Error('Arrow syntax expects all parameters to be key value pairs')
      }
      parameters = left.elements as KeyValueResult[]
    } else if (left.type === 'KEY_VALUE') {
      parameters = [left]
    } else {
      throw new Error('Arrow syntax expects all parameters to be key value pairs')
    }
    const result: ArrowResult = {
      type: 'FUNCTION',
      parameters,
      arrow: true
    }
    if (!parser.consume('void')) {
      const right = parser.parseType(Precedence.ALL)
      result.returnType = right
    }
    return result
  }
}

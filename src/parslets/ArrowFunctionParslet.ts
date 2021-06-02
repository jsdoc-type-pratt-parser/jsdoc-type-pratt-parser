import { InfixParslet } from './Parslet'
import { TokenType } from '../lexer/Token'
import { Precedence } from '../Precedence'
import { BaseFunctionParslet } from './BaseFunctionParslet'
import { assertKeyValueOrName } from '../assertTypes'
import { Parser } from '../Parser'
import { FunctionResult } from '../result/TerminalResult'
import { IntermediateResult } from '../result/IntermediateResult'

export class ArrowFunctionParslet extends BaseFunctionParslet implements InfixParslet {
  accepts (type: TokenType, next: TokenType): boolean {
    return type === '=>'
  }

  getPrecedence (): Precedence {
    return Precedence.ARROW
  }

  parseInfix (parser: Parser, left: IntermediateResult): FunctionResult {
    parser.consume('=>')

    return {
      type: 'JsdocTypeFunction',
      parameters: this.getParameters(left).map(assertKeyValueOrName),
      arrow: true,
      parenthesis: true,
      returnType: parser.parseType(Precedence.ALL)
    }
  }
}

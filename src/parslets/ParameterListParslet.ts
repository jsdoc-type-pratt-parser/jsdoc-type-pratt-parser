import {InfixParslet} from "./Parslet";
import {TokenType} from "../lexer/Token";
import {ParserEngine} from "../ParserEngine";
import {KeyValueResult, NonTerminalResult, ParseResult} from "../ParseResult";
import {Precedence} from "./Precedence";
import {assertTerminal} from "../assertTerminal";

export class ParameterListParslet implements InfixParslet {
  accepts (type: TokenType, next: TokenType): boolean {
    return type === ',';
  }

  getPrecedence (): number {
    return Precedence.PARAMETER_LIST;
  }

  parse (parser: ParserEngine, left: NonTerminalResult): NonTerminalResult {
    const elements: Array<ParseResult|KeyValueResult> = [
      left.type === 'KEY_VALUE' ? left : assertTerminal(left)
    ]
    parser.consume(',')
    do {
      const next = parser.parseNonTerminalType(Precedence.PARAMETER_LIST)
      elements.push(next.type === 'KEY_VALUE' ? next : assertTerminal(next))
    } while (parser.consume(','))
    return {
      type: 'PARAMETER_LIST',
      elements
    }
  }

}

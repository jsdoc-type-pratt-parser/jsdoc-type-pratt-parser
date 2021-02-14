import {PrefixParslet} from "./Parslet";
import {TokenType} from "../lexer/Token";
import {ParserEngine} from "../ParserEngine";
import {ParseResult, TypeOfResult} from "../ParseResult";
import {Precedence} from "./Precedence";

export class TypeOfParslet implements PrefixParslet {
  accepts (type: TokenType, next: TokenType): boolean {
    return type === 'typeof';
  }

  getPrecedence (): number {
    return 0;
  }

  parse (parser: ParserEngine): ParseResult {
    parser.consume('typeof')
    const result: TypeOfResult = {
      type: 'TYPE_OF'
    }
    const value = parser.tryParseType(Precedence.PREFIX)
    if (value) {
      result.value = value
    }
    return result
  }

}

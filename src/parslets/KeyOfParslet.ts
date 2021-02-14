import {PrefixParslet} from "./Parslet";
import {TokenType} from "../lexer/Token";
import {ParserEngine} from "../ParserEngine";
import {KeyOfResult, ParseResult, TypeOfResult} from "../ParseResult";
import {Precedence} from "./Precedence";

export class KeyOfParslet implements PrefixParslet {
  accepts (type: TokenType, next: TokenType): boolean {
    return type === 'keyof';
  }

  getPrecedence (): number {
    return Precedence.KEY_OF_TYPE_OF;
  }

  parse (parser: ParserEngine): ParseResult {
    parser.consume('keyof')
    const result: KeyOfResult = {
      type: 'KEY_OF'
    }
    const value = parser.tryParseType(Precedence.KEY_OF_TYPE_OF)
    if (value) {
      result.value = value
    }
    return result
  }

}

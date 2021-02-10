import { InfixParslet } from './Parslet';
import { Token, TokenType } from '../lexer/Token';
import { Parser } from '../Parser';
import { ParseResult } from '../ParseResult';

export class OptionalParslet implements InfixParslet {
    accepts(type: TokenType): boolean {
        return type === '=';
    }

    parse(parser: Parser, left: ParseResult, token: Token): ParseResult {
        parser.consume('=');
        left.optional = true;
        return left;
    }

}

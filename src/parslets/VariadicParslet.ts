import { PrefixParslet } from './Parslet';
import { Token, TokenType } from '../lexer/Token';
import { Parser } from '../Parser';
import { ParseResult } from '../ParseResult';

export class VariadicParslet implements PrefixParslet {
    accepts(type: TokenType): boolean {
        return type === '...';
    }

    parse(parser: Parser, token: Token): ParseResult {
        parser.consume('...');
        const value = parser.parseType();
        value.repeatable = true;
        return value;
    }

}

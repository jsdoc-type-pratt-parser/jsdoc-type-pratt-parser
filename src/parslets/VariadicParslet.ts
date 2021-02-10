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
        let shouldClose = parser.consume('[');
        const value = parser.parseType();
        if (shouldClose && !parser.consume(']')) {
            throw new Error('Unterminated variadic type. Missing \']\'');
        }
        value.repeatable = true;
        return value;
    }

}

import { PrefixParslet } from './Parslet';
import { Token, TokenType } from '../lexer/Token';
import { Parser } from '../Parser';
import { ParseResult } from '../ParseResult';
import { Precedence } from './Precedence';

export class VariadicParslet implements PrefixParslet {
    accepts(type: TokenType): boolean {
        return type === '...';
    }

    getPrecedence(): number {
        return Precedence.PREFIX;
    }

    parse(parser: Parser): ParseResult {
        parser.consume('...');
        let shouldClose = parser.consume('[');
        const value = parser.parseType(Precedence.PREFIX);
        if (shouldClose && !parser.consume(']')) {
            throw new Error('Unterminated variadic type. Missing \']\'');
        }
        value.repeatable = true;
        return value;
    }

}

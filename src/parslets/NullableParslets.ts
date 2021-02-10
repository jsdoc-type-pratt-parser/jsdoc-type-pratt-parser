import { InfixParslet, PrefixParslet } from './Parslet';
import { Token, TokenType } from '../lexer/Token';
import { Parser } from '../Parser';
import { ParseResult } from '../ParseResult';
import { Precedence } from './Precedence';

export class NullableParslet implements PrefixParslet {
    accepts(type: TokenType): boolean {
        return type === '?' || type === '!';
    }

    getPrecedence(): number {
        return Precedence.PREFIX;
    }

    parse(parser: Parser): ParseResult {
        let nullable = parser.consume('?');
        if (!nullable) {
            parser.consume('!');
        }
        const value = parser.parseType(Precedence.PREFIX);
        if (value.nullable !== undefined) {
            throw new Error('Multiple nullable modifiers on same type');
        }
        value.nullable = nullable;
        return value;
    }
}

export class PostfixNullableParslet implements InfixParslet {
    accepts(type: TokenType): boolean {
        return type === '?' || type === '!';
    }

    getPrecedence(): number {
        return Precedence.POSTFIX;
    }

    parse(parser: Parser, left: ParseResult): ParseResult {
        let nullable = parser.consume('?');
        if (!nullable) {
            parser.consume('!');
        }
        if (left.nullable !== undefined) {
            throw new Error('Multiple nullable modifiers on same type');
        }
        left.nullable = nullable;
        return left;
    }
}

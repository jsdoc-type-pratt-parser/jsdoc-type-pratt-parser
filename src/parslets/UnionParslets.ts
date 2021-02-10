import { InfixParslet, PrefixParslet } from './Parslet';
import { Parser } from '../Parser';
import { ParseResult } from '../ParseResult';
import { Token, TokenType } from '../lexer/Token';
import { Precedence } from './Precedence';

export class EnclosedUnionParslet implements PrefixParslet {
    accepts(type: TokenType): boolean {
        return type === '(';
    }

    getPrecedence(): number {
        return Precedence.PREFIX;
    }

    parse(parser: Parser, token: Token): ParseResult {
        parser.consume('(');

        const elements = [];
        do {
            elements.push(parser.parseType(Precedence.UNENCLOSED_UNION));
        } while(parser.consume('|'));

        if (!parser.consume(')')) {
            throw new Error('Union type is missing terminating \')\'');
        }
        return {
            type: 'UNION',
            elements
        };
    }
}

export class UnenclosedUnionParslet implements InfixParslet {
    accepts(type: TokenType): boolean {
        return type === '|';
    }

    getPrecedence(): number {
        return Precedence.UNENCLOSED_UNION;
    }

    parse(parser: Parser, left: ParseResult, token: Token): ParseResult {
        parser.consume('|')

        const elements = [];
        do {
            elements.push(parser.parseType(Precedence.UNENCLOSED_UNION));
        } while(parser.consume('|'));

        return {
            type: 'UNION',
            elements: [left, ...elements]
        };
    }
}

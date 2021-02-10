import { InfixParslet, PrefixParslet } from './Parslet';
import { Parser } from '../Parser';
import { ParseResult } from '../ParseResult';
import { Token, TokenType } from '../lexer/Token';

export class UnionParslet implements PrefixParslet {
    accepts(type: TokenType): boolean {
        return type === '(';
    }

    parse(parser: Parser, token: Token): ParseResult {
        parser.consume('(');

        const elements = parser.parseTypeList('|');

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

    parse(parser: Parser, left: ParseResult, token: Token): ParseResult {
        parser.consume('|')

        const elements = parser.parseTypeList('|');

        return {
            type: 'UNION',
            elements: [left, ...elements]
        };
    }
}

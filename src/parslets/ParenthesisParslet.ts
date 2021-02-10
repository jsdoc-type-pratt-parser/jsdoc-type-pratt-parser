import { PrefixParslet } from './Parslet';
import { Token, TokenType } from '../lexer/Token';
import { Parser } from '../Parser';
import { ParseResult } from '../ParseResult';

// NOT IN USE
export class ParenthesisParslet implements PrefixParslet {
    accepts(type: TokenType): boolean {
        return type === '(';
    }

    parse(parser: Parser, token: Token): ParseResult {
        parser.consume('(');
        const value = parser.parseType();
        if (!parser.consume(')')) {
            throw new Error('Unterminated Parenthesis. Missing ).');
        }
        return {
            type: 'PARENTHESIS',
            value
        };
    }

}

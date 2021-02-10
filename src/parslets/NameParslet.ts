import { Parser } from '../Parser';
import { Token, TokenType } from '../lexer/Token';
import { ParseResult } from '../ParseResult';
import { PrefixParslet } from './Parslet';
import { Precedence } from './Precedence';

export class NameParslet implements PrefixParslet {
    accepts(type: TokenType): boolean {
        return type === 'Identifier';
    }

    getPrecedence(): number {
        return Precedence.PREFIX;
    }

    parse(parser: Parser): ParseResult {
        const token = parser.getToken();
        parser.consume('Identifier');
        return {
            type: 'NAME',
            name: token.text
        };
    }
}

import { PrefixParslet } from './Parslet';
import { Token, TokenType } from '../lexer/Token';
import { Parser } from '../Parser';
import { ParseResult } from '../ParseResult';

export class StringValueParslet implements PrefixParslet {
    accepts(type: TokenType): boolean {
        return type === 'StringValue';
    }

    parse(parser: Parser, token: Token): ParseResult {
        parser.consume('StringValue');
        return {
            type: 'STRING_VALUE',
            value: token.text.slice(1, -1)
        };
    }

}

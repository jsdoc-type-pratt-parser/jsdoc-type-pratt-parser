import { Parser } from '../Parser';
import { Token, TokenType } from '../lexer/Token';
import { ParseResult } from '../ParseResult';
import { PrefixParslet } from './Parslet';

export class NameParslet implements PrefixParslet {
    parse(parser: Parser, token: Token): ParseResult {
        if (!parser.consume('Identifier')) {
            parser.consume('Module');
        }
        return {
            type: 'NAME',
            name: token.text
        };
    }

    accepts(type: TokenType): boolean {
        return type === 'Identifier' || type === 'Module';
    }
}

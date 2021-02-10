import { PrefixParslet } from './Parslet';
import { Token, TokenType } from '../lexer/Token';
import { Parser } from '../Parser';
import { ParseResult } from '../ParseResult';

export class SpecialTypesParslet implements PrefixParslet {
    accepts(type: TokenType): boolean {
        return type === 'null' || type === 'undefined' || type === '*' || type === 'Unknown';
    }

    parse(parser: Parser, token: Token): ParseResult {
        switch (token.type) {
            case 'null':
                parser.consume('null');
                return {
                    type: 'NULL'
                }
            case 'undefined':
                parser.consume('undefined');
                return {
                    type: 'UNDEFINED'
                }
            case '*':
                parser.consume('*');
                return {
                    type: 'ALL'
                }
            case 'Unknown':
                parser.consume('Unknown');
                return {
                    type: 'UNKNOWN'
                }
            default:
                throw new Error('Unacceptable token: ' + token.text);
        }
    }

}

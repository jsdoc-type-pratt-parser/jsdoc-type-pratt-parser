import { Parser } from '../Parser';
import { ParseResult } from '../ParseResult';
import { Token, TokenType } from '../lexer/Token';
import { Parslet } from './Parslet';

export class GenericParslet implements Parslet {
    parse(parser: Parser, left: ParseResult, token: Token): ParseResult {
        parser.consume('.');
        if(!parser.consume('<')) {
            throw new Error('After \'.\' must follow a \'<\'');
        }
        const objects = parser.parseTypeList(',');
        if (!parser.consume('>')) {
            throw new Error('Unterminated generic parameter list');
        }

        return {
            type: 'GENERIC',
            subject: left,
            objects
        }
    }

    accepts(type: TokenType): boolean {
        return type === '<' || type === '.';
    }
}

import { PrefixParslet } from './Parslet';
import { Token, TokenType } from '../lexer/Token';
import { Parser } from '../Parser';
import { ParseResult, RecordResult } from '../ParseResult';
import { Precedence } from './Precedence';

export class RecordParslet implements PrefixParslet {
    accepts(type: TokenType): boolean {
        return type === '{';
    }

    getPrecedence(): number {
        return Precedence.PREFIX;
    }

    parse(parser: Parser, token: Token): ParseResult {
        parser.consume('{');
        const result: RecordResult = {
            type: 'RECORD',
            fields: []
        }

        if (!parser.consume('}')) {
            do {
                const key = parser.parseType();
                if (key.type !== 'NAME') {
                    throw new Error('key of a record field must be a name expression');
                }
                // TODO: what about dots and special chars?
                let value;
                if (parser.consume(':')) {
                    value = parser.parseType();
                }

                result.fields.push({
                    type: 'FIELD',
                    key,
                    value
                });
            } while (parser.consume(','));
            if (!parser.consume('}')) {
                throw new Error('Unterminated record type. Missing \'}\'');
            }
        }
        return result;
    }
}

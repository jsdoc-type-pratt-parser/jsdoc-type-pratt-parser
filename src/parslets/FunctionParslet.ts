import { PrefixParslet } from './Parslet';
import { Token, TokenType } from '../lexer/Token';
import { Parser } from '../Parser';
import { FunctionResult, ParseResult } from '../ParseResult';

export class FunctionParslet implements PrefixParslet {
    accepts(type: TokenType): boolean {
        return type === 'function';
    }

    parse(parser: Parser, token: Token): ParseResult {
        parser.consume('function');

        if (!parser.consume('(')) {
            throw new Error('function is missing parameter list');
        }
        const result: FunctionResult = {
            type: 'FUNCTION',
            parameters: []
        };

        if (!parser.consume(')')) {
            let continueList = true;

            if (continueList && parser.consume('new')) {
                if (!parser.consume(':')) {
                    throw new Error('new keyword must be followed by \':\'');
                }
                result.newType = parser.parseType();
                continueList = parser.consume(',');
            }

            if (continueList && parser.consume('this')) {
                if (!parser.consume(':')) {
                    throw new Error('this keyword must be followed by \':\'');
                }
                result.thisType = parser.parseType();
                continueList = parser.consume(',');
            }

            if (continueList) {
                result.parameters = parser.parseTypeList(',');
            }

            if (!parser.consume(')')) {
                throw new Error('function parameter list is not terminated');
            }
        }

        if (parser.consume(':')) {
            result.returnType = parser.parseType();
        }
        return result;
    }

}

import { Token, TokenType } from '../lexer/Token';
import { Parser } from '../Parser';
import { ParseResult } from '../ParseResult';

export interface Parslet {
    accepts(type: TokenType): boolean;
}

export interface PrefixParslet extends Parslet {
    parse(parser: Parser, token: Token): ParseResult;
}

export interface InfixParslet extends Parslet {
    parse(parser: Parser, left: ParseResult, token: Token): ParseResult;
}

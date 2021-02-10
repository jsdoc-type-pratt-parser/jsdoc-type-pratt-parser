import { Token, TokenType } from '../lexer/Token';
import { Parser } from '../Parser';
import { ParseResult } from '../ParseResult';

export interface Parslet {
    accepts(type: TokenType, next: TokenType): boolean;
    getPrecedence(): number;
}

export interface PrefixParslet extends Parslet {
    parse(parser: Parser): ParseResult;
}

export interface InfixParslet extends Parslet {
    parse(parser: Parser, left: ParseResult): ParseResult;
}

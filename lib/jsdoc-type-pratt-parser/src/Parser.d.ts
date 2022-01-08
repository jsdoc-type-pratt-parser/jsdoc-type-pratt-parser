import { Token, TokenType } from './lexer/Token';
import { Lexer } from './lexer/Lexer';
import { Grammar } from './grammars/Grammar';
import { Precedence } from './Precedence';
import { TerminalResult } from './result/TerminalResult';
import { IntermediateResult } from './result/IntermediateResult';
interface ParserOptions {
    grammar: Grammar;
    lexer?: Lexer;
    parent?: Parser;
}
export declare class Parser {
    private readonly grammar;
    private readonly lexer;
    private readonly parent?;
    constructor({ grammar, lexer, parent }: ParserOptions);
    parseText(text: string): TerminalResult;
    parseType(precedence: Precedence): TerminalResult;
    private tryParslets;
    parseIntermediateType(precedence: Precedence): IntermediateResult;
    parseInfixIntermediateType(result: IntermediateResult, precedence: Precedence): IntermediateResult;
    consume(types: TokenType | TokenType[]): boolean;
    getToken(): Token;
    peekToken(): Token;
    previousToken(): Token | undefined;
    getLexer(): Lexer;
    getParent(): Parser | undefined;
}
export {};

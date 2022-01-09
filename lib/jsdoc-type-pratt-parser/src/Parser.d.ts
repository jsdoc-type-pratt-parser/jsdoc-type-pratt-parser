import { Token, TokenType } from './lexer/Token';
import { Lexer } from './lexer/Lexer';
import { Grammar } from './grammars/Grammar';
import { Precedence } from './Precedence';
import { RootResult } from './result/RootResult';
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
    parseText(text: string): RootResult;
    parseType(precedence: Precedence): RootResult;
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

import { PrefixParslet } from './Parslet';
import { TokenType } from '../lexer/Token';
import { Parser } from '../Parser';
import { Precedence } from '../Precedence';
import { TerminalResult } from '../result/TerminalResult';
import { Grammar } from '../grammars/Grammar';
interface ObjectParsletOptions {
    objectFieldGrammar: Grammar;
    allowKeyTypes: boolean;
}
export declare class ObjectParslet implements PrefixParslet {
    private readonly objectFieldGrammar;
    private readonly allowKeyTypes;
    constructor({ objectFieldGrammar, allowKeyTypes }: ObjectParsletOptions);
    accepts(type: TokenType): boolean;
    getPrecedence(): Precedence;
    parsePrefix(parser: Parser): TerminalResult;
}
export {};

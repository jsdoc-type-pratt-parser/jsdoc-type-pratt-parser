import type { Token } from './Token.js';
/**
 * Gets the next literal (non-interpolation) portion of a text
 */
export declare function getTemplateLiteralLiteral(text: string): string | null;
export declare class Lexer {
    private readonly text;
    readonly current: Token;
    readonly next: Token;
    readonly previous: Token | undefined;
    static create(text: string): Lexer;
    private constructor();
    private static read;
    remaining(): string;
    advance(): Lexer;
}

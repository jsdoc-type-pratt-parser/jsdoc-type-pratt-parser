import { type TokenType } from '../lexer/Token.js';
import { type ParsletFunction } from './Parslet.js';
export declare function createNameParslet({ allowedAdditionalTokens, allowReservedWords, module, strictMode, asyncFunctionBody }: {
    allowReservedWords: boolean;
    allowedAdditionalTokens: TokenType[];
    module: boolean;
    strictMode: boolean;
    asyncFunctionBody: boolean;
}): ParsletFunction;

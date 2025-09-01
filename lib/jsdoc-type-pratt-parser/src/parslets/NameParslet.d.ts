import type { TokenType } from '../lexer/Token';
import { type ParsletFunction } from './Parslet';
export declare function createNameParslet({ allowedAdditionalTokens }: {
    allowedAdditionalTokens: TokenType[];
}): ParsletFunction;

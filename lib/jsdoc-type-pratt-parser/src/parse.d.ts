import type { RootResult } from './result/RootResult.js';
export type ParseMode = 'closure' | 'jsdoc' | 'typescript';
/**
 * This function parses the given expression in the given mode and produces a {@link RootResult}.
 * @param expression
 * @param mode
 */
export declare function parse(expression: string, mode: ParseMode, { module, strictMode, asyncFunctionBody, computedPropertyParser }?: {
    module?: boolean;
    strictMode?: boolean;
    asyncFunctionBody?: boolean;
    computedPropertyParser?: (text: string, options?: any) => unknown;
}): RootResult;
/**
 * This function tries to parse the given expression in multiple modes and returns the first successful
 * {@link RootResult}. By default it tries `'typescript'`, `'closure'` and `'jsdoc'` in this order. If
 * no mode was successful it throws the error that was produced by the last parsing attempt.
 * @param expression
 * @param modes
 */
export declare function tryParse(expression: string, modes?: ParseMode[], { module, strictMode, asyncFunctionBody }?: {
    module?: boolean;
    strictMode?: boolean;
    asyncFunctionBody?: boolean;
}): RootResult;
/**
 * This function parses the given expression in the given mode and produces a name path.
 * @param expression
 * @param mode
 */
export declare function parseNamePath(expression: string, mode: ParseMode): RootResult;
/**
 * This function parses the given expression in the given mode and produces a name.
 * @param expression
 * @param mode
 */
export declare function parseName(expression: string, mode: ParseMode): RootResult;

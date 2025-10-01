import type { Grammar } from './Grammar.js';
export declare const createPathGrammars: ({ module, strictMode, asyncFunctionBody }: {
    module: boolean;
    strictMode: boolean;
    asyncFunctionBody: boolean;
}) => {
    basePathGrammar: Grammar;
    pathGrammar: Grammar;
};

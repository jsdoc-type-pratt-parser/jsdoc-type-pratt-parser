import type { Grammar } from './Grammar.js';
export declare const createJsdocGrammars: ({ module, strictMode, asyncFunctionBody, }: {
    module: boolean;
    strictMode: boolean;
    asyncFunctionBody: boolean;
}) => {
    jsdocNameGrammar: Grammar;
    jsdocNamePathGrammar: Grammar;
    jsdocGrammar: Grammar;
};

import type { Grammar } from './Grammar.js';
export declare const createClosureGrammars: ({ module, strictMode, asyncFunctionBody, }: {
    module: boolean;
    strictMode: boolean;
    asyncFunctionBody: boolean;
}) => {
    closureNameGrammar: Grammar;
    closureNamePathGrammar: Grammar;
    closureGrammar: Grammar;
};

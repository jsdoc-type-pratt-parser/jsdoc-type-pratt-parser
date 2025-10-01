import type { Grammar } from './Grammar.js';
export declare const createTypescriptGrammars: ({ module, strictMode, asyncFunctionBody, }: {
    module: boolean;
    strictMode: boolean;
    asyncFunctionBody: boolean;
}) => {
    typescriptNameGrammar: Grammar;
    typescriptNamePathGrammar: Grammar;
    typescriptGrammar: Grammar;
};

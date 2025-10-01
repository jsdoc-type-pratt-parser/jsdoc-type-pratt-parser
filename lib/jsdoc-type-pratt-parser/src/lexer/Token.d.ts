export type TokenType = '(' | ')' | '[' | ']' | '{' | '}' | '|' | '&' | '<' | '>' | ';' | ',' | '*' | '?' | '!' | '=' | ':' | '.' | '@' | '#' | '~' | '/' | '=>' | '...' | 'null' | 'undefined' | 'function' | 'this' | 'new' | 'module' | 'event' | 'extends' | 'external' | 'typeof' | 'keyof' | 'readonly' | 'import' | 'infer' | 'is' | 'in' | 'asserts' | 'Identifier' | 'StringValue' | 'TemplateLiteral' | 'Number' | 'EOF';
export interface Token {
    type: TokenType;
    text: string;
    startOfLine: boolean;
}
export declare const reservedWordsAsTypes: string[];
export declare const reservedWords: {
    always: string[];
    strictMode: string[];
    moduleOrAsyncFunctionBodies: string[];
};
export declare const futureReservedWords: {
    always: string[];
    strictMode: string[];
};
export declare const strictModeNonIdentifiers: string[];

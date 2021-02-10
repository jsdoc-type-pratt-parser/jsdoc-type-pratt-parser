export type TokenType =
    '(' |
    ')' |
    '{' |
    '}' |
    '|' |
    '<' |
    '>' |
    ',' |
    '*' |
    '?' |
    '!' |
    '=' |
    ':' |
    '.' |
    '...' |
    'null' |
    'undefined' |
    'function' |
    'this' |
    'new' |
    'Start' |
    'Module' |
    'Identifier' |
    'StringValue';

export type Token = {
    type: TokenType;
    text: string;
};

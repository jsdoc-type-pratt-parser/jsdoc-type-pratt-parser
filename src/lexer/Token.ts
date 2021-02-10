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
    'StringValue' |
    'Unknown';

export type Token = {
    type: TokenType;
    text: string;
};

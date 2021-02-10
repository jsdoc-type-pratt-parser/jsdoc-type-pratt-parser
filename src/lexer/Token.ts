export type TokenType =
    '(' |
    ')' |
    '[' |
    ']' |
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
    'Number' |
    'EOF';

export type Token = {
    type: TokenType;
    text: string;
};

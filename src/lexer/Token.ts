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
    '@' |
    '#' |
    '~' |
    '/' |
    '...' |
    'null' |
    'undefined' |
    'function' |
    'this' |
    'new' |
    'module' |
    'Start' |
    'Identifier' |
    'StringValue' |
    'Number' |
    'EOF'

export interface Token {
  type: TokenType
  text: string
}

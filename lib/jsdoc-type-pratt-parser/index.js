(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.jtpp = {}));
}(this, (function (exports) { 'use strict';

    function makePunctuationRule(type) {
        return text => {
            if (text.startsWith(type)) {
                return { type, text: type };
            }
            else {
                return null;
            }
        };
    }
    function getQuoted(text) {
        let position = 0;
        let char;
        const mark = text[0];
        let escaped = false;
        if (mark !== '\'' && mark !== '"') {
            return null;
        }
        while (position < text.length) {
            position++;
            char = text[position];
            if (!escaped && char === mark) {
                position++;
                break;
            }
            escaped = !escaped && char === '\\';
        }
        if (char !== mark) {
            throw new Error('Unterminated String');
        }
        return text.slice(0, position);
    }
    const identifierStartRegex = /[a-zA-Z]/;
    const identifierContinueRegex = /[a-zA-Z_\-0-9]/;
    function getIdentifier(text) {
        let char = text[0];
        if (!identifierStartRegex.test(char)) {
            return null;
        }
        let position = 1;
        do {
            char = text[position];
            if (!identifierContinueRegex.test(char)) {
                break;
            }
            position++;
        } while (position < text.length);
        if (position === 0) {
            return null;
        }
        return text.slice(0, position);
    }
    const numberRegex = /[0-9]/;
    function getNumber(text) {
        let position = 0;
        let char;
        do {
            char = text[position];
            if (!numberRegex.test(char)) {
                break;
            }
            position++;
        } while (position < text.length);
        if (position === 0) {
            return null;
        }
        return text.slice(0, position);
    }
    const identifierRule = text => {
        const value = getIdentifier(text);
        if (value == null) {
            return null;
        }
        return {
            type: 'Identifier',
            text: value
        };
    };
    function makeKeyWordRule(type) {
        return text => {
            if (!text.startsWith(type)) {
                return null;
            }
            const prepends = text[type.length];
            if (prepends !== undefined && identifierContinueRegex.test(prepends)) {
                return null;
            }
            return {
                type: type,
                text: type
            };
        };
    }
    const stringValueRule = text => {
        const value = getQuoted(text);
        if (value == null) {
            return null;
        }
        return {
            type: 'StringValue',
            text: value
        };
    };
    const eofRule = text => {
        if (text.length > 0) {
            return null;
        }
        return {
            type: 'EOF',
            text: ''
        };
    };
    const numberRule = text => {
        const value = getNumber(text);
        if (value === null) {
            return null;
        }
        return {
            type: 'Number',
            text: value
        };
    };
    const rules = [
        eofRule,
        makePunctuationRule('('),
        makePunctuationRule(')'),
        makePunctuationRule('{'),
        makePunctuationRule('}'),
        makePunctuationRule('['),
        makePunctuationRule(']'),
        makePunctuationRule('|'),
        makePunctuationRule('<'),
        makePunctuationRule('>'),
        makePunctuationRule(','),
        makePunctuationRule('*'),
        makePunctuationRule('?'),
        makePunctuationRule('!'),
        makePunctuationRule('='),
        makePunctuationRule(':'),
        makePunctuationRule('...'),
        makePunctuationRule('.'),
        makePunctuationRule('#'),
        makePunctuationRule('~'),
        makePunctuationRule('/'),
        makePunctuationRule('@'),
        makeKeyWordRule('undefined'),
        makeKeyWordRule('null'),
        makeKeyWordRule('void'),
        makeKeyWordRule('function'),
        makeKeyWordRule('this'),
        makeKeyWordRule('new'),
        makeKeyWordRule('module'),
        makeKeyWordRule('typeof'),
        makeKeyWordRule('keyof'),
        makeKeyWordRule('import'),
        identifierRule,
        stringValueRule,
        numberRule
    ];
    class Lexer {
        constructor() {
            this.text = '';
        }
        lex(text) {
            this.text = text;
            this.current = undefined;
            this.next = undefined;
            this.advance();
        }
        token() {
            if (this.current === undefined) {
                throw new Error('Lexer not lexing');
            }
            return this.current;
        }
        peek() {
            if (this.next === undefined) {
                this.next = this.read();
            }
            return this.next;
        }
        last() {
            return this.previous;
        }
        advance() {
            this.previous = this.current;
            if (this.next !== undefined) {
                this.current = this.next;
                this.next = undefined;
                return;
            }
            this.current = this.read();
        }
        read() {
            for (const rule of rules) {
                const token = rule(this.text);
                if (token !== null) {
                    this.text = this.text.slice(token.text.length).trim();
                    return token;
                }
            }
            throw new Error('Unexpected Token');
        }
    }

    class NonTerminalResultError extends Error {
        constructor(result) {
            super(`Parse ended with non terminal result: '${result.type}'`);
            Object.setPrototypeOf(this, NonTerminalResultError.prototype);
        }
    }
    function assertTerminal(result) {
        if (result.type === 'KEY_VALUE' || result.type === 'NUMBER' || result.type === 'PARAMETER_LIST') {
            throw new NonTerminalResultError(result);
        }
        return result;
    }

    // higher precedence = higher importance
    var Precedence;
    (function (Precedence) {
        Precedence[Precedence["ALL"] = 0] = "ALL";
        Precedence[Precedence["PARAMETER_LIST"] = 1] = "PARAMETER_LIST";
        Precedence[Precedence["PARENTHESIS"] = 2] = "PARENTHESIS";
        Precedence[Precedence["UNION"] = 3] = "UNION";
        Precedence[Precedence["PREFIX"] = 4] = "PREFIX";
        Precedence[Precedence["POSTFIX"] = 5] = "POSTFIX";
        Precedence[Precedence["RECORD"] = 6] = "RECORD";
        Precedence[Precedence["SYMBOL"] = 7] = "SYMBOL";
        Precedence[Precedence["OPTIONAL"] = 8] = "OPTIONAL";
        Precedence[Precedence["NULLABLE"] = 9] = "NULLABLE";
        Precedence[Precedence["ARROW"] = 10] = "ARROW";
        Precedence[Precedence["KEY_VALUE"] = 11] = "KEY_VALUE";
        Precedence[Precedence["GENERIC"] = 12] = "GENERIC";
        Precedence[Precedence["PROPERTY_PATH"] = 13] = "PROPERTY_PATH";
        Precedence[Precedence["KEY_OF_TYPE_OF"] = 14] = "KEY_OF_TYPE_OF";
        Precedence[Precedence["ARRAY_BRACKETS"] = 15] = "ARRAY_BRACKETS";
        Precedence[Precedence["SPECIAL_TYPES"] = 16] = "SPECIAL_TYPES";
    })(Precedence || (Precedence = {}));

    class NoParsletFoundError extends Error {
        constructor(token) {
            super(`No parslet found for token: '${token.type}' with value '${token.text}'`);
            Object.setPrototypeOf(this, NoParsletFoundError.prototype);
        }
    }
    class ParserEngine {
        constructor(grammar) {
            this.lexer = new Lexer();
            const { prefixParslets, infixParslets } = grammar();
            this.prefixParslets = prefixParslets;
            this.infixParslets = infixParslets;
        }
        parseText(text) {
            this.lexer.lex(text);
            const result = this.parseType(Precedence.ALL);
            if (!this.consume('EOF')) {
                throw new Error(`Unexpected early end of parse. Next token: '${this.getToken().text}'`);
            }
            return result;
        }
        getPrefixParslet() {
            return this.prefixParslets.find(p => p.accepts(this.getToken().type, this.peekToken().type));
        }
        getInfixParslet(precedence) {
            return this.infixParslets.find(p => {
                return p.getPrecedence() > precedence && p.accepts(this.getToken().type, this.peekToken().type);
            });
        }
        tryParseType(precedence) {
            try {
                return this.parseType(precedence);
            }
            catch (e) {
                if (e instanceof NoParsletFoundError) {
                    return undefined;
                }
                else {
                    throw e;
                }
            }
        }
        parseType(precedence) {
            return assertTerminal(this.parseNonTerminalType(precedence));
        }
        parseNonTerminalType(precedence) {
            const pParslet = this.getPrefixParslet();
            if (pParslet === undefined) {
                throw new NoParsletFoundError(this.getToken());
            }
            let result = pParslet.parsePrefix(this);
            let iParslet = this.getInfixParslet(precedence);
            while (iParslet !== undefined) {
                result = iParslet.parseInfix(this, result);
                iParslet = this.getInfixParslet(precedence);
            }
            return result;
        }
        consume(type) {
            if (this.lexer.token().type !== type) {
                return false;
            }
            this.lexer.advance();
            return true;
        }
        getToken() {
            return this.lexer.token();
        }
        peekToken() {
            return this.lexer.peek();
        }
        previousToken() {
            return this.lexer.last();
        }
    }

    class UnenclosedUnionParslet {
        accepts(type) {
            return type === '|';
        }
        getPrecedence() {
            return Precedence.UNION;
        }
        parseInfix(parser, left) {
            parser.consume('|');
            const elements = [];
            do {
                elements.push(parser.parseType(Precedence.UNION));
            } while (parser.consume('|'));
            return {
                type: 'UNION',
                elements: [assertTerminal(left), ...elements]
            };
        }
    }

    const reservedWords = [
        'null',
        'true',
        'false',
        'break',
        'case',
        'catch',
        'class',
        'const',
        'continue',
        'debugger',
        'default',
        'delete',
        'do',
        'else',
        'export',
        'extends',
        'finally',
        'for',
        'function',
        'if',
        'import',
        'in',
        'instanceof',
        'new',
        'return',
        'super',
        'switch',
        'this',
        'throw',
        'try',
        'typeof',
        'var',
        'void',
        'while',
        'with',
        'yield'
    ];
    class NameParslet {
        accepts(type, next) {
            return type === 'Identifier' || type === 'this' || type === 'new';
        }
        getPrecedence() {
            return Precedence.PREFIX;
        }
        parsePrefix(parser) {
            const token = parser.getToken();
            parser.consume('Identifier') || parser.consume('this') || parser.consume('new');
            const result = {
                type: 'NAME',
                name: token.text
            };
            if (reservedWords.includes(token.text)) {
                result.reservedWord = true;
            }
            return result;
        }
    }

    function isQuestionMarkUnknownType(next) {
        return next === 'EOF' || next === '|' || next === ',' || next === ')' || next === '>';
    }

    class SpecialTypesParslet {
        accepts(type, next) {
            return (type === '?' && isQuestionMarkUnknownType(next)) || type === 'null' || type === 'undefined' || type === '*';
        }
        getPrecedence() {
            return Precedence.SPECIAL_TYPES;
        }
        parsePrefix(parser) {
            switch (parser.getToken().type) {
                case 'null':
                    parser.consume('null');
                    return {
                        type: 'NULL'
                    };
                case 'undefined':
                    parser.consume('undefined');
                    return {
                        type: 'UNDEFINED'
                    };
                case '*':
                    parser.consume('*');
                    return {
                        type: 'ALL'
                    };
                case '?':
                    parser.consume('?');
                    return {
                        type: 'UNKNOWN'
                    };
                default:
                    throw new Error('Unacceptable token: ' + parser.getToken().text);
            }
        }
    }

    class VariadicParslet {
        accepts(type) {
            return type === '...';
        }
        getPrecedence() {
            return Precedence.PREFIX;
        }
        parsePrefix(parser) {
            parser.consume('...');
            const shouldClose = parser.consume('[');
            const value = parser.parseType(Precedence.PREFIX);
            if (shouldClose && !parser.consume(']')) {
                throw new Error('Unterminated variadic type. Missing \']\'');
            }
            value.repeatable = true;
            return value;
        }
        parseInfix(parser, left) {
            parser.consume('...');
            const result = assertTerminal(left);
            result.repeatable = true;
            return result;
        }
    }

    class RecordParslet {
        accepts(type) {
            return type === '{';
        }
        getPrecedence() {
            return Precedence.RECORD;
        }
        parsePrefix(parser) {
            parser.consume('{');
            const result = {
                type: 'RECORD',
                fields: []
            };
            if (!parser.consume('}')) {
                do {
                    const field = parser.parseNonTerminalType(Precedence.RECORD);
                    if (field.type !== 'NAME' && field.type !== 'NUMBER' && field.type !== 'KEY_VALUE') {
                        throw new Error('records may only contain \'NAME\', \'NUMBER\' or \'KEY_VALUE\' fields.');
                    }
                    result.fields.push(field);
                } while (parser.consume(','));
                if (!parser.consume('}')) {
                    throw new Error('Unterminated record type. Missing \'}\'');
                }
            }
            return result;
        }
    }

    class ModuleParslet {
        accepts(type, next) {
            return type === 'module';
        }
        getPrecedence() {
            return Precedence.PREFIX;
        }
        parsePrefix(parser) {
            parser.consume('module');
            if (!parser.consume(':')) {
                throw new Error('module needs to have a \':\' afterwards.');
            }
            let result = 'module:';
            const allowed = ['Identifier', '~', '@', '/', '#'];
            let token = parser.getToken();
            while (allowed.includes(token.type)) {
                result += token.text;
                parser.consume(token.type);
                token = parser.getToken();
            }
            return {
                type: 'MODULE',
                path: result
            };
        }
    }

    class GenericParslet {
        accepts(type, next) {
            return type === '<' || (type === '.' && next === '<');
        }
        getPrecedence() {
            return Precedence.GENERIC;
        }
        parseInfix(parser, left) {
            parser.consume('.');
            parser.consume('<');
            const objects = [];
            do {
                objects.push(parser.parseType(Precedence.PARAMETER_LIST));
            } while (parser.consume(','));
            if (!parser.consume('>')) {
                throw new Error('Unterminated generic parameter list');
            }
            return {
                type: 'GENERIC',
                subject: assertTerminal(left),
                objects
            };
        }
    }

    class OptionalParslet {
        accepts(type, next) {
            return type === '=' && next !== '>';
        }
        getPrecedence() {
            return Precedence.OPTIONAL;
        }
        parseInfix(parser, left) {
            parser.consume('=');
            const result = assertTerminal(left);
            result.optional = true;
            return result;
        }
    }

    class PropertyPathParslet {
        accepts(type, next) {
            return type === '.' && next !== '<';
        }
        getPrecedence() {
            return Precedence.PROPERTY_PATH;
        }
        parseInfix(parser, left) {
            parser.consume('.');
            const path = [];
            const allowed = ['Identifier', 'Number', 'StringValue'];
            let next;
            do {
                const token = parser.getToken();
                if (!allowed.includes(token.type)) {
                    throw new Error(`The token type '${token.type}' is not allowed in a property path.`);
                }
                path.push(token.text);
                parser.consume(token.type);
                next = parser.peekToken();
            } while (next.type !== '<' && parser.consume('.'));
            return {
                type: 'PROPERTY_PATH',
                left: assertTerminal(left),
                path
            };
        }
    }

    class ParenthesisParslet {
        accepts(type, next) {
            return type === '(' && next !== ')';
        }
        getPrecedence() {
            return Precedence.PARENTHESIS;
        }
        parsePrefix(parser) {
            parser.consume('(');
            const result = parser.parseNonTerminalType(Precedence.ALL);
            if (!parser.consume(')')) {
                throw new Error('Unterminated parenthesis');
            }
            return result;
        }
    }

    class KeyValueParslet {
        accepts(type, next) {
            return type === ':';
        }
        getPrecedence() {
            return Precedence.KEY_VALUE;
        }
        parseInfix(parser, left) {
            parser.consume(':');
            const value = parser.parseType(Precedence.KEY_VALUE);
            return {
                type: 'KEY_VALUE',
                key: left.type === 'NUMBER' ? left : assertTerminal(left),
                value: value
            };
        }
    }

    class NumberParslet {
        accepts(type, next) {
            return type === 'Number';
        }
        getPrecedence() {
            return Precedence.PREFIX;
        }
        parsePrefix(parser) {
            const token = parser.getToken();
            parser.consume('Number');
            return {
                type: 'NUMBER',
                value: parseInt(token.text, 10)
            };
        }
    }

    class ParameterListParslet {
        accepts(type, next) {
            return type === ',';
        }
        getPrecedence() {
            return Precedence.PARAMETER_LIST;
        }
        parseInfix(parser, left) {
            const elements = [
                left.type === 'KEY_VALUE' ? left : assertTerminal(left)
            ];
            parser.consume(',');
            do {
                const next = parser.parseNonTerminalType(Precedence.PARAMETER_LIST);
                elements.push(next.type === 'KEY_VALUE' ? next : assertTerminal(next));
            } while (parser.consume(','));
            return {
                type: 'PARAMETER_LIST',
                elements
            };
        }
    }

    class NullablePrefixParslet {
        accepts(type, next) {
            return (type === '?' && !isQuestionMarkUnknownType(next)) || type === '!';
        }
        getPrecedence() {
            return Precedence.NULLABLE;
        }
        parsePrefix(parser) {
            const nullable = parser.consume('?') || !parser.consume('!');
            const value = parser.parseType(Precedence.NULLABLE);
            if (value.nullable !== undefined) {
                throw new Error('Multiple nullable modifiers on same type');
            }
            value.nullable = nullable;
            return value;
        }
    }
    class NullableInfixParslet {
        accepts(type, next) {
            return type === '?' || type === '!';
        }
        getPrecedence() {
            return Precedence.NULLABLE;
        }
        parseInfix(parser, left) {
            const nullable = parser.consume('?') || !parser.consume('!');
            const value = assertTerminal(left);
            if (value.nullable !== undefined) {
                throw new Error('Multiple nullable modifiers on same type');
            }
            value.nullable = nullable;
            return value;
        }
    }

    const baseGrammar = () => {
        return {
            prefixParslets: [
                new NameParslet(),
                new SpecialTypesParslet(),
                new NullablePrefixParslet(),
                new VariadicParslet(),
                new RecordParslet(),
                new ModuleParslet(),
                new NumberParslet(),
                new ParenthesisParslet()
            ],
            infixParslets: [
                new ParameterListParslet(),
                new PropertyPathParslet(),
                new KeyValueParslet(),
                new GenericParslet(),
                new UnenclosedUnionParslet(),
                new OptionalParslet(),
                new NullableInfixParslet(),
                new PropertyPathParslet()
            ]
        };
    };

    class FunctionParslet {
        constructor({ allowWithoutParenthesis }) {
            this.allowWithoutParenthesis = allowWithoutParenthesis;
        }
        accepts(type) {
            return type === 'function';
        }
        getPrecedence() {
            return Precedence.PARENTHESIS;
        }
        parsePrefix(parser) {
            parser.consume('function');
            const withoutParenthesis = !parser.consume('(');
            if (!this.allowWithoutParenthesis && withoutParenthesis) {
                throw new Error('function is missing parameter list');
            }
            const result = {
                type: 'FUNCTION',
                parameters: []
            };
            if (!withoutParenthesis) {
                if (!parser.consume(')')) {
                    const value = parser.parseNonTerminalType(Precedence.ALL);
                    if (value.type === 'PARAMETER_LIST') {
                        result.parameters = value.elements;
                    }
                    else {
                        result.parameters = [value.type === 'KEY_VALUE' ? value : assertTerminal(value)];
                    }
                    if (!parser.consume(')')) {
                        throw new Error('function parameter list is not terminated');
                    }
                }
                if (parser.consume(':') && !parser.consume('void')) {
                    result.returnType = parser.parseType(Precedence.PREFIX);
                }
            }
            return result;
        }
    }

    const closureGrammar = () => {
        const { prefixParslets, infixParslets } = baseGrammar();
        return {
            prefixParslets: [
                ...prefixParslets,
                new FunctionParslet({
                    allowWithoutParenthesis: false
                })
            ],
            infixParslets
        };
    };

    class SymbolParslet {
        accepts(type) {
            return type === '(';
        }
        getPrecedence() {
            return Precedence.SYMBOL;
        }
        parseInfix(parser, left) {
            if (left.type !== 'NAME') {
                throw new Error('Symbol expects a name on the left side. (Reacting on \'(\')');
            }
            parser.consume('(');
            const result = {
                type: 'SYMBOL',
                name: left.name
            };
            if (!parser.consume(')')) {
                const next = parser.parseNonTerminalType(Precedence.SYMBOL);
                if (next.type !== 'NUMBER' && next.type !== 'NAME') {
                    throw new Error('Symbol value must be a number or a name');
                }
                result.value = next;
                if (!parser.consume(')')) {
                    throw new Error('Symbol does not end after value');
                }
            }
            return result;
        }
    }

    class ClassPathParslet {
        accepts(type, next) {
            return type === '#' || type === '~';
        }
        getPrecedence() {
            return Precedence.POSTFIX;
        }
        parseInfix(parser, left) {
            if (left.type !== 'NAME') {
                throw new Error('All elements of class path have to be identifiers');
            }
            let result = left.name;
            let lastToken = parser.getToken();
            while (parser.consume('#') || parser.consume('~') || parser.consume('/')) {
                const next = parser.parseType(Precedence.POSTFIX);
                if (next.type !== 'NAME') {
                    throw new Error('All elements of class path have to be identifiers');
                }
                result += lastToken.text + next.name;
                lastToken = parser.getToken();
            }
            return {
                type: 'NAME',
                name: result
            };
        }
    }

    class ArrayBracketsParslet {
        accepts(type, next) {
            return type === '[' && next === ']';
        }
        getPrecedence() {
            return Precedence.ARRAY_BRACKETS;
        }
        parseInfix(parser, left) {
            parser.consume('[');
            parser.consume(']');
            return {
                type: 'GENERIC',
                subject: {
                    type: 'NAME',
                    name: 'Array'
                },
                objects: [
                    assertTerminal(left)
                ]
            };
        }
    }

    class StringValueParslet {
        accepts(type) {
            return type === 'StringValue';
        }
        getPrecedence() {
            return Precedence.PREFIX;
        }
        parsePrefix(parser) {
            const token = parser.getToken();
            parser.consume('StringValue');
            return {
                type: 'STRING_VALUE',
                value: token.text.slice(1, -1),
                quote: token.text[0]
            };
        }
    }

    const jsdocGrammar = () => {
        const { prefixParslets, infixParslets } = baseGrammar();
        return {
            prefixParslets: [
                ...prefixParslets,
                new FunctionParslet({
                    allowWithoutParenthesis: true
                }),
                new StringValueParslet()
            ],
            infixParslets: [
                ...infixParslets,
                new SymbolParslet(),
                new ClassPathParslet(),
                new ArrayBracketsParslet()
            ]
        };
    };

    class TypeOfParslet {
        accepts(type, next) {
            return type === 'typeof';
        }
        getPrecedence() {
            return Precedence.KEY_OF_TYPE_OF;
        }
        parsePrefix(parser) {
            parser.consume('typeof');
            const result = {
                type: 'TYPE_OF'
            };
            const value = parser.tryParseType(Precedence.KEY_OF_TYPE_OF);
            if (value !== undefined) {
                result.value = assertTerminal(value);
            }
            return result;
        }
    }

    class KeyOfParslet {
        accepts(type, next) {
            return type === 'keyof';
        }
        getPrecedence() {
            return Precedence.KEY_OF_TYPE_OF;
        }
        parsePrefix(parser) {
            parser.consume('keyof');
            const result = {
                type: 'KEY_OF'
            };
            const value = parser.tryParseType(Precedence.KEY_OF_TYPE_OF);
            if (value !== undefined) {
                result.value = assertTerminal(value);
            }
            return result;
        }
    }

    class ImportParslet {
        accepts(type, next) {
            return type === 'import';
        }
        getPrecedence() {
            return Precedence.PREFIX;
        }
        parsePrefix(parser) {
            parser.consume('import');
            if (!parser.consume('(')) {
                throw new Error('Missing parenthesis after import keyword');
            }
            const path = parser.parseType(Precedence.PREFIX);
            if (path.type !== 'STRING_VALUE') {
                throw new Error('Only string values are allowed as paths for imports');
            }
            if (!parser.consume(')')) {
                throw new Error('Missing closing parenthesis after import keyword');
            }
            return {
                type: 'IMPORT',
                path
            };
        }
    }

    class ArrowFunctionWithoutParametersParslet {
        accepts(type, next) {
            return type === '(' && next === ')';
        }
        getPrecedence() {
            return Precedence.ARROW;
        }
        parsePrefix(parser) {
            parser.consume('(');
            parser.consume(')');
            if (!parser.consume('=') || !parser.consume('>')) {
                throw new Error('Unexpected empty parenthesis. Expected \'=>\' afterwards.');
            }
            const result = {
                type: 'FUNCTION',
                parameters: [],
                arrow: true
            };
            if (!parser.consume('void')) {
                const right = parser.parseType(Precedence.ALL);
                result.returnType = right;
            }
            return result;
        }
    }
    class ArrowFunctionWithParametersParslet {
        accepts(type, next) {
            return type === '=' && next === '>';
        }
        getPrecedence() {
            return Precedence.ARROW;
        }
        parseInfix(parser, left) {
            var _a;
            if (((_a = parser.previousToken()) === null || _a === void 0 ? void 0 : _a.type) !== ')') {
                throw new Error('Unexpected Arrow. Expected parenthesis before.');
            }
            parser.consume('=');
            parser.consume('>');
            let parameters;
            if (left.type === 'PARAMETER_LIST') {
                if (left.elements.some(e => e.type !== 'KEY_VALUE')) {
                    throw new Error('Arrow syntax expects all parameters to be key value pairs');
                }
                parameters = left.elements;
            }
            else if (left.type === 'KEY_VALUE') {
                parameters = [left];
            }
            else {
                throw new Error('Arrow syntax expects all parameters to be key value pairs');
            }
            const result = {
                type: 'FUNCTION',
                parameters,
                arrow: true
            };
            if (!parser.consume('void')) {
                const right = parser.parseType(Precedence.ALL);
                result.returnType = right;
            }
            return result;
        }
    }

    const typescriptGrammar = () => {
        const { prefixParslets, infixParslets } = baseGrammar();
        return {
            prefixParslets: [
                ...prefixParslets,
                new FunctionParslet({
                    allowWithoutParenthesis: false
                }),
                new TypeOfParslet(),
                new KeyOfParslet(),
                new ImportParslet(),
                new StringValueParslet(),
                new ArrowFunctionWithoutParametersParslet()
            ],
            infixParslets: [
                ...infixParslets,
                new ArrayBracketsParslet(),
                new VariadicParslet(),
                new ArrowFunctionWithParametersParslet()
            ]
        };
    };

    /**
     * @public
     */
    class Parser {
        constructor({ mode = 'closure' } = {}) {
            switch (mode) {
                case 'closure':
                    this.engine = new ParserEngine(closureGrammar);
                    break;
                case 'jsdoc':
                    this.engine = new ParserEngine(jsdocGrammar);
                    break;
                case 'typescript':
                    this.engine = new ParserEngine(typescriptGrammar);
            }
        }
        parse(text) {
            return this.engine.parseText(text);
        }
    }

    /**
     * @internal
     */
    function catharsisTransform(object) {
        var _a, _b, _c;
        const newObject = Object.assign({}, object);
        let value;
        switch (object.type) {
            case 'ALL':
                newObject.type = 'AllLiteral';
                break;
            case 'NULL':
                newObject.type = 'NullLiteral';
                break;
            case 'STRING_VALUE':
                newObject.type = 'NameExpression';
                delete newObject.value;
                delete newObject.quote;
                newObject.name = `${object.quote}${object.value}${object.quote}`;
                break;
            case 'UNDEFINED':
                newObject.type = 'UndefinedLiteral';
                break;
            case 'UNKNOWN':
                newObject.type = 'UnknownLiteral';
                break;
            case 'FUNCTION':
                newObject.type = 'FunctionType';
                delete newObject.parameters;
                newObject.params = object.parameters.filter(p => {
                    if (p.type === 'KEY_VALUE' && p.key.type === 'NAME') {
                        if (p.key.name === 'this') {
                            newObject.this = catharsisTransform(p.value);
                            return false;
                        }
                        if (p.key.name === 'new') {
                            newObject.new = catharsisTransform(p.value);
                            return false;
                        }
                    }
                    return true;
                }).map(catharsisTransform);
                if (object.returnType !== undefined) {
                    delete newObject.returnType;
                    newObject.result = catharsisTransform(object.returnType);
                }
                break;
            case 'GENERIC':
                newObject.type = 'TypeApplication';
                delete newObject.objects;
                newObject.applications = object.objects.map(catharsisTransform);
                delete newObject.subject;
                newObject.expression = catharsisTransform(object.subject);
                break;
            case 'MODULE':
                newObject.type = 'NameExpression';
                delete newObject.path;
                newObject.name = object.path;
                break;
            case 'NAME':
                newObject.type = 'NameExpression';
                break;
            case 'NUMBER':
                newObject.type = 'NameExpression';
                delete newObject.value;
                newObject.name = object.value.toString(10);
                break;
            case 'RECORD':
                newObject.type = 'RecordType';
                newObject.fields = object.fields.map(field => {
                    if (field.type !== 'KEY_VALUE') {
                        return {
                            type: 'FieldType',
                            key: catharsisTransform(field),
                            value: undefined
                        };
                    }
                    else {
                        return catharsisTransform(field);
                    }
                });
                break;
            case 'UNION':
                newObject.type = 'TypeUnion';
                newObject.elements = object.elements.map(catharsisTransform);
                break;
            case 'KEY_VALUE':
                newObject.type = 'FieldType';
                newObject.key = catharsisTransform(object.key);
                if (object.value !== undefined) {
                    newObject.value = catharsisTransform(object.value);
                }
                break;
            case 'PROPERTY_PATH':
                newObject.type = 'NameExpression';
                if (object.left.type !== 'NAME') {
                    throw new Error('Other left types than \'NAME\' are not supported for catharsis compat mode');
                }
                delete newObject.left;
                delete newObject.path;
                newObject.name = object.left.name + '.' + object.path.join('.');
                break;
            case 'SYMBOL':
                newObject.type = 'NameExpression';
                delete newObject.value;
                value = '';
                if (((_a = object.value) === null || _a === void 0 ? void 0 : _a.repeatable) === true) {
                    value = '...';
                }
                if (((_b = object.value) === null || _b === void 0 ? void 0 : _b.type) === 'NAME') {
                    value += object.value.name;
                }
                else if (((_c = object.value) === null || _c === void 0 ? void 0 : _c.type) === 'NUMBER') {
                    value += object.value.value.toString(10);
                }
                newObject.name = `${object.name}(${value})`;
                break;
        }
        return newObject;
    }

    exports.Parser = Parser;
    exports.catharsisTransform = catharsisTransform;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

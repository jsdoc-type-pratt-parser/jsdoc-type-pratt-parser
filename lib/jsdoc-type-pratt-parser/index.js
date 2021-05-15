(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.jtpp = {}));
}(this, (function (exports) { 'use strict';

    function tokenToString(token) {
        if (token.text !== undefined && token.text !== '') {
            return `'${token.type}' with value '${token.text}'`;
        }
        else {
            return `'${token.type}'`;
        }
    }
    class NoParsletFoundError extends Error {
        constructor(token) {
            super(`No parslet found for token: ${tokenToString(token)}`);
            this.token = token;
            Object.setPrototypeOf(this, NoParsletFoundError.prototype);
        }
        getToken() {
            return this.token;
        }
    }
    class EarlyEndOfParseError extends Error {
        constructor(token) {
            super(`The parsing ended early. The next token was: ${tokenToString(token)}`);
            this.token = token;
            Object.setPrototypeOf(this, EarlyEndOfParseError.prototype);
        }
        getToken() {
            return this.token;
        }
    }
    class UnexpectedTypeError extends Error {
        constructor(result) {
            super(`Unexpected type: '${result.type}'`);
            Object.setPrototypeOf(this, UnexpectedTypeError.prototype);
        }
    }
    // export class UnexpectedTokenError extends Error {
    //   private expected: Token
    //   private found: Token
    //
    //   constructor (expected: Token, found: Token) {
    //     super(`The parsing ended early. The next token was: ${tokenToString(token)}`)
    //
    //     this.token = token
    //
    //     Object.setPrototypeOf(this, EarlyEndOfParseError.prototype)
    //   }
    //
    //   getToken() {
    //     return this.token
    //   }
    // }

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
        makePunctuationRule('=>'),
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
            const text = this.text.trim();
            for (const rule of rules) {
                const token = rule(text);
                if (token !== null) {
                    this.text = text.slice(token.text.length);
                    return token;
                }
            }
            throw new Error('Unexpected Token');
        }
        clone() {
            const lexer = new Lexer();
            lexer.text = this.text;
            lexer.previous = this.previous === undefined ? undefined : {
                type: this.previous.type,
                text: this.previous.text
            };
            lexer.current = this.current === undefined ? undefined : {
                type: this.current.type,
                text: this.current.text
            };
            lexer.next = this.next === undefined ? undefined : {
                type: this.next.type,
                text: this.next.text
            };
            return lexer;
        }
    }

    function assertTerminal(result) {
        if (result === undefined) {
            throw new Error('Unexpected undefined');
        }
        if (result.type === 'KEY_VALUE' || result.type === 'NUMBER' || result.type === 'PARAMETER_LIST') {
            throw new UnexpectedTypeError(result);
        }
        return result;
    }
    function assertNamedKeyValueOrTerminal(result) {
        if (result.type === 'KEY_VALUE') {
            if (result.left.type !== 'NAME') {
                throw new UnexpectedTypeError(result);
            }
            return result;
        }
        return assertTerminal(result);
    }
    function assertNamedKeyValueOrName(result) {
        if (result.type === 'KEY_VALUE') {
            if (result.left.type !== 'NAME') {
                throw new UnexpectedTypeError(result);
            }
            return result;
        }
        else if (result.type !== 'NAME') {
            throw new UnexpectedTypeError(result);
        }
        return result;
    }
    function assertNumberOrVariadicName(result) {
        var _a;
        if (result.type === 'VARIADIC') {
            if (((_a = result.element) === null || _a === void 0 ? void 0 : _a.type) === 'NAME') {
                return result;
            }
            throw new UnexpectedTypeError(result);
        }
        if (result.type !== 'NUMBER' && result.type !== 'NAME') {
            throw new UnexpectedTypeError(result);
        }
        return result;
    }

    // higher precedence = higher importance
    var Precedence;
    (function (Precedence) {
        Precedence[Precedence["ALL"] = 0] = "ALL";
        Precedence[Precedence["PARAMETER_LIST"] = 1] = "PARAMETER_LIST";
        Precedence[Precedence["UNION"] = 2] = "UNION";
        Precedence[Precedence["PREFIX"] = 3] = "PREFIX";
        Precedence[Precedence["POSTFIX"] = 4] = "POSTFIX";
        Precedence[Precedence["TUPLE"] = 5] = "TUPLE";
        Precedence[Precedence["OBJECT"] = 6] = "OBJECT";
        Precedence[Precedence["SYMBOL"] = 7] = "SYMBOL";
        Precedence[Precedence["OPTIONAL"] = 8] = "OPTIONAL";
        Precedence[Precedence["NULLABLE"] = 9] = "NULLABLE";
        Precedence[Precedence["KEY_OF_TYPE_OF"] = 10] = "KEY_OF_TYPE_OF";
        Precedence[Precedence["KEY_VALUE"] = 11] = "KEY_VALUE";
        Precedence[Precedence["FUNCTION"] = 12] = "FUNCTION";
        Precedence[Precedence["ARROW"] = 13] = "ARROW";
        Precedence[Precedence["GENERIC"] = 14] = "GENERIC";
        Precedence[Precedence["NAME_PATH"] = 15] = "NAME_PATH";
        Precedence[Precedence["ARRAY_BRACKETS"] = 16] = "ARRAY_BRACKETS";
        Precedence[Precedence["PARENTHESIS"] = 17] = "PARENTHESIS";
        Precedence[Precedence["SPECIAL_TYPES"] = 18] = "SPECIAL_TYPES";
    })(Precedence || (Precedence = {}));

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
                throw new EarlyEndOfParseError(this.getToken());
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
            const preserve = this.lexer.clone();
            try {
                return this.parseNonTerminalType(precedence);
            }
            catch (e) {
                if (e instanceof NoParsletFoundError) {
                    this.lexer = preserve;
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
            if (parser.consume('null')) {
                return {
                    type: 'NULL'
                };
            }
            if (parser.consume('undefined')) {
                return {
                    type: 'UNDEFINED'
                };
            }
            if (parser.consume('*')) {
                return {
                    type: 'ANY'
                };
            }
            if (parser.consume('?')) {
                return {
                    type: 'UNKNOWN'
                };
            }
            throw new Error('Unacceptable token: ' + parser.getToken().text);
        }
    }

    class RecordParslet {
        accepts(type) {
            return type === '{';
        }
        getPrecedence() {
            return Precedence.OBJECT;
        }
        parsePrefix(parser) {
            parser.consume('{');
            const result = {
                type: 'OBJECT',
                elements: []
            };
            if (!parser.consume('}')) {
                do {
                    const field = parser.parseNonTerminalType(Precedence.OBJECT);
                    if (field.type !== 'NAME' && field.type !== 'NUMBER' && field.type !== 'KEY_VALUE') {
                        throw new Error('records may only contain \'NAME\', \'NUMBER\' or \'KEY_VALUE\' fields.');
                    }
                    result.elements.push(field);
                } while (parser.consume(','));
                if (!parser.consume('}')) {
                    throw new Error('Unterminated record type. Missing \'}\'');
                }
            }
            return result;
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
            const dot = parser.consume('.');
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
                left: assertTerminal(left),
                elements: objects,
                meta: {
                    brackets: '<>',
                    dot
                }
            };
        }
    }

    class ParenthesisParslet {
        accepts(type, next) {
            return type === '(';
        }
        getPrecedence() {
            return Precedence.PARENTHESIS;
        }
        parsePrefix(parser) {
            parser.consume('(');
            const result = parser.tryParseType(Precedence.ALL);
            if (!parser.consume(')')) {
                throw new Error('Unterminated parenthesis');
            }
            return {
                type: 'PARENTHESIS',
                element: result // NOTE: this can only be non-terminal or undefined if it is a parameter list
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
        constructor(option) {
            this.allowTrailingComma = option.allowTrailingComma;
        }
        accepts(type, next) {
            return type === ',';
        }
        getPrecedence() {
            return Precedence.PARAMETER_LIST;
        }
        parseInfix(parser, left) {
            const elements = [
                assertNamedKeyValueOrTerminal(left)
            ];
            parser.consume(',');
            do {
                try {
                    const next = parser.parseNonTerminalType(Precedence.PARAMETER_LIST);
                    elements.push(assertNamedKeyValueOrTerminal(next));
                }
                catch (e) {
                    if (this.allowTrailingComma && e instanceof NoParsletFoundError) {
                        break;
                    }
                    else {
                        throw e;
                    }
                }
            } while (parser.consume(','));
            if (elements.length > 0 && elements.slice(0, -1).some(e => e.type === 'VARIADIC')) {
                throw new Error('Only the last parameter may be a rest parameter');
            }
            return {
                type: 'PARAMETER_LIST',
                elements
            };
        }
    }

    class NullablePrefixParslet {
        accepts(type, next) {
            return type === '?' && !isQuestionMarkUnknownType(next);
        }
        getPrecedence() {
            return Precedence.NULLABLE;
        }
        parsePrefix(parser) {
            parser.consume('?');
            return {
                type: 'NULLABLE',
                element: parser.parseType(Precedence.NULLABLE),
                meta: {
                    position: 'PREFIX'
                }
            };
        }
    }
    class NullableInfixParslet {
        accepts(type, next) {
            return type === '?';
        }
        getPrecedence() {
            return Precedence.NULLABLE;
        }
        parseInfix(parser, left) {
            parser.consume('?');
            return {
                type: 'NULLABLE',
                element: assertTerminal(left),
                meta: {
                    position: 'SUFFIX'
                }
            };
        }
    }

    class OptionalParslet {
        accepts(type, next) {
            return type === '=';
        }
        getPrecedence() {
            return Precedence.OPTIONAL;
        }
        parsePrefix(parser) {
            parser.consume('=');
            return {
                type: 'OPTIONAL',
                element: parser.parseType(Precedence.OPTIONAL),
                meta: {
                    position: 'PREFIX'
                }
            };
        }
        parseInfix(parser, left) {
            parser.consume('=');
            return {
                type: 'OPTIONAL',
                element: assertTerminal(left),
                meta: {
                    position: 'SUFFIX'
                }
            };
        }
    }

    const baseGrammar = () => {
        return {
            prefixParslets: [
                new NullablePrefixParslet(),
                new OptionalParslet(),
                new RecordParslet(),
                new NumberParslet(),
                new ParenthesisParslet(),
                new SpecialTypesParslet()
            ],
            infixParslets: [
                new ParameterListParslet({
                    allowTrailingComma: true
                }),
                new GenericParslet(),
                new UnenclosedUnionParslet(),
                new OptionalParslet(),
                new NullableInfixParslet()
            ]
        };
    };

    class BaseFunctionParslet {
        getParameters(value) {
            let parameters;
            if (value.element === undefined) {
                parameters = [];
            }
            else if (value.element.type === 'PARAMETER_LIST') {
                parameters = value.element.elements;
            }
            else {
                parameters = [value.element];
            }
            return parameters.map(p => assertNamedKeyValueOrTerminal(p));
        }
        getNamedParameters(value) {
            const parameters = this.getParameters(value);
            if (parameters.some(p => p.type !== 'KEY_VALUE')) {
                throw new Error('All parameters should be named');
            }
            return parameters;
        }
        getUnnamedParameters(value) {
            const parameters = this.getParameters(value);
            if (parameters.some(p => p.type === 'KEY_VALUE')) {
                throw new Error('No parameter should be named');
            }
            return parameters;
        }
    }

    class FunctionParslet extends BaseFunctionParslet {
        constructor(options) {
            super();
            this.allowWithoutParenthesis = options.allowWithoutParenthesis;
            this.allowNamedParameters = options.allowNamedParameters;
            this.allowNoReturnType = options.allowNoReturnType;
        }
        accepts(type) {
            return type === 'function';
        }
        getPrecedence() {
            return Precedence.FUNCTION;
        }
        parsePrefix(parser) {
            parser.consume('function');
            const hasParenthesis = parser.getToken().type === '(';
            if (!this.allowWithoutParenthesis && !hasParenthesis) {
                throw new Error('function is missing parameter list');
            }
            const result = {
                type: 'FUNCTION',
                parameters: [],
                meta: {
                    arrow: false,
                    parenthesis: hasParenthesis
                }
            };
            if (hasParenthesis) {
                const value = parser.parseNonTerminalType(Precedence.FUNCTION);
                if (value.type !== 'PARENTHESIS') {
                    throw new UnexpectedTypeError(value);
                }
                if (this.allowNamedParameters === undefined) {
                    result.parameters = this.getUnnamedParameters(value);
                }
                else {
                    result.parameters = this.getParameters(value);
                    for (const p of result.parameters) {
                        if (p.type === 'KEY_VALUE' && !this.allowNamedParameters.includes(p.left.value)) {
                            throw new Error(`only allowed named parameters are ${this.allowNamedParameters.join(',')} but got ${p.type}`);
                        }
                    }
                }
                if (parser.consume(':')) {
                    result.returnType = parser.parseType(Precedence.PREFIX);
                }
                else {
                    if (!this.allowNoReturnType) {
                        throw new Error('function is missing return type');
                    }
                }
            }
            return result;
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
                meta: {
                    quote: token.text[0]
                }
            };
        }
    }

    class NamePathParslet {
        constructor(opts) {
            this.allowJsdocNamePaths = opts.allowJsdocNamePaths;
            this.stringValueParslet = new StringValueParslet();
        }
        accepts(type, next) {
            return (type === '.' && next !== '<') || (this.allowJsdocNamePaths && (type === '~' || type === '#'));
        }
        getPrecedence() {
            return Precedence.NAME_PATH;
        }
        parseInfix(parser, left) {
            const type = parser.getToken().text;
            parser.consume('.') || parser.consume('~') || parser.consume('#');
            let next;
            if (parser.getToken().type === 'StringValue') {
                next = this.stringValueParslet.parsePrefix(parser);
            }
            else {
                next = parser.parseNonTerminalType(Precedence.NAME_PATH);
                if (next.type !== 'NAME' && next.type !== 'NUMBER') {
                    throw new UnexpectedTypeError(next);
                }
            }
            return {
                type: 'NAME_PATH',
                left: assertTerminal(left),
                right: next,
                meta: {
                    type
                }
            };
        }
    }

    class KeyValueParslet {
        constructor(opts) {
            this.allowOnlyNameOrNumberProperties = opts.allowOnlyNameOrNumberProperties;
        }
        accepts(type, next) {
            return type === ':';
        }
        getPrecedence() {
            return Precedence.KEY_VALUE;
        }
        parseInfix(parser, left) {
            if (this.allowOnlyNameOrNumberProperties && left.type !== 'NUMBER' && left.type !== 'NAME') {
                throw new UnexpectedTypeError(left);
            }
            parser.consume(':');
            const value = parser.parseType(Precedence.KEY_VALUE);
            return {
                type: 'KEY_VALUE',
                left: left.type === 'NUMBER' ? left : assertTerminal(left),
                right: value
            };
        }
    }

    class TypeOfParslet {
        accepts(type, next) {
            return type === 'typeof';
        }
        getPrecedence() {
            return Precedence.KEY_OF_TYPE_OF;
        }
        parsePrefix(parser) {
            parser.consume('typeof');
            return {
                type: 'TYPE_OF',
                element: assertTerminal(parser.parseType(Precedence.KEY_OF_TYPE_OF))
            };
        }
    }

    class VariadicParslet {
        constructor(opts) {
            this.allowEnclosingBrackets = opts.allowEnclosingBrackets;
        }
        accepts(type) {
            return type === '...';
        }
        getPrecedence() {
            return Precedence.PREFIX;
        }
        parsePrefix(parser) {
            parser.consume('...');
            const brackets = this.allowEnclosingBrackets && parser.consume('[');
            const value = parser.tryParseType(Precedence.PREFIX);
            if (brackets && !parser.consume(']')) {
                throw new Error('Unterminated variadic type. Missing \']\'');
            }
            if (value !== undefined) {
                return {
                    type: 'VARIADIC',
                    element: assertTerminal(value),
                    meta: {
                        position: 'PREFIX',
                        squareBrackets: brackets
                    }
                };
            }
            else {
                return {
                    type: 'VARIADIC',
                    meta: {
                        position: 'ONLY_DOTS',
                        squareBrackets: false
                    }
                };
            }
        }
        parseInfix(parser, left) {
            parser.consume('...');
            return {
                type: 'VARIADIC',
                element: assertTerminal(left),
                meta: {
                    position: 'SUFFIX',
                    squareBrackets: false
                }
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
        constructor(options) {
            this.allowedAdditionalTokens = options.allowedAdditionalTokens;
        }
        accepts(type, next) {
            return type === 'Identifier' || type === 'this' || type === 'new' || this.allowedAdditionalTokens.includes(type);
        }
        getPrecedence() {
            return Precedence.PREFIX;
        }
        parsePrefix(parser) {
            const token = parser.getToken();
            parser.consume('Identifier') || parser.consume('this') || parser.consume('new') ||
                this.allowedAdditionalTokens.some(type => parser.consume(type));
            return {
                type: 'NAME',
                value: token.text,
                meta: {
                    reservedWord: reservedWords.includes(token.text)
                }
            };
        }
    }

    class NotNullableParslet {
        accepts(type, next) {
            return type === '!';
        }
        getPrecedence() {
            return Precedence.NULLABLE;
        }
        parsePrefix(parser) {
            parser.consume('!');
            return {
                type: 'NOT_NULLABLE',
                element: parser.parseType(Precedence.NULLABLE),
                meta: {
                    position: 'PREFIX'
                }
            };
        }
        parseInfix(parser, left) {
            parser.consume('!');
            return {
                type: 'NOT_NULLABLE',
                element: assertTerminal(left),
                meta: {
                    position: 'SUFFIX'
                }
            };
        }
    }

    const closureGrammar = () => {
        const { prefixParslets, infixParslets } = baseGrammar();
        return {
            prefixParslets: [
                ...prefixParslets,
                new NameParslet({
                    allowedAdditionalTokens: []
                }),
                new TypeOfParslet(),
                new FunctionParslet({
                    allowWithoutParenthesis: false,
                    allowNamedParameters: ['this', 'new'],
                    allowNoReturnType: true
                }),
                new VariadicParslet({
                    allowEnclosingBrackets: false
                }),
                new NameParslet({
                    allowedAdditionalTokens: ['keyof']
                }),
                new NotNullableParslet()
            ],
            infixParslets: [
                ...infixParslets,
                new NamePathParslet({
                    allowJsdocNamePaths: false
                }),
                new KeyValueParslet({
                    allowOnlyNameOrNumberProperties: true
                }),
                new NotNullableParslet()
            ]
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
                value: left.value
            };
            if (!parser.consume(')')) {
                const next = parser.parseNonTerminalType(Precedence.SYMBOL);
                result.element = assertNumberOrVariadicName(next);
                if (!parser.consume(')')) {
                    throw new Error('Symbol does not end after value');
                }
            }
            return result;
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
                left: {
                    type: 'NAME',
                    value: 'Array',
                    meta: {
                        reservedWord: false
                    }
                },
                elements: [
                    assertTerminal(left)
                ],
                meta: {
                    brackets: '[]',
                    dot: false
                }
            };
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
            let token = parser.getToken();
            if (parser.consume('StringValue')) {
                return {
                    type: 'MODULE',
                    value: token.text.slice(1, -1),
                    meta: {
                        quote: token.text[0]
                    }
                };
            }
            else {
                let result = '';
                const allowed = ['Identifier', '@', '/'];
                while (allowed.some(type => parser.consume(type))) {
                    result += token.text;
                    token = parser.getToken();
                }
                return {
                    type: 'MODULE',
                    value: result,
                    meta: {
                        quote: undefined
                    }
                };
            }
        }
    }

    const jsdocGrammar = () => {
        const { prefixParslets, infixParslets } = baseGrammar();
        return {
            prefixParslets: [
                ...prefixParslets,
                new FunctionParslet({
                    allowWithoutParenthesis: true,
                    allowNamedParameters: ['this', 'new'],
                    allowNoReturnType: true
                }),
                new StringValueParslet(),
                new ModuleParslet(),
                new VariadicParslet({
                    allowEnclosingBrackets: true
                }),
                new NameParslet({
                    allowedAdditionalTokens: ['keyof']
                }),
                new NotNullableParslet()
            ],
            infixParslets: [
                ...infixParslets,
                new SymbolParslet(),
                new ArrayBracketsParslet(),
                new NamePathParslet({
                    allowJsdocNamePaths: true
                }),
                new KeyValueParslet({
                    allowOnlyNameOrNumberProperties: false
                }),
                new VariadicParslet({
                    allowEnclosingBrackets: true
                }),
                new NotNullableParslet()
            ]
        };
    };

    class TupleParslet {
        constructor(opts) {
            this.allowQuestionMark = opts.allowQuestionMark;
        }
        accepts(type, next) {
            return type === '[';
        }
        getPrecedence() {
            return Precedence.TUPLE;
        }
        parsePrefix(parser) {
            parser.consume('[');
            const result = {
                type: 'TUPLE',
                elements: []
            };
            if (parser.consume(']')) {
                return result;
            }
            const typeList = parser.parseNonTerminalType(Precedence.ALL);
            if (typeList.type === 'PARAMETER_LIST') {
                result.elements = typeList.elements.map(assertTerminal);
            }
            else {
                result.elements = [assertTerminal(typeList)];
            }
            if (!parser.consume(']')) {
                throw new Error('Unterminated \'[\'');
            }
            if (!this.allowQuestionMark && result.elements.some(e => e.type === 'UNKNOWN')) {
                throw new Error('Question mark in tuple not allowed');
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
            return {
                type: 'KEY_OF',
                element: assertTerminal(parser.parseType(Precedence.KEY_OF_TYPE_OF))
            };
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
                element: path
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
            const hasParenthesis = parser.consume('(');
            parser.consume(')');
            if (!parser.consume('=>')) {
                throw new Error('Unexpected empty parenthesis. Expected \'=>\' afterwards.');
            }
            return {
                type: 'FUNCTION',
                parameters: [],
                meta: {
                    arrow: true,
                    parenthesis: hasParenthesis
                },
                returnType: parser.parseType(Precedence.ALL)
            };
        }
    }
    class ArrowFunctionWithParametersParslet extends BaseFunctionParslet {
        accepts(type, next) {
            return type === '=>';
        }
        getPrecedence() {
            return Precedence.ARROW;
        }
        parseInfix(parser, left) {
            if (left.type !== 'PARENTHESIS') {
                throw new UnexpectedTypeError(left);
            }
            parser.consume('=>');
            return {
                type: 'FUNCTION',
                parameters: this.getParameters(left).map(assertNamedKeyValueOrName),
                meta: {
                    arrow: true,
                    parenthesis: true
                },
                returnType: parser.parseType(Precedence.ALL)
            };
        }
    }

    const typescriptGrammar = () => {
        const { prefixParslets, infixParslets } = baseGrammar();
        // typescript does not support explicit non nullability
        // https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html#patterns-that-are-known-not-to-be-supported
        // module seems not to be supported
        return {
            prefixParslets: [
                ...prefixParslets,
                new TypeOfParslet(),
                new KeyOfParslet(),
                new ImportParslet(),
                new StringValueParslet(),
                new ArrowFunctionWithoutParametersParslet(),
                new FunctionParslet({
                    allowWithoutParenthesis: false,
                    allowNoReturnType: false,
                    allowNamedParameters: ['this', 'new']
                }),
                new TupleParslet({
                    allowQuestionMark: false
                }),
                new VariadicParslet({
                    allowEnclosingBrackets: false
                }),
                new NameParslet({
                    allowedAdditionalTokens: []
                })
            ],
            infixParslets: [
                ...infixParslets,
                new ArrayBracketsParslet(),
                new ArrowFunctionWithParametersParslet(),
                new NamePathParslet({
                    allowJsdocNamePaths: false
                }),
                new KeyValueParslet({
                    allowOnlyNameOrNumberProperties: true
                })
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

    function transform(rules, parseResult) {
        const rule = rules[parseResult.type];
        if (rule === undefined) {
            throw new Error(`In this set of transform rules exists no rule for type ${parseResult.type}.`);
        }
        return rule(parseResult, aParseResult => transform(rules, aParseResult));
    }
    function notAvailableTransform(parseResult) {
        throw new Error('This transform is not available. Are you trying the correct parsing mode?');
    }
    function extractSpecialParams(source) {
        const result = {
            params: []
        };
        for (const param of source.parameters) {
            if (param.type === 'KEY_VALUE' && param.left.type === 'NAME') {
                if (param.left.value === 'this') {
                    result.this = param.right;
                }
                else if (param.left.value === 'new') {
                    result.new = param.right;
                }
                else {
                    result.params.push(param);
                }
            }
            else {
                result.params.push(param);
            }
        }
        return result;
    }

    const catharsisTransformRules = {
        OPTIONAL: (result, transform) => {
            const transformed = transform(result.element);
            transformed.optional = true;
            return transformed;
        },
        NULLABLE: (result, transform) => {
            const transformed = transform(result.element);
            transformed.nullable = true;
            return transformed;
        },
        NOT_NULLABLE: (result, transform) => {
            const transformed = transform(result.element);
            transformed.nullable = false;
            return transformed;
        },
        VARIADIC: (result, transform) => {
            if (result.element === undefined) {
                throw new Error('dots without value are not allowed in catharsis mode');
            }
            const transformed = transform(result.element);
            transformed.repeatable = true;
            return transformed;
        },
        ANY: () => ({
            type: 'AllLiteral'
        }),
        NULL: () => ({
            type: 'NullLiteral'
        }),
        STRING_VALUE: result => ({
            type: 'NameExpression',
            name: `${result.meta.quote}${result.value}${result.meta.quote}`
        }),
        UNDEFINED: () => ({
            type: 'UndefinedLiteral'
        }),
        UNKNOWN: () => ({
            type: 'UnknownLiteral'
        }),
        FUNCTION: (result, transform) => {
            const params = extractSpecialParams(result);
            const transformed = {
                type: 'FunctionType',
                params: params.params.map(transform)
            };
            if (params.this !== undefined) {
                transformed.this = transform(params.this);
            }
            if (params.new !== undefined) {
                transformed.new = transform(params.new);
            }
            if (result.returnType !== undefined) {
                transformed.result = transform(result.returnType);
            }
            return transformed;
        },
        GENERIC: (result, transform) => ({
            type: 'TypeApplication',
            applications: result.elements.map(o => transform(o)),
            expression: transform(result.left)
        }),
        MODULE: result => {
            var _a;
            const quote = (_a = result.meta.quote) !== null && _a !== void 0 ? _a : '';
            return {
                type: 'NameExpression',
                name: 'module:' + quote + result.value + quote
            };
        },
        NAME: result => {
            const transformed = {
                type: 'NameExpression',
                name: result.value
            };
            if (result.meta.reservedWord) {
                transformed.reservedWord = true;
            }
            return transformed;
        },
        NUMBER: result => ({
            type: 'NameExpression',
            name: result.value.toString()
        }),
        OBJECT: (result, transform) => {
            const transformed = {
                type: 'RecordType',
                fields: []
            };
            for (const field of result.elements) {
                if (field.type !== 'KEY_VALUE') {
                    transformed.fields.push({
                        type: 'FieldType',
                        key: transform(field),
                        value: undefined
                    });
                }
                else {
                    transformed.fields.push(transform(field));
                }
            }
            return transformed;
        },
        UNION: (result, transform) => ({
            type: 'TypeUnion',
            elements: result.elements.map(e => transform(e))
        }),
        KEY_VALUE: (result, transform) => ({
            type: 'FieldType',
            key: transform(result.left),
            value: transform(result.right)
        }),
        NAME_PATH: (result, transform) => {
            const leftResult = transform(result.left);
            const rightResult = transform(result.right);
            return {
                type: 'NameExpression',
                name: `${leftResult.name}${result.meta.type}${rightResult.name}`
            };
        },
        SYMBOL: result => {
            let value = '';
            let element = result.element;
            let trailingDots = false;
            if ((element === null || element === void 0 ? void 0 : element.type) === 'VARIADIC') {
                if (element.meta.position === 'PREFIX') {
                    value = '...';
                }
                else {
                    trailingDots = true;
                }
                element = element.element;
            }
            if ((element === null || element === void 0 ? void 0 : element.type) === 'NAME') {
                value += element.value;
            }
            else if ((element === null || element === void 0 ? void 0 : element.type) === 'NUMBER') {
                value += element.value.toString();
            }
            if (trailingDots) {
                value += '...';
            }
            return {
                type: 'NameExpression',
                name: `${result.value}(${value})`
            };
        },
        PARENTHESIS: (result, transform) => transform(assertTerminal(result.element)),
        IMPORT: notAvailableTransform,
        KEY_OF: notAvailableTransform,
        PARAMETER_LIST: notAvailableTransform,
        TUPLE: notAvailableTransform,
        TYPE_OF: notAvailableTransform
    };
    function catharsisTransform(result) {
        return transform(catharsisTransformRules, result);
    }

    function getQuoteStyle(quote) {
        switch (quote) {
            case undefined:
                return 'none';
            case '\'':
                return 'single';
            case '"':
                return 'double';
        }
    }
    function getMemberType(type) {
        switch (type) {
            case '~':
                return 'INNER_MEMBER';
            case '#':
                return 'INSTANCE_MEMBER';
            case '.':
                return 'MEMBER';
        }
    }
    const jtpRules = {
        OPTIONAL: (result, transform) => ({
            type: 'OPTIONAL',
            value: transform(result.element),
            meta: {
                syntax: result.meta.position === 'PREFIX' ? 'PREFIX_EQUAL_SIGN' : 'SUFFIX_EQUALS_SIGN'
            }
        }),
        NULLABLE: (result, transform) => ({
            type: 'NULLABLE',
            value: transform(result.element),
            meta: {
                syntax: result.meta.position === 'PREFIX' ? 'PREFIX_QUESTION_MARK' : 'SUFFIX_QUESTION_MARK'
            }
        }),
        NOT_NULLABLE: (result, transform) => ({
            type: 'NOT_NULLABLE',
            value: transform(result.element),
            meta: {
                syntax: result.meta.position === 'PREFIX' ? 'PREFIX_BANG' : 'SUFFIX_BANG'
            }
        }),
        VARIADIC: (result, transform) => {
            const transformed = {
                type: 'VARIADIC',
                meta: {
                    syntax: result.meta.position === 'PREFIX' ? 'PREFIX_DOTS'
                        : result.meta.position === 'SUFFIX' ? 'SUFFIX_DOTS' : 'ONLY_DOTS'
                }
            };
            if (result.element !== undefined) {
                transformed.value = transform(result.element);
            }
            return transformed;
        },
        NAME: result => ({
            type: 'NAME',
            name: result.value
        }),
        TYPE_OF: (result, transform) => ({
            type: 'TYPE_QUERY',
            name: transform(result.element)
        }),
        TUPLE: (result, transform) => ({
            type: 'TUPLE',
            entries: result.elements.map(transform)
        }),
        KEY_OF: (result, transform) => ({
            type: 'KEY_QUERY',
            value: transform(result.element)
        }),
        IMPORT: result => ({
            type: 'IMPORT',
            path: {
                type: 'STRING_VALUE',
                quoteStyle: getQuoteStyle(result.element.meta.quote),
                string: result.element.value
            }
        }),
        UNDEFINED: () => ({
            type: 'NAME',
            name: 'undefined'
        }),
        ANY: () => ({
            type: 'ANY'
        }),
        FUNCTION: (result, transform) => {
            const specialParams = extractSpecialParams(result);
            const transformed = {
                type: result.meta.arrow ? 'ARROW' : 'FUNCTION',
                params: specialParams.params.map(param => {
                    if (param.type === 'KEY_VALUE') {
                        return {
                            type: 'NAMED_PARAMETER',
                            name: param.left.value,
                            typeName: transform(param.right)
                        };
                    }
                    else {
                        return transform(param);
                    }
                }),
                new: null,
                returns: null
            };
            if (specialParams.this !== undefined) {
                transformed.this = transform(specialParams.this);
            }
            else if (!result.meta.arrow) {
                transformed.this = null;
            }
            if (specialParams.new !== undefined) {
                transformed.new = transform(specialParams.new);
            }
            if (result.returnType !== undefined) {
                transformed.returns = transform(result.returnType);
            }
            return transformed;
        },
        GENERIC: (result, transform) => {
            const transformed = {
                type: 'GENERIC',
                subject: transform(result.left),
                objects: result.elements.map(transform),
                meta: {
                    syntax: result.meta.brackets === '[]' ? 'SQUARE_BRACKET' : result.meta.dot ? 'ANGLE_BRACKET_WITH_DOT' : 'ANGLE_BRACKET'
                }
            };
            if (result.meta.brackets === '[]' && result.elements[0].type === 'FUNCTION' && !result.elements[0].meta.parenthesis) {
                transformed.objects[0] = {
                    type: 'NAME',
                    name: 'function'
                };
            }
            return transformed;
        },
        KEY_VALUE: (result, transform) => {
            if (result.left.type !== 'NAME' && result.left.type !== 'NUMBER') {
                throw new Error('In JTP mode only name and number left values are allowed for record entries.');
            }
            return {
                type: 'RECORD_ENTRY',
                key: result.left.value.toString(),
                quoteStyle: 'none',
                value: transform(result.right),
                readonly: false
            };
        },
        OBJECT: (result, transform) => {
            const entries = [];
            for (const field of result.elements) {
                if (field.type === 'KEY_VALUE') {
                    entries.push(transform(field));
                }
                else {
                    const key = field.value;
                    entries.push({
                        type: 'RECORD_ENTRY',
                        key: `${key}`,
                        quoteStyle: 'none',
                        value: null,
                        readonly: false
                    });
                }
            }
            return {
                type: 'RECORD',
                entries
            };
        },
        MODULE: result => ({
            type: 'MODULE',
            value: {
                type: 'FILE_PATH',
                quoteStyle: getQuoteStyle(result.meta.quote),
                path: result.value
            }
        }),
        NAME_PATH: (result, transform) => {
            const transformed = {
                type: getMemberType(result.meta.type),
                owner: transform(result.left),
                name: `${result.right.value}`,
                quoteStyle: result.right.type === 'STRING_VALUE' ? getQuoteStyle(result.right.meta.quote) : 'none',
                hasEventPrefix: false
            };
            if (transformed.owner.type === 'MODULE') {
                const tModule = transformed.owner;
                transformed.owner = transformed.owner.value;
                tModule.value = transformed;
                return tModule;
            }
            else {
                return transformed;
            }
        },
        UNION: (result, transform) => {
            let index = result.elements.length;
            let rightTransformed = transform(result.elements[--index]);
            let left;
            do {
                left = result.elements[--index];
                rightTransformed = {
                    type: 'UNION',
                    left: transform(left),
                    right: rightTransformed
                };
            } while (index > 0);
            return rightTransformed;
        },
        PARENTHESIS: (result, transform) => ({
            type: 'PARENTHESIS',
            value: transform(assertTerminal(result.element))
        }),
        NULL: () => ({
            type: 'NAME',
            name: 'null'
        }),
        UNKNOWN: () => ({
            type: 'UNKNOWN'
        }),
        STRING_VALUE: result => ({
            type: 'STRING_VALUE',
            quoteStyle: getQuoteStyle(result.meta.quote),
            string: result.value
        }),
        NUMBER: notAvailableTransform,
        SYMBOL: notAvailableTransform,
        PARAMETER_LIST: notAvailableTransform
    };
    function jtpTransform(result) {
        return transform(jtpRules, result);
    }

    function applyPosition(position, target, value) {
        return position === 'PREFIX' ? value + target : target + value;
    }
    function stringifyRules() {
        return {
            PARENTHESIS: (result, transform) => `(${result.element !== undefined ? transform(result.element) : ''})`,
            KEY_OF: (result, transform) => `keyof ${transform(result.element)}`,
            FUNCTION: (result, transform) => {
                if (!result.meta.arrow) {
                    let stringified = 'function';
                    if (!result.meta.parenthesis) {
                        return stringified;
                    }
                    stringified += `(${result.parameters.map(transform).join(', ')})`;
                    if (result.returnType !== undefined) {
                        stringified += `: ${transform(result.returnType)}`;
                    }
                    return stringified;
                }
                else {
                    if (result.returnType === undefined) {
                        throw new Error('Arrow function needs a return type.');
                    }
                    return `(${result.parameters.map(transform).join(', ')}) => ${transform(result.returnType)}`;
                }
            },
            NAME: result => result.value,
            TUPLE: (result, transform) => `[${result.elements.map(transform).join(', ')}]`,
            VARIADIC: (result, transform) => result.meta.position === 'ONLY_DOTS'
                ? '...'
                : applyPosition(result.meta.position, transform(result.element), '...'),
            NAME_PATH: (result, transform) => `${transform(result.left)}${result.meta.type}${transform(result.right)}`,
            STRING_VALUE: result => `${result.meta.quote}${result.value}${result.meta.quote}`,
            ANY: () => '*',
            GENERIC: (result, transform) => {
                if (result.meta.brackets === '[]') {
                    return `${transform(result.elements[0])}[]`;
                }
                else {
                    return `${transform(result.left)}${result.meta.dot ? '.' : ''}<${result.elements.map(transform).join(', ')}>`;
                }
            },
            IMPORT: (result, transform) => `import(${transform(result.element)})`,
            KEY_VALUE: (result, transform) => `${transform(result.left)}: ${transform(result.right)}`,
            MODULE: result => { var _a, _b; return `module:${(_a = result.meta.quote) !== null && _a !== void 0 ? _a : ''}${result.value}${(_b = result.meta.quote) !== null && _b !== void 0 ? _b : ''}`; },
            NOT_NULLABLE: (result, transform) => applyPosition(result.meta.position, transform(result.element), '!'),
            NULL: () => 'null',
            NULLABLE: (result, transform) => applyPosition(result.meta.position, transform(result.element), '?'),
            NUMBER: result => result.value.toString(),
            OBJECT: (result, transform) => `{${result.elements.map(transform).join(', ')}}`,
            OPTIONAL: (result, transform) => applyPosition(result.meta.position, transform(result.element), '='),
            PARAMETER_LIST: notAvailableTransform,
            SYMBOL: (result, transform) => `${result.value}(${result.element !== undefined ? transform(result.element) : ''})`,
            TYPE_OF: (result, transform) => `typeof ${transform(result.element)}`,
            UNDEFINED: () => 'undefined',
            UNION: (result, transform) => result.elements.map(transform).join(' | '),
            UNKNOWN: () => '?'
        };
    }
    function stringify(result) {
        return transform(stringifyRules(), result);
    }

    exports.Parser = Parser;
    exports.catharsisTransform = catharsisTransform;
    exports.jtpTransform = jtpTransform;
    exports.stringify = stringify;
    exports.stringifyRules = stringifyRules;
    exports.transform = transform;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

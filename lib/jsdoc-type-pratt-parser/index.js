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
        advance() {
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
            const result = this.parseType(0);
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
            let result = pParslet.parse(this);
            let iParslet = this.getInfixParslet(precedence);
            while (iParslet !== undefined) {
                result = iParslet.parse(this, result);
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
    }

    // higher precedence = higher importance
    var Precedence;
    (function (Precedence) {
        Precedence[Precedence["PARENTHESIS"] = 1] = "PARENTHESIS";
        Precedence[Precedence["UNION"] = 2] = "UNION";
        Precedence[Precedence["PREFIX"] = 3] = "PREFIX";
        Precedence[Precedence["KEY_VALUE"] = 4] = "KEY_VALUE";
        Precedence[Precedence["POSTFIX"] = 5] = "POSTFIX";
        Precedence[Precedence["KEY_OF_TYPE_OF"] = 6] = "KEY_OF_TYPE_OF";
        Precedence[Precedence["ARRAY_BRACKETS"] = 7] = "ARRAY_BRACKETS";
        Precedence[Precedence["SPECIAL_TYPES"] = 8] = "SPECIAL_TYPES";
    })(Precedence || (Precedence = {}));

    class UnenclosedUnionParslet {
        accepts(type) {
            return type === '|';
        }
        getPrecedence() {
            return Precedence.UNION;
        }
        parse(parser, left) {
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
        parse(parser) {
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
        parse(parser) {
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

    class NullableParslet {
        accepts(type, next) {
            return (type === '?' && !isQuestionMarkUnknownType(next)) || type === '!';
        }
        getPrecedence() {
            return Precedence.PREFIX;
        }
        parse(parser) {
            const nullable = parser.consume('?');
            if (!nullable) {
                parser.consume('!');
            }
            const value = parser.parseType(Precedence.PREFIX);
            if (value.nullable !== undefined) {
                throw new Error('Multiple nullable modifiers on same type');
            }
            value.nullable = nullable;
            return value;
        }
    }
    class PostfixNullableParslet {
        accepts(type) {
            return type === '?' || type === '!';
        }
        getPrecedence() {
            return Precedence.POSTFIX;
        }
        parse(parser, left) {
            const nullable = parser.consume('?');
            if (!nullable) {
                parser.consume('!');
            }
            const result = assertTerminal(left);
            if (result.nullable !== undefined) {
                throw new Error('Multiple nullable modifiers on same type');
            }
            result.nullable = nullable;
            return assertTerminal(left);
        }
    }

    class VariadicParslet {
        accepts(type) {
            return type === '...';
        }
        getPrecedence() {
            return Precedence.PREFIX;
        }
        parse(parser) {
            parser.consume('...');
            const shouldClose = parser.consume('[');
            const value = parser.parseType(Precedence.PREFIX);
            if (shouldClose && !parser.consume(']')) {
                throw new Error('Unterminated variadic type. Missing \']\'');
            }
            value.repeatable = true;
            return value;
        }
    }
    class PostfixVariadicParslet {
        accepts(type) {
            return type === '...';
        }
        getPrecedence() {
            return Precedence.POSTFIX;
        }
        parse(parser, left) {
            parser.consume('...');
            const result = assertTerminal(left);
            result.repeatable = true;
            return result;
        }
    }

    class FunctionParslet {
        accepts(type) {
            return type === 'function';
        }
        getPrecedence() {
            return Precedence.PREFIX;
        }
        parse(parser) {
            parser.consume('function');
            if (!parser.consume('(')) {
                throw new Error('function is missing parameter list');
            }
            const result = {
                type: 'FUNCTION',
                parameters: []
            };
            if (!parser.consume(')')) {
                let continueList = true;
                if (continueList && parser.consume('new')) {
                    if (!parser.consume(':')) {
                        throw new Error('new keyword must be followed by \':\'');
                    }
                    result.newType = parser.parseType(Precedence.PREFIX);
                    continueList = parser.consume(',');
                }
                if (continueList && parser.consume('this')) {
                    if (!parser.consume(':')) {
                        throw new Error('this keyword must be followed by \':\'');
                    }
                    result.thisType = parser.parseType(Precedence.PREFIX);
                    continueList = parser.consume(',');
                }
                if (continueList) {
                    const parameters = [];
                    do {
                        parameters.push(parser.parseType(Precedence.PREFIX));
                    } while (parser.consume(','));
                    result.parameters = parameters;
                }
                if (!parser.consume(')')) {
                    throw new Error('function parameter list is not terminated');
                }
            }
            if (parser.consume(':')) {
                result.returnType = parser.parseType(Precedence.PREFIX);
            }
            return result;
        }
    }

    class RecordParslet {
        accepts(type) {
            return type === '{';
        }
        getPrecedence() {
            return Precedence.PREFIX;
        }
        parse(parser) {
            parser.consume('{');
            const result = {
                type: 'RECORD',
                fields: []
            };
            if (!parser.consume('}')) {
                do {
                    const field = parser.parseNonTerminalType(Precedence.PREFIX);
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
        parse(parser) {
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
            return Precedence.POSTFIX;
        }
        parse(parser, left) {
            parser.consume('.');
            parser.consume('<');
            const objects = [];
            do {
                objects.push(parser.parseType(Precedence.PREFIX));
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
        accepts(type) {
            return type === '=';
        }
        getPrecedence() {
            return Precedence.POSTFIX;
        }
        parse(parser, left) {
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
            return Precedence.POSTFIX;
        }
        parse(parser, left) {
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
            return type === '(';
        }
        getPrecedence() {
            return Precedence.PARENTHESIS;
        }
        parse(parser) {
            parser.consume('(');
            const result = parser.parseType(Precedence.PARENTHESIS);
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
        parse(parser, left) {
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
        parse(parser) {
            const token = parser.getToken();
            parser.consume('Number');
            return {
                type: 'NUMBER',
                value: parseInt(token.text, 10)
            };
        }
    }

    const baseGrammar = () => {
        return {
            prefixParslets: [
                new NameParslet(),
                new SpecialTypesParslet(),
                new NullableParslet(),
                new VariadicParslet(),
                new FunctionParslet(),
                new RecordParslet(),
                new ModuleParslet(),
                new NumberParslet(),
                new ParenthesisParslet()
            ],
            infixParslets: [
                new KeyValueParslet(),
                new GenericParslet(),
                new UnenclosedUnionParslet(),
                new OptionalParslet(),
                new PostfixNullableParslet(),
                new PropertyPathParslet()
            ]
        };
    };

    const closureGrammar = () => {
        return baseGrammar();
    };

    class SymbolParslet {
        accepts(type) {
            return type === '(';
        }
        getPrecedence() {
            return Precedence.POSTFIX;
        }
        parse(parser, left) {
            if (left.type !== 'NAME') {
                throw new Error('Symbol expects a name on the left side. (Reacting on \'(\')');
            }
            parser.consume('(');
            const result = {
                type: 'SYMBOL',
                name: left.name
            };
            const token = parser.getToken();
            if (parser.consume('Number') || parser.consume('Identifier')) {
                result.value = token.text;
            }
            if (!parser.consume(')')) {
                throw new Error('Symbol does not end after name');
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
        parse(parser, left) {
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
        parse(parser, left) {
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
        parse(parser) {
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
        parse(parser) {
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
        parse(parser) {
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
        parse(parser) {
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

    const typescriptGrammar = () => {
        const { prefixParslets, infixParslets } = baseGrammar();
        return {
            prefixParslets: [
                ...prefixParslets,
                new TypeOfParslet(),
                new KeyOfParslet(),
                new ImportParslet(),
                new StringValueParslet()
            ],
            infixParslets: [
                ...infixParslets,
                new ArrayBracketsParslet(),
                new PostfixVariadicParslet()
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
        var _a;
        const newObject = Object.assign({}, object);
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
                newObject.params = object.parameters.map(catharsisTransform);
                if (object.returnType !== undefined) {
                    delete newObject.returnType;
                    newObject.result = catharsisTransform(object.returnType);
                }
                if (object.thisType !== undefined) {
                    delete newObject.thisType;
                    newObject.this = catharsisTransform(object.thisType);
                }
                if (object.newType !== undefined) {
                    delete newObject.newType;
                    newObject.new = catharsisTransform(object.newType);
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
                newObject.name = `${object.name}(${(_a = object.value) !== null && _a !== void 0 ? _a : ''})`;
                break;
        }
        return newObject;
    }

    exports.Parser = Parser;
    exports.catharsisTransform = catharsisTransform;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

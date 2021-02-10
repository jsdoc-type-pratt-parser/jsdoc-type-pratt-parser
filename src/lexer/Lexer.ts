import { Token, TokenType } from './Token';

type Rule = (text: string) => Token|null;

function makePunctuationRule(type: TokenType): Rule {
    return text => {
        if (text.startsWith(type)) {
            return { type, text: type };
        } else {
            return null;
        }
    };
}

function getQuoted(text: string): string|null {
    let position = 0;
    let char;
    let mark = text[0];
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
function getIdentifier(text: string): string|null {
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
function getNumber(text: string): string|null {
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

const identifierRule: Rule = text => {
    let value = getIdentifier(text);
    if (value == null) {
        return null;
    }

    return {
        type: 'Identifier',
        text: value
    };
};

function makeKeyWordRule(type: TokenType): Rule {
    return text => {
        if (!text.startsWith(type)) {
            return null
        }
        const prepends = text[type.length];
        if (prepends !== undefined && identifierContinueRegex.test(prepends)) {
            return null;
        }
        return {
            type: type,
            text: type
        };
    }
}

const stringValueRule: Rule = text => {
    const value = getQuoted(text);
    if (value == null) {
        return null;
    }
    return {
        type: 'StringValue',
        text: value
    };
};

const eofRule: Rule = text => {
    if (text.length > 0) {
        return null;
    }
    return {
        type: 'EOF',
        text: ''
    }
}

const numberRule: Rule = text => {
    const value = getNumber(text);
    if (value === null) {
        return null;
    }
    return {
        type: 'Number',
        text: value
    }
}

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
    identifierRule,
    stringValueRule,
    numberRule
];

export class Lexer {
    private text: string;

    constructor(text: string) {
        this.text = text;
    }

    isFinished(): boolean {
        return this.text === "";
    }

    nextToken(): Token {
        for (const rule of rules) {
            const token = rule(this.text);
            if (token) {
                this.text = this.text.slice(token.text.length).trim();
                return token;
            }
        }
        throw new Error('Unexpected Token');
    }
}

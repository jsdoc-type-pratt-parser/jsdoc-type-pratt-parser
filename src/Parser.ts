import { Token, TokenType } from './lexer/Token';
import { Lexer } from './lexer/Lexer';
import { NameParslet } from './parslets/NameParslet';
import { InfixParslet, PrefixParslet } from './parslets/Parslet';
import { GenericParslet } from './parslets/GenericParslet';
import { ParseResult } from './ParseResult';
import { UnenclosedUnionParslet, UnionParslet } from './parslets/UnionParslet';
import { StringValueParslet } from './parslets/StringValueParslet';
import { VariadicParslet } from './parslets/VariadicParslet';
import { SpecialTypesParslet } from './parslets/SpecialTypesParslet';
import { OptionalParslet } from './parslets/OptionalParslet';
import { FunctionParslet } from './parslets/FunctionParslet';
import { RecordParslet } from './parslets/RecordParslet';
import { NullableParslet, PostfixNullableParslet } from './parslets/NullableParslet';
import { NonNullableParslet, PostfixNonNullableParslet } from './parslets/NonNullableParslet';

type ParserMode = 'jsdoc'|'typescript'|'closure'; // TODO

type ParserOptions = {
    mode?: ParserMode;
}

export class Parser {
    private mode: ParserMode;

    private prefixParslets: PrefixParslet[];
    private infixParslets: InfixParslet[];

    private lexer: Lexer;
    private token: Token = {
        type: 'Start',
        text: ''
    }
    private nextToken: Token|undefined;

    constructor(text: string, config?: ParserOptions) {
        this.mode = config?.mode ?? 'jsdoc';
        this.lexer = new Lexer(text);

        this.prefixParslets = [
            new NameParslet(),
            new SpecialTypesParslet(),
            new StringValueParslet(),
            new VariadicParslet(),
            new NullableParslet(),
            new NonNullableParslet(),
            new FunctionParslet(),
            new UnionParslet(),
            new RecordParslet()
        ];

        this.infixParslets = [
            new GenericParslet(),
            new UnenclosedUnionParslet(),
            new OptionalParslet(),
            new PostfixNullableParslet(),
            new PostfixNonNullableParslet()
        ]
    }

    public parseType(seperatorToken?: TokenType): ParseResult {
        this.consume('Start');

        const pParslet = this.prefixParslets.find(p => p.accepts(this.token.type, this.peek().type));

        if (!pParslet) {
            throw new Error('No parslet found for token: ' + this.token.text);
        }

        let result = pParslet.parse(this, this.token);

        if (this.token.type === seperatorToken) {
            return result;
        }

        let iParslet = this.infixParslets.find(p => p.accepts(this.token.type, this.peek().type));
        while (iParslet) {
            result = iParslet.parse(this, result, this.token);
            iParslet = this.infixParslets.find(p => p.accepts(this.token.type, this.peek().type));
        }

        return result;
    }

    public parseTypeList(seperatorToken: TokenType): ParseResult[] {
        const objects = [];
        do {
            objects.push(this.parseType(seperatorToken));
        } while (this.consume(seperatorToken));
        return objects;
    }

    public consume(type: TokenType): boolean {
        if (this.token.type !== type) {
            return false;
        }
        if (this.nextToken !== undefined) {
            this.token = this.nextToken;
            this.nextToken = undefined;
        } else {
            this.token = this.lexer.nextToken();
        }
        return true;
    }

    public getTokenText(): string {
        return this.token.text;
    }

    public peek(): Token {
        if (this.nextToken === undefined) {
            this.nextToken = this.lexer.nextToken();
        }
        return this.nextToken;
    }
}

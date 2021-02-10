import { Token, TokenType } from './lexer/Token';
import { Lexer } from './lexer/Lexer';
import { NameParslet } from './parslets/NameParslet';
import { InfixParslet, PrefixParslet } from './parslets/Parslet';
import { GenericParslet } from './parslets/GenericParslet';
import { ParseResult } from './ParseResult';
import { UnenclosedUnionParslet, EnclosedUnionParslet } from './parslets/UnionParslets';
import { StringValueParslet } from './parslets/StringValueParslet';
import { VariadicParslet } from './parslets/VariadicParslet';
import { SpecialTypesParslet } from './parslets/SpecialTypesParslet';
import { OptionalParslet } from './parslets/OptionalParslet';
import { FunctionParslet } from './parslets/FunctionParslet';
import { RecordParslet } from './parslets/RecordParslet';
import { NullableParslet, PostfixNullableParslet } from './parslets/NullableParslets';
import { PropertyPathParslet } from './parslets/PropertyPathParslet';
import { ModuleParslet } from './parslets/ModuleParslet';

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
            new EnclosedUnionParslet(),
            new NameParslet(),
            new SpecialTypesParslet(),
            new NullableParslet(),
            new StringValueParslet(),
            new VariadicParslet(),
            new FunctionParslet(),
            new RecordParslet(),
            new ModuleParslet()
        ];
        this.prefixParslets.sort((a, b) => b.getPrecedence() - a.getPrecedence())

        this.infixParslets = [
            new GenericParslet(),
            new UnenclosedUnionParslet(),
            new OptionalParslet(),
            new PostfixNullableParslet(),
            new PropertyPathParslet()
        ]
        this.infixParslets.sort((a, b) => b.getPrecedence() - a.getPrecedence());
    }

    getPrefixParslet() {
        return this.prefixParslets.find(p => p.accepts(this.getToken().type, this.peek().type));
    }

    getInfixParslet(precedence: number) {
        return this.infixParslets.find(p => {
            return p.getPrecedence() > precedence && p.accepts(this.getToken().type, this.peek().type)
        });
    }

    public parseType(precedence: number = 0): ParseResult {
        this.consume('Start');

        const pParslet = this.getPrefixParslet();

        if (!pParslet) {
            throw new Error('No parslet found for token: ' + this.getToken().text);
        }

        let result = pParslet.parse(this);

        let iParslet = this.getInfixParslet(precedence);

        while (iParslet !== undefined) {
            result = iParslet.parse(this, result);
            iParslet = this.getInfixParslet(precedence);
        }

        return result;
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

    public getToken(): Token {
        return this.token;
    }

    public peek(): Token {
        if (this.nextToken === undefined) {
            this.nextToken = this.lexer.nextToken();
        }
        return this.nextToken;
    }
}

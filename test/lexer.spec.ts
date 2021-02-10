import { expect } from "chai";
import { Lexer } from '../src/lexer/Lexer';
import { Token } from '../src/lexer/Token';

describe('lexer', () => {
    it('should lex name', () => {
        const typeString = 'sometype';
        const expected: Token = {
            type: 'Identifier',
            text: 'sometype'
        }

        const lexer = new Lexer(typeString);
        const token = lexer.nextToken();

        expect(token).to.deep.equal(expected);
        expect(lexer.isFinished()).to.equal(true);
    });

    it('should parse a complex expression', () => {
        const typeString = 'Array<(AType|OtherType)>|\'test\'|undefined';
        const expected: Token[] = [
            {
                type: 'Identifier',
                text: 'Array'
            },
            {
                type: '<',
                text: '<'
            },
            {
                type: '(',
                text: '('
            },
            {
                type: 'Identifier',
                text: 'AType'
            },
            {
                type: '|',
                text: '|'
            },
            {
                type: 'Identifier',
                text: 'OtherType'
            },
            {
                type: ')',
                text: ')'
            },
            {
                type: '>',
                text: '>'
            },
            {
                type: '|',
                text: '|'
            },
            {
                type: 'StringValue',
                text: '\'test\''
            },
            {
                type: '|',
                text: '|'
            },
            {
                type: 'Identifier',
                text: 'undefined'
            }
        ];

        const lexer = new Lexer(typeString);

        while (!lexer.isFinished()) {
            const nextToken = lexer.nextToken();
            const nextExpected = expected.shift();
            expect(nextToken).to.deep.equal(nextExpected);
        }

        expect(expected.length).to.equal(0);
    })
})

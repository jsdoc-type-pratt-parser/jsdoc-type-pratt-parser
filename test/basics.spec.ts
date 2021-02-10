import { expect } from 'chai';
import 'mocha';
import { Parser } from '../src/Parser';
import { ParseResult } from '../src/ParseResult';


describe('basics', () => {
    it('should parse names', () => {
        const typeString = 'sometype';
        const expected: ParseResult = {
            type: 'NAME',
            name: 'sometype'
        };
        const parser = new Parser(typeString);
        expect(parser.parseType()).to.deep.equal(expected);
    });

    it('should parse a complex expression', () => {
        const typeString = 'Array<(AType|OtherType)>|\'test\'|undefined';
        const expected: ParseResult = {
            type: 'UNION',
            elements: [
                {
                    type: 'GENERIC',
                    subject: {
                        type: 'NAME',
                        name: 'Array'
                    },
                    objects: [
                        {
                            type: 'UNION',
                            elements: [
                                {
                                    type: 'NAME',
                                    name: 'AType'
                                },
                                {
                                    type: 'NAME',
                                    name: 'OtherType'
                                }
                            ]
                        }
                    ]
                    // "meta": {
                    //     "syntax": "ANGLE_BRACKET"
                    // }
                },
                {
                    type: 'STRING_VALUE',
                    // "quoteStyle": "single",
                    value: 'test'
                },
                {
                    type: 'UNDEFINED'
                }
            ]
        };

        const parser = new Parser(typeString);
        const result = parser.parseType();
        expect(result).to.deep.equal(expected);
    });
});

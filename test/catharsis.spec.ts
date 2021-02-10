import { expect } from 'chai';
import 'mocha';

// @ts-ignore
import * as basic from '../submodules/catharsis/test/specs/basic.js';
// @ts-ignore
import * as functionType from '../submodules/catharsis/test/specs/function-type.js';
// @ts-ignore
import * as nullable from '../submodules/catharsis/test/specs/nullable.js';
// @ts-ignore
import * as recordType from '../submodules/catharsis/test/specs/record-type.js';
// @ts-ignore
import * as typeApplication from '../submodules/catharsis/test/specs/type-application.js';
// @ts-ignore
import * as typeUnion from '../submodules/catharsis/test/specs/type-union.js';

import { CatharsisCompatParser } from '../src/CatharsisCompatParser';

describe('passes the catharsis basic tests', () => {
    for (let fixture of basic) {
        it(fixture.description, () => {
           const parser = new CatharsisCompatParser(fixture.expression);
           const result = parser.parseType();
           expect(result).to.deep.equal(fixture.parsed);
        });
    }
});

describe('passes the catharsis function-type tests', () => {
    for (let fixture of functionType) {
        it(fixture.description, () => {
            const parser = new CatharsisCompatParser(fixture.expression);
            const result = parser.parseType();
            expect(result).to.deep.equal(fixture.parsed);
        });
    }
});

describe('passes the catharsis nullable tests', () => {
    for (let fixture of nullable) {
        it(fixture.description, () => {
            const parser = new CatharsisCompatParser(fixture.expression);
            const result = parser.parseType();
            expect(result).to.deep.equal(fixture.parsed);
        });
    }
});

describe('passes the catharsis record-type tests', () => {
    for (let fixture of recordType) {
        it(fixture.description, () => {
            const parser = new CatharsisCompatParser(fixture.expression);
            const result = parser.parseType();
            expect(result).to.deep.equal(fixture.parsed);
        });
    }
});

describe('passes the catharsis type-application tests', () => {
    for (let fixture of typeApplication) {
        it(fixture.description, () => {
            const parser = new CatharsisCompatParser(fixture.expression);
            const result = parser.parseType();
            expect(result).to.deep.equal(fixture.parsed);
        });
    }
});

describe('passes the catharsis union-type tests', () => {
    for (let fixture of typeUnion) {
        it(fixture.description, () => {
            const parser = new CatharsisCompatParser(fixture.expression);
            const result = parser.parseType();
            expect(result).to.deep.equal(fixture.parsed);
        });
    }
});

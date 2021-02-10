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
// @ts-ignore
import * as codetag from '../submodules/catharsis/test/specs/codetag/codetag.js';
// @ts-ignore
import * as html from '../submodules/catharsis/test/specs/html/html.js';
// @ts-ignore
import * as jsdoc from '../submodules/catharsis/test/specs/jsdoc/jsdoc.js';
// @ts-ignore
import * as link from '../submodules/catharsis/test/specs/link/link.js';
// @ts-ignore
import * as linkcss from '../submodules/catharsis/test/specs/linkcss/linkcss.js';




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

describe('passes the catharsis codetag tests', () => {
    for (let fixture of codetag) {
        it(fixture.description, () => {
            const parser = new CatharsisCompatParser(fixture.expression);
            const result = parser.parseType();
            expect(result).to.deep.equal(fixture.parsed);
        });
    }
});

describe('passes the catharsis html tests', () => {
    for (let fixture of html) {
        it(fixture.description, () => {
            const parser = new CatharsisCompatParser(fixture.expression);
            const result = parser.parseType();
            expect(result).to.deep.equal(fixture.parsed);
        });
    }
});

describe('passes the catharsis jsdoc tests', () => {
    for (let fixture of jsdoc) {
        it(fixture.description, () => {
            const parser = new CatharsisCompatParser(fixture.expression);
            const result = parser.parseType();
            expect(result).to.deep.equal(fixture.parsed);
        });
    }
});

describe('passes the catharsis link tests', () => {
    for (let fixture of link) {
        it(fixture.description, () => {
            const parser = new CatharsisCompatParser(fixture.expression);
            const result = parser.parseType();
            expect(result).to.deep.equal(fixture.parsed);
        });
    }
});


describe('passes the catharsis linkcss tests', () => {
    for (let fixture of linkcss) {
        it(fixture.description, () => {
            const parser = new CatharsisCompatParser(fixture.expression);
            const result = parser.parseType();
            expect(result).to.deep.equal(fixture.parsed);
        });
    }
});

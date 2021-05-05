import { catharsisTransform, Parser, ParseResult, ParserMode } from '../../src'
import { expect } from 'chai'
import 'mocha'
import { parse as catharsisParse } from 'catharsis'
import { parse as jtpParse } from 'jsdoctypeparser'
import { jtpTransform } from '../../src/transforms/jtpTransform'

type JtpMode = 'jsdoc' | 'closure' | 'typescript' | 'permissive'

type CatharsisMode = 'jsdoc' | 'closure'

type CompareMode = ParserMode | 'fail' | 'differ'

interface DiffResult {
  type: 'default' | 'jsdoc' | 'closure' | 'typescript'
  expected: ParseResult
}

export interface Fixture {
  description: string
  modes: ParserMode[]
  jtp: {
    [K in JtpMode]: CompareMode
  }
  catharsis: {
    [K in CatharsisMode]: CompareMode
  }
  expected?: ParseResult | DiffResult[]
  input: string
}

type Results = {
  [K in ParserMode]?: ParseResult
}

function testParser (mode: ParserMode, fixture: Fixture): ParseResult | undefined {
  const parser = new Parser({
    mode: mode
  })
  if (fixture.modes.includes(mode)) {
    it(`gets parsed in '${mode}' mode`, () => {
      const result = parser.parse(fixture.input)
      expect(result).to.deep.equal(fixture.expected)
    })
    return parser.parse(fixture.input)
  } else {
    it(`gets not parsed in '${mode}' mode`, () => {
      expect(() => parser.parse(fixture.input)).to.throw()
    })
  }
}

function compareCatharsis (mode: CatharsisMode, results: Results, fixture: Fixture): void {
  const compareMode = fixture.catharsis[mode]

  if (compareMode !== 'fail') {
    it(`gets parsed in '${mode}' mode`, () => {
      const catharsisResult = catharsisParse(fixture.input, {
        jsdoc: mode === 'jsdoc'
      })

      expect(catharsisResult).not.to.be.undefined

      if (compareMode !== 'differ') {
        const transformed = catharsisTransform(results[compareMode] as ParseResult)
        expect(transformed, 'matches the catharsis output').to.deep.equal(catharsisResult)
      }
    })
  } else {
    it(`gets not parsed in '${mode}' mode`, () => {
      expect(() => {
        catharsisParse(fixture.input, {
          jsdoc: mode === 'jsdoc'
        })
      }).to.throw()
    })
  }
}

function compareJtp (mode: JtpMode, results: Results, fixture: Fixture): void {
  const compareMode = fixture.jtp[mode]

  if (compareMode !== 'fail') {
    it(`gets parsed in '${mode}' mode`, () => {
      const jtpResult = jtpParse(fixture.input, {
        mode: mode
      })

      expect(jtpResult).not.to.be.undefined

      if (compareMode !== 'differ') {
        const transformed = jtpTransform(results[compareMode] as ParseResult)
        expect(transformed, 'matches the jsdoctypeparser output').to.deep.equal(jtpResult)
      }
    })
  } else {
    it(`gets not parsed in '${mode}' mode`, () => {
      expect(() => {
        jtpParse(fixture.input, {
          mode: mode
        })
      }).to.throw()
    })
  }
}

export function testFixture (fixture: Fixture): void {
  describe(fixture.description, () => {
    describe('is parsed in the expected modes and no others', () => {
      const results: Results = {
        closure: testParser('closure', fixture),
        typescript: testParser('typescript', fixture),
        jsdoc: testParser('jsdoc', fixture)
      }

      describe('catharsis produces the same results in the expected modes an no others', () => {
        compareCatharsis('jsdoc', results, fixture)
        compareCatharsis('closure', results, fixture)
      })

      describe('jsdoctypeparser produces the same results in the expected modes an no others', () => {
        compareJtp('closure', results, fixture)
        compareJtp('jsdoc', results, fixture)
        compareJtp('typescript', results, fixture)
        compareJtp('permissive', results, fixture)
      })
    })
  })
}

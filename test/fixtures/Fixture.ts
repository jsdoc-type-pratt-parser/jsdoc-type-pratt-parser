import { catharsisTransform, Parser, ParseResult, ParserMode } from '../../src'
import { expect } from 'chai'
import 'mocha'
import { parse as catharsisParse } from 'catharsis'
import { parse as jtpParse } from 'jsdoctypeparser'
import { jtpTransform } from '../../src/transforms/jtpTransform'

type JtpMode = 'jsdoc' | 'closure' | 'typescript' | 'permissive'

type CatharsisMode = 'jsdoc' | 'closure'

interface DiffResult {
  type: 'default' | 'jsdoc' | 'closure' | 'typescript'
  expected: ParseResult
}

export interface Fixture {
  description: string
  modes: ParserMode[]
  jtpModes: JtpMode[]
  catharsisModes: CatharsisMode[]
  expected?: ParseResult | DiffResult[]
  input: string
}

function testParser (mode: ParserMode, fixture: Fixture): ParseResult | undefined {
  const parser = new Parser({
    mode: mode
  })
  let result
  if (fixture.modes.includes(mode)) {
    it(`gets parsed in '${mode}' mode`, () => {
      result = parser.parse(fixture.input)
      expect(result).to.deep.equal(fixture.expected)
    })
  } else {
    it(`gets not parsed in '${mode}' mode`, () => {
      expect(() => parser.parse(fixture.input)).to.throw()
    })
  }
  return result
}

function compareCatharsis (mode: CatharsisMode, result: ParseResult | undefined, fixture: Fixture): void {
  if (fixture.catharsisModes.includes(mode)) {
    it(`gets parsed in '${mode}' mode`, () => {
      let catharsisResult
      expect(() => {
        catharsisResult = catharsisParse(fixture.input, {
          jsdoc: mode === 'jsdoc'
        })
      }, 'gets parsed by catharsis').not.to.throw()

      if (catharsisResult !== undefined && result !== undefined) {
        const transformed = catharsisTransform(result)
        expect(transformed, 'matches the catharsis output').to.deep.equal(catharsisResult)
      }
    })
  } else {
    it(`gets not parsed in '${mode}' mode`, () => {
      expect(() => {
        catharsisParse(fixture.input, {
          jsdoc: mode === 'jsdoc'
        })
      })
    })
  }
}

function compareJtp (mode: JtpMode, result: ParseResult | undefined, fixture: Fixture): void {
  if (fixture.jtpModes.includes(mode)) {
    it(`gets parsed in '${mode}' mode`, () => {
      let jtpResult
      expect(() => {
        jtpResult = jtpParse(fixture.input, {
          mode: mode
        })
      }, 'gets parsed by jsdoctypeparser').not.to.throw()

      if (jtpResult !== undefined && result !== undefined) {
        const transformed = jtpTransform(result)
        expect(transformed, 'matches the jsdoctypeparser output').to.deep.equal(jtpResult)
      }
    })
  } else {
    it(`gets not parsed in '${mode}' mode`, () => {
      expect(() => {
        jtpParse(fixture.input, {
          mode: mode
        })
      })
    })
  }
}

export function testFixture (fixture: Fixture): void {
  describe(fixture.description, () => {
    let result: ParseResult | undefined

    describe('is parsed in the expected modes and no others', () => {
      const cResult = testParser('closure', fixture)
      const tResult = testParser('typescript', fixture)
      const fResult = testParser('jsdoc', fixture)
      result = cResult ?? tResult ?? fResult
    })

    describe('catharsis produces the same results in the expected modes an no others', () => {
      compareCatharsis('jsdoc', result, fixture)
      compareCatharsis('closure', result, fixture)
    })

    describe('jsdoctypeparser produces the same results in the expected modes an no others', () => {
      compareJtp('closure', result, fixture)
      compareJtp('jsdoc', result, fixture)
      compareJtp('permissive', result, fixture)
      compareJtp('typescript', result, fixture)
    })
  })
}

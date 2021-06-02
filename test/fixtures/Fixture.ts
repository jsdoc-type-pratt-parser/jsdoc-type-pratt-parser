import { expect } from 'chai'
import 'mocha'
import { parse as catharsisParse } from 'catharsis'
import { parse as jtpParse } from 'jsdoctypeparser'
import { jtpTransform } from '../../src/transforms/jtpTransform'
import { simplify } from '../../src/transforms/simplify'
import { catharsisTransform, parse, TerminalResult, ParseMode, stringify } from '../../src'

type JtpMode = 'jsdoc' | 'closure' | 'typescript' | 'permissive'

type CatharsisMode = 'jsdoc' | 'closure'

type CompareMode = ParseMode | 'fail' | 'differ'

export interface Fixture {
  modes: ParseMode[]
  jtp: {
    [K in JtpMode]: CompareMode
  }
  catharsis: {
    [K in CatharsisMode]: CompareMode
  }
  expected?: TerminalResult
  diffExpected?: {
    [K in ParseMode]?: TerminalResult
  }
  input: string
  stringified?: string
}

type Results = {
  [K in ParseMode]?: TerminalResult
}

function testParser (mode: ParseMode, fixture: Fixture): TerminalResult | undefined {
  if (fixture.modes.includes(mode)) {
    it(`is parsed in '${mode}' mode`, () => {
      const result = parse(fixture.input, mode)
      const expected = fixture.diffExpected?.[mode] ?? fixture.expected
      expect(result).to.deep.equal(expected)
    })
    return parse(fixture.input, mode)
  } else {
    it(`fails to parse in '${mode}' mode`, () => {
      expect(() => parse(fixture.input, mode)).to.throw()
    })
  }
}

function compareCatharsis (mode: CatharsisMode, results: Results, fixture: Fixture): void {
  const compareMode = fixture.catharsis[mode]

  if (compareMode !== 'fail') {
    it(`compares to catharsis in '${mode}' mode`, () => {
      const catharsisResult = catharsisParse(fixture.input, {
        jsdoc: mode === 'jsdoc'
      })

      expect(catharsisResult).not.to.be.equal(undefined)

      if (compareMode !== 'differ') {
        const transformed = catharsisTransform(results[compareMode] as TerminalResult)
        expect(transformed, 'matches the catharsis output').to.deep.equal(catharsisResult)
      }
    })
  } else {
    it(`does not get parsed by catharsis in '${mode}' mode`, () => {
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
    it(`compares to jsdoctypeparser in '${mode}' mode`, () => {
      const jtpResult = jtpParse(fixture.input, {
        mode: mode
      })

      expect(jtpResult).not.to.be.equal(undefined)

      if (compareMode !== 'differ') {
        const transformed = jtpTransform(results[compareMode] as TerminalResult)
        expect(transformed, 'matches the jsdoctypeparser output').to.deep.equal(jtpResult)
      }
    })
  } else {
    it(`does not get parsed by jsdoctypeparser in '${mode}' mode`, () => {
      expect(() => {
        jtpParse(fixture.input, {
          mode: mode
        })
      }).to.throw()
    })
  }
}

export function testFixture (fixture: Fixture): void {
  const results: Results = {
    closure: testParser('closure', fixture),
    typescript: testParser('typescript', fixture),
    jsdoc: testParser('jsdoc', fixture)
  }

  compareCatharsis('jsdoc', results, fixture)
  compareCatharsis('closure', results, fixture)

  compareJtp('closure', results, fixture)
  compareJtp('jsdoc', results, fixture)
  compareJtp('typescript', results, fixture)
  compareJtp('permissive', results, fixture)

  it('should stringify', () => {
    // TODO: at the moment this does only test one possible stringification

    const mode: ParseMode | undefined = (results.jsdoc !== undefined)
      ? 'jsdoc'
      : (results.closure !== undefined)
          ? 'closure'
          : (results.typescript !== undefined)
              ? 'typescript'
              : undefined

    if (mode !== undefined) {
      const result = results[mode] as TerminalResult
      const stringified = stringify(result)

      expect(stringified).to.equal(fixture.stringified ?? fixture.input)

      const reparsed = parse(stringified, mode)

      expect(simplify(reparsed)).to.deep.equal(simplify(result))
    }
  })
}

import { expect } from 'chai'
import 'mocha'
import { parse as catharsisParse } from 'catharsis'
import { parse as jtpParse } from 'jsdoctypeparser'
import { jtpTransform } from '../../src/transforms/jtpTransform'
import { simplify } from '../../src/transforms/simplify'
import { catharsisTransform, parse, RootResult, ParseMode, stringify } from '../../src'

export type JtpMode = 'jsdoc' | 'closure' | 'typescript' | 'permissive'

export type CatharsisMode = 'jsdoc' | 'closure'

export type CompareMode = ParseMode | 'fail' | 'differ'

export interface Fixture {
  /**
   * The input that should be parsed
   */
  input: string
  /**
   * The {@link ParseMode}s that the expression is expected to get parsed in. In all other modes it is expected to fail.
   */
  modes: ParseMode[]
  jtp?: {
    [K in JtpMode]: CompareMode
  }
  catharsis?: {
    [K in CatharsisMode]: CompareMode
  }
  /**
   * The expected parse result object. If you expect different parse results for different parse modes please use
   * `diffExpected`.
   */
  expected?: RootResult
  errors?: {
    [K in ParseMode]?: string
  }
  /**
   * The expected parse results objects for different modes. If a mode is included in `modes` and as a key of
   * `diffExpected` the object in `diffExpected` is used over the result in `expected`.
   */
  diffExpected?: {
    [K in ParseMode]?: RootResult
  }
  /**
   * If the stringified output differs from the input it can be provided here. These are mostly whitespace differences.
   */
  stringified?: string
}

type Results = {
  [K in ParseMode]?: RootResult
}

function testParser (mode: ParseMode, fixture: Fixture): RootResult | undefined {
  if (fixture.modes.includes(mode)) {
    const expectedErrorForMode = fixture.errors?.[mode] ?? ''
    if (expectedErrorForMode !== '') {
      it(`In '${mode}' mode, throws with ${expectedErrorForMode}`, () => {
        expect(() => {
          parse(fixture.input, mode)
        }).to.throw(expectedErrorForMode)
      })
      return
    }

    it(`is parsed in '${mode}' mode`, () => {
      const result = parse(fixture.input, mode)
      const expected = fixture.diffExpected?.[mode] ?? fixture.expected
      expect(result).to.deep.equal(expected)
    })
    try {
      return parse(fixture.input, mode)
    } catch (e) {
      console.error(`Parse failed for mode '${mode}'`)
      throw e
    }
  } else {
    it(`fails to parse in '${mode}' mode`, () => {
      expect(() => {
        parse(fixture.input, mode)
      }).to.throw()
    })
  }
}

function compareCatharsis (mode: CatharsisMode, compareMode: CompareMode, results: Results, fixture: Fixture): void {
  if (compareMode !== 'fail') {
    it(`compares to catharsis in '${mode}' mode`, () => {
      const catharsisResult = catharsisParse(fixture.input, {
        jsdoc: mode === 'jsdoc'
      })

      expect(catharsisResult).not.to.be.equal(undefined)

      if (compareMode !== 'differ') {
        const transformed = catharsisTransform(results[compareMode] as RootResult)
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

function compareJtp (mode: JtpMode, compareMode: CompareMode, results: Results, fixture: Fixture): void {
  if (compareMode !== 'fail') {
    it(`compares to jsdoctypeparser in '${mode}' mode`, () => {
      const jtpResult = jtpParse(fixture.input, {
        mode: mode
      })

      expect(jtpResult).not.to.be.equal(undefined)

      if (compareMode !== 'differ') {
        const transformed = jtpTransform(results[compareMode] as RootResult)
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

/**
 * Function to run all relevant tests for a {@link Fixture}.
 */
export function testFixture (fixture: Fixture): void {
  const results: Results = {
    closure: testParser('closure', fixture),
    typescript: testParser('typescript', fixture),
    jsdoc: testParser('jsdoc', fixture)
  }

  if (fixture.catharsis !== undefined) {
    compareCatharsis('jsdoc', fixture.catharsis.jsdoc, results, fixture)
    compareCatharsis('closure', fixture.catharsis.closure, results, fixture)
  }

  if (fixture.jtp !== undefined) {
    compareJtp('closure', fixture.jtp.closure, results, fixture)
    compareJtp('jsdoc', fixture.jtp.jsdoc, results, fixture)
    compareJtp('typescript', fixture.jtp.typescript, results, fixture)
    compareJtp('permissive', fixture.jtp.permissive, results, fixture)
  }

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
      const result = results[mode] as RootResult
      const stringified = stringify(result)

      expect(stringified).to.equal(fixture.stringified ?? fixture.input)

      const reparsed = parse(stringified, mode)

      expect(simplify(reparsed)).to.deep.equal(simplify(result))
    }
  })
}

import { expect } from 'chai'
import 'mocha'

import { parse as catharsisParse } from 'catharsis'
// import { parse as jtpParse } from 'jsdoctypeparser'

import { Parser, ParserMode } from '../src/Parser'

import { Fixture } from './fixtures/Fixture'

import { basicFixtures } from './fixtures/catharsis/basic'
import { functionFixtures } from './fixtures/catharsis/function-type'
import { nullableFixtures } from './fixtures/catharsis/nullable'
import { recordFixtures } from './fixtures/catharsis/record-type'
import { genericFixtures } from './fixtures/catharsis/type-application'
import { unionFixtures } from './fixtures/catharsis/type-union'
import { jsdocFixtures } from './fixtures/catharsis/jsdoc'
import { catharsisTransform, ParseResult } from '../src'
// import { jtpTransform } from '../src/transforms/jtpTransform'

function runFixtures (fixtures: Fixture[], mode: ParserMode = 'closure'): void {
  for (const fixture of fixtures) {
    it(fixture.description, () => {
      const parser = new Parser({
        mode
      })
      if ('shouldFail' in fixture) {
        const parse = (): ParseResult => parser.parse(fixture.input)
        const message = `input: '${fixture.input}'`
        expect(parse, message).to.throw()
      } else {
        const result = parser.parse(fixture.input)
        expect(result).to.deep.equal(fixture.expected)

        let catharsisResult
        if (mode === 'jsdoc') {
          catharsisResult = catharsisParse(fixture.input, {
            jsdoc: true
          })
        } else {
          catharsisResult = catharsisParse(fixture.input)
        }

        const transformed = catharsisTransform(result)
        expect(transformed, 'matches the catharsis output').to.deep.equal(catharsisResult)

        // const jtpResult = jtpParse(fixture.input)
        // const jtpTransformed = jtpTransform(result)
        // expect(jtpTransformed, 'matches the jsdoctypeparser output').to.deep.equal(jtpResult)
      }
    })
  }
}

describe('passes the catharsis basic tests', () => {
  runFixtures(basicFixtures)
})

describe('passes the catharsis function-type tests', () => {
  runFixtures(functionFixtures)
})

describe('passes the catharsis nullable tests', () => {
  runFixtures(nullableFixtures)
})

describe('passes the catharsis record-type tests', () => {
  runFixtures(recordFixtures)
})

describe('passes the catharsis type-application tests', () => {
  runFixtures(genericFixtures)
})

describe('passes the catharsis union-type tests', () => {
  runFixtures(unionFixtures)
})

describe('passes the catharsis jsdoc tests', () => {
  runFixtures(jsdocFixtures, 'jsdoc')
})

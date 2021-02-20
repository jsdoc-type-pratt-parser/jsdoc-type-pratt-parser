import { expect } from 'chai'
import 'mocha'

import { typeOfFixtures } from './fixtures/typescript/typeof'
import { Parser, ParseResult } from '../src'
import { keyofFixtures } from './fixtures/typescript/keyof'
import { importFixtures } from './fixtures/typescript/import'
import { arrowFunctionFixtures } from './fixtures/typescript/arrow-function'
import { Fixture } from './fixtures/Fixture'

function runFixtures (fixtures: Fixture[]): void {
  for (const fixture of fixtures) {
    it(fixture.description, () => {
      const parser = new Parser({
        mode: 'typescript'
      })
      if ('shouldFail' in fixture) {
        const parse = (): ParseResult => parser.parse(fixture.input)
        const message = `input: '${fixture.input}'`
        expect(parse, message).to.throw()
      } else {
        const result = parser.parse(fixture.input)
        expect(result).to.deep.equal(fixture.expected)
      }
    })
  }
}

describe('TypeScript TypeOf', () => {
  runFixtures(typeOfFixtures)
})

describe('TypeScript KeyOf', () => {
  runFixtures(keyofFixtures)
})

describe('TypeScript import', () => {
  runFixtures(importFixtures)
})

describe('TypeScript arrow functions', () => {
  runFixtures(arrowFunctionFixtures)
})

import { expect } from 'chai'
import 'mocha'

import { typeOfFixtures } from './fixtures/typescript/typeof'
import { Parser } from '../src'
import { keyofFixtures } from './fixtures/typescript/keyof'
import { importFixtures } from './fixtures/typescript/import'
import { arrowFunctionFixtures } from './fixtures/typescript/arrow-function'

describe('TypeScript TypeOf', () => {
  for (const fixture of typeOfFixtures) {
    it(fixture.description, () => {
      const parser = new Parser({
        mode: 'typescript'
      })
      const result = parser.parse(fixture.input)
      expect(result).to.deep.equal(fixture.expected)
    })
  }
})

describe('TypeScript KeyOf', () => {
  for (const fixture of keyofFixtures) {
    it(fixture.description, () => {
      const parser = new Parser({
        mode: 'typescript'
      })
      const result = parser.parse(fixture.input)
      expect(result).to.deep.equal(fixture.expected)
    })
  }
})

describe('TypeScript import', () => {
  for (const fixture of importFixtures) {
    it(fixture.description, () => {
      const parser = new Parser({
        mode: 'typescript'
      })
      const result = parser.parse(fixture.input)
      expect(result).to.deep.equal(fixture.expected)
    })
  }
})

describe('TypeScript arrow functions', () => {
  for (const fixture of arrowFunctionFixtures) {
    it(fixture.description, () => {
      const parser = new Parser({
        mode: 'typescript'
      })
      const result = parser.parse(fixture.input)
      expect(result).to.deep.equal(fixture.expected)
    })
  }
})

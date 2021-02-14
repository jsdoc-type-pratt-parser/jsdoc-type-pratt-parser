import { expect } from 'chai'
import 'mocha'

import {typeOfFixtures} from './fixtures/typescript/typeof'
import {Parser} from "../src";

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

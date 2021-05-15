import 'mocha'

import { testFixture } from './fixtures/Fixture'
import { tupleFixtures } from './fixtures/typescript/tuple'
import { typeOfFixtures } from './fixtures/typescript/typeof'
import { keyofFixtures } from './fixtures/typescript/keyof'
import { importFixtures } from './fixtures/typescript/import'
import { arrowFunctionFixtures } from './fixtures/typescript/arrow-function'
import { intersectionFixtures } from './fixtures/typescript/intersection'

describe('TypeScript TypeOf', () => {
  for (const fixture of typeOfFixtures) {
    testFixture(fixture)
  }
})

describe('TypeScript KeyOf', () => {
  for (const fixture of keyofFixtures) {
    testFixture(fixture)
  }
})

describe('TypeScript import', () => {
  for (const fixture of importFixtures) {
    testFixture(fixture)
  }
})

describe('TypeScript arrow functions', () => {
  for (const fixture of arrowFunctionFixtures) {
    testFixture(fixture)
  }
})

describe('TypeScript tuples', () => {
  for (const fixture of tupleFixtures) {
    testFixture(fixture)
  }
})

describe('TypeScript intersection', () => {
  for (const fixture of intersectionFixtures) {
    testFixture(fixture)
  }
})

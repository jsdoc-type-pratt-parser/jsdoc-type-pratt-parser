import 'mocha'

import { testFixture } from './fixtures/Fixture'

import { basicFixtures } from './fixtures/catharsis/basic'
import { functionFixtures } from './fixtures/catharsis/function-type'
import { nullableFixtures } from './fixtures/catharsis/nullable'
import { recordFixtures } from './fixtures/catharsis/record-type'
import { genericFixtures } from './fixtures/catharsis/type-application'
import { unionFixtures } from './fixtures/catharsis/type-union'
import { jsdocFixtures } from './fixtures/catharsis/jsdoc'

describe('passes the catharsis basic tests', () => {
  for (const fixture of basicFixtures) {
    testFixture(fixture)
  }
})

describe('passes the catharsis function-type tests', () => {
  for (const fixture of functionFixtures) {
    testFixture(fixture)
  }
})

describe('passes the catharsis nullable tests', () => {
  for (const fixture of nullableFixtures) {
    testFixture(fixture)
  }
})

describe('passes the catharsis record-type tests', () => {
  for (const fixture of recordFixtures) {
    testFixture(fixture)
  }
})

describe('passes the catharsis type-application tests', () => {
  for (const fixture of genericFixtures) {
    testFixture(fixture)
  }
})

describe('passes the catharsis union-type tests', () => {
  for (const fixture of unionFixtures) {
    testFixture(fixture)
  }
})

describe('passes the catharsis jsdoc tests', () => {
  for (const fixture of jsdocFixtures) {
    testFixture(fixture)
  }
})

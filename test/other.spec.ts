import 'mocha'

import { eventExternalFixtures } from './fixtures/misc/namePaths'
import { testFixture } from './fixtures/Fixture'
import { numberLiteralFixtures } from './fixtures/misc/numberLiteralFixtures'

describe('Name paths', () => {
  for (const fixture of eventExternalFixtures) {
    testFixture(fixture)
  }
})

describe('Number literals', () => {
  for (const fixture of numberLiteralFixtures) {
    testFixture(fixture)
  }
})

import 'mocha'

import { eventExternalFixtures } from './fixtures/misc/namePaths'
import { testFixture } from './fixtures/Fixture'

describe('Name paths', () => {
  for (const fixture of eventExternalFixtures) {
    testFixture(fixture)
  }
})

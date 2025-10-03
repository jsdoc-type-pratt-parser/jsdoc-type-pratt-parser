import { testFixture } from '../Fixture.js'

describe('parses simple name', () => {
  testFixture({
    input: 'foo',
    modes: ['jsdoc', 'closure', 'typescript'],
    parseName: true,
    expected: {
      type: 'JsdocTypeName',
      value: 'foo'
    }
  })
});

describe('other valid types like namepaths do not pass in name parser', () => {
  testFixture({
    input: 'foo.test',
    parseName: true,
    error: "The parsing ended early. The next token was: '.' with value '.'"
  })
})

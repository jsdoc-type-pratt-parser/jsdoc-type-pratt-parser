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

describe('errs with always reserved word', () => {
  testFixture({
    input: 'continue',
    parseName: true,
    extraParseArgs: {
      module: false,
      strictMode: false,
      asyncFunctionBody: false
    },
    error: 'Unexpected reserved keyword "continue"'
  })
});

describe('errs with future always reserved word', () => {
  testFixture({
    input: 'enum',
    parseName: true,
    extraParseArgs: {
      module: false,
      strictMode: false,
      asyncFunctionBody: false
    },
    error: 'Unexpected future reserved keyword "enum"'
  })
});

describe('errs with strict-mode-restricted (module) reserved word', () => {
  testFixture({
    input: 'let',
    parseName: true,
    extraParseArgs: {
      module: true,
      strictMode: false,
      asyncFunctionBody: false
    },
    error: 'Unexpected reserved keyword "let" for strict mode'
  })
});

describe('errs with strict-mode-restricted reserved word', () => {
  testFixture({
    input: 'let',
    parseName: true,
    extraParseArgs: {
      module: false,
      strictMode: true,
      asyncFunctionBody: false
    },
    error: 'Unexpected reserved keyword "let" for strict mode'
  })
});

describe('errs with future strict-mode-restricted reserved word', () => {
  testFixture({
    input: 'implements',
    parseName: true,
    extraParseArgs: {
      module: true,
      strictMode: false,
      asyncFunctionBody: false
    },
    error: 'Unexpected future reserved keyword "implements" for strict mode'
  })
});

describe('errs with non-identifier in strict mode', () => {
  testFixture({
    input: 'arguments',
    parseName: true,
    extraParseArgs: {
      module: true,
      strictMode: false,
      asyncFunctionBody: false
    },
    error: 'The item "arguments" is not an identifier in strict mode'
  })
});

describe('errs with (module) reserved word in module/async context', () => {
  testFixture({
    input: 'await',
    parseName: true,
    extraParseArgs: {
      module: true,
      strictMode: false,
      asyncFunctionBody: false
    },
    error: 'Unexpected reserved keyword "await" for modules or async function bodies'
  })
});

describe('errs with (asyncFunctionBody) reserved word in module/async context', () => {
  testFixture({
    input: 'await',
    parseName: true,
    extraParseArgs: {
      module: false,
      strictMode: false,
      asyncFunctionBody: true
    },
    error: 'Unexpected reserved keyword "await" for modules or async function bodies'
  })
});

describe('other valid types like namepaths do not pass in name parser', () => {
  testFixture({
    input: 'foo.test',
    parseName: true,
    error: "The parsing ended early. The next token was: '.' with value '.'"
  })
})

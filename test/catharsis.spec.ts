import { expect } from 'chai'
import 'mocha'

import { Parser } from '../src/Parser'
import { catharsisTransform } from '../src/catharsisTransform'

// @ts-expect-error
import basic from '../submodules/catharsis/test/specs/basic.js'
// @ts-expect-error
import functionType from '../submodules/catharsis/test/specs/function-type.js'
// @ts-expect-error
import nullable from '../submodules/catharsis/test/specs/nullable.js'
// @ts-expect-error
import recordType from '../submodules/catharsis/test/specs/record-type.js'
// @ts-expect-error
import typeApplication from '../submodules/catharsis/test/specs/type-application.js'
// @ts-expect-error
import typeUnion from '../submodules/catharsis/test/specs/type-union.js'
// @ts-expect-error
import codetag from '../submodules/catharsis/test/specs/codetag/codetag.js'
// @ts-expect-error
import html from '../submodules/catharsis/test/specs/html/html.js'
// @ts-expect-error
import jsdoc from '../submodules/catharsis/test/specs/jsdoc/jsdoc.js'
// @ts-expect-error
import link from '../submodules/catharsis/test/specs/link/link.js'
// @ts-expect-error
import linkcss from '../submodules/catharsis/test/specs/linkcss/linkcss.js'

describe('passes the catharsis basic tests', () => {
  for (const fixture of basic) {
    it(fixture.description, () => {
      const parser = new Parser({
        mode: 'closure'
      })
      const result = catharsisTransform(parser.parse(fixture.expression))
      expect(result).to.deep.equal(fixture.parsed)
    })
  }
})

describe('passes the catharsis function-type tests', () => {
  for (const fixture of functionType) {
    it(fixture.description, () => {
      const parser = new Parser({
        mode: 'closure'
      })
      const result = catharsisTransform(parser.parse(fixture.expression))
      expect(result).to.deep.equal(fixture.parsed)
    })
  }
})

describe('passes the catharsis nullable tests', () => {
  for (const fixture of nullable) {
    it(fixture.description, () => {
      const parser = new Parser({
        mode: 'closure'
      })
      const result = catharsisTransform(parser.parse(fixture.expression))
      expect(result).to.deep.equal(fixture.parsed)
    })
  }
})

describe('passes the catharsis record-type tests', () => {
  for (const fixture of recordType) {
    it(fixture.description, () => {
      const parser = new Parser({
        mode: 'closure'
      })
      const result = catharsisTransform(parser.parse(fixture.expression))
      expect(result).to.deep.equal(fixture.parsed)
    })
  }
})

describe('passes the catharsis type-application tests', () => {
  for (const fixture of typeApplication) {
    it(fixture.description, () => {
      const parser = new Parser({
        mode: 'closure'
      })
      const result = catharsisTransform(parser.parse(fixture.expression))
      expect(result).to.deep.equal(fixture.parsed)
    })
  }
})

describe('passes the catharsis union-type tests', () => {
  for (const fixture of typeUnion) {
    it(fixture.description, () => {
      const parser = new Parser({
        mode: 'closure'
      })
      const result = catharsisTransform(parser.parse(fixture.expression))
      expect(result).to.deep.equal(fixture.parsed)
    })
  }
})

xdescribe('passes the catharsis codetag tests', () => {
  for (const fixture of codetag) {
    it(fixture.description, () => {
      const parser = new Parser()
      const result = catharsisTransform(parser.parse(fixture.expression))
      expect(result).to.deep.equal(fixture.parsed)
    })
  }
})

describe('passes the catharsis html tests', () => {
  for (const fixture of html) {
    it(fixture.description, () => {
      const parser = new Parser()
      const result = catharsisTransform(parser.parse(fixture.expression))
      expect(result).to.deep.equal(fixture.parsed)
    })
  }
})

describe('passes the catharsis jsdoc tests', () => {
  for (const fixture of jsdoc) {
    it(fixture.description, () => {
      const parser = new Parser({
        mode: 'jsdoc'
      })
      const result = catharsisTransform(parser.parse(fixture.expression))
      expect(result).to.deep.equal(fixture.parsed)
    })
  }
})

describe('passes the catharsis link tests', () => {
  for (const fixture of link) {
    it(fixture.description, () => {
      const parser = new Parser()
      const result = catharsisTransform(parser.parse(fixture.expression))
      expect(result).to.deep.equal(fixture.parsed)
    })
  }
})

describe('passes the catharsis linkcss tests', () => {
  for (const fixture of linkcss) {
    it(fixture.description, () => {
      const parser = new Parser()
      const result = catharsisTransform(parser.parse(fixture.expression))
      expect(result).to.deep.equal(fixture.parsed)
    })
  }
})

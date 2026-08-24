import { expect } from 'chai'
import { parse as espree } from 'espree'
import { tryParse } from '../src/parse.js'

describe('tryParse', () => {
  it('should parse a valid expression in jsdoc', () => {
    expect(() => {
      tryParse('function(a, ...[b])')
    }).not.to.throw()
  })

  it('should throw an error vor invalid type syntax in any type', () => {
    expect(() => {
      tryParse('A<')
    }).to.throw()
  })

  it('should parse a computed property with a custom `computedPropertyParser`', () => {
    expect(() => {
      tryParse('{[SomeObject.someType()]: string}', ['typescript'], {
        computedPropertyParser: espree
      })
    }).not.to.throw()
  })
})

import { expect } from 'chai'
import { tryParse } from '../src/parse'

describe('tryParse', () => {
  it('should parse a valid expression in jsdoc', () => {
    expect(() => {
      tryParse('function(a, ...[b])')
    }).not.to.throw()
    expect(() => {
      tryParse('foo')
    }).not.to.throw()
    expect(() => {
      tryParse('params.foo')
    }).not.to.throw()
    expect(() => {
      tryParse('readOnly')
    }).not.to.throw()
    expect(() => {
      tryParse('params.readOnly')
    }).not.to.throw()
    expect(() => {
      tryParse('readonly')
    }).not.to.throw()
    expect(() => {
      tryParse('params.readonly')
    }).not.to.throw()
  })

  it('should throw an error vor invalid type syntax in any type', () => {
    expect(() => {
      tryParse('A<')
    }).to.throw()
  })
})

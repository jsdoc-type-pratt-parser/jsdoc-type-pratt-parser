import { expect } from 'chai'

import { stringifyRules } from '../src/index'

describe('`stringifyRules`', () => {
  it('should exist on index export', () => {
    expect(typeof stringifyRules).to.equal('function')
  })
})

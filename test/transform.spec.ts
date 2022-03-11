import { expect } from 'chai'

import { NonRootResult } from '../src/result/NonRootResult'
import { transform, identityTransformRules } from '../src/index'
import { notAvailableTransform } from '../src/transforms/transform'

describe('transform', () => {
  it('Errs with missing rule for type', () => {
    expect(() => {
      const result = {
        type: 'BadType',
        value: 'test',
        meta: {
          quote: undefined
        }
      }
      transform<NonRootResult>(identityTransformRules(), result as NonRootResult)
    }).to.throw('In this set of transform rules exists no rule for type BadType')
  })

  it('Throws if attempting to execute `notAvailableTransform`', () => {
    expect(() => {
      const result = {
        type: 'JsdocTypeProperty',
        value: 'prop',
        meta: {
          quote: undefined
        }
      }
      notAvailableTransform(result as NonRootResult)
    }).to.throw('This transform is not available. Are you trying the correct parsing mode?')
  })

  it('Gets transform for `JsdocTypeParenthesis`', () => {
    const expected = {
      type: 'JsdocTypeParenthesis',
      element: {
        type: 'JsdocTypeName',
        value: 'a'
      }
    }
    const parseResult = {
      type: 'JsdocTypeParenthesis',
      element: {
        type: 'JsdocTypeName',
        value: 'a'
      }
    }
    const xform = transform<NonRootResult>(identityTransformRules(), parseResult as NonRootResult)
    expect(xform).to.deep.equal(expected)
  })

  it('Gets tranform for `JsdocTypeProperty`', () => {
    const expected = {
      type: 'JsdocTypeProperty',
      value: 'abc',
      meta: {
        quote: 'double'
      }
    }
    const parseResult = {
      type: 'JsdocTypeProperty',
      value: 'abc',
      meta: {
        quote: 'double'
      }
    }
    const xform = transform<NonRootResult>(identityTransformRules(), parseResult as NonRootResult)
    expect(xform).to.deep.equal(expected)
  })

  it('Gets tranform for empty `JsdocTypeVariadic`', () => {
    const expected = {
      type: 'JsdocTypeVariadic',
      meta: {
        position: undefined,
        squareBrackets: false
      }
    }
    const parseResult = {
      type: 'JsdocTypeVariadic',
      meta: {
        squareBrackets: false
      }
    }
    const xform = transform<NonRootResult>(identityTransformRules(), parseResult as NonRootResult)
    expect(xform).to.deep.equal(expected)
  })
})

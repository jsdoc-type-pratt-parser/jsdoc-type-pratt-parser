import { expect } from 'chai'

import { NonRootResult } from '../src/result/NonRootResult'
import { identityTransformRules } from '../src/transforms/identityTransformRules'
import { transform, notAvailableTransform } from '../src/transforms/transform'

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
})

import { expect } from 'chai'
import { SinonSpy, spy } from 'sinon'
import { GenericResult, NameResult, TerminalResult, StringValueResult, UnionResult } from '../src'
import { traverse } from '../src/traverse'

function expectOrder (calls: Array<[SinonSpy, any[]]>): void {
  const callsCount: Map<SinonSpy, number> = new Map<SinonSpy, number>()
  for (let i = 0; i < calls.length; i++) {
    const [cb, args] = calls[i]
    const count = (callsCount.has(cb) ? callsCount.get(cb) : 0) as number
    const call = cb.getCall(count)
    expect(call.calledWithExactly(...args), 'called with correct arguments').to.be.equal(true)
    if (i > 0) {
      const cbBefore = calls[i - 1][0]
      const callBefore = cbBefore.getCall(cbBefore === cb ? count - 1 : (callsCount.get(cbBefore) as number - 1))
      expect(callBefore.calledBefore(call), 'called in correct order').to.be.equal(true)
    }
    callsCount.set(cb, count + 1)
  }
}

describe('traverse', () => {
  it('should traverse a simple expression', () => {
    const onEnter = spy()
    const onLeave = spy()

    const result: TerminalResult = {
      type: 'JsdocTypeName',
      value: 'test',
      meta: {
        reservedWord: false
      }
    }

    traverse(result, onEnter, onLeave)

    expect(onEnter.getCall(0).calledWith(result, undefined, undefined)).to.be.equal(true)
    expect(onLeave.getCall(0).calledWith(result, undefined, undefined)).to.be.equal(true)
    expect(onEnter.getCall(0).calledBefore(onLeave.getCall(0))).to.be.equal(true)
  })

  it('should traverse a nested expression with union and generic', () => {
    const onEnter = spy()
    const onLeave = spy()

    const name: NameResult = {
      type: 'JsdocTypeName',
      value: 'genericName',
      meta: {
        reservedWord: false
      }
    }

    const typeA: NameResult = {
      type: 'JsdocTypeName',
      value: 'TypeA',
      meta: {
        reservedWord: false
      }
    }

    const typeB: NameResult = {
      type: 'JsdocTypeName',
      value: 'TypeB',
      meta: {
        reservedWord: false
      }
    }

    const generic: GenericResult = {
      type: 'JsdocTypeGeneric',
      left: name,
      elements: [
        typeA,
        typeB
      ],
      meta: {
        brackets: '<>',
        dot: false
      }
    }

    const stringVal: StringValueResult = {
      type: 'JsdocTypeStringValue',
      value: 'some value',
      meta: {
        quote: 'single'
      }
    }

    const union: UnionResult = {
      type: 'JsdocTypeUnion',
      elements: [
        generic,
        stringVal
      ]
    }

    traverse(union, onEnter, onLeave)

    expectOrder([
      [onEnter, [union, undefined, undefined]],
      [onEnter, [generic, union, 'elements']],
      [onEnter, [name, generic, 'left']],
      [onLeave, [name, generic, 'left']],
      [onEnter, [typeA, generic, 'elements']],
      [onLeave, [typeA, generic, 'elements']],
      [onEnter, [typeB, generic, 'elements']],
      [onLeave, [typeB, generic, 'elements']],
      [onLeave, [generic, union, 'elements']],
      [onEnter, [stringVal, union, 'elements']],
      [onLeave, [stringVal, union, 'elements']],
      [onLeave, [union, undefined, undefined]]
    ])
  })
})

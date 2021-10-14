import { expect, use } from 'chai'
import { SinonSpy, spy } from 'sinon'
import sinonChai from 'sinon-chai'
import {
  GenericResult,
  NameResult,
  TerminalResult,
  StringValueResult,
  UnionResult,
  FunctionResult,
  TupleResult, KeyValueResult
} from '../src'
import { traverse } from '../src/traverse'

use(sinonChai)

function expectOrder (calls: Array<[SinonSpy, any[]]>): void {
  const callsCount: Map<SinonSpy, number> = new Map<SinonSpy, number>()
  for (let i = 0; i < calls.length; i++) {
    const [cb, args] = calls[i]
    const count = (callsCount.has(cb) ? callsCount.get(cb) : 0) as number
    const call = cb.getCall(count)
    expect(call, `call ${i} called with correct arguments`).to.have.been.calledWithExactly(...args)
    if (i > 0) {
      const cbBefore = calls[i - 1][0]
      const callBefore = cbBefore.getCall(cbBefore === cb ? count - 1 : (callsCount.get(cbBefore) as number - 1))
      expect(callBefore, `call ${i} called in correct order`).to.have.been.calledBefore(call as unknown as SinonSpy)
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
      value: 'test'
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
      value: 'genericName'
    }

    const typeA: NameResult = {
      type: 'JsdocTypeName',
      value: 'TypeA'
    }

    const typeB: NameResult = {
      type: 'JsdocTypeName',
      value: 'TypeB'
    }

    const generic: GenericResult = {
      type: 'JsdocTypeGeneric',
      left: name,
      elements: [
        typeA,
        typeB
      ],
      meta: {
        brackets: 'angle',
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

  it('should traverse a nested expression with function and tuple', () => {
    const onEnter = spy()
    const onLeave = spy()

    const nameA: NameResult = {
      type: 'JsdocTypeName',
      value: 'number'
    }

    const nameB: NameResult = {
      type: 'JsdocTypeName',
      value: 'string'
    }

    const keyValueA: KeyValueResult = {
      type: 'JsdocTypeKeyValue',
      key: 'a',
      right: nameA,
      optional: false,
      readonly: false,
      meta: {
        quote: undefined,
        hasLeftSideExpression: false
      }
    }

    const keyValueB: KeyValueResult = {
      type: 'JsdocTypeKeyValue',
      key: 'b',
      right: nameB,
      optional: false,
      readonly: false,
      meta: {
        quote: undefined,
        hasLeftSideExpression: false
      }
    }

    const tuple: TupleResult = {
      type: 'JsdocTypeTuple',
      elements: [
        keyValueA,
        keyValueB
      ]
    }

    const parameter: NameResult = {
      type: 'JsdocTypeName',
      value: 'parameter'
    }

    const functionResult: FunctionResult = {
      type: 'JsdocTypeFunction',
      arrow: true,
      parenthesis: true,
      parameters: [
        parameter
      ],
      returnType: tuple
    }

    traverse(functionResult, onEnter, onLeave)

    expectOrder([
      [onEnter, [functionResult, undefined, undefined]],
      [onEnter, [parameter, functionResult, 'parameters']],
      [onLeave, [parameter, functionResult, 'parameters']],
      [onEnter, [tuple, functionResult, 'returnType']],
      [onEnter, [keyValueA, tuple, 'elements']],
      [onEnter, [nameA, keyValueA, 'right']],
      [onLeave, [nameA, keyValueA, 'right']],
      [onLeave, [keyValueA, tuple, 'elements']],
      [onEnter, [keyValueB, tuple, 'elements']],
      [onEnter, [nameB, keyValueB, 'right']],
      [onLeave, [nameB, keyValueB, 'right']],
      [onLeave, [keyValueB, tuple, 'elements']],
      [onLeave, [tuple, functionResult, 'returnType']],
      [onLeave, [functionResult, undefined, undefined]]
    ])
  })
})

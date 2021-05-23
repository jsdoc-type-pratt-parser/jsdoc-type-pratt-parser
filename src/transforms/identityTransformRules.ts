import { TransformRules } from './transform'
import {
  JsdocObjectKeyValueResult,
  KeyValueResult,
  NonTerminalResult,
  NumberResult
} from '../result/NonTerminalResult'
import {
  FunctionResult,
  NameResult,
  StringValueResult,
  SymbolResult,
  TerminalResult,
  VariadicResult
} from '../result/TerminalResult'

export function identityTransformRules (): TransformRules<NonTerminalResult> {
  return {
    INTERSECTION: (result, transform) => ({
      type: 'INTERSECTION',
      elements: result.elements.map(transform) as TerminalResult[]
    }),

    GENERIC: (result, transform) => ({
      type: 'GENERIC',
      left: transform(result.left) as TerminalResult,
      elements: result.elements.map(transform) as TerminalResult[],
      meta: {
        dot: result.meta.dot,
        brackets: result.meta.brackets
      }
    }),

    NULLABLE: result => result,

    UNION: (result, transform) => ({
      type: 'UNION',
      elements: result.elements.map(transform) as TerminalResult[]
    }),

    UNKNOWN: result => result,

    UNDEFINED: result => result,

    TYPE_OF: (result, transform) => ({
      type: 'TYPE_OF',
      element: transform(result.element) as TerminalResult
    }),

    SYMBOL: (result, transform) => {
      const transformed: SymbolResult = {
        type: 'SYMBOL',
        value: result.value
      }
      if (result.element !== undefined) {
        transformed.element = transform(result.element) as NumberResult | NameResult | VariadicResult<NameResult>
      }
      return transformed
    },

    OPTIONAL: (result, transform) => ({
      type: 'OPTIONAL',
      element: transform(result.element) as TerminalResult,
      meta: {
        position: result.meta.position
      }
    }),

    OBJECT: (result, transform) => ({
      type: 'OBJECT',
      elements: result.elements.map(transform) as Array<KeyValueResult | JsdocObjectKeyValueResult>
    }),

    NUMBER: result => result,

    NULL: result => result,

    NOT_NULLABLE: (result, transform) => ({
      type: 'NOT_NULLABLE',
      element: transform(result.element) as TerminalResult,
      meta: {
        position: result.meta.position
      }
    }),

    SPECIAL_NAME_PATH: result => result,

    KEY_VALUE: (result, transform) => ({
      type: 'KEY_VALUE',
      value: result.value,
      right: result.right === undefined ? undefined : transform(result.right) as TerminalResult,
      optional: result.optional,
      meta: result.meta
    }),

    IMPORT: (result, transform) => ({
      type: 'IMPORT',
      element: transform(result.element) as StringValueResult
    }),

    ANY: result => result,

    STRING_VALUE: result => result,

    NAME_PATH: result => result,

    VARIADIC: (result, transform) => {
      const transformed: VariadicResult<TerminalResult> = {
        type: 'VARIADIC',
        meta: {
          position: result.meta.position,
          squareBrackets: result.meta.squareBrackets
        }
      }

      if (result.element !== undefined) {
        transformed.element = transform(result.element) as TerminalResult
      }

      return transformed
    },

    TUPLE: (result, transform) => ({
      type: 'TUPLE',
      elements: result.elements.map(transform) as TerminalResult[]
    }),

    NAME: result => result,

    FUNCTION: (result, transform) => {
      const transformed: FunctionResult = {
        type: 'FUNCTION',
        arrow: result.arrow,
        parameters: result.parameters.map(transform) as TerminalResult[],
        parenthesis: result.parenthesis
      }

      if (result.returnType !== undefined) {
        transformed.returnType = transform(result.returnType) as TerminalResult
      }

      return transformed
    },

    KEY_OF: (result, transform) => ({
      type: 'KEY_OF',
      element: transform(result.element) as TerminalResult
    }),

    PARENTHESIS: (result, transform) => ({
      type: 'PARENTHESIS',
      element: transform(result.element) as TerminalResult
    }),

    JSDOC_OBJECT_KEY_VALUE: (result, transform) => ({
      type: 'JSDOC_OBJECT_KEY_VALUE',
      left: transform(result.left) as TerminalResult,
      right: transform(result.right) as TerminalResult
    })
  }
}

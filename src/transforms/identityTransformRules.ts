import { notAvailableTransform, transform, TransformRules } from './transform'
import {
  FunctionResult,
  KeyValueResult,
  NameResult,
  NonTerminalResult,
  NumberResult, ParenthesisResult,
  ParseResult, StringValueResult,
  SymbolResult,
  VariadicResult
} from '../ParseResult'

export function identityTransformRules (): TransformRules<NonTerminalResult> {
  return {
    INTERSECTION: (result, transform) => ({
      type: 'INTERSECTION',
      elements: result.elements.map(transform) as ParseResult[]
    }),

    GENERIC: (result, transform) => ({
      type: 'GENERIC',
      left: transform(result.left) as ParseResult,
      elements: result.elements.map(transform) as ParseResult[],
      meta: {
        dot: result.meta.dot,
        brackets: result.meta.brackets
      }
    }),

    NULLABLE: result => result,

    UNION: (result, transform) => ({
      type: 'UNION',
      elements: result.elements.map(transform) as ParseResult[]
    }),

    UNKNOWN: result => result,

    UNDEFINED: result => result,

    TYPE_OF: (result, transform) => ({
      type: 'TYPE_OF',
      element: transform(result.element) as ParseResult
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
      element: transform(result.element) as ParseResult,
      meta: {
        position: result.meta.position
      }
    }),

    OBJECT: (result, transform) => ({
      type: 'OBJECT',
      elements: result.elements.map(transform) as Array<KeyValueResult<ParseResult | NumberResult> | ParseResult | NumberResult>
    }),

    NUMBER: result => result,

    NULL: result => result,

    NOT_NULLABLE: (result, transform) => ({
      type: 'NOT_NULLABLE',
      element: transform(result.element) as ParseResult,
      meta: {
        position: result.meta.position
      }
    }),

    MODULE: result => result,

    KEY_VALUE: (result, transform) => ({
      type: 'KEY_VALUE',
      left: transform(result.left) as ParseResult,
      right: transform(result.right) as ParseResult
    }),

    IMPORT: (result, transform) => ({
      type: 'IMPORT',
      element: transform(result) as StringValueResult
    }),

    ANY: result => result,

    STRING_VALUE: result => result,

    NAME_PATH: result => result,

    VARIADIC: (result, transform) => {
      const transformed: VariadicResult<ParseResult> = {
        type: 'VARIADIC',
        meta: {
          position: result.meta.position,
          squareBrackets: result.meta.squareBrackets
        }
      }

      if (result.element !== undefined) {
        transformed.element = transform(result.element) as ParseResult
      }

      return transformed
    },

    TUPLE: (result, transform) => ({
      type: 'TUPLE',
      elements: result.elements.map(transform) as ParseResult[]
    }),

    NAME: result => result,

    FUNCTION: (result, transform) => {
      const transformed: FunctionResult = {
        type: 'FUNCTION',
        arrow: result.arrow,
        parameters: result.parameters.map(transform) as ParseResult[],
        parenthesis: result.parenthesis
      }

      if (result.returnType !== undefined) {
        transformed.returnType = transform(result.returnType) as ParseResult
      }

      return transformed
    },

    KEY_OF: (result, transform) => ({
      type: 'KEY_OF',
      element: transform(result.element) as ParseResult
    }),

    PARENTHESIS: (result, transform) => ({
      type: 'PARENTHESIS',
      element: transform(result.element) as ParseResult
    })
  }
}

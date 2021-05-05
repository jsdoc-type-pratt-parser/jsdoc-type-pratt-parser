import { extractSpecialParams, notAvailableTransform, transform, TransformRules } from './transform'
import { NameResult, NumberResult, ParseResult } from '../ParseResult'

export type JtpResult =
  JtpNameResult
  | JtpNullableResult
  | JtpNotNullableResult
  | JtpOptionalResult
  | JtpVariadicResult
  | JtpTypeOfResult
  | JtpTupleResult
  | JtpKeyOfResult
  | JtpStringValueResult
  | JtpImportResult
  | JtpAnyResult
  | JtpUnknownResult
  | JtpFunctionResult
  | JtpGenericResult
  | JtpRecordEntryResult
  | JtpRecordResult
  | JtpMemberResult
  | JtpUnionResult
  | JtpParenthesisResult
  | JtpUnknownResult

export interface JtpNullableResult {
  type: 'NULLABLE'
  value: JtpResult
  meta: {
    syntax: 'PREFIX_QUESTION_MARK' | 'SUFFIX_QUESTION_MARK'
  }
}

export interface JtpNotNullableResult {
  type: 'NOT_NULLABLE'
  value: JtpResult
  meta: {
    syntax: 'PREFIX_BANG' | 'SUFFIX_BANG'
  }
}

export interface JtpOptionalResult {
  type: 'OPTIONAL'
  value: JtpResult
  meta: {
    syntax: 'PREFIX_EQUAL_SIGN' | 'SUFFIX_EQUALS_SIGN'
  }
}

export interface JtpVariadicResult {
  type: 'VARIADIC'
  value?: JtpResult
  meta: {
    syntax: 'PREFIX_DOTS' | 'SUFFIX_DOTS' | 'ONLY_DOTS'
  }
}

export interface JtpNameResult {
  type: 'NAME'
  name: string
}

export interface JtpTypeOfResult {
  type: 'TYPE_QUERY'
  name: JtpResult
}

export interface JtpKeyOfResult {
  type: 'KEY_QUERY'
  value: JtpResult
}

export interface JtpTupleResult {
  type: 'TUPLE'
  entries: JtpResult[]
}

export interface JtpStringValueResult {
  type: 'STRING_VALUE'
  quoteStyle: 'single' | 'double'
  string: string
}

export interface JtpImportResult {
  type: 'IMPORT'
  path: JtpStringValueResult
}

export interface JtpAnyResult {
  type: 'ANY'
}

export interface JtpUnknownResult {
  type: 'UNKNOWN'
}

export interface JtpFunctionResult {
  type: 'FUNCTION' | 'ARROW'
  params: JtpResult[]
  returns: JtpResult | null
  new: JtpResult | null
  this: JtpResult | null
}

export interface JtpGenericResult {
  type: 'GENERIC'
  subject: JtpResult
  objects: JtpResult[]
  meta: {
    syntax: 'ANGLE_BRACKET' | 'ANGLE_BRACKET_WITH_DOT' | 'SQUARE_BRACKET'
  }
}

export interface JtpRecordEntryResult {
  type: 'OBJECT_ENTRY'
  key: string
  quoteStyle: 'none' | 'single' | 'double'
  value: JtpResult | null
  readonly: false
}

export interface JtpRecordResult {
  type: 'OBJECT'
  entries: JtpRecordEntryResult[]
}

export interface JtpMemberResult {
  type: 'MEMBER'
  owner: JtpResult
  name: string
  quoteStyle: 'none' | 'single' | 'double'
  hasEventPrefix: false
}

export interface JtpUnionResult {
  type: 'UNION'
  left: JtpResult
  right: JtpResult
}

export interface JtpParenthesisResult {
  type: 'PARENTHESIS'
  value: JtpResult
}

export interface JtpUnknownResult {
  type: 'UNKNOWN'
}

function getQuoteStyle(meta: { quote: '\'' | '"' }): 'single' | 'double' {
  return meta.quote === '\'' ? 'single' : 'double'
}

const jtpRules: TransformRules<JtpResult> = {
  OPTIONAL: (result, transform) => ({
    type: 'OPTIONAL',
    value: transform(result.element),
    meta: {
      syntax: result.meta.position === 'PREFIX' ? 'PREFIX_EQUAL_SIGN' : 'SUFFIX_EQUALS_SIGN'
    }
  }),

  NULLABLE: (result, transform) => ({
    type: 'NULLABLE',
    value: transform(result.element),
    meta: {
      syntax: result.meta.position === 'PREFIX' ? 'PREFIX_QUESTION_MARK' : 'SUFFIX_QUESTION_MARK'
    }
  }),

  NOT_NULLABLE: (result, transform) => ({
    type: 'NOT_NULLABLE',
    value: transform(result.element),
    meta: {
      syntax: result.meta.position === 'PREFIX' ? 'PREFIX_BANG' : 'SUFFIX_BANG'
    }
  }),

  VARIADIC: (result, transform) => {
    const transformed: JtpVariadicResult = {
      type: 'VARIADIC',
      meta: {
        syntax: result.meta.position === 'PREFIX' ? 'PREFIX_DOTS'
          : result.meta.position === 'SUFFIX' ? 'SUFFIX_DOTS' : 'ONLY_DOTS'
      }
    }
    if (result.element !== undefined) {
      transformed.value = transform(result.element)
    }

    return transformed
  },

  NAME: result => ({
    type: 'NAME',
    name: result.value
  }),

  TYPE_OF: (result, transform) => ({
    type: 'TYPE_QUERY',
    name: transform(result)
  }),

  TUPLE: (result, transform) => ({
    type: 'TUPLE',
    entries: result.elements.map(transform)
  }),

  KEY_OF: (result, transform) => ({
    type: 'KEY_QUERY',
    value: transform(result)
  }),

  IMPORT: result => ({
    type: 'IMPORT',
    path: {
      type: 'STRING_VALUE',
      quoteStyle: getQuoteStyle(result.element.meta),
      string: result.element.value
    }
  }),

  UNDEFINED: () => ({
    type: 'NAME',
    name: 'undefined'
  }),

  ALL: () => ({
    type: 'ANY'
  }),

  FUNCTION: (result, transform) => {
    const params = extractSpecialParams(result)

    const transformed: JtpFunctionResult = {
      type: result.meta.arrow ? 'ARROW' : 'FUNCTION',
      params: params.params.map(transform),
      new: null,
      returns: null,
      this: null
    }

    if (params.this !== undefined) {
      transformed.this = transform(params.this)
    }

    if (params.new !== undefined) {
      transformed.new = transform(params.new)
    }

    if (result.returnType !== undefined) {
      transformed.returns = transform(result.returnType)
    }

    return transformed
  },

  GENERIC: (result, transform) => ({
    type: 'GENERIC',
    subject: transform(result.left),
    objects: result.elements.map(transform),
    meta: {
      syntax: result.meta.brackets === '[]' ? 'SQUARE_BRACKET' : result.meta.dot ? 'ANGLE_BRACKET_WITH_DOT' : 'ANGLE_BRACKET'
    }
  }),

  KEY_VALUE: (result, transform) => {
    if (result.left.type !== 'NAME') {
      throw new Error('In JTP mode only name left values are allowed for record entries.')
    }
    return {
      type: 'OBJECT_ENTRY',
      key: result.left.value,
      quoteStyle: 'none',
      value: transform(result.right),
      readonly: false
    }
  },

  OBJECT: (result, transform) => {
    const entries: JtpRecordEntryResult[] = []
    for (const field of result.elements) {
      if (field.type === 'KEY_VALUE') {
        entries.push(transform(field) as JtpRecordEntryResult)
      } else {
        const key = (field as NameResult | NumberResult).value
        entries.push({
          type: 'OBJECT_ENTRY',
          key: `${key}`,
          quoteStyle: 'none',
          value: null,
          readonly: false
        })
      }
    }
    return {
      type: 'OBJECT',
      entries
    }
  },

  NAME_PATH: (result, transform) => ({
    type: 'MEMBER',
    owner: transform(result.left),
    name: `${result.right.value}`,
    quoteStyle: result.right.type === 'STRING_VALUE' ? getQuoteStyle(result.right.meta) : 'none',
    hasEventPrefix: false
  }),

  UNION: (result, transform) => {
    let left: ParseResult | undefined = result.elements.pop() as ParseResult
    let rightTransformed: JtpResult = transform(result.elements.pop() as ParseResult)
    do {
      rightTransformed = {
        type: 'UNION',
        left: transform(left),
        right: rightTransformed
      }
      left = result.elements.pop()
    } while (left !== undefined)
    return rightTransformed
  },

  PARENTHESIS: (result, transform) => ({
    type: 'PARENTHESIS',
    value: transform(result)
  }),

  NULL: () => ({
    type: 'NAME',
    name: 'null'
  }),

  UNKNOWN: () => ({
    type: 'UNKNOWN'
  }),

  STRING_VALUE: result => ({
    type: 'STRING_VALUE',
    quoteStyle: getQuoteStyle(result.meta),
    string: result.value
  }),

  MODULE: notAvailableTransform,
  NUMBER: notAvailableTransform,
  SYMBOL: notAvailableTransform,
  PARAMETER_LIST: notAvailableTransform
}

export function jtpTransform (result: ParseResult): JtpResult {
  return transform(jtpRules, result)
}

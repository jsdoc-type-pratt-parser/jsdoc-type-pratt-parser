import { extractSpecialParams, notAvailableTransform, transform, TransformRules } from './transform'
import { ParseResult } from '../ParseResult'

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
  quoteStyle: string
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
  returns?: JtpResult
  new?: JtpResult
  this?: JtpResult
}

export interface JtpGenericResult {
  type: 'GENERIC'
  subject: JtpResult
  objects: JtpResult[]
  meta: {
    syntax: 'ANGLE_BRACKET' | 'ANGLE_BRACKET_WITH_DOT' | 'SQUARE_BRACKET'
  }
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
    name: result.name
  }),

  TYPE_OF: (result, transform) => ({
    type: 'TYPE_QUERY',
    name: transform(result)
  }),

  TUPLE: (result, transform) => ({
    type: 'TUPLE',
    entries: result.elements.map(transform)
  }),

  PARAMETER_LIST: notAvailableTransform,

  KEY_OF: (result, transform) => ({
    type: 'KEY_QUERY',
    value: transform(result)
  }),

  IMPORT: result => ({
    type: 'IMPORT',
    path: {
      type: 'STRING_VALUE',
      quoteStyle: result.path.meta.quote,
      string: result.path.value
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
      params: params.params.map(transform)
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
    subject: transform(result.subject),
    objects: result.objects.map(transform),
    meta: {
      syntax: result.meta.brackets === '[]' ? 'SQUARE_BRACKET' : result.meta.dot ? 'ANGLE_BRACKET_WITH_DOT' : 'ANGLE_BRACKET'
    }
  }),

  // MISSING

  KEY_VALUE: notAvailableTransform,
  MODULE: notAvailableTransform,
  NULL: notAvailableTransform,
  NUMBER: notAvailableTransform,
  PROPERTY_PATH: notAvailableTransform,
  RECORD: notAvailableTransform,
  STRING_VALUE: notAvailableTransform,
  SYMBOL: notAvailableTransform,
  UNION: notAvailableTransform,
  UNKNOWN: notAvailableTransform

}

export function jtpTransform (result: ParseResult): JtpResult {
  return transform(jtpRules, result)
}

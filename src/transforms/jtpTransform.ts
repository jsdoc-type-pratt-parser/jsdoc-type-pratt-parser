import { extractSpecialParams, notAvailableTransform, transform, TransformRules } from './transform'
import { ParseResult } from '../ParseResult'
import { assertTerminal } from '../assertTypes'

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
  | JtpNamedParameterResult
  | JtpModuleResult
  | JtpFilePath
  | JtpIntersectionResult

type JtpQuoteStyle = 'single' | 'double' | 'none'

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
    syntax: 'PREFIX_EQUAL_SIGN' | 'SUFFIX_EQUALS_SIGN' | 'SUFFIX_KEY_QUESTION_MARK'
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
  name?: JtpResult
}

export interface JtpKeyOfResult {
  type: 'KEY_QUERY'
  value?: JtpResult
}

export interface JtpTupleResult {
  type: 'TUPLE'
  entries: JtpResult[]
}

export interface JtpStringValueResult {
  type: 'STRING_VALUE'
  quoteStyle: JtpQuoteStyle
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
  this?: JtpResult | null
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
  type: 'RECORD_ENTRY'
  key: string
  quoteStyle: JtpQuoteStyle
  value: JtpResult | null
  readonly: false
}

export interface JtpRecordResult {
  type: 'RECORD'
  entries: JtpRecordEntryResult[]
}

export interface JtpMemberResult {
  type: 'MEMBER' | 'INNER_MEMBER' | 'INSTANCE_MEMBER'
  owner: JtpResult
  name: string
  quoteStyle: JtpQuoteStyle
  hasEventPrefix: boolean
}

export interface JtpUnionResult {
  type: 'UNION'
  left: JtpResult
  right: JtpResult
}

export interface JtpIntersectionResult {
  type: 'INTERSECTION'
  left: JtpResult
  right: JtpResult
}

export interface JtpParenthesisResult {
  type: 'PARENTHESIS'
  value: JtpResult
}

export interface JtpNamedParameterResult {
  type: 'NAMED_PARAMETER'
  name: string
  typeName: JtpResult
}

export interface JtpModuleResult {
  type: 'MODULE'
  value: JtpResult
}

export interface JtpFilePath {
  type: 'FILE_PATH'
  quoteStyle: JtpQuoteStyle
  path: string
}

function getQuoteStyle (quote: '\'' | '"' | undefined): JtpQuoteStyle {
  switch (quote) {
    case undefined:
      return 'none'
    case '\'':
      return 'single'
    case '"':
      return 'double'
  }
}

function getMemberType (type: '.' | '~' | '#'): JtpMemberResult['type'] {
  switch (type) {
    case '~':
      return 'INNER_MEMBER'
    case '#':
      return 'INSTANCE_MEMBER'
    case '.':
      return 'MEMBER'
  }
}

function nestResults (type: 'UNION' | 'INTERSECTION', results: JtpResult[]): JtpResult {
  if (results.length === 2) {
    return {
      type,
      left: results[0],
      right: results[1]
    }
  } else {
    return {
      type,
      left: results[0],
      right: nestResults(type, results.slice(1))
    }
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
    name: result.value
  }),

  TYPE_OF: (result, transform) => ({
    type: 'TYPE_QUERY',
    name: transform(result.element)
  }),

  TUPLE: (result, transform) => ({
    type: 'TUPLE',
    entries: result.elements.map(transform)
  }),

  KEY_OF: (result, transform) => ({
    type: 'KEY_QUERY',
    value: transform(result.element)
  }),

  IMPORT: result => ({
    type: 'IMPORT',
    path: {
      type: 'STRING_VALUE',
      quoteStyle: getQuoteStyle(result.element.meta.quote),
      string: result.element.value
    }
  }),

  UNDEFINED: () => ({
    type: 'NAME',
    name: 'undefined'
  }),

  ANY: () => ({
    type: 'ANY'
  }),

  FUNCTION: (result, transform) => {
    const specialParams = extractSpecialParams(result)

    const transformed: JtpFunctionResult = {
      type: result.arrow ? 'ARROW' : 'FUNCTION',
      params: specialParams.params.map(param => {
        if (param.type === 'KEY_VALUE') {
          if (param.right === undefined) {
            throw new Error('Function parameter without \':\' is not expected to be \'KEY_VALUE\'')
          }
          return {
            type: 'NAMED_PARAMETER',
            name: param.value,
            typeName: transform(param.right)
          }
        } else {
          return transform(param)
        }
      }),
      new: null,
      returns: null
    }

    if (specialParams.this !== undefined) {
      transformed.this = transform(specialParams.this)
    } else if (!result.arrow) {
      transformed.this = null
    }

    if (specialParams.new !== undefined) {
      transformed.new = transform(specialParams.new)
    }

    if (result.returnType !== undefined) {
      transformed.returns = transform(result.returnType)
    }

    return transformed
  },

  GENERIC: (result, transform) => {
    const transformed: JtpGenericResult = {
      type: 'GENERIC',
      subject: transform(result.left),
      objects: result.elements.map(transform),
      meta: {
        syntax: result.meta.brackets === '[]' ? 'SQUARE_BRACKET' : result.meta.dot ? 'ANGLE_BRACKET_WITH_DOT' : 'ANGLE_BRACKET'
      }
    }

    if (result.meta.brackets === '[]' && result.elements[0].type === 'FUNCTION' && !result.elements[0].parenthesis) {
      transformed.objects[0] = {
        type: 'NAME',
        name: 'function'
      }
    }

    return transformed
  },

  KEY_VALUE: (result, transform) => {
    if (result.right === undefined) {
      return {
        type: 'RECORD_ENTRY',
        key: result.value.toString(),
        quoteStyle: getQuoteStyle(result.meta.quote),
        value: null,
        readonly: false
      }
    }

    let right = transform(result.right)
    if (result.optional) {
      right = {
        type: 'OPTIONAL',
        value: right,
        meta: {
          syntax: 'SUFFIX_KEY_QUESTION_MARK'
        }
      }
    }

    return {
      type: 'RECORD_ENTRY',
      key: result.value.toString(),
      quoteStyle: getQuoteStyle(result.meta.quote),
      value: right,
      readonly: false
    }
  },

  OBJECT: (result, transform) => {
    const entries: JtpRecordEntryResult[] = []
    for (const field of result.elements) {
      if (field.type === 'KEY_VALUE') {
        entries.push(transform(field) as JtpRecordEntryResult)
      } else if (field.type === 'JSDOC_OBJECT_KEY_VALUE') {
        throw new Error(`jsdoctypeparser does not support type ${field.type} at this point`)
      }
    }
    return {
      type: 'RECORD',
      entries
    }
  },

  SPECIAL_NAME_PATH: result => {
    if (result.specialType !== 'module') {
      throw new Error(`jsdoctypeparser does not support type ${result.specialType} at this point.`)
    }
    return {
      type: 'MODULE',
      value: {
        type: 'FILE_PATH',
        quoteStyle: getQuoteStyle(result.meta.quote),
        path: result.value
      }
    }
  },

  NAME_PATH: (result, transform) => {
    let hasEventPrefix = false
    let name
    let quoteStyle
    if (result.right.type === 'SPECIAL_NAME_PATH' && result.right.specialType === 'event') {
      hasEventPrefix = true
      name = result.right.value
      quoteStyle = getQuoteStyle(result.right.meta.quote)
    } else {
      name = `${result.right.value}`
      quoteStyle = result.right.type === 'STRING_VALUE' ? getQuoteStyle(result.right.meta.quote) : 'none'
    }

    const transformed: JtpMemberResult = {
      type: getMemberType(result.pathType),
      owner: transform(result.left),
      name,
      quoteStyle,
      hasEventPrefix
    }

    if (transformed.owner.type === 'MODULE') {
      const tModule = transformed.owner
      transformed.owner = transformed.owner.value
      tModule.value = transformed
      return tModule
    } else {
      return transformed
    }
  },

  UNION: (result, transform) => nestResults('UNION', result.elements.map(transform)),

  PARENTHESIS: (result, transform) => ({
    type: 'PARENTHESIS',
    value: transform(assertTerminal(result.element))
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
    quoteStyle: getQuoteStyle(result.meta.quote),
    string: result.value
  }),

  INTERSECTION: (result, transform) => nestResults('INTERSECTION', result.elements.map(transform)),

  JSDOC_OBJECT_KEY_VALUE: notAvailableTransform,

  NUMBER: notAvailableTransform,
  SYMBOL: notAvailableTransform
}

export function jtpTransform (result: ParseResult): JtpResult {
  return transform(jtpRules, result)
}

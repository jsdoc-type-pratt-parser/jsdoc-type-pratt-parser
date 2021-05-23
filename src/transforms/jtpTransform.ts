import { extractSpecialParams, notAvailableTransform, transform, TransformRules } from './transform'
import { TerminalResult } from '../result/TerminalResult'
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
  type: 'JNULLABLE'
  value: JtpResult
  meta: {
    syntax: 'PREFIX_QUESTION_MARK' | 'SUFFIX_QUESTION_MARK'
  }
}

export interface JtpNotNullableResult {
  type: 'JNOT_NULLABLE'
  value: JtpResult
  meta: {
    syntax: 'PREFIX_BANG' | 'SUFFIX_BANG'
  }
}

export interface JtpOptionalResult {
  type: 'JOPTIONAL'
  value: JtpResult
  meta: {
    syntax: 'PREFIX_EQUAL_SIGN' | 'SUFFIX_EQUALS_SIGN' | 'SUFFIX_KEY_QUESTION_MARK'
  }
}

export interface JtpVariadicResult {
  type: 'JVARIADIC'
  value?: JtpResult
  meta: {
    syntax: 'PREFIX_DOTS' | 'SUFFIX_DOTS' | 'ONLY_DOTS'
  }
}

export interface JtpNameResult {
  type: 'JNAME'
  name: string
}

export interface JtpTypeOfResult {
  type: 'JTYPE_QUERY'
  name?: JtpResult
}

export interface JtpKeyOfResult {
  type: 'JKEY_QUERY'
  value?: JtpResult
}

export interface JtpTupleResult {
  type: 'JTUPLE'
  entries: JtpResult[]
}

export interface JtpStringValueResult {
  type: 'JSTRING_VALUE'
  quoteStyle: JtpQuoteStyle
  string: string
}

export interface JtpImportResult {
  type: 'JIMPORT'
  path: JtpStringValueResult
}

export interface JtpAnyResult {
  type: 'JANY'
}

export interface JtpUnknownResult {
  type: 'JUNKNOWN'
}

export interface JtpFunctionResult {
  type: 'JFUNCTION' | 'JARROW'
  params: JtpResult[]
  returns: JtpResult | null
  new: JtpResult | null
  this?: JtpResult | null
}

export interface JtpGenericResult {
  type: 'JGENERIC'
  subject: JtpResult
  objects: JtpResult[]
  meta: {
    syntax: 'ANGLE_BRACKET' | 'ANGLE_BRACKET_WITH_DOT' | 'SQUARE_BRACKET'
  }
}

export interface JtpRecordEntryResult {
  type: 'JRECORD_ENTRY'
  key: string
  quoteStyle: JtpQuoteStyle
  value: JtpResult | null
  readonly: false
}

export interface JtpRecordResult {
  type: 'JRECORD'
  entries: JtpRecordEntryResult[]
}

export interface JtpMemberResult {
  type: 'JMEMBER' | 'JINNER_MEMBER' | 'JINSTANCE_MEMBER'
  owner: JtpResult
  name: string
  quoteStyle: JtpQuoteStyle
  hasEventPrefix: boolean
}

export interface JtpUnionResult {
  type: 'JUNION'
  left: JtpResult
  right: JtpResult
}

export interface JtpIntersectionResult {
  type: 'JINTERSECTION'
  left: JtpResult
  right: JtpResult
}

export interface JtpParenthesisResult {
  type: 'JPARENTHESIS'
  value: JtpResult
}

export interface JtpNamedParameterResult {
  type: 'JNAMED_PARAMETER'
  name: string
  typeName: JtpResult
}

export interface JtpModuleResult {
  type: 'JMODULE'
  value: JtpResult
}

export interface JtpFilePath {
  type: 'JFILE_PATH'
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
      return 'JINNER_MEMBER'
    case '#':
      return 'JINSTANCE_MEMBER'
    case '.':
      return 'JMEMBER'
  }
}

function nestResults (type: 'JUNION' | 'JINTERSECTION', results: JtpResult[]): JtpResult {
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
  JsdocTypeOptional: (result, transform) => ({
    type: 'JOPTIONAL',
    value: transform(result.element),
    meta: {
      syntax: result.meta.position === 'PREFIX' ? 'PREFIX_EQUAL_SIGN' : 'SUFFIX_EQUALS_SIGN'
    }
  }),

  JsdocTypeNullable:(result, transform) => ({
    type: 'JNULLABLE',
    value: transform(result.element),
    meta: {
      syntax: result.meta.position === 'PREFIX' ? 'PREFIX_QUESTION_MARK' : 'SUFFIX_QUESTION_MARK'
    }
  }),

  JsdocTypeNotNullable:(result, transform) => ({
    type: 'JNOT_NULLABLE',
    value: transform(result.element),
    meta: {
      syntax: result.meta.position === 'PREFIX' ? 'PREFIX_BANG' : 'SUFFIX_BANG'
    }
  }),

  JsdocTypeVariadic: (result, transform) => {
    const transformed: JtpVariadicResult = {
      type: 'JVARIADIC',
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

  JsdocTypeName: result => ({
    type: 'JNAME',
    name: result.value
  }),

  JsdocTypeTypeof: (result, transform) => ({
    type: 'JTYPE_QUERY',
    name: transform(result.element)
  }),

  JsdocTypeTuple: (result, transform) => ({
    type: 'JTUPLE',
    entries: result.elements.map(transform)
  }),

  JsdocTypeKeyof: (result, transform) => ({
    type: 'JKEY_QUERY',
    value: transform(result.element)
  }),

  JsdocTypeImport: result => ({
    type: 'JIMPORT',
    path: {
      type: 'JSTRING_VALUE',
      quoteStyle: getQuoteStyle(result.element.meta.quote),
      string: result.element.value
    }
  }),

  JsdocTypeUndefined: () => ({
    type: 'JNAME',
    name: 'undefined'
  }),

  JsdocTypeAny: () => ({
    type: 'JANY'
  }),

  JsdocTypeFunction: (result, transform) => {
    const specialParams = extractSpecialParams(result)

    const transformed: JtpFunctionResult = {
      type: result.arrow ? 'JARROW' : 'JFUNCTION',
      params: specialParams.params.map(param => {
        if (param.type === 'JsdocTypeKeyValue') {
          if (param.right === undefined) {
            throw new Error('Function parameter without \':\' is not expected to be \'KEY_VALUE\'')
          }
          return {
            type: 'JNAMED_PARAMETER',
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

  JsdocTypeGeneric: (result, transform) => {
    const transformed: JtpGenericResult = {
      type: 'JGENERIC',
      subject: transform(result.left),
      objects: result.elements.map(transform),
      meta: {
        syntax: result.meta.brackets === '[]' ? 'SQUARE_BRACKET' : result.meta.dot ? 'ANGLE_BRACKET_WITH_DOT' : 'ANGLE_BRACKET'
      }
    }

    if (result.meta.brackets === '[]' && result.elements[0].type === 'JsdocTypeFunction' && !result.elements[0].parenthesis) {
      transformed.objects[0] = {
        type: 'JNAME',
        name: 'function'
      }
    }

    return transformed
  },

  JsdocTypeKeyValue: (result, transform) => {
    if ('left' in result) {
      throw new Error('Keys may not be typed in jsdoctypeparser.')
    }

    if (result.right === undefined) {
      return {
        type: 'JRECORD_ENTRY',
        key: result.value.toString(),
        quoteStyle: getQuoteStyle(result.meta.quote),
        value: null,
        readonly: false
      }
    }

    let right = transform(result.right)
    if (result.optional) {
      right = {
        type: 'JOPTIONAL',
        value: right,
        meta: {
          syntax: 'SUFFIX_KEY_QUESTION_MARK'
        }
      }
    }

    return {
      type: 'JRECORD_ENTRY',
      key: result.value.toString(),
      quoteStyle: getQuoteStyle(result.meta.quote),
      value: right,
      readonly: false
    }
  },

  JsdocTypeObject: (result, transform) => {
    const entries: JtpRecordEntryResult[] = []
    for (const field of result.elements) {
      if (field.type === 'JsdocTypeKeyValue') {
        entries.push(transform(field) as JtpRecordEntryResult)
      }
    }
    return {
      type: 'JRECORD',
      entries
    }
  },

  JsdocTypeSpecialNamePath: result => {
    if (result.specialType !== 'module') {
      throw new Error(`jsdoctypeparser does not support type ${result.specialType} at this point.`)
    }
    return {
      type: 'JMODULE',
      value: {
        type: 'JFILE_PATH',
        quoteStyle: getQuoteStyle(result.meta.quote),
        path: result.value
      }
    }
  },

  JsdocTypeNamePath: (result, transform) => {
    let hasEventPrefix = false
    let name
    let quoteStyle
    if (result.right.type === 'JsdocTypeSpecialNamePath' && result.right.specialType === 'event') {
      hasEventPrefix = true
      name = result.right.value
      quoteStyle = getQuoteStyle(result.right.meta.quote)
    } else {
      name = `${result.right.value}`
      quoteStyle = result.right.type === 'JsdocTypeStringValue' ? getQuoteStyle(result.right.meta.quote) : 'none'
    }

    const transformed: JtpMemberResult = {
      type: getMemberType(result.pathType),
      owner: transform(result.left),
      name,
      quoteStyle,
      hasEventPrefix
    }

    if (transformed.owner.type === 'JMODULE') {
      const tModule = transformed.owner
      transformed.owner = transformed.owner.value
      tModule.value = transformed
      return tModule
    } else {
      return transformed
    }
  },

  JsdocTypeUnion: (result, transform) => nestResults('JUNION', result.elements.map(transform)),

  JsdocTypeParenthesis: (result, transform) => ({
    type: 'JPARENTHESIS',
    value: transform(assertTerminal(result.element))
  }),

  JsdocTypeNull: () => ({
    type: 'JNAME',
    name: 'null'
  }),

  JsdocTypeUnknown: () => ({
    type: 'JUNKNOWN'
  }),

  JsdocTypeStringValue: result => ({
    type: 'JSTRING_VALUE',
    quoteStyle: getQuoteStyle(result.meta.quote),
    string: result.value
  }),

  JsdocTypeIntersection: (result, transform) => nestResults('JINTERSECTION', result.elements.map(transform)),

  JsdocTypeNumber: notAvailableTransform,
  JsdocTypeSymbol: notAvailableTransform
}

export function jtpTransform (result: TerminalResult): JtpResult {
  return transform(jtpRules, result)
}

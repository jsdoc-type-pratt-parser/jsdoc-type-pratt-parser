import { extractSpecialParams, notAvailableTransform, transform, TransformRules } from './transform'
import { assertTerminal } from '../assertTypes'
import { TerminalResult } from '../result/TerminalResult'

export const reservedWords = [
  'null',
  'true',
  'false',
  'break',
  'case',
  'catch',
  'class',
  'const',
  'continue',
  'debugger',
  'default',
  'delete',
  'do',
  'else',
  'export',
  'extends',
  'finally',
  'for',
  'function',
  'if',
  'import',
  'in',
  'instanceof',
  'new',
  'return',
  'super',
  'switch',
  'this',
  'throw',
  'try',
  'typeof',
  'var',
  'void',
  'while',
  'with',
  'yield'
]

interface ModifiableResult {
  optional?: boolean
  nullable?: boolean
  repeatable?: boolean
}

export type CatharsisParseResult =
  CatharsisNameResult
  | CatharsisUnionResult
  | CatharsisGenericResult
  | CatharsisNullResult
  | CatharsisUndefinedResult
  | CatharsisAllResult
  | CatharsisUnknownResult
  | CatharsisFunctionResult
  | CatharsisRecordResult
  | CatharsisFieldResult

export type CatharsisNameResult = ModifiableResult & {
  type: 'NameExpression'
  name: string
  reservedWord?: boolean
}

export type CatharsisUnionResult = ModifiableResult & {
  type: 'TypeUnion'
  elements: CatharsisParseResult[]
}

export type CatharsisGenericResult = ModifiableResult & {
  type: 'TypeApplication'
  expression: CatharsisParseResult
  applications: CatharsisParseResult[]
}

export type CatharsisNullResult = ModifiableResult & {
  type: 'NullLiteral'
}

export type CatharsisUndefinedResult = ModifiableResult & {
  type: 'UndefinedLiteral'
}

export type CatharsisAllResult = ModifiableResult & {
  type: 'AllLiteral'
}

export type CatharsisUnknownResult = ModifiableResult & {
  type: 'UnknownLiteral'
}

export type CatharsisFunctionResult = ModifiableResult & {
  type: 'FunctionType'
  params: CatharsisParseResult[]
  result?: CatharsisParseResult
  this?: CatharsisParseResult
  new?: CatharsisParseResult
}

export type CatharsisFieldResult = ModifiableResult & {
  type: 'FieldType'
  key: CatharsisParseResult
  value: CatharsisParseResult | undefined
}

export type CatharsisRecordResult = ModifiableResult & {
  type: 'RecordType'
  fields: CatharsisFieldResult[]
}

function makeName (value: string): CatharsisNameResult {
  const result: CatharsisNameResult = {
    type: 'NameExpression',
    name: value
  }
  if (reservedWords.includes(value)) {
    result.reservedWord = true
  }
  return result
}

const catharsisTransformRules: TransformRules<CatharsisParseResult> = {
  OPTIONAL: (result, transform) => {
    const transformed = transform(result.element)
    transformed.optional = true
    return transformed
  },

  NULLABLE: (result, transform) => {
    const transformed = transform(result.element)
    transformed.nullable = true
    return transformed
  },

  NOT_NULLABLE: (result, transform) => {
    const transformed = transform(result.element)
    transformed.nullable = false
    return transformed
  },

  VARIADIC: (result, transform) => {
    if (result.element === undefined) {
      throw new Error('dots without value are not allowed in catharsis mode')
    }
    const transformed = transform(result.element)
    transformed.repeatable = true
    return transformed
  },

  ANY: () => ({
    type: 'AllLiteral'
  }),

  NULL: () => ({
    type: 'NullLiteral'
  }),

  STRING_VALUE: result => makeName(`${result.meta.quote}${result.value}${result.meta.quote}`),

  UNDEFINED: () => ({
    type: 'UndefinedLiteral'
  }),

  UNKNOWN: () => ({
    type: 'UnknownLiteral'
  }),

  FUNCTION: (result, transform) => {
    const params = extractSpecialParams(result)

    const transformed: CatharsisFunctionResult = {
      type: 'FunctionType',
      params: params.params.map(transform)
    }

    if (params.this !== undefined) {
      transformed.this = transform(params.this)
    }

    if (params.new !== undefined) {
      transformed.new = transform(params.new)
    }

    if (result.returnType !== undefined) {
      transformed.result = transform(result.returnType)
    }

    return transformed
  },

  GENERIC: (result, transform) => ({
    type: 'TypeApplication',
    applications: result.elements.map(o => transform(o)),
    expression: transform(result.left)
  }),

  SPECIAL_NAME_PATH: result => {
    const quote = result.meta.quote ?? ''
    return makeName(result.specialType + ':' + quote + result.value + quote)
  },

  NAME: result => makeName(result.value),

  NUMBER: result => makeName(result.value.toString()),

  OBJECT: (result, transform) => {
    const transformed: CatharsisRecordResult = {
      type: 'RecordType',
      fields: []
    }
    for (const field of result.elements) {
      if (field.type !== 'KEY_VALUE') {
        transformed.fields.push({
          type: 'FieldType',
          key: transform(field),
          value: undefined
        })
      } else {
        transformed.fields.push(transform(field) as unknown as CatharsisFieldResult)
      }
    }

    return transformed
  },

  UNION: (result, transform) => ({
    type: 'TypeUnion',
    elements: result.elements.map(e => transform(e))
  }),

  KEY_VALUE: (result, transform) => {
    if ('value' in result) {
      return {
        type: 'FieldType',
        key: makeName(`${result.meta.quote ?? ''}${result.value}${result.meta.quote ?? ''}`),
        value: result.right === undefined ? undefined : transform(result.right)
      }
    } else {
      return {
        type: 'FieldType',
        key: transform(result.left),
        value: transform(result.right)
      }
    }
  },

  NAME_PATH: (result, transform) => {
    const leftResult = transform(result.left) as CatharsisNameResult
    const rightResult = transform(result.right) as CatharsisNameResult

    return makeName(`${leftResult.name}${result.pathType}${rightResult.name}`)
  },

  SYMBOL: result => {
    let value = ''

    let element = result.element
    let trailingDots = false

    if (element?.type === 'VARIADIC') {
      if (element.meta.position === 'PREFIX') {
        value = '...'
      } else {
        trailingDots = true
      }
      element = element.element
    }

    if (element?.type === 'NAME') {
      value += element.value
    } else if (element?.type === 'NUMBER') {
      value += element.value.toString()
    }

    if (trailingDots) {
      value += '...'
    }

    return makeName(`${result.value}(${value})`)
  },

  PARENTHESIS: (result, transform) => transform(assertTerminal(result.element)),

  IMPORT: notAvailableTransform,
  KEY_OF: notAvailableTransform,
  TUPLE: notAvailableTransform,
  TYPE_OF: notAvailableTransform,
  INTERSECTION: notAvailableTransform
}

export function catharsisTransform (result: TerminalResult): CatharsisParseResult {
  return transform(catharsisTransformRules, result)
}

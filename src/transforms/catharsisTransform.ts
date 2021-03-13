import { ModifiableResult, NameResult, NonTerminalResult, ParseResult } from '../ParseResult'
import { transform, TransformRules } from './transform'

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

function applyModifiers (target: CatharsisParseResult, source: ModifiableResult): CatharsisParseResult {
  if (source.nullable !== undefined) {
    target.nullable = source.nullable
  }
  if (source.optional !== undefined) {
    target.optional = source.optional
  }
  if (source.repeatable !== undefined) {
    target.repeatable = source.repeatable
  }
  return target
}

const catharsisTransformRules: TransformRules<CatharsisParseResult> = {
  'ALL': result => applyModifiers({
    type: 'AllLiteral'
  }, result),

  'NULL': result => applyModifiers({
    type: 'NullLiteral'
  }, result),

  'STRING_VALUE': result => applyModifiers({
    type: 'NameExpression',
    name: `${result.quote}${result.value}${result.quote}`
  }, result),

  'UNDEFINED': result => applyModifiers({
    type: 'UndefinedLiteral'
  }, result),

  'UNKNOWN': result => applyModifiers({
    type: 'UnknownLiteral'
  }, result),

  'FUNCTION': (result, transform) => {
    const transformed: CatharsisFunctionResult = {
      type: 'FunctionType',
      params: []
    }

    for (const param of result.parameters) {
      if (param.type === 'KEY_VALUE' && param.key.type === 'NAME') {
        if (param.key.name === 'this') {
          transformed.this = transform(param.value)
        }
        if (param.key.name === 'new') {
          transformed.new = transform(param.value)
        }
      } else {
        transformed.params.push(transform(param))
      }
    }

    if (result.returnType !== undefined) {
      transformed.result = transform(result.returnType)
    }

    return applyModifiers(transformed, result)
  },

  'GENERIC': (result, transform) => applyModifiers({
    type: 'TypeApplication',
    applications: result.objects.map(o => transform(o)),
    expression: transform(result.subject)
  }, result),

  'MODULE': result => applyModifiers({
    type: 'NameExpression',
    name: result.path
  }, result),

  'NAME': result => applyModifiers({
    type: 'NameExpression',
    name: result.name
  }, result),

  'NUMBER': result => applyModifiers({
    type: 'NameExpression',
    name: result.value.toString()
  }, result),

  'RECORD': (result, transform) => {
    const transformed: CatharsisRecordResult = {
      type: 'RecordType',
      fields: []
    }
    for (const field of result.fields) {
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

    return applyModifiers(transformed, result)
  },

  'UNION': (result, transform) => applyModifiers({
    type: 'TypeUnion',
    elements: result.elements.map(e => transform(e))
  }, result),

  'KEY_VALUE': (result, transform) => applyModifiers({
    type: 'FieldType',
    key: transform(result.key),
    value: transform(result.value)
  }, result),

  'PROPERTY_PATH': result => {
    if (result.left.type !== 'NAME') {
      // TODO: here a string representations should be used
      throw new Error('Other left types than \'NAME\' are not supported for catharsis compat mode')
    }

    return applyModifiers({
      type: 'NameExpression',
      name: result.left.name + '.' + result.path.join('.')
    }, result)
  },

  'SYMBOL': result => {
    let value = result.name + '('
    if (result.value?.repeatable === true) {
      value = '...'
    }

    if (result.value?.type === 'NAME') {
      value += result.value.name
    } else if (result.value?.type === 'NUMBER') {
      value += result.value.value.toString()
    }

    return applyModifiers({
      type: 'NameExpression',
      name: `${result.name}(${value})`
    }, result)
  }
}

export function catharsisTransform(result: ParseResult): CatharsisParseResult {
  return transform(catharsisTransformRules, result)
}

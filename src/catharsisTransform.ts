import { ModifiableResult, NonTerminalResult } from './ParseResult'

/**
 * @internal
 */
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

/**
 * @internal
 */
export type CatharsisParseResultType = CatharsisParseResult['type'] | CatharsisFieldResult['type']

/**
 * @internal
 */
export type CatharsisNameResult = ModifiableResult & {
  type: 'NameExpression'
  name: string
  reservedWord?: boolean
}

/**
 * @internal
 */
export type CatharsisUnionResult = ModifiableResult & {
  type: 'TypeUnion'
  elements: CatharsisParseResult[]
}

/**
 * @internal
 */
export type CatharsisGenericResult = ModifiableResult & {
  type: 'TypeApplication'
  expression: CatharsisParseResult
  applications: CatharsisParseResult[]
}

/**
 * @internal
 */
export type CatharsisNullResult = ModifiableResult & {
  type: 'NullLiteral'
}

/**
 * @internal
 */
export type CatharsisUndefinedResult = ModifiableResult & {
  type: 'UndefinedLiteral'
}

/**
 * @internal
 */
export type CatharsisAllResult = ModifiableResult & {
  type: 'AllLiteral'
}

/**
 * @internal
 */
export type CatharsisUnknownResult = ModifiableResult & {
  type: 'UnknownLiteral'
}

/**
 * @internal
 */
export type CatharsisFunctionResult = ModifiableResult & {
  type: 'FunctionType'
  params: CatharsisParseResult[]
  result?: CatharsisParseResult
  this?: CatharsisParseResult
  new?: CatharsisParseResult
}

/**
 * @internal
 */
export type CatharsisFieldResult = ModifiableResult & {
  type: 'FieldType'
  key: CatharsisNameResult
  value: CatharsisParseResult | undefined
}

/**
 * @internal
 */
export type CatharsisRecordResult = ModifiableResult & {
  type: 'RecordType'
  fields: CatharsisFieldResult[]
}

/**
 * @internal
 */
export function catharsisTransform (object: NonTerminalResult): CatharsisParseResult {
  const newObject: any = Object.assign({}, object)
  let value
  switch (object.type) {
    case 'ALL':
      newObject.type = 'AllLiteral'
      break
    case 'NULL':
      newObject.type = 'NullLiteral'
      break
    case 'STRING_VALUE':
      newObject.type = 'NameExpression'
      delete newObject.value
      delete newObject.quote
      newObject.name = `${object.quote}${object.value}${object.quote}`
      break
    case 'UNDEFINED':
      newObject.type = 'UndefinedLiteral'
      break
    case 'UNKNOWN':
      newObject.type = 'UnknownLiteral'
      break
    case 'FUNCTION':
      newObject.type = 'FunctionType'
      delete newObject.parameters
      newObject.params = object.parameters.filter(p => {
        if (p.type === 'KEY_VALUE' && p.key.type === 'NAME') {
          if (p.key.name === 'this') {
            newObject.this = catharsisTransform(p.value)
            return false
          }
          if (p.key.name === 'new') {
            newObject.new = catharsisTransform(p.value)
            return false
          }
        }
        return true
      }).map(catharsisTransform)
      if (object.returnType !== undefined) {
        delete newObject.returnType
        newObject.result = catharsisTransform(object.returnType)
      }
      break
    case 'GENERIC':
      newObject.type = 'TypeApplication'
      delete newObject.objects
      newObject.applications = object.objects.map(catharsisTransform)
      delete newObject.subject
      newObject.expression = catharsisTransform(object.subject)
      break
    case 'MODULE':
      newObject.type = 'NameExpression'
      delete newObject.path
      newObject.name = object.path
      break
    case 'NAME':
      newObject.type = 'NameExpression'
      break
    case 'NUMBER':
      newObject.type = 'NameExpression'
      delete newObject.value
      newObject.name = object.value.toString(10)
      break
    case 'RECORD':
      newObject.type = 'RecordType'
      newObject.fields = object.fields.map(field => {
        if (field.type !== 'KEY_VALUE') {
          return {
            type: 'FieldType',
            key: catharsisTransform(field),
            value: undefined
          }
        } else {
          return catharsisTransform(field)
        }
      })
      break
    case 'UNION':
      newObject.type = 'TypeUnion'
      newObject.elements = object.elements.map(catharsisTransform)
      break
    case 'KEY_VALUE':
      newObject.type = 'FieldType'
      newObject.key = catharsisTransform(object.key)
      if (object.value !== undefined) {
        newObject.value = catharsisTransform(object.value)
      }
      break
    case 'PROPERTY_PATH':
      newObject.type = 'NameExpression'
      if (object.left.type !== 'NAME') {
        throw new Error('Other left types than \'NAME\' are not supported for catharsis compat mode')
      }
      delete newObject.left
      delete newObject.path
      newObject.name = object.left.name + '.' + object.path.join('.')
      break
    case 'SYMBOL':
      newObject.type = 'NameExpression'
      delete newObject.value
      value = ''
      if (object.value?.repeatable === true) {
        value = '...'
      }
      if (object.value?.type === 'NAME') {
        value += object.value.name
      } else if (object.value?.type === 'NUMBER') {
        value += object.value.value.toString(10)
      }
      newObject.name = `${object.name}(${value})`
      break
  }

  return newObject
}

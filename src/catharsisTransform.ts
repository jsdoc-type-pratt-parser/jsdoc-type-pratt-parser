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
      newObject.params = object.parameters.map(catharsisTransform)
      if (object.returnType !== undefined) {
        delete newObject.returnType
        newObject.result = catharsisTransform(object.returnType)
      }
      if (object.thisType !== undefined) {
        delete newObject.thisType
        newObject.this = catharsisTransform(object.thisType)
      }
      if (object.newType !== undefined) {
        delete newObject.newType
        newObject.new = catharsisTransform(object.newType)
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
    case 'RECORD':
      newObject.type = 'RecordType'
      newObject.fields = object.fields.map(catharsisTransform)
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
      newObject.name = `${object.name}(${object.value ?? ''})`
      break
  }

  return newObject
}

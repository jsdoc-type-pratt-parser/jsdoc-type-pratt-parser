import { FieldResult, ModifiableResult, ParseResult } from './ParseResult'

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

export type CatharsisParseResultType = CatharsisParseResult['type'] | CatharsisFieldResult['type']

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
  key: CatharsisNameResult
  value: CatharsisParseResult | undefined
}

export type CatharsisRecordResult = ModifiableResult & {
  type: 'RecordType'
  fields: CatharsisFieldResult[]
}

export function catharsisTransform (object: ParseResult|FieldResult): CatharsisParseResult {
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
    case 'FIELD':
      newObject.type = 'FieldType'
      newObject.key = catharsisTransform(object.key)
      if (object.value !== undefined) {
        newObject.value = catharsisTransform(object.value)
      }
      break
    case 'PROPERTY_PATH':
      newObject.type = 'NameExpression'
      delete newObject.path
      newObject.name = object.path.join('.')
      break
    case 'SYMBOL':
      newObject.type = 'NameExpression'
      delete newObject.value
      newObject.name = `${object.name}(${object.value ?? ''})`
      break
  }

  return newObject
}

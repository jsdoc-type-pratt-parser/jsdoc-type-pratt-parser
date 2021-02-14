export type ParseResult =
  NameResult
  | UnionResult
  | GenericResult
  | StringValueResult
  | NullResult
  | UndefinedResult
  | AllResult
  | UnknownResult
  | FunctionResult
  | RecordResult
  | ModuleResult
  | PropertyPathResult
  | SymbolResult

export type ParseResultType = ParseResult['type'] | FieldResult['type']

export interface ModifiableResult {
  optional?: boolean
  nullable?: boolean
  repeatable?: boolean
}

export type NameResult = ModifiableResult & {
  type: 'NAME'
  name: string
  reservedWord?: boolean
}

export type UnionResult = ModifiableResult & {
  type: 'UNION'
  elements: ParseResult[]
}

export type GenericResult = ModifiableResult & {
  type: 'GENERIC'
  subject: ParseResult
  objects: ParseResult[]
}

export type StringValueResult = ModifiableResult & {
  type: 'STRING_VALUE'
  value: string
  quote: string
}

export type NullResult = ModifiableResult & {
  type: 'NULL'
}

export type UndefinedResult = ModifiableResult & {
  type: 'UNDEFINED'
}

export type AllResult = ModifiableResult & {
  type: 'ALL'
}

export type UnknownResult = ModifiableResult & {
  type: 'UNKNOWN'
}

export type FunctionResult = ModifiableResult & {
  type: 'FUNCTION'
  parameters: ParseResult[]
  returnType?: ParseResult
  thisType?: ParseResult
  newType?: ParseResult
}

export type FieldResult = ModifiableResult & {
  type: 'FIELD'
  key: NameResult
  value: ParseResult | undefined
}

export type RecordResult = ModifiableResult & {
  type: 'RECORD'
  fields: FieldResult[]
}

export type ModuleResult = ModifiableResult & {
  type: 'MODULE'
  path: string
}

export type PropertyPathResult = ModifiableResult & {
  type: 'PROPERTY_PATH'
  path: string[]
}

export type NumberResult = ModifiableResult & {
  type: 'NUMBER'
  value: number
}

export type SymbolResult = ModifiableResult & {
  type: 'SYMBOL'
  name: string
  value?: string
}

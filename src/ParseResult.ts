/**
 * A parse result that corresponds to a valid type expression.
 */
export type ParseResult =
  NameResult
  | UnionResult
  | GenericResult
  | StringValueResult
  | NullResult
  | UndefinedResult
  | AnyResult
  | UnknownResult
  | FunctionResult
  | ObjectResult
  | NamePathResult
  | SymbolResult
  | TypeOfResult
  | KeyOfResult
  | ImportResult
  | TupleResult
  | SpecialNamePath
  | OptionalResult<ParseResult>
  | NullableResult<ParseResult>
  | NotNullableResult<ParseResult>
  | VariadicResult<ParseResult>
  | ParenthesisResult
  | IntersectionResult

/**
 * A parse sub result that might not be a valid type expression on its own.
 */
export type NonTerminalResult =
  ParseResult
  | KeyValueResult
  | JsdocObjectKeyValueResult
  | NumberResult

/**
 * `element` is optional.
 */
export interface OptionalResult<T extends ParseResult> {
  type: 'OPTIONAL'
  element: T
  meta: {
    position: 'PREFIX' | 'SUFFIX'
  }
}

/**
 * `element` is nullable.
 */
export interface NullableResult<T extends ParseResult> {
  type: 'NULLABLE'
  element: T
  meta: {
    position: 'PREFIX' | 'SUFFIX'
  }
}

/**
 * `element` is not nullable.
 */
export interface NotNullableResult<T extends ParseResult> {
  type: 'NOT_NULLABLE'
  element: T
  meta: {
    position: 'PREFIX' | 'SUFFIX'
  }
}

/**
 * `element` is a rest parameter.
 */
export interface VariadicResult<T extends ParseResult> {
  type: 'VARIADIC'
  element?: T
  meta: {
    position: 'PREFIX' | 'SUFFIX' | 'ONLY_DOTS'
    squareBrackets: boolean
  }
}

/**
 * Is a type name.
 */
export interface NameResult {
  type: 'NAME'
  value: string
  meta: {
    reservedWord: boolean
  }
}

/**
 * Is a type union of `elements`.
 */
export interface UnionResult {
  type: 'UNION'
  elements: ParseResult[]
}

/**
 * `left` is a generic type that has `elements` as type values for its type parameters.
 * Array types that are written as `Type[]` always have the name `Array` as the `left` type and `elements` will contain
 * only one element (in this case the name `Type`). To differentiate `Type[]` and `Array<Type>` there is the meta property
 * `brackets`.
 */
export interface GenericResult {
  type: 'GENERIC'
  left: ParseResult
  elements: ParseResult[]
  meta: {
    brackets: '<>' | '[]'
    dot: boolean
  }
}

/**
 * A string value as a type.
 */
export interface StringValueResult {
  type: 'STRING_VALUE'
  value: string
  meta: {
    quote: '\'' | '"'
  }
}

/**
 * Is `null`.
 */
export interface NullResult {
  type: 'NULL'
}

/**
 * Is `undefined`.
 */
export interface UndefinedResult {
  type: 'UNDEFINED'
}

/**
 * An any result that is represented by `*`.
 */
export interface AnyResult {
  type: 'ANY'
}

/**
 * An unknown result that is represented by `?`.
 */
export interface UnknownResult {
  type: 'UNKNOWN'
}

/**
 * Is a function. Has `parameters` which can be named, if the grammar supports it. Some grammars only allow named
 * `this` and `new` parameters. Named parameters are returned as {@link KeyValueResult}s. It can have a `returnType`.
 * It can be a normal function type or an arrow, which is indicated by `arrow`. If `parenthesis` is false, it is any
 * kind of function without specified parameters or return type.
 */
export interface FunctionResult {
  type: 'FUNCTION'
  parameters: Array<ParseResult | KeyValueResult>
  returnType?: ParseResult
  arrow: boolean
  parenthesis: boolean
}

/**
 * A key value pair represented by a `:`. Can occur as a named parameter of a {@link FunctionResult} or as an entry for
 * an {@link ObjectResult}. Is a {@link NonTerminalResult}.
 */
export interface KeyValueResult {
  type: 'KEY_VALUE'
  value: string
  right: ParseResult | undefined
  optional: boolean
  meta: {
    quote: '\'' | '"' | undefined
  }
}

export interface JsdocObjectKeyValueResult {
  type: 'JSDOC_OBJECT_KEY_VALUE'
  left: ParseResult
  right: ParseResult
}

/**
 * An object. Contains entries which can be {@link KeyValueResult}s or {@link NameResult}s. In most grammars the keys
 * need to be {@link NameResult}s. In some grammars it possible that an entry is only a {@link ParseResult} or a
 * {@link NumberResult} without a key.
 */
export interface ObjectResult {
  type: 'OBJECT'
  elements: Array<KeyValueResult | JsdocObjectKeyValueResult>
}

/**
 * A module. Often this is a `left` type of a {@link NamePathResult}.
 */
export interface SpecialNamePath<Type = 'module' | 'event' | 'external'> {
  type: 'SPECIAL_NAME_PATH'
  value: string
  specialType: Type
  meta: {
    quote: '\'' | '"' | undefined
  }
}

/**
 * A name path. This can be a property path separated by `.` or an inner or static member (`~`, `#`).
 */
export interface NamePathResult {
  type: 'NAME_PATH'
  left: ParseResult
  right: NameResult | NumberResult | StringValueResult | SpecialNamePath<'event'>
  pathType: '~' | '#' | '.'
}

/**
 * A number. Can be the key of an {@link ObjectResult} entry or the parameter of a {@link SymbolResult}.
 * Is a {@link NonTerminalResult}.
 */
export interface NumberResult {
  type: 'NUMBER'
  value: number
}

/**
 * A symbol.
 */
export interface SymbolResult {
  type: 'SYMBOL'
  value: string
  element?: NumberResult | NameResult | VariadicResult<NameResult>
}

/**
 * A typeof. The `element` normally should be a name.
 */
export interface TypeOfResult {
  type: 'TYPE_OF'
  element: ParseResult
}

/**
 * A keyof. The `element` normally should be a name.
 */
export interface KeyOfResult {
  type: 'KEY_OF'
  element: ParseResult
}

/**
 * An import. The `element` is {@link StringValueResult} representing the path. Often the `left` side of an
 * {@link NamePathResult}.
 */
export interface ImportResult {
  type: 'IMPORT'
  element: StringValueResult
}

/**
 * A tuple containing multiple `elements`.
 */
export interface TupleResult {
  type: 'TUPLE'
  elements: ParseResult[]
}

/**
 * An `element` that is enclosed in parenthesis. Often {@link UnionResult}s.
 */
export interface ParenthesisResult {
  type: 'PARENTHESIS'
  element: ParseResult
}

/**
 * An intersection.
 */
export interface IntersectionResult {
  type: 'INTERSECTION'
  elements: ParseResult[]
}

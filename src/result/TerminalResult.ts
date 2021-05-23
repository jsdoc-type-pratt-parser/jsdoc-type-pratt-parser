import { JsdocObjectKeyValueResult, KeyValueResult, NumberResult } from './NonTerminalResult'

/**
 * A parse result that corresponds to a valid type expression.
 */
export type TerminalResult =
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
  | OptionalResult<TerminalResult>
  | NullableResult<TerminalResult>
  | NotNullableResult<TerminalResult>
  | VariadicResult<TerminalResult>
  | ParenthesisResult
  | IntersectionResult

/**
 * `element` is optional.
 */
export interface OptionalResult<T extends TerminalResult> {
  type: 'JsdocTypeOptional'
  element: T
  meta: {
    position: 'prefix' | 'suffix'
  }
}

/**
 * `element` is nullable.
 */
export interface NullableResult<T extends TerminalResult> {
  type: 'JsdocTypeNullable'
  element: T
  meta: {
    position: 'prefix' | 'suffix'
  }
}

/**
 * `element` is not nullable.
 */
export interface NotNullableResult<T extends TerminalResult> {
  type: 'JsdocTypeNotNullable'
  element: T
  meta: {
    position: 'prefix' | 'suffix'
  }
}

/**
 * `element` is a rest parameter or a spreaded value.
 */
export interface VariadicResult<T extends TerminalResult> {
  type: 'JsdocTypeVariadic'
  element?: T
  meta: {
    position: 'prefix' | 'suffix' | undefined
    squareBrackets: boolean
  }
}

/**
 * Is a type name.
 */
export interface NameResult {
  type: 'JsdocTypeName'
  value: string
}

/**
 * Is a type union of `elements`.
 */
export interface UnionResult {
  type: 'JsdocTypeUnion'
  elements: TerminalResult[]
}

/**
 * `left` is a generic type that has `elements` as type values for its type parameters.
 * Array types that are written as `Type[]` always have the name `Array` as the `left` type and `elements` will contain
 * only one element (in this case the name `Type`). To differentiate `Type[]` and `Array<Type>` there is the meta property
 * `brackets`.
 */
export interface GenericResult {
  type: 'JsdocTypeGeneric'
  left: TerminalResult
  elements: TerminalResult[]
  meta: {
    brackets: 'angle' | 'square'
    dot: boolean
  }
}

/**
 * A string value as a type.
 */
export interface StringValueResult {
  type: 'JsdocTypeStringValue'
  value: string
  meta: {
    quote: 'single' | 'double'
  }
}

/**
 * Is `null`.
 */
export interface NullResult {
  type: 'JsdocTypeNull'
}

/**
 * Is `undefined`.
 */
export interface UndefinedResult {
  type: 'JsdocTypeUndefined'
}

/**
 * An any result that is represented by `*`.
 */
export interface AnyResult {
  type: 'JsdocTypeAny'
}

/**
 * An unknown result that is represented by `?`.
 */
export interface UnknownResult {
  type: 'JsdocTypeUnknown'
}

/**
 * Is a function. Has `parameters` which can be named, if the grammar supports it. Some grammars only allow named
 * `this` and `new` parameters. Named parameters are returned as {@link KeyValueResult}s. It can have a `returnType`.
 * It can be a normal function type or an arrow, which is indicated by `arrow`. If `parenthesis` is false, it is any
 * kind of function without specified parameters or return type.
 */
export interface FunctionResult {
  type: 'JsdocTypeFunction'
  parameters: Array<TerminalResult | KeyValueResult>
  returnType?: TerminalResult
  arrow: boolean
  parenthesis: boolean
}

/**
 * An object. Contains entries which can be {@link KeyValueResult}s or {@link NameResult}s. In most grammars the keys
 * need to be {@link NameResult}s. In some grammars it possible that an entry is only a {@link TerminalResult} or a
 * {@link NumberResult} without a key.
 */
export interface ObjectResult {
  type: 'JsdocTypeObject'
  elements: Array<KeyValueResult | JsdocObjectKeyValueResult>
}

/**
 * A module. Often this is a `left` type of a {@link NamePathResult}.
 */
export interface SpecialNamePath<Type = 'module' | 'event' | 'external'> {
  type: 'JsdocTypeSpecialNamePath'
  value: string
  specialType: Type
  meta: {
    quote: 'single' | 'double' | undefined
  }
}

/**
 * A name path. This can be a property path separated by `.` or an inner or static member (`~`, `#`).
 */
export interface NamePathResult {
  type: 'JsdocTypeNamePath'
  left: TerminalResult
  right: NameResult | NumberResult | StringValueResult | SpecialNamePath<'event'>
  pathType: 'inner' | 'instance' | 'property'
}

/**
 * A symbol.
 */
export interface SymbolResult {
  type: 'JsdocTypeSymbol'
  value: string
  element?: NumberResult | NameResult | VariadicResult<NameResult>
}

/**
 * A typeof. The `element` normally should be a name.
 */
export interface TypeOfResult {
  type: 'JsdocTypeTypeof'
  element: TerminalResult
}

/**
 * A keyof. The `element` normally should be a name.
 */
export interface KeyOfResult {
  type: 'JsdocTypeKeyof'
  element: TerminalResult
}

/**
 * An import. The `element` is {@link StringValueResult} representing the path. Often the `left` side of an
 * {@link NamePathResult}.
 */
export interface ImportResult {
  type: 'JsdocTypeImport'
  element: StringValueResult
}

/**
 * A tuple containing multiple `elements`.
 */
export interface TupleResult {
  type: 'JsdocTypeTuple'
  elements: TerminalResult[]
}

/**
 * An `element` that is enclosed in parenthesis. Often {@link UnionResult}s.
 */
export interface ParenthesisResult {
  type: 'JsdocTypeParenthesis'
  element: TerminalResult
}

/**
 * An intersection.
 */
export interface IntersectionResult {
  type: 'JsdocTypeIntersection'
  elements: TerminalResult[]
}

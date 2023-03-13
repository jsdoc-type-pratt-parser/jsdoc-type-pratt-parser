import {
  QuoteStyle,
  RootResult
} from './RootResult'

/**
 * A parse sub result that might not be a valid type expression on its own.
 */
export type NonRootResult =
  RootResult
  | PropertyResult
  | ObjectFieldResult
  | JsdocObjectFieldResult
  | KeyValueResult

export interface ObjectFieldResult {
  type: 'JsdocTypeObjectField'
  key: string
  right: RootResult | undefined
  optional: boolean
  readonly: boolean
  variadic: boolean
  meta: {
    quote: QuoteStyle | undefined
  }
}

export interface JsdocObjectFieldResult {
  type: 'JsdocTypeJsdocObjectField'
  left: RootResult
  right: RootResult
}

export interface PropertyResult {
  type: 'JsdocTypeProperty'
  value: string
  meta: {
    quote: QuoteStyle | undefined
  }
}

/**
 * A key value pair represented by a `:`. Can occur as a named parameter of a {@link FunctionResult} or as an entry for
 * an {@link ObjectResult}. Is a {@link NonRootResult}. {@link JsdocObjectKeyValueResult} uses the same type name
 * and will not have a `value` property.
 */
export interface KeyValueResult {
  type: 'JsdocTypeKeyValue'
  key: string
  right: RootResult | undefined
  optional: boolean
  variadic: boolean
}

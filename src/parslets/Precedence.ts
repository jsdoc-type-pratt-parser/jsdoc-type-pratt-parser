// higher precedence = higher importance
export enum Precedence {
  PARENTHESIS = 1,
  UNION,
  PREFIX,
  POSTFIX,
  PARAMETER_LIST,
  RECORD,
  SYMBOL,
  OPTIONAL,
  NULLABLE,
  KEY_VALUE,
  GENERIC,
  PROPERTY_PATH,
  KEY_OF_TYPE_OF,
  ARRAY_BRACKETS,
  SPECIAL_TYPES
}

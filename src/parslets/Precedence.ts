// higher precedence = higher importance
export enum Precedence {
  ALL,
  PARAMETER_LIST,
  PARENTHESIS,
  UNION,
  PREFIX,
  POSTFIX,
  RECORD,
  SYMBOL,
  OPTIONAL,
  NULLABLE,
  ARROW,
  KEY_VALUE,
  GENERIC,
  PROPERTY_PATH,
  KEY_OF_TYPE_OF,
  ARRAY_BRACKETS,
  SPECIAL_TYPES
}

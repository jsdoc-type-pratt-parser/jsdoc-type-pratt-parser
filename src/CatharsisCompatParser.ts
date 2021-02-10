import { Parser } from './Parser'
import { ParseResultType } from './ParseResult'

const reservedWords = [
  'null',
  'true',
  'false',
  'break',
  'case',
  'catch',
  'class',
  'const',
  'continue',
  'debugger',
  'default',
  'delete',
  'do',
  'else',
  'export',
  'extends',
  'finally',
  'for',
  'function',
  'if',
  'import',
  'in',
  'instanceof',
  'new',
  'return',
  'super',
  'switch',
  'this',
  'throw',
  'try',
  'typeof',
  'var',
  'void',
  'while',
  'with',
  'yield'
]

export class CatharsisCompatParser {
  private readonly parser: Parser

  constructor (text: string) {
    this.parser = new Parser(text)
  }

  static renameProperty (object: any, oldProp: string, newProp: string, transform: boolean = false): any {
    if (object[oldProp] !== undefined) {
      const value = object[oldProp]
      if (transform) {
        if (Array.isArray(value)) {
          for (const v of value) {
            CatharsisCompatParser.transformResult(v)
          }
        } else {
          CatharsisCompatParser.transformResult(value)
        }
      }
      object[newProp] = value
      delete object[oldProp] // eslint-disable-line
    }
    return object
  }

  static transformResult (object: any): any {
    if (object === undefined) {
      return
    }

    if (Array.isArray(object)) {
      for (const item of object) {
        CatharsisCompatParser.transformResult(item)
      }
      return object
    }

    switch (object.type as ParseResultType) {
      case 'ALL':
        object.type = 'AllLiteral'
        break
      case 'NULL':
        object.type = 'NullLiteral'
        break
      case 'STRING_VALUE':
        object.type = 'NameExpression'
        CatharsisCompatParser.renameProperty(object, 'value', 'name')
        object.name = `'${object.name as string}'`
        break
      case 'UNDEFINED':
        object.type = 'UndefinedLiteral'
        break
      case 'UNKNOWN':
        object.type = 'UnknownLiteral'
        break
      case 'FUNCTION':
        object.type = 'FunctionType'
        CatharsisCompatParser.renameProperty(object, 'parameters', 'params', true)
        CatharsisCompatParser.renameProperty(object, 'returnType', 'result', true)
        CatharsisCompatParser.renameProperty(object, 'thisType', 'this', true)
        CatharsisCompatParser.renameProperty(object, 'newType', 'new', true)
        break
      case 'GENERIC':
        object.type = 'TypeApplication'
        CatharsisCompatParser.renameProperty(object, 'objects', 'applications', true)
        CatharsisCompatParser.renameProperty(object, 'subject', 'expression', true)
        break
      case 'MODULE':
        object.type = 'NameExpression'
        CatharsisCompatParser.renameProperty(object, 'path', 'name')
        break
      case 'NAME':
        object.type = 'NameExpression'
        if (reservedWords.includes(object.name)) {
          object.reservedWord = true
        }
        break
      case 'RECORD':
        object.type = 'RecordType'
        CatharsisCompatParser.transformResult(object.fields)
        break
      case 'UNION':
        object.type = 'TypeUnion'
        CatharsisCompatParser.transformResult(object.elements)
        break
      case 'FIELD':
        object.type = 'FieldType'
        CatharsisCompatParser.transformResult(object.key)
        CatharsisCompatParser.transformResult(object.value)
        break
      case 'PROPERTY_PATH':
        object.type = 'NameExpression'
        object.name = object.path.join('.')
        delete object.path
        break
    }

    return object
  }

  parseType (): any {
    const result = this.parser.parseType()
    CatharsisCompatParser.transformResult(result)
    return result
  }
}

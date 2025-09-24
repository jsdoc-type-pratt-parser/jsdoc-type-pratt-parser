import { composeParslet } from './Parslet'
import { Parser } from '../Parser'
import type { ObjectFieldResult, ComputedPropertyResult, ComputedMethodResult } from '../result/NonRootResult'
import { Precedence } from '../Precedence'
import { typescriptGrammar } from '../grammars/typescriptGrammar'
import { createKeyValueParslet } from '../parslets/KeyValueParslet'
import type { RootResult } from '../result/RootResult'
import { getParameters } from './FunctionParslet'

export const objectSquaredPropertyParslet = composeParslet({
  name: 'objectSquareBracketPropertyParslet',
  accept: type => type === '[',
  parsePrefix: parser => {
    if (parser.baseParser === undefined) {
      throw new Error('Only allowed inside object grammar')
    }
    parser.consume('[')

    let innerBracketType;
    try {
      innerBracketType = parser.parseIntermediateType(Precedence.OBJECT)
    } catch (err) {
      throw new Error('Error parsing value inside square bracketed property.')
    }

    let result: ObjectFieldResult

    if (
      // Looks like an object field because of `key: value`, but is
      //  shaping to be an index signature
      innerBracketType.type === 'JsdocTypeObjectField' &&
      typeof innerBracketType.key === 'string' &&
      !innerBracketType.optional &&
      !innerBracketType.readonly &&
      innerBracketType.right !== undefined
    ) {
      const key = innerBracketType.key

      if (!parser.consume(']')) {
        throw new Error('Unterminated square brackets')
      }

      if (!parser.consume(':')) {
        throw new Error('Incomplete index signature')
      }

      const parentParser = parser.baseParser
      parentParser.acceptLexerState(parser)

      innerBracketType.key = {
        type: 'JsdocTypeIndexSignature',
        key,
        right: innerBracketType.right
      }
      innerBracketType.optional = false
      innerBracketType.meta.quote = undefined

      result = innerBracketType

      const right = parentParser.parseType(Precedence.INDEX_BRACKETS)
      result.right = right

      parser.acceptLexerState(parentParser)
    } else if (
      // Looks like a name, but is shaping to be a mapped type clause
      innerBracketType.type === 'JsdocTypeName' &&
      parser.consume('in')
    ) {
      const parentParser = parser.baseParser
      parentParser.acceptLexerState(parser)

      const mappedTypeRight = parentParser.parseType(Precedence.ARRAY_BRACKETS)

      parser.acceptLexerState(parentParser)

      if (!parser.consume(']')) {
        throw new Error('Unterminated square brackets')
      }

      const optional = parser.consume('?')

      if (!parser.consume(':')) {
        throw new Error('Incomplete mapped type clause: missing colon')
      }

      const right = parser.parseType(Precedence.INDEX_BRACKETS)
      result = {
        type: 'JsdocTypeObjectField',
        optional,
        readonly: false,
        meta: {
          quote: undefined
        },
        key: {
          type: 'JsdocTypeMappedType',
          key: innerBracketType.value,
          right: mappedTypeRight
        },
        right
      }
    } else {
      if (!parser.consume(']')) {
        throw new Error('Unterminated square brackets')
      }

      let type: "JsdocTypeComputedMethod"|"JsdocTypeComputedProperty";

      let optional = parser.consume('?')

      let key: ComputedPropertyResult|ComputedMethodResult

      const checkMiddle = (): void => {
        // Safe if set above

        // eslint-disable-next-line logical-assignment-operators -- Keep for comment
        if (!optional) {
          optional = parser.consume('?')
          // How can we grab this?
          // if (optional && type === 'JsdocTypeComputedMethod') {
          //   throw new Error('Computed methods may not be optional')
          // }
        }
      }

      // Limit this to JsdocTypeName and JsdocTypeStringValue?
      let right

      const text = parser.lexer.current.type
      if (text === '(') {
        const signatureParser = new Parser(
          [
            createKeyValueParslet({
              allowVariadic: true,
              allowOptional: true,
              acceptParameterList: true,
            }),
            ...typescriptGrammar.flatMap((grammar) => {
              // We're supplying our own version
              if (grammar.name === 'keyValueParslet') {
                return []
              }
              return [grammar]
            })
          ],
          parser.lexer,
          parser
        )

        signatureParser.acceptLexerState(parser)
        const params = signatureParser.parseIntermediateType(Precedence.OBJECT)
        parser.acceptLexerState(signatureParser)

        const parameters = getParameters(params)

        type = 'JsdocTypeComputedMethod'

        checkMiddle()
        parser.consume(':')
        const nextValue = parser.parseType(Precedence.INDEX_BRACKETS)

        key = {
          type,
          optional,
          value: innerBracketType as RootResult,
          parameters,
          returnType: nextValue
        }
      } else {
        type = 'JsdocTypeComputedProperty'
        checkMiddle()
        if (!parser.consume(':')) {
          throw new Error('Incomplete computed property: missing colon')
        }

        right = parser.parseType(Precedence.INDEX_BRACKETS)
        key = {
          type,
          value: innerBracketType as RootResult,
        }
      }

      result = {
        type: 'JsdocTypeObjectField',
        optional: type === 'JsdocTypeComputedMethod' ? false : optional,
        readonly: false,
        meta: {
          quote: undefined
        },
        key,
        right
      }
    }

    return result
  }
})

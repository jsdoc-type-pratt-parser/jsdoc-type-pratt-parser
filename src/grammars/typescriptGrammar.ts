import { assertsParslet } from '../parslets/assertsParslet.js'
import { baseGrammar } from './baseGrammar.js'
import type { Grammar } from './Grammar.js'
import { createPathGrammars } from './pathGrammar.js'
import { createNameParslet } from '../parslets/NameParslet.js'
import { nullableParslet } from '../parslets/NullableParslets.js'
import { optionalParslet } from '../parslets/OptionalParslet.js'
import { stringValueParslet } from '../parslets/StringValueParslet.js'
import { numberParslet } from '../parslets/NumberParslet.js'
import { createFunctionParslet } from '../parslets/FunctionParslet.js'
import { createObjectParslet } from '../parslets/ObjectParslet.js'
import { functionPropertyParslet } from '../parslets/FunctionPropertyParslet.js'
import { createTupleParslet } from '../parslets/TupleParslet.js'
import { createVariadicParslet } from '../parslets/VariadicParslet.js'
import { typeOfParslet } from '../parslets/TypeOfParslet.js'
import { keyOfParslet } from '../parslets/KeyOfParslet.js'
import { importParslet } from '../parslets/ImportParslet.js'
import { createSpecialNamePathParslet } from '../parslets/SpecialNamePathParslet.js'
import { readonlyPropertyParslet } from '../parslets/ReadonlyPropertyParslet.js'
import { arrayBracketsParslet } from '../parslets/ArrayBracketsParslet.js'
import { arrowFunctionParslet } from '../parslets/ArrowFunctionParslet.js'
import { genericArrowFunctionParslet } from '../parslets/GenericArrowFunctionParslet.js'
import { createNamePathParslet } from '../parslets/NamePathParslet.js'
import { intersectionParslet } from '../parslets/IntersectionParslet.js'
import { predicateParslet } from '../parslets/predicateParslet.js'
import { createObjectFieldParslet } from '../parslets/ObjectFieldParslet.js'
import { createKeyValueParslet } from '../parslets/KeyValueParslet.js'
import { objectSquaredPropertyParslet } from '../parslets/ObjectSquaredPropertyParslet.js'
import { readonlyArrayParslet } from '../parslets/ReadonlyArrayParslet.js'
import { conditionalParslet } from '../parslets/ConditionalParslet.js'
import { templateLiteralParslet } from '../parslets/TemplateLiteralParslet.js'

export const createTypescriptGrammars = ({
  module,
  strictMode,
  asyncFunctionBody,
}: {
  module: boolean,
  strictMode: boolean,
  asyncFunctionBody: boolean,
}): {
  typescriptNameGrammar: Grammar,
  typescriptNamePathGrammar: Grammar,
  typescriptGrammar: Grammar
} => {
  const { pathGrammar } = createPathGrammars({
    module,
    strictMode,
    asyncFunctionBody,
  })

  const objectFieldGrammar: Grammar = [
    functionPropertyParslet,
    readonlyPropertyParslet,
    createNameParslet({
      module,
      strictMode,
      asyncFunctionBody,
      allowReservedWords: true,
      allowedAdditionalTokens: [
        'typeof', 'in',
        'module', 'keyof', 'event', 'external'
      ]
    }),
    nullableParslet,
    optionalParslet,
    stringValueParslet,
    numberParslet,
    createObjectFieldParslet({
      allowSquaredProperties: true,
      allowKeyTypes: false,
      allowOptional: true,
      allowReadonly: true
    }),
    objectSquaredPropertyParslet
  ]

  const typescriptNameGrammar = [
    createNameParslet({
      module,
      strictMode,
      asyncFunctionBody,
      allowReservedWords: false,
      allowedAdditionalTokens: [
        // Cannot be JavaScript reserved word like `typeof`
        'module', 'keyof', 'event', 'external',
        'readonly', 'is'
      ]
    })
  ]

  const typescriptNamePathGrammar = [
    createNameParslet({
      module,
      strictMode,
      asyncFunctionBody,
      allowReservedWords: false,
      allowedAdditionalTokens: [
        'typeof', 'in',
        'module', 'keyof', 'event', 'external',
        'readonly', 'is'
      ]
    }),
    createNamePathParslet({
      allowSquareBracketsOnAnyType: true,
      // Here we actually want JSDoc name paths (even though TS
      //   in JSDoc namepath positions interpret them differently
      //   than JSDoc)
      allowJsdocNamePaths: true,
      pathGrammar
    })
  ]

  const typescriptGrammar: Grammar = [
    ...baseGrammar,
    createObjectParslet({
      allowKeyTypes: false,
      objectFieldGrammar,
      signatureGrammar: [
        createKeyValueParslet({
          allowVariadic: true,
          allowOptional: true,
          acceptParameterList: true,
        })
      ]
    }),
    readonlyArrayParslet,
    typeOfParslet,
    keyOfParslet,
    importParslet,
    stringValueParslet,
    createFunctionParslet({
      allowWithoutParenthesis: true,
      allowNoReturnType: true,
      allowNamedParameters: ['this', 'new', 'args'],
      allowNewAsFunctionKeyword: true
    }),
    createTupleParslet({
      allowQuestionMark: false
    }),
    createVariadicParslet({
      allowEnclosingBrackets: false,
      allowPostfix: false
    }),
    assertsParslet,
    conditionalParslet,
    createNameParslet({
      module,
      strictMode,
      asyncFunctionBody,
      // Todo: Should be disallowed except when used within types
      allowReservedWords: true,
      allowedAdditionalTokens: ['event', 'external']
    }),
    createSpecialNamePathParslet({
      allowedTypes: ['module'],
      pathGrammar
    }),
    arrayBracketsParslet,
    arrowFunctionParslet,
    genericArrowFunctionParslet,
    createNamePathParslet({
      allowSquareBracketsOnAnyType: true,
      allowJsdocNamePaths: false,
      pathGrammar
    }),
    intersectionParslet,
    predicateParslet,
    templateLiteralParslet,
    createKeyValueParslet({
      allowVariadic: true,
      allowOptional: true
    })
  ]

  return {
    typescriptNameGrammar, typescriptNamePathGrammar, typescriptGrammar
  }
}

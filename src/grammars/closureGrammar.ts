import { baseGrammar } from './baseGrammar.js'
import { createPathGrammars } from './pathGrammar.js'
import { createNameParslet } from '../parslets/NameParslet.js'
import { nullableParslet } from '../parslets/NullableParslets.js'
import type { Grammar } from './Grammar.js'
import { optionalParslet } from '../parslets/OptionalParslet.js'
import { stringValueParslet } from '../parslets/StringValueParslet.js'
import { numberParslet } from '../parslets/NumberParslet.js'
import { createKeyValueParslet } from '../parslets/KeyValueParslet.js'
import { createObjectParslet } from '../parslets/ObjectParslet.js'
import { typeOfParslet } from '../parslets/TypeOfParslet.js'
import { createFunctionParslet } from '../parslets/FunctionParslet.js'
import { createVariadicParslet } from '../parslets/VariadicParslet.js'
import { createSpecialNamePathParslet } from '../parslets/SpecialNamePathParslet.js'
import { createNamePathParslet } from '../parslets/NamePathParslet.js'
import { symbolParslet } from '../parslets/SymbolParslet.js'
import { createObjectFieldParslet } from '../parslets/ObjectFieldParslet.js'

export const createClosureGrammars = ({
  module,
  strictMode,
  asyncFunctionBody,
}: {
  module: boolean,
  strictMode: boolean,
  asyncFunctionBody: boolean,
}): {
  closureNameGrammar: Grammar,
  closureNamePathGrammar: Grammar,
  closureGrammar: Grammar
} => {
  const { pathGrammar } = createPathGrammars({
    module,
    strictMode,
    asyncFunctionBody,
  })

  const objectFieldGrammar: Grammar = [
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
      allowSquaredProperties: false,
      allowKeyTypes: false,
      allowOptional: false,
      allowReadonly: false
    })
  ]

  const closureNamePathParslet = createNamePathParslet({
    allowSquareBracketsOnAnyType: false,
    allowJsdocNamePaths: true,
    pathGrammar
  })

  const closureNameGrammar = [
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

  const closureNamePathGrammar = [
    createNameParslet({
      module,
      strictMode,
      asyncFunctionBody,
      allowReservedWords: false,
      allowedAdditionalTokens: [
        'module', 'keyof', 'event', 'external',
        'readonly', 'is',
        'typeof', 'in'
      ]
    }),
    closureNamePathParslet
  ]

  const typeNameParslet = createNameParslet({
    module,
    strictMode,
    asyncFunctionBody,
    // Todo: Should be disallowed except when used within types
    allowReservedWords: true,
    allowedAdditionalTokens: ['event', 'external']
  })

  const closureGrammar = [
    ...baseGrammar,
    createObjectParslet({
      allowKeyTypes: false,
      objectFieldGrammar
    }),
    typeNameParslet,
    typeOfParslet,
    createFunctionParslet({
      allowWithoutParenthesis: false,
      allowNamedParameters: ['this', 'new'],
      allowNoReturnType: true,
      allowNewAsFunctionKeyword: false
    }),
    createVariadicParslet({
      allowEnclosingBrackets: false,
      allowPostfix: false
    }),
    // additional name parslet is needed for some special cases
    createNameParslet({
      module,
      strictMode,
      asyncFunctionBody,
      allowReservedWords: false,
      allowedAdditionalTokens: ['keyof']
    }),
    createSpecialNamePathParslet({
      allowedTypes: ['module'],
      pathGrammar
    }),
    closureNamePathParslet,
    createKeyValueParslet({
      allowOptional: false,
      allowVariadic: false
    }),
    symbolParslet
  ]

  return {
    closureNameGrammar, closureNamePathGrammar, closureGrammar
  }
}

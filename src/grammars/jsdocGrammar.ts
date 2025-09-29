import { baseGrammar } from './baseGrammar.js'
import type { Grammar } from './Grammar.js'
import { createPathGrammars } from './pathGrammar.js'
import type { TokenType } from '../lexer/Token.js'
import { createFunctionParslet } from '../parslets/FunctionParslet.js'
import { stringValueParslet } from '../parslets/StringValueParslet.js'
import { createSpecialNamePathParslet } from '../parslets/SpecialNamePathParslet.js'
import { createVariadicParslet } from '../parslets/VariadicParslet.js'
import { createNameParslet } from '../parslets/NameParslet.js'
import { symbolParslet } from '../parslets/SymbolParslet.js'
import { arrayBracketsParslet } from '../parslets/ArrayBracketsParslet.js'
import { createNamePathParslet } from '../parslets/NamePathParslet.js'
import { createObjectParslet } from '../parslets/ObjectParslet.js'
import { createObjectFieldParslet } from '../parslets/ObjectFieldParslet.js'
import { createKeyValueParslet } from '../parslets/KeyValueParslet.js'

export const createJsdocGrammars = ({
  module,
  strictMode,
  asyncFunctionBody,
}: {
  module: boolean,
  strictMode: boolean,
  asyncFunctionBody: boolean,
}): {
  jsdocNameGrammar: Grammar,
  jsdocNamePathGrammar: Grammar,
  jsdocGrammar: Grammar
} => {
  const { pathGrammar } = createPathGrammars({
    module,
    strictMode,
    asyncFunctionBody,
  })


  const jsdocNamePathParslet = createNamePathParslet({
    allowSquareBracketsOnAnyType: false,
    allowJsdocNamePaths: true,
    pathGrammar
  })

  const baseNameTokens: TokenType[] = [
    // Cannot be JavaScript reserved word like `typeof`
    'module', 'keyof', 'event', 'external',
    'readonly', 'is'
  ]

  const jsdocNameGrammar = [
    createNameParslet({
      module,
      strictMode,
      asyncFunctionBody,
      allowReservedWords: false,
      allowedAdditionalTokens: baseNameTokens
    })
  ]

  const jsdocNamePathGrammar = [
    createNameParslet({
      module,
      strictMode,
      asyncFunctionBody,
      allowReservedWords: false,
      allowedAdditionalTokens: [
        ...baseNameTokens,
        // These should really only be allowed as properties
        'typeof', 'in'
      ]
    }),
    jsdocNamePathParslet
  ]

  const typeNameParslet = createNameParslet({
    module,
    strictMode,
    asyncFunctionBody,
    // Todo: Should be disallowed except when used within types
    allowReservedWords: true,
    allowedAdditionalTokens: ['keyof']
  })

  const jsdocBaseGrammar = [
    ...baseGrammar,
    createFunctionParslet({
      allowWithoutParenthesis: true,
      allowNamedParameters: ['this', 'new'],
      allowNoReturnType: true,
      allowNewAsFunctionKeyword: false
    }),
    stringValueParslet,
    createSpecialNamePathParslet({
      allowedTypes: ['module', 'external', 'event'],
      pathGrammar
    }),
    createVariadicParslet({
      allowEnclosingBrackets: true,
      allowPostfix: true
    }),
    typeNameParslet,
    symbolParslet,
    arrayBracketsParslet,
    jsdocNamePathParslet
  ]

  const jsdocGrammar: Grammar = [
    ...jsdocBaseGrammar,
    createObjectParslet({
      // jsdoc syntax allows full types as keys, so we need to pull in the full grammar here
      // we leave out the object type deliberately
      objectFieldGrammar: [
        createNameParslet({
          module,
          strictMode,
          asyncFunctionBody,
          allowReservedWords: true,
          allowedAdditionalTokens: [
            'typeof', 'in',
            'module'
          ]
        }),
        createObjectFieldParslet({
          allowSquaredProperties: false,
          allowKeyTypes: true,
          allowOptional: false,
          allowReadonly: false
        }),
        ...jsdocBaseGrammar
      ],
      allowKeyTypes: true
    }),
    createKeyValueParslet({
      allowOptional: true,
      allowVariadic: true
    })
  ]

  return {
    jsdocNameGrammar, jsdocNamePathGrammar, jsdocGrammar
  }
}

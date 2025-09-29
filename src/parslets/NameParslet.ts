import {
  reservedWords, futureReservedWords, strictModeNonIdentifiers,
  type TokenType
} from '../lexer/Token.js'
import { composeParslet, type ParsletFunction } from './Parslet.js'

export function createNameParslet ({
  allowedAdditionalTokens, allowReservedWords,
  module, strictMode, asyncFunctionBody
}: {
  allowReservedWords: boolean,
  allowedAdditionalTokens: TokenType[]
  module: boolean,
  strictMode: boolean,
  asyncFunctionBody: boolean,
}): ParsletFunction {
  return composeParslet({
    name: 'nameParslet',
    accept: type => type === 'Identifier' || type === 'this' || type === 'new' || allowedAdditionalTokens.includes(type),
    parsePrefix: parser => {
      const { type, text } = parser.lexer.current

      if (!allowReservedWords) {
        if (reservedWords.always.includes(text)) {
          throw new Error(`Unexpected reserved keyword "${text}"`)
        }
        if (futureReservedWords.always.includes(text)) {
          throw new Error(`Unexpected future reserved keyword "${text}"`)
        }
        if ((module !== undefined && module) ||
          (strictMode !== undefined && strictMode)
        ) {
          if (reservedWords.strictMode.includes(text)) {
            throw new Error(`Unexpected reserved keyword "${text}" for strict mode`)
          }
          if (futureReservedWords.strictMode.includes(text)) {
            throw new Error(`Unexpected future reserved keyword "${text}" for strict mode`)
          }
          if (strictModeNonIdentifiers.includes(text)) {
            throw new Error(`The item "${text}" is not an identifier in strict mode`);
          }
        }
        if ((module !== undefined && module) ||
          (asyncFunctionBody !== undefined && asyncFunctionBody)
        ) {
          if (reservedWords.moduleOrAsyncFunctionBodies.includes(text)) {
            throw new Error(`Unexpected reserved keyword "${text}" for modules or async function bodies`)
          }
        }
      }

      parser.consume(type)

      return {
        type: 'JsdocTypeName',
        value: text
      }
    }
  })
}

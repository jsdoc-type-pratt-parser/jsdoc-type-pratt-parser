import { composeParslet } from './Parslet'
import type { RootResult } from '../result/RootResult'
import { Precedence } from '../Precedence'
import { getTemplateLiteralLiteral } from '../lexer/Lexer'
import { typescriptGrammar } from '../grammars/typescriptGrammar'
import { Parser } from '../Parser'

export const templateLiteralParslet = composeParslet({
  name: 'templateLiteralParslet',
  accept: type => type === 'TemplateLiteral',
  parsePrefix: parser => {
    const text = parser.lexer.current.text
    parser.consume('TemplateLiteral')

    const literals: string[] = []
    const interpolations = [] as RootResult[]

    let currentText = text.slice(1, -1)

    const advanceLiteral = (): void => {
      const literal = getTemplateLiteralLiteral(currentText) ?? ''

      // We collect backslashes for total length, but need to replace
      literals.push(literal.replace(/\\`/g, '`'))

      currentText = currentText.slice(literal.length)
    }

    // The first can be the empty string (at least one literal
    //   should be populated)
    advanceLiteral()

    while (true) {
      if (currentText.startsWith('${')) {
        currentText = currentText.slice(2)

        const templateParser = new Parser(typescriptGrammar, currentText)

        const interpolationType = templateParser.parseType(Precedence.ALL)
        interpolations.push(interpolationType)

        if (templateParser.lexer.current.text !== '}') {
          throw new Error('unterminated interpolation')
        }

        currentText = templateParser.lexer.remaining()
      } else { // currentText.startsWith('`')
        break;
      }

      // May also be empty string if seeing `}${` or just a final `}`
      advanceLiteral()
    }

    return {
      type: 'JsdocTypeTemplateLiteral',
      literals,
      interpolations
    }
  }
})

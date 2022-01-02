import { InfixParslet } from './Parslet'
import { TokenType } from '../lexer/Token'
import { Precedence } from '../Precedence'
import { assertTerminal } from '../assertTypes'
import { Parser } from '../Parser'
import { IntermediateResult } from '../result/IntermediateResult'
import { NamePathResult, SpecialNamePath, TerminalResult } from '../result/TerminalResult'
import { UnexpectedTypeError } from '../errors'
import { PropertyResult } from '../result/NonTerminalResult'
import { Grammar } from '../grammars/Grammar'

interface NamePathParsletOptions {
  allowJsdocNamePaths: boolean
  pathGrammar: Grammar | null
}

export class NamePathParslet implements InfixParslet {
  private readonly allowJsdocNamePaths: boolean
  private readonly pathGrammar: Grammar | null

  constructor ({ allowJsdocNamePaths, pathGrammar }: NamePathParsletOptions) {
    this.allowJsdocNamePaths = allowJsdocNamePaths
    this.pathGrammar = pathGrammar
  }

  accepts (type: TokenType, next: TokenType): boolean {
    return (type === '.' && next !== '<') || type === '[' || (this.allowJsdocNamePaths && (type === '~' || type === '#'))
  }

  getPrecedence (): Precedence {
    return Precedence.NAME_PATH
  }

  parseInfix (parser: Parser, left: IntermediateResult): TerminalResult {
    let type: NamePathResult['pathType']
    let brackets = false

    if (parser.consume('.')) {
      type = 'property'
    } else if (parser.consume('[')) {
      type = 'property-brackets'
      brackets = true
    } else if (parser.consume('~')) {
      type = 'inner'
    } else {
      parser.consume('#')
      type = 'instance'
    }

    const pathParser = this.pathGrammar !== null
      ? new Parser({
        grammar: this.pathGrammar,
        lexer: parser.getLexer()
      })
      : parser

    const next = pathParser.parseIntermediateType(Precedence.NAME_PATH)
    let right: PropertyResult | SpecialNamePath<'event'>

    switch (next.type) {
      case 'JsdocTypeName':
        right = {
          type: 'JsdocTypeProperty',
          value: next.value,
          meta: {
            quote: undefined
          }
        }
        break
      case 'JsdocTypeNumber':
        right = {
          type: 'JsdocTypeProperty',
          value: next.value.toString(10),
          meta: {
            quote: undefined
          }
        }
        break
      case 'JsdocTypeStringValue':
        right = {
          type: 'JsdocTypeProperty',
          value: next.value,
          meta: {
            quote: next.meta.quote
          }
        }
        break
      case 'JsdocTypeSpecialNamePath':
        if (next.specialType === 'event') {
          right = next as SpecialNamePath<'event'>
        } else {
          throw new UnexpectedTypeError(next, 'Type \'JsdocTypeSpecialNamePath\' is only allowed witch specialType \'event\'')
        }
        break
      default:
        throw new UnexpectedTypeError(next, 'Expecting \'JsdocTypeName\', \'JsdocTypeNumber\', \'JsdocStringValue\' or \'JsdocTypeSpecialNamePath\'')
    }

    if (brackets && !parser.consume(']')) {
      throw new Error(`Unterminated square brackets. Next token is '${parser.getToken().type}' ` +
        `with text '${parser.getToken().text}'`)
    }

    return {
      type: 'JsdocTypeNamePath',
      left: assertTerminal(left),
      right,
      pathType: type
    }
  }
}

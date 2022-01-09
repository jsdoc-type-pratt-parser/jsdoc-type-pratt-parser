import { EarlyEndOfParseError, NoParsletFoundError } from './errors'
import { Token, TokenType } from './lexer/Token'
import { Lexer } from './lexer/Lexer'
import { Grammar } from './grammars/Grammar'
import { assertTerminal } from './assertTypes'
import { Precedence } from './Precedence'
import { RootResult } from './result/RootResult'
import { IntermediateResult } from './result/IntermediateResult'

interface ParserOptions {
  grammar: Grammar
  lexer?: Lexer
  parent?: Parser
}

export class Parser {
  private readonly grammar: Grammar

  private readonly lexer: Lexer
  private readonly parent?: Parser

  constructor ({ grammar, lexer, parent }: ParserOptions) {
    this.lexer = lexer ?? new Lexer()

    this.parent = parent

    this.grammar = grammar
  }

  parseText (text: string): RootResult {
    this.lexer.lex(text)
    const result = this.parseType(Precedence.ALL)
    if (this.getToken().type !== 'EOF') {
      throw new EarlyEndOfParseError(this.getToken())
    }
    return result
  }

  public parseType (precedence: Precedence): RootResult {
    return assertTerminal(this.parseIntermediateType(precedence))
  }

  private tryParslets (precedence: Precedence, left: IntermediateResult | null): IntermediateResult | null {
    for (const parslet of this.grammar) {
      const result = parslet(this, precedence, left)
      if (result !== null) {
        return result
      }
    }
    return null
  }

  public parseIntermediateType (precedence: Precedence): IntermediateResult {
    const result = this.tryParslets(precedence, null)

    if (result === null) {
      throw new NoParsletFoundError(this.getToken())
    }

    return this.parseInfixIntermediateType(result, precedence)
  }

  public parseInfixIntermediateType (result: IntermediateResult, precedence: Precedence): IntermediateResult {
    let newResult = this.tryParslets(precedence, result)

    while (newResult !== null) {
      result = newResult
      newResult = this.tryParslets(precedence, result)
    }

    return result
  }

  public consume (types: TokenType|TokenType[]): boolean {
    if (!Array.isArray(types)) {
      types = [types]
    }
    if (!types.includes(this.lexer.token().type)) {
      return false
    }
    this.lexer.advance()
    return true
  }

  public getToken (): Token {
    return this.lexer.token()
  }

  public peekToken (): Token {
    return this.lexer.peek()
  }

  public previousToken (): Token | undefined {
    return this.lexer.last()
  }

  getLexer (): Lexer {
    return this.lexer
  }

  getParent (): Parser | undefined {
    return this.parent
  }
}

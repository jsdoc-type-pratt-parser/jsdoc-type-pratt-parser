import { Token, TokenType } from './lexer/Token'
import { Lexer } from './lexer/Lexer'
import { InfixParslet, PrefixParslet } from './parslets/Parslet'
import { NonTerminalResult, ParseResult } from './ParseResult'
import { Grammar } from './grammars/Grammar'
import { assertTerminal } from './assertTypes'
import { Precedence } from './parslets/Precedence'

class NoParsletFoundError extends Error {
  constructor (token: Token) {
    super(`No parslet found for token: '${token.type}' with value '${token.text}'`)

    Object.setPrototypeOf(this, NoParsletFoundError.prototype)
  }
}

export class ParserEngine {
  private readonly prefixParslets: PrefixParslet[]
  private readonly infixParslets: InfixParslet[]

  private lexer: Lexer

  constructor (grammar: Grammar) {
    this.lexer = new Lexer()

    const {
      prefixParslets,
      infixParslets
    } = grammar()

    this.prefixParslets = prefixParslets

    this.infixParslets = infixParslets
  }

  parseText (text: string): ParseResult {
    this.lexer.lex(text)
    const result = this.parseType(Precedence.ALL)
    if (!this.consume('EOF')) {
      throw new Error(`Unexpected early end of parse. Next token: '${this.getToken().text}'`)
    }
    return result
  }

  getPrefixParslet (): PrefixParslet | undefined {
    return this.prefixParslets.find(p => p.accepts(this.getToken().type, this.peekToken().type))
  }

  getInfixParslet (precedence: Precedence): InfixParslet | undefined {
    return this.infixParslets.find(p => {
      return p.getPrecedence() > precedence && p.accepts(this.getToken().type, this.peekToken().type)
    })
  }

  public tryParseType (precedence: Precedence): NonTerminalResult | undefined {
    const preserve = this.lexer.clone()
    try {
      return this.parseType(precedence)
    } catch (e) {
      if (e instanceof NoParsletFoundError) {
        this.lexer = preserve
        return undefined
      } else {
        throw e
      }
    }
  }

  public parseType (precedence: Precedence): ParseResult {
    return assertTerminal(this.parseNonTerminalType(precedence))
  }

  public parseNonTerminalType (precedence: Precedence): NonTerminalResult {
    const pParslet = this.getPrefixParslet()

    if (pParslet === undefined) {
      throw new NoParsletFoundError(this.getToken())
    }

    let result = pParslet.parsePrefix(this)

    let iParslet = this.getInfixParslet(precedence)

    while (iParslet !== undefined) {
      result = iParslet.parseInfix(this, result)
      iParslet = this.getInfixParslet(precedence)
    }

    return result
  }

  public consume (type: TokenType): boolean {
    if (this.lexer.token().type !== type) {
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
}

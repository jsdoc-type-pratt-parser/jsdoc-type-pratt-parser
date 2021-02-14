import { Token, TokenType } from './lexer/Token'
import { Lexer } from './lexer/Lexer'
import { InfixParslet, PrefixParslet } from './parslets/Parslet'
import { ParseResult } from './ParseResult'
import { Grammar } from './grammars/Grammar'

class NoParsletFound extends Error {
  constructor(token: Token) {
    super(`No parslet found for token: '${token.type}' with value '${token.text}'`);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, NoParsletFound.prototype);
  }
}

export class ParserEngine {
  private readonly prefixParslets: PrefixParslet[]
  private readonly infixParslets: InfixParslet[]

  private readonly lexer: Lexer

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
    const result = this.parseType(0)
    if (!this.consume('EOF')) {
      throw new Error(`Unexpected early end of parse. Next token: '${this.getToken().text}'`)
    }
    return result
  }

  getPrefixParslet (): PrefixParslet | undefined {
    return this.prefixParslets.find(p => p.accepts(this.getToken().type, this.peekToken().type))
  }

  getInfixParslet (precedence: number): InfixParslet | undefined {
    return this.infixParslets.find(p => {
      return p.getPrecedence() > precedence && p.accepts(this.getToken().type, this.peekToken().type)
    })
  }

  public tryParseType (precedence: number): ParseResult | undefined {
    try {
      return this.parseType(precedence)
    } catch (e) {
      if (e instanceof NoParsletFound) {
        return undefined
      } else {
        throw e
      }
    }
  }

  public parseType (precedence: number): ParseResult {
    const pParslet = this.getPrefixParslet()

    if (pParslet === undefined) {
      throw new NoParsletFound(this.getToken())
    }

    let result = pParslet.parse(this)

    let iParslet = this.getInfixParslet(precedence)

    while (iParslet !== undefined) {
      result = iParslet.parse(this, result)
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
}

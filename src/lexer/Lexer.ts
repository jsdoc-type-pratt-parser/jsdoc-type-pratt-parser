import type { Token } from './Token.js'
import { rules } from './LexerRules.js'

const breakingWhitespaceRegex = /^\s*\n\s*/

export class Lexer {
  private readonly text: string = ''
  public readonly current: Token
  public readonly next: Token
  public readonly previous: Token | undefined

  public static create (text: string): Lexer {
    const current = this.read(text)
    text = current.text
    const next = this.read(text)
    text = next.text
    return new Lexer(text, undefined, current.token, next.token)
  }

  private constructor (text: string, previous: Token | undefined, current: Token, next: Token) {
    this.text = text
    this.previous = previous
    this.current = current
    this.next = next
  }

  private static read (text: string, startOfLine = false): { text: string, token: Token } {
    startOfLine ||= breakingWhitespaceRegex.test(text)
    text = text.trim()
    for (const rule of rules) {
      const partial = rule(text)
      if (partial !== null) {
        const token = {
          ...partial,
          startOfLine
        }
        text = text.slice(token.text.length)
        return { text, token }
      }
    }
    throw new Error('Unexpected Token ' + text)
  }

  remaining (): string {
    return this.next.text + this.text
  }

  advance (): Lexer {
    const next = Lexer.read(this.text)
    return new Lexer(next.text, this.current, this.next, next.token)
  }
}

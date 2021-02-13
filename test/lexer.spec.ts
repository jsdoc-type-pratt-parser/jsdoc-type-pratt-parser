import { expect } from 'chai'
import { Lexer } from '../src/lexer/Lexer'
import { Token } from '../src/lexer/Token'

describe('lexer', () => {
  it('should lex name', () => {
    const typeString = 'sometype'
    const expected: Token = {
      type: 'Identifier',
      text: 'sometype'
    }

    const lexer = new Lexer()
    lexer.lex(typeString)
    const token = lexer.token()
    lexer.advance()

    expect(token).to.deep.equal(expected)
    expect(lexer.token().type).to.equal('EOF')
  })

  it('should parse a complex expression', () => {
    const typeString = 'Array<(AType|OtherType)>|\'test\'|undefined'
    const expected: Token[] = [
      {
        type: 'Identifier',
        text: 'Array'
      },
      {
        type: '<',
        text: '<'
      },
      {
        type: '(',
        text: '('
      },
      {
        type: 'Identifier',
        text: 'AType'
      },
      {
        type: '|',
        text: '|'
      },
      {
        type: 'Identifier',
        text: 'OtherType'
      },
      {
        type: ')',
        text: ')'
      },
      {
        type: '>',
        text: '>'
      },
      {
        type: '|',
        text: '|'
      },
      {
        type: 'StringValue',
        text: '\'test\''
      },
      {
        type: '|',
        text: '|'
      },
      {
        type: 'undefined',
        text: 'undefined'
      }
    ]

    const lexer = new Lexer()
    lexer.lex(typeString)

    while (lexer.token().type !== 'EOF') {
      const nextToken = lexer.token()
      const nextExpected = expected.shift()
      expect(nextToken).to.deep.equal(nextExpected)
      lexer.advance()
    }

    expect(expected.length).to.equal(0)
  })
})

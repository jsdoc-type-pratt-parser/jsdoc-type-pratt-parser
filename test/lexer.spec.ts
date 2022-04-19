import { expect } from 'chai'
import { Lexer } from '../src/lexer/Lexer'
import { Token } from '../src/lexer/Token'

function expectTokens (text: string, tokens: Token[]): void {
  let lexer = Lexer.create(text)

  let position = 0

  while (lexer.current.type !== 'EOF') {
    const nextToken = lexer.current
    const nextExpected = tokens[position]
    expect(nextToken).to.deep.equal(nextExpected)
    lexer = lexer.advance()
    position++
  }

  expect(tokens.length).to.equal(position)
}

describe('lexer', () => {
  it('should lex name', () => {
    expectTokens('sometype', [
      {
        type: 'Identifier',
        text: 'sometype'
      }
    ])
  })

  it('should parse a complex expression', () => {
    expectTokens('Array<(AType|OtherType)>|\'test\'|undefined', [
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
    ])
  })

  it('should parse numbers', () => {
    expectTokens('12345', [
      {
        type: 'Number',
        text: '12345'
      }
    ])

    expectTokens('-12345', [
      {
        type: 'Number',
        text: '-12345'
      }
    ])

    expectTokens('Infinity', [
      {
        type: 'Number',
        text: 'Infinity'
      }
    ])
  })

  it('should parse an expression containing multiple numbers', () => {
    expectTokens('123|-Infinity|Array<NaN>', [
      {
        type: 'Number',
        text: '123'
      },
      {
        type: '|',
        text: '|'
      },
      {
        type: 'Number',
        text: '-Infinity'
      },
      {
        type: '|',
        text: '|'
      },
      {
        type: 'Identifier',
        text: 'Array'
      },
      {
        type: '<',
        text: '<'
      },
      {
        type: 'Number',
        text: 'NaN'
      },
      {
        type: '>',
        text: '>'
      }
    ])
  })

  it('should throw when invoking token without first advancing', () => {
    const lexer = new Lexer()
    expect(() => {
      lexer.token()
    }).to.throw('Lexer not lexing')
  })

  it('should obtain last token', () => {
    const text = '(null)'
    const lexer = new Lexer()
    lexer.lex(text)
    const token1 = lexer.token()
    lexer.advance()
    const token2 = lexer.token()
    lexer.advance()
    const token3 = lexer.last() as Token
    expect(token1.text).to.equal('(')
    expect(token2.text).to.equal('null')
    expect(token3.text).to.equal('null')
  })
})

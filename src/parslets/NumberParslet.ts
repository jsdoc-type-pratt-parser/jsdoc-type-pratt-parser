import { composeParslet } from './Parslet.js'

export const numberParslet = composeParslet({
  name: 'numberParslet',
  accept: type => type === 'Number',
  parsePrefix: parser => {
    const text = parser.lexer.current.text
    parser.consume('Number')
    if (text.endsWith('n')) {
      const bigintText = text.slice(0, -1)
      return {
        type: 'JsdocTypeBigInt',
        value: BigInt(bigintText).toString()
      }
    }

    return {
      type: 'JsdocTypeNumber',
      value: parseFloat(text)
    }
  }
})

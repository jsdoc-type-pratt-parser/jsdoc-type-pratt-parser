import { composeParslet } from './Parslet'

export const numberParslet = composeParslet({
  name: 'numberParslet',
  accept: type => type === 'Number',
  parsePrefix: parser => {
    const token = parser.getToken()
    parser.consume('Number')
    return {
      type: 'JsdocTypeNumber',
      value: parseInt(token.text, 10)
    }
  }
})

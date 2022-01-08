import { composeParslet } from './Parslet'

export const stringValueParslet = composeParslet({
  name: 'stringValueParslet',
  accept: type => type === 'StringValue',
  parsePrefix: parser => {
    const token = parser.getToken()
    parser.consume('StringValue')
    return {
      type: 'JsdocTypeStringValue',
      value: token.text.slice(1, -1),
      meta: {
        quote: token.text[0] === '\'' ? 'single' : 'double'
      }
    }
  }
})

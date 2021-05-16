import { notAvailableTransform, transform, TransformRules } from './transform'
import { NonTerminalResult, ParseResult } from '../ParseResult'

function applyPosition (position: 'PREFIX' | 'SUFFIX', target: string, value: string): string {
  return position === 'PREFIX' ? value + target : target + value
}

export function stringifyRules (): TransformRules<string> {
  return {
    PARENTHESIS: (result, transform) => `(${result.element !== undefined ? transform(result.element) : ''})`,

    KEY_OF: (result, transform) => `keyof ${transform(result.element)}`,

    FUNCTION: (result, transform) => {
      if (!result.arrow) {
        let stringified = 'function'
        if (!result.parenthesis) {
          return stringified
        }
        stringified += `(${result.parameters.map(transform).join(', ')})`
        if (result.returnType !== undefined) {
          stringified += `: ${transform(result.returnType)}`
        }
        return stringified
      } else {
        if (result.returnType === undefined) {
          throw new Error('Arrow function needs a return type.')
        }
        return `(${result.parameters.map(transform).join(', ')}) => ${transform(result.returnType)}`
      }
    },

    NAME: result => result.value,

    TUPLE: (result, transform) => `[${result.elements.map(transform).join(', ')}]`,

    VARIADIC: (result, transform) => result.meta.position === 'ONLY_DOTS'
      ? '...'
      : applyPosition(result.meta.position, transform(result.element as NonTerminalResult), '...'),

    NAME_PATH: (result, transform) => `${transform(result.left)}${result.pathType}${transform(result.right)}`,

    STRING_VALUE: result => `${result.meta.quote}${result.value}${result.meta.quote}`,

    ANY: () => '*',

    GENERIC: (result, transform) => {
      if (result.meta.brackets === '[]') {
        const element = result.elements[0]
        const transformed = transform(element)
        if (element.type === 'UNION' || element.type === 'INTERSECTION') {
          return `(${transformed})[]`
        } else {
          return `${transformed}[]`
        }
      } else {
        return `${transform(result.left)}${result.meta.dot ? '.' : ''}<${result.elements.map(transform).join(', ')}>`
      }
    },

    IMPORT: (result, transform) => `import(${transform(result.element)})`,

    KEY_VALUE: (result, transform) => `${transform(result.left)}: ${transform(result.right)}`,

    MODULE: result => `module:${result.meta.quote ?? ''}${result.value}${result.meta.quote ?? ''}`,

    NOT_NULLABLE: (result, transform) => applyPosition(result.meta.position, transform(result.element), '!'),

    NULL: () => 'null',

    NULLABLE: (result, transform) => applyPosition(result.meta.position, transform(result.element), '?'),

    NUMBER: result => result.value.toString(),

    OBJECT: (result, transform) => `{${result.elements.map(transform).join(', ')}}`,

    OPTIONAL: (result, transform) => applyPosition(result.meta.position, transform(result.element), '='),

    SYMBOL: (result, transform) => `${result.value}(${result.element !== undefined ? transform(result.element) : ''})`,

    TYPE_OF: (result, transform) => `typeof ${transform(result.element)}`,

    UNDEFINED: () => 'undefined',

    UNION: (result, transform) => result.elements.map(transform).join(' | '),

    UNKNOWN: () => '?',

    INTERSECTION: (result, transform) => result.elements.map(transform).join(' & ')
  }
}

const storedStringifyRules = stringifyRules()

export function stringify (result: ParseResult): string {
  return transform(storedStringifyRules, result)
}

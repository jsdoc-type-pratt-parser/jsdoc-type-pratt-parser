import { transform, TransformRules } from './transform'
import { NonTerminalResult } from '../result/NonTerminalResult'
import { TerminalResult } from '../result/TerminalResult'

function applyPosition (position: 'PREFIX' | 'SUFFIX', target: string, value: string): string {
  return position === 'PREFIX' ? value + target : target + value
}

export function stringifyRules (): TransformRules<string> {
  return {
    JsdocTypeParenthesis: (result, transform) => `(${result.element !== undefined ? transform(result.element) : ''})`,

    JsdocTypeKeyof: (result, transform) => `keyof ${transform(result.element)}`,

    JsdocTypeFunction: (result, transform) => {
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

    JsdocTypeName: result => result.value,

    JsdocTypeTuple: (result, transform) => `[${result.elements.map(transform).join(', ')}]`,

    JsdocTypeVariadic: (result, transform) => result.meta.position === 'ONLY_DOTS'
      ? '...'
      : applyPosition(result.meta.position, transform(result.element as NonTerminalResult), '...'),

    JsdocTypeNamePath: (result, transform) => `${transform(result.left)}${result.pathType}${transform(result.right)}`,

    JsdocTypeStringValue: result => `${result.meta.quote}${result.value}${result.meta.quote}`,

    JsdocTypeAny: () => '*',

    JsdocTypeGeneric: (result, transform) => {
      if (result.meta.brackets === '[]') {
        const element = result.elements[0]
        const transformed = transform(element)
        if (element.type === 'JsdocTypeUnion' || element.type === 'JsdocTypeIntersection') {
          return `(${transformed})[]`
        } else {
          return `${transformed}[]`
        }
      } else {
        return `${transform(result.left)}${result.meta.dot ? '.' : ''}<${result.elements.map(transform).join(', ')}>`
      }
    },

    JsdocTypeImport: (result, transform) => `import(${transform(result.element)})`,

    JsdocTypeKeyValue: (result, transform) => {
      if ('value' in result) {
        const left = `${result.meta.quote ?? ''}${result.value}${result.meta.quote ?? ''}${result.optional ? '?' : ''}`
        if (result.right === undefined) {
          return left
        } else {
          return left + `: ${transform(result.right)}`
        }
      } else {
        return `${transform(result.left)}: ${transform(result.right)}`
      }
    },

    JsdocTypeSpecialNamePath: result => `${result.specialType}:${result.meta.quote ?? ''}${result.value}${result.meta.quote ?? ''}`,

    JsdocTypeNotNullable:(result, transform) => applyPosition(result.meta.position, transform(result.element), '!'),

    JsdocTypeNull: () => 'null',

    JsdocTypeNullable:(result, transform) => applyPosition(result.meta.position, transform(result.element), '?'),

    JsdocTypeNumber: result => result.value.toString(),

    JsdocTypeObject: (result, transform) => `{${result.elements.map(transform).join(', ')}}`,

    JsdocTypeOptional: (result, transform) => applyPosition(result.meta.position, transform(result.element), '='),

    JsdocTypeSymbol: (result, transform) => `${result.value}(${result.element !== undefined ? transform(result.element) : ''})`,

    JsdocTypeTypeof: (result, transform) => `typeof ${transform(result.element)}`,

    JsdocTypeUndefined: () => 'undefined',

    JsdocTypeUnion: (result, transform) => result.elements.map(transform).join(' | '),

    JsdocTypeUnknown: () => '?',

    JsdocTypeIntersection: (result, transform) => result.elements.map(transform).join(' & ')
  }
}

const storedStringifyRules = stringifyRules()

export function stringify (result: TerminalResult): string {
  return transform(storedStringifyRules, result)
}

import { transform, type TransformRules } from './transform'
import type { NonRootResult } from '../result/NonRootResult'
import type { RootResult } from '../result/RootResult'

function applyPosition (position: 'prefix' | 'suffix', target: string, value: string): string {
  return position === 'prefix' ? value + target : target + value
}

export function quote (value: string, quote: 'single' | 'double' | undefined): string {
  switch (quote) {
    case 'double':
      return `"${value}"`
    case 'single':
      return `'${value}'`
    case undefined:
      return value
  }
}

export function stringifyRules (): TransformRules<string> {
  return {
    JsdocTypeParenthesis: (result, transform) => `(${result.element !== undefined ? transform(result.element) : ''})`,

    JsdocTypeKeyof: (result, transform) => `keyof ${transform(result.element)}`,

    JsdocTypeFunction: (result, transform) => {
      if (!result.arrow) {
        let stringified = result.constructor ? 'new' : 'function'
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
        let stringified = `${
          result.typeParameters !== undefined
            /* c8 ignore next -- Guard */
            ? `<${result.typeParameters.map(transform).join(', ') ?? ''}>`
            : ''
        }(${result.parameters.map(transform).join(', ')}) => ${transform(result.returnType)}`
        if (result.constructor) {
          stringified = 'new ' + stringified
        }
        return stringified
      }
    },

    JsdocTypeName: result => result.value,

    JsdocTypeTuple: (result, transform) => `[${(result.elements as NonRootResult[]).map(transform).join(', ')}]`,

    JsdocTypeVariadic: (result, transform) => result.meta.position === undefined
      ? '...'
      : applyPosition(result.meta.position, transform(result.element as NonRootResult), '...'),

    JsdocTypeNamePath: (result, transform) => {
      const left = transform(result.left)
      const right = transform(result.right)
      switch (result.pathType) {
        case 'inner':
          return `${left}~${right}`
        case 'instance':
          return `${left}#${right}`
        case 'property':
          return `${left}.${right}`
        case 'property-brackets':
          return `${left}[${right}]`
      }
    },

    JsdocTypeStringValue: result => quote(result.value, result.meta.quote),

    JsdocTypeAny: () => '*',

    JsdocTypeGeneric: (result, transform) => {
      if (result.meta.brackets === 'square') {
        const element = result.elements[0]
        const transformed = transform(element)
        if (element.type === 'JsdocTypeUnion' || element.type === 'JsdocTypeIntersection') {
          return `(${transformed})[]`
        } else {
          return `${transformed}[]`
        }
      } else {
        return `${transform(result.left)}${result.meta.dot ? '.' : ''}<${result.infer === true ? 'infer ' : ''}${result.elements.map(transform).join(', ')}>`
      }
    },

    JsdocTypeImport: (result, transform) => `import(${transform(result.element)})`,

    JsdocTypeObjectField: (result, transform) => {
      let text = ''
      if (result.readonly) {
        text += 'readonly '
      }
      if (typeof result.key === 'string') {
        text += quote(result.key, result.meta.quote)
      } else {
        text += transform(result.key)
      }

      if (result.optional) {
        text += '?'
      }

      if (result.right === undefined) {
        return text
      } else {
        return text + `: ${transform(result.right)}`
      }
    },

    JsdocTypeJsdocObjectField: (result, transform) => `${transform(result.left)}: ${transform(result.right)}`,

    JsdocTypeKeyValue: (result, transform) => {
      let text = result.key
      if (result.optional) {
        text += '?'
      }
      if (result.variadic) {
        text = '...' + text
      }

      if (result.right === undefined) {
        return text
      } else {
        return text + `: ${transform(result.right)}`
      }
    },

    JsdocTypeSpecialNamePath: result => `${result.specialType}:${quote(result.value, result.meta.quote)}`,

    JsdocTypeNotNullable: (result, transform) => applyPosition(result.meta.position, transform(result.element), '!'),

    JsdocTypeNull: () => 'null',

    JsdocTypeNullable: (result, transform) => applyPosition(result.meta.position, transform(result.element), '?'),

    JsdocTypeNumber: result => result.value.toString(),

    JsdocTypeObject: (result, transform) => {
      /* c8 ignore next -- Guard */
      const lbType = (result.meta.separator ?? '').endsWith('linebreak')
      const lbEnding = result.meta.separator === 'comma-and-linebreak'
        ? ',\n'
        : result.meta.separator === 'semicolon-and-linebreak'
          ? ';\n'
          : result.meta.separator === 'linebreak' ? '\n' : ''

      const separatorForSingleObjectField = result.meta.separatorForSingleObjectField ?? false
      const trailingPunctuation = result.meta.trailingPunctuation ?? false

      return `{${
      /* c8 ignore next -- Guard */
      (lbType && (separatorForSingleObjectField || result.elements.length > 1) ? '\n' + (result.meta.propertyIndent ?? '') : '') +
      result.elements.map(transform).join(
        (result.meta.separator === 'comma' ? ', ' : lbType
          ? lbEnding +
            /* c8 ignore next -- Guard */
            (result.meta.propertyIndent ?? '')
          : '; ')
      ) +
      (separatorForSingleObjectField && result.elements.length === 1
        ? (result.meta.separator === 'comma' ? ',' : lbType ? lbEnding : ';')
        : trailingPunctuation && result.meta.separator !== undefined
          ? result.meta.separator.startsWith('comma')
            ? ','
            : result.meta.separator.startsWith('semicolon')
             ? ';'
             : ''
          : '') +
      (lbType && result.elements.length > 1 ? '\n' : '')
    }}`
    },

    JsdocTypeOptional: (result, transform) => applyPosition(result.meta.position, transform(result.element), '='),

    JsdocTypeSymbol: (result, transform) => `${result.value}(${result.element !== undefined ? transform(result.element) : ''})`,

    JsdocTypeTypeof: (result, transform) => `typeof ${transform(result.element)}`,

    JsdocTypeUndefined: () => 'undefined',

    JsdocTypeUnion: (result, transform) => result.elements.map(transform).join(
      result.meta?.spacing === undefined
        ? ' | '
        : `${result.meta.spacing}|${result.meta.spacing}`
    ),

    JsdocTypeUnknown: () => '?',

    JsdocTypeIntersection: (result, transform) => result.elements.map(transform).join(' & '),

    JsdocTypeProperty: result => quote(result.value, result.meta.quote),

    JsdocTypePredicate: (result, transform) => `${transform(result.left)} is ${transform(result.right)}`,

    JsdocTypeIndexSignature: (result, transform) => `[${result.key}: ${transform(result.right)}]`,

    JsdocTypeMappedType: (result, transform) => `[${result.key} in ${transform(result.right)}]`,

    JsdocTypeAsserts: (result, transform) => `asserts ${transform(result.left)} is ${transform(result.right)}`,

    JsdocTypeReadonlyArray: (result, transform) => `readonly ${transform(result.element)}`,

    JsdocTypeAssertsPlain: (result, transform) => `asserts ${transform(result.element)}`,

    JsdocTypeConditional: (result, transform) => `${transform(result.checksType)} extends ${transform(result.extendsType)} ? ${transform(result.trueType)} : ${transform(result.falseType)}`,

    JsdocTypeTypeParameter: (result, transform) => `${
      transform(result.name)}${
        result.constraint !== undefined ? ` extends ${transform(result.constraint)}` : ''
      }${
        result.defaultValue !== undefined ? ` = ${transform(result.defaultValue)}` : ''
      }`
  }
}

const storedStringifyRules = stringifyRules()

export function stringify (result: RootResult): string {
  return transform(storedStringifyRules, result)
}

import {registerTemplate, Template} from '@webcoder49/code-input'

import Indent from '@webcoder49/code-input/plugins/indent.mjs'

import prismStyles from 'prismjs/themes/prism.min.css' with {type: 'css'}

import codeInputStyles from
  '@webcoder49/code-input/code-input.min.css' with {type: 'css'}

import * as jtpp from './lib/jsdoc-type-pratt-parser/index.mjs'

document.adoptedStyleSheets = [prismStyles, codeInputStyles]

registerTemplate(
  'syntax-highlighted',
  new Template(Prism.highlightElement, false, true, false, [new Indent()])
)

const modeSelect = document.querySelector('#mode')
const compatModeSelect = document.querySelector('#compatMode')
const parsingTypeSelect = document.querySelector('#parsingType')
const input = document.querySelector('#input')
const button = document.querySelector('#parse')
const output = document.querySelector('#output')
const stringified = document.querySelector('#stringified')

function getSelected(select) {
    return Array.from(select.querySelectorAll('option')).find(o => o.selected).value
}

output.addEventListener('input', function () {
  const result = JSON.parse(output.value)
  stringified.value = jtpp.stringify(result)
})

button.addEventListener('click', function () {
  const mode = getSelected(modeSelect)
  const compatMode = getSelected(compatModeSelect)
  const parsingType = getSelected(parsingTypeSelect)
  try {
    let result = parsingType === 'type'
      ? jtpp.parse(input.value, mode)
      : parsingType === 'name'
        ? jtpp.parseName(input.value, mode)
        : jtpp.parseNamePath(input.value, mode)
    if (compatMode === 'catharsis') {
      result = jtpp.catharsisTransform(result)
    } else if (compatMode === 'jtp') {
      result = jtpp.jtpTransform(result)
    }
    output.value = JSON.stringify(result, null, 2)
    stringified.value = jtpp.stringify(result)
  } catch (e) {
    output.value = e.toString()
  }
})

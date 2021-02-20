const _ = require('lodash')
const fs = require('fs')

if (process.argv.length !== 3) {
  throw new Error('please provide the number of skip lines before eval.')
}

const skipLines = parseInt(process.argv[2], 10)

const typeReplacements = {
  'Types.AllLiteral': '\'ALL\'',
  '\'AllLiteral\'': '\'ALL\'',
  'Types.FieldType': '\'KEY_VALUE\'',
  '\'FieldType\'': '\'KEY_VALUE\'',
  'Types.FunctionType': '\'FUNCTION\'',
  '\'FunctionType\'': '\'FUNCTION\'',
  'Types.NameExpression': '\'NAME\'',
  '\'NameExpression\'': '\'NAME\'',
  'Types.NullLiteral': '\'NULL\'',
  '\'NullLiteral\'': '\'NULL\'',
  'Types.RecordType': '\'RECORD\'',
  '\'RecordType\'': '\'RECORD\'',
  'Types.TypeApplication': '\'GENERIC\'',
  '\'TypeApplication\'': '\'GENERIC\'',
  'Types.TypeUnion': '\'UNION\'',
  '\'TypeUnion\'': '\'UNION\'',
  'Types.UndefinedLiteral': '\'UNDEFINED\'',
  '\'UndefinedLiteral\'': '\'UNDEFINED\'',
  'Types.UnknownLiteral': '\'UNKNOWN\'',
  '\'UnknownLiteral\'': '\'UNKNOWN\''
}

function replaceVariables (input) {
  for (const [key, value] of Object.entries(typeReplacements)) {
    input = input.replace(new RegExp(key, 'g'), value)
  }
  input = input.replace(/: en\.[^,\n]*(,?\n)/g, ': \'\'$1')
  return input
}

function extractObject (input) {
  const module = {}
  // eslint-disable-next-line no-eval
  eval(input.split('\n').slice(skipLines).join('\n'))
  return module.exports
}

function transformResult (res) {
  res = _.clone(res)
  if (res.type === 'FUNCTION') {
    if (res.params) {
      res.parameters = res.params.map(transformResult)
      delete res.params
    } else {
      res.parameters = []
    }
    if (res.this) {
      const p = {
        type: 'KEY_VALUE',
        key: {
          type: 'NAME',
          reservedWord: true,
          name: 'this'
        },
        value: transformResult(res.this)
      }
      delete res.this
      res.parameters.unshift(p)
    }
    if (res.new) {
      const p = {
        type: 'KEY_VALUE',
        key: {
          type: 'NAME',
          reservedWord: true,
          name: 'new'
        },
        value: transformResult(res.new)
      }
      delete res.new
      res.parameters.unshift(p)
    }
    if (res.result) {
      res.returnType = transformResult(res.result)
      delete res.result
    }
  }

  if (res.type === 'GENERIC') {
    if (res.applications) {
      res.objects = res.applications.map(transformResult)
      delete res.applications
    } else {
      res.objects = []
    }
    res.subject = transformResult(res.expression)
    delete res.expression
  }

  if (res.type === 'RECORD') {
    res.fields = res.fields
      .map(f => f.value === undefined ? f.key : f)
      .map(transformResult)
  }

  if (res.type === 'UNION') {
    res.elements = res.elements.map(transformResult)
  }

  if (res.type === 'KEY_VALUE') {
    res.key = transformResult(res.key)
    if (res.value) {
      res.value = transformResult(res.value)
    } else if (res.value === undefined) {
      delete res.value
    }
  }

  return res
}

function transform (obj) {
  return {
    description: obj.description,
    input: obj.expression,
    expected: transformResult(obj.parsed)
  }
}

let data = fs.readFileSync(0, 'utf-8')
data = replaceVariables(data)
data = extractObject(data)
data = data.map(transform)

console.log(JSON.stringify(data, null, 2))
// console.log(data)

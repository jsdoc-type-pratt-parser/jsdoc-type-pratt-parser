[![Test Status](https://github.com/simonseyock/jsdoc-type-pratt-parser/actions/workflows/test.js.yml/badge.svg?branch=main)](https://github.com/simonseyock/jsdoc-type-pratt-parser/actions?query=branch%3Amain)
[![Npm Package](https://badgen.net/npm/v/jsdoc-type-pratt-parser/alpha)](https://www.npmjs.com/package/jsdoc-type-pratt-parser)
[![Code Style](https://badgen.net/badge/code%20style/ts-standard/blue?icon=typescript)](https://github.com/standard/ts-standard)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)


This project is a parser for jsdoc types. It is heavily inspired by the existing libraries catharsis and
 jsdoctypeparser, but does not use PEG.js, instead it is written as a pratt parser. 
* https://github.com/hegemonic/catharsis
* https://github.com/jsdoctypeparser/jsdoctypeparser
* http://journal.stuffwithstuff.com/2011/03/19/pratt-parsers-expression-parsing-made-easy/

Live Demo
---------

A simple live demo to test expressions can be found at: https://simonseyock.github.io/jsdoc-type-pratt-parser/

Getting started
---------------

```
npm install jsdoc-type-pratt-parser@alpha
```

```js
import { parse } from 'jsdoc-type-pratt-parser'

const result = parse('myType.<string>', 'closure')
```

This library supports compatibility modes for catharsis and jsdoctypeparser. The provided transform functions attempt to
 transform the output to the expected output of the target library. This will not always be the same as some types are
 parsed differently. These modes are thought to make transition easier, but it is advised to use the native output as
 this will be more uniform and will contain more information.
 
Catharsis compat mode:

```js
import { parse, catharsisTransform } from 'jsdoc-type-pratt-parser'

const result = catharsisTransform(parse('myType.<string>', 'closure'))
```

Jsdoctypeparser compat mode:

```js
import { parse, jtpTransform } from 'jsdoc-type-pratt-parser'

const result = jtpTransform(parse('myType.<string>', 'closure'))
```

Stringify:

```js
import { stringify } from 'jsdoc-type-pratt-parser'

const val = stringify({ type: 'NAME', value: 'name'}) // -> 'name'
```

You can customize the stringification by using `stringifyRules` and `transform`:

```js
import { stringifyRules, transform } from 'jsdoc-type-pratt-parser'

const rules = stringifyRules()

// `result` is the current node and `transform` is a function to transform child nodes.
rules.NAME = (result, transform) => 'something else'

const val = transform(rules, { type: 'NAME', value: 'name'}) // -> 'something else'
```

You can traverse a result tree with the `traverse` function:

```js
import { traverse } from 'jsdoc-type-pratt-parser'

// property is the name of the property on parent that contains node
function onEnter(node, parent, property) {
    console.log(node.type)
}

// an onEnter and/or an onLeave function can be supplied
traverse({ type: 'NAME', value: 'name'}, onEnter, console.log)
```

You can also build your own transform rules by implementing the `TransformRules<TransformResultType>` interface or you
can build upon the identity ruleset like this:

```js
import { identityTransformRules, transform } from 'jsdoc-type-pratt-parser'

const myRules = identityTransformRules()
myRules.NAME = () => ({ type: 'NAME', value: 'funky' })

const val = transform(myRules, result)
```

Available Grammars
------------------

Three different modes (grammars) are supported: `'jsdoc'`, `'closure'` and `'typescript'`

Tests Status
------------

This parser runs most tests of https://github.com/hegemonic/catharsis and
 https://github.com/jsdoctypeparser/jsdoctypeparser. It compares the results of the different parsing libraries. If you
 want to find out where the output differs, look in the tests for the comments `// This seems to be an error of ...` or
 the `differ` keyword which indicates that differing results are produced.

API Documentation
-----------------
An API documentation can be found here: https://simonseyock.github.io/jsdoc-type-pratt-parser/docs/modules.html

Performance
-----------

A simple performance [comparision](benchmark/benchmark.js) using [Benchmark.js](https://benchmarkjs.com/) produced the following results:
```
Testing expression: Name
catharsis x 10,194 ops/sec ±22.98% (58 runs sampled)
jsdoc-type-pratt-parser x 238,233 ops/sec ±2.11% (84 runs sampled)
jsdoctypeparser x 29,201 ops/sec ±15.65% (76 runs sampled)
The fastest was jsdoc-type-pratt-parser

Testing expression: Array<number>
catharsis x 5,063 ops/sec ±2.89% (82 runs sampled)
jsdoc-type-pratt-parser x 84,744 ops/sec ±5.34% (77 runs sampled)
jsdoctypeparser x 10,964 ops/sec ±24.98% (52 runs sampled)
The fastest was jsdoc-type-pratt-parser

Testing expression: { keyA: Type<A | "string val" >, keyB: function(string, B): A }
catharsis x 206 ops/sec ±17.93% (59 runs sampled)
jsdoc-type-pratt-parser x 7,706 ops/sec ±12.20% (54 runs sampled)
jsdoctypeparser x 2,456 ops/sec ±22.06% (49 runs sampled)
The fastest was jsdoc-type-pratt-parser

```

catharsis was used without cache, as this is just a simple lookup table that could easily be implemented for any parser.
 

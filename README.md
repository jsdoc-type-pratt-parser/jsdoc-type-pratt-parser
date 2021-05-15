[![Test Status](https://github.com/simonseyock/jsdoc-type-pratt-parser/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/simonseyock/jsdoc-type-pratt-parser/actions?query=branch%3Amain)
[![Npm Package](https://badgen.net/npm/v/jsdoc-type-pratt-parser)](https://www.npmjs.com/package/jsdoc-type-pratt-parser)
[![Code Style](https://badgen.net/badge/code%20style/ts-standard/blue?icon=typescript)](https://github.com/standard/ts-standard)

This project is a parser for jsdoc types. It is heavily inspired by the existing libraries catharsis and
 jsdoctypeparser, but does not use PEG.js, but is written as a pratt parser. 
* http://journal.stuffwithstuff.com/2011/03/19/pratt-parsers-expression-parsing-made-easy/
* https://github.com/hegemonic/catharsis
* https://github.com/jsdoctypeparser/jsdoctypeparser

Live Demo
---------

Simple live demo can be found at: https://simonseyock.github.io/jsdoc-type-pratt-parser/

Getting started
---------------

```
npm install jsdoc-type-pratt-parser
```


```js
import { Parser } from 'jsdoc-type-pratt-parser'

const parser = new Parser({
  mode: 'closure'
})

const result = parser.parse('myType.<string>')
```

This library supports compatibility modes for catharsis and jsdoctypeparser. The provided transform functions attempt to
 transform the output to the expected output of the target library. This will not always be the same as some types are
 parsed differently. These modes are thought to make transition easier, but it is advised to use the native output as
 this will be more uniform and will contain more information.
 
Catharsis compat mode:

```js
import { Parser, catharsisTransform } from 'jsdoc-type-pratt-parser'

const parser = new Parser({
  mode: 'closure'
})

const result = catharsisTransform(parser.parse('myType.<string>'))
```

Jsdoctypeparser compat mode:

```js
import { Parser, jtpTransform } from 'jsdoc-type-pratt-parser'

const parser = new Parser({
  mode: 'closure'
})

const result = jtpTransform(parser.parse('myType.<string>'))
```

Available Grammars
------------------

At the moment there are 3 modes supported: 'jsdoc', 'closure' and 'typescipt'

Tests Status
------------

This parser runs most tests of https://github.com/hegemonic/catharsis and of
 https://github.com/jsdoctypeparser/jsdoctypeparser. It compares the results of the different parsing libraries. If you
 want to find out where the output differs, look in the tests for the comments `// This seems to be an error of ...` or
 the `differ` keyword which indicates that differing results are produced.

It adds an increasing number of tests on its own, especially the tests to assure the differences between the modes.

API Documentation
-----------------
An API documentation can be found here: https://simonseyock.github.io/jsdoc-type-pratt-parser/docs/modules.html

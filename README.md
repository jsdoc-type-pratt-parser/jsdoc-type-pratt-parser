This project is parser for jsdoc types. It is heavily inspired by http://journal.stuffwithstuff.com/2011/03/19/pratt-parsers-expression-parsing-made-easy/, https://github.com/hegemonic/catharsis and https://github.com/jsdoctypeparser/jsdoctypeparser.

Live Demo
---------

Simple live demo can be found at: https://simonseyock.github.io/jsdoc-type-pratt-parser/

Getting started
---------------

The usage is not perfect for now as it is not published as a package for now. Dependening on your needs you might want to run `npm run build` before using. An `index.js` in umd format will be built. All exports from `index.ts` should be available. 

```js
import { Parser } from 'src/index'

const parser = new Parser({
  mode: 'closure'
})

const result = parser.parse('myType.<string>')
```

Catharsis compat mode:

```js
import { Parser, catharsisTransform } from 'src/index'

const parser = new Parser({
  mode: 'closure'
})

const result = catharsisTransform(parser.parse('myType.<string>'))
```

Available Grammars
------------------

At the moment there are 3 modes supported: 'jsdoc', 'closure' and 'typescipt'

Tests Status
------------

This parser runs most tests of https://github.com/hegemonic/catharsis and also some of the typescript tests of https://github.com/jsdoctypeparser/jsdoctypeparser

It adds an increasing number of tests on its own, especially the tests to assure the differences between the modes.

The current status can be checked in the github action results: https://github.com/simonseyock/jsdoc-type-pratt-parser/actions

API Documentation
-----------------
A simple api doc can be found here: https://simonseyock.github.io/jsdoc-type-pratt-parser/docs/

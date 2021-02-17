This project is parser for jsdoc types. It is heavily inspired by http://journal.stuffwithstuff.com/2011/03/19/pratt-parsers-expression-parsing-made-easy/, https://github.com/hegemonic/catharsis and https://github.com/jsdoctypeparser/jsdoctypeparser.

Live Demo
---------

Simple live demo can be found at: https://simonseyock.github.io/jsdoc-type-pratt-parser/

Tests Status
------------

This parser runs most tests of https://github.com/hegemonic/catharsis and also some of the typescript tests of https://github.com/jsdoctypeparser/jsdoctypeparser

The current status is:

```
basics
    ✓ should parse names
    ✓ should parse a complex expression

  passes the catharsis basic tests
    ✓ boolean
    ✓ object
    ✓ object with properties
    ✓ object with a single-quoted string-literal property
    ✓ object with a double-quoted string-literal property
    ✓ object with a string-literal property that includes other punctuation
    ✓ object with a numeric property
    ✓ variable number of parameters
    ✓ optional number parameter
    ✓ optional Object parameter
    ✓ null
    ✓ repeatable null
    ✓ undefined
    ✓ repeatable undefined
    ✓ all
    ✓ repeatable all
    ✓ unknown
    ✓ repeatable unknown
    ✓ name that starts with a reserved word
    ✓ name that includes a hyphen and a numeral
    ✓ name that includes an @ sign

  passes the catharsis function-type tests
    ✓ function with two basic parameters
    ✓ repeatable function with two basic parameters
    ✓ function with two basic parameters and a return value
    ✓ repeatable function with two basic parameters and a return value
    ✓ optional function with one basic parameter
    ✓ function with no parameters and a return value
    ✓ function with a "this" type and no parameters
    ✓ function with a "this" type and one parameter
    ✓ function with a "new" type and no parameters
    ✓ function with a "new" type and one parameter
    ✓ function with a "new" and "this" type and no parameters
    ✓ function with a fixed parameter, followed by a variable number of parameters, as well as a return value
    ✓ function with a variable number of parameters containing the value `null`
    ✓ function with a variable number of parameters containing the value `undefined`
    ✓ function with a variable number of parameters, a "new" type, a "this" type, and a return value
    ✓ function with a repeatable param that is not enclosed in brackets
    ✓ function that returns a type union
    ✓ function with no parameters and no return value
    ✓ function with a variable number of parameters containing any values
    ✓ function with a "this" type that returns a type union
    ✓ function with a "this" type that is a type union, and that returns a type union
    ✓ function with a "new" type and a variable number of params that accept all types, returning a name expression
    ✓ function with a "new" type that accepts an optional parameter of any type, as well as a return value
    ✓ function with a variable number of parameters and a return value
    ✓ function with a "this" type and a parameter that returns a type union

  passes the catharsis nullable tests
    ✓ nullable number
    ✓ postfix nullable number
    ✓ non-nullable object
    ✓ postfix non-nullable object
    ✓ repeatable nullable number
    ✓ postfix repeatable nullable number
    ✓ repeatable non-nullable object
    ✓ postfix repeatable non-nullable object
    ✓ postfix optional nullable number
    ✓ postfix nullable optional number
    ✓ postfix repeatable nullable optional number
    ✓ postfix optional non-nullable object
    ✓ postfix non-nullable optional object
    ✓ postfix repeatable non-nullable optional object

  passes the catharsis record-type tests
    ✓ empty record type
    ✓ record type with 1 typed property
    ✓ repeatable record type with 1 typed property
    ✓ optional record type with 1 typed property
    ✓ nullable record type with 1 typed property
    ✓ non-nullable record type with 1 typed property
    ✓ record type with 1 typed property and 1 untyped property
    ✓ record type with a property that uses a type application as a value
    ✓ record type with a property that uses a type union as a value
    ✓ record type with a property that uses a JavaScript keyword as a key
    ✓ record type with a property that uses a JavaScript future reserved word as a key
    ✓ record type with a property that uses a string representation of a JavaScript boolean literal as a key
    ✓ record type with a property that uses a numeric key

  passes the catharsis type-application tests
    ✓ array of strings, without a dot separator
    ✓ array of strings, with a dot separator
    ✓ repeatable array of strings
    ✓ object whose properties are strings and property values are numbers
    ✓ object whose properties are a type application and property values are a type union
    ✓ array of objects that have a length property
    ✓ array of unknown
    ✓ Promise containing string
    ✓ foo.Promise containing string

  passes the catharsis union-type tests
    ✓ union with 2 types (number and boolean)
    ✓ repeatable union with 2 types (number and boolean)
    ✓ union with 2 types (Object and undefined)
    ✓ union with 3 types (number, Window, and goog.ui.Menu)
    ✓ nullable union with 2 types (number and boolean)
    ✓ non-nullable union with 2 types (number and boolean)
    ✓ optional union with 2 types (number and boolean)
    ✓ union with 2 types (array and object with unknown value type)
    ✓ union with 2 type applications
    ✓ union with 2 types (an error, or a function that returns an error)
    ✓ type union with no enclosing parentheses
    ✓ type union with modifiers and no enclosing parentheses
    ✓ optional union with multiple types
    ✓ optional union with multiple types, including a nested union type

  passes the catharsis codetag tests
    - type application for an array
    - type application for an object with string keys
    - type application for an object with non-string keys
    - function type with parameters and new, this, and returns modifiers

  passes the catharsis jsdoc tests
    ✓ name expression that starts with the word "function"
    ✓ name expression with instance scope punctuation
    ✓ name expression with inner scope punctuation
    ✓ name expression with instance and inner scope punctuation
    ✓ name expression for a class within a module
    ✓ name expression for a class within a module with hyphens
    ✓ name expression containing a reserved word
    ✓ name expression for a symbol variation whose name is an empty string
    ✓ name expression for a symbol variation whose name is one numeral
    ✓ name expression for a symbol variation whose name is multiple numerals
    ✓ name expression for a symbol variation whose name is one letter
    ✓ name expression for a symbol variation whose name is multiple letters
    ✓ name expression enclosed in double quotes
    ✓ name expression enclosed in single quotes
    ✓ name expression partially enclosed in double quotes
    ✓ name expression partially enclosed in single quotes
    ✓ identifier with a repeatable param that is not enclosed in brackets
    ✓ type application with no period
    ✓ Jsdoc Toolkit 2-style array notation for an array of strings
    ✓ Jsdoc Toolkit 2-style array notation for an array of functions
    ✓ Jsdoc Toolkit 2-style nested array (two levels)
    ✓ Jsdoc Toolkit 2-style nested array (three levels)
    ✓ record type with a property that uses a type application as a key
    ✓ record type with a property that uses a type union as a key
    ✓ record type with a property name that starts with a literal
    ✓ record type with a property that contains a function with no preceding space
    ✓ function type with no trailing pathentheses
    1) standard function type (should still parse if JSDoc expressions are allowed)
    ✓ type union with no parentheses, a repeatable param, and a JSDoc-style array

  passes the catharsis link tests
    ✓ type application
    ✓ name expression for a class within a module

  passes the catharsis linkcss tests
    ✓ type application
    ✓ name expression for a class within a module

  lexer
    ✓ should lex name
    ✓ should parse a complex expression

  TypeScript TypeOf
    ✓ typeof name
    ✓ typeof
    ✓ generic with typeof
    ✓ generic with typeof name
    ✓ generic typeof name in parenthesis
    ✓ typeof name in parenthesis
    ✓ repeatable typeof name
    ✓ postfix repeatable typeof name
    ✓ union typeof name
    ✓ union with typeof name
    ✓ typeof array
    ✓ typeof as function parameter
    ✓ typeof as first function parameter
    ✓ typeof as second function parameter
    ✓ typeof as return of function

  TypeScript KeyOf
    ✓ keyof name
    ✓ keyof
    ✓ generic with keyof
    ✓ generic with keyof name
    ✓ generic keyof name in parenthesis
    ✓ keyof name in parenthesis
    ✓ repeatable keyof name
    ✓ postfix repeatable keyof name
    ✓ union keyof name
    ✓ union with keyof name
    ✓ keyof array
    ✓ keyof as function parameter
    ✓ keyof as first function parameter
    ✓ keyof as second function parameter
    ✓ keyof as return of function

  TypeScript import
    ✓ import "x"
    ✓ import "./x"
    ✓ import "../x"
    ✓ import a named export
    ✓ import 2-level named export
    ✓ import 2-level named export as generic

  TypeScript arrow functions
    ✓ arrow with special any type
    ✓ arrow with one parameter and return type
    ✓ arrow with multiple parameters and a return type
    ✓ arrow without parameter and return type
    ✓ function with arrow as return type
    ✓ function with arrow as parameter
    2) arrow function parameter list with trailing comma
    ✓ arrow as generic type
    ✓ arrow returning void
    ✓ arrow returning arrow
    ✓ arrow returning arrow with paramters


  178 passing (57ms)
  4 pending
  2 failing
```

Getting started
---------------

The usage is not perfect for now as it is not published as a package for now. Dependening on your needs you might want to run `npm run build` before using. An `index.js` in umd format will be built. All exports from `index.ts` should be available. 

```
import { Parser } from 'src/index'

const parser = new Parser({
  mode: 'closure'
})

const result = parser.parse('myType.<string>')
```

Catharsis compat mode:

```
import { Parser, catharsisTransform } from 'src/index'

const parser = new Parser({
  mode: 'closure'
})

const result = catharsisTransform(parser.parse('myType.<string>'))
```

API Documentation
-----------------
A simple api doc can be found here: https://simonseyock.github.io/jsdoc-type-pratt-parser/docs/

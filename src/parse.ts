import { Parser } from './Parser.js'
import { createJsdocGrammars } from './grammars/jsdocGrammar.js'
import { createClosureGrammars } from './grammars/closureGrammar.js'
import { createTypescriptGrammars } from './grammars/typescriptGrammar.js'
import type { RootResult } from './result/RootResult.js'
import { Lexer } from './lexer/Lexer.js'
import { rules, looseRules } from './lexer/LexerRules.js'

export type ParseMode = 'closure' | 'jsdoc' | 'typescript'

/**
 * This function parses the given expression in the given mode and produces a {@link RootResult}.
 * @param expression
 * @param mode
 */
export function parse (
  expression: string, mode: ParseMode, {
    computedPropertyParser,
    module = true,
    strictMode = false,
    asyncFunctionBody = false
  }: {
    module?: boolean,
    strictMode?: boolean,
    asyncFunctionBody?: boolean,
    computedPropertyParser?: (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Actual API
      text: string, options?: any
    ) => unknown
  } = {}
): RootResult {
  switch (mode) {
    case 'closure': {
      const { closureGrammar } = createClosureGrammars({
        module,
        strictMode,
        asyncFunctionBody
      });
      return (new Parser(closureGrammar, Lexer.create(looseRules, expression))).parse()
    } case 'jsdoc': {
      const { jsdocGrammar } = createJsdocGrammars({
        module,
        strictMode,
        asyncFunctionBody
      })
      return (new Parser(jsdocGrammar, Lexer.create(looseRules, expression))).parse()
    } case 'typescript': {
      const {
        typescriptGrammar
      } = createTypescriptGrammars({
        module,
        strictMode,
        asyncFunctionBody
      })
      return (new Parser(
        typescriptGrammar,
        Lexer.create(rules, expression),
        undefined,
        computedPropertyParser === undefined ? undefined : {
          externalParsers: {
            computedPropertyParser
          }
        }
      )).parse()
    }
  }
}

/**
 * This function tries to parse the given expression in multiple modes and returns the first successful
 * {@link RootResult}. By default it tries `'typescript'`, `'closure'` and `'jsdoc'` in this order. If
 * no mode was successful it throws the error that was produced by the last parsing attempt.
 * @param expression
 * @param modes
 */
export function tryParse (expression: string, modes: ParseMode[] = ['typescript', 'closure', 'jsdoc']): RootResult {
  let error
  for (const mode of modes) {
    try {
      return parse(expression, mode)
    } catch (e) {
      error = e
    }
  }
  // eslint-disable-next-line @typescript-eslint/only-throw-error -- Ok
  throw error
}

/**
 * This function parses the given expression in the given mode and produces a name path.
 * @param expression
 * @param mode
 */
export function parseNamePath (
  expression: string, mode: ParseMode,
  {
    module = true,
    strictMode = true,
    asyncFunctionBody = true
  }: {
    module?: boolean,
    strictMode?: boolean,
    asyncFunctionBody?: boolean
  } = {}
): RootResult {
  switch (mode) {
    case 'closure': {
      const { closureNamePathGrammar } = createClosureGrammars({
        module,
        strictMode,
        asyncFunctionBody
      });
      return (new Parser(closureNamePathGrammar, Lexer.create(looseRules, expression))).parse()
    } case 'jsdoc': {
      const { jsdocNamePathGrammar } = createJsdocGrammars({
        module,
        strictMode,
        asyncFunctionBody
      })
      return (new Parser(jsdocNamePathGrammar, Lexer.create(looseRules, expression))).parse()
    } case 'typescript': {
      const {
        typescriptNamePathGrammar
      } = createTypescriptGrammars({
        module,
        strictMode,
        asyncFunctionBody
      })
      return (new Parser(
        typescriptNamePathGrammar,
        Lexer.create(rules, expression)
      )).parse()
    }
  }
}

/**
 * This function parses the given expression in the given mode and produces a name.
 * @param expression
 * @param mode
 */
export function parseName (
  expression: string, mode: ParseMode,
  {
    module = true,
    strictMode = true,
    asyncFunctionBody = true
  }: {
    module?: boolean,
    strictMode?: boolean,
    asyncFunctionBody?: boolean
  } = {}
): RootResult {
  switch (mode) {
    case 'closure': {
      const { closureNameGrammar } = createClosureGrammars({
        module,
        strictMode,
        asyncFunctionBody
      });
      return (new Parser(closureNameGrammar, Lexer.create(looseRules, expression))).parse()
    } case 'jsdoc': {
      const { jsdocNameGrammar } = createJsdocGrammars({
        module,
        strictMode,
        asyncFunctionBody
      })
      return (new Parser(jsdocNameGrammar, Lexer.create(looseRules, expression))).parse()
    } case 'typescript': {
      const {
        typescriptNameGrammar
      } = createTypescriptGrammars({
        module,
        strictMode,
        asyncFunctionBody
      })
      return (new Parser(
        typescriptNameGrammar,
        Lexer.create(rules, expression)
      )).parse()
    }
  }
}

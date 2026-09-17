// NOTICE: This code is @generated from code outside the esm directory. Please do not edit it to contribute!

import type { Plugin, CodeInput } from "../code-input.d.mts";
  /**
   * Automatically closes pairs of brackets/quotes/other syntaxes in code, but also lets you choose the brackets this
   * is activated for.
   * Files: auto-close-brackets.js
   */
  declare class AutoCloseBrackets extends Plugin {
    /**
     * Create an auto-close brackets plugin to pass into a template
     * @param {Object} bracketPairs Opening brackets mapped to closing brackets, default and example {"(": ")", "[": "]", "{": "}", '"': '"'}. All brackets must only be one character.
     */
    constructor(bracketPairs?: Object);
  }
export default AutoCloseBrackets;

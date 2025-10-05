// NOTICE: This code is @generated from code outside the esm directory. Please do not edit it to contribute!

import { Template, Plugin } from "../code-input.d.mts";
  /**
   * A template that uses highlight.js syntax highlighting (https://highlightjs.org/).
   */
  export default class Hljs extends Template {
    /**
    * Constructor to create a template that uses highlight.js syntax highlighting (https://highlightjs.org/)
    * @param {Object} hljs Import highlight.js, then after that import pass the `hljs` object as this parameter.
    * @param {Plugin[]} plugins - An array of plugin objects to add extra features - see `codeInput.plugins`
    * @param {boolean} preElementStyled - Defaults to false, which should be right for most themes. If the styling is broken, change to true. (See `Template` constructor's definition.)
    * @returns template object
    */
    constructor(hljs: Object, plugins?: Plugin[], preElementStyled?: boolean)
  }

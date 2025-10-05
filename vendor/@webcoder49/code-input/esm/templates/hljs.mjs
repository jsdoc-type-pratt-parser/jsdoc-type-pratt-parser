// NOTICE: This code is @generated from code outside the esm directory. Please do not edit it to contribute!

import { Template } from "../code-input.mjs";
    /**
     * A template that uses highlight.js syntax highlighting (https://highlightjs.org/).
     */
    class Hljs extends Template { // Dependency: Highlight.js (https://highlightjs.org/)
        /**
         * Constructor to create a template that uses highlight.js syntax highlighting (https://highlightjs.org/)
         * @param {Object} hljs Import highlight.js, then after that import pass the `hljs` object as this parameter.
         * @param {codeInput.Plugin[]} plugins - An array of plugin objects to add extra features - see `codeInput.plugins`
         * @param {boolean} preElementStyled - Defaults to false, which should be right for most themes. If the styling is broken, change to true. (See `Template` constructor's definition.)
         * @returns {Template} template object
         */
        constructor(hljs, plugins = [], preElementStyled = false) {
            super(
                function(codeElement) {
                    codeElement.removeAttribute("data-highlighted");
                    hljs.highlightElement(codeElement);
                }, // highlight
                preElementStyled, // preElementStyled
                true, // isCode
                false, // includeCodeInputInHighlightFunc
                plugins
            );
        }
    };
export default Hljs;

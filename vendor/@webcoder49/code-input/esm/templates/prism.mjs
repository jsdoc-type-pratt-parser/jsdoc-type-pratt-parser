// NOTICE: This code is @generated from code outside the esm directory. Please do not edit it to contribute!

import { Template } from "../code-input.mjs";
    /**
    * A template that uses Prism.js syntax highlighting (https://prismjs.com/).
    */
    class Prism extends Template { // Dependency: Prism.js (https://prismjs.com/)
        /**
        * Constructor to create a template that uses Prism.js syntax highlighting (https://prismjs.com/)
        * @param {Object} prism Import Prism.js, then after that import pass the `Prism` object as this parameter.
        * @param {codeInput.Plugin[]} plugins - An array of plugin objects to add extra features - see `codeInput.plugins`
        * @param {boolean} preElementStyled - Defaults to true, which should be right for most themes. If the styling is broken, change to false. (See `Template` constructor's definition.)
        * @returns {Template} template object
        */
        constructor(prism, plugins = [], preElementStyled = true) {
            super(
                prism.highlightElement, // highlight
                preElementStyled, // preElementStyled
                true, // isCode
                false, // includeCodeInputInHighlightFunc
                plugins
            );
        }
    };
export default Prism;

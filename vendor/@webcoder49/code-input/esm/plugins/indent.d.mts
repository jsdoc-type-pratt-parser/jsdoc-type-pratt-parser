// NOTICE: This code is @generated from code outside the esm directory. Please do not edit it to contribute!

import { Plugin, CodeInput } from "../code-input.d.mts";
  /**
   * Adds indentation using the `Tab` key, and auto-indents after a newline, as well as making it 
   * possible to indent/unindent multiple lines using Tab/Shift+Tab
   * Files: indent.js
   */
  export default class Indent extends Plugin {
    /**
     * Create an indentation plugin to pass into a template
     * @param {boolean} defaultSpaces Should the Tab key enter spaces rather than tabs? Defaults to false.
     * @param {Number} numSpaces How many spaces is each tab character worth? Defaults to 4.
     * @param {Object} bracketPairs Opening brackets mapped to closing brackets, default and example {"(": ")", "[": "]", "{": "}"}. All brackets must only be one character, and this can be left as null to remove bracket-based indentation behaviour.
     * @param {boolean} escTabToChangeFocus Whether pressing the Escape key before (Shift+)Tab should make this keypress focus on a different element (Tab's default behaviour). You should always either enable this or use this plugin's disableTabIndentation and enableTabIndentation methods linked to other keyboard shortcuts, for accessibility.
     * @param {Object} instructionTranslations: user interface string keys mapped to translated versions for localisation. Look at the go-to-line.js source code for the English text.
     */
    constructor(defaultSpaces?: boolean, numSpaces?: Number, bracketPairs?: Object, escTabToChangeFocus?: boolean, instructionTranslations?: {
      tabForIndentation?: string;
      tabForNavigation?: string;
    });
  }

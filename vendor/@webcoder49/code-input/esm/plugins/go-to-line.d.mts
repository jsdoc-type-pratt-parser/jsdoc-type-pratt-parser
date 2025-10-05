// NOTICE: This code is @generated from code outside the esm directory. Please do not edit it to contribute!

import { Plugin, CodeInput } from "../code-input.d.mts";
  /**
   * Add basic Go-To-Line (ctrl-G by default) functionality to the code editor.
   * Files: go-to-line.js / go-to-line.css
   */
  export default class GoToLine extends Plugin {
    /**
     * Create a go-to-line command plugin to pass into a template
     * @param {boolean} useCtrlG Should Ctrl+G be overriden for go-to-line functionality? Either way, you can trigger it yourself using (instance of this plugin)`.showPrompt(code-input element)`.
     * @param {Object} instructionTranslations: user interface string keys mapped to translated versions for localisation. Look at the go-to-line.js source code for the English text.
     */
    constructor(useCtrlG?: boolean,
                instructionTranslations?: {
                  closeDialog?: string;
                  input?: string;
                  guidanceFormat?: string;
                  guidanceLineRange?: (current:Number, max: Number) => string;
                  guidanceColumnRange?: (line: Number, current: Number, max: Number) => string;
                  guidanceValidLine?: (line: Number) => string;
                  guidanceValidColumn?: (line: Number, column: Number) => string;
                });
    /**
     * Show a search-like dialog prompting line number.
     * @param {CodeInput} codeInput the `<code-input>` element.
    */
    showPrompt(codeInput: CodeInput): void;
  }

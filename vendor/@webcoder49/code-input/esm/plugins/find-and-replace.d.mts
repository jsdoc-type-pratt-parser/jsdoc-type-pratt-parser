// NOTICE: This code is @generated from code outside the esm directory. Please do not edit it to contribute!

import { Plugin, CodeInput } from "../code-input.d.mts";
  /**
   * Add Find-and-Replace (Ctrl+F for find, Ctrl+H for replace by default) functionality to the code editor.
   * Files: find-and-replace.js / find-and-replace.css
   */
  export default class FindAndReplace extends Plugin {
    /**
     * Create a find-and-replace command plugin to pass into a template
     * @param {boolean} useCtrlF Should Ctrl+F be overriden for find-and-replace find functionality? Either way, you can also trigger it yourself using (instance of this plugin)`.showPrompt(code-input element, false)`.
     * @param {boolean} useCtrlH Should Ctrl+H be overriden for find-and-replace replace functionality? Either way, you can also trigger it yourself using (instance of this plugin)`.showPrompt(code-input element, true)`.
     * @param {Object} instructionTranslations: user interface string keys mapped to translated versions for localisation. Look at the find-and-replace.js source code for the English text.
     */
    constructor(useCtrlF?: boolean, useCtrlH?: boolean,
                instructionTranslations?: {
                  start?: string;
                  none?: string;
                  oneFound?: string;
                  matchIndex?: (index: Number, count: Number) => string;
                  error?: (message: string) => string;
                  infiniteLoopError?: string;
                  closeDialog?: string;
                  findPlaceholder?: string;
                  findCaseSensitive?: string;
                  findRegExp?: string;
                  replaceTitle?: string;
                  replacePlaceholder?: string;
                  findNext?: string;
                  findPrevious?: string;
                  replaceActionShort?: string;
                  replaceAction?: string;
                  replaceAllActionShort?: string;
                  replaceAllAction?: string
                }
              );
    /**
     * Show a find-and-replace dialog.
     * @param {CodeInput} codeInputElement the `<code-input>` element.
     * @param {boolean} replacePartExpanded whether the replace part of the find-and-replace dialog should be expanded
     */
    showPrompt(codeInputElement: CodeInput, replacePartExpanded: boolean): void;
  }

// NOTICE: This code is @generated from code outside the esm directory. Please do not edit it to contribute!

import { Plugin, CodeInput } from "../code-input.d.mts";
  /**
   * Add Find-and-Replace (Ctrl/Cmd+F for find, Ctrl+H for replace by default) functionality to the code editor.
   * Files: find-and-replace.js / find-and-replace.css
   */
  export default class FindAndReplace extends Plugin {
    /**
     * Create a find-and-replace command plugin to pass into a template. To ensure keyboard shortcuts remain intuitive, set the alwaysCtrl parameter to false.
     * @param {boolean} useCtrlF Should Ctrl/Cmd+F be overridden for find-and-replace find functionality? Either way, you can also trigger it yourself using (instance of this plugin)`.showPrompt(code-input element, false)`.
     * @param {boolean} useCtrlH Should Ctrl+H be overridden for find-and-replace replace functionality? Either way, you can also trigger it yourself using (instance of this plugin)`.showPrompt(code-input element, true)`.
     * @param {Object} instructionTranslations: user interface string keys mapped to translated versions for localisation. Look at the find-and-replace.js source code for the English text.
     * @param {boolean} alwaysCtrl Setting this to false makes the keyboard shortcuts follow the operating system while avoiding clashes (right now: Cmd+F/Ctrl+H on Apple, Ctrl+F/Ctrl+H otherwise.) and is recommended; true forces Ctrl+F/Ctrl+H and is default for backwards compatibility.
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
                },
                alwaysCtrl?: boolean
              );
    /**
     * Show a find-and-replace dialog.
     * @param {CodeInput} codeInputElement the `<code-input>` element.
     * @param {boolean} replacePartExpanded whether the replace part of the find-and-replace dialog should be expanded
     */
    showPrompt(codeInputElement: CodeInput, replacePartExpanded: boolean): void;
  }

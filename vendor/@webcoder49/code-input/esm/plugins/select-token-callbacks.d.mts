// NOTICE: This code is @generated from code outside the esm directory. Please do not edit it to contribute!

import { Plugin, CodeInput } from "../code-input.d.mts";
  /**
   * Make tokens in the <pre><code> element that are included within the selected text of the <code-input>
   * gain a CSS export default class while selected, or trigger JavaScript callbacks.
   * Files: select-token-callbacks.js
   */
  class SelectTokenCallbacks extends Plugin {
    /**
     * Set up the behaviour of tokens text-selected in the `<code-input>` element, and the exact definition of a token being text-selected.
     * 
     * All parameters are optional. If you provide no arguments to the constructor, this will dynamically apply the "code-input_select-token-callbacks_selected" class to selected tokens only, for you to style via CSS.
     * 
     * @param {codeInput.plugins.SelectTokenCallbacks.TokenSelectorCallbacks} tokenSelectorCallbacks What to do with text-selected tokens. See docstrings for the TokenSelectorCallbacks class.
     * @param {boolean} onlyCaretNotSelection If true, tokens will only be marked as selected when no text is selected but rather the caret is inside them (start of selection == end of selection). Default false.
     * @param {boolean} caretAtStartIsSelected Whether the caret or text selection's end being just before the first character of a token means said token is selected. Default true.
     * @param {boolean} caretAtEndIsSelected Whether the caret or text selection's start being just after the last character of a token means said token is selected. Default true.
     * @param {boolean} createSubTokens Whether temporary `<span>` elements should be created inside partially-selected tokens containing just the selected text and given the selected class. Default false.
     * @param {boolean} partiallySelectedTokensAreSelected Whether tokens for which only some of their text is selected should be treated as selected. Default true.
     * @param {boolean} parentTokensAreSelected Whether all parent tokens of selected tokens should be treated as selected. Default true.
     */
    constructor(tokenSelectorCallbacks?: codeInput.plugins.SelectTokenCallbacks.TokenSelectorCallbacks, onlyCaretNotSelection?: boolean, caretAtStartIsSelected?: boolean, caretAtEndIsSelected?: boolean, createSubTokens?: boolean, partiallySelectedTokensAreSelected?: boolean, parentTokensAreSelected?: boolean);
  }

  namespace SelectTokenCallbacks {
    /**
     * A data structure specifying what should be done with tokens when they are selected, and also allows for previously selected
     * tokens to be dealt with each time the selection changes. See the constructor and the createClassSynchronisation static method.
     */
    class TokenSelectorCallbacks {
      /**
       * Pass any callbacks you want to customise the behaviour of selected tokens via JavaScript.
       * 
       * (If the behaviour you want is just differently styling selected tokens _via CSS_, you should probably use the createClassSynchronisation static method.) 
       * @param {(token: HTMLElement) => void} tokenSelectedCallback Runs multiple times when the text selection inside the code-input changes, each time inputting a single (part of the highlighted `<pre><code>`) token element that is selected in the new text selection.
       * @param {(tokenContainer: HTMLElement) => void} selectChangedCallback Each time the text selection inside the code-input changes, runs once before any tokenSelectedCallback calls, inputting the highlighted `<pre><code>`'s `<code>` element that contains all token elements.
       */
      constructor(tokenSelectedCallback: (token: HTMLElement) => void, selectChangedCallback: (tokenContainer: HTMLElement) => void);
      
      /**
       * Use preset callbacks which ensure all tokens in the selected text range in the `<code-input>`, and only such tokens, are given a certain CSS class.
       * 
       * (If the behaviour you want requires more complex behaviour or JavaScript, you should use TokenSelectorCallbacks' constructor.) 
       * 
       * @param {string} selectedClass The CSS class that will be present on tokens only when they are part of the selected text in the `<code-input>` element. Defaults to "code-input_select-token-callbacks_selected".
       * @returns {TokenSelectorCallbacks} A new TokenSelectorCallbacks instance that encodes this behaviour.
       */
      static createClassSynchronisation(selectedClass?: string): codeInput.plugins.SelectTokenCallbacks.TokenSelectorCallbacks;
    }
  }

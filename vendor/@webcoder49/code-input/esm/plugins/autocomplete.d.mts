// NOTICE: This code is @generated from code outside the esm directory. Please do not edit it to contribute!

import { Plugin, CodeInput } from "../code-input.d.mts";
  /**
   * Display a popup under the caret using the text in the code-input element. This works well with autocomplete suggestions.
   * Files: autocomplete.js / autocomplete.css
   */
  export default class Autocomplete extends Plugin {
    /**
     * Pass in a function to create a plugin that displays the popup that takes in (popup element, textarea, textarea.selectionEnd).
     * @param {(popupElement: HTMLElement, textarea: HTMLTextAreaElement, selectionEnd: number, selectionStart?: number) => void} updatePopupCallback  a function to display the popup that takes in (popup element, textarea, textarea.selectionEnd).
     */
    constructor(updatePopupCallback: (popupElem: HTMLElement, textarea: HTMLTextAreaElement, selectionEnd: number, selectionStart?: number) => void);
  }

// NOTICE: This code is @generated from code outside the esm directory. Please do not edit it to contribute!

import { Plugin, CodeInput } from "../code-input.d.mts";
  /**
   * Render special characters and control characters as a symbol with their hex code.
   * Files: special-chars.js, special-chars.css
   *
   * WARNING:
   *
   * This plugin is currently unstable when used with other plugins,
   * Unicode characters, or highlight.js. I hope to fix much of this by
   * major version 3, and if you could help that would be amazing!
   *
   * See https://github.com/WebCoder49/code-input/issues?q=is%3Aissue%20state%3Aopen%20specialchars
   */
  export default class SpecialChars extends Plugin {
    /**
     * Create a special characters plugin instance.
     * Default = covers many non-renderable ASCII characters.
     * @param {Boolean} colorInSpecialChars Whether or not to give special characters custom background colors based on their hex code. Defaults to false.
     * @param {Boolean} inheritTextColor If true, forces the color of the hex code to inherit from syntax highlighting. If false, the base color of the `pre code` element is used to give contrast to the small characters. Defaults to false.
     * @param {RegExp} specialCharRegExp The regular expression which matches special characters. Defaults to many non-renderable ASCII characters (which characters are renderable depends on the browser and OS).
     */
    constructor(colorInSpecialChars?: boolean, inheritTextColor?: boolean, specialCharRegExp?: RegExp);
  }

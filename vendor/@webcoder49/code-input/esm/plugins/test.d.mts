// NOTICE: This code is @generated from code outside the esm directory. Please do not edit it to contribute!

import { Plugin, CodeInput } from "../code-input.d.mts";
  /**
   * JavaScript example of a plugin, which brings extra,
   * non-central optional functionality to code-input.
   * Instances of plugins can be passed in in an array
   * to the `plugins` argument when registering a template,
   * for example like this:
   * ```javascript
   * codeInput.registerTemplate("syntax-highlighted", codeInput.templates.hljs(hljs, [new codeInput.plugins.Test()]));
   * ```
   */
  export default class Test extends Plugin {
    constructor();
  }

// NOTICE: This code is @generated from code outside the esm directory. Please do not edit it to contribute!


/**
 * Plugins are imported from the plugins folder. They will then
 * provide custom extra functionality to code-input elements.
 */
export abstract class Plugin {
  /**
   * Create a Plugin
   * 
   * @param {Array<string>} observedAttributes - The HTML attributes to watch for this plugin, and report any 
   * modifications to the `codeInput.Plugin.attributeChanged` method.
   */
  constructor(observedAttributes: Array<string>)
  /**
   * Runs before code is highlighted.
   * @param {codeInput.CodeInput} codeInput - The codeInput element
   */
  beforeHighlight(codeInput: CodeInput): void
  /**
   * Runs after code is highlighted.
   * @param {codeInput.CodeInput} codeInput - The codeInput element
   */
  afterHighlight(codeInput: CodeInput): void
  /**
   * Runs before elements are added into a code-input element.
   * @param {codeInput.CodeInput} codeInput - The codeInput element
   */
  beforeElementsAdded(codeInput: CodeInput): void
  /**
   * Runs after elements are added into a code-input element (useful for adding events to the textarea).
   * @param {codeInput.CodeInput} codeInput - The codeInput element
   */
  afterElementsAdded(codeInput: CodeInput): void
  /**
   * Runs when an attribute of a code-input element is changed (you must add the attribute name to `codeInput.Plugin.observedAttributes` first).
   * @param {codeInput.CodeInput} codeInput - The codeInput element
   * @param {string} name - The name of the attribute
   * @param {string} oldValue - The value of the attribute before it was changed
   * @param {string} newValue - The value of the attribute after it is changed
   */
  attributeChanged(codeInput: CodeInput, name: string, oldValue: string, newValue: string): void
  /**
   * The HTML attributes to watch for this plugin, and report any 
   * modifications to the `codeInput.Plugin.attributeChanged` method.
   */
  observedAttributes: Array<string>

  /**
   * Replace the values in destination with those from source where the keys match, in-place.
   * @param {Object} destination Where to place the translated strings, already filled with the keys pointing to English strings.
   * @param {Object} source The same keys, or some of them, mapped to translated strings. Keys not present here will retain the values they are maapped to in destination.
   */
  addTranslations(destination: Object, source: Object): void
}


/**
 * If you're using one of the two named highlighters, please see
 * `codeInput.templates.prism` or `codeInput.templates.hljs`.
 * Otherwise please see this class' constructor.
 * Templates are used in `<code-input>` elements and once registered with
 * `codeInput.registerTemplate` will be in charge of the highlighting
 * algorithm and settings for all code-inputs with a `template` attribute
 * matching the registered name.
 */
export class Template {
  /**
   * **When `includeCodeInputInHighlightFunc` is `false`, `highlight` takes only the `<pre><code>` element as a parameter.**
   * 
   * Constructor to create a custom template instance. Pass this into `codeInput.registerTemplate` to use it.
   * I would strongly recommend using the built-in simpler template `codeInput.templates.prism` or `codeInput.templates.hljs`.
   * @param {(codeElement: HTMLElement) => void} highlight - a callback to highlight the code, that takes an HTML `<code>` element inside a `<pre>` element as a parameter
   * @param {boolean} preElementStyled - is the `<pre>` element CSS-styled (if so set to true), or the `<code>` element (false)?
   * @param {boolean} isCode - is this for writing code? If true, the code-input's lang HTML attribute can be used, and the `<code>` element will be given the class name 'language-[lang attribute's value]'.
   * @param {false} includeCodeInputInHighlightFunc - Setting this to true passes the `<code-input>` element as a second argument to the highlight function.
   * @param {codeInput.Plugin[]} plugins - An array of plugin objects to add extra features - see `codeInput.Plugin`
   * @returns template object
   */
  constructor(highlight?: (codeElement: HTMLElement) => void, preElementStyled?: boolean, isCode?: boolean, includeCodeInputInHighlightFunc?: false, plugins?: Plugin[])
  /**
   * **When `includeCodeInputInHighlightFunc` is `true`, `highlight` takes two parameters: the `<pre><code>` element, and the `<code-input>` element.**
   * 
   * Constructor to create a custom template instance. Pass this into `codeInput.registerTemplate` to use it.
   * I would strongly recommend using the built-in simpler template `codeInput.templates.prism` or `codeInput.templates.hljs`.
   * @param {(codeElement: HTMLElement, codeInput: CodeInput) => void} highlight - a callback to highlight the code, that takes an HTML `<code>` element inside a `<pre>` element as a parameter
   * @param {boolean} preElementStyled - is the `<pre>` element CSS-styled (if so set to true), or the `<code>` element (false)?
   * @param {boolean} isCode - is this for writing code? If true, the code-input's lang HTML attribute can be used, and the `<code>` element will be given the class name 'language-[lang attribute's value]'.
   * @param {true} includeCodeInputInHighlightFunc - Setting this to true passes the `<code-input>` element as a second argument to the highlight function.
   * @param {codeInput.Plugin[]} plugins - An array of plugin objects to add extra features - see `codeInput.Plugin`
   * @returns template object
   */
  constructor(highlight?: (codeElement: HTMLElement, codeInput: CodeInput) => void, preElementStyled?: boolean, isCode?: boolean, includeCodeInputInHighlightFunc?: true, plugins?: Plugin[])
  highlight: Function
  preElementStyled: boolean
  isCode: boolean
  includeCodeInputInHighlightFunc: boolean
  plugins: Plugin[] 
}


/**
 * A `<code-input>` element, an instance of an `HTMLElement`, and the result
 * of `document.createElement("code-input")`. Attributes are only set when
 * the element's template has been registered, and before this are null.
 */
export class CodeInput extends HTMLTextAreaElement { // Tries to implement textarea interface
  /**
   * When the code-input's template is registered, this contains its codeInput.Template object.
   */
  templateObject?: readonly Template
  /**
   * Exposed child textarea element for user to input code in; in this version of code-input you shouldn't need to access
   * it because most textarea functionality is present on the code-input element itself.
   */
  textareaElement?: HTMLTextAreaElement
  /**
   * Exposed child pre element where syntax-highlighted code is outputted.
   * Contains this.codeElement as its only child.
   */
  preElement?: HTMLPreElement
  /**
   * Exposed child pre element's child code element where syntax-highlighted code is outputted.
   * Has this.preElement as its parent.
   */
  codeElement?: HTMLElement
  /**
   * Exposed non-scrolling element designed to contain dialog boxes etc. from plugins,
   * that shouldn't scroll with the code-input element.
   */
  dialogContainerElement?: HTMLElement
  /**
   * Show some instructions to the user only if they are using keyboard navigation - for example, a prompt on how to navigate with the keyboard if Tab is repurposed.
   * @param {string} instructions The instructions to display only if keyboard navigation is being used. If it's blank, no instructions will be shown.
   * @param {boolean} includeAriaDescriptionFirst Whether to include the aria-description of the code-input element before the keyboard navigation instructions for a screenreader. Keep this as true when the textarea is first focused.
   */
  setKeyboardNavInstructions(instructions: string, includeAriaDescriptionFirst: boolean): void
  /**
   * Allows plugins to store data in the scope of a single element.
   * Key - name of the plugin, in camelCase
   * Value - object of data to be stored; different plugins may use this differently.
   */
  pluginData: Object
}

/**
 * Register a template so code-input elements with a template attribute that equals the templateName will use the template.
 * See `codeInput.templates` for constructors to create templates.
 * @param {string} templateName - the name to register the template under
 * @param {Object} template - a Template object instance - see `codeInput.templates`  
 */
export function registerTemplate(templateName: string, template: Template): void;
export default { Plugin, Template, CodeInput, registerTemplate };

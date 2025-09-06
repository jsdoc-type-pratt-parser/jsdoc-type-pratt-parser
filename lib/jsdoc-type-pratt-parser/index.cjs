"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  catharsisTransform: () => catharsisTransform,
  identityTransformRules: () => identityTransformRules,
  jtpTransform: () => jtpTransform,
  parse: () => parse,
  stringify: () => stringify,
  stringifyRules: () => stringifyRules,
  transform: () => transform,
  traverse: () => traverse,
  tryParse: () => tryParse,
  visitorKeys: () => visitorKeys
});
module.exports = __toCommonJS(index_exports);

// src/errors.ts
function tokenToString(token) {
  if (token.text !== void 0 && token.text !== "") {
    return `'${token.type}' with value '${token.text}'`;
  } else {
    return `'${token.type}'`;
  }
}
var NoParsletFoundError = class _NoParsletFoundError extends Error {
  constructor(token) {
    super(`No parslet found for token: ${tokenToString(token)}`);
    this.token = token;
    Object.setPrototypeOf(this, _NoParsletFoundError.prototype);
  }
  getToken() {
    return this.token;
  }
};
var EarlyEndOfParseError = class _EarlyEndOfParseError extends Error {
  constructor(token) {
    super(`The parsing ended early. The next token was: ${tokenToString(token)}`);
    this.token = token;
    Object.setPrototypeOf(this, _EarlyEndOfParseError.prototype);
  }
  getToken() {
    return this.token;
  }
};
var UnexpectedTypeError = class _UnexpectedTypeError extends Error {
  constructor(result, message) {
    let error = `Unexpected type: '${result.type}'.`;
    if (message !== void 0) {
      error += ` Message: ${message}`;
    }
    super(error);
    Object.setPrototypeOf(this, _UnexpectedTypeError.prototype);
  }
};

// src/lexer/Lexer.ts
function makePunctuationRule(type) {
  return (text) => {
    if (text.startsWith(type)) {
      return { type, text: type };
    } else {
      return null;
    }
  };
}
function getQuoted(text) {
  let position = 0;
  let char = void 0;
  const mark = text[0];
  let escaped = false;
  if (mark !== "'" && mark !== '"') {
    return null;
  }
  while (position < text.length) {
    position++;
    char = text[position];
    if (!escaped && char === mark) {
      position++;
      break;
    }
    escaped = !escaped && char === "\\";
  }
  if (char !== mark) {
    throw new Error("Unterminated String");
  }
  return text.slice(0, position);
}
var identifierStartRegex = new RegExp("[$_\\p{ID_Start}]|\\\\u\\p{Hex_Digit}{4}|\\\\u\\{0*(?:\\p{Hex_Digit}{1,5}|10\\p{Hex_Digit}{4})\\}", "u");
var identifierContinueRegex = new RegExp("[$\\-\\p{ID_Continue}\\u200C\\u200D]|\\\\u\\p{Hex_Digit}{4}|\\\\u\\{0*(?:\\p{Hex_Digit}{1,5}|10\\p{Hex_Digit}{4})\\}", "u");
function getIdentifier(text) {
  let char = text[0];
  if (!identifierStartRegex.test(char)) {
    return null;
  }
  let position = 1;
  do {
    char = text[position];
    if (!identifierContinueRegex.test(char)) {
      break;
    }
    position++;
  } while (position < text.length);
  return text.slice(0, position);
}
var numberRegex = /^(NaN|-?((\d*\.\d+|\d+)([Ee][+-]?\d+)?|Infinity))/;
function getNumber(text) {
  var _a, _b;
  return (_b = (_a = numberRegex.exec(text)) == null ? void 0 : _a[0]) != null ? _b : null;
}
var identifierRule = (text) => {
  const value = getIdentifier(text);
  if (value == null) {
    return null;
  }
  return {
    type: "Identifier",
    text: value
  };
};
function makeKeyWordRule(type) {
  return (text) => {
    if (!text.startsWith(type)) {
      return null;
    }
    const prepends = text[type.length];
    if (prepends !== void 0 && identifierContinueRegex.test(prepends)) {
      return null;
    }
    return {
      type,
      text: type
    };
  };
}
var stringValueRule = (text) => {
  const value = getQuoted(text);
  if (value == null) {
    return null;
  }
  return {
    type: "StringValue",
    text: value
  };
};
var eofRule = (text) => {
  if (text.length > 0) {
    return null;
  }
  return {
    type: "EOF",
    text: ""
  };
};
var numberRule = (text) => {
  const value = getNumber(text);
  if (value === null) {
    return null;
  }
  return {
    type: "Number",
    text: value
  };
};
var rules = [
  eofRule,
  makePunctuationRule("=>"),
  makePunctuationRule("("),
  makePunctuationRule(")"),
  makePunctuationRule("{"),
  makePunctuationRule("}"),
  makePunctuationRule("["),
  makePunctuationRule("]"),
  makePunctuationRule("|"),
  makePunctuationRule("&"),
  makePunctuationRule("<"),
  makePunctuationRule(">"),
  makePunctuationRule(","),
  makePunctuationRule(";"),
  makePunctuationRule("*"),
  makePunctuationRule("?"),
  makePunctuationRule("!"),
  makePunctuationRule("="),
  makePunctuationRule(":"),
  makePunctuationRule("..."),
  makePunctuationRule("."),
  makePunctuationRule("#"),
  makePunctuationRule("~"),
  makePunctuationRule("/"),
  makePunctuationRule("@"),
  makeKeyWordRule("undefined"),
  makeKeyWordRule("null"),
  makeKeyWordRule("function"),
  makeKeyWordRule("this"),
  makeKeyWordRule("new"),
  makeKeyWordRule("module"),
  makeKeyWordRule("event"),
  makeKeyWordRule("extends"),
  makeKeyWordRule("external"),
  makeKeyWordRule("infer"),
  makeKeyWordRule("typeof"),
  makeKeyWordRule("keyof"),
  makeKeyWordRule("readonly"),
  makeKeyWordRule("import"),
  makeKeyWordRule("is"),
  makeKeyWordRule("in"),
  makeKeyWordRule("asserts"),
  numberRule,
  identifierRule,
  stringValueRule
];
var breakingWhitespaceRegex = /^\s*\n\s*/;
var Lexer = class _Lexer {
  constructor(text, previous, current, next) {
    this.text = "";
    this.text = text;
    this.previous = previous;
    this.current = current;
    this.next = next;
  }
  static create(text) {
    const current = this.read(text);
    text = current.text;
    const next = this.read(text);
    text = next.text;
    return new _Lexer(text, void 0, current.token, next.token);
  }
  static read(text, startOfLine = false) {
    startOfLine || (startOfLine = breakingWhitespaceRegex.test(text));
    text = text.trim();
    for (const rule of rules) {
      const partial = rule(text);
      if (partial !== null) {
        const token = __spreadProps(__spreadValues({}, partial), {
          startOfLine
        });
        text = text.slice(token.text.length);
        return { text, token };
      }
    }
    throw new Error("Unexpected Token " + text);
  }
  advance() {
    const next = _Lexer.read(this.text);
    return new _Lexer(next.text, this.current, this.next, next.token);
  }
};

// src/assertTypes.ts
function assertRootResult(result) {
  if (result === void 0) {
    throw new Error("Unexpected undefined");
  }
  if (result.type === "JsdocTypeKeyValue" || result.type === "JsdocTypeParameterList" || result.type === "JsdocTypeProperty" || result.type === "JsdocTypeReadonlyProperty" || result.type === "JsdocTypeObjectField" || result.type === "JsdocTypeJsdocObjectField" || result.type === "JsdocTypeIndexSignature" || result.type === "JsdocTypeMappedType" || result.type === "JsdocTypeTypeParameter") {
    throw new UnexpectedTypeError(result);
  }
  return result;
}
function assertPlainKeyValueOrRootResult(result) {
  if (result.type === "JsdocTypeKeyValue") {
    return assertPlainKeyValueResult(result);
  }
  return assertRootResult(result);
}
function assertPlainKeyValueOrNameResult(result) {
  if (result.type === "JsdocTypeName") {
    return result;
  }
  return assertPlainKeyValueResult(result);
}
function assertPlainKeyValueResult(result) {
  if (result.type !== "JsdocTypeKeyValue") {
    throw new UnexpectedTypeError(result);
  }
  return result;
}
function assertNumberOrVariadicNameResult(result) {
  var _a;
  if (result.type === "JsdocTypeVariadic") {
    if (((_a = result.element) == null ? void 0 : _a.type) === "JsdocTypeName") {
      return result;
    }
    throw new UnexpectedTypeError(result);
  }
  if (result.type !== "JsdocTypeNumber" && result.type !== "JsdocTypeName") {
    throw new UnexpectedTypeError(result);
  }
  return result;
}
function assertArrayOrTupleResult(result) {
  if (result.type === "JsdocTypeTuple") {
    return result;
  }
  if (result.type === "JsdocTypeGeneric" && result.meta.brackets === "square") {
    return result;
  }
  throw new UnexpectedTypeError(result);
}
function isSquaredProperty(result) {
  return result.type === "JsdocTypeIndexSignature" || result.type === "JsdocTypeMappedType";
}

// src/Parser.ts
var Parser = class {
  constructor(grammar, textOrLexer, baseParser) {
    this.grammar = grammar;
    if (typeof textOrLexer === "string") {
      this._lexer = Lexer.create(textOrLexer);
    } else {
      this._lexer = textOrLexer;
    }
    this.baseParser = baseParser;
  }
  get lexer() {
    return this._lexer;
  }
  /**
   * Parses a given string and throws an error if the parse ended before the end of the string.
   */
  parse() {
    const result = this.parseType(0 /* ALL */);
    if (this.lexer.current.type !== "EOF") {
      throw new EarlyEndOfParseError(this.lexer.current);
    }
    return result;
  }
  /**
   * Parses with the current lexer and asserts that the result is a {@link RootResult}.
   */
  parseType(precedence) {
    return assertRootResult(this.parseIntermediateType(precedence));
  }
  /**
   * The main parsing function. First it tries to parse the current state in the prefix step, and then it continues
   * to parse the state in the infix step.
   */
  parseIntermediateType(precedence) {
    const result = this.tryParslets(null, precedence);
    if (result === null) {
      throw new NoParsletFoundError(this.lexer.current);
    }
    return this.parseInfixIntermediateType(result, precedence);
  }
  /**
   * In the infix parsing step the parser continues to parse the current state with all parslets until none returns
   * a result.
   */
  parseInfixIntermediateType(left, precedence) {
    let result = this.tryParslets(left, precedence);
    while (result !== null) {
      left = result;
      result = this.tryParslets(left, precedence);
    }
    return left;
  }
  /**
   * Tries to parse the current state with all parslets in the grammar and returns the first non null result.
   */
  tryParslets(left, precedence) {
    for (const parslet of this.grammar) {
      const result = parslet(this, precedence, left);
      if (result !== null) {
        return result;
      }
    }
    return null;
  }
  /**
   * If the given type equals the current type of the {@link Lexer} advance the lexer. Return true if the lexer was
   * advanced.
   */
  consume(types) {
    if (!Array.isArray(types)) {
      types = [types];
    }
    if (types.includes(this.lexer.current.type)) {
      this._lexer = this.lexer.advance();
      return true;
    } else {
      return false;
    }
  }
  acceptLexerState(parser) {
    this._lexer = parser.lexer;
  }
};

// src/parslets/isQuestionMarkUnknownType.ts
function isQuestionMarkUnknownType(next) {
  return next === "}" || next === "EOF" || next === "|" || next === "," || next === ")" || next === ">";
}

// src/parslets/NullableParslets.ts
var nullableParslet = (parser, precedence, left) => {
  const type = parser.lexer.current.type;
  const next = parser.lexer.next.type;
  const accept = left == null && type === "?" && !isQuestionMarkUnknownType(next) || left != null && type === "?";
  if (!accept) {
    return null;
  }
  parser.consume("?");
  if (left == null) {
    return {
      type: "JsdocTypeNullable",
      element: parser.parseType(12 /* NULLABLE */),
      meta: {
        position: "prefix"
      }
    };
  } else {
    return {
      type: "JsdocTypeNullable",
      element: assertRootResult(left),
      meta: {
        position: "suffix"
      }
    };
  }
};

// src/parslets/Parslet.ts
function composeParslet(options) {
  const parslet = (parser, curPrecedence, left) => {
    const type = parser.lexer.current.type;
    const next = parser.lexer.next.type;
    if (left === null) {
      if ("parsePrefix" in options) {
        if (options.accept(type, next)) {
          return options.parsePrefix(parser);
        }
      }
    } else {
      if ("parseInfix" in options) {
        if (options.precedence > curPrecedence && options.accept(type, next)) {
          return options.parseInfix(parser, left);
        }
      }
    }
    return null;
  };
  Object.defineProperty(parslet, "name", {
    value: options.name
  });
  return parslet;
}

// src/parslets/OptionalParslet.ts
var optionalParslet = composeParslet({
  name: "optionalParslet",
  accept: (type) => type === "=",
  precedence: 11 /* OPTIONAL */,
  parsePrefix: (parser) => {
    parser.consume("=");
    return {
      type: "JsdocTypeOptional",
      element: parser.parseType(11 /* OPTIONAL */),
      meta: {
        position: "prefix"
      }
    };
  },
  parseInfix: (parser, left) => {
    parser.consume("=");
    return {
      type: "JsdocTypeOptional",
      element: assertRootResult(left),
      meta: {
        position: "suffix"
      }
    };
  }
});

// src/parslets/NumberParslet.ts
var numberParslet = composeParslet({
  name: "numberParslet",
  accept: (type) => type === "Number",
  parsePrefix: (parser) => {
    const value = parseFloat(parser.lexer.current.text);
    parser.consume("Number");
    return {
      type: "JsdocTypeNumber",
      value
    };
  }
});

// src/parslets/ParenthesisParslet.ts
var parenthesisParslet = composeParslet({
  name: "parenthesisParslet",
  accept: (type) => type === "(",
  parsePrefix: (parser) => {
    parser.consume("(");
    if (parser.consume(")")) {
      return {
        type: "JsdocTypeParameterList",
        elements: []
      };
    }
    const result = parser.parseIntermediateType(0 /* ALL */);
    if (!parser.consume(")")) {
      throw new Error("Unterminated parenthesis");
    }
    if (result.type === "JsdocTypeParameterList") {
      return result;
    } else if (result.type === "JsdocTypeKeyValue") {
      return {
        type: "JsdocTypeParameterList",
        elements: [result]
      };
    }
    return {
      type: "JsdocTypeParenthesis",
      element: assertRootResult(result)
    };
  }
});

// src/parslets/SpecialTypesParslet.ts
var specialTypesParslet = composeParslet({
  name: "specialTypesParslet",
  accept: (type, next) => type === "?" && isQuestionMarkUnknownType(next) || type === "null" || type === "undefined" || type === "*",
  parsePrefix: (parser) => {
    if (parser.consume("null")) {
      return {
        type: "JsdocTypeNull"
      };
    }
    if (parser.consume("undefined")) {
      return {
        type: "JsdocTypeUndefined"
      };
    }
    if (parser.consume("*")) {
      return {
        type: "JsdocTypeAny"
      };
    }
    if (parser.consume("?")) {
      return {
        type: "JsdocTypeUnknown"
      };
    }
    throw new Error("Unacceptable token: " + parser.lexer.current.text);
  }
});

// src/parslets/NotNullableParslet.ts
var notNullableParslet = composeParslet({
  name: "notNullableParslet",
  accept: (type) => type === "!",
  precedence: 12 /* NULLABLE */,
  parsePrefix: (parser) => {
    parser.consume("!");
    return {
      type: "JsdocTypeNotNullable",
      element: parser.parseType(12 /* NULLABLE */),
      meta: {
        position: "prefix"
      }
    };
  },
  parseInfix: (parser, left) => {
    parser.consume("!");
    return {
      type: "JsdocTypeNotNullable",
      element: assertRootResult(left),
      meta: {
        position: "suffix"
      }
    };
  }
});

// src/parslets/ParameterListParslet.ts
function createParameterListParslet({ allowTrailingComma }) {
  return composeParslet({
    name: "parameterListParslet",
    accept: (type) => type === ",",
    precedence: 1 /* PARAMETER_LIST */,
    parseInfix: (parser, left) => {
      const elements = [
        assertPlainKeyValueOrRootResult(left)
      ];
      parser.consume(",");
      do {
        try {
          const next = parser.parseIntermediateType(1 /* PARAMETER_LIST */);
          elements.push(assertPlainKeyValueOrRootResult(next));
        } catch (e) {
          if (allowTrailingComma && e instanceof NoParsletFoundError) {
            break;
          } else {
            throw e;
          }
        }
      } while (parser.consume(","));
      if (elements.length > 0 && elements.slice(0, -1).some((e) => e.type === "JsdocTypeVariadic")) {
        throw new Error("Only the last parameter may be a rest parameter");
      }
      return {
        type: "JsdocTypeParameterList",
        elements
      };
    }
  });
}

// src/parslets/GenericParslet.ts
var genericParslet = composeParslet({
  name: "genericParslet",
  accept: (type, next) => type === "<" || type === "." && next === "<",
  precedence: 17 /* GENERIC */,
  parseInfix: (parser, left) => {
    const dot = parser.consume(".");
    parser.consume("<");
    const objects = [];
    let infer = false;
    if (parser.consume("infer")) {
      infer = true;
      const left2 = parser.parseIntermediateType(10 /* SYMBOL */);
      if (left2.type !== "JsdocTypeName") {
        throw new UnexpectedTypeError(left2, "A typescript infer always has to have a name.");
      }
      objects.push(left2);
    } else {
      do {
        objects.push(parser.parseType(1 /* PARAMETER_LIST */));
      } while (parser.consume(","));
    }
    if (!parser.consume(">")) {
      throw new Error("Unterminated generic parameter list");
    }
    return __spreadProps(__spreadValues({
      type: "JsdocTypeGeneric",
      left: assertRootResult(left),
      elements: objects
    }, infer ? { infer: true } : {}), {
      meta: {
        brackets: "angle",
        dot
      }
    });
  }
});

// src/parslets/UnionParslets.ts
var unionParslet = composeParslet({
  name: "unionParslet",
  accept: (type) => type === "|",
  precedence: 5 /* UNION */,
  parseInfix: (parser, left) => {
    parser.consume("|");
    const elements = [];
    do {
      elements.push(parser.parseType(5 /* UNION */));
    } while (parser.consume("|"));
    return {
      type: "JsdocTypeUnion",
      elements: [assertRootResult(left), ...elements]
    };
  }
});

// src/grammars/baseGrammar.ts
var baseGrammar = [
  nullableParslet,
  optionalParslet,
  numberParslet,
  parenthesisParslet,
  specialTypesParslet,
  notNullableParslet,
  createParameterListParslet({
    allowTrailingComma: true
  }),
  genericParslet,
  unionParslet,
  optionalParslet
];

// src/parslets/NamePathParslet.ts
function createNamePathParslet({ allowSquareBracketsOnAnyType, allowJsdocNamePaths, pathGrammar: pathGrammar2 }) {
  return function namePathParslet(parser, precedence, left) {
    if (left == null || precedence >= 18 /* NAME_PATH */) {
      return null;
    }
    const type = parser.lexer.current.type;
    const next = parser.lexer.next.type;
    const accept = type === "." && next !== "<" || type === "[" && (allowSquareBracketsOnAnyType || left.type === "JsdocTypeName") || allowJsdocNamePaths && (type === "~" || type === "#");
    if (!accept) {
      return null;
    }
    let pathType;
    let brackets = false;
    if (parser.consume(".")) {
      pathType = "property";
    } else if (parser.consume("[")) {
      pathType = "property-brackets";
      brackets = true;
    } else if (parser.consume("~")) {
      pathType = "inner";
    } else {
      parser.consume("#");
      pathType = "instance";
    }
    const pathParser = pathGrammar2 !== null ? new Parser(pathGrammar2, parser.lexer, parser) : parser;
    const parsed = pathParser.parseIntermediateType(18 /* NAME_PATH */);
    parser.acceptLexerState(pathParser);
    let right;
    switch (parsed.type) {
      case "JsdocTypeName":
        right = {
          type: "JsdocTypeProperty",
          value: parsed.value,
          meta: {
            quote: void 0
          }
        };
        break;
      case "JsdocTypeNumber":
        right = {
          type: "JsdocTypeProperty",
          value: parsed.value.toString(10),
          meta: {
            quote: void 0
          }
        };
        break;
      case "JsdocTypeStringValue":
        right = {
          type: "JsdocTypeProperty",
          value: parsed.value,
          meta: {
            quote: parsed.meta.quote
          }
        };
        break;
      case "JsdocTypeSpecialNamePath":
        if (parsed.specialType === "event") {
          right = parsed;
        } else {
          throw new UnexpectedTypeError(parsed, "Type 'JsdocTypeSpecialNamePath' is only allowed with specialType 'event'");
        }
        break;
      default:
        throw new UnexpectedTypeError(parsed, "Expecting 'JsdocTypeName', 'JsdocTypeNumber', 'JsdocStringValue' or 'JsdocTypeSpecialNamePath'");
    }
    if (brackets && !parser.consume("]")) {
      const token = parser.lexer.current;
      throw new Error(`Unterminated square brackets. Next token is '${token.type}' with text '${token.text}'`);
    }
    return {
      type: "JsdocTypeNamePath",
      left: assertRootResult(left),
      right,
      pathType
    };
  };
}

// src/parslets/NameParslet.ts
function createNameParslet({ allowedAdditionalTokens }) {
  return composeParslet({
    name: "nameParslet",
    accept: (type) => type === "Identifier" || type === "this" || type === "new" || allowedAdditionalTokens.includes(type),
    parsePrefix: (parser) => {
      const { type, text } = parser.lexer.current;
      parser.consume(type);
      return {
        type: "JsdocTypeName",
        value: text
      };
    }
  });
}

// src/parslets/StringValueParslet.ts
var stringValueParslet = composeParslet({
  name: "stringValueParslet",
  accept: (type) => type === "StringValue",
  parsePrefix: (parser) => {
    const text = parser.lexer.current.text;
    parser.consume("StringValue");
    return {
      type: "JsdocTypeStringValue",
      value: text.slice(1, -1),
      meta: {
        quote: text.startsWith("'") ? "single" : "double"
      }
    };
  }
});

// src/parslets/SpecialNamePathParslet.ts
function createSpecialNamePathParslet({ pathGrammar: pathGrammar2, allowedTypes }) {
  return composeParslet({
    name: "specialNamePathParslet",
    accept: (type) => allowedTypes.includes(type),
    parsePrefix: (parser) => {
      const type = parser.lexer.current.type;
      parser.consume(type);
      if (!parser.consume(":")) {
        return {
          type: "JsdocTypeName",
          value: type
        };
      }
      let result;
      let token = parser.lexer.current;
      if (parser.consume("StringValue")) {
        result = {
          type: "JsdocTypeSpecialNamePath",
          value: token.text.slice(1, -1),
          specialType: type,
          meta: {
            quote: token.text.startsWith("'") ? "single" : "double"
          }
        };
      } else {
        let value = "";
        const allowed = ["Identifier", "@", "/"];
        while (allowed.some((type2) => parser.consume(type2))) {
          value += token.text;
          token = parser.lexer.current;
        }
        result = {
          type: "JsdocTypeSpecialNamePath",
          value,
          specialType: type,
          meta: {
            quote: void 0
          }
        };
      }
      const moduleParser = new Parser(pathGrammar2, parser.lexer, parser);
      const moduleResult = moduleParser.parseInfixIntermediateType(result, 0 /* ALL */);
      parser.acceptLexerState(moduleParser);
      return assertRootResult(moduleResult);
    }
  });
}

// src/grammars/pathGrammar.ts
var basePathGrammar = [
  createNameParslet({
    allowedAdditionalTokens: ["external", "module"]
  }),
  stringValueParslet,
  numberParslet,
  createNamePathParslet({
    allowSquareBracketsOnAnyType: false,
    allowJsdocNamePaths: true,
    pathGrammar: null
  })
];
var pathGrammar = [
  ...basePathGrammar,
  createSpecialNamePathParslet({
    allowedTypes: ["event"],
    pathGrammar: basePathGrammar
  })
];

// src/parslets/FunctionParslet.ts
function getParameters(value) {
  let parameters = [];
  if (value.type === "JsdocTypeParameterList") {
    parameters = value.elements;
  } else if (value.type === "JsdocTypeParenthesis") {
    parameters = [value.element];
  } else {
    throw new UnexpectedTypeError(value);
  }
  return parameters.map((p) => assertPlainKeyValueOrRootResult(p));
}
function getUnnamedParameters(value) {
  const parameters = getParameters(value);
  if (parameters.some((p) => p.type === "JsdocTypeKeyValue")) {
    throw new Error("No parameter should be named");
  }
  return parameters;
}
function createFunctionParslet({ allowNamedParameters, allowNoReturnType, allowWithoutParenthesis, allowNewAsFunctionKeyword }) {
  return composeParslet({
    name: "functionParslet",
    accept: (type, next) => type === "function" || allowNewAsFunctionKeyword && type === "new" && next === "(",
    parsePrefix: (parser) => {
      const newKeyword = parser.consume("new");
      parser.consume("function");
      const hasParenthesis = parser.lexer.current.type === "(";
      if (!hasParenthesis) {
        if (!allowWithoutParenthesis) {
          throw new Error("function is missing parameter list");
        }
        return {
          type: "JsdocTypeName",
          value: "function"
        };
      }
      let result = {
        type: "JsdocTypeFunction",
        parameters: [],
        arrow: false,
        constructor: newKeyword,
        parenthesis: hasParenthesis
      };
      const value = parser.parseIntermediateType(14 /* FUNCTION */);
      if (allowNamedParameters === void 0) {
        result.parameters = getUnnamedParameters(value);
      } else if (newKeyword && value.type === "JsdocTypeFunction" && value.arrow) {
        result = value;
        result.constructor = true;
        return result;
      } else {
        result.parameters = getParameters(value);
        for (const p of result.parameters) {
          if (p.type === "JsdocTypeKeyValue" && !allowNamedParameters.includes(p.key)) {
            throw new Error(`only allowed named parameters are ${allowNamedParameters.join(", ")} but got ${p.type}`);
          }
        }
      }
      if (parser.consume(":")) {
        result.returnType = parser.parseType(7 /* PREFIX */);
      } else {
        if (!allowNoReturnType) {
          throw new Error("function is missing return type");
        }
      }
      return result;
    }
  });
}

// src/parslets/VariadicParslet.ts
function createVariadicParslet({ allowPostfix, allowEnclosingBrackets }) {
  return composeParslet({
    name: "variadicParslet",
    accept: (type) => type === "...",
    precedence: 7 /* PREFIX */,
    parsePrefix: (parser) => {
      parser.consume("...");
      const brackets = allowEnclosingBrackets && parser.consume("[");
      try {
        const element = parser.parseType(7 /* PREFIX */);
        if (brackets && !parser.consume("]")) {
          throw new Error("Unterminated variadic type. Missing ']'");
        }
        return {
          type: "JsdocTypeVariadic",
          element: assertRootResult(element),
          meta: {
            position: "prefix",
            squareBrackets: brackets
          }
        };
      } catch (e) {
        if (e instanceof NoParsletFoundError) {
          if (brackets) {
            throw new Error("Empty square brackets for variadic are not allowed.");
          }
          return {
            type: "JsdocTypeVariadic",
            meta: {
              position: void 0,
              squareBrackets: false
            }
          };
        } else {
          throw e;
        }
      }
    },
    parseInfix: allowPostfix ? (parser, left) => {
      parser.consume("...");
      return {
        type: "JsdocTypeVariadic",
        element: assertRootResult(left),
        meta: {
          position: "suffix",
          squareBrackets: false
        }
      };
    } : void 0
  });
}

// src/parslets/SymbolParslet.ts
var symbolParslet = composeParslet({
  name: "symbolParslet",
  accept: (type) => type === "(",
  precedence: 10 /* SYMBOL */,
  parseInfix: (parser, left) => {
    if (left.type !== "JsdocTypeName") {
      throw new Error("Symbol expects a name on the left side. (Reacting on '(')");
    }
    parser.consume("(");
    const result = {
      type: "JsdocTypeSymbol",
      value: left.value
    };
    if (!parser.consume(")")) {
      const next = parser.parseIntermediateType(10 /* SYMBOL */);
      result.element = assertNumberOrVariadicNameResult(next);
      if (!parser.consume(")")) {
        throw new Error("Symbol does not end after value");
      }
    }
    return result;
  }
});

// src/parslets/ArrayBracketsParslet.ts
var arrayBracketsParslet = composeParslet({
  name: "arrayBracketsParslet",
  precedence: 16 /* ARRAY_BRACKETS */,
  accept: (type, next) => type === "[" && next === "]",
  parseInfix: (parser, left) => {
    parser.consume("[");
    parser.consume("]");
    return {
      type: "JsdocTypeGeneric",
      left: {
        type: "JsdocTypeName",
        value: "Array"
      },
      elements: [
        assertRootResult(left)
      ],
      meta: {
        brackets: "square",
        dot: false
      }
    };
  }
});

// src/parslets/ObjectParslet.ts
function createObjectParslet({ objectFieldGrammar: objectFieldGrammar3, allowKeyTypes }) {
  return composeParslet({
    name: "objectParslet",
    accept: (type) => type === "{",
    parsePrefix: (parser) => {
      parser.consume("{");
      const result = {
        type: "JsdocTypeObject",
        meta: {
          separator: "comma"
        },
        elements: []
      };
      if (!parser.consume("}")) {
        let separator;
        const fieldParser = new Parser(objectFieldGrammar3, parser.lexer, parser);
        while (true) {
          fieldParser.acceptLexerState(parser);
          let field = fieldParser.parseIntermediateType(2 /* OBJECT */);
          parser.acceptLexerState(fieldParser);
          if (field === void 0 && allowKeyTypes) {
            field = parser.parseIntermediateType(2 /* OBJECT */);
          }
          let optional = false;
          if (field.type === "JsdocTypeNullable") {
            optional = true;
            field = field.element;
          }
          if (field.type === "JsdocTypeNumber" || field.type === "JsdocTypeName" || field.type === "JsdocTypeStringValue") {
            let quote2;
            if (field.type === "JsdocTypeStringValue") {
              quote2 = field.meta.quote;
            }
            result.elements.push({
              type: "JsdocTypeObjectField",
              key: field.value.toString(),
              right: void 0,
              optional,
              readonly: false,
              meta: {
                quote: quote2
              }
            });
          } else if (field.type === "JsdocTypeObjectField" || field.type === "JsdocTypeJsdocObjectField") {
            result.elements.push(field);
          } else {
            throw new UnexpectedTypeError(field);
          }
          if (parser.lexer.current.startOfLine) {
            separator = "linebreak";
            parser.consume(",") || parser.consume(";");
          } else if (parser.consume(",")) {
            separator = "comma";
          } else if (parser.consume(";")) {
            separator = "semicolon";
          } else {
            break;
          }
          const type = parser.lexer.current.type;
          if (type === "}") {
            break;
          }
        }
        result.meta.separator = separator != null ? separator : "comma";
        if (separator === "linebreak") {
          result.meta.propertyIndent = "  ";
        }
        if (!parser.consume("}")) {
          throw new Error("Unterminated record type. Missing '}'");
        }
      }
      return result;
    }
  });
}

// src/parslets/ObjectFieldParslet.ts
function createObjectFieldParslet({ allowSquaredProperties, allowKeyTypes, allowReadonly, allowOptional }) {
  return composeParslet({
    name: "objectFieldParslet",
    precedence: 3 /* KEY_VALUE */,
    accept: (type) => type === ":",
    parseInfix: (parser, left) => {
      var _a;
      let optional = false;
      let readonlyProperty = false;
      if (allowOptional && left.type === "JsdocTypeNullable") {
        optional = true;
        left = left.element;
      }
      if (allowReadonly && left.type === "JsdocTypeReadonlyProperty") {
        readonlyProperty = true;
        left = left.element;
      }
      const parentParser = (_a = parser.baseParser) != null ? _a : parser;
      parentParser.acceptLexerState(parser);
      if (left.type === "JsdocTypeNumber" || left.type === "JsdocTypeName" || left.type === "JsdocTypeStringValue" || isSquaredProperty(left)) {
        if (isSquaredProperty(left) && !allowSquaredProperties) {
          throw new UnexpectedTypeError(left);
        }
        parentParser.consume(":");
        let quote2;
        if (left.type === "JsdocTypeStringValue") {
          quote2 = left.meta.quote;
        }
        const right = parentParser.parseType(3 /* KEY_VALUE */);
        parser.acceptLexerState(parentParser);
        return {
          type: "JsdocTypeObjectField",
          key: isSquaredProperty(left) ? left : left.value.toString(),
          right,
          optional,
          readonly: readonlyProperty,
          meta: {
            quote: quote2
          }
        };
      } else {
        if (!allowKeyTypes) {
          throw new UnexpectedTypeError(left);
        }
        parentParser.consume(":");
        const right = parentParser.parseType(3 /* KEY_VALUE */);
        parser.acceptLexerState(parentParser);
        return {
          type: "JsdocTypeJsdocObjectField",
          left: assertRootResult(left),
          right
        };
      }
    }
  });
}

// src/parslets/KeyValueParslet.ts
function createKeyValueParslet({ allowOptional, allowVariadic }) {
  return composeParslet({
    name: "keyValueParslet",
    precedence: 3 /* KEY_VALUE */,
    accept: (type) => type === ":",
    parseInfix: (parser, left) => {
      let optional = false;
      let variadic = false;
      if (allowOptional && left.type === "JsdocTypeNullable") {
        optional = true;
        left = left.element;
      }
      if (allowVariadic && left.type === "JsdocTypeVariadic" && left.element !== void 0) {
        variadic = true;
        left = left.element;
      }
      if (left.type !== "JsdocTypeName") {
        throw new UnexpectedTypeError(left);
      }
      parser.consume(":");
      const right = parser.parseType(3 /* KEY_VALUE */);
      return {
        type: "JsdocTypeKeyValue",
        key: left.value,
        right,
        optional,
        variadic
      };
    }
  });
}

// src/grammars/jsdocGrammar.ts
var jsdocBaseGrammar = [
  ...baseGrammar,
  createFunctionParslet({
    allowWithoutParenthesis: true,
    allowNamedParameters: ["this", "new"],
    allowNoReturnType: true,
    allowNewAsFunctionKeyword: false
  }),
  stringValueParslet,
  createSpecialNamePathParslet({
    allowedTypes: ["module", "external", "event"],
    pathGrammar
  }),
  createVariadicParslet({
    allowEnclosingBrackets: true,
    allowPostfix: true
  }),
  createNameParslet({
    allowedAdditionalTokens: ["keyof"]
  }),
  symbolParslet,
  arrayBracketsParslet,
  createNamePathParslet({
    allowSquareBracketsOnAnyType: false,
    allowJsdocNamePaths: true,
    pathGrammar
  })
];
var jsdocGrammar = [
  ...jsdocBaseGrammar,
  createObjectParslet({
    // jsdoc syntax allows full types as keys, so we need to pull in the full grammar here
    // we leave out the object type deliberately
    objectFieldGrammar: [
      createNameParslet({
        allowedAdditionalTokens: ["typeof", "module", "in"]
      }),
      createObjectFieldParslet({
        allowSquaredProperties: false,
        allowKeyTypes: true,
        allowOptional: false,
        allowReadonly: false
      }),
      ...jsdocBaseGrammar
    ],
    allowKeyTypes: true
  }),
  createKeyValueParslet({
    allowOptional: true,
    allowVariadic: true
  })
];

// src/parslets/TypeOfParslet.ts
var typeOfParslet = composeParslet({
  name: "typeOfParslet",
  accept: (type) => type === "typeof",
  parsePrefix: (parser) => {
    parser.consume("typeof");
    return {
      type: "JsdocTypeTypeof",
      element: parser.parseType(13 /* KEY_OF_TYPE_OF */)
    };
  }
});

// src/grammars/closureGrammar.ts
var objectFieldGrammar = [
  createNameParslet({
    allowedAdditionalTokens: ["typeof", "module", "keyof", "event", "external", "in"]
  }),
  nullableParslet,
  optionalParslet,
  stringValueParslet,
  numberParslet,
  createObjectFieldParslet({
    allowSquaredProperties: false,
    allowKeyTypes: false,
    allowOptional: false,
    allowReadonly: false
  })
];
var closureGrammar = [
  ...baseGrammar,
  createObjectParslet({
    allowKeyTypes: false,
    objectFieldGrammar
  }),
  createNameParslet({
    allowedAdditionalTokens: ["event", "external", "in"]
  }),
  typeOfParslet,
  createFunctionParslet({
    allowWithoutParenthesis: false,
    allowNamedParameters: ["this", "new"],
    allowNoReturnType: true,
    allowNewAsFunctionKeyword: false
  }),
  createVariadicParslet({
    allowEnclosingBrackets: false,
    allowPostfix: false
  }),
  // additional name parslet is needed for some special cases
  createNameParslet({
    allowedAdditionalTokens: ["keyof"]
  }),
  createSpecialNamePathParslet({
    allowedTypes: ["module"],
    pathGrammar
  }),
  createNamePathParslet({
    allowSquareBracketsOnAnyType: false,
    allowJsdocNamePaths: true,
    pathGrammar
  }),
  createKeyValueParslet({
    allowOptional: false,
    allowVariadic: false
  }),
  symbolParslet
];

// src/parslets/assertsParslet.ts
var assertsParslet = composeParslet({
  name: "assertsParslet",
  accept: (type) => type === "asserts",
  parsePrefix: (parser) => {
    parser.consume("asserts");
    const left = parser.parseIntermediateType(10 /* SYMBOL */);
    if (left.type !== "JsdocTypeName") {
      throw new UnexpectedTypeError(left, "A typescript asserts always has to have a name.");
    }
    if (!parser.consume("is")) {
      return {
        type: "JsdocTypeAssertsPlain",
        element: left
      };
    }
    return {
      type: "JsdocTypeAsserts",
      left,
      right: assertRootResult(parser.parseIntermediateType(8 /* INFIX */))
    };
  }
});

// src/parslets/TupleParslet.ts
function createTupleParslet({ allowQuestionMark }) {
  return composeParslet({
    name: "tupleParslet",
    accept: (type) => type === "[",
    parsePrefix: (parser) => {
      parser.consume("[");
      const result = {
        type: "JsdocTypeTuple",
        elements: []
      };
      if (parser.consume("]")) {
        return result;
      }
      const typeList = parser.parseIntermediateType(0 /* ALL */);
      if (typeList.type === "JsdocTypeParameterList") {
        if (typeList.elements[0].type === "JsdocTypeKeyValue") {
          result.elements = typeList.elements.map(assertPlainKeyValueResult);
        } else {
          result.elements = typeList.elements.map(assertRootResult);
        }
      } else {
        if (typeList.type === "JsdocTypeKeyValue") {
          result.elements = [assertPlainKeyValueResult(typeList)];
        } else {
          result.elements = [assertRootResult(typeList)];
        }
      }
      if (!parser.consume("]")) {
        throw new Error("Unterminated '['");
      }
      if (!allowQuestionMark && result.elements.some((e) => e.type === "JsdocTypeUnknown")) {
        throw new Error("Question mark in tuple not allowed");
      }
      return result;
    }
  });
}

// src/parslets/KeyOfParslet.ts
var keyOfParslet = composeParslet({
  name: "keyOfParslet",
  accept: (type) => type === "keyof",
  parsePrefix: (parser) => {
    parser.consume("keyof");
    return {
      type: "JsdocTypeKeyof",
      element: assertRootResult(parser.parseType(13 /* KEY_OF_TYPE_OF */))
    };
  }
});

// src/parslets/ImportParslet.ts
var importParslet = composeParslet({
  name: "importParslet",
  accept: (type) => type === "import",
  parsePrefix: (parser) => {
    parser.consume("import");
    if (!parser.consume("(")) {
      throw new Error("Missing parenthesis after import keyword");
    }
    const path = parser.parseType(7 /* PREFIX */);
    if (path.type !== "JsdocTypeStringValue") {
      throw new Error("Only string values are allowed as paths for imports");
    }
    if (!parser.consume(")")) {
      throw new Error("Missing closing parenthesis after import keyword");
    }
    return {
      type: "JsdocTypeImport",
      element: path
    };
  }
});

// src/parslets/ReadonlyPropertyParslet.ts
var readonlyPropertyParslet = composeParslet({
  name: "readonlyPropertyParslet",
  accept: (type) => type === "readonly",
  parsePrefix: (parser) => {
    parser.consume("readonly");
    return {
      type: "JsdocTypeReadonlyProperty",
      element: parser.parseIntermediateType(3 /* KEY_VALUE */)
    };
  }
});

// src/parslets/ArrowFunctionParslet.ts
var arrowFunctionParslet = composeParslet({
  name: "arrowFunctionParslet",
  precedence: 15 /* ARROW */,
  accept: (type) => type === "=>",
  parseInfix: (parser, left) => {
    parser.consume("=>");
    return {
      type: "JsdocTypeFunction",
      parameters: getParameters(left).map(assertPlainKeyValueOrNameResult),
      arrow: true,
      constructor: false,
      parenthesis: true,
      returnType: parser.parseType(2 /* OBJECT */)
    };
  }
});

// src/parslets/GenericArrowFunctionParslet.ts
var genericArrowFunctionParslet = composeParslet({
  name: "genericArrowFunctionParslet",
  accept: (type) => type === "<",
  parsePrefix: (parser) => {
    const typeParameters = [];
    parser.consume("<");
    do {
      let defaultValue = void 0;
      let name = parser.parseIntermediateType(10 /* SYMBOL */);
      if (name.type === "JsdocTypeOptional") {
        name = name.element;
        defaultValue = parser.parseType(10 /* SYMBOL */);
      }
      if (name.type !== "JsdocTypeName") {
        throw new UnexpectedTypeError(name);
      }
      let constraint = void 0;
      if (parser.consume("extends")) {
        constraint = parser.parseType(10 /* SYMBOL */);
        if (constraint.type === "JsdocTypeOptional") {
          constraint = constraint.element;
          defaultValue = parser.parseType(10 /* SYMBOL */);
        }
      }
      const typeParameter = {
        type: "JsdocTypeTypeParameter",
        name
      };
      if (constraint !== void 0) {
        typeParameter.constraint = constraint;
      }
      if (defaultValue !== void 0) {
        typeParameter.defaultValue = defaultValue;
      }
      typeParameters.push(typeParameter);
      if (parser.consume(">")) {
        break;
      }
    } while (parser.consume(","));
    const functionBase = parser.parseIntermediateType(10 /* SYMBOL */);
    functionBase.typeParameters = typeParameters;
    return functionBase;
  }
});

// src/parslets/IntersectionParslet.ts
var intersectionParslet = composeParslet({
  name: "intersectionParslet",
  accept: (type) => type === "&",
  precedence: 6 /* INTERSECTION */,
  parseInfix: (parser, left) => {
    parser.consume("&");
    const elements = [];
    do {
      elements.push(parser.parseType(6 /* INTERSECTION */));
    } while (parser.consume("&"));
    return {
      type: "JsdocTypeIntersection",
      elements: [assertRootResult(left), ...elements]
    };
  }
});

// src/parslets/predicateParslet.ts
var predicateParslet = composeParslet({
  name: "predicateParslet",
  precedence: 8 /* INFIX */,
  accept: (type) => type === "is",
  parseInfix: (parser, left) => {
    if (left.type !== "JsdocTypeName") {
      throw new UnexpectedTypeError(left, "A typescript predicate always has to have a name on the left side.");
    }
    parser.consume("is");
    return {
      type: "JsdocTypePredicate",
      left,
      right: assertRootResult(parser.parseIntermediateType(8 /* INFIX */))
    };
  }
});

// src/parslets/ObjectSquaredPropertyParslet.ts
var objectSquaredPropertyParslet = composeParslet({
  name: "objectSquareBracketPropertyParslet",
  accept: (type) => type === "[",
  parsePrefix: (parser) => {
    if (parser.baseParser === void 0) {
      throw new Error("Only allowed inside object grammar");
    }
    parser.consume("[");
    const key = parser.lexer.current.text;
    parser.consume("Identifier");
    let result;
    if (parser.consume(":")) {
      const parentParser = parser.baseParser;
      parentParser.acceptLexerState(parser);
      result = {
        type: "JsdocTypeIndexSignature",
        key,
        right: parentParser.parseType(4 /* INDEX_BRACKETS */)
      };
      parser.acceptLexerState(parentParser);
    } else if (parser.consume("in")) {
      const parentParser = parser.baseParser;
      parentParser.acceptLexerState(parser);
      result = {
        type: "JsdocTypeMappedType",
        key,
        right: parentParser.parseType(16 /* ARRAY_BRACKETS */)
      };
      parser.acceptLexerState(parentParser);
    } else {
      throw new Error("Missing ':' or 'in' inside square bracketed property.");
    }
    if (!parser.consume("]")) {
      throw new Error("Unterminated square brackets");
    }
    return result;
  }
});

// src/parslets/ReadonlyArrayParslet.ts
var readonlyArrayParslet = composeParslet({
  name: "readonlyArrayParslet",
  accept: (type) => type === "readonly",
  parsePrefix: (parser) => {
    parser.consume("readonly");
    return {
      type: "JsdocTypeReadonlyArray",
      element: assertArrayOrTupleResult(parser.parseIntermediateType(0 /* ALL */))
    };
  }
});

// src/parslets/ConditionalParslet.ts
var conditionalParslet = composeParslet({
  name: "conditionalParslet",
  precedence: 8 /* INFIX */,
  accept: (type) => type === "extends",
  parseInfix: (parser, left) => {
    parser.consume("extends");
    const extendsType = parser.parseType(
      13 /* KEY_OF_TYPE_OF */
    ).element;
    const trueType = parser.parseType(8 /* INFIX */);
    parser.consume(":");
    return {
      type: "JsdocTypeConditional",
      checksType: assertRootResult(left),
      extendsType,
      trueType,
      falseType: parser.parseType(8 /* INFIX */)
    };
  }
});

// src/grammars/typescriptGrammar.ts
var objectFieldGrammar2 = [
  readonlyPropertyParslet,
  createNameParslet({
    allowedAdditionalTokens: ["typeof", "module", "keyof", "event", "external", "in"]
  }),
  nullableParslet,
  optionalParslet,
  stringValueParslet,
  numberParslet,
  createObjectFieldParslet({
    allowSquaredProperties: true,
    allowKeyTypes: false,
    allowOptional: true,
    allowReadonly: true
  }),
  objectSquaredPropertyParslet
];
var typescriptGrammar = [
  ...baseGrammar,
  createObjectParslet({
    allowKeyTypes: false,
    objectFieldGrammar: objectFieldGrammar2
  }),
  readonlyArrayParslet,
  typeOfParslet,
  keyOfParslet,
  importParslet,
  stringValueParslet,
  createFunctionParslet({
    allowWithoutParenthesis: true,
    allowNoReturnType: true,
    allowNamedParameters: ["this", "new", "args"],
    allowNewAsFunctionKeyword: true
  }),
  createTupleParslet({
    allowQuestionMark: false
  }),
  createVariadicParslet({
    allowEnclosingBrackets: false,
    allowPostfix: false
  }),
  assertsParslet,
  conditionalParslet,
  createNameParslet({
    allowedAdditionalTokens: ["event", "external", "in"]
  }),
  createSpecialNamePathParslet({
    allowedTypes: ["module"],
    pathGrammar
  }),
  arrayBracketsParslet,
  arrowFunctionParslet,
  genericArrowFunctionParslet,
  createNamePathParslet({
    allowSquareBracketsOnAnyType: true,
    allowJsdocNamePaths: false,
    pathGrammar
  }),
  intersectionParslet,
  predicateParslet,
  createKeyValueParslet({
    allowVariadic: true,
    allowOptional: true
  })
];

// src/parse.ts
function parse(expression, mode) {
  switch (mode) {
    case "closure":
      return new Parser(closureGrammar, expression).parse();
    case "jsdoc":
      return new Parser(jsdocGrammar, expression).parse();
    case "typescript":
      return new Parser(typescriptGrammar, expression).parse();
  }
}
function tryParse(expression, modes = ["typescript", "closure", "jsdoc"]) {
  let error;
  for (const mode of modes) {
    try {
      return parse(expression, mode);
    } catch (e) {
      error = e;
    }
  }
  throw error;
}

// src/transforms/transform.ts
function transform(rules2, parseResult) {
  const rule = rules2[parseResult.type];
  if (rule === void 0) {
    throw new Error(`In this set of transform rules exists no rule for type ${parseResult.type}.`);
  }
  return rule(parseResult, (aParseResult) => transform(rules2, aParseResult));
}
function notAvailableTransform(parseResult) {
  throw new Error("This transform is not available. Are you trying the correct parsing mode?");
}
function extractSpecialParams(source) {
  const result = {
    params: []
  };
  for (const param of source.parameters) {
    if (param.type === "JsdocTypeKeyValue") {
      if (param.key === "this") {
        result.this = param.right;
      } else if (param.key === "new") {
        result.new = param.right;
      } else {
        result.params.push(param);
      }
    } else {
      result.params.push(param);
    }
  }
  return result;
}

// src/transforms/stringify.ts
function applyPosition(position, target, value) {
  return position === "prefix" ? value + target : target + value;
}
function quote(value, quote2) {
  switch (quote2) {
    case "double":
      return `"${value}"`;
    case "single":
      return `'${value}'`;
    case void 0:
      return value;
  }
}
function stringifyRules() {
  return {
    JsdocTypeParenthesis: (result, transform2) => `(${result.element !== void 0 ? transform2(result.element) : ""})`,
    JsdocTypeKeyof: (result, transform2) => `keyof ${transform2(result.element)}`,
    JsdocTypeFunction: (result, transform2) => {
      var _a;
      if (!result.arrow) {
        let stringified = result.constructor ? "new" : "function";
        if (!result.parenthesis) {
          return stringified;
        }
        stringified += `(${result.parameters.map(transform2).join(", ")})`;
        if (result.returnType !== void 0) {
          stringified += `: ${transform2(result.returnType)}`;
        }
        return stringified;
      } else {
        if (result.returnType === void 0) {
          throw new Error("Arrow function needs a return type.");
        }
        let stringified = `${result.typeParameters !== void 0 ? `<${(_a = result.typeParameters.map(transform2).join(", ")) != null ? _a : ""}>` : ""}(${result.parameters.map(transform2).join(", ")}) => ${transform2(result.returnType)}`;
        if (result.constructor) {
          stringified = "new " + stringified;
        }
        return stringified;
      }
    },
    JsdocTypeName: (result) => result.value,
    JsdocTypeTuple: (result, transform2) => `[${result.elements.map(transform2).join(", ")}]`,
    JsdocTypeVariadic: (result, transform2) => result.meta.position === void 0 ? "..." : applyPosition(result.meta.position, transform2(result.element), "..."),
    JsdocTypeNamePath: (result, transform2) => {
      const left = transform2(result.left);
      const right = transform2(result.right);
      switch (result.pathType) {
        case "inner":
          return `${left}~${right}`;
        case "instance":
          return `${left}#${right}`;
        case "property":
          return `${left}.${right}`;
        case "property-brackets":
          return `${left}[${right}]`;
      }
    },
    JsdocTypeStringValue: (result) => quote(result.value, result.meta.quote),
    JsdocTypeAny: () => "*",
    JsdocTypeGeneric: (result, transform2) => {
      if (result.meta.brackets === "square") {
        const element = result.elements[0];
        const transformed = transform2(element);
        if (element.type === "JsdocTypeUnion" || element.type === "JsdocTypeIntersection") {
          return `(${transformed})[]`;
        } else {
          return `${transformed}[]`;
        }
      } else {
        return `${transform2(result.left)}${result.meta.dot ? "." : ""}<${result.infer === true ? "infer " : ""}${result.elements.map(transform2).join(", ")}>`;
      }
    },
    JsdocTypeImport: (result, transform2) => `import(${transform2(result.element)})`,
    JsdocTypeObjectField: (result, transform2) => {
      let text = "";
      if (result.readonly) {
        text += "readonly ";
      }
      if (typeof result.key === "string") {
        text += quote(result.key, result.meta.quote);
      } else {
        text += transform2(result.key);
      }
      if (result.optional) {
        text += "?";
      }
      if (result.right === void 0) {
        return text;
      } else {
        return text + `: ${transform2(result.right)}`;
      }
    },
    JsdocTypeJsdocObjectField: (result, transform2) => `${transform2(result.left)}: ${transform2(result.right)}`,
    JsdocTypeKeyValue: (result, transform2) => {
      let text = result.key;
      if (result.optional) {
        text += "?";
      }
      if (result.variadic) {
        text = "..." + text;
      }
      if (result.right === void 0) {
        return text;
      } else {
        return text + `: ${transform2(result.right)}`;
      }
    },
    JsdocTypeSpecialNamePath: (result) => `${result.specialType}:${quote(result.value, result.meta.quote)}`,
    JsdocTypeNotNullable: (result, transform2) => applyPosition(result.meta.position, transform2(result.element), "!"),
    JsdocTypeNull: () => "null",
    JsdocTypeNullable: (result, transform2) => applyPosition(result.meta.position, transform2(result.element), "?"),
    JsdocTypeNumber: (result) => result.value.toString(),
    JsdocTypeObject: (result, transform2) => {
      var _a, _b;
      return `{${(result.meta.separator === "linebreak" && result.elements.length > 1 ? "\n" + ((_a = result.meta.propertyIndent) != null ? _a : "") : "") + result.elements.map(transform2).join(
        result.meta.separator === "comma" ? ", " : result.meta.separator === "linebreak" ? "\n" + ((_b = result.meta.propertyIndent) != null ? _b : "") : "; "
      ) + (result.meta.separator === "linebreak" && result.elements.length > 1 ? "\n" : "")}}`;
    },
    JsdocTypeOptional: (result, transform2) => applyPosition(result.meta.position, transform2(result.element), "="),
    JsdocTypeSymbol: (result, transform2) => `${result.value}(${result.element !== void 0 ? transform2(result.element) : ""})`,
    JsdocTypeTypeof: (result, transform2) => `typeof ${transform2(result.element)}`,
    JsdocTypeUndefined: () => "undefined",
    JsdocTypeUnion: (result, transform2) => result.elements.map(transform2).join(" | "),
    JsdocTypeUnknown: () => "?",
    JsdocTypeIntersection: (result, transform2) => result.elements.map(transform2).join(" & "),
    JsdocTypeProperty: (result) => quote(result.value, result.meta.quote),
    JsdocTypePredicate: (result, transform2) => `${transform2(result.left)} is ${transform2(result.right)}`,
    JsdocTypeIndexSignature: (result, transform2) => `[${result.key}: ${transform2(result.right)}]`,
    JsdocTypeMappedType: (result, transform2) => `[${result.key} in ${transform2(result.right)}]`,
    JsdocTypeAsserts: (result, transform2) => `asserts ${transform2(result.left)} is ${transform2(result.right)}`,
    JsdocTypeReadonlyArray: (result, transform2) => `readonly ${transform2(result.element)}`,
    JsdocTypeAssertsPlain: (result, transform2) => `asserts ${transform2(result.element)}`,
    JsdocTypeConditional: (result, transform2) => `${transform2(result.checksType)} extends ${transform2(result.extendsType)} ? ${transform2(result.trueType)} : ${transform2(result.falseType)}`,
    JsdocTypeTypeParameter: (result, transform2) => `${transform2(result.name)}${result.constraint !== void 0 ? ` extends ${transform2(result.constraint)}` : ""}${result.defaultValue !== void 0 ? ` = ${transform2(result.defaultValue)}` : ""}`
  };
}
var storedStringifyRules = stringifyRules();
function stringify(result) {
  return transform(storedStringifyRules, result);
}

// src/transforms/catharsisTransform.ts
var reservedWords = [
  "null",
  "true",
  "false",
  "break",
  "case",
  "catch",
  "class",
  "const",
  "continue",
  "debugger",
  "default",
  "delete",
  "do",
  "else",
  "export",
  "extends",
  "finally",
  "for",
  "function",
  "if",
  "import",
  "in",
  "instanceof",
  "new",
  "return",
  "super",
  "switch",
  "this",
  "throw",
  "try",
  "typeof",
  "var",
  "void",
  "while",
  "with",
  "yield"
];
function makeName(value) {
  const result = {
    type: "NameExpression",
    name: value
  };
  if (reservedWords.includes(value)) {
    result.reservedWord = true;
  }
  return result;
}
var catharsisTransformRules = {
  JsdocTypeOptional: (result, transform2) => {
    const transformed = transform2(result.element);
    transformed.optional = true;
    return transformed;
  },
  JsdocTypeNullable: (result, transform2) => {
    const transformed = transform2(result.element);
    transformed.nullable = true;
    return transformed;
  },
  JsdocTypeNotNullable: (result, transform2) => {
    const transformed = transform2(result.element);
    transformed.nullable = false;
    return transformed;
  },
  JsdocTypeVariadic: (result, transform2) => {
    if (result.element === void 0) {
      throw new Error("dots without value are not allowed in catharsis mode");
    }
    const transformed = transform2(result.element);
    transformed.repeatable = true;
    return transformed;
  },
  JsdocTypeAny: () => ({
    type: "AllLiteral"
  }),
  JsdocTypeNull: () => ({
    type: "NullLiteral"
  }),
  JsdocTypeStringValue: (result) => makeName(quote(result.value, result.meta.quote)),
  JsdocTypeUndefined: () => ({
    type: "UndefinedLiteral"
  }),
  JsdocTypeUnknown: () => ({
    type: "UnknownLiteral"
  }),
  JsdocTypeFunction: (result, transform2) => {
    const params = extractSpecialParams(result);
    const transformed = {
      type: "FunctionType",
      params: params.params.map(transform2)
    };
    if (params.this !== void 0) {
      transformed.this = transform2(params.this);
    }
    if (params.new !== void 0) {
      transformed.new = transform2(params.new);
    }
    if (result.returnType !== void 0) {
      transformed.result = transform2(result.returnType);
    }
    return transformed;
  },
  JsdocTypeGeneric: (result, transform2) => ({
    type: "TypeApplication",
    applications: result.elements.map((o) => transform2(o)),
    expression: transform2(result.left)
  }),
  JsdocTypeSpecialNamePath: (result) => makeName(result.specialType + ":" + quote(result.value, result.meta.quote)),
  JsdocTypeName: (result) => {
    if (result.value !== "function") {
      return makeName(result.value);
    } else {
      return {
        type: "FunctionType",
        params: []
      };
    }
  },
  JsdocTypeNumber: (result) => makeName(result.value.toString()),
  JsdocTypeObject: (result, transform2) => {
    const transformed = {
      type: "RecordType",
      fields: []
    };
    for (const field of result.elements) {
      if (field.type !== "JsdocTypeObjectField" && field.type !== "JsdocTypeJsdocObjectField") {
        transformed.fields.push({
          type: "FieldType",
          key: transform2(field),
          value: void 0
        });
      } else {
        transformed.fields.push(transform2(field));
      }
    }
    return transformed;
  },
  JsdocTypeObjectField: (result, transform2) => {
    if (typeof result.key !== "string") {
      throw new Error("Index signatures and mapped types are not supported");
    }
    return {
      type: "FieldType",
      key: makeName(quote(result.key, result.meta.quote)),
      value: result.right === void 0 ? void 0 : transform2(result.right)
    };
  },
  JsdocTypeJsdocObjectField: (result, transform2) => ({
    type: "FieldType",
    key: transform2(result.left),
    value: transform2(result.right)
  }),
  JsdocTypeUnion: (result, transform2) => ({
    type: "TypeUnion",
    elements: result.elements.map((e) => transform2(e))
  }),
  JsdocTypeKeyValue: (result, transform2) => ({
    type: "FieldType",
    key: makeName(result.key),
    value: result.right === void 0 ? void 0 : transform2(result.right)
  }),
  JsdocTypeNamePath: (result, transform2) => {
    const leftResult = transform2(result.left);
    let rightValue;
    if (result.right.type === "JsdocTypeSpecialNamePath") {
      rightValue = transform2(result.right).name;
    } else {
      rightValue = quote(result.right.value, result.right.meta.quote);
    }
    const joiner = result.pathType === "inner" ? "~" : result.pathType === "instance" ? "#" : ".";
    return makeName(`${leftResult.name}${joiner}${rightValue}`);
  },
  JsdocTypeSymbol: (result) => {
    let value = "";
    let element = result.element;
    let trailingDots = false;
    if ((element == null ? void 0 : element.type) === "JsdocTypeVariadic") {
      if (element.meta.position === "prefix") {
        value = "...";
      } else {
        trailingDots = true;
      }
      element = element.element;
    }
    if ((element == null ? void 0 : element.type) === "JsdocTypeName") {
      value += element.value;
    } else if ((element == null ? void 0 : element.type) === "JsdocTypeNumber") {
      value += element.value.toString();
    }
    if (trailingDots) {
      value += "...";
    }
    return makeName(`${result.value}(${value})`);
  },
  JsdocTypeParenthesis: (result, transform2) => transform2(assertRootResult(result.element)),
  JsdocTypeMappedType: notAvailableTransform,
  JsdocTypeIndexSignature: notAvailableTransform,
  JsdocTypeImport: notAvailableTransform,
  JsdocTypeKeyof: notAvailableTransform,
  JsdocTypeTuple: notAvailableTransform,
  JsdocTypeTypeof: notAvailableTransform,
  JsdocTypeIntersection: notAvailableTransform,
  JsdocTypeProperty: notAvailableTransform,
  JsdocTypePredicate: notAvailableTransform,
  JsdocTypeAsserts: notAvailableTransform,
  JsdocTypeReadonlyArray: notAvailableTransform,
  JsdocTypeAssertsPlain: notAvailableTransform,
  JsdocTypeConditional: notAvailableTransform,
  JsdocTypeTypeParameter: notAvailableTransform
};
function catharsisTransform(result) {
  return transform(catharsisTransformRules, result);
}

// src/transforms/jtpTransform.ts
function getQuoteStyle(quote2) {
  switch (quote2) {
    case void 0:
      return "none";
    case "single":
      return "single";
    case "double":
      return "double";
  }
}
function getMemberType(type) {
  switch (type) {
    case "inner":
      return "INNER_MEMBER";
    case "instance":
      return "INSTANCE_MEMBER";
    case "property":
      return "MEMBER";
    case "property-brackets":
      return "MEMBER";
  }
}
function nestResults(type, results) {
  if (results.length === 2) {
    return {
      type,
      left: results[0],
      right: results[1]
    };
  } else {
    return {
      type,
      left: results[0],
      right: nestResults(type, results.slice(1))
    };
  }
}
var jtpRules = {
  JsdocTypeOptional: (result, transform2) => ({
    type: "OPTIONAL",
    value: transform2(result.element),
    meta: {
      syntax: result.meta.position === "prefix" ? "PREFIX_EQUAL_SIGN" : "SUFFIX_EQUALS_SIGN"
    }
  }),
  JsdocTypeNullable: (result, transform2) => ({
    type: "NULLABLE",
    value: transform2(result.element),
    meta: {
      syntax: result.meta.position === "prefix" ? "PREFIX_QUESTION_MARK" : "SUFFIX_QUESTION_MARK"
    }
  }),
  JsdocTypeNotNullable: (result, transform2) => ({
    type: "NOT_NULLABLE",
    value: transform2(result.element),
    meta: {
      syntax: result.meta.position === "prefix" ? "PREFIX_BANG" : "SUFFIX_BANG"
    }
  }),
  JsdocTypeVariadic: (result, transform2) => {
    const transformed = {
      type: "VARIADIC",
      meta: {
        syntax: result.meta.position === "prefix" ? "PREFIX_DOTS" : result.meta.position === "suffix" ? "SUFFIX_DOTS" : "ONLY_DOTS"
      }
    };
    if (result.element !== void 0) {
      transformed.value = transform2(result.element);
    }
    return transformed;
  },
  JsdocTypeName: (result) => ({
    type: "NAME",
    name: result.value
  }),
  JsdocTypeTypeof: (result, transform2) => ({
    type: "TYPE_QUERY",
    name: transform2(result.element)
  }),
  JsdocTypeTuple: (result, transform2) => ({
    type: "TUPLE",
    entries: result.elements.map(transform2)
  }),
  JsdocTypeKeyof: (result, transform2) => ({
    type: "KEY_QUERY",
    value: transform2(result.element)
  }),
  JsdocTypeImport: (result) => ({
    type: "IMPORT",
    path: {
      type: "STRING_VALUE",
      quoteStyle: getQuoteStyle(result.element.meta.quote),
      string: result.element.value
    }
  }),
  JsdocTypeUndefined: () => ({
    type: "NAME",
    name: "undefined"
  }),
  JsdocTypeAny: () => ({
    type: "ANY"
  }),
  JsdocTypeFunction: (result, transform2) => {
    const specialParams = extractSpecialParams(result);
    const transformed = {
      type: result.arrow ? "ARROW" : "FUNCTION",
      params: specialParams.params.map((param) => {
        if (param.type === "JsdocTypeKeyValue") {
          if (param.right === void 0) {
            throw new Error("Function parameter without ':' is not expected to be 'KEY_VALUE'");
          }
          return {
            type: "NAMED_PARAMETER",
            name: param.key,
            typeName: transform2(param.right)
          };
        } else {
          return transform2(param);
        }
      }),
      new: null,
      returns: null
    };
    if (specialParams.this !== void 0) {
      transformed.this = transform2(specialParams.this);
    } else if (!result.arrow) {
      transformed.this = null;
    }
    if (specialParams.new !== void 0) {
      transformed.new = transform2(specialParams.new);
    }
    if (result.returnType !== void 0) {
      transformed.returns = transform2(result.returnType);
    }
    return transformed;
  },
  JsdocTypeGeneric: (result, transform2) => {
    const transformed = {
      type: "GENERIC",
      subject: transform2(result.left),
      objects: result.elements.map(transform2),
      meta: {
        syntax: result.meta.brackets === "square" ? "SQUARE_BRACKET" : result.meta.dot ? "ANGLE_BRACKET_WITH_DOT" : "ANGLE_BRACKET"
      }
    };
    if (result.meta.brackets === "square" && result.elements[0].type === "JsdocTypeFunction" && !result.elements[0].parenthesis) {
      transformed.objects[0] = {
        type: "NAME",
        name: "function"
      };
    }
    return transformed;
  },
  JsdocTypeObjectField: (result, transform2) => {
    if (typeof result.key !== "string") {
      throw new Error("Index signatures and mapped types are not supported");
    }
    if (result.right === void 0) {
      return {
        type: "RECORD_ENTRY",
        key: result.key,
        quoteStyle: getQuoteStyle(result.meta.quote),
        value: null,
        readonly: false
      };
    }
    let right = transform2(result.right);
    if (result.optional) {
      right = {
        type: "OPTIONAL",
        value: right,
        meta: {
          syntax: "SUFFIX_KEY_QUESTION_MARK"
        }
      };
    }
    return {
      type: "RECORD_ENTRY",
      key: result.key,
      quoteStyle: getQuoteStyle(result.meta.quote),
      value: right,
      readonly: false
    };
  },
  JsdocTypeJsdocObjectField: () => {
    throw new Error("Keys may not be typed in jsdoctypeparser.");
  },
  JsdocTypeKeyValue: (result, transform2) => {
    if (result.right === void 0) {
      return {
        type: "RECORD_ENTRY",
        key: result.key,
        quoteStyle: "none",
        value: null,
        readonly: false
      };
    }
    let right = transform2(result.right);
    if (result.optional) {
      right = {
        type: "OPTIONAL",
        value: right,
        meta: {
          syntax: "SUFFIX_KEY_QUESTION_MARK"
        }
      };
    }
    return {
      type: "RECORD_ENTRY",
      key: result.key,
      quoteStyle: "none",
      value: right,
      readonly: false
    };
  },
  JsdocTypeObject: (result, transform2) => {
    const entries = [];
    for (const field of result.elements) {
      if (field.type === "JsdocTypeObjectField" || field.type === "JsdocTypeJsdocObjectField") {
        entries.push(transform2(field));
      }
    }
    return {
      type: "RECORD",
      entries
    };
  },
  JsdocTypeSpecialNamePath: (result) => {
    if (result.specialType !== "module") {
      throw new Error(`jsdoctypeparser does not support type ${result.specialType} at this point.`);
    }
    return {
      type: "MODULE",
      value: {
        type: "FILE_PATH",
        quoteStyle: getQuoteStyle(result.meta.quote),
        path: result.value
      }
    };
  },
  JsdocTypeNamePath: (result, transform2) => {
    let hasEventPrefix = false;
    let name;
    let quoteStyle;
    if (result.right.type === "JsdocTypeSpecialNamePath" && result.right.specialType === "event") {
      hasEventPrefix = true;
      name = result.right.value;
      quoteStyle = getQuoteStyle(result.right.meta.quote);
    } else {
      name = result.right.value;
      quoteStyle = getQuoteStyle(result.right.meta.quote);
    }
    const transformed = {
      type: getMemberType(result.pathType),
      owner: transform2(result.left),
      name,
      quoteStyle,
      hasEventPrefix
    };
    if (transformed.owner.type === "MODULE") {
      const tModule = transformed.owner;
      transformed.owner = transformed.owner.value;
      tModule.value = transformed;
      return tModule;
    } else {
      return transformed;
    }
  },
  JsdocTypeUnion: (result, transform2) => nestResults("UNION", result.elements.map(transform2)),
  JsdocTypeParenthesis: (result, transform2) => ({
    type: "PARENTHESIS",
    value: transform2(assertRootResult(result.element))
  }),
  JsdocTypeNull: () => ({
    type: "NAME",
    name: "null"
  }),
  JsdocTypeUnknown: () => ({
    type: "UNKNOWN"
  }),
  JsdocTypeStringValue: (result) => ({
    type: "STRING_VALUE",
    quoteStyle: getQuoteStyle(result.meta.quote),
    string: result.value
  }),
  JsdocTypeIntersection: (result, transform2) => nestResults("INTERSECTION", result.elements.map(transform2)),
  JsdocTypeNumber: (result) => ({
    type: "NUMBER_VALUE",
    number: result.value.toString()
  }),
  JsdocTypeSymbol: notAvailableTransform,
  JsdocTypeProperty: notAvailableTransform,
  JsdocTypePredicate: notAvailableTransform,
  JsdocTypeMappedType: notAvailableTransform,
  JsdocTypeIndexSignature: notAvailableTransform,
  JsdocTypeAsserts: notAvailableTransform,
  JsdocTypeReadonlyArray: notAvailableTransform,
  JsdocTypeAssertsPlain: notAvailableTransform,
  JsdocTypeConditional: notAvailableTransform,
  JsdocTypeTypeParameter: notAvailableTransform
};
function jtpTransform(result) {
  return transform(jtpRules, result);
}

// src/transforms/identityTransformRules.ts
function identityTransformRules() {
  return {
    JsdocTypeIntersection: (result, transform2) => ({
      type: "JsdocTypeIntersection",
      elements: result.elements.map(transform2)
    }),
    JsdocTypeGeneric: (result, transform2) => ({
      type: "JsdocTypeGeneric",
      left: transform2(result.left),
      elements: result.elements.map(transform2),
      meta: {
        dot: result.meta.dot,
        brackets: result.meta.brackets
      }
    }),
    JsdocTypeNullable: (result) => result,
    JsdocTypeUnion: (result, transform2) => ({
      type: "JsdocTypeUnion",
      elements: result.elements.map(transform2)
    }),
    JsdocTypeUnknown: (result) => result,
    JsdocTypeUndefined: (result) => result,
    JsdocTypeTypeof: (result, transform2) => ({
      type: "JsdocTypeTypeof",
      element: transform2(result.element)
    }),
    JsdocTypeSymbol: (result, transform2) => {
      const transformed = {
        type: "JsdocTypeSymbol",
        value: result.value
      };
      if (result.element !== void 0) {
        transformed.element = transform2(result.element);
      }
      return transformed;
    },
    JsdocTypeOptional: (result, transform2) => ({
      type: "JsdocTypeOptional",
      element: transform2(result.element),
      meta: {
        position: result.meta.position
      }
    }),
    JsdocTypeObject: (result, transform2) => ({
      type: "JsdocTypeObject",
      meta: {
        separator: "comma"
      },
      elements: result.elements.map(transform2)
    }),
    JsdocTypeNumber: (result) => result,
    JsdocTypeNull: (result) => result,
    JsdocTypeNotNullable: (result, transform2) => ({
      type: "JsdocTypeNotNullable",
      element: transform2(result.element),
      meta: {
        position: result.meta.position
      }
    }),
    JsdocTypeSpecialNamePath: (result) => result,
    JsdocTypeObjectField: (result, transform2) => ({
      type: "JsdocTypeObjectField",
      key: result.key,
      right: result.right === void 0 ? void 0 : transform2(result.right),
      optional: result.optional,
      readonly: result.readonly,
      meta: result.meta
    }),
    JsdocTypeJsdocObjectField: (result, transform2) => ({
      type: "JsdocTypeJsdocObjectField",
      left: transform2(result.left),
      right: transform2(result.right)
    }),
    JsdocTypeKeyValue: (result, transform2) => ({
      type: "JsdocTypeKeyValue",
      key: result.key,
      right: result.right === void 0 ? void 0 : transform2(result.right),
      optional: result.optional,
      variadic: result.variadic
    }),
    JsdocTypeImport: (result, transform2) => ({
      type: "JsdocTypeImport",
      element: transform2(result.element)
    }),
    JsdocTypeAny: (result) => result,
    JsdocTypeStringValue: (result) => result,
    JsdocTypeNamePath: (result) => result,
    JsdocTypeVariadic: (result, transform2) => {
      const transformed = {
        type: "JsdocTypeVariadic",
        meta: {
          position: result.meta.position,
          squareBrackets: result.meta.squareBrackets
        }
      };
      if (result.element !== void 0) {
        transformed.element = transform2(result.element);
      }
      return transformed;
    },
    JsdocTypeTuple: (result, transform2) => ({
      type: "JsdocTypeTuple",
      elements: result.elements.map(transform2)
    }),
    JsdocTypeName: (result) => result,
    JsdocTypeFunction: (result, transform2) => {
      const transformed = {
        type: "JsdocTypeFunction",
        arrow: result.arrow,
        parameters: result.parameters.map(transform2),
        constructor: result.constructor,
        parenthesis: result.parenthesis
      };
      if (result.returnType !== void 0) {
        transformed.returnType = transform2(result.returnType);
      }
      return transformed;
    },
    JsdocTypeKeyof: (result, transform2) => ({
      type: "JsdocTypeKeyof",
      element: transform2(result.element)
    }),
    JsdocTypeParenthesis: (result, transform2) => ({
      type: "JsdocTypeParenthesis",
      element: transform2(result.element)
    }),
    JsdocTypeProperty: (result) => result,
    JsdocTypePredicate: (result, transform2) => ({
      type: "JsdocTypePredicate",
      left: transform2(result.left),
      right: transform2(result.right)
    }),
    JsdocTypeIndexSignature: (result, transform2) => ({
      type: "JsdocTypeIndexSignature",
      key: result.key,
      right: transform2(result.right)
    }),
    JsdocTypeMappedType: (result, transform2) => ({
      type: "JsdocTypeMappedType",
      key: result.key,
      right: transform2(result.right)
    }),
    JsdocTypeAsserts: (result, transform2) => ({
      type: "JsdocTypeAsserts",
      left: transform2(result.left),
      right: transform2(result.right)
    }),
    JsdocTypeReadonlyArray: (result, transform2) => ({
      type: "JsdocTypeReadonlyArray",
      element: transform2(result.element)
    }),
    JsdocTypeAssertsPlain: (result, transform2) => ({
      type: "JsdocTypeAssertsPlain",
      element: transform2(result.element)
    }),
    JsdocTypeConditional: (result, transform2) => ({
      type: "JsdocTypeConditional",
      checksType: transform2(result.checksType),
      extendsType: transform2(result.extendsType),
      trueType: transform2(result.trueType),
      falseType: transform2(result.falseType)
    }),
    JsdocTypeTypeParameter: (result, transform2) => ({
      type: "JsdocTypeTypeParameter",
      name: transform2(result.name),
      constraint: result.constraint !== void 0 ? transform2(result.constraint) : void 0,
      defaultValue: result.defaultValue !== void 0 ? transform2(result.defaultValue) : void 0
    })
  };
}

// src/visitorKeys.ts
var visitorKeys = {
  JsdocTypeAny: [],
  JsdocTypeFunction: ["parameters", "returnType"],
  JsdocTypeGeneric: ["left", "elements"],
  JsdocTypeImport: [],
  JsdocTypeIndexSignature: ["right"],
  JsdocTypeIntersection: ["elements"],
  JsdocTypeKeyof: ["element"],
  JsdocTypeKeyValue: ["right"],
  JsdocTypeMappedType: ["right"],
  JsdocTypeName: [],
  JsdocTypeNamePath: ["left", "right"],
  JsdocTypeNotNullable: ["element"],
  JsdocTypeNull: [],
  JsdocTypeNullable: ["element"],
  JsdocTypeNumber: [],
  JsdocTypeObject: ["elements"],
  JsdocTypeObjectField: ["right"],
  JsdocTypeJsdocObjectField: ["left", "right"],
  JsdocTypeOptional: ["element"],
  JsdocTypeParenthesis: ["element"],
  JsdocTypeSpecialNamePath: [],
  JsdocTypeStringValue: [],
  JsdocTypeSymbol: ["element"],
  JsdocTypeTuple: ["elements"],
  JsdocTypeTypeof: ["element"],
  JsdocTypeUndefined: [],
  JsdocTypeUnion: ["elements"],
  JsdocTypeUnknown: [],
  JsdocTypeVariadic: ["element"],
  JsdocTypeProperty: [],
  JsdocTypePredicate: ["left", "right"],
  JsdocTypeAsserts: ["left", "right"],
  JsdocTypeReadonlyArray: ["element"],
  JsdocTypeAssertsPlain: ["element"],
  JsdocTypeConditional: ["checksType", "extendsType", "trueType", "falseType"],
  JsdocTypeTypeParameter: ["name", "constraint", "defaultValue"]
};

// src/traverse.ts
function _traverse(node, parentNode, property, onEnter, onLeave) {
  onEnter == null ? void 0 : onEnter(node, parentNode, property);
  const keysToVisit = visitorKeys[node.type];
  for (const key of keysToVisit) {
    const value = node[key];
    if (value !== void 0) {
      if (Array.isArray(value)) {
        for (const element of value) {
          _traverse(element, node, key, onEnter, onLeave);
        }
      } else {
        _traverse(value, node, key, onEnter, onLeave);
      }
    }
  }
  onLeave == null ? void 0 : onLeave(node, parentNode, property);
}
function traverse(node, onEnter, onLeave) {
  _traverse(node, void 0, void 0, onEnter, onLeave);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  catharsisTransform,
  identityTransformRules,
  jtpTransform,
  parse,
  stringify,
  stringifyRules,
  transform,
  traverse,
  tryParse,
  visitorKeys
});
//# sourceMappingURL=index.cjs.map
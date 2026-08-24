'use strict';

var require$$0 = require('url');
var require$$0$1 = require('fs');
var require$$1 = require('path');

function _mergeNamespaces(n, m) {
	m.forEach(function (e) {
		e && typeof e !== 'string' && !Array.isArray(e) && Object.keys(e).forEach(function (k) {
			if (k !== 'default' && !(k in n)) {
				var d = Object.getOwnPropertyDescriptor(e, k);
				Object.defineProperty(n, k, d.get ? d : {
					enumerable: true,
					get: function () { return e[k]; }
				});
			}
		});
	});
	return Object.freeze(n);
}

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var sourceMap$3 = {};

var sourceMapGenerator = {};

var base64Vlq = {};

var base64 = {};

/* -*- Mode: js; js-indent-level: 2; -*- */

var hasRequiredBase64;

function requireBase64 () {
	if (hasRequiredBase64) return base64;
	hasRequiredBase64 = 1;
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */

	const intToCharMap =
	  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");

	/**
	 * Encode an integer in the range of 0 to 63 to a single base 64 digit.
	 */
	base64.encode = function (number) {
	  if (0 <= number && number < intToCharMap.length) {
	    return intToCharMap[number];
	  }
	  throw new TypeError("Must be between 0 and 63: " + number);
	};
	return base64;
}

/* -*- Mode: js; js-indent-level: 2; -*- */

var hasRequiredBase64Vlq;

function requireBase64Vlq () {
	if (hasRequiredBase64Vlq) return base64Vlq;
	hasRequiredBase64Vlq = 1;
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 *
	 * Based on the Base 64 VLQ implementation in Closure Compiler:
	 * https://code.google.com/p/closure-compiler/source/browse/trunk/src/com/google/debugging/sourcemap/Base64VLQ.java
	 *
	 * Copyright 2011 The Closure Compiler Authors. All rights reserved.
	 * Redistribution and use in source and binary forms, with or without
	 * modification, are permitted provided that the following conditions are
	 * met:
	 *
	 *  * Redistributions of source code must retain the above copyright
	 *    notice, this list of conditions and the following disclaimer.
	 *  * Redistributions in binary form must reproduce the above
	 *    copyright notice, this list of conditions and the following
	 *    disclaimer in the documentation and/or other materials provided
	 *    with the distribution.
	 *  * Neither the name of Google Inc. nor the names of its
	 *    contributors may be used to endorse or promote products derived
	 *    from this software without specific prior written permission.
	 *
	 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
	 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
	 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
	 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
	 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
	 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
	 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
	 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
	 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
	 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
	 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	 */

	const base64 = requireBase64();

	// A single base 64 digit can contain 6 bits of data. For the base 64 variable
	// length quantities we use in the source map spec, the first bit is the sign,
	// the next four bits are the actual value, and the 6th bit is the
	// continuation bit. The continuation bit tells us whether there are more
	// digits in this value following this digit.
	//
	//   Continuation
	//   |    Sign
	//   |    |
	//   V    V
	//   101011

	const VLQ_BASE_SHIFT = 5;

	// binary: 100000
	const VLQ_BASE = 1 << VLQ_BASE_SHIFT;

	// binary: 011111
	const VLQ_BASE_MASK = VLQ_BASE - 1;

	// binary: 100000
	const VLQ_CONTINUATION_BIT = VLQ_BASE;

	/**
	 * Converts from a two-complement value to a value where the sign bit is
	 * placed in the least significant bit.  For example, as decimals:
	 *   1 becomes 2 (10 binary), -1 becomes 3 (11 binary)
	 *   2 becomes 4 (100 binary), -2 becomes 5 (101 binary)
	 */
	function toVLQSigned(aValue) {
	  return aValue < 0 ? (-aValue << 1) + 1 : (aValue << 1) + 0;
	}

	/**
	 * Returns the base 64 VLQ encoded value.
	 */
	base64Vlq.encode = function base64VLQ_encode(aValue) {
	  let encoded = "";
	  let digit;

	  let vlq = toVLQSigned(aValue);

	  do {
	    digit = vlq & VLQ_BASE_MASK;
	    vlq >>>= VLQ_BASE_SHIFT;
	    if (vlq > 0) {
	      // There are still more digits in this value, so we must make sure the
	      // continuation bit is marked.
	      digit |= VLQ_CONTINUATION_BIT;
	    }
	    encoded += base64.encode(digit);
	  } while (vlq > 0);

	  return encoded;
	};
	return base64Vlq;
}

var util = {};

/* -*- Mode: js; js-indent-level: 2; -*- */

var url;
var hasRequiredUrl;

function requireUrl () {
	if (hasRequiredUrl) return url;
	hasRequiredUrl = 1;

	// Note: This file is overridden in the 'package.json#browser' field to
	// substitute lib/url-browser.js instead.

	// Use the URL global for Node 10, and the 'url' module for Node 8.
	url = typeof URL === "function" ? URL : require$$0.URL;
	return url;
}

/* -*- Mode: js; js-indent-level: 2; -*- */

var hasRequiredUtil;

function requireUtil () {
	if (hasRequiredUtil) return util;
	hasRequiredUtil = 1;
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */

	const URL = requireUrl();

	/**
	 * This is a helper function for getting values from parameter/options
	 * objects.
	 *
	 * @param args The object we are extracting values from
	 * @param name The name of the property we are getting.
	 * @param defaultValue An optional value to return if the property is missing
	 * from the object. If this is not specified and the property is missing, an
	 * error will be thrown.
	 */
	function getArg(aArgs, aName, aDefaultValue) {
	  if (aName in aArgs) {
	    return aArgs[aName];
	  } else if (arguments.length === 3) {
	    return aDefaultValue;
	  }
	  throw new Error('"' + aName + '" is a required argument.');
	}
	util.getArg = getArg;

	const supportsNullProto = (function () {
	  const obj = Object.create(null);
	  return !("__proto__" in obj);
	})();

	function identity(s) {
	  return s;
	}

	/**
	 * Because behavior goes wacky when you set `__proto__` on objects, we
	 * have to prefix all the strings in our set with an arbitrary character.
	 *
	 * See https://github.com/mozilla/source-map/pull/31 and
	 * https://github.com/mozilla/source-map/issues/30
	 *
	 * @param String aStr
	 */
	function toSetString(aStr) {
	  if (isProtoString(aStr)) {
	    return "$" + aStr;
	  }

	  return aStr;
	}
	util.toSetString = supportsNullProto ? identity : toSetString;

	function fromSetString(aStr) {
	  if (isProtoString(aStr)) {
	    return aStr.slice(1);
	  }

	  return aStr;
	}
	util.fromSetString = supportsNullProto ? identity : fromSetString;

	function isProtoString(s) {
	  if (!s) {
	    return false;
	  }

	  const length = s.length;

	  if (length < 9 /* "__proto__".length */) {
	    return false;
	  }

	  /* eslint-disable no-multi-spaces */
	  if (
	    s.charCodeAt(length - 1) !== 95 /* '_' */ ||
	    s.charCodeAt(length - 2) !== 95 /* '_' */ ||
	    s.charCodeAt(length - 3) !== 111 /* 'o' */ ||
	    s.charCodeAt(length - 4) !== 116 /* 't' */ ||
	    s.charCodeAt(length - 5) !== 111 /* 'o' */ ||
	    s.charCodeAt(length - 6) !== 114 /* 'r' */ ||
	    s.charCodeAt(length - 7) !== 112 /* 'p' */ ||
	    s.charCodeAt(length - 8) !== 95 /* '_' */ ||
	    s.charCodeAt(length - 9) !== 95 /* '_' */
	  ) {
	    return false;
	  }
	  /* eslint-enable no-multi-spaces */

	  for (let i = length - 10; i >= 0; i--) {
	    if (s.charCodeAt(i) !== 36 /* '$' */) {
	      return false;
	    }
	  }

	  return true;
	}

	function strcmp(aStr1, aStr2) {
	  if (aStr1 === aStr2) {
	    return 0;
	  }

	  if (aStr1 === null) {
	    return 1; // aStr2 !== null
	  }

	  if (aStr2 === null) {
	    return -1; // aStr1 !== null
	  }

	  if (aStr1 > aStr2) {
	    return 1;
	  }

	  return -1;
	}

	/**
	 * Comparator between two mappings with inflated source and name strings where
	 * the generated positions are compared.
	 */
	function compareByGeneratedPositionsInflated(mappingA, mappingB) {
	  let cmp = mappingA.generatedLine - mappingB.generatedLine;
	  if (cmp !== 0) {
	    return cmp;
	  }

	  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
	  if (cmp !== 0) {
	    return cmp;
	  }

	  cmp = strcmp(mappingA.source, mappingB.source);
	  if (cmp !== 0) {
	    return cmp;
	  }

	  cmp = mappingA.originalLine - mappingB.originalLine;
	  if (cmp !== 0) {
	    return cmp;
	  }

	  cmp = mappingA.originalColumn - mappingB.originalColumn;
	  if (cmp !== 0) {
	    return cmp;
	  }

	  return strcmp(mappingA.name, mappingB.name);
	}
	util.compareByGeneratedPositionsInflated =
	  compareByGeneratedPositionsInflated;

	/**
	 * Strip any JSON XSSI avoidance prefix from the string (as documented
	 * in the source maps specification), and then parse the string as
	 * JSON.
	 */
	function parseSourceMapInput(str) {
	  return JSON.parse(str.replace(/^\)]}'[^\n]*\n/, ""));
	}
	util.parseSourceMapInput = parseSourceMapInput;

	// We use 'http' as the base here because we want URLs processed relative
	// to the safe base to be treated as "special" URLs during parsing using
	// the WHATWG URL parsing. This ensures that backslash normalization
	// applies to the path and such.
	const PROTOCOL = "http:";
	const PROTOCOL_AND_HOST = `${PROTOCOL}//host`;

	/**
	 * Make it easy to create small utilities that tweak a URL's path.
	 */
	function createSafeHandler(cb) {
	  return input => {
	    const type = getURLType(input);
	    const base = buildSafeBase(input);
	    const url = new URL(input, base);

	    cb(url);

	    const result = url.toString();

	    if (type === "absolute") {
	      return result;
	    } else if (type === "scheme-relative") {
	      return result.slice(PROTOCOL.length);
	    } else if (type === "path-absolute") {
	      return result.slice(PROTOCOL_AND_HOST.length);
	    }

	    // This assumes that the callback will only change
	    // the path, search and hash values.
	    return computeRelativeURL(base, result);
	  };
	}

	function withBase(url, base) {
	  return new URL(url, base).toString();
	}

	function buildUniqueSegment(prefix, str) {
	  let id = 0;
	  do {
	    const ident = prefix + id++;
	    if (str.indexOf(ident) === -1) return ident;
	  } while (true);
	}

	function buildSafeBase(str) {
	  const maxDotParts = str.split("..").length - 1;

	  // If we used a segment that also existed in `str`, then we would be unable
	  // to compute relative paths. For example, if `segment` were just "a":
	  //
	  //   const url = "../../a/"
	  //   const base = buildSafeBase(url); // http://host/a/a/
	  //   const joined = "http://host/a/";
	  //   const result = relative(base, joined);
	  //
	  // Expected: "../../a/";
	  // Actual: "a/"
	  //
	  const segment = buildUniqueSegment("p", str);

	  let base = `${PROTOCOL_AND_HOST}/`;
	  for (let i = 0; i < maxDotParts; i++) {
	    base += `${segment}/`;
	  }
	  return base;
	}

	const ABSOLUTE_SCHEME = /^[A-Za-z0-9\+\-\.]+:/;
	function getURLType(url) {
	  if (url[0] === "/") {
	    if (url[1] === "/") return "scheme-relative";
	    return "path-absolute";
	  }

	  return ABSOLUTE_SCHEME.test(url) ? "absolute" : "path-relative";
	}

	/**
	 * Given two URLs that are assumed to be on the same
	 * protocol/host/user/password build a relative URL from the
	 * path, params, and hash values.
	 *
	 * @param rootURL The root URL that the target will be relative to.
	 * @param targetURL The target that the relative URL points to.
	 * @return A rootURL-relative, normalized URL value.
	 */
	function computeRelativeURL(rootURL, targetURL) {
	  if (typeof rootURL === "string") rootURL = new URL(rootURL);
	  if (typeof targetURL === "string") targetURL = new URL(targetURL);

	  const targetParts = targetURL.pathname.split("/");
	  const rootParts = rootURL.pathname.split("/");

	  // If we've got a URL path ending with a "/", we remove it since we'd
	  // otherwise be relative to the wrong location.
	  if (rootParts.length > 0 && !rootParts[rootParts.length - 1]) {
	    rootParts.pop();
	  }

	  while (
	    targetParts.length > 0 &&
	    rootParts.length > 0 &&
	    targetParts[0] === rootParts[0]
	  ) {
	    targetParts.shift();
	    rootParts.shift();
	  }

	  const relativePath = rootParts
	    .map(() => "..")
	    .concat(targetParts)
	    .join("/");

	  return relativePath + targetURL.search + targetURL.hash;
	}

	/**
	 * Given a URL, ensure that it is treated as a directory URL.
	 *
	 * @param url
	 * @return A normalized URL value.
	 */
	const ensureDirectory = createSafeHandler(url => {
	  url.pathname = url.pathname.replace(/\/?$/, "/");
	});

	/**
	 * Given a URL, strip off any filename if one is present.
	 *
	 * @param url
	 * @return A normalized URL value.
	 */
	const trimFilename = createSafeHandler(url => {
	  url.href = new URL(".", url.toString()).toString();
	});

	/**
	 * Normalize a given URL.
	 * * Convert backslashes.
	 * * Remove any ".." and "." segments.
	 *
	 * @param url
	 * @return A normalized URL value.
	 */
	const normalize = createSafeHandler(url => {});
	util.normalize = normalize;

	/**
	 * Joins two paths/URLs.
	 *
	 * All returned URLs will be normalized.
	 *
	 * @param aRoot The root path or URL. Assumed to reference a directory.
	 * @param aPath The path or URL to be joined with the root.
	 * @return A joined and normalized URL value.
	 */
	function join(aRoot, aPath) {
	  const pathType = getURLType(aPath);
	  const rootType = getURLType(aRoot);

	  aRoot = ensureDirectory(aRoot);

	  if (pathType === "absolute") {
	    return withBase(aPath, undefined);
	  }
	  if (rootType === "absolute") {
	    return withBase(aPath, aRoot);
	  }

	  if (pathType === "scheme-relative") {
	    return normalize(aPath);
	  }
	  if (rootType === "scheme-relative") {
	    return withBase(aPath, withBase(aRoot, PROTOCOL_AND_HOST)).slice(
	      PROTOCOL.length
	    );
	  }

	  if (pathType === "path-absolute") {
	    return normalize(aPath);
	  }
	  if (rootType === "path-absolute") {
	    return withBase(aPath, withBase(aRoot, PROTOCOL_AND_HOST)).slice(
	      PROTOCOL_AND_HOST.length
	    );
	  }

	  const base = buildSafeBase(aPath + aRoot);
	  const newPath = withBase(aPath, withBase(aRoot, base));
	  return computeRelativeURL(base, newPath);
	}
	util.join = join;

	/**
	 * Make a path relative to a URL or another path. If returning a
	 * relative URL is not possible, the original target will be returned.
	 * All returned URLs will be normalized.
	 *
	 * @param aRoot The root path or URL.
	 * @param aPath The path or URL to be made relative to aRoot.
	 * @return A rootURL-relative (if possible), normalized URL value.
	 */
	function relative(rootURL, targetURL) {
	  const result = relativeIfPossible(rootURL, targetURL);

	  return typeof result === "string" ? result : normalize(targetURL);
	}
	util.relative = relative;

	function relativeIfPossible(rootURL, targetURL) {
	  const urlType = getURLType(rootURL);
	  if (urlType !== getURLType(targetURL)) {
	    return null;
	  }

	  const base = buildSafeBase(rootURL + targetURL);
	  const root = new URL(rootURL, base);
	  const target = new URL(targetURL, base);

	  try {
	    new URL("", target.toString());
	  } catch (err) {
	    // Bail if the URL doesn't support things being relative to it,
	    // For example, data: and blob: URLs.
	    return null;
	  }

	  if (
	    target.protocol !== root.protocol ||
	    target.user !== root.user ||
	    target.password !== root.password ||
	    target.hostname !== root.hostname ||
	    target.port !== root.port
	  ) {
	    return null;
	  }

	  return computeRelativeURL(root, target);
	}

	/**
	 * Compute the URL of a source given the the source root, the source's
	 * URL, and the source map's URL.
	 */
	function computeSourceURL(sourceRoot, sourceURL, sourceMapURL) {
	  // The source map spec states that "sourceRoot" and "sources" entries are to be appended. While
	  // that is a little vague, implementations have generally interpreted that as joining the
	  // URLs with a `/` between then, assuming the "sourceRoot" doesn't already end with one.
	  // For example,
	  //
	  //   sourceRoot: "some-dir",
	  //   sources: ["/some-path.js"]
	  //
	  // and
	  //
	  //   sourceRoot: "some-dir/",
	  //   sources: ["/some-path.js"]
	  //
	  // must behave as "some-dir/some-path.js".
	  //
	  // With this library's the transition to a more URL-focused implementation, that behavior is
	  // preserved here. To acheive that, we trim the "/" from absolute-path when a sourceRoot value
	  // is present in order to make the sources entries behave as if they are relative to the
	  // "sourceRoot", as they would have if the two strings were simply concated.
	  if (sourceRoot && getURLType(sourceURL) === "path-absolute") {
	    sourceURL = sourceURL.replace(/^\//, "");
	  }

	  let url = normalize(sourceURL || "");

	  // Parsing URLs can be expensive, so we only perform these joins when needed.
	  if (sourceRoot) url = join(sourceRoot, url);
	  if (sourceMapURL) url = join(trimFilename(sourceMapURL), url);
	  return url;
	}
	util.computeSourceURL = computeSourceURL;
	return util;
}

var arraySet = {};

/* -*- Mode: js; js-indent-level: 2; -*- */

var hasRequiredArraySet;

function requireArraySet () {
	if (hasRequiredArraySet) return arraySet;
	hasRequiredArraySet = 1;
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */

	/**
	 * A data structure which is a combination of an array and a set. Adding a new
	 * member is O(1), testing for membership is O(1), and finding the index of an
	 * element is O(1). Removing elements from the set is not supported. Only
	 * strings are supported for membership.
	 */
	class ArraySet {
	  constructor() {
	    this._array = [];
	    this._set = new Map();
	  }

	  /**
	   * Static method for creating ArraySet instances from an existing array.
	   */
	  static fromArray(aArray, aAllowDuplicates) {
	    const set = new ArraySet();
	    for (let i = 0, len = aArray.length; i < len; i++) {
	      set.add(aArray[i], aAllowDuplicates);
	    }
	    return set;
	  }

	  /**
	   * Return how many unique items are in this ArraySet. If duplicates have been
	   * added, than those do not count towards the size.
	   *
	   * @returns Number
	   */
	  size() {
	    return this._set.size;
	  }

	  /**
	   * Add the given string to this set.
	   *
	   * @param String aStr
	   */
	  add(aStr, aAllowDuplicates) {
	    const isDuplicate = this.has(aStr);
	    const idx = this._array.length;
	    if (!isDuplicate || aAllowDuplicates) {
	      this._array.push(aStr);
	    }
	    if (!isDuplicate) {
	      this._set.set(aStr, idx);
	    }
	  }

	  /**
	   * Is the given string a member of this set?
	   *
	   * @param String aStr
	   */
	  has(aStr) {
	    return this._set.has(aStr);
	  }

	  /**
	   * What is the index of the given string in the array?
	   *
	   * @param String aStr
	   */
	  indexOf(aStr) {
	    const idx = this._set.get(aStr);
	    if (idx >= 0) {
	      return idx;
	    }
	    throw new Error('"' + aStr + '" is not in the set.');
	  }

	  /**
	   * What is the element at the given index?
	   *
	   * @param Number aIdx
	   */
	  at(aIdx) {
	    if (aIdx >= 0 && aIdx < this._array.length) {
	      return this._array[aIdx];
	    }
	    throw new Error("No element indexed by " + aIdx);
	  }

	  /**
	   * Returns the array representation of this set (which has the proper indices
	   * indicated by indexOf). Note that this is a copy of the internal array used
	   * for storing the members so that no one can mess with internal state.
	   */
	  toArray() {
	    return this._array.slice();
	  }
	}
	arraySet.ArraySet = ArraySet;
	return arraySet;
}

var mappingList = {};

/* -*- Mode: js; js-indent-level: 2; -*- */

var hasRequiredMappingList;

function requireMappingList () {
	if (hasRequiredMappingList) return mappingList;
	hasRequiredMappingList = 1;
	/*
	 * Copyright 2014 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */

	const util = requireUtil();

	/**
	 * Determine whether mappingB is after mappingA with respect to generated
	 * position.
	 */
	function generatedPositionAfter(mappingA, mappingB) {
	  // Optimized for most common case
	  const lineA = mappingA.generatedLine;
	  const lineB = mappingB.generatedLine;
	  const columnA = mappingA.generatedColumn;
	  const columnB = mappingB.generatedColumn;
	  return (
	    lineB > lineA ||
	    (lineB == lineA && columnB >= columnA) ||
	    util.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0
	  );
	}

	/**
	 * A data structure to provide a sorted view of accumulated mappings in a
	 * performance conscious manner. It trades a negligible overhead in general
	 * case for a large speedup in case of mappings being added in order.
	 */
	class MappingList {
	  constructor() {
	    this._array = [];
	    this._sorted = true;
	    // Serves as infimum
	    this._last = { generatedLine: -1, generatedColumn: 0 };
	  }

	  /**
	   * Iterate through internal items. This method takes the same arguments that
	   * `Array.prototype.forEach` takes.
	   *
	   * NOTE: The order of the mappings is NOT guaranteed.
	   */
	  unsortedForEach(aCallback, aThisArg) {
	    this._array.forEach(aCallback, aThisArg);
	  }

	  /**
	   * Add the given source mapping.
	   *
	   * @param Object aMapping
	   */
	  add(aMapping) {
	    if (generatedPositionAfter(this._last, aMapping)) {
	      this._last = aMapping;
	      this._array.push(aMapping);
	    } else {
	      this._sorted = false;
	      this._array.push(aMapping);
	    }
	  }

	  /**
	   * Returns the flat, sorted array of mappings. The mappings are sorted by
	   * generated position.
	   *
	   * WARNING: This method returns internal data without copying, for
	   * performance. The return value must NOT be mutated, and should be treated as
	   * an immutable borrow. If you want to take ownership, you must make your own
	   * copy.
	   */
	  toArray() {
	    if (!this._sorted) {
	      this._array.sort(util.compareByGeneratedPositionsInflated);
	      this._sorted = true;
	    }
	    return this._array;
	  }
	}

	mappingList.MappingList = MappingList;
	return mappingList;
}

/* -*- Mode: js; js-indent-level: 2; -*- */

var hasRequiredSourceMapGenerator;

function requireSourceMapGenerator () {
	if (hasRequiredSourceMapGenerator) return sourceMapGenerator;
	hasRequiredSourceMapGenerator = 1;
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */

	const base64VLQ = requireBase64Vlq();
	const util = requireUtil();
	const ArraySet = requireArraySet().ArraySet;
	const MappingList = requireMappingList().MappingList;

	/**
	 * An instance of the SourceMapGenerator represents a source map which is
	 * being built incrementally. You may pass an object with the following
	 * properties:
	 *
	 *   - file: The filename of the generated source.
	 *   - sourceRoot: A root for all relative URLs in this source map.
	 */
	class SourceMapGenerator {
	  constructor(aArgs) {
	    if (!aArgs) {
	      aArgs = {};
	    }
	    this._file = util.getArg(aArgs, "file", null);
	    this._sourceRoot = util.getArg(aArgs, "sourceRoot", null);
	    this._skipValidation = util.getArg(aArgs, "skipValidation", false);
	    this._sources = new ArraySet();
	    this._names = new ArraySet();
	    this._mappings = new MappingList();
	    this._sourcesContents = null;
	  }

	  /**
	   * Creates a new SourceMapGenerator based on a SourceMapConsumer
	   *
	   * @param aSourceMapConsumer The SourceMap.
	   */
	  static fromSourceMap(aSourceMapConsumer) {
	    const sourceRoot = aSourceMapConsumer.sourceRoot;
	    const generator = new SourceMapGenerator({
	      file: aSourceMapConsumer.file,
	      sourceRoot,
	    });
	    aSourceMapConsumer.eachMapping(function (mapping) {
	      const newMapping = {
	        generated: {
	          line: mapping.generatedLine,
	          column: mapping.generatedColumn,
	        },
	      };

	      if (mapping.source != null) {
	        newMapping.source = mapping.source;
	        if (sourceRoot != null) {
	          newMapping.source = util.relative(sourceRoot, newMapping.source);
	        }

	        newMapping.original = {
	          line: mapping.originalLine,
	          column: mapping.originalColumn,
	        };

	        if (mapping.name != null) {
	          newMapping.name = mapping.name;
	        }
	      }

	      generator.addMapping(newMapping);
	    });
	    aSourceMapConsumer.sources.forEach(function (sourceFile) {
	      let sourceRelative = sourceFile;
	      if (sourceRoot != null) {
	        sourceRelative = util.relative(sourceRoot, sourceFile);
	      }

	      if (!generator._sources.has(sourceRelative)) {
	        generator._sources.add(sourceRelative);
	      }

	      const content = aSourceMapConsumer.sourceContentFor(sourceFile);
	      if (content != null) {
	        generator.setSourceContent(sourceFile, content);
	      }
	    });
	    return generator;
	  }

	  /**
	   * Add a single mapping from original source line and column to the generated
	   * source's line and column for this source map being created. The mapping
	   * object should have the following properties:
	   *
	   *   - generated: An object with the generated line and column positions.
	   *   - original: An object with the original line and column positions.
	   *   - source: The original source file (relative to the sourceRoot).
	   *   - name: An optional original token name for this mapping.
	   */
	  addMapping(aArgs) {
	    const generated = util.getArg(aArgs, "generated");
	    const original = util.getArg(aArgs, "original", null);
	    let source = util.getArg(aArgs, "source", null);
	    let name = util.getArg(aArgs, "name", null);

	    if (!this._skipValidation) {
	      this._validateMapping(generated, original, source, name);
	    }

	    if (source != null) {
	      source = String(source);
	      if (!this._sources.has(source)) {
	        this._sources.add(source);
	      }
	    }

	    if (name != null) {
	      name = String(name);
	      if (!this._names.has(name)) {
	        this._names.add(name);
	      }
	    }

	    this._mappings.add({
	      generatedLine: generated.line,
	      generatedColumn: generated.column,
	      originalLine: original && original.line,
	      originalColumn: original && original.column,
	      source,
	      name,
	    });
	  }

	  /**
	   * Set the source content for a source file.
	   */
	  setSourceContent(aSourceFile, aSourceContent) {
	    let source = aSourceFile;
	    if (this._sourceRoot != null) {
	      source = util.relative(this._sourceRoot, source);
	    }

	    if (aSourceContent != null) {
	      // Add the source content to the _sourcesContents map.
	      // Create a new _sourcesContents map if the property is null.
	      if (!this._sourcesContents) {
	        this._sourcesContents = Object.create(null);
	      }
	      this._sourcesContents[util.toSetString(source)] = aSourceContent;
	    } else if (this._sourcesContents) {
	      // Remove the source file from the _sourcesContents map.
	      // If the _sourcesContents map is empty, set the property to null.
	      delete this._sourcesContents[util.toSetString(source)];
	      if (Object.keys(this._sourcesContents).length === 0) {
	        this._sourcesContents = null;
	      }
	    }
	  }

	  /**
	   * Applies the mappings of a sub-source-map for a specific source file to the
	   * source map being generated. Each mapping to the supplied source file is
	   * rewritten using the supplied source map. Note: The resolution for the
	   * resulting mappings is the minimium of this map and the supplied map.
	   *
	   * @param aSourceMapConsumer The source map to be applied.
	   * @param aSourceFile Optional. The filename of the source file.
	   *        If omitted, SourceMapConsumer's file property will be used.
	   * @param aSourceMapPath Optional. The dirname of the path to the source map
	   *        to be applied. If relative, it is relative to the SourceMapConsumer.
	   *        This parameter is needed when the two source maps aren't in the same
	   *        directory, and the source map to be applied contains relative source
	   *        paths. If so, those relative source paths need to be rewritten
	   *        relative to the SourceMapGenerator.
	   */
	  applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
	    let sourceFile = aSourceFile;
	    // If aSourceFile is omitted, we will use the file property of the SourceMap
	    if (aSourceFile == null) {
	      if (aSourceMapConsumer.file == null) {
	        throw new Error(
	          "SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, " +
	            'or the source map\'s "file" property. Both were omitted.'
	        );
	      }
	      sourceFile = aSourceMapConsumer.file;
	    }
	    const sourceRoot = this._sourceRoot;
	    // Make "sourceFile" relative if an absolute Url is passed.
	    if (sourceRoot != null) {
	      sourceFile = util.relative(sourceRoot, sourceFile);
	    }
	    // Applying the SourceMap can add and remove items from the sources and
	    // the names array.
	    const newSources =
	      this._mappings.toArray().length > 0 ? new ArraySet() : this._sources;
	    const newNames = new ArraySet();

	    // Find mappings for the "sourceFile"
	    this._mappings.unsortedForEach(function (mapping) {
	      if (mapping.source === sourceFile && mapping.originalLine != null) {
	        // Check if it can be mapped by the source map, then update the mapping.
	        const original = aSourceMapConsumer.originalPositionFor({
	          line: mapping.originalLine,
	          column: mapping.originalColumn,
	        });
	        if (original.source != null) {
	          // Copy mapping
	          mapping.source = original.source;
	          if (aSourceMapPath != null) {
	            mapping.source = util.join(aSourceMapPath, mapping.source);
	          }
	          if (sourceRoot != null) {
	            mapping.source = util.relative(sourceRoot, mapping.source);
	          }
	          mapping.originalLine = original.line;
	          mapping.originalColumn = original.column;
	          if (original.name != null) {
	            mapping.name = original.name;
	          }
	        }
	      }

	      const source = mapping.source;
	      if (source != null && !newSources.has(source)) {
	        newSources.add(source);
	      }

	      const name = mapping.name;
	      if (name != null && !newNames.has(name)) {
	        newNames.add(name);
	      }
	    }, this);
	    this._sources = newSources;
	    this._names = newNames;

	    // Copy sourcesContents of applied map.
	    aSourceMapConsumer.sources.forEach(function (srcFile) {
	      const content = aSourceMapConsumer.sourceContentFor(srcFile);
	      if (content != null) {
	        if (aSourceMapPath != null) {
	          srcFile = util.join(aSourceMapPath, srcFile);
	        }
	        if (sourceRoot != null) {
	          srcFile = util.relative(sourceRoot, srcFile);
	        }
	        this.setSourceContent(srcFile, content);
	      }
	    }, this);
	  }

	  /**
	   * A mapping can have one of the three levels of data:
	   *
	   *   1. Just the generated position.
	   *   2. The Generated position, original position, and original source.
	   *   3. Generated and original position, original source, as well as a name
	   *      token.
	   *
	   * To maintain consistency, we validate that any new mapping being added falls
	   * in to one of these categories.
	   */
	  _validateMapping(aGenerated, aOriginal, aSource, aName) {
	    // When aOriginal is truthy but has empty values for .line and .column,
	    // it is most likely a programmer error. In this case we throw a very
	    // specific error message to try to guide them the right way.
	    // For example: https://github.com/Polymer/polymer-bundler/pull/519
	    if (
	      aOriginal &&
	      typeof aOriginal.line !== "number" &&
	      typeof aOriginal.column !== "number"
	    ) {
	      throw new Error(
	        "original.line and original.column are not numbers -- you probably meant to omit " +
	          "the original mapping entirely and only map the generated position. If so, pass " +
	          "null for the original mapping instead of an object with empty or null values."
	      );
	    }

	    if (
	      aGenerated &&
	      "line" in aGenerated &&
	      "column" in aGenerated &&
	      aGenerated.line > 0 &&
	      aGenerated.column >= 0 &&
	      !aOriginal &&
	      !aSource &&
	      !aName
	    ) ; else if (
	      aGenerated &&
	      "line" in aGenerated &&
	      "column" in aGenerated &&
	      aOriginal &&
	      "line" in aOriginal &&
	      "column" in aOriginal &&
	      aGenerated.line > 0 &&
	      aGenerated.column >= 0 &&
	      aOriginal.line > 0 &&
	      aOriginal.column >= 0 &&
	      aSource
	    ) ; else {
	      throw new Error(
	        "Invalid mapping: " +
	          JSON.stringify({
	            generated: aGenerated,
	            source: aSource,
	            original: aOriginal,
	            name: aName,
	          })
	      );
	    }
	  }

	  /**
	   * Serialize the accumulated mappings in to the stream of base 64 VLQs
	   * specified by the source map format.
	   */
	  _serializeMappings() {
	    let previousGeneratedColumn = 0;
	    let previousGeneratedLine = 1;
	    let previousOriginalColumn = 0;
	    let previousOriginalLine = 0;
	    let previousName = 0;
	    let previousSource = 0;
	    let result = "";
	    let next;
	    let mapping;
	    let nameIdx;
	    let sourceIdx;

	    const mappings = this._mappings.toArray();
	    for (let i = 0, len = mappings.length; i < len; i++) {
	      mapping = mappings[i];
	      next = "";

	      if (mapping.generatedLine !== previousGeneratedLine) {
	        previousGeneratedColumn = 0;
	        while (mapping.generatedLine !== previousGeneratedLine) {
	          next += ";";
	          previousGeneratedLine++;
	        }
	      } else if (i > 0) {
	        if (
	          !util.compareByGeneratedPositionsInflated(mapping, mappings[i - 1])
	        ) {
	          continue;
	        }
	        next += ",";
	      }

	      next += base64VLQ.encode(
	        mapping.generatedColumn - previousGeneratedColumn
	      );
	      previousGeneratedColumn = mapping.generatedColumn;

	      if (mapping.source != null) {
	        sourceIdx = this._sources.indexOf(mapping.source);
	        next += base64VLQ.encode(sourceIdx - previousSource);
	        previousSource = sourceIdx;

	        // lines are stored 0-based in SourceMap spec version 3
	        next += base64VLQ.encode(
	          mapping.originalLine - 1 - previousOriginalLine
	        );
	        previousOriginalLine = mapping.originalLine - 1;

	        next += base64VLQ.encode(
	          mapping.originalColumn - previousOriginalColumn
	        );
	        previousOriginalColumn = mapping.originalColumn;

	        if (mapping.name != null) {
	          nameIdx = this._names.indexOf(mapping.name);
	          next += base64VLQ.encode(nameIdx - previousName);
	          previousName = nameIdx;
	        }
	      }

	      result += next;
	    }

	    return result;
	  }

	  _generateSourcesContent(aSources, aSourceRoot) {
	    return aSources.map(function (source) {
	      if (!this._sourcesContents) {
	        return null;
	      }
	      if (aSourceRoot != null) {
	        source = util.relative(aSourceRoot, source);
	      }
	      const key = util.toSetString(source);
	      return Object.prototype.hasOwnProperty.call(this._sourcesContents, key)
	        ? this._sourcesContents[key]
	        : null;
	    }, this);
	  }

	  /**
	   * Externalize the source map.
	   */
	  toJSON() {
	    const map = {
	      version: this._version,
	      sources: this._sources.toArray(),
	      names: this._names.toArray(),
	      mappings: this._serializeMappings(),
	    };
	    if (this._file != null) {
	      map.file = this._file;
	    }
	    if (this._sourceRoot != null) {
	      map.sourceRoot = this._sourceRoot;
	    }
	    if (this._sourcesContents) {
	      map.sourcesContent = this._generateSourcesContent(
	        map.sources,
	        map.sourceRoot
	      );
	    }

	    return map;
	  }

	  /**
	   * Render the source map being generated to a string.
	   */
	  toString() {
	    return JSON.stringify(this.toJSON());
	  }
	}

	SourceMapGenerator.prototype._version = 3;
	sourceMapGenerator.SourceMapGenerator = SourceMapGenerator;
	return sourceMapGenerator;
}

var sourceMapConsumer = {};

var binarySearch = {};

/* -*- Mode: js; js-indent-level: 2; -*- */

var hasRequiredBinarySearch;

function requireBinarySearch () {
	if (hasRequiredBinarySearch) return binarySearch;
	hasRequiredBinarySearch = 1;
	(function (exports) {
		/*
		 * Copyright 2011 Mozilla Foundation and contributors
		 * Licensed under the New BSD license. See LICENSE or:
		 * http://opensource.org/licenses/BSD-3-Clause
		 */

		exports.GREATEST_LOWER_BOUND = 1;
		exports.LEAST_UPPER_BOUND = 2;

		/**
		 * Recursive implementation of binary search.
		 *
		 * @param aLow Indices here and lower do not contain the needle.
		 * @param aHigh Indices here and higher do not contain the needle.
		 * @param aNeedle The element being searched for.
		 * @param aHaystack The non-empty array being searched.
		 * @param aCompare Function which takes two elements and returns -1, 0, or 1.
		 * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
		 *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
		 *     closest element that is smaller than or greater than the one we are
		 *     searching for, respectively, if the exact element cannot be found.
		 */
		function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
		  // This function terminates when one of the following is true:
		  //
		  //   1. We find the exact element we are looking for.
		  //
		  //   2. We did not find the exact element, but we can return the index of
		  //      the next-closest element.
		  //
		  //   3. We did not find the exact element, and there is no next-closest
		  //      element than the one we are searching for, so we return -1.
		  const mid = Math.floor((aHigh - aLow) / 2) + aLow;
		  const cmp = aCompare(aNeedle, aHaystack[mid], true);
		  if (cmp === 0) {
		    // Found the element we are looking for.
		    return mid;
		  } else if (cmp > 0) {
		    // Our needle is greater than aHaystack[mid].
		    if (aHigh - mid > 1) {
		      // The element is in the upper half.
		      return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias);
		    }

		    // The exact needle element was not found in this haystack. Determine if
		    // we are in termination case (3) or (2) and return the appropriate thing.
		    if (aBias === exports.LEAST_UPPER_BOUND) {
		      return aHigh < aHaystack.length ? aHigh : -1;
		    }
		    return mid;
		  }

		  // Our needle is less than aHaystack[mid].
		  if (mid - aLow > 1) {
		    // The element is in the lower half.
		    return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias);
		  }

		  // we are in termination case (3) or (2) and return the appropriate thing.
		  if (aBias == exports.LEAST_UPPER_BOUND) {
		    return mid;
		  }
		  return aLow < 0 ? -1 : aLow;
		}

		/**
		 * This is an implementation of binary search which will always try and return
		 * the index of the closest element if there is no exact hit. This is because
		 * mappings between original and generated line/col pairs are single points,
		 * and there is an implicit region between each of them, so a miss just means
		 * that you aren't on the very start of a region.
		 *
		 * @param aNeedle The element you are looking for.
		 * @param aHaystack The array that is being searched.
		 * @param aCompare A function which takes the needle and an element in the
		 *     array and returns -1, 0, or 1 depending on whether the needle is less
		 *     than, equal to, or greater than the element, respectively.
		 * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
		 *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
		 *     closest element that is smaller than or greater than the one we are
		 *     searching for, respectively, if the exact element cannot be found.
		 *     Defaults to 'binarySearch.GREATEST_LOWER_BOUND'.
		 */
		exports.search = function search(aNeedle, aHaystack, aCompare, aBias) {
		  if (aHaystack.length === 0) {
		    return -1;
		  }

		  let index = recursiveSearch(
		    -1,
		    aHaystack.length,
		    aNeedle,
		    aHaystack,
		    aCompare,
		    aBias || exports.GREATEST_LOWER_BOUND
		  );
		  if (index < 0) {
		    return -1;
		  }

		  // We have found either the exact element, or the next-closest element to
		  // the one we are searching for. However, there may be more than one such
		  // element. Make sure we always return the smallest of these.
		  while (index - 1 >= 0) {
		    if (aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0) {
		      break;
		    }
		    --index;
		  }

		  return index;
		}; 
	} (binarySearch));
	return binarySearch;
}

var readWasm = {exports: {}};

var hasRequiredReadWasm;

function requireReadWasm () {
	if (hasRequiredReadWasm) return readWasm.exports;
	hasRequiredReadWasm = 1;

	// Note: This file is replaced with "read-wasm-browser.js" when this module is
	// bundled with a packager that takes package.json#browser fields into account.

	const fs = require$$0$1;
	const path = require$$1;

	readWasm.exports = function readWasm() {
	  return new Promise((resolve, reject) => {
	    const wasmPath = path.join(__dirname, "mappings.wasm");
	    fs.readFile(wasmPath, null, (error, data) => {
	      if (error) {
	        reject(error);
	        return;
	      }

	      resolve(data.buffer);
	    });
	  });
	};

	readWasm.exports.initialize = _ => {
	  console.debug(
	    "SourceMapConsumer.initialize is a no-op when running in node.js"
	  );
	};
	return readWasm.exports;
}

var wasm;
var hasRequiredWasm;

function requireWasm () {
	if (hasRequiredWasm) return wasm;
	hasRequiredWasm = 1;
	const readWasm = requireReadWasm();

	/**
	 * Provide the JIT with a nice shape / hidden class.
	 */
	function Mapping() {
	  this.generatedLine = 0;
	  this.generatedColumn = 0;
	  this.lastGeneratedColumn = null;
	  this.source = null;
	  this.originalLine = null;
	  this.originalColumn = null;
	  this.name = null;
	}

	let cachedWasm = null;

	wasm = function wasm() {
	  if (cachedWasm) {
	    return cachedWasm;
	  }

	  const callbackStack = [];

	  cachedWasm = readWasm()
	    .then(buffer => {
	      return WebAssembly.instantiate(buffer, {
	        env: {
	          mapping_callback(
	            generatedLine,
	            generatedColumn,

	            hasLastGeneratedColumn,
	            lastGeneratedColumn,

	            hasOriginal,
	            source,
	            originalLine,
	            originalColumn,

	            hasName,
	            name
	          ) {
	            const mapping = new Mapping();
	            // JS uses 1-based line numbers, wasm uses 0-based.
	            mapping.generatedLine = generatedLine + 1;
	            mapping.generatedColumn = generatedColumn;

	            if (hasLastGeneratedColumn) {
	              // JS uses inclusive last generated column, wasm uses exclusive.
	              mapping.lastGeneratedColumn = lastGeneratedColumn - 1;
	            }

	            if (hasOriginal) {
	              mapping.source = source;
	              // JS uses 1-based line numbers, wasm uses 0-based.
	              mapping.originalLine = originalLine + 1;
	              mapping.originalColumn = originalColumn;

	              if (hasName) {
	                mapping.name = name;
	              }
	            }

	            callbackStack[callbackStack.length - 1](mapping);
	          },

	          start_all_generated_locations_for() {
	            console.time("all_generated_locations_for");
	          },
	          end_all_generated_locations_for() {
	            console.timeEnd("all_generated_locations_for");
	          },

	          start_compute_column_spans() {
	            console.time("compute_column_spans");
	          },
	          end_compute_column_spans() {
	            console.timeEnd("compute_column_spans");
	          },

	          start_generated_location_for() {
	            console.time("generated_location_for");
	          },
	          end_generated_location_for() {
	            console.timeEnd("generated_location_for");
	          },

	          start_original_location_for() {
	            console.time("original_location_for");
	          },
	          end_original_location_for() {
	            console.timeEnd("original_location_for");
	          },

	          start_parse_mappings() {
	            console.time("parse_mappings");
	          },
	          end_parse_mappings() {
	            console.timeEnd("parse_mappings");
	          },

	          start_sort_by_generated_location() {
	            console.time("sort_by_generated_location");
	          },
	          end_sort_by_generated_location() {
	            console.timeEnd("sort_by_generated_location");
	          },

	          start_sort_by_original_location() {
	            console.time("sort_by_original_location");
	          },
	          end_sort_by_original_location() {
	            console.timeEnd("sort_by_original_location");
	          },
	        },
	      });
	    })
	    .then(Wasm => {
	      return {
	        exports: Wasm.instance.exports,
	        withMappingCallback: (mappingCallback, f) => {
	          callbackStack.push(mappingCallback);
	          try {
	            f();
	          } finally {
	            callbackStack.pop();
	          }
	        },
	      };
	    })
	    .then(null, e => {
	      cachedWasm = null;
	      throw e;
	    });

	  return cachedWasm;
	};
	return wasm;
}

/* -*- Mode: js; js-indent-level: 2; -*- */

var hasRequiredSourceMapConsumer;

function requireSourceMapConsumer () {
	if (hasRequiredSourceMapConsumer) return sourceMapConsumer;
	hasRequiredSourceMapConsumer = 1;
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */

	const util = requireUtil();
	const binarySearch = requireBinarySearch();
	const ArraySet = requireArraySet().ArraySet;
	requireBase64Vlq(); // eslint-disable-line no-unused-vars
	const readWasm = requireReadWasm();
	const wasm = requireWasm();

	const INTERNAL = Symbol("smcInternal");

	class SourceMapConsumer {
	  constructor(aSourceMap, aSourceMapURL) {
	    // If the constructor was called by super(), just return Promise<this>.
	    // Yes, this is a hack to retain the pre-existing API of the base-class
	    // constructor also being an async factory function.
	    if (aSourceMap == INTERNAL) {
	      return Promise.resolve(this);
	    }

	    return _factory(aSourceMap, aSourceMapURL);
	  }

	  static initialize(opts) {
	    readWasm.initialize(opts["lib/mappings.wasm"]);
	  }

	  static fromSourceMap(aSourceMap, aSourceMapURL) {
	    return _factoryBSM(aSourceMap, aSourceMapURL);
	  }

	  /**
	   * Construct a new `SourceMapConsumer` from `rawSourceMap` and `sourceMapUrl`
	   * (see the `SourceMapConsumer` constructor for details. Then, invoke the `async
	   * function f(SourceMapConsumer) -> T` with the newly constructed consumer, wait
	   * for `f` to complete, call `destroy` on the consumer, and return `f`'s return
	   * value.
	   *
	   * You must not use the consumer after `f` completes!
	   *
	   * By using `with`, you do not have to remember to manually call `destroy` on
	   * the consumer, since it will be called automatically once `f` completes.
	   *
	   * ```js
	   * const xSquared = await SourceMapConsumer.with(
	   *   myRawSourceMap,
	   *   null,
	   *   async function (consumer) {
	   *     // Use `consumer` inside here and don't worry about remembering
	   *     // to call `destroy`.
	   *
	   *     const x = await whatever(consumer);
	   *     return x * x;
	   *   }
	   * );
	   *
	   * // You may not use that `consumer` anymore out here; it has
	   * // been destroyed. But you can use `xSquared`.
	   * console.log(xSquared);
	   * ```
	   */
	  static async with(rawSourceMap, sourceMapUrl, f) {
	    const consumer = await new SourceMapConsumer(rawSourceMap, sourceMapUrl);
	    try {
	      return await f(consumer);
	    } finally {
	      consumer.destroy();
	    }
	  }

	  /**
	   * Iterate over each mapping between an original source/line/column and a
	   * generated line/column in this source map.
	   *
	   * @param Function aCallback
	   *        The function that is called with each mapping.
	   * @param Object aContext
	   *        Optional. If specified, this object will be the value of `this` every
	   *        time that `aCallback` is called.
	   * @param aOrder
	   *        Either `SourceMapConsumer.GENERATED_ORDER` or
	   *        `SourceMapConsumer.ORIGINAL_ORDER`. Specifies whether you want to
	   *        iterate over the mappings sorted by the generated file's line/column
	   *        order or the original's source/line/column order, respectively. Defaults to
	   *        `SourceMapConsumer.GENERATED_ORDER`.
	   */
	  eachMapping(aCallback, aContext, aOrder) {
	    throw new Error("Subclasses must implement eachMapping");
	  }

	  /**
	   * Returns all generated line and column information for the original source,
	   * line, and column provided. If no column is provided, returns all mappings
	   * corresponding to a either the line we are searching for or the next
	   * closest line that has any mappings. Otherwise, returns all mappings
	   * corresponding to the given line and either the column we are searching for
	   * or the next closest column that has any offsets.
	   *
	   * The only argument is an object with the following properties:
	   *
	   *   - source: The filename of the original source.
	   *   - line: The line number in the original source.  The line number is 1-based.
	   *   - column: Optional. the column number in the original source.
	   *    The column number is 0-based.
	   *
	   * and an array of objects is returned, each with the following properties:
	   *
	   *   - line: The line number in the generated source, or null.  The
	   *    line number is 1-based.
	   *   - column: The column number in the generated source, or null.
	   *    The column number is 0-based.
	   */
	  allGeneratedPositionsFor(aArgs) {
	    throw new Error("Subclasses must implement allGeneratedPositionsFor");
	  }

	  destroy() {
	    throw new Error("Subclasses must implement destroy");
	  }
	}

	/**
	 * The version of the source mapping spec that we are consuming.
	 */
	SourceMapConsumer.prototype._version = 3;
	SourceMapConsumer.GENERATED_ORDER = 1;
	SourceMapConsumer.ORIGINAL_ORDER = 2;

	SourceMapConsumer.GREATEST_LOWER_BOUND = 1;
	SourceMapConsumer.LEAST_UPPER_BOUND = 2;

	sourceMapConsumer.SourceMapConsumer = SourceMapConsumer;

	/**
	 * A BasicSourceMapConsumer instance represents a parsed source map which we can
	 * query for information about the original file positions by giving it a file
	 * position in the generated source.
	 *
	 * The first parameter is the raw source map (either as a JSON string, or
	 * already parsed to an object). According to the spec, source maps have the
	 * following attributes:
	 *
	 *   - version: Which version of the source map spec this map is following.
	 *   - sources: An array of URLs to the original source files.
	 *   - names: An array of identifiers which can be referenced by individual mappings.
	 *   - sourceRoot: Optional. The URL root from which all sources are relative.
	 *   - sourcesContent: Optional. An array of contents of the original source files.
	 *   - mappings: A string of base64 VLQs which contain the actual mappings.
	 *   - file: Optional. The generated file this source map is associated with.
	 *
	 * Here is an example source map, taken from the source map spec[0]:
	 *
	 *     {
	 *       version : 3,
	 *       file: "out.js",
	 *       sourceRoot : "",
	 *       sources: ["foo.js", "bar.js"],
	 *       names: ["src", "maps", "are", "fun"],
	 *       mappings: "AA,AB;;ABCDE;"
	 *     }
	 *
	 * The second parameter, if given, is a string whose value is the URL
	 * at which the source map was found.  This URL is used to compute the
	 * sources array.
	 *
	 * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?pli=1#
	 */
	class BasicSourceMapConsumer extends SourceMapConsumer {
	  constructor(aSourceMap, aSourceMapURL) {
	    return super(INTERNAL).then(that => {
	      let sourceMap = aSourceMap;
	      if (typeof aSourceMap === "string") {
	        sourceMap = util.parseSourceMapInput(aSourceMap);
	      }

	      const version = util.getArg(sourceMap, "version");
	      const sources = util.getArg(sourceMap, "sources").map(String);
	      // Sass 3.3 leaves out the 'names' array, so we deviate from the spec (which
	      // requires the array) to play nice here.
	      const names = util.getArg(sourceMap, "names", []);
	      const sourceRoot = util.getArg(sourceMap, "sourceRoot", null);
	      const sourcesContent = util.getArg(sourceMap, "sourcesContent", null);
	      const mappings = util.getArg(sourceMap, "mappings");
	      const file = util.getArg(sourceMap, "file", null);
	      const x_google_ignoreList = util.getArg(
	        sourceMap,
	        "x_google_ignoreList",
	        null
	      );

	      // Once again, Sass deviates from the spec and supplies the version as a
	      // string rather than a number, so we use loose equality checking here.
	      if (version != that._version) {
	        throw new Error("Unsupported version: " + version);
	      }

	      that._sourceLookupCache = new Map();

	      // Pass `true` below to allow duplicate names and sources. While source maps
	      // are intended to be compressed and deduplicated, the TypeScript compiler
	      // sometimes generates source maps with duplicates in them. See Github issue
	      // #72 and bugzil.la/889492.
	      that._names = ArraySet.fromArray(names.map(String), true);
	      that._sources = ArraySet.fromArray(sources, true);

	      that._absoluteSources = ArraySet.fromArray(
	        that._sources.toArray().map(function (s) {
	          return util.computeSourceURL(sourceRoot, s, aSourceMapURL);
	        }),
	        true
	      );

	      that.sourceRoot = sourceRoot;
	      that.sourcesContent = sourcesContent;
	      that._mappings = mappings;
	      that._sourceMapURL = aSourceMapURL;
	      that.file = file;
	      that.x_google_ignoreList = x_google_ignoreList;

	      that._computedColumnSpans = false;
	      that._mappingsPtr = 0;
	      that._wasm = null;

	      return wasm().then(w => {
	        that._wasm = w;
	        return that;
	      });
	    });
	  }

	  /**
	   * Utility function to find the index of a source.  Returns -1 if not
	   * found.
	   */
	  _findSourceIndex(aSource) {
	    // In the most common usecases, we'll be constantly looking up the index for the same source
	    // files, so we cache the index lookup to avoid constantly recomputing the full URLs.
	    const cachedIndex = this._sourceLookupCache.get(aSource);
	    if (typeof cachedIndex === "number") {
	      return cachedIndex;
	    }

	    // Treat the source as map-relative overall by default.
	    const sourceAsMapRelative = util.computeSourceURL(
	      null,
	      aSource,
	      this._sourceMapURL
	    );
	    if (this._absoluteSources.has(sourceAsMapRelative)) {
	      const index = this._absoluteSources.indexOf(sourceAsMapRelative);
	      this._sourceLookupCache.set(aSource, index);
	      return index;
	    }

	    // Fall back to treating the source as sourceRoot-relative.
	    const sourceAsSourceRootRelative = util.computeSourceURL(
	      this.sourceRoot,
	      aSource,
	      this._sourceMapURL
	    );
	    if (this._absoluteSources.has(sourceAsSourceRootRelative)) {
	      const index = this._absoluteSources.indexOf(sourceAsSourceRootRelative);
	      this._sourceLookupCache.set(aSource, index);
	      return index;
	    }

	    // To avoid this cache growing forever, we do not cache lookup misses.
	    return -1;
	  }

	  /**
	   * Create a BasicSourceMapConsumer from a SourceMapGenerator.
	   *
	   * @param SourceMapGenerator aSourceMap
	   *        The source map that will be consumed.
	   * @param String aSourceMapURL
	   *        The URL at which the source map can be found (optional)
	   * @returns BasicSourceMapConsumer
	   */
	  static fromSourceMap(aSourceMap, aSourceMapURL) {
	    return new BasicSourceMapConsumer(aSourceMap.toString());
	  }

	  get sources() {
	    return this._absoluteSources.toArray();
	  }

	  _getMappingsPtr() {
	    if (this._mappingsPtr === 0) {
	      this._parseMappings();
	    }

	    return this._mappingsPtr;
	  }

	  /**
	   * Parse the mappings in a string in to a data structure which we can easily
	   * query (the ordered arrays in the `this.__generatedMappings` and
	   * `this.__originalMappings` properties).
	   */
	  _parseMappings() {
	    const aStr = this._mappings;
	    const size = aStr.length;

	    // Interpret signed result of allocate_mappings as unsigned, otherwise
	    // addresses higher than 2GB will be negative.
	    const mappingsBufPtr = this._wasm.exports.allocate_mappings(size) >>> 0;
	    const mappingsBuf = new Uint8Array(
	      this._wasm.exports.memory.buffer,
	      mappingsBufPtr,
	      size
	    );
	    for (let i = 0; i < size; i++) {
	      mappingsBuf[i] = aStr.charCodeAt(i);
	    }

	    const mappingsPtr = this._wasm.exports.parse_mappings(mappingsBufPtr);

	    if (!mappingsPtr) {
	      const error = this._wasm.exports.get_last_error();
	      let msg = `Error parsing mappings (code ${error}): `;

	      // XXX: keep these error codes in sync with `wasm-mappings`.
	      switch (error) {
	        case 1:
	          msg +=
	            "the mappings contained a negative line, column, source index, or name index";
	          break;
	        case 2:
	          msg += "the mappings contained a number larger than 2**32";
	          break;
	        case 3:
	          msg += "reached EOF while in the middle of parsing a VLQ";
	          break;
	        case 4:
	          msg += "invalid base 64 character while parsing a VLQ";
	          break;
	        default:
	          msg += "unknown error code";
	          break;
	      }

	      throw new Error(msg);
	    }

	    this._mappingsPtr = mappingsPtr;
	  }

	  eachMapping(aCallback, aContext, aOrder) {
	    const context = aContext || null;
	    const order = aOrder || SourceMapConsumer.GENERATED_ORDER;

	    this._wasm.withMappingCallback(
	      mapping => {
	        if (mapping.source !== null) {
	          mapping.source = this._absoluteSources.at(mapping.source);

	          if (mapping.name !== null) {
	            mapping.name = this._names.at(mapping.name);
	          }
	        }
	        if (this._computedColumnSpans && mapping.lastGeneratedColumn === null) {
	          mapping.lastGeneratedColumn = Infinity;
	        }

	        aCallback.call(context, mapping);
	      },
	      () => {
	        switch (order) {
	          case SourceMapConsumer.GENERATED_ORDER:
	            this._wasm.exports.by_generated_location(this._getMappingsPtr());
	            break;
	          case SourceMapConsumer.ORIGINAL_ORDER:
	            this._wasm.exports.by_original_location(this._getMappingsPtr());
	            break;
	          default:
	            throw new Error("Unknown order of iteration.");
	        }
	      }
	    );
	  }

	  allGeneratedPositionsFor(aArgs) {
	    let source = util.getArg(aArgs, "source");
	    const originalLine = util.getArg(aArgs, "line");
	    const originalColumn = aArgs.column || 0;

	    source = this._findSourceIndex(source);
	    if (source < 0) {
	      return [];
	    }

	    if (originalLine < 1) {
	      throw new Error("Line numbers must be >= 1");
	    }

	    if (originalColumn < 0) {
	      throw new Error("Column numbers must be >= 0");
	    }

	    const mappings = [];

	    this._wasm.withMappingCallback(
	      m => {
	        let lastColumn = m.lastGeneratedColumn;
	        if (this._computedColumnSpans && lastColumn === null) {
	          lastColumn = Infinity;
	        }
	        mappings.push({
	          line: m.generatedLine,
	          column: m.generatedColumn,
	          lastColumn,
	        });
	      },
	      () => {
	        this._wasm.exports.all_generated_locations_for(
	          this._getMappingsPtr(),
	          source,
	          originalLine - 1,
	          "column" in aArgs,
	          originalColumn
	        );
	      }
	    );

	    return mappings;
	  }

	  destroy() {
	    if (this._mappingsPtr !== 0) {
	      this._wasm.exports.free_mappings(this._mappingsPtr);
	      this._mappingsPtr = 0;
	    }
	  }

	  /**
	   * Compute the last column for each generated mapping. The last column is
	   * inclusive.
	   */
	  computeColumnSpans() {
	    if (this._computedColumnSpans) {
	      return;
	    }

	    this._wasm.exports.compute_column_spans(this._getMappingsPtr());
	    this._computedColumnSpans = true;
	  }

	  /**
	   * Returns the original source, line, and column information for the generated
	   * source's line and column positions provided. The only argument is an object
	   * with the following properties:
	   *
	   *   - line: The line number in the generated source.  The line number
	   *     is 1-based.
	   *   - column: The column number in the generated source.  The column
	   *     number is 0-based.
	   *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
	   *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
	   *     closest element that is smaller than or greater than the one we are
	   *     searching for, respectively, if the exact element cannot be found.
	   *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
	   *
	   * and an object is returned with the following properties:
	   *
	   *   - source: The original source file, or null.
	   *   - line: The line number in the original source, or null.  The
	   *     line number is 1-based.
	   *   - column: The column number in the original source, or null.  The
	   *     column number is 0-based.
	   *   - name: The original identifier, or null.
	   */
	  originalPositionFor(aArgs) {
	    const needle = {
	      generatedLine: util.getArg(aArgs, "line"),
	      generatedColumn: util.getArg(aArgs, "column"),
	    };

	    if (needle.generatedLine < 1) {
	      throw new Error("Line numbers must be >= 1");
	    }

	    if (needle.generatedColumn < 0) {
	      throw new Error("Column numbers must be >= 0");
	    }

	    let bias = util.getArg(
	      aArgs,
	      "bias",
	      SourceMapConsumer.GREATEST_LOWER_BOUND
	    );
	    if (bias == null) {
	      bias = SourceMapConsumer.GREATEST_LOWER_BOUND;
	    }

	    let mapping;
	    this._wasm.withMappingCallback(
	      m => (mapping = m),
	      () => {
	        this._wasm.exports.original_location_for(
	          this._getMappingsPtr(),
	          needle.generatedLine - 1,
	          needle.generatedColumn,
	          bias
	        );
	      }
	    );

	    if (mapping) {
	      if (mapping.generatedLine === needle.generatedLine) {
	        let source = util.getArg(mapping, "source", null);
	        if (source !== null) {
	          source = this._absoluteSources.at(source);
	        }

	        let name = util.getArg(mapping, "name", null);
	        if (name !== null) {
	          name = this._names.at(name);
	        }

	        return {
	          source,
	          line: util.getArg(mapping, "originalLine", null),
	          column: util.getArg(mapping, "originalColumn", null),
	          name,
	        };
	      }
	    }

	    return {
	      source: null,
	      line: null,
	      column: null,
	      name: null,
	    };
	  }

	  /**
	   * Return true if we have the source content for every source in the source
	   * map, false otherwise.
	   */
	  hasContentsOfAllSources() {
	    if (!this.sourcesContent) {
	      return false;
	    }
	    return (
	      this.sourcesContent.length >= this._sources.size() &&
	      !this.sourcesContent.some(function (sc) {
	        return sc == null;
	      })
	    );
	  }

	  /**
	   * Returns the original source content. The only argument is the url of the
	   * original source file. Returns null if no original source content is
	   * available.
	   */
	  sourceContentFor(aSource, nullOnMissing) {
	    if (!this.sourcesContent) {
	      return null;
	    }

	    const index = this._findSourceIndex(aSource);
	    if (index >= 0) {
	      return this.sourcesContent[index];
	    }

	    // This function is used recursively from
	    // IndexedSourceMapConsumer.prototype.sourceContentFor. In that case, we
	    // don't want to throw if we can't find the source - we just want to
	    // return null, so we provide a flag to exit gracefully.
	    if (nullOnMissing) {
	      return null;
	    }

	    throw new Error('"' + aSource + '" is not in the SourceMap.');
	  }

	  /**
	   * Returns the generated line and column information for the original source,
	   * line, and column positions provided. The only argument is an object with
	   * the following properties:
	   *
	   *   - source: The filename of the original source.
	   *   - line: The line number in the original source.  The line number
	   *     is 1-based.
	   *   - column: The column number in the original source.  The column
	   *     number is 0-based.
	   *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
	   *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
	   *     closest element that is smaller than or greater than the one we are
	   *     searching for, respectively, if the exact element cannot be found.
	   *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
	   *
	   * and an object is returned with the following properties:
	   *
	   *   - line: The line number in the generated source, or null.  The
	   *     line number is 1-based.
	   *   - column: The column number in the generated source, or null.
	   *     The column number is 0-based.
	   */
	  generatedPositionFor(aArgs) {
	    let source = util.getArg(aArgs, "source");
	    source = this._findSourceIndex(source);
	    if (source < 0) {
	      return {
	        line: null,
	        column: null,
	        lastColumn: null,
	      };
	    }

	    const needle = {
	      source,
	      originalLine: util.getArg(aArgs, "line"),
	      originalColumn: util.getArg(aArgs, "column"),
	    };

	    if (needle.originalLine < 1) {
	      throw new Error("Line numbers must be >= 1");
	    }

	    if (needle.originalColumn < 0) {
	      throw new Error("Column numbers must be >= 0");
	    }

	    let bias = util.getArg(
	      aArgs,
	      "bias",
	      SourceMapConsumer.GREATEST_LOWER_BOUND
	    );
	    if (bias == null) {
	      bias = SourceMapConsumer.GREATEST_LOWER_BOUND;
	    }

	    let mapping;
	    this._wasm.withMappingCallback(
	      m => (mapping = m),
	      () => {
	        this._wasm.exports.generated_location_for(
	          this._getMappingsPtr(),
	          needle.source,
	          needle.originalLine - 1,
	          needle.originalColumn,
	          bias
	        );
	      }
	    );

	    if (mapping) {
	      if (mapping.source === needle.source) {
	        let lastColumn = mapping.lastGeneratedColumn;
	        if (this._computedColumnSpans && lastColumn === null) {
	          lastColumn = Infinity;
	        }
	        return {
	          line: util.getArg(mapping, "generatedLine", null),
	          column: util.getArg(mapping, "generatedColumn", null),
	          lastColumn,
	        };
	      }
	    }

	    return {
	      line: null,
	      column: null,
	      lastColumn: null,
	    };
	  }
	}

	BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer;
	sourceMapConsumer.BasicSourceMapConsumer = BasicSourceMapConsumer;

	/**
	 * An IndexedSourceMapConsumer instance represents a parsed source map which
	 * we can query for information. It differs from BasicSourceMapConsumer in
	 * that it takes "indexed" source maps (i.e. ones with a "sections" field) as
	 * input.
	 *
	 * The first parameter is a raw source map (either as a JSON string, or already
	 * parsed to an object). According to the spec for indexed source maps, they
	 * have the following attributes:
	 *
	 *   - version: Which version of the source map spec this map is following.
	 *   - file: Optional. The generated file this source map is associated with.
	 *   - sections: A list of section definitions.
	 *
	 * Each value under the "sections" field has two fields:
	 *   - offset: The offset into the original specified at which this section
	 *       begins to apply, defined as an object with a "line" and "column"
	 *       field.
	 *   - map: A source map definition. This source map could also be indexed,
	 *       but doesn't have to be.
	 *
	 * Instead of the "map" field, it's also possible to have a "url" field
	 * specifying a URL to retrieve a source map from, but that's currently
	 * unsupported.
	 *
	 * Here's an example source map, taken from the source map spec[0], but
	 * modified to omit a section which uses the "url" field.
	 *
	 *  {
	 *    version : 3,
	 *    file: "app.js",
	 *    sections: [{
	 *      offset: {line:100, column:10},
	 *      map: {
	 *        version : 3,
	 *        file: "section.js",
	 *        sources: ["foo.js", "bar.js"],
	 *        names: ["src", "maps", "are", "fun"],
	 *        mappings: "AAAA,E;;ABCDE;"
	 *      }
	 *    }],
	 *  }
	 *
	 * The second parameter, if given, is a string whose value is the URL
	 * at which the source map was found.  This URL is used to compute the
	 * sources array.
	 *
	 * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit#heading=h.535es3xeprgt
	 */
	class IndexedSourceMapConsumer extends SourceMapConsumer {
	  constructor(aSourceMap, aSourceMapURL) {
	    return super(INTERNAL).then(that => {
	      let sourceMap = aSourceMap;
	      if (typeof aSourceMap === "string") {
	        sourceMap = util.parseSourceMapInput(aSourceMap);
	      }

	      const version = util.getArg(sourceMap, "version");
	      const sections = util.getArg(sourceMap, "sections");

	      if (version != that._version) {
	        throw new Error("Unsupported version: " + version);
	      }

	      let lastOffset = {
	        line: -1,
	        column: 0,
	      };
	      return Promise.all(
	        sections.map(s => {
	          if (s.url) {
	            // The url field will require support for asynchronicity.
	            // See https://github.com/mozilla/source-map/issues/16
	            throw new Error(
	              "Support for url field in sections not implemented."
	            );
	          }
	          const offset = util.getArg(s, "offset");
	          const offsetLine = util.getArg(offset, "line");
	          const offsetColumn = util.getArg(offset, "column");

	          if (
	            offsetLine < lastOffset.line ||
	            (offsetLine === lastOffset.line && offsetColumn < lastOffset.column)
	          ) {
	            throw new Error(
	              "Section offsets must be ordered and non-overlapping."
	            );
	          }
	          lastOffset = offset;

	          const cons = new SourceMapConsumer(
	            util.getArg(s, "map"),
	            aSourceMapURL
	          );
	          return cons.then(consumer => {
	            return {
	              generatedOffset: {
	                // The offset fields are 0-based, but we use 1-based indices when
	                // encoding/decoding from VLQ.
	                generatedLine: offsetLine + 1,
	                generatedColumn: offsetColumn + 1,
	              },
	              consumer,
	            };
	          });
	        })
	      ).then(s => {
	        that._sections = s;
	        return that;
	      });
	    });
	  }

	  /**
	   * The list of original sources.
	   */
	  get sources() {
	    const sources = [];
	    for (let i = 0; i < this._sections.length; i++) {
	      for (let j = 0; j < this._sections[i].consumer.sources.length; j++) {
	        sources.push(this._sections[i].consumer.sources[j]);
	      }
	    }
	    return sources;
	  }

	  /**
	   * Returns the original source, line, and column information for the generated
	   * source's line and column positions provided. The only argument is an object
	   * with the following properties:
	   *
	   *   - line: The line number in the generated source.  The line number
	   *     is 1-based.
	   *   - column: The column number in the generated source.  The column
	   *     number is 0-based.
	   *
	   * and an object is returned with the following properties:
	   *
	   *   - source: The original source file, or null.
	   *   - line: The line number in the original source, or null.  The
	   *     line number is 1-based.
	   *   - column: The column number in the original source, or null.  The
	   *     column number is 0-based.
	   *   - name: The original identifier, or null.
	   */
	  originalPositionFor(aArgs) {
	    const needle = {
	      generatedLine: util.getArg(aArgs, "line"),
	      generatedColumn: util.getArg(aArgs, "column"),
	    };

	    // Find the section containing the generated position we're trying to map
	    // to an original position.
	    const sectionIndex = binarySearch.search(
	      needle,
	      this._sections,
	      function (aNeedle, section) {
	        const cmp =
	          aNeedle.generatedLine - section.generatedOffset.generatedLine;
	        if (cmp) {
	          return cmp;
	        }

	        // The generated column is 0-based, but the section offset column is
	        // stored 1-based.
	        return (
	          aNeedle.generatedColumn -
	          (section.generatedOffset.generatedColumn - 1)
	        );
	      }
	    );
	    const section = this._sections[sectionIndex];

	    if (!section) {
	      return {
	        source: null,
	        line: null,
	        column: null,
	        name: null,
	      };
	    }

	    return section.consumer.originalPositionFor({
	      line: needle.generatedLine - (section.generatedOffset.generatedLine - 1),
	      column:
	        needle.generatedColumn -
	        (section.generatedOffset.generatedLine === needle.generatedLine
	          ? section.generatedOffset.generatedColumn - 1
	          : 0),
	      bias: aArgs.bias,
	    });
	  }

	  /**
	   * Return true if we have the source content for every source in the source
	   * map, false otherwise.
	   */
	  hasContentsOfAllSources() {
	    return this._sections.every(function (s) {
	      return s.consumer.hasContentsOfAllSources();
	    });
	  }

	  /**
	   * Returns the original source content. The only argument is the url of the
	   * original source file. Returns null if no original source content is
	   * available.
	   */
	  sourceContentFor(aSource, nullOnMissing) {
	    for (let i = 0; i < this._sections.length; i++) {
	      const section = this._sections[i];

	      const content = section.consumer.sourceContentFor(aSource, true);
	      if (content) {
	        return content;
	      }
	    }
	    if (nullOnMissing) {
	      return null;
	    }
	    throw new Error('"' + aSource + '" is not in the SourceMap.');
	  }

	  _findSectionIndex(source) {
	    for (let i = 0; i < this._sections.length; i++) {
	      const { consumer } = this._sections[i];
	      if (consumer._findSourceIndex(source) !== -1) {
	        return i;
	      }
	    }
	    return -1;
	  }

	  /**
	   * Returns the generated line and column information for the original source,
	   * line, and column positions provided. The only argument is an object with
	   * the following properties:
	   *
	   *   - source: The filename of the original source.
	   *   - line: The line number in the original source.  The line number
	   *     is 1-based.
	   *   - column: The column number in the original source.  The column
	   *     number is 0-based.
	   *
	   * and an object is returned with the following properties:
	   *
	   *   - line: The line number in the generated source, or null.  The
	   *     line number is 1-based.
	   *   - column: The column number in the generated source, or null.
	   *     The column number is 0-based.
	   */
	  generatedPositionFor(aArgs) {
	    const index = this._findSectionIndex(util.getArg(aArgs, "source"));
	    const section = index >= 0 ? this._sections[index] : null;
	    const nextSection =
	      index >= 0 && index + 1 < this._sections.length
	        ? this._sections[index + 1]
	        : null;

	    const generatedPosition =
	      section && section.consumer.generatedPositionFor(aArgs);
	    if (generatedPosition && generatedPosition.line !== null) {
	      const lineShift = section.generatedOffset.generatedLine - 1;
	      const columnShift = section.generatedOffset.generatedColumn - 1;

	      if (generatedPosition.line === 1) {
	        generatedPosition.column += columnShift;
	        if (typeof generatedPosition.lastColumn === "number") {
	          generatedPosition.lastColumn += columnShift;
	        }
	      }

	      if (
	        generatedPosition.lastColumn === Infinity &&
	        nextSection &&
	        generatedPosition.line === nextSection.generatedOffset.generatedLine
	      ) {
	        generatedPosition.lastColumn =
	          nextSection.generatedOffset.generatedColumn - 2;
	      }
	      generatedPosition.line += lineShift;

	      return generatedPosition;
	    }

	    return {
	      line: null,
	      column: null,
	      lastColumn: null,
	    };
	  }

	  allGeneratedPositionsFor(aArgs) {
	    const index = this._findSectionIndex(util.getArg(aArgs, "source"));
	    const section = index >= 0 ? this._sections[index] : null;
	    const nextSection =
	      index >= 0 && index + 1 < this._sections.length
	        ? this._sections[index + 1]
	        : null;

	    if (!section) return [];

	    return section.consumer
	      .allGeneratedPositionsFor(aArgs)
	      .map(generatedPosition => {
	        const lineShift = section.generatedOffset.generatedLine - 1;
	        const columnShift = section.generatedOffset.generatedColumn - 1;

	        if (generatedPosition.line === 1) {
	          generatedPosition.column += columnShift;
	          if (typeof generatedPosition.lastColumn === "number") {
	            generatedPosition.lastColumn += columnShift;
	          }
	        }

	        if (
	          generatedPosition.lastColumn === Infinity &&
	          nextSection &&
	          generatedPosition.line === nextSection.generatedOffset.generatedLine
	        ) {
	          generatedPosition.lastColumn =
	            nextSection.generatedOffset.generatedColumn - 2;
	        }
	        generatedPosition.line += lineShift;

	        return generatedPosition;
	      });
	  }

	  eachMapping(aCallback, aContext, aOrder) {
	    this._sections.forEach((section, index) => {
	      const nextSection =
	        index + 1 < this._sections.length ? this._sections[index + 1] : null;
	      const { generatedOffset } = section;

	      const lineShift = generatedOffset.generatedLine - 1;
	      const columnShift = generatedOffset.generatedColumn - 1;

	      section.consumer.eachMapping(
	        function (mapping) {
	          if (mapping.generatedLine === 1) {
	            mapping.generatedColumn += columnShift;

	            if (typeof mapping.lastGeneratedColumn === "number") {
	              mapping.lastGeneratedColumn += columnShift;
	            }
	          }

	          if (
	            mapping.lastGeneratedColumn === Infinity &&
	            nextSection &&
	            mapping.generatedLine === nextSection.generatedOffset.generatedLine
	          ) {
	            mapping.lastGeneratedColumn =
	              nextSection.generatedOffset.generatedColumn - 2;
	          }
	          mapping.generatedLine += lineShift;

	          aCallback.call(this, mapping);
	        },
	        aContext,
	        aOrder
	      );
	    });
	  }

	  computeColumnSpans() {
	    for (let i = 0; i < this._sections.length; i++) {
	      this._sections[i].consumer.computeColumnSpans();
	    }
	  }

	  destroy() {
	    for (let i = 0; i < this._sections.length; i++) {
	      this._sections[i].consumer.destroy();
	    }
	  }
	}
	sourceMapConsumer.IndexedSourceMapConsumer = IndexedSourceMapConsumer;

	/*
	 * Cheat to get around inter-twingled classes.  `factory()` can be at the end
	 * where it has access to non-hoisted classes, but it gets hoisted itself.
	 */
	function _factory(aSourceMap, aSourceMapURL) {
	  let sourceMap = aSourceMap;
	  if (typeof aSourceMap === "string") {
	    sourceMap = util.parseSourceMapInput(aSourceMap);
	  }

	  const consumer =
	    sourceMap.sections != null
	      ? new IndexedSourceMapConsumer(sourceMap, aSourceMapURL)
	      : new BasicSourceMapConsumer(sourceMap, aSourceMapURL);
	  return Promise.resolve(consumer);
	}

	function _factoryBSM(aSourceMap, aSourceMapURL) {
	  return BasicSourceMapConsumer.fromSourceMap(aSourceMap, aSourceMapURL);
	}
	return sourceMapConsumer;
}

var sourceNode = {};

/* -*- Mode: js; js-indent-level: 2; -*- */

var hasRequiredSourceNode;

function requireSourceNode () {
	if (hasRequiredSourceNode) return sourceNode;
	hasRequiredSourceNode = 1;
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */

	const SourceMapGenerator = requireSourceMapGenerator().SourceMapGenerator;
	const util = requireUtil();

	// Matches a Windows-style `\r\n` newline or a `\n` newline used by all other
	// operating systems these days (capturing the result).
	const REGEX_NEWLINE = /(\r?\n)/;

	// Newline character code for charCodeAt() comparisons
	const NEWLINE_CODE = 10;

	// Private symbol for identifying `SourceNode`s when multiple versions of
	// the source-map library are loaded. This MUST NOT CHANGE across
	// versions!
	const isSourceNode = "$$$isSourceNode$$$";

	/**
	 * SourceNodes provide a way to abstract over interpolating/concatenating
	 * snippets of generated JavaScript source code while maintaining the line and
	 * column information associated with the original source code.
	 *
	 * @param aLine The original line number.
	 * @param aColumn The original column number.
	 * @param aSource The original source's filename.
	 * @param aChunks Optional. An array of strings which are snippets of
	 *        generated JS, or other SourceNodes.
	 * @param aName The original identifier.
	 */
	class SourceNode {
	  constructor(aLine, aColumn, aSource, aChunks, aName) {
	    this.children = [];
	    this.sourceContents = {};
	    this.line = aLine == null ? null : aLine;
	    this.column = aColumn == null ? null : aColumn;
	    this.source = aSource == null ? null : aSource;
	    this.name = aName == null ? null : aName;
	    this[isSourceNode] = true;
	    if (aChunks != null) this.add(aChunks);
	  }

	  /**
	   * Creates a SourceNode from generated code and a SourceMapConsumer.
	   *
	   * @param aGeneratedCode The generated code
	   * @param aSourceMapConsumer The SourceMap for the generated code
	   * @param aRelativePath Optional. The path that relative sources in the
	   *        SourceMapConsumer should be relative to.
	   */
	  static fromStringWithSourceMap(
	    aGeneratedCode,
	    aSourceMapConsumer,
	    aRelativePath
	  ) {
	    // The SourceNode we want to fill with the generated code
	    // and the SourceMap
	    const node = new SourceNode();

	    // All even indices of this array are one line of the generated code,
	    // while all odd indices are the newlines between two adjacent lines
	    // (since `REGEX_NEWLINE` captures its match).
	    // Processed fragments are accessed by calling `shiftNextLine`.
	    const remainingLines = aGeneratedCode.split(REGEX_NEWLINE);
	    let remainingLinesIndex = 0;
	    const shiftNextLine = function () {
	      const lineContents = getNextLine();
	      // The last line of a file might not have a newline.
	      const newLine = getNextLine() || "";
	      return lineContents + newLine;

	      function getNextLine() {
	        return remainingLinesIndex < remainingLines.length
	          ? remainingLines[remainingLinesIndex++]
	          : undefined;
	      }
	    };

	    // We need to remember the position of "remainingLines"
	    let lastGeneratedLine = 1,
	      lastGeneratedColumn = 0;

	    // The generate SourceNodes we need a code range.
	    // To extract it current and last mapping is used.
	    // Here we store the last mapping.
	    let lastMapping = null;
	    let nextLine;

	    aSourceMapConsumer.eachMapping(function (mapping) {
	      if (lastMapping !== null) {
	        // We add the code from "lastMapping" to "mapping":
	        // First check if there is a new line in between.
	        if (lastGeneratedLine < mapping.generatedLine) {
	          // Associate first line with "lastMapping"
	          addMappingWithCode(lastMapping, shiftNextLine());
	          lastGeneratedLine++;
	          lastGeneratedColumn = 0;
	          // The remaining code is added without mapping
	        } else {
	          // There is no new line in between.
	          // Associate the code between "lastGeneratedColumn" and
	          // "mapping.generatedColumn" with "lastMapping"
	          nextLine = remainingLines[remainingLinesIndex] || "";
	          const code = nextLine.substr(
	            0,
	            mapping.generatedColumn - lastGeneratedColumn
	          );
	          remainingLines[remainingLinesIndex] = nextLine.substr(
	            mapping.generatedColumn - lastGeneratedColumn
	          );
	          lastGeneratedColumn = mapping.generatedColumn;
	          addMappingWithCode(lastMapping, code);
	          // No more remaining code, continue
	          lastMapping = mapping;
	          return;
	        }
	      }
	      // We add the generated code until the first mapping
	      // to the SourceNode without any mapping.
	      // Each line is added as separate string.
	      while (lastGeneratedLine < mapping.generatedLine) {
	        node.add(shiftNextLine());
	        lastGeneratedLine++;
	      }
	      if (lastGeneratedColumn < mapping.generatedColumn) {
	        nextLine = remainingLines[remainingLinesIndex] || "";
	        node.add(nextLine.substr(0, mapping.generatedColumn));
	        remainingLines[remainingLinesIndex] = nextLine.substr(
	          mapping.generatedColumn
	        );
	        lastGeneratedColumn = mapping.generatedColumn;
	      }
	      lastMapping = mapping;
	    }, this);
	    // We have processed all mappings.
	    if (remainingLinesIndex < remainingLines.length) {
	      if (lastMapping) {
	        // Associate the remaining code in the current line with "lastMapping"
	        addMappingWithCode(lastMapping, shiftNextLine());
	      }
	      // and add the remaining lines without any mapping
	      node.add(remainingLines.splice(remainingLinesIndex).join(""));
	    }

	    // Copy sourcesContent into SourceNode
	    aSourceMapConsumer.sources.forEach(function (sourceFile) {
	      const content = aSourceMapConsumer.sourceContentFor(sourceFile);
	      if (content != null) {
	        if (aRelativePath != null) {
	          sourceFile = util.join(aRelativePath, sourceFile);
	        }
	        node.setSourceContent(sourceFile, content);
	      }
	    });

	    return node;

	    function addMappingWithCode(mapping, code) {
	      if (mapping === null || mapping.source === undefined) {
	        node.add(code);
	      } else {
	        const source = aRelativePath
	          ? util.join(aRelativePath, mapping.source)
	          : mapping.source;
	        node.add(
	          new SourceNode(
	            mapping.originalLine,
	            mapping.originalColumn,
	            source,
	            code,
	            mapping.name
	          )
	        );
	      }
	    }
	  }

	  /**
	   * Add a chunk of generated JS to this source node.
	   *
	   * @param aChunk A string snippet of generated JS code, another instance of
	   *        SourceNode, or an array where each member is one of those things.
	   */
	  add(aChunk) {
	    if (Array.isArray(aChunk)) {
	      aChunk.forEach(function (chunk) {
	        this.add(chunk);
	      }, this);
	    } else if (aChunk[isSourceNode] || typeof aChunk === "string") {
	      if (aChunk) {
	        this.children.push(aChunk);
	      }
	    } else {
	      throw new TypeError(
	        "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " +
	          aChunk
	      );
	    }
	    return this;
	  }

	  /**
	   * Add a chunk of generated JS to the beginning of this source node.
	   *
	   * @param aChunk A string snippet of generated JS code, another instance of
	   *        SourceNode, or an array where each member is one of those things.
	   */
	  prepend(aChunk) {
	    if (Array.isArray(aChunk)) {
	      for (let i = aChunk.length - 1; i >= 0; i--) {
	        this.prepend(aChunk[i]);
	      }
	    } else if (aChunk[isSourceNode] || typeof aChunk === "string") {
	      this.children.unshift(aChunk);
	    } else {
	      throw new TypeError(
	        "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " +
	          aChunk
	      );
	    }
	    return this;
	  }

	  /**
	   * Walk over the tree of JS snippets in this node and its children. The
	   * walking function is called once for each snippet of JS and is passed that
	   * snippet and the its original associated source's line/column location.
	   *
	   * @param aFn The traversal function.
	   */
	  walk(aFn) {
	    let chunk;
	    for (let i = 0, len = this.children.length; i < len; i++) {
	      chunk = this.children[i];
	      if (chunk[isSourceNode]) {
	        chunk.walk(aFn);
	      } else if (chunk !== "") {
	        aFn(chunk, {
	          source: this.source,
	          line: this.line,
	          column: this.column,
	          name: this.name,
	        });
	      }
	    }
	  }

	  /**
	   * Like `String.prototype.join` except for SourceNodes. Inserts `aStr` between
	   * each of `this.children`.
	   *
	   * @param aSep The separator.
	   */
	  join(aSep) {
	    let newChildren;
	    let i;
	    const len = this.children.length;
	    if (len > 0) {
	      newChildren = [];
	      for (i = 0; i < len - 1; i++) {
	        newChildren.push(this.children[i]);
	        newChildren.push(aSep);
	      }
	      newChildren.push(this.children[i]);
	      this.children = newChildren;
	    }
	    return this;
	  }

	  /**
	   * Call String.prototype.replace on the very right-most source snippet. Useful
	   * for trimming whitespace from the end of a source node, etc.
	   *
	   * @param aPattern The pattern to replace.
	   * @param aReplacement The thing to replace the pattern with.
	   */
	  replaceRight(aPattern, aReplacement) {
	    const lastChild = this.children[this.children.length - 1];
	    if (lastChild[isSourceNode]) {
	      lastChild.replaceRight(aPattern, aReplacement);
	    } else if (typeof lastChild === "string") {
	      this.children[this.children.length - 1] = lastChild.replace(
	        aPattern,
	        aReplacement
	      );
	    } else {
	      this.children.push("".replace(aPattern, aReplacement));
	    }
	    return this;
	  }

	  /**
	   * Set the source content for a source file. This will be added to the SourceMapGenerator
	   * in the sourcesContent field.
	   *
	   * @param aSourceFile The filename of the source file
	   * @param aSourceContent The content of the source file
	   */
	  setSourceContent(aSourceFile, aSourceContent) {
	    this.sourceContents[util.toSetString(aSourceFile)] = aSourceContent;
	  }

	  /**
	   * Walk over the tree of SourceNodes. The walking function is called for each
	   * source file content and is passed the filename and source content.
	   *
	   * @param aFn The traversal function.
	   */
	  walkSourceContents(aFn) {
	    for (let i = 0, len = this.children.length; i < len; i++) {
	      if (this.children[i][isSourceNode]) {
	        this.children[i].walkSourceContents(aFn);
	      }
	    }

	    const sources = Object.keys(this.sourceContents);
	    for (let i = 0, len = sources.length; i < len; i++) {
	      aFn(util.fromSetString(sources[i]), this.sourceContents[sources[i]]);
	    }
	  }

	  /**
	   * Return the string representation of this source node. Walks over the tree
	   * and concatenates all the various snippets together to one string.
	   */
	  toString() {
	    let str = "";
	    this.walk(function (chunk) {
	      str += chunk;
	    });
	    return str;
	  }

	  /**
	   * Returns the string representation of this source node along with a source
	   * map.
	   */
	  toStringWithSourceMap(aArgs) {
	    const generated = {
	      code: "",
	      line: 1,
	      column: 0,
	    };
	    const map = new SourceMapGenerator(aArgs);
	    let sourceMappingActive = false;
	    let lastOriginalSource = null;
	    let lastOriginalLine = null;
	    let lastOriginalColumn = null;
	    let lastOriginalName = null;
	    this.walk(function (chunk, original) {
	      generated.code += chunk;
	      if (
	        original.source !== null &&
	        original.line !== null &&
	        original.column !== null
	      ) {
	        if (
	          lastOriginalSource !== original.source ||
	          lastOriginalLine !== original.line ||
	          lastOriginalColumn !== original.column ||
	          lastOriginalName !== original.name
	        ) {
	          map.addMapping({
	            source: original.source,
	            original: {
	              line: original.line,
	              column: original.column,
	            },
	            generated: {
	              line: generated.line,
	              column: generated.column,
	            },
	            name: original.name,
	          });
	        }
	        lastOriginalSource = original.source;
	        lastOriginalLine = original.line;
	        lastOriginalColumn = original.column;
	        lastOriginalName = original.name;
	        sourceMappingActive = true;
	      } else if (sourceMappingActive) {
	        map.addMapping({
	          generated: {
	            line: generated.line,
	            column: generated.column,
	          },
	        });
	        lastOriginalSource = null;
	        sourceMappingActive = false;
	      }
	      for (let idx = 0, length = chunk.length; idx < length; idx++) {
	        if (chunk.charCodeAt(idx) === NEWLINE_CODE) {
	          generated.line++;
	          generated.column = 0;
	          // Mappings end at eol
	          if (idx + 1 === length) {
	            lastOriginalSource = null;
	            sourceMappingActive = false;
	          } else if (sourceMappingActive) {
	            map.addMapping({
	              source: original.source,
	              original: {
	                line: original.line,
	                column: original.column,
	              },
	              generated: {
	                line: generated.line,
	                column: generated.column,
	              },
	              name: original.name,
	            });
	          }
	        } else {
	          generated.column++;
	        }
	      }
	    });
	    this.walkSourceContents(function (sourceFile, sourceContent) {
	      map.setSourceContent(sourceFile, sourceContent);
	    });

	    return { code: generated.code, map };
	  }
	}

	sourceNode.SourceNode = SourceNode;
	return sourceNode;
}

/*
 * Copyright 2009-2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var hasRequiredSourceMap;

function requireSourceMap () {
	if (hasRequiredSourceMap) return sourceMap$3;
	hasRequiredSourceMap = 1;
	sourceMap$3.SourceMapGenerator =
	  requireSourceMapGenerator().SourceMapGenerator;
	sourceMap$3.SourceMapConsumer =
	  requireSourceMapConsumer().SourceMapConsumer;
	sourceMap$3.SourceNode = requireSourceNode().SourceNode;
	return sourceMap$3;
}

var sourceMapExports = requireSourceMap();
var sourceMap$1 = /*@__PURE__*/getDefaultExportFromCjs(sourceMapExports);

var sourceMap$2 = /*#__PURE__*/_mergeNamespaces({
	__proto__: null,
	default: sourceMap$1
}, [sourceMapExports]);

function e(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=Array(t);r<t;r++)n[r]=e[r];return n}function t(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t,r){return t&&function(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||false,n.configurable=true,"value"in n&&(n.writable=true),Object.defineProperty(e,o(n.key),n);}}(e.prototype,t),Object.defineProperty(e,"prototype",{writable:false}),e}function n(e,t){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=l(e))||t){r&&(e=r);var n=0,i=function(){};return {s:i,n:function(){return n>=e.length?{done:true}:{done:false,value:e[n++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,o=true,s=false;return {s:function(){r=r.call(e);},n:function(){var e=r.next();return o=e.done,e},e:function(e){s=true,a=e;},f:function(){try{o||null==r.return||r.return();}finally{if(s)throw a}}}}function i(e,t,r){return (t=o(t))in e?Object.defineProperty(e,t,{value:r,enumerable:true,configurable:true,writable:true}):e[t]=r,e}function a(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,i,a,o,s=[],l=true,u=false;try{if(a=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;l=!1;}else for(;!(l=(n=a.call(r)).done)&&(s.push(n.value),s.length!==t);l=!0);}catch(e){u=true,i=e;}finally{try{if(!l&&null!=r.return&&(o=r.return(),Object(o)!==o))return}finally{if(u)throw i}}return s}}(e,t)||l(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(e){var t=function(e,t){if("object"!=typeof e||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,t);if("object"!=typeof n)return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e,"string");return "symbol"==typeof t?t:t+""}function s(e){return s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},s(e)}function l(t,r){if(t){if("string"==typeof t)return e(t,r);var n={}.toString.call(t).slice(8,-1);return "Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?e(t,r):void 0}}var u=function e(o){function l(e){for(var t={},r=0,n=Object.entries(e);r<n.length;r++){var i=a(n[r],2),o=i[0],u=i[1];"object"===s(u)&&null!==u?t[o]=l(u):t[o]=u;}return t}var u={AssignmentExpression:"AssignmentExpression",AssignmentPattern:"AssignmentPattern",ArrayExpression:"ArrayExpression",ArrayPattern:"ArrayPattern",ArrowFunctionExpression:"ArrowFunctionExpression",AwaitExpression:"AwaitExpression",BlockStatement:"BlockStatement",BinaryExpression:"BinaryExpression",BreakStatement:"BreakStatement",CallExpression:"CallExpression",CatchClause:"CatchClause",ChainExpression:"ChainExpression",ClassBody:"ClassBody",ClassDeclaration:"ClassDeclaration",ClassExpression:"ClassExpression",ComprehensionBlock:"ComprehensionBlock",ComprehensionExpression:"ComprehensionExpression",ConditionalExpression:"ConditionalExpression",ContinueStatement:"ContinueStatement",DebuggerStatement:"DebuggerStatement",DirectiveStatement:"DirectiveStatement",DoWhileStatement:"DoWhileStatement",EmptyStatement:"EmptyStatement",ExportAllDeclaration:"ExportAllDeclaration",ExportDefaultDeclaration:"ExportDefaultDeclaration",ExportNamedDeclaration:"ExportNamedDeclaration",ExportSpecifier:"ExportSpecifier",ExpressionStatement:"ExpressionStatement",ForStatement:"ForStatement",ForInStatement:"ForInStatement",ForOfStatement:"ForOfStatement",FunctionDeclaration:"FunctionDeclaration",FunctionExpression:"FunctionExpression",GeneratorExpression:"GeneratorExpression",Identifier:"Identifier",IfStatement:"IfStatement",ImportExpression:"ImportExpression",ImportDeclaration:"ImportDeclaration",ImportDefaultSpecifier:"ImportDefaultSpecifier",ImportNamespaceSpecifier:"ImportNamespaceSpecifier",ImportSpecifier:"ImportSpecifier",Literal:"Literal",LabeledStatement:"LabeledStatement",LogicalExpression:"LogicalExpression",MemberExpression:"MemberExpression",MetaProperty:"MetaProperty",MethodDefinition:"MethodDefinition",ModuleSpecifier:"ModuleSpecifier",NewExpression:"NewExpression",ObjectExpression:"ObjectExpression",ObjectPattern:"ObjectPattern",PrivateIdentifier:"PrivateIdentifier",Program:"Program",Property:"Property",PropertyDefinition:"PropertyDefinition",RestElement:"RestElement",ReturnStatement:"ReturnStatement",SequenceExpression:"SequenceExpression",SpreadElement:"SpreadElement",Super:"Super",SwitchStatement:"SwitchStatement",SwitchCase:"SwitchCase",TaggedTemplateExpression:"TaggedTemplateExpression",TemplateElement:"TemplateElement",TemplateLiteral:"TemplateLiteral",ThisExpression:"ThisExpression",ThrowStatement:"ThrowStatement",TryStatement:"TryStatement",UnaryExpression:"UnaryExpression",UpdateExpression:"UpdateExpression",VariableDeclaration:"VariableDeclaration",VariableDeclarator:"VariableDeclarator",WhileStatement:"WhileStatement",WithStatement:"WithStatement",YieldExpression:"YieldExpression"},p={AssignmentExpression:["left","right"],AssignmentPattern:["left","right"],ArrayExpression:["elements"],ArrayPattern:["elements"],ArrowFunctionExpression:["params","body"],AwaitExpression:["argument"],BlockStatement:["body"],BinaryExpression:["left","right"],BreakStatement:["label"],CallExpression:["callee","arguments"],CatchClause:["param","body"],ChainExpression:["expression"],ClassBody:["body"],ClassDeclaration:["id","superClass","body"],ClassExpression:["id","superClass","body"],ComprehensionBlock:["left","right"],ComprehensionExpression:["blocks","filter","body"],ConditionalExpression:["test","consequent","alternate"],ContinueStatement:["label"],DebuggerStatement:[],DirectiveStatement:[],DoWhileStatement:["body","test"],EmptyStatement:[],ExportAllDeclaration:["source"],ExportDefaultDeclaration:["declaration"],ExportNamedDeclaration:["declaration","specifiers","source"],ExportSpecifier:["exported","local"],ExpressionStatement:["expression"],ForStatement:["init","test","update","body"],ForInStatement:["left","right","body"],ForOfStatement:["left","right","body"],FunctionDeclaration:["id","params","body"],FunctionExpression:["id","params","body"],GeneratorExpression:["blocks","filter","body"],Identifier:[],IfStatement:["test","consequent","alternate"],ImportExpression:["source"],ImportDeclaration:["specifiers","source"],ImportDefaultSpecifier:["local"],ImportNamespaceSpecifier:["local"],ImportSpecifier:["imported","local"],Literal:[],LabeledStatement:["label","body"],LogicalExpression:["left","right"],MemberExpression:["object","property"],MetaProperty:["meta","property"],MethodDefinition:["key","value"],ModuleSpecifier:[],NewExpression:["callee","arguments"],ObjectExpression:["properties"],ObjectPattern:["properties"],PrivateIdentifier:[],Program:["body"],Property:["key","value"],PropertyDefinition:["key","value"],RestElement:["argument"],ReturnStatement:["argument"],SequenceExpression:["expressions"],SpreadElement:["argument"],Super:[],SwitchStatement:["discriminant","cases"],SwitchCase:["test","consequent"],TaggedTemplateExpression:["tag","quasi"],TemplateElement:[],TemplateLiteral:["quasis","expressions"],ThisExpression:[],ThrowStatement:["argument"],TryStatement:["block","handler","finalizer"],UnaryExpression:["argument"],UpdateExpression:["argument"],VariableDeclaration:["declarations"],VariableDeclarator:["id","init"],WhileStatement:["test","body"],WithStatement:["object","body"],YieldExpression:["argument"]},c={},f={},h={},m={Break:c,Skip:f,Remove:h},y=function(){return r((function e(r,n){t(this,e),this.parent=r,this.key=n;}),[{key:"replace",value:function(e){this.parent[this.key]=e;}},{key:"remove",value:function(){return Array.isArray(this.parent)?(this.parent.splice(this.key,1),true):(this.replace(null),false)}}])}(),d=r((function e(r,n,a,o){t(this,e),i(this,"node",void 0),i(this,"path",void 0),i(this,"wrap",void 0),i(this,"ref",void 0),this.node=r,this.path=n,this.wrap=a,this.ref=o;}));function v(e){return null!=e&&("object"===s(e)&&"string"==typeof e.type)}function x(e,t){return (e===u.ObjectExpression||e===u.ObjectPattern)&&"properties"===t}function _(e,t){for(var r=e.length-1;r>=0;--r)if(e[r].node===t)return  true;return  false}var g=function(){return r((function e(){t(this,e),i(this,"__current",null),this.__worklist,this.__leavelist,this.__keys;}),[{key:"path",value:function(){function e(e,t){if(Array.isArray(t)){var r,i=n(t);try{for(i.s();!(r=i.n()).done;){var a=r.value;e.push(a);}}catch(e){i.e(e);}finally{i.f();}}else e.push(t);}if(!this.__current.path)return null;for(var t=[],r=2,i=this.__leavelist.length;r<i;++r){e(t,this.__leavelist[r].path);}return e(t,this.__current.path),t}},{key:"type",value:function(){return this.current().type||this.__current.wrap}},{key:"parents",value:function(){for(var e=[],t=1,r=this.__leavelist.length;t<r;++t)e.push(this.__leavelist[t].node);return e}},{key:"current",value:function(){return this.__current.node}},{key:"__execute",value:function(e,t){var r=this.__current;this.__current=t,this.__state=null;var n=void 0;return e&&(n=e.call(this,t.node,this.__leavelist[this.__leavelist.length-1].node)),this.__current=r,n}},{key:"notify",value:function(e){this.__state=e;}},{key:"skip",value:function(){this.notify(f);}},{key:"break",value:function(){this.notify(c);}},{key:"remove",value:function(){this.notify(h);}},{key:"__initialize",value:function(e,t){this.visitor=t,this.root=e,this.__worklist=[],this.__leavelist=[],this.__current=null,this.__state=null,this.__fallback=null,"iteration"===t.fallback?this.__fallback=Object.keys:"function"==typeof t.fallback&&(this.__fallback=t.fallback),this.__keys=p,t.keys&&(this.__keys=Object.assign(Object.create(this.__keys),t.keys));}},{key:"traverse",value:function(e,t){this.__initialize(e,t);var r={},n=this.__worklist,i=this.__leavelist;for(n.push(new d(e,null,null,null)),i.push(new d(null,null,null,null));n.length;){var a=n.pop(),o=void 0;if(a!==r){if("node"in a&&a.node){if(o=this.__execute(t.enter,a),this.__state===c||o===c)return;if(n.push(r),i.push(a),this.__state===f||o===f)continue;var s=a.node,l=s.type||a.wrap,u=this.__keys[l];if(!u){if(!this.__fallback)throw new Error(`Unknown node type ${l}.`);u=this.__fallback(s);}for(var p=u.length;(p-=1)>=0;){var h=u[p],m=s[h];if(m)if(Array.isArray(m)){for(var y=m.length;(y-=1)>=0;)if(m[y]&&!_(i,m[y])){if(x(l,u[p]))a=new d(m[y],[h,y],"Property",null);else {if(!v(m[y]))continue;a=new d(m[y],[h,y],null,null);}n.push(a);}}else if(v(m)){if(_(i,m))continue;n.push(new d(m,h,null,null));}}}}else if(a=i.pop(),o=this.__execute(t.leave,a),this.__state===c||o===c)return}}},{key:"replace",value:function(e,t){function r(e){if(e.ref.remove())for(var t=e.ref,r=t.key,n=t.parent,a=i.length;a--;){var o=i[a];if("ref"in o&&o.ref&&o.ref.parent===n){if(o.ref.key<r)break;--o.ref.key;}}}this.__initialize(e,t);var n={},i=this.__worklist,a=this.__leavelist,o={root:e},s=new d(e,null,null,new y(o,"root"));for(i.push(s),a.push(s);i.length;)if((s=i.pop())!==n){var l=this.__execute(t.enter,s);if(void 0!==l&&l!==c&&l!==f&&l!==h&&(s.ref.replace(l),s.node=l),this.__state!==h&&l!==h||(r(s),s.node=null),this.__state===c||l===c)return o.root;var u=s.node;if(u&&(i.push(n),a.push(s),this.__state!==f&&l!==f)){var p=u.type||s.wrap,m=this.__keys[p];if(!m){if(!this.__fallback)throw new Error(`Unknown node type ${p}.`);m=this.__fallback(u);}for(var _=m.length;(_-=1)>=0;){var g=m[_],S=u[g];if(S)if(Array.isArray(S)){for(var b=S.length;(b-=1)>=0;)if(S[b]){if(x(p,m[_]))s=new d(S[b],[g,b],"Property",new y(S,b));else {if(!v(S[b]))continue;s=new d(S[b],[g,b],null,new y(S,b));}i.push(s);}}else v(S)&&i.push(new d(S,g,null,new y(u,g)));}}}else {s=a.pop();var E=this.__execute(t.leave,s);if(void 0!==E&&E!==c&&E!==f&&E!==h&&s.ref.replace(E),this.__state!==h&&E!==h||r(s),this.__state===c||E===c)return o.root}return o.root}}])}();function S(e,t){return (new g).traverse(e,t)}function b(e,t){var r;if(r=function(e,t){for(var r=e.length,n=0;r;){var i=r>>>1,a=n+i;t(e[a])?r=i:(n=a+1,r-=i+1);}return n}(t,(function(t){return t.range[0]>e.range[0]})),e.extendedRange=[e.range[0],e.range[1]],r!==t.length){var n=a(t[r].range,1);e.extendedRange[1]=n[0];}if((r-=1)>=0){var i=a(t[r].range,2);e.extendedRange[0]=i[1];}return e}return o.Syntax=u,o.traverse=S,o.replace=function(e,t){return (new g).replace(e,t)},o.attachComments=function(e,t,r){var i,a=[];if(!e.range)throw new Error("attachComments needs range information");if(!r.length){if(t.length){var o,s=n(t);try{for(s.s();!(o=s.n()).done;){(i=l(o.value)).extendedRange=[0,e.range[0]],a.push(i);}}catch(e){s.e(e);}finally{s.f();}e.leadingComments=a;}return e}var u,p=n(t);try{for(p.s();!(u=p.n()).done;){var c=u.value;a.push(b(l(c),r));}}catch(e){p.e(e);}finally{p.f();}var f=0;return S(e,{enter(e){for(var t;f<a.length&&!((t=a[f]).extendedRange[1]>e.range[0]);)t.extendedRange[1]===e.range[0]?(e.leadingComments||(e.leadingComments=[]),e.leadingComments.push(t),a.splice(f,1)):f+=1;return f===a.length?m.Break:a[f].extendedRange[0]>e.range[1]?m.Skip:void 0}}),f=0,S(e,{leave(e){for(var t;f<a.length&&(t=a[f],!(e.range[1]<t.extendedRange[0]));)e.range[1]===t.extendedRange[0]?(e.trailingComments||(e.trailingComments=[]),e.trailingComments.push(t),a.splice(f,1)):f+=1;return f===a.length?m.Break:a[f].extendedRange[0]>e.range[1]?m.Skip:void 0}}),e},o.VisitorKeys=p,o.VisitorOption=m,o.Controller=g,o.cloneEnvironment=function(){return e({})},o}({}),p=u.Syntax,c=u.traverse,f=u.replace,h=u.attachComments,m=u.VisitorKeys,y=u.VisitorOption,d=u.Controller,v=u.cloneEnvironment;

var estraverse = /*#__PURE__*/Object.freeze({
	__proto__: null,
	Controller: d,
	Syntax: p,
	VisitorKeys: m,
	VisitorOption: y,
	attachComments: h,
	cloneEnvironment: v,
	replace: f,
	traverse: c
});

var utils = {};

var ast = {exports: {}};

/*
  Copyright (C) 2013 Yusuke Suzuki <utatane.tea@gmail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS 'AS IS'
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

var hasRequiredAst;

function requireAst () {
	if (hasRequiredAst) return ast.exports;
	hasRequiredAst = 1;
	(function () {

	    function isExpression(node) {
	        if (node == null) { return false; }
	        switch (node.type) {
	            case 'ArrayExpression':
	            case 'AssignmentExpression':
	            case 'BinaryExpression':
	            case 'CallExpression':
	            case 'ConditionalExpression':
	            case 'FunctionExpression':
	            case 'Identifier':
	            case 'Literal':
	            case 'LogicalExpression':
	            case 'MemberExpression':
	            case 'NewExpression':
	            case 'ObjectExpression':
	            case 'SequenceExpression':
	            case 'ThisExpression':
	            case 'UnaryExpression':
	            case 'UpdateExpression':
	                return true;
	        }
	        return false;
	    }

	    function isIterationStatement(node) {
	        if (node == null) { return false; }
	        switch (node.type) {
	            case 'DoWhileStatement':
	            case 'ForInStatement':
	            case 'ForStatement':
	            case 'WhileStatement':
	                return true;
	        }
	        return false;
	    }

	    function isStatement(node) {
	        if (node == null) { return false; }
	        switch (node.type) {
	            case 'BlockStatement':
	            case 'BreakStatement':
	            case 'ContinueStatement':
	            case 'DebuggerStatement':
	            case 'DoWhileStatement':
	            case 'EmptyStatement':
	            case 'ExpressionStatement':
	            case 'ForInStatement':
	            case 'ForStatement':
	            case 'IfStatement':
	            case 'LabeledStatement':
	            case 'ReturnStatement':
	            case 'SwitchStatement':
	            case 'ThrowStatement':
	            case 'TryStatement':
	            case 'VariableDeclaration':
	            case 'WhileStatement':
	            case 'WithStatement':
	                return true;
	        }
	        return false;
	    }

	    function isSourceElement(node) {
	      return isStatement(node) || node != null && node.type === 'FunctionDeclaration';
	    }

	    function trailingStatement(node) {
	        switch (node.type) {
	        case 'IfStatement':
	            if (node.alternate != null) {
	                return node.alternate;
	            }
	            return node.consequent;

	        case 'LabeledStatement':
	        case 'ForStatement':
	        case 'ForInStatement':
	        case 'WhileStatement':
	        case 'WithStatement':
	            return node.body;
	        }
	        return null;
	    }

	    function isProblematicIfStatement(node) {
	        var current;

	        if (node.type !== 'IfStatement') {
	            return false;
	        }
	        if (node.alternate == null) {
	            return false;
	        }
	        current = node.consequent;
	        do {
	            if (current.type === 'IfStatement') {
	                if (current.alternate == null)  {
	                    return true;
	                }
	            }
	            current = trailingStatement(current);
	        } while (current);

	        return false;
	    }

	    ast.exports = {
	        isExpression: isExpression,
	        isStatement: isStatement,
	        isIterationStatement: isIterationStatement,
	        isSourceElement: isSourceElement,
	        isProblematicIfStatement: isProblematicIfStatement,

	        trailingStatement: trailingStatement
	    };
	}());
	/* vim: set sw=4 ts=4 et tw=80 : */
	return ast.exports;
}

var code = {exports: {}};

/*
  Copyright (C) 2013-2014 Yusuke Suzuki <utatane.tea@gmail.com>
  Copyright (C) 2014 Ivan Nikulin <ifaaan@gmail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

var hasRequiredCode;

function requireCode () {
	if (hasRequiredCode) return code.exports;
	hasRequiredCode = 1;
	(function () {

	    var ES6Regex, ES5Regex, NON_ASCII_WHITESPACES, IDENTIFIER_START, IDENTIFIER_PART, ch;

	    // See `tools/generate-identifier-regex.js`.
	    ES5Regex = {
	        // ECMAScript 5.1/Unicode v9.0.0 NonAsciiIdentifierStart:
	        NonAsciiIdentifierStart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/,
	        // ECMAScript 5.1/Unicode v9.0.0 NonAsciiIdentifierPart:
	        NonAsciiIdentifierPart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/
	    };

	    ES6Regex = {
	        // ECMAScript 6/Unicode v9.0.0 NonAsciiIdentifierStart:
	        NonAsciiIdentifierStart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]/,
	        // ECMAScript 6/Unicode v9.0.0 NonAsciiIdentifierPart:
	        NonAsciiIdentifierPart: /[\xAA\xB5\xB7\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u1371\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F\uDFE0]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4A\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/
	    };

	    function isDecimalDigit(ch) {
	        return 0x30 <= ch && ch <= 0x39;  // 0..9
	    }

	    function isHexDigit(ch) {
	        return 0x30 <= ch && ch <= 0x39 ||  // 0..9
	            0x61 <= ch && ch <= 0x66 ||     // a..f
	            0x41 <= ch && ch <= 0x46;       // A..F
	    }

	    function isOctalDigit(ch) {
	        return ch >= 0x30 && ch <= 0x37;  // 0..7
	    }

	    // 7.2 White Space

	    NON_ASCII_WHITESPACES = [
	        0x1680,
	        0x2000, 0x2001, 0x2002, 0x2003, 0x2004, 0x2005, 0x2006, 0x2007, 0x2008, 0x2009, 0x200A,
	        0x202F, 0x205F,
	        0x3000,
	        0xFEFF
	    ];

	    function isWhiteSpace(ch) {
	        return ch === 0x20 || ch === 0x09 || ch === 0x0B || ch === 0x0C || ch === 0xA0 ||
	            ch >= 0x1680 && NON_ASCII_WHITESPACES.indexOf(ch) >= 0;
	    }

	    // 7.3 Line Terminators

	    function isLineTerminator(ch) {
	        return ch === 0x0A || ch === 0x0D || ch === 0x2028 || ch === 0x2029;
	    }

	    // 7.6 Identifier Names and Identifiers

	    function fromCodePoint(cp) {
	        if (cp <= 0xFFFF) { return String.fromCharCode(cp); }
	        var cu1 = String.fromCharCode(Math.floor((cp - 0x10000) / 0x400) + 0xD800);
	        var cu2 = String.fromCharCode(((cp - 0x10000) % 0x400) + 0xDC00);
	        return cu1 + cu2;
	    }

	    IDENTIFIER_START = new Array(0x80);
	    for(ch = 0; ch < 0x80; ++ch) {
	        IDENTIFIER_START[ch] =
	            ch >= 0x61 && ch <= 0x7A ||  // a..z
	            ch >= 0x41 && ch <= 0x5A ||  // A..Z
	            ch === 0x24 || ch === 0x5F;  // $ (dollar) and _ (underscore)
	    }

	    IDENTIFIER_PART = new Array(0x80);
	    for(ch = 0; ch < 0x80; ++ch) {
	        IDENTIFIER_PART[ch] =
	            ch >= 0x61 && ch <= 0x7A ||  // a..z
	            ch >= 0x41 && ch <= 0x5A ||  // A..Z
	            ch >= 0x30 && ch <= 0x39 ||  // 0..9
	            ch === 0x24 || ch === 0x5F;  // $ (dollar) and _ (underscore)
	    }

	    function isIdentifierStartES5(ch) {
	        return ch < 0x80 ? IDENTIFIER_START[ch] : ES5Regex.NonAsciiIdentifierStart.test(fromCodePoint(ch));
	    }

	    function isIdentifierPartES5(ch) {
	        return ch < 0x80 ? IDENTIFIER_PART[ch] : ES5Regex.NonAsciiIdentifierPart.test(fromCodePoint(ch));
	    }

	    function isIdentifierStartES6(ch) {
	        return ch < 0x80 ? IDENTIFIER_START[ch] : ES6Regex.NonAsciiIdentifierStart.test(fromCodePoint(ch));
	    }

	    function isIdentifierPartES6(ch) {
	        return ch < 0x80 ? IDENTIFIER_PART[ch] : ES6Regex.NonAsciiIdentifierPart.test(fromCodePoint(ch));
	    }

	    code.exports = {
	        isDecimalDigit: isDecimalDigit,
	        isHexDigit: isHexDigit,
	        isOctalDigit: isOctalDigit,
	        isWhiteSpace: isWhiteSpace,
	        isLineTerminator: isLineTerminator,
	        isIdentifierStartES5: isIdentifierStartES5,
	        isIdentifierPartES5: isIdentifierPartES5,
	        isIdentifierStartES6: isIdentifierStartES6,
	        isIdentifierPartES6: isIdentifierPartES6
	    };
	}());
	/* vim: set sw=4 ts=4 et tw=80 : */
	return code.exports;
}

var keyword = {exports: {}};

/*
  Copyright (C) 2013 Yusuke Suzuki <utatane.tea@gmail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

var hasRequiredKeyword;

function requireKeyword () {
	if (hasRequiredKeyword) return keyword.exports;
	hasRequiredKeyword = 1;
	(function () {

	    var code = requireCode();

	    function isStrictModeReservedWordES6(id) {
	        switch (id) {
	        case 'implements':
	        case 'interface':
	        case 'package':
	        case 'private':
	        case 'protected':
	        case 'public':
	        case 'static':
	        case 'let':
	            return true;
	        default:
	            return false;
	        }
	    }

	    function isKeywordES5(id, strict) {
	        // yield should not be treated as keyword under non-strict mode.
	        if (!strict && id === 'yield') {
	            return false;
	        }
	        return isKeywordES6(id, strict);
	    }

	    function isKeywordES6(id, strict) {
	        if (strict && isStrictModeReservedWordES6(id)) {
	            return true;
	        }

	        switch (id.length) {
	        case 2:
	            return (id === 'if') || (id === 'in') || (id === 'do');
	        case 3:
	            return (id === 'var') || (id === 'for') || (id === 'new') || (id === 'try');
	        case 4:
	            return (id === 'this') || (id === 'else') || (id === 'case') ||
	                (id === 'void') || (id === 'with') || (id === 'enum');
	        case 5:
	            return (id === 'while') || (id === 'break') || (id === 'catch') ||
	                (id === 'throw') || (id === 'const') || (id === 'yield') ||
	                (id === 'class') || (id === 'super');
	        case 6:
	            return (id === 'return') || (id === 'typeof') || (id === 'delete') ||
	                (id === 'switch') || (id === 'export') || (id === 'import');
	        case 7:
	            return (id === 'default') || (id === 'finally') || (id === 'extends');
	        case 8:
	            return (id === 'function') || (id === 'continue') || (id === 'debugger');
	        case 10:
	            return (id === 'instanceof');
	        default:
	            return false;
	        }
	    }

	    function isReservedWordES5(id, strict) {
	        return id === 'null' || id === 'true' || id === 'false' || isKeywordES5(id, strict);
	    }

	    function isReservedWordES6(id, strict) {
	        return id === 'null' || id === 'true' || id === 'false' || isKeywordES6(id, strict);
	    }

	    function isRestrictedWord(id) {
	        return id === 'eval' || id === 'arguments';
	    }

	    function isIdentifierNameES5(id) {
	        var i, iz, ch;

	        if (id.length === 0) { return false; }

	        ch = id.charCodeAt(0);
	        if (!code.isIdentifierStartES5(ch)) {
	            return false;
	        }

	        for (i = 1, iz = id.length; i < iz; ++i) {
	            ch = id.charCodeAt(i);
	            if (!code.isIdentifierPartES5(ch)) {
	                return false;
	            }
	        }
	        return true;
	    }

	    function decodeUtf16(lead, trail) {
	        return (lead - 0xD800) * 0x400 + (trail - 0xDC00) + 0x10000;
	    }

	    function isIdentifierNameES6(id) {
	        var i, iz, ch, lowCh, check;

	        if (id.length === 0) { return false; }

	        check = code.isIdentifierStartES6;
	        for (i = 0, iz = id.length; i < iz; ++i) {
	            ch = id.charCodeAt(i);
	            if (0xD800 <= ch && ch <= 0xDBFF) {
	                ++i;
	                if (i >= iz) { return false; }
	                lowCh = id.charCodeAt(i);
	                if (!(0xDC00 <= lowCh && lowCh <= 0xDFFF)) {
	                    return false;
	                }
	                ch = decodeUtf16(ch, lowCh);
	            }
	            if (!check(ch)) {
	                return false;
	            }
	            check = code.isIdentifierPartES6;
	        }
	        return true;
	    }

	    function isIdentifierES5(id, strict) {
	        return isIdentifierNameES5(id) && !isReservedWordES5(id, strict);
	    }

	    function isIdentifierES6(id, strict) {
	        return isIdentifierNameES6(id) && !isReservedWordES6(id, strict);
	    }

	    keyword.exports = {
	        isKeywordES5: isKeywordES5,
	        isKeywordES6: isKeywordES6,
	        isReservedWordES5: isReservedWordES5,
	        isReservedWordES6: isReservedWordES6,
	        isRestrictedWord: isRestrictedWord,
	        isIdentifierNameES5: isIdentifierNameES5,
	        isIdentifierNameES6: isIdentifierNameES6,
	        isIdentifierES5: isIdentifierES5,
	        isIdentifierES6: isIdentifierES6
	    };
	}());
	/* vim: set sw=4 ts=4 et tw=80 : */
	return keyword.exports;
}

/*
  Copyright (C) 2013 Yusuke Suzuki <utatane.tea@gmail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

var hasRequiredUtils;

function requireUtils () {
	if (hasRequiredUtils) return utils;
	hasRequiredUtils = 1;
	(function () {

	    utils.ast = requireAst();
	    utils.code = requireCode();
	    utils.keyword = requireKeyword();
	}());
	/* vim: set sw=4 ts=4 et tw=80 : */
	return utils;
}

var utilsExports = requireUtils();

/*
  Copyright (C) 2012-2014 Yusuke Suzuki <utatane.tea@gmail.com>
  Copyright (C) 2015 Ingvar Stepanyan <me@rreverser.com>
  Copyright (C) 2014 Ivan Nikulin <ifaaan@gmail.com>
  Copyright (C) 2012-2013 Michael Ficarra <escodegen.copyright@michael.ficarra.me>
  Copyright (C) 2012-2013 Mathias Bynens <mathias@qiwi.be>
  Copyright (C) 2013 Irakli Gozalishvili <rfobic@gmail.com>
  Copyright (C) 2012 Robert Gust-Bardon <donate@robert.gust-bardon.org>
  Copyright (C) 2012 John Freeman <jfreeman08@gmail.com>
  Copyright (C) 2011-2012 Ariya Hidayat <ariya.hidayat@gmail.com>
  Copyright (C) 2012 Joost-Wim Boekesteijn <joost-wim@boekesteijn.nl>
  Copyright (C) 2012 Kris Kowal <kris.kowal@cixar.com>
  Copyright (C) 2012 Arpad Borsos <arpad.borsos@googlemail.com>
  Copyright (C) 2020 Apple Inc. All rights reserved.

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/


/** @type {typeof import('source-map').SourceNode} */
let SourceNode;

/** @type {string} */
let base;

/** @type {string} */
let indent;

/** @type {boolean} */
let json;

/** @type {boolean} */
let renumber;

/** @type {boolean} */
let hexadecimal;

/** @type {"double"|"single"|"auto"} */
let quotes;

/** @type {boolean} */
let escapeless;

// "\n"|""
/** @type {string} */
let newline;

// " "|""
/** @type {string} */
let space;

/** @type {boolean} */
let parentheses;

/** @type {boolean} */
let semicolons;

/** @type {boolean} */
let safeConcatenation;

/** @type {boolean} */
let directive;

/** @type {boolean} */
let preserveBlankLines;

/**
 * @type {{
 *   comment: boolean,
 *   raw: boolean,
 *   verbatim: null|string
 *   moz: {
 *     starlessGenerator: boolean,
 *     comprehensionExpressionStartsWithAssignment: boolean
 *   },
 *   format: {
 *     indent: {
 *       adjustMultilineComment: boolean
 *     }
 *   }
 * }}
 */
let extra;

/** @type {null|((s: string) => import('estree').Program)} */
let parse;

/** @type {null|boolean|string} */
let sourceMap;

/** @type {string|null} */
let sourceCode;

let codegenFactory;

const { Syntax } = estraverse;

/**
 * Generation is done by generateExpression.
 * @param {import('estree').Node} node
 */
function isExpression(node) {
    return Object.hasOwn(CodeGenerator.Expression, node.type);
}

/**
 * Generation is done by generateStatement.
 * @param {import('estree').Node|import('estree').MaybeNamedClassDeclaration|import('estree').MaybeNamedFunctionDeclaration} node
 */
function isStatement(node) {
    return Object.hasOwn(CodeGenerator.Statement, node.type);
}

const Precedence = {
    Sequence: 0,
    Yield: 1,
    Assignment: 1,
    Conditional: 2,
    ArrowFunction: 2,
    Coalesce: 3,
    LogicalOR: 4,
    LogicalAND: 5,
    BitwiseOR: 6,
    BitwiseXOR: 7,
    BitwiseAND: 8,
    Equality: 9,
    Relational: 10,
    BitwiseSHIFT: 11,
    Additive: 12,
    Multiplicative: 13,
    Exponentiation: 14,
    Await: 15,
    Unary: 15,
    Postfix: 16,
    OptionalChaining: 17,
    Call: 18,
    New: 19,
    TaggedTemplate: 20,
    Member: 21,
    Primary: 22
};

const BinaryPrecedence = {
    '??': Precedence.Coalesce,
    '||': Precedence.LogicalOR,
    '&&': Precedence.LogicalAND,
    '|': Precedence.BitwiseOR,
    '^': Precedence.BitwiseXOR,
    '&': Precedence.BitwiseAND,
    '==': Precedence.Equality,
    '!=': Precedence.Equality,
    '===': Precedence.Equality,
    '!==': Precedence.Equality,
    is: Precedence.Equality,
    isnt: Precedence.Equality,
    '<': Precedence.Relational,
    '>': Precedence.Relational,
    '<=': Precedence.Relational,
    '>=': Precedence.Relational,
    in: Precedence.Relational,
    instanceof: Precedence.Relational,
    '<<': Precedence.BitwiseSHIFT,
    '>>': Precedence.BitwiseSHIFT,
    '>>>': Precedence.BitwiseSHIFT,
    '+': Precedence.Additive,
    '-': Precedence.Additive,
    '*': Precedence.Multiplicative,
    '%': Precedence.Multiplicative,
    '/': Precedence.Multiplicative,
    '**': Precedence.Exponentiation
};

//Flags
const F_ALLOW_IN = 1,
    F_ALLOW_CALL = 1 << 1,
    F_ALLOW_UNPARATH_NEW = 1 << 2,
    F_FUNC_BODY = 1 << 3,
    F_DIRECTIVE_CTX = 1 << 4,
    F_SEMICOLON_OPT = 1 << 5,
    F_FOUND_COALESCE = 1 << 6;

//Expression flag sets
//NOTE: Flag order:
// F_ALLOW_IN
// F_ALLOW_CALL
// F_ALLOW_UNPARATH_NEW
const E_FTT = F_ALLOW_CALL | F_ALLOW_UNPARATH_NEW,
    E_TTF = F_ALLOW_IN | F_ALLOW_CALL,
    E_TTT = F_ALLOW_IN | F_ALLOW_CALL | F_ALLOW_UNPARATH_NEW,
    E_TFF = F_ALLOW_IN,
    E_FFT = F_ALLOW_UNPARATH_NEW,
    E_TFT = F_ALLOW_IN | F_ALLOW_UNPARATH_NEW;

//Statement flag sets
//NOTE: Flag order:
// F_ALLOW_IN
// F_FUNC_BODY
// F_DIRECTIVE_CTX
// F_SEMICOLON_OPT
const S_TFFF = F_ALLOW_IN,
    S_TFFT = F_ALLOW_IN | F_SEMICOLON_OPT,
    S_FFFF = 0x00,
    S_TFTF = F_ALLOW_IN | F_DIRECTIVE_CTX,
    S_TTFF = F_ALLOW_IN | F_FUNC_BODY;

function getDefaultOptions() {
    // default options
    return {
        file: undefined,
        sourceContent: undefined,
        indent: null,
        base: null,
        parse: null,
        comment: false,
        codegenFactory: () => new CodeGenerator(),
        format: {
            indent: {
                style: '    ',
                base: 0,
                adjustMultilineComment: false
            },
            newline: '\n',
            space: ' ',
            json: false,
            renumber: false,
            hexadecimal: false,
            quotes: /** @type {"single"|"double"|"auto"} */ ('single'),
            escapeless: false,
            compact: false,
            parentheses: true,
            semicolons: true,
            safeConcatenation: false,
            preserveBlankLines: false
        },
        moz: {
            comprehensionExpressionStartsWithAssignment: false,
            starlessGenerator: false
        },
        sourceMap: null,
        sourceMapRoot: null,
        sourceMapWithCode: false,
        directive: false,
        raw: true,
        verbatim: null,
        sourceCode: null
    };
}

/**
 * @param {string} str
 * @param {number} num
 */
function stringRepeat(str, num) {
    let result = '';

    for (num |= 0; num > 0; num >>>= 1, str += str) {
        if (num & 1) {
            result += str;
        }
    }

    return result;
}

/**
 * @param {string} str
 */
function hasLineTerminator(str) {
    return (/[\r\n]/g).test(str);
}

/**
 * @param {string} str
 */
function endsWithLineTerminator(str) {
    const len = str.length;
    return len && utilsExports.code.isLineTerminator(str.charCodeAt(len - 1));
}

/**
 * @param {any} target
 * @param {any} override
 */
function updateDeeply(target, override) {
    /**
     * @param {any} target
     */
    function isHashObject(target) {
        return typeof target === 'object' && target instanceof Object && !(target instanceof RegExp);
    }

    for (const [key, val] of Object.entries(override)) {
        if (isHashObject(val)) {
            if (isHashObject(target[key])) {
                updateDeeply(target[key], val);
            } else {
                target[key] = updateDeeply({}, val);
            }
        } else {
            target[key] = val;
        }
    }
    return target;
}

/**
 * @param {number} value
 */
function generateNumber(value) {
    if (value !== value) {
        throw new Error('Numeric literal whose value is NaN');
    }
    if (value < 0 || (value === 0 && 1 / value < 0)) {
        throw new Error('Numeric literal whose value is negative');
    }

    if (value === 1 / 0) {
        return json ? 'null' : renumber ? '1e400' : '1e+400';
    }

    let result = `${value}`;
    if (!renumber || result.length < 3) {
        return result;
    }

    let point = result.indexOf('.');
    if (!json && result.charCodeAt(0) === 0x30  /* 0 */ && point === 1) {
        point = 0;
        result = result.slice(1);
    }
    let temp = result;
    result = result.replace('e+', 'e');
    let exponent = 0;
    let pos;
    if ((pos = temp.indexOf('e')) > 0) {
        exponent = +temp.slice(pos + 1);
        temp = temp.slice(0, pos);
    }
    if (point >= 0) {
        exponent -= temp.length - point - 1;
        temp = `${+(temp.slice(0, point) + temp.slice(point + 1))}`;
    }
    pos = 0;
    while (temp.charCodeAt(temp.length + pos - 1) === 0x30  /* 0 */) {
        --pos;
    }
    if (pos !== 0) {
        exponent -= pos;
        temp = temp.slice(0, pos);
    }
    if (exponent !== 0) {
        temp += `e${exponent}`;
    }
    if ((temp.length < result.length ||
                    (hexadecimal && value > 1e12 && Math.floor(value) === value && (temp = `0x${value.toString(16)}`).length < result.length)) &&
                +temp === value) {
        result = temp;
    }

    return result;
}

/**
 * Generate valid RegExp expression.
 * This function is based on https://github.com/Constellation/iv Engine
 * @param {number} ch
 * @param {boolean} previousIsBackslash
 */
function escapeRegExpCharacter(ch, previousIsBackslash) {
    // not handling '\' and handling \u2028 or \u2029 to unicode escape sequence
    if ((ch & -2) === 0x2028) {
        return (previousIsBackslash ? 'u' : '\\u') + ((ch === 0x2028) ? '2028' : '2029');
    }
    if (ch === 10 || ch === 13) {  // \n, \r
        return (previousIsBackslash ? '' : '\\') + ((ch === 10) ? 'n' : 'r');
    }
    return String.fromCharCode(ch);
}

/**
 * @param {RegExp} reg
 */
function generateRegExp(reg) {
    let result = reg.toString();

    if (reg.source) {
        // extract flag from toString result
        const match = result.match(/\/([^/]*)$/);
        if (!match) {
            return result;
        }

        const [, flags] = match;
        result = '';

        let characterInBrack = false;
        let previousIsBackslash = false;
        for (let i = 0, iz = reg.source.length; i < iz; ++i) {
            const ch = reg.source.charCodeAt(i);

            if (!previousIsBackslash) {
                if (characterInBrack) {
                    if (ch === 93) {  // ]
                        characterInBrack = false;
                    }
                } else {
                    if (ch === 47) {  // /
                        result += '\\';
                    } else if (ch === 91) {  // [
                        characterInBrack = true;
                    }
                }
                result += escapeRegExpCharacter(ch, previousIsBackslash);
                previousIsBackslash = ch === 92;  // \
            } else {
                // if new RegExp("\\\n') is provided, create /\n/
                result += escapeRegExpCharacter(ch, previousIsBackslash);
                // prevent like /\\[/]/
                previousIsBackslash = false;
            }
        }

        return `/${result}/${flags}`;
    }

    return result;
}

/**
 * @param {number} code
 * @param {number} next
 */
function escapeAllowedCharacter(code, next) {
    if (code === 0x08  /* \b */) {
        return '\\b';
    }

    if (code === 0x0C  /* \f */) {
        return '\\f';
    }

    if (code === 0x09  /* \t */) {
        return '\\t';
    }

    const hex = code.toString(16).toUpperCase();
    if (json || code > 0xFF) {
        return `\\u${'0000'.slice(hex.length)}${hex}`;
    } else if (code === 0x0000 && !utilsExports.code.isDecimalDigit(next)) {
        return '\\0';
    } else if (code === 0x000B  /* \v */) { // '\v'
        return '\\x0B';
    } else {
        return `\\x${'00'.slice(hex.length)}${hex}`;
    }
}

/**
 * @param {number} code
 */
function escapeDisallowedCharacter(code) {
    if (code === 0x5C  /* \ */) {
        return '\\\\';
    }

    if (code === 0x0A  /* \n */) {
        return '\\n';
    }

    if (code === 0x0D  /* \r */) {
        return '\\r';
    }

    if (code === 0x2028) {
        return '\\u2028';
    }

    if (code === 0x2029) {
        return '\\u2029';
    }
    /* c8 ignore next */
    throw new Error('Incorrectly classified character');
}

/**
 * @param {string} str
 */
function escapeDirective(str) {
    let quote = quotes === 'double' ? '"' : '\'';
    for (let i = 0, iz = str.length; i < iz; ++i) {
        const code = str.charCodeAt(i);
        if (code === 0x27  /* ' */) {
            quote = '"';
            break;
        } else if (code === 0x22  /* " */) {
            quote = '\'';
            break;
        } else if (code === 0x5C  /* \ */) {
            ++i;
        }
    }

    return quote + str + quote;
}

/**
 * @param {string} str
 */
function escapeString(str) {
    let result = '', singleQuotes = 0, doubleQuotes = 0;

    for (let i = 0, len = str.length; i < len; ++i) {
        const code = str.charCodeAt(i);
        if (code === 0x27  /* ' */) {
            ++singleQuotes;
        } else if (code === 0x22  /* " */) {
            ++doubleQuotes;
        } else if (code === 0x2F  /* / */ && json) {
            result += '\\';
        } else if (utilsExports.code.isLineTerminator(code) || code === 0x5C  /* \ */) {
            result += escapeDisallowedCharacter(code);
            continue;
        } else if (!utilsExports.code.isIdentifierPartES5(code) && (json && code < 0x20  /* SP */ || !json && !escapeless && (code < 0x20  /* SP */ || code > 0x7E  /* ~ */))) {
            result += escapeAllowedCharacter(code, str.charCodeAt(i + 1));
            continue;
        }
        result += String.fromCharCode(code);
    }

    const single = !(quotes === 'double' || (quotes === 'auto' && doubleQuotes < singleQuotes));
    const quote = single ? '\'' : '"';

    if (!(single ? singleQuotes : doubleQuotes)) {
        return quote + result + quote;
    }

    str = result;
    result = quote;

    for (let i = 0, len = str.length; i < len; ++i) {
        const code = str.charCodeAt(i);
        if ((code === 0x27  /* ' */ && single) || (code === 0x22  /* " */ && !single)) {
            result += '\\';
        }
        result += String.fromCharCode(code);
    }

    return result + quote;
}

/**
 * flatten an array to a string, where the array can contain
 * either strings or nested arrays
 * @param {any[]} arr
 */
function flattenToString(arr) {
    let result = '';
    for (const elem of arr) {
        result += Array.isArray(elem) ? flattenToString(elem) : elem;
    }
    return result;
}

/**
 * convert generated to a SourceNode when source maps are enabled.
 * @param {(
 *   string | import('source-map').SourceNode | NestedStringArray
 * )[] | import('source-map').SourceNode | string} generated
 * @param {import('estree').Node|import('estree').MaybeNamedClassDeclaration|import('estree').MaybeNamedFunctionDeclaration|null|undefined} [node]
 */
function toSourceNodeWhenNeeded(generated, node) {
    if (!sourceMap) {
        // with no source maps, generated is either an
        // array or a string.  if an array, flatten it.
        // if a string, just return it
        if (Array.isArray(generated)) {
            return flattenToString(generated);
        }
        return generated;
    }

    /** @type {import('estree').Node|import('estree').MaybeNamedClassDeclaration|import('estree').MaybeNamedFunctionDeclaration|{loc?: null, name?: null}|null|undefined} */
    let checkNode = node;
    if (checkNode == null) {
        if (generated instanceof SourceNode) {
            return generated;
        }
        checkNode = {};
    }
    if (checkNode.loc == null) {
        return new SourceNode(
            null,
            null,
            /** @type {string} */ (sourceMap),
            /** @type {string | import('source-map').SourceNode | (string|import('source-map').SourceNode)[]} */
            (generated),
            /* c8 ignore next -- Guard */
            ('name' in checkNode && checkNode.name) || undefined
        );
    }
    return new SourceNode(
        checkNode.loc.start.line,
        checkNode.loc.start.column,
        (sourceMap === true ? checkNode.loc.source || null : sourceMap),
        /** @type {string | import('source-map').SourceNode | (string|import('source-map').SourceNode)[]} */
        (generated),
        ('name' in checkNode && checkNode.name) || undefined
    );
}

function noEmptySpace() {
    return space || ' ';
}

/**
 * @typedef {StringOrSourceNodeOrArray[]} StringOrSourceNodeOrArrayArray
 */
/**
 * @typedef {string|import('source-map').SourceNode|(string|import('source-map').SourceNode|StringOrSourceNodeOrArrayArray)[]} StringOrSourceNodeOrArray
 */

/**
 * @param {StringOrSourceNodeOrArray} left
 * @param {StringOrSourceNodeOrArray} right
 */
function join(left, right) {
    const leftSource = toSourceNodeWhenNeeded(left).toString();
    if (leftSource.length === 0) {
        return [right];
    }

    const rightSource = toSourceNodeWhenNeeded(right).toString();
    /* c8 ignore next 3 */
    if (rightSource.length === 0) {
        return [left];
    }

    const leftCharCode = leftSource.charCodeAt(leftSource.length - 1);
    const rightCharCode = rightSource.charCodeAt(0);

    if ((leftCharCode === 0x2B  /* + */ || leftCharCode === 0x2D  /* - */) && leftCharCode === rightCharCode ||
            utilsExports.code.isIdentifierPartES5(leftCharCode) && utilsExports.code.isIdentifierPartES5(rightCharCode) ||
            leftCharCode === 0x2F  /* / */ && rightCharCode === 0x69  /* i */) { // infix word operators all start with `i`
        return [left, noEmptySpace(), right];
    }
    if (utilsExports.code.isWhiteSpace(leftCharCode) || utilsExports.code.isLineTerminator(leftCharCode) ||
                utilsExports.code.isWhiteSpace(rightCharCode) || utilsExports.code.isLineTerminator(rightCharCode)) {
        return [left, right];
    }
    return [left, space, right];
}

/**
 * @param {string|NestedStringArray|import('source-map').SourceNode} stmt
 */
function addIndent(stmt) {
    return [base, stmt];
}

/**
 * @param {(s: string) => void} fn
 */
function withIndent(fn) {
    const previousBase = base;
    base += indent;
    fn(base);
    base = previousBase;
}

/**
 * @param {string} str
 */
function calculateSpaces(str) {
    let i;
    for (i = str.length - 1; i >= 0; --i) {
        if (utilsExports.code.isLineTerminator(str.charCodeAt(i))) {
            break;
        }
    }
    return (str.length - 1) - i;
}

/**
 * @param {string} value
 * @param {string} [specialBase]
 */
function adjustMultilineComment(value, specialBase) {
    const array = value.split(/\r\n|[\r\n]/);
    let spaces = Number.MAX_VALUE;

    // first line doesn't have indentation
    for (let i = 1, len = array.length; i < len; ++i) {
        const line = array[i];
        let j = 0;
        while (j < line.length && utilsExports.code.isWhiteSpace(line.charCodeAt(j))) {
            ++j;
        }
        if (spaces > j) {
            spaces = j;
        }
    }

    let previousBase;
    if (typeof specialBase !== 'undefined') {
        // pattern like
        // {
        //   var t = 20;  /*
        //                 * this is comment
        //                 */
        // }
        previousBase = base;
        if (array[1][spaces] === '*') {
            specialBase += ' ';
        }
        base = specialBase;
    } else {
        if (spaces & 1) {
            // /*
            //  *
            //  */
            // If spaces are odd number, above pattern is considered.
            // We waste 1 space.
            --spaces;
        }
        previousBase = base;
    }

    for (let i = 1, len = array.length; i < len; ++i) {
        const sn = toSourceNodeWhenNeeded(addIndent(array[i].slice(spaces)));
        array[i] = /** @type {string} */ (sn);
    }

    base = previousBase;

    return array.join('\n');
}

/**
 * @param {import('estree').Comment} comment
 * @param {string} [specialBase]
 */
function generateComment(comment, specialBase) {
    if (comment.type === 'Line') {
        if (endsWithLineTerminator(comment.value)) {
            return `//${comment.value}`;
        } else {
            // Always use LineTerminator
            let result = `//${comment.value}`;
            if (!preserveBlankLines) {
                result += '\n';
            }
            return result;
        }
    }
    if (extra.format.indent.adjustMultilineComment && /[\n\r]/.test(comment.value)) {
        return adjustMultilineComment(`/*${comment.value}*/`, specialBase);
    }
    return `/*${comment.value}*/`;
}

/**
 * @param {string} stmt
 * @param {string} result
 */
function addJsdoc (stmt, result) {
    return [stmt, result];
}

/**
 * @typedef {(string|import('source-map').SourceNode|NestedStringArray)[]} NestedStringArray
 */

/**
 * @param {import('estree').Node|import('estree').MaybeNamedClassDeclaration|import('estree').MaybeNamedFunctionDeclaration} stmt
 * @param {NestedStringArray} result
 */
function addComments(stmt, result) {
    if (stmt.leadingComments && stmt.leadingComments.length > 0) {
        const save = result;

        if (preserveBlankLines) {
            const [comment] = stmt.leadingComments;
            result = [];

            /** @type {[number, number]} */
            // @ts-expect-error Extended estree
            const extRange = comment.extendedRange;

            /** @type {[number, number]} */
            // @ts-expect-error Extended estree
            // eslint-disable-next-line prefer-destructuring -- TS
            let range = comment.range;

            const prefix = /** @type {string} */ (sourceCode).substring(extRange[0], range[0]);
            let count = (prefix.match(/\n/g) || []).length;
            if (count > 0) {
                result.push(stringRepeat('\n', count));
                result.push(addIndent(generateComment(comment)));
            } else {
                result.push(prefix);
                result.push(generateComment(comment));
            }

            let prevRange = range;

            for (let i = 1, len = stmt.leadingComments.length; i < len; i++) {
                const comment = stmt.leadingComments[i];
                // @ts-expect-error Extended estree
                ({ range } = comment);

                const infix = /** @type {string} */ (sourceCode).substring(prevRange[1], range[0]);
                count = (infix.match(/\n/g) || []).length;
                result.push(stringRepeat('\n', count));
                result.push(addIndent(generateComment(comment)));

                prevRange = range;
            }

            const suffix = /** @type {string} */ (sourceCode).substring(range[1], extRange[1]);
            count = (suffix.match(/\n/g) || []).length;
            result.push(stringRepeat('\n', count));
        } else {
            const [comment] = stmt.leadingComments;
            result = [];
            if (safeConcatenation && stmt.type === Syntax.Program &&
                /** @type {import('estree').Program} */
                (/** @type {unknown} */ (stmt)).body.length === 0) {
                result.push('\n');
            }
            result.push(generateComment(comment));
            if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                result.push('\n');
            }

            for (let i = 1, len = stmt.leadingComments.length; i < len; ++i) {
                const comment = stmt.leadingComments[i];
                const fragment = [generateComment(comment)];
                if (!endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
                    fragment.push('\n');
                }
                result.push(addIndent(fragment));
            }
        }

        result.push(addIndent(save));
    }

    if (stmt.trailingComments) {

        if (preserveBlankLines) {
            const [comment] = stmt.trailingComments;

            /** @type {[number, number]} */
            // @ts-expect-error Extended estree
            const extRange = comment.extendedRange;

            /** @type {[number, number]} */
            // @ts-expect-error Extended estree
            // eslint-disable-next-line prefer-destructuring -- TS
            const range = comment.range;

            const prefix = /** @type {string} */ (sourceCode).substring(extRange[0], range[0]);
            const count = (prefix.match(/\n/g) || []).length;

            if (count > 0) {
                result.push(stringRepeat('\n', count));
                result.push(addIndent(generateComment(comment)));
            } else {
                result.push(prefix);
                result.push(generateComment(comment));
            }
        } else {
            const tailingToStatement = !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString());
            const specialBase = stringRepeat(' ', calculateSpaces(toSourceNodeWhenNeeded([base, result, indent]).toString()));
            for (let i = 0, len = stmt.trailingComments.length; i < len; ++i) {
                const comment = stmt.trailingComments[i];
                if (tailingToStatement) {
                    // We assume target like following script
                    //
                    // var t = 20;  /**
                    //               * This is comment of t
                    //               */
                    if (i === 0) {
                        // first case
                        result = [result, indent];
                    } else {
                        result = [result, specialBase];
                    }
                    result.push(generateComment(comment, specialBase));
                /* c8 ignore next 3 */
                } else {
                    result = [result, addIndent(generateComment(comment))];
                }
                if (i !== len - 1 && !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                    result = [result, '\n'];
                }
            }
        }
    }

    return result;
}

/**
 * @param {number} start
 * @param {number} end
 * @param {NestedStringArray} result
 */
function generateBlankLines(start, end, result) {
    let newlineCount = 0;

    for (let j = start; j < end; j++) {
        if (/** @type {string} */ (sourceCode)[j] === '\n') {
            newlineCount++;
        }
    }

    for (let j = 1; j < newlineCount; j++) {
        result.push(newline);
    }
}

/**
 * @param {StringOrSourceNodeOrArray} text
 * @param {number} current
 * @param {number} should
 */
function parenthesize(text, current, should) {
    if (current < should) {
        return ['(', text, ')'];
    }
    return text;
}

/**
 * @param {string} string
 */
function generateVerbatimString(string) {
    const result = string.split(/\r\n|\n/);
    for (let i = 1, iz = result.length; i < iz; i++) {
        result[i] = newline + base + result[i];
    }
    return result;
}

/**
 * @param {import('estree').Node|import('estree').MaybeNamedClassDeclaration|import('estree').MaybeNamedFunctionDeclaration} expr
 * @param {number|undefined} precedence
 */
function generateVerbatim(expr, precedence) {
    const verbatim =
        /**
         * @type {string|{
         *   content: string,
         *   precedence: number
         * }}
         */ (
            expr[/** @type {keyof expr} */ (extra.verbatim)]
        );

    /* c8 ignore next 3 -- TS */
    if (!verbatim) {
        throw new Error('Unexpected falsy verbatim');
    }

    let result;
    if (typeof verbatim === 'string') {
        result = parenthesize(
            generateVerbatimString(verbatim),
            Precedence.Sequence,
            /** @type {number} */
            (precedence)
        );
    } else {
        // verbatim is object
        result = generateVerbatimString(verbatim.content);
        const prec = (verbatim.precedence != null) ? verbatim.precedence : Precedence.Sequence;
        result = parenthesize(
            result,
            prec,
            /** @type {number} */
            (precedence)
        );
    }

    return toSourceNodeWhenNeeded(result, expr);
}

/**
 * @param {import('estree').Identifier|import('estree').PrivateIdentifier} node
 */
function generateIdentifier(node) {
    return toSourceNodeWhenNeeded(node.name, node);
}

/**
 * @param {import('estree').Node} node
 * @param {boolean} spaceRequired
 */
function generateAsyncPrefix(node, spaceRequired) {
    return 'async' in node && node.async
        ? `async${spaceRequired ? noEmptySpace() : space}`
        : '';
}

/**
 * @param {import('estree').FunctionDeclaration|import('estree').FunctionExpression} node
 */
function generateStarSuffix(node) {
    const isGenerator = node.generator && !extra.moz.starlessGenerator;
    return isGenerator ? `*${space}` : '';
}

/**
 * @param {import('estree').MethodDefinition|import('estree').Property} prop
 */
function generateMethodPrefix(prop) {
    const func = prop.value;

    let prefix = '';
    if ('async' in func && func.async) {
        prefix += generateAsyncPrefix(func, !prop.computed);
    }
    if ('generator' in func && func.generator) {
        // avoid space before method name
        prefix += generateStarSuffix(
            /** @type {import('estree').FunctionExpression | import('estree').FunctionDeclaration} */
            (func)
        ) ? '*' : '';
    }
    return prefix;
}

const Statement = {
    /** @type {((stmt: import('@es-joy/jsdoccomment').JsdocBlock) => string)|null} */
    JsdocBlock: null,

    /**
     * @this {CodeGenerator}
     * @param {import('estree').BlockStatement} stmt
     * @param {number} flags
     */
    BlockStatement (stmt, flags) {
        const that = this;
        /** @type {NestedStringArray} */
        let result = ['{', newline];

        withIndent(function () {
            // handle functions without any code
            if (stmt.body.length === 0 && preserveBlankLines) {
                /** @type {[number, number]} */
                // @ts-expect-error Extended estree
                // eslint-disable-next-line prefer-destructuring -- TS
                const range = stmt.range;
                if (range[1] - range[0] > 2) {
                    const content = /** @type {string} */ (
                        sourceCode
                    ).substring(range[0] + 1, range[1] - 1);
                    if (content[0] === '\n') {
                        result = ['{'];
                    }
                    result.push(content);
                }
            }

            let bodyFlags = S_TFFF;
            if (flags & F_FUNC_BODY) {
                bodyFlags |= F_DIRECTIVE_CTX;
            }

            for (let i = 0, iz = stmt.body.length; i < iz; ++i) {
                if (preserveBlankLines) {
                    // handle spaces before the first line
                    if (i === 0) {
                        if (stmt.body[0].leadingComments) {
                            /** @type {[number, number]} */
                            // @ts-expect-error Extended estree
                            const range = stmt.body[0].leadingComments[0].extendedRange;
                            const content = /** @type {string} */ (
                                sourceCode
                            ).substring(range[0], range[1]);
                            if (content[0] === '\n') {
                                result = ['{'];
                            }
                        }
                        if (!stmt.body[0].leadingComments) {
                            /** @type {[number, number]} */
                            // @ts-expect-error Extended estree
                            // eslint-disable-next-line prefer-destructuring -- TS
                            const range = stmt.range;

                            /** @type {[number, number]} */
                            // @ts-expect-error Extended estree
                            const bodyItemRange = stmt.body[0].range;
                            generateBlankLines(range[0], bodyItemRange[0], result);
                        }
                    }

                    // handle spaces between lines
                    if (i > 0) {
                        if (!stmt.body[i - 1].trailingComments  && !stmt.body[i].leadingComments) {
                            /** @type {[number, number]} */
                            // @ts-expect-error Extended estree
                            const bodyItemRangePrev = stmt.body[i - 1].range;

                            /** @type {[number, number]} */
                            // @ts-expect-error Extended estree
                            const bodyItemRange = stmt.body[i].range;

                            generateBlankLines(bodyItemRangePrev[1], bodyItemRange[0], result);
                        }
                    }
                }

                if (i === iz - 1) {
                    bodyFlags |= F_SEMICOLON_OPT;
                }

                let fragment;
                if (stmt.body[i].leadingComments && preserveBlankLines) {
                    fragment = that.generateStatement(stmt.body[i], bodyFlags);
                } else {
                    fragment = addIndent(that.generateStatement(stmt.body[i], bodyFlags));
                }

                result.push(fragment);
                if (!endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
                    if (preserveBlankLines && i < iz - 1) {
                        // don't add a new line if there are leading coments
                        // in the next statement
                        if (!stmt.body[i + 1].leadingComments) {
                            result.push(newline);
                        }
                    } else {
                        result.push(newline);
                    }
                }

                if (preserveBlankLines) {
                    // handle spaces after the last line
                    if (i === iz - 1) {
                        if (!stmt.body[i].trailingComments) {
                            /** @type {[number, number]} */
                            // @ts-expect-error Extended estree
                            // eslint-disable-next-line prefer-destructuring -- TS
                            const range = stmt.range;

                            /** @type {[number, number]} */
                            // @ts-expect-error Extended estree
                            const bodyItemRange = stmt.body[i].range;
                            generateBlankLines(bodyItemRange[1], range[1], result);
                        }
                    }
                }
            }
        });

        result.push(addIndent('}'));
        return result;
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').BreakStatement} stmt
     * @param {number} flags
     */
    BreakStatement (stmt, flags) {
        if (stmt.label) {
            return `break ${stmt.label.name}${this.semicolon(flags)}`;
        }
        return `break${this.semicolon(flags)}`;
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').ContinueStatement} stmt
     * @param {number} flags
     */
    ContinueStatement (stmt, flags) {
        if (stmt.label) {
            return `continue ${stmt.label.name}${this.semicolon(flags)}`;
        }
        return `continue${this.semicolon(flags)}`;
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').ClassBody} stmt
     * @param {number} flags
     */
    ClassBody (stmt, flags) {
        /** @type {NestedStringArray} */
        const result = [ '{', newline];
        const that = this;

        withIndent(function (indent) {
            for (let i = 0, iz = stmt.body.length; i < iz; ++i) {
                result.push(indent);
                result.push(that.generateExpression(stmt.body[i], Precedence.Sequence, E_TTT));
                if (i + 1 < iz) {
                    result.push(newline);
                }
            }
        });

        if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
            result.push(newline);
        }
        result.push(base);
        result.push('}');
        return result;
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').ClassDeclaration} stmt
     * @param {number} flags
     */
    ClassDeclaration (stmt, flags) {
        let result  = /** @type {NestedStringArray} */ (['class']);
        if (stmt.id) {
            result = join(result, this.generateExpression(stmt.id, Precedence.Sequence, E_TTT));
        }
        if (stmt.superClass) {
            const fragment = join('extends', this.generateExpression(stmt.superClass, Precedence.Unary, E_TTT));
            result = join(result, fragment);
        }
        result.push(space);
        result.push(this.generateStatement(stmt.body, S_TFFT));
        return result;
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').Node & {
     *   raw?: string,
     *   directive: string
     * }} stmt
     * @param {number} flags
     */
    DirectiveStatement (stmt, flags) {
        if (extra.raw && stmt.raw) {
            return stmt.raw + this.semicolon(flags);
        }
        return escapeDirective(stmt.directive) + this.semicolon(flags);
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').DoWhileStatement} stmt
     * @param {number} flags
     */
    DoWhileStatement (stmt, flags) {
        // Because `do 42 while (cond)` is Syntax Error. We need semicolon.
        let result = join('do', this.maybeBlock(stmt.body, S_TFFF));
        result = this.maybeBlockSuffix(stmt.body, result);
        return join(result, [
            `while${space}(`,
            this.generateExpression(stmt.test, Precedence.Sequence, E_TTT),
            `)${this.semicolon(flags)}`
        ]);
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').CatchClause & {
     *   guard: import('estree').BinaryExpression
     * }} stmt
     * @param {number} flags
     */
    CatchClause (stmt, flags) {
        const that = this;
        /** @type {NestedStringArray} */
        let result = [];
        withIndent(function () {
            let guard;

            if (stmt.param) {
                result = [
                    `catch${space}(`,
                    that.generateExpression(stmt.param, Precedence.Sequence, E_TTT),
                    ')'
                ];

                if (stmt.guard) {
                    guard = that.generateExpression(stmt.guard, Precedence.Sequence, E_TTT);
                    result.splice(2, 0, ' if ', guard);
                }
            } else {
                result = ['catch'];
            }
        });
        result.push(this.maybeBlock(stmt.body, S_TFFF));
        return result;
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').DebuggerStatement} stmt
     * @param {number} flags
     */
    DebuggerStatement (stmt, flags) {
        return `debugger${this.semicolon(flags)}`;
    },

    /**
     * @param {import('estree').EmptyStatement} stmt
     * @param {number} flags
     */
    EmptyStatement (stmt, flags) {
        return ';';
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').ExportDefaultDeclaration} stmt
     * @param {number} flags
     */
    ExportDefaultDeclaration (stmt, flags) {
        const bodyFlags = (flags & F_SEMICOLON_OPT) ? S_TFFT : S_TFFF;

        /** @type {NestedStringArray} */
        let result = [ 'export' ];

        // export default HoistableDeclaration[Default]
        // export default AssignmentExpression[In] ;
        result = join(result, 'default');
        if (isStatement(stmt.declaration)) {
            result = join(result, this.generateStatement(stmt.declaration, bodyFlags));
        } else {
            result = join(result, this.generateExpression(stmt.declaration, Precedence.Assignment, E_TTT) + this.semicolon(flags));
        }
        return result;
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').ExportNamedDeclaration} stmt
     * @param {number} flags
     */
    ExportNamedDeclaration (stmt, flags) {
        const that = this;

        const bodyFlags = (flags & F_SEMICOLON_OPT) ? S_TFFT : S_TFFF;

        /** @type {NestedStringArray} */
        let result = [ 'export' ];

        // export VariableStatement
        // export Declaration[Default]
        if (stmt.declaration) {
            return join(result, this.generateStatement(stmt.declaration, bodyFlags));
        }

        // export ExportClause[NoReference] FromClause ;
        // export ExportClause ;
        if (stmt.specifiers) {
            if (stmt.specifiers.length === 0) {
                result = join(result, `{${space}}`);
            } else {
                result = join(result, '{');
                withIndent(function (indent) {
                    result.push(newline);
                    for (let i = 0, iz = stmt.specifiers.length; i < iz; ++i) {
                        result.push(indent);
                        result.push(that.generateExpression(stmt.specifiers[i], Precedence.Sequence, E_TTT));
                        if (i + 1 < iz) {
                            result.push(`,${newline}`);
                        }
                    }
                });
                if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                    result.push(newline);
                }
                result.push(`${base}}`);
            }

            if (stmt.source) {
                result = join(result, [
                    `from${space}`,
                    // ModuleSpecifier
                    this.generateExpression(stmt.source, Precedence.Sequence, E_TTT),
                    this.semicolon(flags)
                ]);
            } else {
                result.push(this.semicolon(flags));
            }
        }
        return result;
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').ExportAllDeclaration} stmt
     * @param {number} flags
     */
    ExportAllDeclaration (stmt, flags) {
        // export * FromClause ;
        return [
            `export${space}`,
            `*${space}`,
            `from${space}`,
            // ModuleSpecifier
            this.generateExpression(stmt.source, Precedence.Sequence, E_TTT),
            this.semicolon(flags)
        ];
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').ExpressionStatement} stmt
     * @param {number} flags
     */
    ExpressionStatement (stmt, flags) {
        /**
         * @param {string} fragment
         */
        function isClassPrefixed(fragment) {
            if (fragment.slice(0, 5) !== 'class') {
                return false;
            }
            const code = fragment.charCodeAt(5);
            return code === 0x7B  /* '{' */ || utilsExports.code.isWhiteSpace(code) || utilsExports.code.isLineTerminator(code);
        }

        /**
         * @param {string} fragment
         */
        function isFunctionPrefixed(fragment) {
            if (fragment.slice(0, 8) !== 'function') {
                return false;
            }
            const code = fragment.charCodeAt(8);
            return code === 0x28 /* '(' */ || utilsExports.code.isWhiteSpace(code) || code === 0x2A  /* '*' */ || utilsExports.code.isLineTerminator(code);
        }

        /**
         * @param {string} fragment
         */
        function isAsyncPrefixed(fragment) {
            if (fragment.slice(0, 5) !== 'async') {
                return false;
            }
            if (!utilsExports.code.isWhiteSpace(fragment.charCodeAt(5))) {
                return false;
            }
            let i, iz;
            for (i = 6, iz = fragment.length; i < iz; ++i) {
                if (!utilsExports.code.isWhiteSpace(fragment.charCodeAt(i))) {
                    break;
                }
            }
            if (i === iz) {
                return false;
            }
            if (fragment.slice(i, i + 8) !== 'function') {
                return false;
            }
            const code = fragment.charCodeAt(i + 8);
            return code === 0x28 /* '(' */ || utilsExports.code.isWhiteSpace(code) || code === 0x2A  /* '*' */ || utilsExports.code.isLineTerminator(code);
        }

        /** @type {NestedStringArray} */
        let result = [this.generateExpression(stmt.expression, Precedence.Sequence, E_TTT)];
        // 12.4 '{', 'function', 'class' is not allowed in this position.
        // wrap expression with parentheses
        const fragment = toSourceNodeWhenNeeded(result).toString();
        if (fragment.charCodeAt(0) === 0x7B  /* '{' */ ||  // ObjectExpression
                    isClassPrefixed(fragment) ||
                    isFunctionPrefixed(fragment) ||
                    isAsyncPrefixed(fragment) ||
                    (directive && (flags & F_DIRECTIVE_CTX) && stmt.expression.type === Syntax.Literal &&
                        typeof (/** @type {import('estree').Literal} */ (stmt.expression)).value === 'string')) {
            result = ['(', result, `)${this.semicolon(flags)}`];
        } else {
            result.push(this.semicolon(flags));
        }
        return result;
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').ImportDeclaration} stmt
     * @param {number} flags
     */
    ImportDeclaration (stmt, flags) {
        // ES6: 15.2.1 valid import declarations:
        //     - import ImportClause FromClause ;
        //     - import ModuleSpecifier ;
        const that = this;

        // If no ImportClause is present,
        // this should be `import ModuleSpecifier` so skip `from`
        // ModuleSpecifier is StringLiteral.
        if (stmt.specifiers.length === 0) {
            // import ModuleSpecifier ;
            return [
                'import',
                space,
                // ModuleSpecifier
                this.generateExpression(stmt.source, Precedence.Sequence, E_TTT),
                this.semicolon(flags)
            ];
        }

        // import ImportClause FromClause ;

        /** @type {NestedStringArray} */
        let result = [
            'import'
        ];
        let cursor = 0;

        // ImportedBinding
        if (stmt.specifiers[cursor].type === Syntax.ImportDefaultSpecifier) {
            result = join(result, [
                this.generateExpression(stmt.specifiers[cursor], Precedence.Sequence, E_TTT)
            ]);
            ++cursor;
        }

        if (stmt.specifiers[cursor]) {
            if (cursor !== 0) {
                result.push(',');
            }

            if (stmt.specifiers[cursor].type === Syntax.ImportNamespaceSpecifier) {
                // NameSpaceImport
                result = join(result, [
                    space,
                    this.generateExpression(stmt.specifiers[cursor], Precedence.Sequence, E_TTT)
                ]);
            } else {
                // NamedImports
                result.push(`${space}{`);

                if ((stmt.specifiers.length - cursor) === 1) {
                    // import { ... } from "...";
                    result.push(space);
                    result.push(this.generateExpression(stmt.specifiers[cursor], Precedence.Sequence, E_TTT));
                    result.push(`${space}}${space}`);
                } else {
                    // import {
                    //    ...,
                    //    ...,
                    // } from "...";
                    withIndent(function (indent) {
                        result.push(newline);
                        for (let i = cursor, iz = stmt.specifiers.length; i < iz; ++i) {
                            result.push(indent);
                            result.push(that.generateExpression(stmt.specifiers[i], Precedence.Sequence, E_TTT));
                            if (i + 1 < iz) {
                                result.push(`,${newline}`);
                            }
                        }
                    });
                    if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                        result.push(newline);
                    }
                    result.push(`${base}}${space}`);
                }
            }
        }

        result = join(result, [
            `from${space}`,
            // ModuleSpecifier
            this.generateExpression(stmt.source, Precedence.Sequence, E_TTT),
            this.semicolon(flags)
        ]);
        return result;
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').VariableDeclarator} stmt
     * @param {number} flags
     */
    VariableDeclarator (stmt, flags) {
        const itemFlags = (flags & F_ALLOW_IN) ? E_TTT : E_FTT;
        if (stmt.init) {
            return [
                this.generateExpression(stmt.id, Precedence.Assignment, itemFlags),
                space,
                '=',
                space,
                this.generateExpression(stmt.init, Precedence.Assignment, itemFlags)
            ];
        }
        return this.generatePattern(stmt.id, Precedence.Assignment, itemFlags);
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').VariableDeclaration} stmt
     * @param {number} flags
     */
    VariableDeclaration (stmt, flags) {
        // VariableDeclarator is typed as Statement,
        // but joined with comma (not LineTerminator).
        // So if comment is attached to target node, we should specialize.
        const that = this;

        /** @type {NestedStringArray} */
        const result = [ stmt.kind ];

        const bodyFlags = (flags & F_ALLOW_IN) ? S_TFFF : S_FFFF;

        function block() {
            const [node] = stmt.declarations;
            if (extra.comment && node.leadingComments) {
                result.push('\n');
                result.push(addIndent(that.generateStatement(node, bodyFlags)));
            } else {
                result.push(noEmptySpace());
                result.push(that.generateStatement(node, bodyFlags));
            }

            for (let i = 1, iz = stmt.declarations.length; i < iz; ++i) {
                const node = stmt.declarations[i];
                if (extra.comment && node.leadingComments) {
                    result.push(`,${newline}`);
                    result.push(addIndent(that.generateStatement(node, bodyFlags)));
                } else {
                    result.push(`,${space}`);
                    result.push(that.generateStatement(node, bodyFlags));
                }
            }
        }

        if (stmt.declarations.length > 1) {
            withIndent(block);
        } else {
            block();
        }

        result.push(this.semicolon(flags));

        return result;
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').ThrowStatement} stmt
     * @param {number} flags
     */
    ThrowStatement (stmt, flags) {
        return [join(
            'throw',
            this.generateExpression(stmt.argument, Precedence.Sequence, E_TTT)
        ), this.semicolon(flags)];
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').TryStatement & {
     *   handlers?: (import('estree').CatchClause)[],
     *   guardedHandlers?: (import('estree').CatchClause)[],
     * }} stmt
     * @param {number} flags
     */
    TryStatement (stmt, flags) {
        /** @type {NestedStringArray} */
        let result = ['try', this.maybeBlock(stmt.block, S_TFFF)];
        result = this.maybeBlockSuffix(stmt.block, result);

        if (stmt.handlers) {
            // old interface
            for (let i = 0, iz = stmt.handlers.length; i < iz; ++i) {
                result = join(result, this.generateStatement(stmt.handlers[i], S_TFFF));
                if (stmt.finalizer || i + 1 !== iz) {
                    result = this.maybeBlockSuffix(stmt.handlers[i].body, result);
                }
            }
        } else {
            const guardedHandlers = stmt.guardedHandlers || [];

            for (let i = 0, iz = guardedHandlers.length; i < iz; ++i) {
                result = join(result, this.generateStatement(guardedHandlers[i], S_TFFF));
                if (stmt.finalizer || i + 1 !== iz) {
                    result = this.maybeBlockSuffix(guardedHandlers[i].body, result);
                }
            }

            // new interface
            if (stmt.handler) {
                if (Array.isArray(stmt.handler)) {
                    for (let i = 0, iz = stmt.handler.length; i < iz; ++i) {
                        result = join(result, this.generateStatement(stmt.handler[i], S_TFFF));
                        if (stmt.finalizer || i + 1 !== iz) {
                            result = this.maybeBlockSuffix(stmt.handler[i].body, result);
                        }
                    }
                } else {
                    result = join(result, this.generateStatement(stmt.handler, S_TFFF));
                    if (stmt.finalizer) {
                        result = this.maybeBlockSuffix(stmt.handler.body, result);
                    }
                }
            }
        }
        if (stmt.finalizer) {
            result = join(result, ['finally', this.maybeBlock(stmt.finalizer, S_TFFF)]);
        }
        return result;
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').SwitchStatement} stmt
     * @param {number} flags
     */
    SwitchStatement (stmt, flags) {
        const that = this;
        let result = [];
        withIndent(function () {
            result = [
                `switch${space}(`,
                that.generateExpression(stmt.discriminant, Precedence.Sequence, E_TTT),
                `)${space}{${newline}`
            ];
        });
        if (stmt.cases) {
            let bodyFlags = S_TFFF;
            for (let i = 0, iz = stmt.cases.length; i < iz; ++i) {
                if (i === iz - 1) {
                    bodyFlags |= F_SEMICOLON_OPT;
                }
                const fragment = addIndent(this.generateStatement(stmt.cases[i], bodyFlags));
                result.push(fragment);
                if (!endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
                    result.push(newline);
                }
            }
        }
        result.push(addIndent('}'));
        return result;
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').SwitchCase} stmt
     * @param {number} flags
     */
    SwitchCase (stmt, flags) {
        const that = this;
        let result;
        withIndent(function () {
            if (stmt.test) {
                result = [
                    join('case', that.generateExpression(stmt.test, Precedence.Sequence, E_TTT)),
                    ':'
                ];
            } else {
                result = ['default:'];
            }

            let i = 0;
            const iz = stmt.consequent.length;
            if (iz && stmt.consequent[0].type === Syntax.BlockStatement) {
                const fragment = that.maybeBlock(stmt.consequent[0], S_TFFF);
                result.push(fragment);
                i = 1;
            }

            if (i !== iz && !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                result.push(newline);
            }

            let bodyFlags = S_TFFF;
            for (; i < iz; ++i) {
                if (i === iz - 1 && flags & F_SEMICOLON_OPT) {
                    bodyFlags |= F_SEMICOLON_OPT;
                }
                const fragment = addIndent(that.generateStatement(stmt.consequent[i], bodyFlags));
                result.push(fragment);
                if (i + 1 !== iz && !endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
                    result.push(newline);
                }
            }
        });
        return result;
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').IfStatement} stmt
     * @param {number} flags
     */
    IfStatement (stmt, flags) {
        const that = this;

        /** @type {NestedStringArray} */
        let result = [];
        withIndent(function () {
            result = [
                `if${space}(`,
                that.generateExpression(stmt.test, Precedence.Sequence, E_TTT),
                ')'
            ];
        });
        const semicolonOptional = flags & F_SEMICOLON_OPT;
        let bodyFlags = S_TFFF;
        if (semicolonOptional) {
            bodyFlags |= F_SEMICOLON_OPT;
        }
        if (stmt.alternate) {
            result.push(this.maybeBlock(stmt.consequent, S_TFFF));
            result = this.maybeBlockSuffix(stmt.consequent, result);
            if (stmt.alternate.type === Syntax.IfStatement) {
                result = join(result, ['else ', this.generateStatement(stmt.alternate, bodyFlags)]);
            } else {
                result = join(result, join('else', this.maybeBlock(stmt.alternate, bodyFlags)));
            }
        } else {
            result.push(this.maybeBlock(stmt.consequent, bodyFlags));
        }
        return result;
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').ForStatement} stmt
     * @param {number} flags
     */
    ForStatement (stmt, flags) {
        const that = this;

        /** @type {NestedStringArray} */
        let result = [];
        withIndent(function () {
            result = [`for${space}(`];
            if (stmt.init) {
                if (stmt.init.type === Syntax.VariableDeclaration) {
                    result.push(that.generateStatement(stmt.init, S_FFFF));
                } else {
                    // F_ALLOW_IN becomes false.
                    result.push(that.generateExpression(stmt.init, Precedence.Sequence, E_FTT));
                    result.push(';');
                }
            } else {
                result.push(';');
            }

            if (stmt.test) {
                result.push(space);
                result.push(that.generateExpression(stmt.test, Precedence.Sequence, E_TTT));
                result.push(';');
            } else {
                result.push(';');
            }

            if (stmt.update) {
                result.push(space);
                result.push(that.generateExpression(stmt.update, Precedence.Sequence, E_TTT));
                result.push(')');
            } else {
                result.push(')');
            }
        });

        result.push(this.maybeBlock(stmt.body, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF));
        return result;
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').ForInStatement} stmt
     * @param {number} flags
     */
    ForInStatement (stmt, flags) {
        return this.generateIterationForStatement('in', stmt, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF);
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').ForOfStatement} stmt
     * @param {number} flags
     */
    ForOfStatement (stmt, flags) {
        return this.generateIterationForStatement('of', stmt, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF);
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').LabeledStatement} stmt
     * @param {number} flags
     */
    LabeledStatement (stmt, flags) {
        return [`${stmt.label.name}:`, this.maybeBlock(stmt.body, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF)];
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').Program} stmt
     * @param {number} flags
     */
    Program (stmt, flags) {
        const iz = stmt.body.length;
        const initialNewline = safeConcatenation && iz > 0;

        /** @type {NestedStringArray} */
        const result = [initialNewline ? '\n' : ''];

        if ('jsdocBlocks' in stmt && stmt.jsdocBlocks) {
            /** @type {import('@es-joy/jsdoccomment').JsdocBlock[]} */
            (stmt.jsdocBlocks).forEach((jsdocBlock) => {
                result.push(
                    /** @type {((stmt: import('@es-joy/jsdoccomment').JsdocBlock) => string)} */ (
                        this.JsdocBlock
                    )(jsdocBlock)
                );
            });
            result.push('\n\n');
        }

        let bodyFlags = S_TFTF;
        for (let i = 0; i < iz; ++i) {
            if (!safeConcatenation && i === iz - 1) {
                bodyFlags |= F_SEMICOLON_OPT;
            }

            if (preserveBlankLines) {
                // handle spaces before the first line
                if (i === 0) {
                    if (!stmt.body[0].leadingComments) {
                        /** @type {[number, number]} */
                        // @ts-expect-error Extended estree
                        // eslint-disable-next-line prefer-destructuring -- TS
                        const range = stmt.range;

                        /** @type {[number, number]} */
                        // @ts-expect-error Extended estree
                        const bodyRange = stmt.body[i].range;
                        generateBlankLines(range[0], bodyRange[0], result);
                    }
                }

                // handle spaces between lines
                if (i > 0) {
                    if (!stmt.body[i - 1].trailingComments && !stmt.body[i].leadingComments) {
                        /** @type {[number, number]} */
                        // @ts-expect-error Extended estree
                        const bodyItemRangePrev = stmt.body[i - 1].range;

                        /** @type {[number, number]} */
                        // @ts-expect-error Extended estree
                        const bodyItemRange = stmt.body[i].range;
                        generateBlankLines(bodyItemRangePrev[1], bodyItemRange[0], result);
                    }
                }
            }

            const fragment = addIndent(this.generateStatement(stmt.body[i], bodyFlags));
            result.push(fragment);
            if (i + 1 < iz && !endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
                if (preserveBlankLines) {
                    if (!stmt.body[i + 1].leadingComments) {
                        result.push(newline);
                    }
                } else {
                    result.push(newline);
                }
            }

            if (preserveBlankLines) {
                // handle spaces after the last line
                if (i === iz - 1) {
                    if (!stmt.body[i].trailingComments) {
                        /** @type {[number, number]} */
                        // @ts-expect-error Extended estree
                        // eslint-disable-next-line prefer-destructuring -- TS
                        const range = stmt.range;

                        /** @type {[number, number]} */
                        // @ts-expect-error Extended estree
                        const bodyRange = stmt.body[i].range;
                        generateBlankLines(bodyRange[1], range[1], result);
                    }
                }
            }
        }
        return result;
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').FunctionDeclaration} stmt
     * @param {number} flags
     */
    FunctionDeclaration (stmt, flags) {
        return [
            generateAsyncPrefix(stmt, true),
            'function',
            generateStarSuffix(stmt) || noEmptySpace(),
            stmt.id ? generateIdentifier(stmt.id) : '',
            this.generateFunctionBody(stmt)
        ];
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').ReturnStatement} stmt
     * @param {number} flags
     */
    ReturnStatement (stmt, flags) {
        if (stmt.argument) {
            return [join(
                'return',
                this.generateExpression(stmt.argument, Precedence.Sequence, E_TTT)
            ), this.semicolon(flags)];
        }
        return [`return${this.semicolon(flags)}`];
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').WhileStatement} stmt
     * @param {number} flags
     */
    WhileStatement (stmt, flags) {
        const that = this;
        let result = [];
        withIndent(function () {
            result = [
                `while${space}(`,
                that.generateExpression(stmt.test, Precedence.Sequence, E_TTT),
                ')'
            ];
        });
        result.push(this.maybeBlock(stmt.body, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF));
        return result;
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').WithStatement} stmt
     * @param {number} flags
     */
    WithStatement (stmt, flags) {
        const that = this;
        let result = [];
        withIndent(function () {
            result = [
                `with${space}(`,
                that.generateExpression(stmt.object, Precedence.Sequence, E_TTT),
                ')'
            ];
        });
        result.push(this.maybeBlock(stmt.body, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF));
        return result;
    }
};

const Expression = {

    /**
     * @this {CodeGenerator}
     * @param {import('estree').SequenceExpression} expr
     * @param {number} precedence
     * @param {number} flags
     */
    SequenceExpression (expr, precedence, flags) {
        if (Precedence.Sequence < precedence) {
            flags |= F_ALLOW_IN;
        }
        const result = [];
        for (let i = 0, iz = expr.expressions.length; i < iz; ++i) {
            result.push(this.generateExpression(expr.expressions[i], Precedence.Assignment, flags));
            if (i + 1 < iz) {
                result.push(`,${space}`);
            }
        }
        return parenthesize(result, Precedence.Sequence, precedence);
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').AssignmentExpression} expr
     * @param {number} precedence
     * @param {number} flags
     */
    AssignmentExpression (expr, precedence, flags) {
        return this.generateAssignment(expr.left, expr.right, expr.operator, precedence, flags);
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').ArrowFunctionExpression} expr
     * @param {number} precedence
     * @param {number} flags
     */
    ArrowFunctionExpression (expr, precedence, flags) {
        return parenthesize(this.generateFunctionBody(expr), Precedence.ArrowFunction, precedence);
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').ConditionalExpression} expr
     * @param {number} precedence
     * @param {number} flags
     */
    ConditionalExpression (expr, precedence, flags) {
        if (Precedence.Conditional < precedence) {
            flags |= F_ALLOW_IN;
        }
        return parenthesize(
            [
                this.generateExpression(expr.test, Precedence.Coalesce, flags),
                `${space}?${space}`,
                this.generateExpression(expr.consequent, Precedence.Assignment, flags),
                `${space}:${space}`,
                this.generateExpression(expr.alternate, Precedence.Assignment, flags)
            ],
            Precedence.Conditional,
            precedence
        );
    },

    /**
     * @param {import('estree').LogicalExpression} expr
     * @param {number} precedence
     * @param {number} flags
     */
    LogicalExpression (expr, precedence, flags) {
        if (expr.operator === '??') {
            flags |= F_FOUND_COALESCE;
        }

        // @ts-expect-error See comments under `Object.assign` of prototypes below
        return this.BinaryExpression(expr, precedence, flags);
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').BinaryExpression} expr
     * @param {number} precedence
     * @param {number} flags
     */
    BinaryExpression (expr, precedence, flags) {
        const currentPrecedence = BinaryPrecedence[expr.operator];
        const leftPrecedence = expr.operator === '**' ? Precedence.Postfix : currentPrecedence;
        const rightPrecedence = expr.operator === '**' ? currentPrecedence : currentPrecedence + 1;

        if (currentPrecedence < precedence) {
            flags |= F_ALLOW_IN;
        }

        let fragment = this.generateExpression(expr.left, leftPrecedence, flags);

        const leftSource = fragment.toString();

        let result;
        if (leftSource.charCodeAt(leftSource.length - 1) === 0x2F /* / */ && utilsExports.code.isIdentifierPartES5(expr.operator.charCodeAt(0))) {
            result = [fragment, noEmptySpace(), expr.operator];
        } else {
            result = join(fragment, expr.operator);
        }

        fragment = this.generateExpression(expr.right, rightPrecedence, flags);

        if (expr.operator === '/' && fragment.toString().charAt(0) === '/' ||
            expr.operator.slice(-1) === '<' && fragment.toString().slice(0, 3) === '!--') {
            // If '/' concats with '/' or `<` concats with `!--`, it is interpreted as comment start
            result.push(noEmptySpace());
            result.push(fragment);
        } else {
            result = join(result, fragment);
        }

        if (expr.operator === 'in' && !(flags & F_ALLOW_IN)) {
            return ['(', result, ')'];
        }
        // @ts-expect-error Older implementation?
        if ((expr.operator === '||' || expr.operator === '&&') && (flags & F_FOUND_COALESCE)) {
            return ['(', result, ')'];
        }
        return parenthesize(result, currentPrecedence, precedence);
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').CallExpression & {
     *   optional?: boolean
     * }} expr
     * @param {number} precedence
     * @param {number} flags
     */
    CallExpression (expr, precedence, flags) {
        // F_ALLOW_UNPARATH_NEW becomes false.
        const result = [this.generateExpression(expr.callee, Precedence.Call, E_TTF)];

        if (expr.optional) {
            result.push('?.');
        }

        result.push('(');
        for (let i = 0, iz = expr['arguments'].length; i < iz; ++i) {
            result.push(this.generateExpression(expr['arguments'][i], Precedence.Assignment, E_TTT));
            if (i + 1 < iz) {
                result.push(`,${space}`);
            }
        }
        result.push(')');

        if (!(flags & F_ALLOW_CALL)) {
            return ['(', result, ')'];
        }

        return parenthesize(result, Precedence.Call, precedence);
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').ChainExpression} expr
     * @param {number} precedence
     * @param {number} flags
     */
    ChainExpression (expr, precedence, flags) {
        if (Precedence.OptionalChaining < precedence) {
            flags |= F_ALLOW_CALL;
        }

        const result = this.generateExpression(expr.expression, Precedence.OptionalChaining, flags);

        return parenthesize(result, Precedence.OptionalChaining, precedence);
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').NewExpression} expr
     * @param {number} precedence
     * @param {number} flags
     */
    NewExpression (expr, precedence, flags) {
        const { length } = expr['arguments'];

        // F_ALLOW_CALL becomes false.
        // F_ALLOW_UNPARATH_NEW may become false.
        const itemFlags = (flags & F_ALLOW_UNPARATH_NEW && !parentheses && length === 0) ? E_TFT : E_TFF;

        const result = join(
            'new',
            this.generateExpression(expr.callee, Precedence.New, itemFlags)
        );

        if (!(flags & F_ALLOW_UNPARATH_NEW) || parentheses || length > 0) {
            result.push('(');
            for (let i = 0, iz = length; i < iz; ++i) {
                result.push(this.generateExpression(expr['arguments'][i], Precedence.Assignment, E_TTT));
                if (i + 1 < iz) {
                    result.push(`,${space}`);
                }
            }
            result.push(')');
        }

        return parenthesize(result, Precedence.New, precedence);
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').MemberExpression} expr
     * @param {number} precedence
     * @param {number} flags
     */
    MemberExpression (expr, precedence, flags) {
        // F_ALLOW_UNPARATH_NEW becomes false.
        const result = [this.generateExpression(expr.object, Precedence.Call, (flags & F_ALLOW_CALL) ? E_TTF : E_TFF)];

        if (expr.computed) {
            if (expr.optional) {
                result.push('?.');
            }

            result.push('[');
            result.push(this.generateExpression(expr.property, Precedence.Sequence, flags & F_ALLOW_CALL ? E_TTT : E_TFT));
            result.push(']');
        } else {
            if (!expr.optional && expr.object.type === Syntax.Literal &&
                typeof /** @type {import('estree').Literal} */ (expr.object).value === 'number'
            ) {
                const fragment = toSourceNodeWhenNeeded(result).toString();
                // When the following conditions are all true,
                //   1. No floating point
                //   2. Don't have exponents
                //   3. The last character is a decimal digit
                //   4. Not hexadecimal OR octal number literal
                // we should add a floating point.
                if (
                    fragment.indexOf('.') < 0 &&
                            !/[eExX]/.test(fragment) &&
                            utilsExports.code.isDecimalDigit(fragment.charCodeAt(fragment.length - 1)) &&
                            !(fragment.length >= 2 && fragment.charCodeAt(0) === 48)  // '0'
                ) {
                    result.push(' ');
                }
            }
            result.push(expr.optional ? '?.' : '.');
            result.push(generateIdentifier(
                /** @type {import('estree').PrivateIdentifier} */
                (expr.property)
            ));
        }

        return parenthesize(result, Precedence.Member, precedence);
    },

    /**
     * @param {import('estree').MetaProperty} expr
     * @param {number} precedence
     * @param {number} flags
     */
    MetaProperty (expr, precedence, flags) {
        const result = [];
        result.push(typeof expr.meta === 'string' ? expr.meta : generateIdentifier(expr.meta));
        result.push('.');
        result.push(typeof expr.property === 'string' ? expr.property : generateIdentifier(expr.property));
        return parenthesize(result, Precedence.Member, precedence);
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').UnaryExpression} expr
     * @param {number} precedence
     * @param {number} flags
     */
    UnaryExpression (expr, precedence, flags) {
        const fragment = this.generateExpression(expr.argument, Precedence.Unary, E_TTT);

        /** @type {NestedStringArray} */
        let result;
        if (space === '') {
            result = join(expr.operator, fragment);
        } else {
            result = [expr.operator];
            if (expr.operator.length > 2) {
                // delete, void, typeof
                // get `typeof []`, not `typeof[]`
                result = join(result, fragment);
            } else {
                // Prevent inserting spaces between operator and argument if it is unnecessary
                // like, `!cond`
                const leftSource = toSourceNodeWhenNeeded(result).toString();
                const leftCharCode = leftSource.charCodeAt(leftSource.length - 1);
                const rightCharCode = fragment.toString().charCodeAt(0);

                if (((leftCharCode === 0x2B  /* + */ || leftCharCode === 0x2D  /* - */) && leftCharCode === rightCharCode) ||
                            (utilsExports.code.isIdentifierPartES5(leftCharCode) && utilsExports.code.isIdentifierPartES5(rightCharCode))) {
                    result.push(noEmptySpace());
                    result.push(fragment);
                } else {
                    result.push(fragment);
                }
            }
        }
        return parenthesize(result, Precedence.Unary, precedence);
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').YieldExpression} expr
     * @param {number} precedence
     * @param {number} flags
     */
    YieldExpression (expr, precedence, flags) {
        /** @type {StringOrSourceNodeOrArray} */
        let result;
        if (expr.delegate) {
            result = 'yield*';
        } else {
            result = 'yield';
        }
        if (expr.argument) {
            result = join(
                result,
                this.generateExpression(expr.argument, Precedence.Yield, E_TTT)
            );
        }
        return parenthesize(result, Precedence.Yield, precedence);
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').AwaitExpression & {
     *   all?: boolean
     * }} expr
     * @param {number} precedence
     * @param {number} flags
     */
    AwaitExpression (expr, precedence, flags) {
        const result = join(
            expr.all ? 'await*' : 'await',
            this.generateExpression(expr.argument, Precedence.Await, E_TTT)
        );
        return parenthesize(result, Precedence.Await, precedence);
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').UpdateExpression} expr
     * @param {number} precedence
     * @param {number} flags
     */
    UpdateExpression (expr, precedence, flags) {
        if (expr.prefix) {
            return parenthesize(
                [
                    expr.operator,
                    this.generateExpression(expr.argument, Precedence.Unary, E_TTT)
                ],
                Precedence.Unary,
                precedence
            );
        }
        return parenthesize(
            [
                this.generateExpression(expr.argument, Precedence.Postfix, E_TTT),
                expr.operator
            ],
            Precedence.Postfix,
            precedence
        );
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').FunctionExpression} expr
     * @param {number} precedence
     * @param {number} flags
     */
    FunctionExpression (expr, precedence, flags) {
        /** @type {NestedStringArray} */
        const result = [
            generateAsyncPrefix(expr, true),
            'function'
        ];
        if (expr.id) {
            result.push(generateStarSuffix(expr) || noEmptySpace());
            result.push(generateIdentifier(expr.id));
        } else {
            result.push(generateStarSuffix(expr) || space);
        }
        result.push(this.generateFunctionBody(expr));
        return result;
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').ArrayPattern} expr
     * @param {number} precedence
     * @param {number} flags
     */
    ArrayPattern (expr, precedence, flags) {
        return /** @type {CodeGenerator & CodeGenerator.Expression} */ (
            this
        ).ArrayExpression(expr, precedence, flags, true);
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').ArrayExpression|import('estree').ArrayPattern} expr
     * @param {number} precedence
     * @param {number} flags
     * @param {boolean} [isPattern]
     */
    ArrayExpression (expr, precedence, flags, isPattern) {
        if (!expr.elements.length) {
            return '[]';
        }
        const multiline = isPattern ? false : expr.elements.length > 1;
        /** @type {StringOrSourceNodeOrArray} */
        const result = ['[', multiline ? newline : ''];
        const that = this;
        withIndent(function (indent) {
            for (let i = 0, iz = expr.elements.length; i < iz; ++i) {
                if (!expr.elements[i]) {
                    if (multiline) {
                        result.push(indent);
                    }
                    if (i + 1 === iz) {
                        result.push(',');
                    }
                } else {
                    result.push(multiline ? indent : '');
                    result.push(that.generateExpression(
                        /** @type {import('estree').Node} */
                        (expr.elements[i]),
                        Precedence.Assignment,
                        E_TTT
                    ));
                }
                if (i + 1 < iz) {
                    result.push(`,${multiline ? newline : space}`);
                }
            }
        });
        if (multiline && !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
            result.push(newline);
        }
        result.push(multiline ? base : '');
        result.push(']');
        return result;
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').RestElement} expr
     * @param {number} precedence
     * @param {number} flags
     */
    RestElement(expr, precedence, flags) {
        return `...${this.generatePattern(expr.argument)}`;
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').ClassExpression} expr
     * @param {number} precedence
     * @param {number} flags
     */
    ClassExpression (expr, precedence, flags) {
        /** @type {NestedStringArray} */
        let result = ['class'];
        if (expr.id) {
            result = join(result, this.generateExpression(expr.id, Precedence.Sequence, E_TTT));
        }
        if (expr.superClass) {
            const fragment = join('extends', this.generateExpression(expr.superClass, Precedence.Unary, E_TTT));
            result = join(result, fragment);
        }
        result.push(space);
        result.push(this.generateStatement(expr.body, S_TFFT));
        return result;
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').MethodDefinition} expr
     * @param {number} precedence
     * @param {number} flags
     */
    MethodDefinition (expr, precedence, flags) {
        /** @type {string[]} */
        let result = [];
        if (expr['static']) {
            result = [`static${space}`];
        }

        let fragment;
        if (expr.kind === 'get' || expr.kind === 'set') {
            fragment = [
                join(expr.kind, this.generatePropertyKey(expr.key, expr.computed)),
                this.generateFunctionBody(expr.value)
            ];
        } else {
            fragment = [
                generateMethodPrefix(expr),
                this.generatePropertyKey(expr.key, expr.computed),
                this.generateFunctionBody(expr.value)
            ];
        }
        return join(result, fragment);
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').Property} expr
     * @param {number} precedence
     * @param {number} flags
     */
    Property (expr, precedence, flags) {
        if (expr.kind === 'get' || expr.kind === 'set') {
            return [
                expr.kind, noEmptySpace(),
                this.generatePropertyKey(expr.key, expr.computed),
                this.generateFunctionBody(
                    /** @type {import('estree').FunctionExpression} */
                    (expr.value)
                )
            ];
        }

        if (expr.shorthand) {
            if (expr.value.type === 'AssignmentPattern') {
                // @ts-expect-error See comments under `Object.assign` of prototypes below
                return this.AssignmentPattern(expr.value, Precedence.Sequence, E_TTT);
            }
            return this.generatePropertyKey(expr.key, expr.computed);
        }

        if (expr.method) {
            return [
                generateMethodPrefix(expr),
                this.generatePropertyKey(expr.key, expr.computed),
                this.generateFunctionBody(
                    /** @type {import('estree').FunctionExpression} */
                    (expr.value)
                )
            ];
        }

        return [
            this.generatePropertyKey(expr.key, expr.computed),
            `:${space}`,
            this.generateExpression(expr.value, Precedence.Assignment, E_TTT)
        ];
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').ObjectExpression} expr
     * @param {number} precedence
     * @param {number} flags
     */
    ObjectExpression (expr, precedence, flags) {
        if (!expr.properties.length) {
            return '{}';
        }
        const multiline = expr.properties.length > 1;

        const that = this;

        /** @type {string | import('source-map').SourceNode} */
        let fragment = '';
        withIndent(function () {
            fragment = that.generateExpression(expr.properties[0], Precedence.Sequence, E_TTT);
        });

        if (!multiline) {
            // issues 4
            // Do not transform from
            //   dejavu.Class.declare({
            //       method2 () {}
            //   });
            // to
            //   dejavu.Class.declare({method2 () {
            //       }});
            if (!hasLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
                return [ '{', space, fragment, space, '}' ];
            }
        }

        /** @type {(string | import('source-map').SourceNode)[]} */
        let result = [];
        withIndent(function (indent) {
            result = [ '{', newline, indent, fragment ];

            if (multiline) {
                result.push(`,${newline}`);
                for (let i = 1, iz = expr.properties.length; i < iz; ++i) {
                    result.push(indent);
                    result.push(that.generateExpression(expr.properties[i], Precedence.Sequence, E_TTT));
                    if (i + 1 < iz) {
                        result.push(`,${newline}`);
                    }
                }
            }
        });

        if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
            result.push(newline);
        }
        result.push(base);
        result.push('}');
        return result;
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').AssignmentPattern} expr
     * @param {number} precedence
     * @param {number} flags
     */
    AssignmentPattern(expr, precedence, flags) {
        return this.generateAssignment(expr.left, expr.right, '=', precedence, flags);
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').ObjectPattern} expr
     * @param {number} precedence
     * @param {number} flags
     */
    ObjectPattern (expr, precedence, flags) {
        if (!expr.properties.length) {
            return '{}';
        }

        let multiline = false;
        if (expr.properties.length === 1) {
            const [property] = expr.properties;
            if (
                property.type === Syntax.Property
                    && /** @type {import('estree').AssignmentProperty} */ (
                        property
                    ).value.type !== Syntax.Identifier
            ) {
                multiline = true;
            }
        } else {
            for (const property of expr.properties) {
                if (
                    property.type === Syntax.Property
                        && !(/** @type {import('estree').AssignmentProperty} */ (
                            property
                        )).shorthand
                ) {
                    multiline = true;
                    break;
                }
            }
        }

        /** @type {StringOrSourceNodeOrArray} */
        const result = ['{', multiline ? newline : '' ];

        const that = this;
        withIndent(function (indent) {
            for (let i = 0, iz = expr.properties.length; i < iz; ++i) {
                result.push(multiline ? indent : '');
                result.push(that.generateExpression(expr.properties[i], Precedence.Sequence, E_TTT));
                if (i + 1 < iz) {
                    result.push(`,${multiline ? newline : space}`);
                }
            }
        });

        if (multiline && !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
            result.push(newline);
        }
        result.push(multiline ? base : '');
        result.push('}');
        return result;
    },

    /**
     * @param {import('estree').ThisExpression} expr
     * @param {number} precedence
     * @param {number} flags
     */
    ThisExpression (expr, precedence, flags) {
        return 'this';
    },

    /**
     * @param {import('estree').Super} expr
     * @param {number} precedence
     * @param {number} flags
     */
    Super (expr, precedence, flags) {
        return 'super';
    },

    /**
     * @param {import('estree').Identifier} expr
     * @param {number} precedence
     * @param {number} flags
     */
    Identifier (expr, precedence, flags) {
        return generateIdentifier(expr);
    },

    /**
     * @param {import('estree').ImportDefaultSpecifier} expr
     * @param {number} precedence
     * @param {number} flags
     */
    ImportDefaultSpecifier (expr, precedence, flags) {
        return generateIdentifier(
            /* c8 ignore next 2 -- Guard */
            ('id' in expr && /** @type {{id: import('estree').Identifier}} */ (
                expr
            ).id) || expr.local
        );
    },

    /**
     * @param {import('estree').ImportNamespaceSpecifier} expr
     * @param {number} precedence
     * @param {number} flags
     */
    ImportNamespaceSpecifier (expr, precedence, flags) {
        const result = ['*'];
        const id = /** @type {import('estree').Identifier} */ (
            /* c8 ignore next -- Guard */
            'id' in expr && expr.id
        ) || expr.local;
        if (id) {
            result.push(`${space}as${noEmptySpace()}${generateIdentifier(id)}`);
        }
        return result;
    },

    /**
     * @param {import('estree').ImportSpecifier} expr
     * @param {number} precedence
     * @param {number} flags
     */
    ImportSpecifier (expr, precedence, flags) {
        // eslint-disable-next-line prefer-destructuring -- TS
        const imported = /** @type {import('estree').Identifier} */ (expr.imported);
        const result = [ imported.name ];
        const { local } = expr;
        if (local && local.name !== imported.name) {
            result.push(`${noEmptySpace()}as${noEmptySpace()}${generateIdentifier(local)}`);
        }
        return result;
    },

    /**
     * @param {import('estree').ExportSpecifier} expr
     * @param {number} precedence
     * @param {number} flags
     */
    ExportSpecifier (expr, precedence, flags) {
        // eslint-disable-next-line prefer-destructuring -- TS
        const local = /** @type {import('estree').Identifier} */ (expr.local);
        const result = [ local.name ];
        // eslint-disable-next-line prefer-destructuring -- TS
        const exported = /** @type {import('estree').Identifier} */ (expr.exported);
        if (exported && exported.name !== local.name) {
            result.push(`${noEmptySpace()}as${noEmptySpace()}${generateIdentifier(exported)}`);
        }
        return result;
    },

    /**
     * @param {import('estree').Literal & {
     *   bigint?: string,
     *   regex?: {
     *     pattern: string,
     *     flags: string
     *   }
     * }} expr
     * @param {number} precedence
     * @param {number} flags
     */
    Literal (expr, precedence, flags) {
        let raw;
        if (Object.hasOwn(expr, 'raw') && parse && extra.raw) {
            try {
                raw = /** @type {import('estree').Directive} */ (
                    parse(/** @type {string} */ (expr.raw)).body[0]
                ).expression;
                if (raw.type === Syntax.Literal) {
                    if (raw.value === expr.value) {
                        return expr.raw;
                    }
                }
            // eslint-disable-next-line no-unused-vars -- Ok
            } catch (e) {
                // not use raw property
            }
        }

        if (expr.regex) {
            return `/${expr.regex.pattern}/${expr.regex.flags}`;
        }

        if (typeof expr.value === 'bigint') {
            return `${expr.value.toString()}n`;
        }

        // `expr.value` can be null if `expr.bigint` exists. We need to check
        // `expr.bigint` first.
        if (expr.bigint) {
            return `${expr.bigint}n`;
        }

        if (expr.value === null) {
            return 'null';
        }

        if (typeof expr.value === 'string') {
            return escapeString(expr.value);
        }

        if (typeof expr.value === 'number') {
            return generateNumber(expr.value);
        }

        if (typeof expr.value === 'boolean') {
            return expr.value ? 'true' : 'false';
        }

        return generateRegExp(/** @type {RegExp} */ (expr.value));
    },

    /**
     * @param {import('estree').Node} expr
     * @param {number} precedence
     * @param {number} flags
     */
    GeneratorExpression (expr, precedence, flags) {
        // @ts-expect-error See comments under `Object.assign` of prototypes below
        return this.ComprehensionExpression(expr, precedence, flags);
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').Node & {
     *   body: import('estree').Expression
     *   blocks: import('estree').Expression[]
     *   filter?: import('estree').Expression
     * }} expr
     * @param {number} precedence
     * @param {number} flags
     */
    ComprehensionExpression (expr, precedence, flags) {
        // GeneratorExpression should be parenthesized with (...), ComprehensionExpression with [...]
        // Due to https://bugzilla.mozilla.org/show_bug.cgi?id=883468 position of expr.body can differ in Spidermonkey and ES6

        /** @type {NestedStringArray} */
        let result = (expr.type === Syntax.GeneratorExpression) ? ['('] : ['['];

        if (extra.moz.comprehensionExpressionStartsWithAssignment) {
            const fragment = this.generateExpression(expr.body, Precedence.Assignment, E_TTT);
            result.push(fragment);
        }

        if (expr.blocks) {
            const that = this;
            withIndent(function () {
                for (let i = 0, iz = expr.blocks.length; i < iz; ++i) {
                    const fragment = that.generateExpression(expr.blocks[i], Precedence.Sequence, E_TTT);
                    if (i > 0 || extra.moz.comprehensionExpressionStartsWithAssignment) {
                        result = join(result, fragment);
                    } else {
                        result.push(fragment);
                    }
                }
            });
        }

        if (expr.filter) {
            result = join(result, `if${space}`);
            const fragment = this.generateExpression(expr.filter, Precedence.Sequence, E_TTT);
            result = join(result, [ '(', fragment, ')' ]);
        }

        if (!extra.moz.comprehensionExpressionStartsWithAssignment) {
            const fragment = this.generateExpression(expr.body, Precedence.Assignment, E_TTT);

            result = join(result, fragment);
        }

        result.push((expr.type === Syntax.GeneratorExpression) ? ')' : ']');
        return result;
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').Node & {
     *   left: import('estree').VariableDeclaration|import('estree').Expression,
     *   of: boolean,
     *   right: import('estree').Expression
     * }} expr
     * @param {number} precedence
     * @param {number} flags
     */
    ComprehensionBlock (expr, precedence, flags) {
        let fragment;
        if (expr.left.type === Syntax.VariableDeclaration) {
            fragment = [
                /** @type {import('estree').VariableDeclaration} */
                (expr.left).kind, noEmptySpace(),
                this.generateStatement(
                    /** @type {import('estree').VariableDeclaration} */
                    (expr.left).declarations[0],
                    S_FFFF
                )
            ];
        } else {
            fragment = this.generateExpression(expr.left, Precedence.Call, E_TTT);
        }

        fragment = join(fragment, expr.of ? 'of' : 'in');
        fragment = join(fragment, this.generateExpression(expr.right, Precedence.Sequence, E_TTT));

        return [ `for${space}(`, fragment, ')' ];
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').SpreadElement} expr
     * @param {number} precedence
     * @param {number} flags
     */
    SpreadElement (expr, precedence, flags) {
        return [
            '...',
            this.generateExpression(expr.argument, Precedence.Assignment, E_TTT)
        ];
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').TaggedTemplateExpression} expr
     * @param {number} precedence
     * @param {number} flags
     */
    TaggedTemplateExpression (expr, precedence, flags) {
        let itemFlags = E_TTF;
        if (!(flags & F_ALLOW_CALL)) {
            itemFlags = E_TFF;
        }
        const result = [
            this.generateExpression(expr.tag, Precedence.Call, itemFlags),
            this.generateExpression(expr.quasi, Precedence.Primary, E_FFT)
        ];
        return parenthesize(result, Precedence.TaggedTemplate, precedence);
    },

    /**
     * @param {import('estree').TemplateElement} expr
     * @param {number} precedence
     * @param {number} flags
     */
    TemplateElement (expr, precedence, flags) {
        // Don't use "cooked". Since tagged template can use raw template
        // representation. So if we do so, it breaks the script semantics.
        return json ? JSON.stringify(expr.value.raw).slice(1, -1) : expr.value.raw;
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').TemplateLiteral} expr
     * @param {number} precedence
     * @param {number} flags
     */
    TemplateLiteral (expr, precedence, flags) {
        const safeConvertToJson = json && expr.quasis.length === 1;

        /** @type {(string | import('source-map').SourceNode)[]} */
        const result = [ safeConvertToJson ? '"' : '`' ];
        for (let i = 0, iz = expr.quasis.length; i < iz; ++i) {
            result.push(this.generateExpression(
                /** @type {import('estree').Expression} */
                (/** @type {unknown} */ (expr.quasis[i])),
                Precedence.Primary,
                E_TTT
            ));
            if (i + 1 < iz) {
                result.push(`\${${space}`);
                result.push(this.generateExpression(expr.expressions[i], Precedence.Sequence, E_TTT));
                result.push(`${space}}`);
            }
        }
        result.push(safeConvertToJson ? '"' : '`');
        return result;
    },

    /**
     * @param {import('estree').Literal} expr
     * @param {number} precedence
     * @param {number} flags
     */
    ModuleSpecifier (expr, precedence, flags) {
        return this.Literal(expr, precedence, flags);
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').ImportExpression} expr
     * @param {number} precedence
     * @param {number} flag
     */
    ImportExpression(expr, precedence, flag) {
        return parenthesize([
            'import(',
            this.generateExpression(expr.source, Precedence.Assignment, E_TTT),
            ')'
        ], Precedence.Call, precedence);
    }
};

class CodeGenerator {

    // Helpers.

    /**
     * @param {import('estree').Statement} stmt
     * @param {number} flags
     */
    maybeBlock (stmt, flags) {
        const noLeadingComment = !extra.comment || !stmt.leadingComments;

        if (stmt.type === Syntax.BlockStatement && noLeadingComment) {
            return [space, this.generateStatement(stmt, flags)];
        }

        if (stmt.type === Syntax.EmptyStatement && noLeadingComment) {
            return ';';
        }

        const that = this;

        /** @type {NestedStringArray} */
        let result = [];
        withIndent(function () {
            result = [
                newline,
                addIndent(that.generateStatement(stmt, flags))
            ];
        });

        return result;
    }

    /**
     * @param {import('estree').Statement} stmt
     * @param {StringOrSourceNodeOrArray} result
     */
    maybeBlockSuffix (stmt, result) {
        const ends = endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString());
        if (stmt.type === Syntax.BlockStatement && (!extra.comment || !stmt.leadingComments) && !ends) {
            return [result, space];
        }
        if (ends) {
            return [result, base];
        }
        return [result, newline, base];
    }

    /**
     * @param {import('estree').Node} node
     * @param {number} [precedence]
     * @param {number} [flags]
     */
    generatePattern (node, precedence, flags) {
        if (node.type === Syntax.Identifier) {
            return generateIdentifier(/** @type {import('estree').Identifier} */ (node));
        }
        return this.generateExpression(/** @type {import('estree').Expression} */ (node), precedence, flags);
    }

    /**
     * @param {(import('estree').ArrowFunctionExpression|import('estree').FunctionExpression|
     *   import('estree').FunctionDeclaration) & {
     *   rest?: import('estree').Identifier,
     *   defaults?: import('estree').Node[]
     * }} node
     */
    generateFunctionParams (node) {
        /** @type {NestedStringArray} */
        let result;
        if (node.type === Syntax.ArrowFunctionExpression &&
                    !node.rest && (!node.defaults || node.defaults.length === 0) &&
                    node.params.length === 1 && node.params[0].type === Syntax.Identifier) {
            // arg => { } case
            result = [
                generateAsyncPrefix(node, true),
                generateIdentifier(/** @type {import('estree').Identifier} */ (
                    node.params[0]
                ))
            ];
        } else {
            result = node.type === Syntax.ArrowFunctionExpression
                ? [generateAsyncPrefix(node, false)]
                : [];
            result.push('(');

            let hasDefault = false;
            if (node.defaults) {
                hasDefault = true;
            }
            for (let i = 0, iz = node.params.length; i < iz; ++i) {
                if (hasDefault && node.defaults && node.defaults[i]) {
                    // Handle default values.
                    result.push(this.generateAssignment(node.params[i], node.defaults[i], '=', Precedence.Assignment, E_TTT));
                } else {
                    result.push(this.generatePattern(node.params[i], Precedence.Assignment, E_TTT));
                }
                if (i + 1 < iz) {
                    result.push(`,${space}`);
                }
            }

            if (node.rest) {
                if (node.params.length) {
                    result.push(`,${space}`);
                }
                result.push('...');
                result.push(generateIdentifier(node.rest));
            }

            result.push(')');
        }

        return result;
    }

    /**
     * @param {import('estree').ArrowFunctionExpression|
     *   import('estree').FunctionExpression|
     *   import('estree').FunctionDeclaration} node
     */
    generateFunctionBody (node) {
        const result = this.generateFunctionParams(node);

        if (node.type === Syntax.ArrowFunctionExpression) {
            result.push(space);
            result.push('=>');
        }

        if ('expression' in node && node.expression) {
            result.push(space);
            /** @type {string | import('source-map').SourceNode | NestedStringArray} */
            let expr = this.generateExpression(
                /** @type {import('estree').Expression} */
                (node.body),
                Precedence.Assignment,
                E_TTT
            );
            if (expr.toString().charAt(0) === '{') {
                expr = ['(', expr, ')'];
            }
            result.push(expr);
        } else {
            result.push(this.maybeBlock(
                /** @type {import('estree').BlockStatement} */
                (node.body),
                S_TTFF
            ));
        }

        return result;
    }

    /**
     * @param {"in"|"of"} operator
     * @param {import('estree').ForInStatement|import('estree').ForOfStatement} stmt
     * @param {number} flags
     */
    generateIterationForStatement (operator, stmt, flags) {
        const that = this;

        /** @type {NestedStringArray} */
        let result = [`for${'await' in stmt && stmt.await ? `${noEmptySpace()}await` : ''}${space}(`];
        withIndent(function () {
            if (stmt.left.type === Syntax.VariableDeclaration) {
                withIndent(function () {
                    result.push(/** @type {import('estree').VariableDeclaration} */ (
                        stmt.left
                    ).kind + noEmptySpace());
                    result.push(that.generateStatement(
                        /** @type {import('estree').VariableDeclaration} */
                        (stmt.left).declarations[0],
                        S_FFFF
                    ));
                });
            } else {
                result.push(that.generateExpression(
                    /** @type {import('estree').Pattern} */
                    (stmt.left),
                    Precedence.Call,
                    E_TTT
                ));
            }

            result = join(result, operator);
            result = [join(
                result,
                that.generateExpression(stmt.right, Precedence.Assignment, E_TTT)
            ), ')'];
        });
        result.push(this.maybeBlock(stmt.body, flags));
        return result;
    }

    /**
     * @param {import('estree').Expression|import('estree').PrivateIdentifier} expr
     * @param {boolean} computed
     */
    generatePropertyKey (expr, computed) {
        const result = [];

        if (computed) {
            result.push('[');
        }

        const expression = this.generateExpression(expr, Precedence.Assignment, E_TTT);

        if (json && typeof expression === 'string' && expression[0] !== '"') {
            result.push('"');
            result.push(expression);
            result.push('"');
        } else {
            result.push(expression);
        }

        if (computed) {
            result.push(']');
        }

        return result;
    }

    /**
     * @param {import('estree').Pattern} left
     * @param {import('estree').Node} right
     * @param {import('estree').AssignmentOperator} operator
     * @param {number} precedence
     * @param {number} flags
     */
    generateAssignment (left, right, operator, precedence, flags) {
        if (Precedence.Assignment < precedence) {
            flags |= F_ALLOW_IN;
        }

        return parenthesize(
            [
                this.generateExpression(left, Precedence.Call, flags),
                space + operator + space,
                this.generateExpression(right, Precedence.Assignment, flags)
            ],
            Precedence.Assignment,
            precedence
        );
    }

    /**
     * @param {number} flags
     */
    semicolon (flags) {
        if (!semicolons && flags & F_SEMICOLON_OPT) {
            return '';
        }
        return ';';
    }

    /**
     * @param {import('estree').Node|import('estree').MaybeNamedClassDeclaration|import('estree').MaybeNamedFunctionDeclaration} expr
     * @param {number|undefined} precedence
     * @param {number|undefined} flags
     * @returns {string | import('source-map').SourceNode}
     */
    generateExpression (expr, precedence, flags) {
        const type = expr.type || Syntax.Property;

        if (extra.verbatim && Object.hasOwn(expr, extra.verbatim)) {
            return generateVerbatim(expr, precedence);
        }

        // @ts-expect-error See comments under `Object.assign` of prototypes below
        let result = this[type](expr, precedence, flags);
        let typeCast;
        if ('jsdoc' in expr && expr.jsdoc) {
            // eslint-disable-next-line prefer-destructuring -- TS
            const jsdoc = /** @type {import('@es-joy/jsdoccomment').JsdocBlock} */ (expr.jsdoc);
            typeCast = expr.type !== 'Property' && !jsdoc.endLine &&
                jsdoc.tags.some((tag) => {
                    return tag.tag === 'type';
                });
            if (typeCast) {
                result = ['(', result];
            }
            result = addJsdoc(/** @type {((stmt: import('@es-joy/jsdoccomment').JsdocBlock) => string)} */ (
                this.JsdocBlock
            )(jsdoc), result);
        }
        if (extra.comment) {
            result = addComments(expr, result);
        }

        if (typeCast) {
            result.push(')');
        }
        result = toSourceNodeWhenNeeded(result, expr);
        return result;
    }

    /**
     * @param {(import('estree').Node|import('estree').MaybeNamedClassDeclaration|import('estree').MaybeNamedFunctionDeclaration) & {
     *   jsdoc?: import('@es-joy/jsdoccomment').JsdocBlock
     * }} stmt
     * @param {number} flags
     */
    generateStatement (stmt, flags) {
        // @ts-expect-error See comments under `Object.assign` of prototypes below
        let result = this[stmt.type](stmt, flags);
        if (stmt.jsdoc && this.JsdocBlock) {
            result = addJsdoc(this.JsdocBlock(stmt.jsdoc), result);
        }

        // Attach comments

        if (extra.comment) {
            result = addComments(stmt, result);
        }

        const fragment = toSourceNodeWhenNeeded(result).toString();
        if (stmt.type === Syntax.Program && !safeConcatenation && newline === '' &&  fragment.charAt(fragment.length - 1) === '\n') {
            result = sourceMap
                ? /** @type {import('source-map').SourceNode} */ (
                    toSourceNodeWhenNeeded(result)
                ).replaceRight(/\s+$/.source, '')
                : fragment.replace(/\s+$/, '');
        }

        return toSourceNodeWhenNeeded(result, stmt);
    }
}

/** @type {((stmt: import('@es-joy/jsdoccomment').JsdocBlock) => string)|null} */
CodeGenerator.prototype.JsdocBlock = null;

// Statements.

CodeGenerator.Statement = Statement;

// TypeScript unfortunately does not recognize this, so our `this` values are off;
//   setting them dynamically or even manually doesn't work
Object.assign(CodeGenerator.prototype, CodeGenerator.Statement);

// Expressions.

CodeGenerator.Expression = Expression;

// TypeScript unfortunately does not recognize this, so our `this` values are off;
//   setting them dynamically or even manually doesn't work
Object.assign(CodeGenerator.prototype, CodeGenerator.Expression);

/**
 * @param {import('estree').Node} node
 * @param {typeof codegenFactory} codegenFactory
 */
function generateInternal(node, codegenFactory) {
    const codegen = codegenFactory();
    if (isStatement(node)) {
        return codegen.generateStatement(node, S_TFFF);
    }

    if (isExpression(node)) {
        return codegen.generateExpression(node, Precedence.Sequence, E_TTT);
    }

    throw new Error(`Unknown node type: ${node.type}`);
}

/**
 * @typedef {{
 *  file?: string,
 *  sourceContent?: string,
 *  indent: null,
 *  base: null,
 *  parse: null,
 *  comment: boolean,
 *  codegenFactory: () => CodeGenerator,
 *  format: {
 *    indent: {
 *      style: string,
 *      base: number,
 *      adjustMultilineComment: boolean
 *    },
 *    newline: string,
 *    space: string,
 *    json: boolean,
 *    renumber: boolean,
 *    hexadecimal: boolean,
 *    quotes: 'single'|'double'|'auto',
 *    escapeless: boolean,
 *    compact: boolean,
 *    parentheses: boolean,
 *    semicolons: boolean,
 *    safeConcatenation: boolean,
 *    preserveBlankLines: boolean
 *  },
 *  moz: {
 *    comprehensionExpressionStartsWithAssignment: boolean,
 *    starlessGenerator: boolean
 *  },
 *  sourceMap: null,
 *  sourceMapRoot: null,
 *  sourceMapWithCode: boolean,
 *  directive: boolean,
 *  raw: boolean,
 *  verbatim: null,
 *  sourceCode: null
 * }} GenerateOptions
 */

/**
 * @param {import('estree').Node} node
 * @param {GenerateOptions} options
 */
function generate(node, options) {
    const defaultOptions = getDefaultOptions();

    if (options != null) {
        // Obsolete options
        //
        //   `options.indent`
        //   `options.base`
        //
        // Instead of them, we can use `option.format.indent`.
        if (typeof options.indent === 'string') {
            defaultOptions.format.indent.style = options.indent;
        }
        if (typeof options.base === 'number') {
            defaultOptions.format.indent.base = options.base;
        }
        options = updateDeeply(defaultOptions, options);
        indent = options.format.indent.style;
        if (typeof options.base === 'string') {
            ({ base } = options);
        } else {
            base = stringRepeat(indent, options.format.indent.base);
        }
    } else {
        options = defaultOptions;
        indent = options.format.indent.style;
        base = stringRepeat(indent, options.format.indent.base);
    }
    ({
        json, renumber, escapeless, newline, space, parentheses, semicolons,
        safeConcatenation
    } = options.format);
    hexadecimal = json ? false : options.format.hexadecimal;
    quotes = json ? 'double' : options.format.quotes;
    if (options.format.compact) {
        newline = space = indent = base = '';
    }
    ({ directive, sourceMap, sourceCode, codegenFactory } = options);
    parse = json ? null : options.parse;
    preserveBlankLines = options.format.preserveBlankLines && sourceCode !== null;
    extra = options;

    if (sourceMap && generate.sourceMapModule) {
        ({ SourceNode } = generate.sourceMapModule);
    }

    const result = generateInternal(node, codegenFactory);

    let pair;
    if (!sourceMap) {
        pair = { code: result.toString(), map: null };
        return options.sourceMapWithCode ? pair : pair.code;
    }


    pair = result.toStringWithSourceMap({
        file: options.file,
        sourceRoot: options.sourceMapRoot
    });

    if (options.sourceContent) {
        pair.map.setSourceContent(options.sourceMap,
            options.sourceContent);
    }

    if (options.sourceMapWithCode) {
        return pair;
    }

    return pair.map.toString();
}

/** @type {import('source-map')|null} */
generate.sourceMapModule = null;

const FORMAT_MINIFY = {
    indent: {
        style: '',
        base: 0
    },
    renumber: true,
    hexadecimal: true,
    quotes: 'auto',
    escapeless: true,
    compact: true,
    parentheses: false,
    semicolons: false
};

const FORMAT_DEFAULTS = getDefaultOptions().format;

const PrecedenceCopy = updateDeeply({}, Precedence);
const { attachComments } = estraverse;

const version = '4.1.0';

/* vim: set sw=4 ts=4 et tw=80 : */

generate.sourceMapModule = sourceMap$2;

const browser = false;

exports.CodeGenerator = CodeGenerator;
exports.FORMAT_DEFAULTS = FORMAT_DEFAULTS;
exports.FORMAT_MINIFY = FORMAT_MINIFY;
exports.Precedence = PrecedenceCopy;
exports.attachComments = attachComments;
exports.browser = browser;
exports.generate = generate;
exports.version = version;
//# sourceMappingURL=escodegen.cjs.map

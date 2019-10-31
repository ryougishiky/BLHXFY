// ==UserScript==
// @name         碧蓝幻想翻译兼容版
// @namespace    https://github.com/biuuu/BLHXFY
// @version      1.9.12
// @description  碧蓝幻想的汉化脚本，提交新翻译请到 https://github.com/biuuu/BLHXFY
// @icon         http://game.granbluefantasy.jp/favicon.ico
// @author       biuuu
// @match        *://game.granbluefantasy.jp/*
// @match        *://gbf.game.mbga.jp/*
// @run-at       document-body
// @grant        GM_xmlhttpRequest
// @connect      translate.google.cn
// @connect      api.interpreter.caiyunai.com
// @connect      fanyi.baidu.com
// @updateURL    https://blhx.danmu9.com/blhxfy/extension.es5.user.js
// @supportURL   https://github.com/biuuu/BLHXFY/issues
// ==/UserScript==
(function () {
  'use strict';

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
          args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var punycode = createCommonjsModule(function (module, exports) {
  (function(root) {

  	/** Detect free variables */
  	var freeExports =  exports &&
  		!exports.nodeType && exports;
  	var freeModule =  module &&
  		!module.nodeType && module;
  	var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal;
  	if (
  		freeGlobal.global === freeGlobal ||
  		freeGlobal.window === freeGlobal ||
  		freeGlobal.self === freeGlobal
  	) {
  		root = freeGlobal;
  	}

  	/**
  	 * The `punycode` object.
  	 * @name punycode
  	 * @type Object
  	 */
  	var punycode,

  	/** Highest positive signed 32-bit float value */
  	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

  	/** Bootstring parameters */
  	base = 36,
  	tMin = 1,
  	tMax = 26,
  	skew = 38,
  	damp = 700,
  	initialBias = 72,
  	initialN = 128, // 0x80
  	delimiter = '-', // '\x2D'

  	/** Regular expressions */
  	regexPunycode = /^xn--/,
  	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
  	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

  	/** Error messages */
  	errors = {
  		'overflow': 'Overflow: input needs wider integers to process',
  		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
  		'invalid-input': 'Invalid input'
  	},

  	/** Convenience shortcuts */
  	baseMinusTMin = base - tMin,
  	floor = Math.floor,
  	stringFromCharCode = String.fromCharCode,

  	/** Temporary variable */
  	key;

  	/*--------------------------------------------------------------------------*/

  	/**
  	 * A generic error utility function.
  	 * @private
  	 * @param {String} type The error type.
  	 * @returns {Error} Throws a `RangeError` with the applicable error message.
  	 */
  	function error(type) {
  		throw new RangeError(errors[type]);
  	}

  	/**
  	 * A generic `Array#map` utility function.
  	 * @private
  	 * @param {Array} array The array to iterate over.
  	 * @param {Function} callback The function that gets called for every array
  	 * item.
  	 * @returns {Array} A new array of values returned by the callback function.
  	 */
  	function map(array, fn) {
  		var length = array.length;
  		var result = [];
  		while (length--) {
  			result[length] = fn(array[length]);
  		}
  		return result;
  	}

  	/**
  	 * A simple `Array#map`-like wrapper to work with domain name strings or email
  	 * addresses.
  	 * @private
  	 * @param {String} domain The domain name or email address.
  	 * @param {Function} callback The function that gets called for every
  	 * character.
  	 * @returns {Array} A new string of characters returned by the callback
  	 * function.
  	 */
  	function mapDomain(string, fn) {
  		var parts = string.split('@');
  		var result = '';
  		if (parts.length > 1) {
  			// In email addresses, only the domain name should be punycoded. Leave
  			// the local part (i.e. everything up to `@`) intact.
  			result = parts[0] + '@';
  			string = parts[1];
  		}
  		// Avoid `split(regex)` for IE8 compatibility. See #17.
  		string = string.replace(regexSeparators, '\x2E');
  		var labels = string.split('.');
  		var encoded = map(labels, fn).join('.');
  		return result + encoded;
  	}

  	/**
  	 * Creates an array containing the numeric code points of each Unicode
  	 * character in the string. While JavaScript uses UCS-2 internally,
  	 * this function will convert a pair of surrogate halves (each of which
  	 * UCS-2 exposes as separate characters) into a single code point,
  	 * matching UTF-16.
  	 * @see `punycode.ucs2.encode`
  	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
  	 * @memberOf punycode.ucs2
  	 * @name decode
  	 * @param {String} string The Unicode input string (UCS-2).
  	 * @returns {Array} The new array of code points.
  	 */
  	function ucs2decode(string) {
  		var output = [],
  		    counter = 0,
  		    length = string.length,
  		    value,
  		    extra;
  		while (counter < length) {
  			value = string.charCodeAt(counter++);
  			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
  				// high surrogate, and there is a next character
  				extra = string.charCodeAt(counter++);
  				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
  					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
  				} else {
  					// unmatched surrogate; only append this code unit, in case the next
  					// code unit is the high surrogate of a surrogate pair
  					output.push(value);
  					counter--;
  				}
  			} else {
  				output.push(value);
  			}
  		}
  		return output;
  	}

  	/**
  	 * Creates a string based on an array of numeric code points.
  	 * @see `punycode.ucs2.decode`
  	 * @memberOf punycode.ucs2
  	 * @name encode
  	 * @param {Array} codePoints The array of numeric code points.
  	 * @returns {String} The new Unicode string (UCS-2).
  	 */
  	function ucs2encode(array) {
  		return map(array, function(value) {
  			var output = '';
  			if (value > 0xFFFF) {
  				value -= 0x10000;
  				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
  				value = 0xDC00 | value & 0x3FF;
  			}
  			output += stringFromCharCode(value);
  			return output;
  		}).join('');
  	}

  	/**
  	 * Converts a basic code point into a digit/integer.
  	 * @see `digitToBasic()`
  	 * @private
  	 * @param {Number} codePoint The basic numeric code point value.
  	 * @returns {Number} The numeric value of a basic code point (for use in
  	 * representing integers) in the range `0` to `base - 1`, or `base` if
  	 * the code point does not represent a value.
  	 */
  	function basicToDigit(codePoint) {
  		if (codePoint - 48 < 10) {
  			return codePoint - 22;
  		}
  		if (codePoint - 65 < 26) {
  			return codePoint - 65;
  		}
  		if (codePoint - 97 < 26) {
  			return codePoint - 97;
  		}
  		return base;
  	}

  	/**
  	 * Converts a digit/integer into a basic code point.
  	 * @see `basicToDigit()`
  	 * @private
  	 * @param {Number} digit The numeric value of a basic code point.
  	 * @returns {Number} The basic code point whose value (when used for
  	 * representing integers) is `digit`, which needs to be in the range
  	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
  	 * used; else, the lowercase form is used. The behavior is undefined
  	 * if `flag` is non-zero and `digit` has no uppercase form.
  	 */
  	function digitToBasic(digit, flag) {
  		//  0..25 map to ASCII a..z or A..Z
  		// 26..35 map to ASCII 0..9
  		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
  	}

  	/**
  	 * Bias adaptation function as per section 3.4 of RFC 3492.
  	 * https://tools.ietf.org/html/rfc3492#section-3.4
  	 * @private
  	 */
  	function adapt(delta, numPoints, firstTime) {
  		var k = 0;
  		delta = firstTime ? floor(delta / damp) : delta >> 1;
  		delta += floor(delta / numPoints);
  		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
  			delta = floor(delta / baseMinusTMin);
  		}
  		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
  	}

  	/**
  	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
  	 * symbols.
  	 * @memberOf punycode
  	 * @param {String} input The Punycode string of ASCII-only symbols.
  	 * @returns {String} The resulting string of Unicode symbols.
  	 */
  	function decode(input) {
  		// Don't use UCS-2
  		var output = [],
  		    inputLength = input.length,
  		    out,
  		    i = 0,
  		    n = initialN,
  		    bias = initialBias,
  		    basic,
  		    j,
  		    index,
  		    oldi,
  		    w,
  		    k,
  		    digit,
  		    t,
  		    /** Cached calculation results */
  		    baseMinusT;

  		// Handle the basic code points: let `basic` be the number of input code
  		// points before the last delimiter, or `0` if there is none, then copy
  		// the first basic code points to the output.

  		basic = input.lastIndexOf(delimiter);
  		if (basic < 0) {
  			basic = 0;
  		}

  		for (j = 0; j < basic; ++j) {
  			// if it's not a basic code point
  			if (input.charCodeAt(j) >= 0x80) {
  				error('not-basic');
  			}
  			output.push(input.charCodeAt(j));
  		}

  		// Main decoding loop: start just after the last delimiter if any basic code
  		// points were copied; start at the beginning otherwise.

  		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

  			// `index` is the index of the next character to be consumed.
  			// Decode a generalized variable-length integer into `delta`,
  			// which gets added to `i`. The overflow checking is easier
  			// if we increase `i` as we go, then subtract off its starting
  			// value at the end to obtain `delta`.
  			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

  				if (index >= inputLength) {
  					error('invalid-input');
  				}

  				digit = basicToDigit(input.charCodeAt(index++));

  				if (digit >= base || digit > floor((maxInt - i) / w)) {
  					error('overflow');
  				}

  				i += digit * w;
  				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

  				if (digit < t) {
  					break;
  				}

  				baseMinusT = base - t;
  				if (w > floor(maxInt / baseMinusT)) {
  					error('overflow');
  				}

  				w *= baseMinusT;

  			}

  			out = output.length + 1;
  			bias = adapt(i - oldi, out, oldi == 0);

  			// `i` was supposed to wrap around from `out` to `0`,
  			// incrementing `n` each time, so we'll fix that now:
  			if (floor(i / out) > maxInt - n) {
  				error('overflow');
  			}

  			n += floor(i / out);
  			i %= out;

  			// Insert `n` at position `i` of the output
  			output.splice(i++, 0, n);

  		}

  		return ucs2encode(output);
  	}

  	/**
  	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
  	 * Punycode string of ASCII-only symbols.
  	 * @memberOf punycode
  	 * @param {String} input The string of Unicode symbols.
  	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
  	 */
  	function encode(input) {
  		var n,
  		    delta,
  		    handledCPCount,
  		    basicLength,
  		    bias,
  		    j,
  		    m,
  		    q,
  		    k,
  		    t,
  		    currentValue,
  		    output = [],
  		    /** `inputLength` will hold the number of code points in `input`. */
  		    inputLength,
  		    /** Cached calculation results */
  		    handledCPCountPlusOne,
  		    baseMinusT,
  		    qMinusT;

  		// Convert the input in UCS-2 to Unicode
  		input = ucs2decode(input);

  		// Cache the length
  		inputLength = input.length;

  		// Initialize the state
  		n = initialN;
  		delta = 0;
  		bias = initialBias;

  		// Handle the basic code points
  		for (j = 0; j < inputLength; ++j) {
  			currentValue = input[j];
  			if (currentValue < 0x80) {
  				output.push(stringFromCharCode(currentValue));
  			}
  		}

  		handledCPCount = basicLength = output.length;

  		// `handledCPCount` is the number of code points that have been handled;
  		// `basicLength` is the number of basic code points.

  		// Finish the basic string - if it is not empty - with a delimiter
  		if (basicLength) {
  			output.push(delimiter);
  		}

  		// Main encoding loop:
  		while (handledCPCount < inputLength) {

  			// All non-basic code points < n have been handled already. Find the next
  			// larger one:
  			for (m = maxInt, j = 0; j < inputLength; ++j) {
  				currentValue = input[j];
  				if (currentValue >= n && currentValue < m) {
  					m = currentValue;
  				}
  			}

  			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
  			// but guard against overflow
  			handledCPCountPlusOne = handledCPCount + 1;
  			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
  				error('overflow');
  			}

  			delta += (m - n) * handledCPCountPlusOne;
  			n = m;

  			for (j = 0; j < inputLength; ++j) {
  				currentValue = input[j];

  				if (currentValue < n && ++delta > maxInt) {
  					error('overflow');
  				}

  				if (currentValue == n) {
  					// Represent delta as a generalized variable-length integer
  					for (q = delta, k = base; /* no condition */; k += base) {
  						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
  						if (q < t) {
  							break;
  						}
  						qMinusT = q - t;
  						baseMinusT = base - t;
  						output.push(
  							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
  						);
  						q = floor(qMinusT / baseMinusT);
  					}

  					output.push(stringFromCharCode(digitToBasic(q, 0)));
  					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
  					delta = 0;
  					++handledCPCount;
  				}
  			}

  			++delta;
  			++n;

  		}
  		return output.join('');
  	}

  	/**
  	 * Converts a Punycode string representing a domain name or an email address
  	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
  	 * it doesn't matter if you call it on a string that has already been
  	 * converted to Unicode.
  	 * @memberOf punycode
  	 * @param {String} input The Punycoded domain name or email address to
  	 * convert to Unicode.
  	 * @returns {String} The Unicode representation of the given Punycode
  	 * string.
  	 */
  	function toUnicode(input) {
  		return mapDomain(input, function(string) {
  			return regexPunycode.test(string)
  				? decode(string.slice(4).toLowerCase())
  				: string;
  		});
  	}

  	/**
  	 * Converts a Unicode string representing a domain name or an email address to
  	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
  	 * i.e. it doesn't matter if you call it with a domain that's already in
  	 * ASCII.
  	 * @memberOf punycode
  	 * @param {String} input The domain name or email address to convert, as a
  	 * Unicode string.
  	 * @returns {String} The Punycode representation of the given domain name or
  	 * email address.
  	 */
  	function toASCII(input) {
  		return mapDomain(input, function(string) {
  			return regexNonASCII.test(string)
  				? 'xn--' + encode(string)
  				: string;
  		});
  	}

  	/*--------------------------------------------------------------------------*/

  	/** Define the public API */
  	punycode = {
  		/**
  		 * A string representing the current Punycode.js version number.
  		 * @memberOf punycode
  		 * @type String
  		 */
  		'version': '1.3.2',
  		/**
  		 * An object of methods to convert from JavaScript's internal character
  		 * representation (UCS-2) to Unicode code points, and back.
  		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
  		 * @memberOf punycode
  		 * @type Object
  		 */
  		'ucs2': {
  			'decode': ucs2decode,
  			'encode': ucs2encode
  		},
  		'decode': decode,
  		'encode': encode,
  		'toASCII': toASCII,
  		'toUnicode': toUnicode
  	};

  	/** Expose `punycode` */
  	// Some AMD build optimizers, like r.js, check for specific condition patterns
  	// like the following:
  	if (freeExports && freeModule) {
  		if (module.exports == freeExports) {
  			// in Node.js, io.js, or RingoJS v0.8.0+
  			freeModule.exports = punycode;
  		} else {
  			// in Narwhal or RingoJS v0.7.0-
  			for (key in punycode) {
  				punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
  			}
  		}
  	} else {
  		// in Rhino or a web browser
  		root.punycode = punycode;
  	}

  }(commonjsGlobal));
  });

  var IPv6 = createCommonjsModule(function (module) {
  /*!
   * URI.js - Mutating URLs
   * IPv6 Support
   *
   * Version: 1.19.1
   *
   * Author: Rodney Rehm
   * Web: http://medialize.github.io/URI.js/
   *
   * Licensed under
   *   MIT License http://www.opensource.org/licenses/mit-license
   *
   */

  (function (root, factory) {
    // https://github.com/umdjs/umd/blob/master/returnExports.js
    if ( module.exports) {
      // Node
      module.exports = factory();
    } else {
      // Browser globals (root is window)
      root.IPv6 = factory(root);
    }
  }(commonjsGlobal, function (root) {

    /*
    var _in = "fe80:0000:0000:0000:0204:61ff:fe9d:f156";
    var _out = IPv6.best(_in);
    var _expected = "fe80::204:61ff:fe9d:f156";

    console.log(_in, _out, _expected, _out === _expected);
    */

    // save current IPv6 variable, if any
    var _IPv6 = root && root.IPv6;

    function bestPresentation(address) {
      // based on:
      // Javascript to test an IPv6 address for proper format, and to
      // present the "best text representation" according to IETF Draft RFC at
      // http://tools.ietf.org/html/draft-ietf-6man-text-addr-representation-04
      // 8 Feb 2010 Rich Brown, Dartware, LLC
      // Please feel free to use this code as long as you provide a link to
      // http://www.intermapper.com
      // http://intermapper.com/support/tools/IPV6-Validator.aspx
      // http://download.dartware.com/thirdparty/ipv6validator.js

      var _address = address.toLowerCase();
      var segments = _address.split(':');
      var length = segments.length;
      var total = 8;

      // trim colons (:: or ::a:b:c… or …a:b:c::)
      if (segments[0] === '' && segments[1] === '' && segments[2] === '') {
        // must have been ::
        // remove first two items
        segments.shift();
        segments.shift();
      } else if (segments[0] === '' && segments[1] === '') {
        // must have been ::xxxx
        // remove the first item
        segments.shift();
      } else if (segments[length - 1] === '' && segments[length - 2] === '') {
        // must have been xxxx::
        segments.pop();
      }

      length = segments.length;

      // adjust total segments for IPv4 trailer
      if (segments[length - 1].indexOf('.') !== -1) {
        // found a "." which means IPv4
        total = 7;
      }

      // fill empty segments them with "0000"
      var pos;
      for (pos = 0; pos < length; pos++) {
        if (segments[pos] === '') {
          break;
        }
      }

      if (pos < total) {
        segments.splice(pos, 1, '0000');
        while (segments.length < total) {
          segments.splice(pos, 0, '0000');
        }
      }

      // strip leading zeros
      var _segments;
      for (var i = 0; i < total; i++) {
        _segments = segments[i].split('');
        for (var j = 0; j < 3 ; j++) {
          if (_segments[0] === '0' && _segments.length > 1) {
            _segments.splice(0,1);
          } else {
            break;
          }
        }

        segments[i] = _segments.join('');
      }

      // find longest sequence of zeroes and coalesce them into one segment
      var best = -1;
      var _best = 0;
      var _current = 0;
      var current = -1;
      var inzeroes = false;
      // i; already declared

      for (i = 0; i < total; i++) {
        if (inzeroes) {
          if (segments[i] === '0') {
            _current += 1;
          } else {
            inzeroes = false;
            if (_current > _best) {
              best = current;
              _best = _current;
            }
          }
        } else {
          if (segments[i] === '0') {
            inzeroes = true;
            current = i;
            _current = 1;
          }
        }
      }

      if (_current > _best) {
        best = current;
        _best = _current;
      }

      if (_best > 1) {
        segments.splice(best, _best, '');
      }

      length = segments.length;

      // assemble remaining segments
      var result = '';
      if (segments[0] === '')  {
        result = ':';
      }

      for (i = 0; i < length; i++) {
        result += segments[i];
        if (i === length - 1) {
          break;
        }

        result += ':';
      }

      if (segments[length - 1] === '') {
        result += ':';
      }

      return result;
    }

    function noConflict() {
      /*jshint validthis: true */
      if (root.IPv6 === this) {
        root.IPv6 = _IPv6;
      }

      return this;
    }

    return {
      best: bestPresentation,
      noConflict: noConflict
    };
  }));
  });

  var SecondLevelDomains = createCommonjsModule(function (module) {
  /*!
   * URI.js - Mutating URLs
   * Second Level Domain (SLD) Support
   *
   * Version: 1.19.1
   *
   * Author: Rodney Rehm
   * Web: http://medialize.github.io/URI.js/
   *
   * Licensed under
   *   MIT License http://www.opensource.org/licenses/mit-license
   *
   */

  (function (root, factory) {
    // https://github.com/umdjs/umd/blob/master/returnExports.js
    if ( module.exports) {
      // Node
      module.exports = factory();
    } else {
      // Browser globals (root is window)
      root.SecondLevelDomains = factory(root);
    }
  }(commonjsGlobal, function (root) {

    // save current SecondLevelDomains variable, if any
    var _SecondLevelDomains = root && root.SecondLevelDomains;

    var SLD = {
      // list of known Second Level Domains
      // converted list of SLDs from https://github.com/gavingmiller/second-level-domains
      // ----
      // publicsuffix.org is more current and actually used by a couple of browsers internally.
      // downside is it also contains domains like "dyndns.org" - which is fine for the security
      // issues browser have to deal with (SOP for cookies, etc) - but is way overboard for URI.js
      // ----
      list: {
        'ac':' com gov mil net org ',
        'ae':' ac co gov mil name net org pro sch ',
        'af':' com edu gov net org ',
        'al':' com edu gov mil net org ',
        'ao':' co ed gv it og pb ',
        'ar':' com edu gob gov int mil net org tur ',
        'at':' ac co gv or ',
        'au':' asn com csiro edu gov id net org ',
        'ba':' co com edu gov mil net org rs unbi unmo unsa untz unze ',
        'bb':' biz co com edu gov info net org store tv ',
        'bh':' biz cc com edu gov info net org ',
        'bn':' com edu gov net org ',
        'bo':' com edu gob gov int mil net org tv ',
        'br':' adm adv agr am arq art ato b bio blog bmd cim cng cnt com coop ecn edu eng esp etc eti far flog fm fnd fot fst g12 ggf gov imb ind inf jor jus lel mat med mil mus net nom not ntr odo org ppg pro psc psi qsl rec slg srv tmp trd tur tv vet vlog wiki zlg ',
        'bs':' com edu gov net org ',
        'bz':' du et om ov rg ',
        'ca':' ab bc mb nb nf nl ns nt nu on pe qc sk yk ',
        'ck':' biz co edu gen gov info net org ',
        'cn':' ac ah bj com cq edu fj gd gov gs gx gz ha hb he hi hl hn jl js jx ln mil net nm nx org qh sc sd sh sn sx tj tw xj xz yn zj ',
        'co':' com edu gov mil net nom org ',
        'cr':' ac c co ed fi go or sa ',
        'cy':' ac biz com ekloges gov ltd name net org parliament press pro tm ',
        'do':' art com edu gob gov mil net org sld web ',
        'dz':' art asso com edu gov net org pol ',
        'ec':' com edu fin gov info med mil net org pro ',
        'eg':' com edu eun gov mil name net org sci ',
        'er':' com edu gov ind mil net org rochest w ',
        'es':' com edu gob nom org ',
        'et':' biz com edu gov info name net org ',
        'fj':' ac biz com info mil name net org pro ',
        'fk':' ac co gov net nom org ',
        'fr':' asso com f gouv nom prd presse tm ',
        'gg':' co net org ',
        'gh':' com edu gov mil org ',
        'gn':' ac com gov net org ',
        'gr':' com edu gov mil net org ',
        'gt':' com edu gob ind mil net org ',
        'gu':' com edu gov net org ',
        'hk':' com edu gov idv net org ',
        'hu':' 2000 agrar bolt casino city co erotica erotika film forum games hotel info ingatlan jogasz konyvelo lakas media news org priv reklam sex shop sport suli szex tm tozsde utazas video ',
        'id':' ac co go mil net or sch web ',
        'il':' ac co gov idf k12 muni net org ',
        'in':' ac co edu ernet firm gen gov i ind mil net nic org res ',
        'iq':' com edu gov i mil net org ',
        'ir':' ac co dnssec gov i id net org sch ',
        'it':' edu gov ',
        'je':' co net org ',
        'jo':' com edu gov mil name net org sch ',
        'jp':' ac ad co ed go gr lg ne or ',
        'ke':' ac co go info me mobi ne or sc ',
        'kh':' com edu gov mil net org per ',
        'ki':' biz com de edu gov info mob net org tel ',
        'km':' asso com coop edu gouv k medecin mil nom notaires pharmaciens presse tm veterinaire ',
        'kn':' edu gov net org ',
        'kr':' ac busan chungbuk chungnam co daegu daejeon es gangwon go gwangju gyeongbuk gyeonggi gyeongnam hs incheon jeju jeonbuk jeonnam k kg mil ms ne or pe re sc seoul ulsan ',
        'kw':' com edu gov net org ',
        'ky':' com edu gov net org ',
        'kz':' com edu gov mil net org ',
        'lb':' com edu gov net org ',
        'lk':' assn com edu gov grp hotel int ltd net ngo org sch soc web ',
        'lr':' com edu gov net org ',
        'lv':' asn com conf edu gov id mil net org ',
        'ly':' com edu gov id med net org plc sch ',
        'ma':' ac co gov m net org press ',
        'mc':' asso tm ',
        'me':' ac co edu gov its net org priv ',
        'mg':' com edu gov mil nom org prd tm ',
        'mk':' com edu gov inf name net org pro ',
        'ml':' com edu gov net org presse ',
        'mn':' edu gov org ',
        'mo':' com edu gov net org ',
        'mt':' com edu gov net org ',
        'mv':' aero biz com coop edu gov info int mil museum name net org pro ',
        'mw':' ac co com coop edu gov int museum net org ',
        'mx':' com edu gob net org ',
        'my':' com edu gov mil name net org sch ',
        'nf':' arts com firm info net other per rec store web ',
        'ng':' biz com edu gov mil mobi name net org sch ',
        'ni':' ac co com edu gob mil net nom org ',
        'np':' com edu gov mil net org ',
        'nr':' biz com edu gov info net org ',
        'om':' ac biz co com edu gov med mil museum net org pro sch ',
        'pe':' com edu gob mil net nom org sld ',
        'ph':' com edu gov i mil net ngo org ',
        'pk':' biz com edu fam gob gok gon gop gos gov net org web ',
        'pl':' art bialystok biz com edu gda gdansk gorzow gov info katowice krakow lodz lublin mil net ngo olsztyn org poznan pwr radom slupsk szczecin torun warszawa waw wroc wroclaw zgora ',
        'pr':' ac biz com edu est gov info isla name net org pro prof ',
        'ps':' com edu gov net org plo sec ',
        'pw':' belau co ed go ne or ',
        'ro':' arts com firm info nom nt org rec store tm www ',
        'rs':' ac co edu gov in org ',
        'sb':' com edu gov net org ',
        'sc':' com edu gov net org ',
        'sh':' co com edu gov net nom org ',
        'sl':' com edu gov net org ',
        'st':' co com consulado edu embaixada gov mil net org principe saotome store ',
        'sv':' com edu gob org red ',
        'sz':' ac co org ',
        'tr':' av bbs bel biz com dr edu gen gov info k12 name net org pol tel tsk tv web ',
        'tt':' aero biz cat co com coop edu gov info int jobs mil mobi museum name net org pro tel travel ',
        'tw':' club com ebiz edu game gov idv mil net org ',
        'mu':' ac co com gov net or org ',
        'mz':' ac co edu gov org ',
        'na':' co com ',
        'nz':' ac co cri geek gen govt health iwi maori mil net org parliament school ',
        'pa':' abo ac com edu gob ing med net nom org sld ',
        'pt':' com edu gov int net nome org publ ',
        'py':' com edu gov mil net org ',
        'qa':' com edu gov mil net org ',
        're':' asso com nom ',
        'ru':' ac adygeya altai amur arkhangelsk astrakhan bashkiria belgorod bir bryansk buryatia cbg chel chelyabinsk chita chukotka chuvashia com dagestan e-burg edu gov grozny int irkutsk ivanovo izhevsk jar joshkar-ola kalmykia kaluga kamchatka karelia kazan kchr kemerovo khabarovsk khakassia khv kirov koenig komi kostroma kranoyarsk kuban kurgan kursk lipetsk magadan mari mari-el marine mil mordovia mosreg msk murmansk nalchik net nnov nov novosibirsk nsk omsk orenburg org oryol penza perm pp pskov ptz rnd ryazan sakhalin samara saratov simbirsk smolensk spb stavropol stv surgut tambov tatarstan tom tomsk tsaritsyn tsk tula tuva tver tyumen udm udmurtia ulan-ude vladikavkaz vladimir vladivostok volgograd vologda voronezh vrn vyatka yakutia yamal yekaterinburg yuzhno-sakhalinsk ',
        'rw':' ac co com edu gouv gov int mil net ',
        'sa':' com edu gov med net org pub sch ',
        'sd':' com edu gov info med net org tv ',
        'se':' a ac b bd c d e f g h i k l m n o org p parti pp press r s t tm u w x y z ',
        'sg':' com edu gov idn net org per ',
        'sn':' art com edu gouv org perso univ ',
        'sy':' com edu gov mil net news org ',
        'th':' ac co go in mi net or ',
        'tj':' ac biz co com edu go gov info int mil name net nic org test web ',
        'tn':' agrinet com defense edunet ens fin gov ind info intl mincom nat net org perso rnrt rns rnu tourism ',
        'tz':' ac co go ne or ',
        'ua':' biz cherkassy chernigov chernovtsy ck cn co com crimea cv dn dnepropetrovsk donetsk dp edu gov if in ivano-frankivsk kh kharkov kherson khmelnitskiy kiev kirovograd km kr ks kv lg lugansk lutsk lviv me mk net nikolaev od odessa org pl poltava pp rovno rv sebastopol sumy te ternopil uzhgorod vinnica vn zaporizhzhe zhitomir zp zt ',
        'ug':' ac co go ne or org sc ',
        'uk':' ac bl british-library co cym gov govt icnet jet lea ltd me mil mod national-library-scotland nel net nhs nic nls org orgn parliament plc police sch scot soc ',
        'us':' dni fed isa kids nsn ',
        'uy':' com edu gub mil net org ',
        've':' co com edu gob info mil net org web ',
        'vi':' co com k12 net org ',
        'vn':' ac biz com edu gov health info int name net org pro ',
        'ye':' co com gov ltd me net org plc ',
        'yu':' ac co edu gov org ',
        'za':' ac agric alt bourse city co cybernet db edu gov grondar iaccess imt inca landesign law mil net ngo nis nom olivetti org pix school tm web ',
        'zm':' ac co com edu gov net org sch ',
        // https://en.wikipedia.org/wiki/CentralNic#Second-level_domains
        'com': 'ar br cn de eu gb gr hu jpn kr no qc ru sa se uk us uy za ',
        'net': 'gb jp se uk ',
        'org': 'ae',
        'de': 'com '
      },
      // gorhill 2013-10-25: Using indexOf() instead Regexp(). Significant boost
      // in both performance and memory footprint. No initialization required.
      // http://jsperf.com/uri-js-sld-regex-vs-binary-search/4
      // Following methods use lastIndexOf() rather than array.split() in order
      // to avoid any memory allocations.
      has: function(domain) {
        var tldOffset = domain.lastIndexOf('.');
        if (tldOffset <= 0 || tldOffset >= (domain.length-1)) {
          return false;
        }
        var sldOffset = domain.lastIndexOf('.', tldOffset-1);
        if (sldOffset <= 0 || sldOffset >= (tldOffset-1)) {
          return false;
        }
        var sldList = SLD.list[domain.slice(tldOffset+1)];
        if (!sldList) {
          return false;
        }
        return sldList.indexOf(' ' + domain.slice(sldOffset+1, tldOffset) + ' ') >= 0;
      },
      is: function(domain) {
        var tldOffset = domain.lastIndexOf('.');
        if (tldOffset <= 0 || tldOffset >= (domain.length-1)) {
          return false;
        }
        var sldOffset = domain.lastIndexOf('.', tldOffset-1);
        if (sldOffset >= 0) {
          return false;
        }
        var sldList = SLD.list[domain.slice(tldOffset+1)];
        if (!sldList) {
          return false;
        }
        return sldList.indexOf(' ' + domain.slice(0, tldOffset) + ' ') >= 0;
      },
      get: function(domain) {
        var tldOffset = domain.lastIndexOf('.');
        if (tldOffset <= 0 || tldOffset >= (domain.length-1)) {
          return null;
        }
        var sldOffset = domain.lastIndexOf('.', tldOffset-1);
        if (sldOffset <= 0 || sldOffset >= (tldOffset-1)) {
          return null;
        }
        var sldList = SLD.list[domain.slice(tldOffset+1)];
        if (!sldList) {
          return null;
        }
        if (sldList.indexOf(' ' + domain.slice(sldOffset+1, tldOffset) + ' ') < 0) {
          return null;
        }
        return domain.slice(sldOffset+1);
      },
      noConflict: function(){
        if (root.SecondLevelDomains === this) {
          root.SecondLevelDomains = _SecondLevelDomains;
        }
        return this;
      }
    };

    return SLD;
  }));
  });

  var URI = createCommonjsModule(function (module) {
  /*!
   * URI.js - Mutating URLs
   *
   * Version: 1.19.1
   *
   * Author: Rodney Rehm
   * Web: http://medialize.github.io/URI.js/
   *
   * Licensed under
   *   MIT License http://www.opensource.org/licenses/mit-license
   *
   */
  (function (root, factory) {
    // https://github.com/umdjs/umd/blob/master/returnExports.js
    if ( module.exports) {
      // Node
      module.exports = factory(punycode, IPv6, SecondLevelDomains);
    } else {
      // Browser globals (root is window)
      root.URI = factory(root.punycode, root.IPv6, root.SecondLevelDomains, root);
    }
  }(commonjsGlobal, function (punycode, IPv6, SLD, root) {
    /*global location, escape, unescape */
    // FIXME: v2.0.0 renamce non-camelCase properties to uppercase
    /*jshint camelcase: false */

    // save current URI variable, if any
    var _URI = root && root.URI;

    function URI(url, base) {
      var _urlSupplied = arguments.length >= 1;
      var _baseSupplied = arguments.length >= 2;

      // Allow instantiation without the 'new' keyword
      if (!(this instanceof URI)) {
        if (_urlSupplied) {
          if (_baseSupplied) {
            return new URI(url, base);
          }

          return new URI(url);
        }

        return new URI();
      }

      if (url === undefined) {
        if (_urlSupplied) {
          throw new TypeError('undefined is not a valid argument for URI');
        }

        if (typeof location !== 'undefined') {
          url = location.href + '';
        } else {
          url = '';
        }
      }

      if (url === null) {
        if (_urlSupplied) {
          throw new TypeError('null is not a valid argument for URI');
        }
      }

      this.href(url);

      // resolve to base according to http://dvcs.w3.org/hg/url/raw-file/tip/Overview.html#constructor
      if (base !== undefined) {
        return this.absoluteTo(base);
      }

      return this;
    }

    function isInteger(value) {
      return /^[0-9]+$/.test(value);
    }

    URI.version = '1.19.1';

    var p = URI.prototype;
    var hasOwn = Object.prototype.hasOwnProperty;

    function escapeRegEx(string) {
      // https://github.com/medialize/URI.js/commit/85ac21783c11f8ccab06106dba9735a31a86924d#commitcomment-821963
      return string.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
    }

    function getType(value) {
      // IE8 doesn't return [Object Undefined] but [Object Object] for undefined value
      if (value === undefined) {
        return 'Undefined';
      }

      return String(Object.prototype.toString.call(value)).slice(8, -1);
    }

    function isArray(obj) {
      return getType(obj) === 'Array';
    }

    function filterArrayValues(data, value) {
      var lookup = {};
      var i, length;

      if (getType(value) === 'RegExp') {
        lookup = null;
      } else if (isArray(value)) {
        for (i = 0, length = value.length; i < length; i++) {
          lookup[value[i]] = true;
        }
      } else {
        lookup[value] = true;
      }

      for (i = 0, length = data.length; i < length; i++) {
        /*jshint laxbreak: true */
        var _match = lookup && lookup[data[i]] !== undefined
          || !lookup && value.test(data[i]);
        /*jshint laxbreak: false */
        if (_match) {
          data.splice(i, 1);
          length--;
          i--;
        }
      }

      return data;
    }

    function arrayContains(list, value) {
      var i, length;

      // value may be string, number, array, regexp
      if (isArray(value)) {
        // Note: this can be optimized to O(n) (instead of current O(m * n))
        for (i = 0, length = value.length; i < length; i++) {
          if (!arrayContains(list, value[i])) {
            return false;
          }
        }

        return true;
      }

      var _type = getType(value);
      for (i = 0, length = list.length; i < length; i++) {
        if (_type === 'RegExp') {
          if (typeof list[i] === 'string' && list[i].match(value)) {
            return true;
          }
        } else if (list[i] === value) {
          return true;
        }
      }

      return false;
    }

    function arraysEqual(one, two) {
      if (!isArray(one) || !isArray(two)) {
        return false;
      }

      // arrays can't be equal if they have different amount of content
      if (one.length !== two.length) {
        return false;
      }

      one.sort();
      two.sort();

      for (var i = 0, l = one.length; i < l; i++) {
        if (one[i] !== two[i]) {
          return false;
        }
      }

      return true;
    }

    function trimSlashes(text) {
      var trim_expression = /^\/+|\/+$/g;
      return text.replace(trim_expression, '');
    }

    URI._parts = function() {
      return {
        protocol: null,
        username: null,
        password: null,
        hostname: null,
        urn: null,
        port: null,
        path: null,
        query: null,
        fragment: null,
        // state
        preventInvalidHostname: URI.preventInvalidHostname,
        duplicateQueryParameters: URI.duplicateQueryParameters,
        escapeQuerySpace: URI.escapeQuerySpace
      };
    };
    // state: throw on invalid hostname
    // see https://github.com/medialize/URI.js/pull/345
    // and https://github.com/medialize/URI.js/issues/354
    URI.preventInvalidHostname = false;
    // state: allow duplicate query parameters (a=1&a=1)
    URI.duplicateQueryParameters = false;
    // state: replaces + with %20 (space in query strings)
    URI.escapeQuerySpace = true;
    // static properties
    URI.protocol_expression = /^[a-z][a-z0-9.+-]*$/i;
    URI.idn_expression = /[^a-z0-9\._-]/i;
    URI.punycode_expression = /(xn--)/i;
    // well, 333.444.555.666 matches, but it sure ain't no IPv4 - do we care?
    URI.ip4_expression = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
    // credits to Rich Brown
    // source: http://forums.intermapper.com/viewtopic.php?p=1096#1096
    // specification: http://www.ietf.org/rfc/rfc4291.txt
    URI.ip6_expression = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
    // expression used is "gruber revised" (@gruber v2) determined to be the
    // best solution in a regex-golf we did a couple of ages ago at
    // * http://mathiasbynens.be/demo/url-regex
    // * http://rodneyrehm.de/t/url-regex.html
    URI.find_uri_expression = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/ig;
    URI.findUri = {
      // valid "scheme://" or "www."
      start: /\b(?:([a-z][a-z0-9.+-]*:\/\/)|www\.)/gi,
      // everything up to the next whitespace
      end: /[\s\r\n]|$/,
      // trim trailing punctuation captured by end RegExp
      trim: /[`!()\[\]{};:'".,<>?«»“”„‘’]+$/,
      // balanced parens inclusion (), [], {}, <>
      parens: /(\([^\)]*\)|\[[^\]]*\]|\{[^}]*\}|<[^>]*>)/g,
    };
    // http://www.iana.org/assignments/uri-schemes.html
    // http://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers#Well-known_ports
    URI.defaultPorts = {
      http: '80',
      https: '443',
      ftp: '21',
      gopher: '70',
      ws: '80',
      wss: '443'
    };
    // list of protocols which always require a hostname
    URI.hostProtocols = [
      'http',
      'https'
    ];

    // allowed hostname characters according to RFC 3986
    // ALPHA DIGIT "-" "." "_" "~" "!" "$" "&" "'" "(" ")" "*" "+" "," ";" "=" %encoded
    // I've never seen a (non-IDN) hostname other than: ALPHA DIGIT . - _
    URI.invalid_hostname_characters = /[^a-zA-Z0-9\.\-:_]/;
    // map DOM Elements to their URI attribute
    URI.domAttributes = {
      'a': 'href',
      'blockquote': 'cite',
      'link': 'href',
      'base': 'href',
      'script': 'src',
      'form': 'action',
      'img': 'src',
      'area': 'href',
      'iframe': 'src',
      'embed': 'src',
      'source': 'src',
      'track': 'src',
      'input': 'src', // but only if type="image"
      'audio': 'src',
      'video': 'src'
    };
    URI.getDomAttribute = function(node) {
      if (!node || !node.nodeName) {
        return undefined;
      }

      var nodeName = node.nodeName.toLowerCase();
      // <input> should only expose src for type="image"
      if (nodeName === 'input' && node.type !== 'image') {
        return undefined;
      }

      return URI.domAttributes[nodeName];
    };

    function escapeForDumbFirefox36(value) {
      // https://github.com/medialize/URI.js/issues/91
      return escape(value);
    }

    // encoding / decoding according to RFC3986
    function strictEncodeURIComponent(string) {
      // see https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/encodeURIComponent
      return encodeURIComponent(string)
        .replace(/[!'()*]/g, escapeForDumbFirefox36)
        .replace(/\*/g, '%2A');
    }
    URI.encode = strictEncodeURIComponent;
    URI.decode = decodeURIComponent;
    URI.iso8859 = function() {
      URI.encode = escape;
      URI.decode = unescape;
    };
    URI.unicode = function() {
      URI.encode = strictEncodeURIComponent;
      URI.decode = decodeURIComponent;
    };
    URI.characters = {
      pathname: {
        encode: {
          // RFC3986 2.1: For consistency, URI producers and normalizers should
          // use uppercase hexadecimal digits for all percent-encodings.
          expression: /%(24|26|2B|2C|3B|3D|3A|40)/ig,
          map: {
            // -._~!'()*
            '%24': '$',
            '%26': '&',
            '%2B': '+',
            '%2C': ',',
            '%3B': ';',
            '%3D': '=',
            '%3A': ':',
            '%40': '@'
          }
        },
        decode: {
          expression: /[\/\?#]/g,
          map: {
            '/': '%2F',
            '?': '%3F',
            '#': '%23'
          }
        }
      },
      reserved: {
        encode: {
          // RFC3986 2.1: For consistency, URI producers and normalizers should
          // use uppercase hexadecimal digits for all percent-encodings.
          expression: /%(21|23|24|26|27|28|29|2A|2B|2C|2F|3A|3B|3D|3F|40|5B|5D)/ig,
          map: {
            // gen-delims
            '%3A': ':',
            '%2F': '/',
            '%3F': '?',
            '%23': '#',
            '%5B': '[',
            '%5D': ']',
            '%40': '@',
            // sub-delims
            '%21': '!',
            '%24': '$',
            '%26': '&',
            '%27': '\'',
            '%28': '(',
            '%29': ')',
            '%2A': '*',
            '%2B': '+',
            '%2C': ',',
            '%3B': ';',
            '%3D': '='
          }
        }
      },
      urnpath: {
        // The characters under `encode` are the characters called out by RFC 2141 as being acceptable
        // for usage in a URN. RFC2141 also calls out "-", ".", and "_" as acceptable characters, but
        // these aren't encoded by encodeURIComponent, so we don't have to call them out here. Also
        // note that the colon character is not featured in the encoding map; this is because URI.js
        // gives the colons in URNs semantic meaning as the delimiters of path segements, and so it
        // should not appear unencoded in a segment itself.
        // See also the note above about RFC3986 and capitalalized hex digits.
        encode: {
          expression: /%(21|24|27|28|29|2A|2B|2C|3B|3D|40)/ig,
          map: {
            '%21': '!',
            '%24': '$',
            '%27': '\'',
            '%28': '(',
            '%29': ')',
            '%2A': '*',
            '%2B': '+',
            '%2C': ',',
            '%3B': ';',
            '%3D': '=',
            '%40': '@'
          }
        },
        // These characters are the characters called out by RFC2141 as "reserved" characters that
        // should never appear in a URN, plus the colon character (see note above).
        decode: {
          expression: /[\/\?#:]/g,
          map: {
            '/': '%2F',
            '?': '%3F',
            '#': '%23',
            ':': '%3A'
          }
        }
      }
    };
    URI.encodeQuery = function(string, escapeQuerySpace) {
      var escaped = URI.encode(string + '');
      if (escapeQuerySpace === undefined) {
        escapeQuerySpace = URI.escapeQuerySpace;
      }

      return escapeQuerySpace ? escaped.replace(/%20/g, '+') : escaped;
    };
    URI.decodeQuery = function(string, escapeQuerySpace) {
      string += '';
      if (escapeQuerySpace === undefined) {
        escapeQuerySpace = URI.escapeQuerySpace;
      }

      try {
        return URI.decode(escapeQuerySpace ? string.replace(/\+/g, '%20') : string);
      } catch(e) {
        // we're not going to mess with weird encodings,
        // give up and return the undecoded original string
        // see https://github.com/medialize/URI.js/issues/87
        // see https://github.com/medialize/URI.js/issues/92
        return string;
      }
    };
    // generate encode/decode path functions
    var _parts = {'encode':'encode', 'decode':'decode'};
    var _part;
    var generateAccessor = function(_group, _part) {
      return function(string) {
        try {
          return URI[_part](string + '').replace(URI.characters[_group][_part].expression, function(c) {
            return URI.characters[_group][_part].map[c];
          });
        } catch (e) {
          // we're not going to mess with weird encodings,
          // give up and return the undecoded original string
          // see https://github.com/medialize/URI.js/issues/87
          // see https://github.com/medialize/URI.js/issues/92
          return string;
        }
      };
    };

    for (_part in _parts) {
      URI[_part + 'PathSegment'] = generateAccessor('pathname', _parts[_part]);
      URI[_part + 'UrnPathSegment'] = generateAccessor('urnpath', _parts[_part]);
    }

    var generateSegmentedPathFunction = function(_sep, _codingFuncName, _innerCodingFuncName) {
      return function(string) {
        // Why pass in names of functions, rather than the function objects themselves? The
        // definitions of some functions (but in particular, URI.decode) will occasionally change due
        // to URI.js having ISO8859 and Unicode modes. Passing in the name and getting it will ensure
        // that the functions we use here are "fresh".
        var actualCodingFunc;
        if (!_innerCodingFuncName) {
          actualCodingFunc = URI[_codingFuncName];
        } else {
          actualCodingFunc = function(string) {
            return URI[_codingFuncName](URI[_innerCodingFuncName](string));
          };
        }

        var segments = (string + '').split(_sep);

        for (var i = 0, length = segments.length; i < length; i++) {
          segments[i] = actualCodingFunc(segments[i]);
        }

        return segments.join(_sep);
      };
    };

    // This takes place outside the above loop because we don't want, e.g., encodeUrnPath functions.
    URI.decodePath = generateSegmentedPathFunction('/', 'decodePathSegment');
    URI.decodeUrnPath = generateSegmentedPathFunction(':', 'decodeUrnPathSegment');
    URI.recodePath = generateSegmentedPathFunction('/', 'encodePathSegment', 'decode');
    URI.recodeUrnPath = generateSegmentedPathFunction(':', 'encodeUrnPathSegment', 'decode');

    URI.encodeReserved = generateAccessor('reserved', 'encode');

    URI.parse = function(string, parts) {
      var pos;
      if (!parts) {
        parts = {
          preventInvalidHostname: URI.preventInvalidHostname
        };
      }
      // [protocol"://"[username[":"password]"@"]hostname[":"port]"/"?][path]["?"querystring]["#"fragment]

      // extract fragment
      pos = string.indexOf('#');
      if (pos > -1) {
        // escaping?
        parts.fragment = string.substring(pos + 1) || null;
        string = string.substring(0, pos);
      }

      // extract query
      pos = string.indexOf('?');
      if (pos > -1) {
        // escaping?
        parts.query = string.substring(pos + 1) || null;
        string = string.substring(0, pos);
      }

      // extract protocol
      if (string.substring(0, 2) === '//') {
        // relative-scheme
        parts.protocol = null;
        string = string.substring(2);
        // extract "user:pass@host:port"
        string = URI.parseAuthority(string, parts);
      } else {
        pos = string.indexOf(':');
        if (pos > -1) {
          parts.protocol = string.substring(0, pos) || null;
          if (parts.protocol && !parts.protocol.match(URI.protocol_expression)) {
            // : may be within the path
            parts.protocol = undefined;
          } else if (string.substring(pos + 1, pos + 3) === '//') {
            string = string.substring(pos + 3);

            // extract "user:pass@host:port"
            string = URI.parseAuthority(string, parts);
          } else {
            string = string.substring(pos + 1);
            parts.urn = true;
          }
        }
      }

      // what's left must be the path
      parts.path = string;

      // and we're done
      return parts;
    };
    URI.parseHost = function(string, parts) {
      if (!string) {
        string = '';
      }

      // Copy chrome, IE, opera backslash-handling behavior.
      // Back slashes before the query string get converted to forward slashes
      // See: https://github.com/joyent/node/blob/386fd24f49b0e9d1a8a076592a404168faeecc34/lib/url.js#L115-L124
      // See: https://code.google.com/p/chromium/issues/detail?id=25916
      // https://github.com/medialize/URI.js/pull/233
      string = string.replace(/\\/g, '/');

      // extract host:port
      var pos = string.indexOf('/');
      var bracketPos;
      var t;

      if (pos === -1) {
        pos = string.length;
      }

      if (string.charAt(0) === '[') {
        // IPv6 host - http://tools.ietf.org/html/draft-ietf-6man-text-addr-representation-04#section-6
        // I claim most client software breaks on IPv6 anyways. To simplify things, URI only accepts
        // IPv6+port in the format [2001:db8::1]:80 (for the time being)
        bracketPos = string.indexOf(']');
        parts.hostname = string.substring(1, bracketPos) || null;
        parts.port = string.substring(bracketPos + 2, pos) || null;
        if (parts.port === '/') {
          parts.port = null;
        }
      } else {
        var firstColon = string.indexOf(':');
        var firstSlash = string.indexOf('/');
        var nextColon = string.indexOf(':', firstColon + 1);
        if (nextColon !== -1 && (firstSlash === -1 || nextColon < firstSlash)) {
          // IPv6 host contains multiple colons - but no port
          // this notation is actually not allowed by RFC 3986, but we're a liberal parser
          parts.hostname = string.substring(0, pos) || null;
          parts.port = null;
        } else {
          t = string.substring(0, pos).split(':');
          parts.hostname = t[0] || null;
          parts.port = t[1] || null;
        }
      }

      if (parts.hostname && string.substring(pos).charAt(0) !== '/') {
        pos++;
        string = '/' + string;
      }

      if (parts.preventInvalidHostname) {
        URI.ensureValidHostname(parts.hostname, parts.protocol);
      }

      if (parts.port) {
        URI.ensureValidPort(parts.port);
      }

      return string.substring(pos) || '/';
    };
    URI.parseAuthority = function(string, parts) {
      string = URI.parseUserinfo(string, parts);
      return URI.parseHost(string, parts);
    };
    URI.parseUserinfo = function(string, parts) {
      // extract username:password
      var firstSlash = string.indexOf('/');
      var pos = string.lastIndexOf('@', firstSlash > -1 ? firstSlash : string.length - 1);
      var t;

      // authority@ must come before /path
      if (pos > -1 && (firstSlash === -1 || pos < firstSlash)) {
        t = string.substring(0, pos).split(':');
        parts.username = t[0] ? URI.decode(t[0]) : null;
        t.shift();
        parts.password = t[0] ? URI.decode(t.join(':')) : null;
        string = string.substring(pos + 1);
      } else {
        parts.username = null;
        parts.password = null;
      }

      return string;
    };
    URI.parseQuery = function(string, escapeQuerySpace) {
      if (!string) {
        return {};
      }

      // throw out the funky business - "?"[name"="value"&"]+
      string = string.replace(/&+/g, '&').replace(/^\?*&*|&+$/g, '');

      if (!string) {
        return {};
      }

      var items = {};
      var splits = string.split('&');
      var length = splits.length;
      var v, name, value;

      for (var i = 0; i < length; i++) {
        v = splits[i].split('=');
        name = URI.decodeQuery(v.shift(), escapeQuerySpace);
        // no "=" is null according to http://dvcs.w3.org/hg/url/raw-file/tip/Overview.html#collect-url-parameters
        value = v.length ? URI.decodeQuery(v.join('='), escapeQuerySpace) : null;

        if (hasOwn.call(items, name)) {
          if (typeof items[name] === 'string' || items[name] === null) {
            items[name] = [items[name]];
          }

          items[name].push(value);
        } else {
          items[name] = value;
        }
      }

      return items;
    };

    URI.build = function(parts) {
      var t = '';

      if (parts.protocol) {
        t += parts.protocol + ':';
      }

      if (!parts.urn && (t || parts.hostname)) {
        t += '//';
      }

      t += (URI.buildAuthority(parts) || '');

      if (typeof parts.path === 'string') {
        if (parts.path.charAt(0) !== '/' && typeof parts.hostname === 'string') {
          t += '/';
        }

        t += parts.path;
      }

      if (typeof parts.query === 'string' && parts.query) {
        t += '?' + parts.query;
      }

      if (typeof parts.fragment === 'string' && parts.fragment) {
        t += '#' + parts.fragment;
      }
      return t;
    };
    URI.buildHost = function(parts) {
      var t = '';

      if (!parts.hostname) {
        return '';
      } else if (URI.ip6_expression.test(parts.hostname)) {
        t += '[' + parts.hostname + ']';
      } else {
        t += parts.hostname;
      }

      if (parts.port) {
        t += ':' + parts.port;
      }

      return t;
    };
    URI.buildAuthority = function(parts) {
      return URI.buildUserinfo(parts) + URI.buildHost(parts);
    };
    URI.buildUserinfo = function(parts) {
      var t = '';

      if (parts.username) {
        t += URI.encode(parts.username);
      }

      if (parts.password) {
        t += ':' + URI.encode(parts.password);
      }

      if (t) {
        t += '@';
      }

      return t;
    };
    URI.buildQuery = function(data, duplicateQueryParameters, escapeQuerySpace) {
      // according to http://tools.ietf.org/html/rfc3986 or http://labs.apache.org/webarch/uri/rfc/rfc3986.html
      // being »-._~!$&'()*+,;=:@/?« %HEX and alnum are allowed
      // the RFC explicitly states ?/foo being a valid use case, no mention of parameter syntax!
      // URI.js treats the query string as being application/x-www-form-urlencoded
      // see http://www.w3.org/TR/REC-html40/interact/forms.html#form-content-type

      var t = '';
      var unique, key, i, length;
      for (key in data) {
        if (hasOwn.call(data, key) && key) {
          if (isArray(data[key])) {
            unique = {};
            for (i = 0, length = data[key].length; i < length; i++) {
              if (data[key][i] !== undefined && unique[data[key][i] + ''] === undefined) {
                t += '&' + URI.buildQueryParameter(key, data[key][i], escapeQuerySpace);
                if (duplicateQueryParameters !== true) {
                  unique[data[key][i] + ''] = true;
                }
              }
            }
          } else if (data[key] !== undefined) {
            t += '&' + URI.buildQueryParameter(key, data[key], escapeQuerySpace);
          }
        }
      }

      return t.substring(1);
    };
    URI.buildQueryParameter = function(name, value, escapeQuerySpace) {
      // http://www.w3.org/TR/REC-html40/interact/forms.html#form-content-type -- application/x-www-form-urlencoded
      // don't append "=" for null values, according to http://dvcs.w3.org/hg/url/raw-file/tip/Overview.html#url-parameter-serialization
      return URI.encodeQuery(name, escapeQuerySpace) + (value !== null ? '=' + URI.encodeQuery(value, escapeQuerySpace) : '');
    };

    URI.addQuery = function(data, name, value) {
      if (typeof name === 'object') {
        for (var key in name) {
          if (hasOwn.call(name, key)) {
            URI.addQuery(data, key, name[key]);
          }
        }
      } else if (typeof name === 'string') {
        if (data[name] === undefined) {
          data[name] = value;
          return;
        } else if (typeof data[name] === 'string') {
          data[name] = [data[name]];
        }

        if (!isArray(value)) {
          value = [value];
        }

        data[name] = (data[name] || []).concat(value);
      } else {
        throw new TypeError('URI.addQuery() accepts an object, string as the name parameter');
      }
    };

    URI.setQuery = function(data, name, value) {
      if (typeof name === 'object') {
        for (var key in name) {
          if (hasOwn.call(name, key)) {
            URI.setQuery(data, key, name[key]);
          }
        }
      } else if (typeof name === 'string') {
        data[name] = value === undefined ? null : value;
      } else {
        throw new TypeError('URI.setQuery() accepts an object, string as the name parameter');
      }
    };

    URI.removeQuery = function(data, name, value) {
      var i, length, key;

      if (isArray(name)) {
        for (i = 0, length = name.length; i < length; i++) {
          data[name[i]] = undefined;
        }
      } else if (getType(name) === 'RegExp') {
        for (key in data) {
          if (name.test(key)) {
            data[key] = undefined;
          }
        }
      } else if (typeof name === 'object') {
        for (key in name) {
          if (hasOwn.call(name, key)) {
            URI.removeQuery(data, key, name[key]);
          }
        }
      } else if (typeof name === 'string') {
        if (value !== undefined) {
          if (getType(value) === 'RegExp') {
            if (!isArray(data[name]) && value.test(data[name])) {
              data[name] = undefined;
            } else {
              data[name] = filterArrayValues(data[name], value);
            }
          } else if (data[name] === String(value) && (!isArray(value) || value.length === 1)) {
            data[name] = undefined;
          } else if (isArray(data[name])) {
            data[name] = filterArrayValues(data[name], value);
          }
        } else {
          data[name] = undefined;
        }
      } else {
        throw new TypeError('URI.removeQuery() accepts an object, string, RegExp as the first parameter');
      }
    };
    URI.hasQuery = function(data, name, value, withinArray) {
      switch (getType(name)) {
        case 'String':
          // Nothing to do here
          break;

        case 'RegExp':
          for (var key in data) {
            if (hasOwn.call(data, key)) {
              if (name.test(key) && (value === undefined || URI.hasQuery(data, key, value))) {
                return true;
              }
            }
          }

          return false;

        case 'Object':
          for (var _key in name) {
            if (hasOwn.call(name, _key)) {
              if (!URI.hasQuery(data, _key, name[_key])) {
                return false;
              }
            }
          }

          return true;

        default:
          throw new TypeError('URI.hasQuery() accepts a string, regular expression or object as the name parameter');
      }

      switch (getType(value)) {
        case 'Undefined':
          // true if exists (but may be empty)
          return name in data; // data[name] !== undefined;

        case 'Boolean':
          // true if exists and non-empty
          var _booly = Boolean(isArray(data[name]) ? data[name].length : data[name]);
          return value === _booly;

        case 'Function':
          // allow complex comparison
          return !!value(data[name], name, data);

        case 'Array':
          if (!isArray(data[name])) {
            return false;
          }

          var op = withinArray ? arrayContains : arraysEqual;
          return op(data[name], value);

        case 'RegExp':
          if (!isArray(data[name])) {
            return Boolean(data[name] && data[name].match(value));
          }

          if (!withinArray) {
            return false;
          }

          return arrayContains(data[name], value);

        case 'Number':
          value = String(value);
          /* falls through */
        case 'String':
          if (!isArray(data[name])) {
            return data[name] === value;
          }

          if (!withinArray) {
            return false;
          }

          return arrayContains(data[name], value);

        default:
          throw new TypeError('URI.hasQuery() accepts undefined, boolean, string, number, RegExp, Function as the value parameter');
      }
    };


    URI.joinPaths = function() {
      var input = [];
      var segments = [];
      var nonEmptySegments = 0;

      for (var i = 0; i < arguments.length; i++) {
        var url = new URI(arguments[i]);
        input.push(url);
        var _segments = url.segment();
        for (var s = 0; s < _segments.length; s++) {
          if (typeof _segments[s] === 'string') {
            segments.push(_segments[s]);
          }

          if (_segments[s]) {
            nonEmptySegments++;
          }
        }
      }

      if (!segments.length || !nonEmptySegments) {
        return new URI('');
      }

      var uri = new URI('').segment(segments);

      if (input[0].path() === '' || input[0].path().slice(0, 1) === '/') {
        uri.path('/' + uri.path());
      }

      return uri.normalize();
    };

    URI.commonPath = function(one, two) {
      var length = Math.min(one.length, two.length);
      var pos;

      // find first non-matching character
      for (pos = 0; pos < length; pos++) {
        if (one.charAt(pos) !== two.charAt(pos)) {
          pos--;
          break;
        }
      }

      if (pos < 1) {
        return one.charAt(0) === two.charAt(0) && one.charAt(0) === '/' ? '/' : '';
      }

      // revert to last /
      if (one.charAt(pos) !== '/' || two.charAt(pos) !== '/') {
        pos = one.substring(0, pos).lastIndexOf('/');
      }

      return one.substring(0, pos + 1);
    };

    URI.withinString = function(string, callback, options) {
      options || (options = {});
      var _start = options.start || URI.findUri.start;
      var _end = options.end || URI.findUri.end;
      var _trim = options.trim || URI.findUri.trim;
      var _parens = options.parens || URI.findUri.parens;
      var _attributeOpen = /[a-z0-9-]=["']?$/i;

      _start.lastIndex = 0;
      while (true) {
        var match = _start.exec(string);
        if (!match) {
          break;
        }

        var start = match.index;
        if (options.ignoreHtml) {
          // attribut(e=["']?$)
          var attributeOpen = string.slice(Math.max(start - 3, 0), start);
          if (attributeOpen && _attributeOpen.test(attributeOpen)) {
            continue;
          }
        }

        var end = start + string.slice(start).search(_end);
        var slice = string.slice(start, end);
        // make sure we include well balanced parens
        var parensEnd = -1;
        while (true) {
          var parensMatch = _parens.exec(slice);
          if (!parensMatch) {
            break;
          }

          var parensMatchEnd = parensMatch.index + parensMatch[0].length;
          parensEnd = Math.max(parensEnd, parensMatchEnd);
        }

        if (parensEnd > -1) {
          slice = slice.slice(0, parensEnd) + slice.slice(parensEnd).replace(_trim, '');
        } else {
          slice = slice.replace(_trim, '');
        }

        if (slice.length <= match[0].length) {
          // the extract only contains the starting marker of a URI,
          // e.g. "www" or "http://"
          continue;
        }

        if (options.ignore && options.ignore.test(slice)) {
          continue;
        }

        end = start + slice.length;
        var result = callback(slice, start, end, string);
        if (result === undefined) {
          _start.lastIndex = end;
          continue;
        }

        result = String(result);
        string = string.slice(0, start) + result + string.slice(end);
        _start.lastIndex = start + result.length;
      }

      _start.lastIndex = 0;
      return string;
    };

    URI.ensureValidHostname = function(v, protocol) {
      // Theoretically URIs allow percent-encoding in Hostnames (according to RFC 3986)
      // they are not part of DNS and therefore ignored by URI.js

      var hasHostname = !!v; // not null and not an empty string
      var hasProtocol = !!protocol;
      var rejectEmptyHostname = false;

      if (hasProtocol) {
        rejectEmptyHostname = arrayContains(URI.hostProtocols, protocol);
      }

      if (rejectEmptyHostname && !hasHostname) {
        throw new TypeError('Hostname cannot be empty, if protocol is ' + protocol);
      } else if (v && v.match(URI.invalid_hostname_characters)) {
        // test punycode
        if (!punycode) {
          throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-:_] and Punycode.js is not available');
        }
        if (punycode.toASCII(v).match(URI.invalid_hostname_characters)) {
          throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-:_]');
        }
      }
    };

    URI.ensureValidPort = function (v) {
      if (!v) {
        return;
      }

      var port = Number(v);
      if (isInteger(port) && (port > 0) && (port < 65536)) {
        return;
      }

      throw new TypeError('Port "' + v + '" is not a valid port');
    };

    // noConflict
    URI.noConflict = function(removeAll) {
      if (removeAll) {
        var unconflicted = {
          URI: this.noConflict()
        };

        if (root.URITemplate && typeof root.URITemplate.noConflict === 'function') {
          unconflicted.URITemplate = root.URITemplate.noConflict();
        }

        if (root.IPv6 && typeof root.IPv6.noConflict === 'function') {
          unconflicted.IPv6 = root.IPv6.noConflict();
        }

        if (root.SecondLevelDomains && typeof root.SecondLevelDomains.noConflict === 'function') {
          unconflicted.SecondLevelDomains = root.SecondLevelDomains.noConflict();
        }

        return unconflicted;
      } else if (root.URI === this) {
        root.URI = _URI;
      }

      return this;
    };

    p.build = function(deferBuild) {
      if (deferBuild === true) {
        this._deferred_build = true;
      } else if (deferBuild === undefined || this._deferred_build) {
        this._string = URI.build(this._parts);
        this._deferred_build = false;
      }

      return this;
    };

    p.clone = function() {
      return new URI(this);
    };

    p.valueOf = p.toString = function() {
      return this.build(false)._string;
    };


    function generateSimpleAccessor(_part){
      return function(v, build) {
        if (v === undefined) {
          return this._parts[_part] || '';
        } else {
          this._parts[_part] = v || null;
          this.build(!build);
          return this;
        }
      };
    }

    function generatePrefixAccessor(_part, _key){
      return function(v, build) {
        if (v === undefined) {
          return this._parts[_part] || '';
        } else {
          if (v !== null) {
            v = v + '';
            if (v.charAt(0) === _key) {
              v = v.substring(1);
            }
          }

          this._parts[_part] = v;
          this.build(!build);
          return this;
        }
      };
    }

    p.protocol = generateSimpleAccessor('protocol');
    p.username = generateSimpleAccessor('username');
    p.password = generateSimpleAccessor('password');
    p.hostname = generateSimpleAccessor('hostname');
    p.port = generateSimpleAccessor('port');
    p.query = generatePrefixAccessor('query', '?');
    p.fragment = generatePrefixAccessor('fragment', '#');

    p.search = function(v, build) {
      var t = this.query(v, build);
      return typeof t === 'string' && t.length ? ('?' + t) : t;
    };
    p.hash = function(v, build) {
      var t = this.fragment(v, build);
      return typeof t === 'string' && t.length ? ('#' + t) : t;
    };

    p.pathname = function(v, build) {
      if (v === undefined || v === true) {
        var res = this._parts.path || (this._parts.hostname ? '/' : '');
        return v ? (this._parts.urn ? URI.decodeUrnPath : URI.decodePath)(res) : res;
      } else {
        if (this._parts.urn) {
          this._parts.path = v ? URI.recodeUrnPath(v) : '';
        } else {
          this._parts.path = v ? URI.recodePath(v) : '/';
        }
        this.build(!build);
        return this;
      }
    };
    p.path = p.pathname;
    p.href = function(href, build) {
      var key;

      if (href === undefined) {
        return this.toString();
      }

      this._string = '';
      this._parts = URI._parts();

      var _URI = href instanceof URI;
      var _object = typeof href === 'object' && (href.hostname || href.path || href.pathname);
      if (href.nodeName) {
        var attribute = URI.getDomAttribute(href);
        href = href[attribute] || '';
        _object = false;
      }

      // window.location is reported to be an object, but it's not the sort
      // of object we're looking for:
      // * location.protocol ends with a colon
      // * location.query != object.search
      // * location.hash != object.fragment
      // simply serializing the unknown object should do the trick
      // (for location, not for everything...)
      if (!_URI && _object && href.pathname !== undefined) {
        href = href.toString();
      }

      if (typeof href === 'string' || href instanceof String) {
        this._parts = URI.parse(String(href), this._parts);
      } else if (_URI || _object) {
        var src = _URI ? href._parts : href;
        for (key in src) {
          if (key === 'query') { continue; }
          if (hasOwn.call(this._parts, key)) {
            this._parts[key] = src[key];
          }
        }
        if (src.query) {
          this.query(src.query, false);
        }
      } else {
        throw new TypeError('invalid input');
      }

      this.build(!build);
      return this;
    };

    // identification accessors
    p.is = function(what) {
      var ip = false;
      var ip4 = false;
      var ip6 = false;
      var name = false;
      var sld = false;
      var idn = false;
      var punycode = false;
      var relative = !this._parts.urn;

      if (this._parts.hostname) {
        relative = false;
        ip4 = URI.ip4_expression.test(this._parts.hostname);
        ip6 = URI.ip6_expression.test(this._parts.hostname);
        ip = ip4 || ip6;
        name = !ip;
        sld = name && SLD && SLD.has(this._parts.hostname);
        idn = name && URI.idn_expression.test(this._parts.hostname);
        punycode = name && URI.punycode_expression.test(this._parts.hostname);
      }

      switch (what.toLowerCase()) {
        case 'relative':
          return relative;

        case 'absolute':
          return !relative;

        // hostname identification
        case 'domain':
        case 'name':
          return name;

        case 'sld':
          return sld;

        case 'ip':
          return ip;

        case 'ip4':
        case 'ipv4':
        case 'inet4':
          return ip4;

        case 'ip6':
        case 'ipv6':
        case 'inet6':
          return ip6;

        case 'idn':
          return idn;

        case 'url':
          return !this._parts.urn;

        case 'urn':
          return !!this._parts.urn;

        case 'punycode':
          return punycode;
      }

      return null;
    };

    // component specific input validation
    var _protocol = p.protocol;
    var _port = p.port;
    var _hostname = p.hostname;

    p.protocol = function(v, build) {
      if (v) {
        // accept trailing ://
        v = v.replace(/:(\/\/)?$/, '');

        if (!v.match(URI.protocol_expression)) {
          throw new TypeError('Protocol "' + v + '" contains characters other than [A-Z0-9.+-] or doesn\'t start with [A-Z]');
        }
      }

      return _protocol.call(this, v, build);
    };
    p.scheme = p.protocol;
    p.port = function(v, build) {
      if (this._parts.urn) {
        return v === undefined ? '' : this;
      }

      if (v !== undefined) {
        if (v === 0) {
          v = null;
        }

        if (v) {
          v += '';
          if (v.charAt(0) === ':') {
            v = v.substring(1);
          }

          URI.ensureValidPort(v);
        }
      }
      return _port.call(this, v, build);
    };
    p.hostname = function(v, build) {
      if (this._parts.urn) {
        return v === undefined ? '' : this;
      }

      if (v !== undefined) {
        var x = { preventInvalidHostname: this._parts.preventInvalidHostname };
        var res = URI.parseHost(v, x);
        if (res !== '/') {
          throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-]');
        }

        v = x.hostname;
        if (this._parts.preventInvalidHostname) {
          URI.ensureValidHostname(v, this._parts.protocol);
        }
      }

      return _hostname.call(this, v, build);
    };

    // compound accessors
    p.origin = function(v, build) {
      if (this._parts.urn) {
        return v === undefined ? '' : this;
      }

      if (v === undefined) {
        var protocol = this.protocol();
        var authority = this.authority();
        if (!authority) {
          return '';
        }

        return (protocol ? protocol + '://' : '') + this.authority();
      } else {
        var origin = URI(v);
        this
          .protocol(origin.protocol())
          .authority(origin.authority())
          .build(!build);
        return this;
      }
    };
    p.host = function(v, build) {
      if (this._parts.urn) {
        return v === undefined ? '' : this;
      }

      if (v === undefined) {
        return this._parts.hostname ? URI.buildHost(this._parts) : '';
      } else {
        var res = URI.parseHost(v, this._parts);
        if (res !== '/') {
          throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-]');
        }

        this.build(!build);
        return this;
      }
    };
    p.authority = function(v, build) {
      if (this._parts.urn) {
        return v === undefined ? '' : this;
      }

      if (v === undefined) {
        return this._parts.hostname ? URI.buildAuthority(this._parts) : '';
      } else {
        var res = URI.parseAuthority(v, this._parts);
        if (res !== '/') {
          throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-]');
        }

        this.build(!build);
        return this;
      }
    };
    p.userinfo = function(v, build) {
      if (this._parts.urn) {
        return v === undefined ? '' : this;
      }

      if (v === undefined) {
        var t = URI.buildUserinfo(this._parts);
        return t ? t.substring(0, t.length -1) : t;
      } else {
        if (v[v.length-1] !== '@') {
          v += '@';
        }

        URI.parseUserinfo(v, this._parts);
        this.build(!build);
        return this;
      }
    };
    p.resource = function(v, build) {
      var parts;

      if (v === undefined) {
        return this.path() + this.search() + this.hash();
      }

      parts = URI.parse(v);
      this._parts.path = parts.path;
      this._parts.query = parts.query;
      this._parts.fragment = parts.fragment;
      this.build(!build);
      return this;
    };

    // fraction accessors
    p.subdomain = function(v, build) {
      if (this._parts.urn) {
        return v === undefined ? '' : this;
      }

      // convenience, return "www" from "www.example.org"
      if (v === undefined) {
        if (!this._parts.hostname || this.is('IP')) {
          return '';
        }

        // grab domain and add another segment
        var end = this._parts.hostname.length - this.domain().length - 1;
        return this._parts.hostname.substring(0, end) || '';
      } else {
        var e = this._parts.hostname.length - this.domain().length;
        var sub = this._parts.hostname.substring(0, e);
        var replace = new RegExp('^' + escapeRegEx(sub));

        if (v && v.charAt(v.length - 1) !== '.') {
          v += '.';
        }

        if (v.indexOf(':') !== -1) {
          throw new TypeError('Domains cannot contain colons');
        }

        if (v) {
          URI.ensureValidHostname(v, this._parts.protocol);
        }

        this._parts.hostname = this._parts.hostname.replace(replace, v);
        this.build(!build);
        return this;
      }
    };
    p.domain = function(v, build) {
      if (this._parts.urn) {
        return v === undefined ? '' : this;
      }

      if (typeof v === 'boolean') {
        build = v;
        v = undefined;
      }

      // convenience, return "example.org" from "www.example.org"
      if (v === undefined) {
        if (!this._parts.hostname || this.is('IP')) {
          return '';
        }

        // if hostname consists of 1 or 2 segments, it must be the domain
        var t = this._parts.hostname.match(/\./g);
        if (t && t.length < 2) {
          return this._parts.hostname;
        }

        // grab tld and add another segment
        var end = this._parts.hostname.length - this.tld(build).length - 1;
        end = this._parts.hostname.lastIndexOf('.', end -1) + 1;
        return this._parts.hostname.substring(end) || '';
      } else {
        if (!v) {
          throw new TypeError('cannot set domain empty');
        }

        if (v.indexOf(':') !== -1) {
          throw new TypeError('Domains cannot contain colons');
        }

        URI.ensureValidHostname(v, this._parts.protocol);

        if (!this._parts.hostname || this.is('IP')) {
          this._parts.hostname = v;
        } else {
          var replace = new RegExp(escapeRegEx(this.domain()) + '$');
          this._parts.hostname = this._parts.hostname.replace(replace, v);
        }

        this.build(!build);
        return this;
      }
    };
    p.tld = function(v, build) {
      if (this._parts.urn) {
        return v === undefined ? '' : this;
      }

      if (typeof v === 'boolean') {
        build = v;
        v = undefined;
      }

      // return "org" from "www.example.org"
      if (v === undefined) {
        if (!this._parts.hostname || this.is('IP')) {
          return '';
        }

        var pos = this._parts.hostname.lastIndexOf('.');
        var tld = this._parts.hostname.substring(pos + 1);

        if (build !== true && SLD && SLD.list[tld.toLowerCase()]) {
          return SLD.get(this._parts.hostname) || tld;
        }

        return tld;
      } else {
        var replace;

        if (!v) {
          throw new TypeError('cannot set TLD empty');
        } else if (v.match(/[^a-zA-Z0-9-]/)) {
          if (SLD && SLD.is(v)) {
            replace = new RegExp(escapeRegEx(this.tld()) + '$');
            this._parts.hostname = this._parts.hostname.replace(replace, v);
          } else {
            throw new TypeError('TLD "' + v + '" contains characters other than [A-Z0-9]');
          }
        } else if (!this._parts.hostname || this.is('IP')) {
          throw new ReferenceError('cannot set TLD on non-domain host');
        } else {
          replace = new RegExp(escapeRegEx(this.tld()) + '$');
          this._parts.hostname = this._parts.hostname.replace(replace, v);
        }

        this.build(!build);
        return this;
      }
    };
    p.directory = function(v, build) {
      if (this._parts.urn) {
        return v === undefined ? '' : this;
      }

      if (v === undefined || v === true) {
        if (!this._parts.path && !this._parts.hostname) {
          return '';
        }

        if (this._parts.path === '/') {
          return '/';
        }

        var end = this._parts.path.length - this.filename().length - 1;
        var res = this._parts.path.substring(0, end) || (this._parts.hostname ? '/' : '');

        return v ? URI.decodePath(res) : res;

      } else {
        var e = this._parts.path.length - this.filename().length;
        var directory = this._parts.path.substring(0, e);
        var replace = new RegExp('^' + escapeRegEx(directory));

        // fully qualifier directories begin with a slash
        if (!this.is('relative')) {
          if (!v) {
            v = '/';
          }

          if (v.charAt(0) !== '/') {
            v = '/' + v;
          }
        }

        // directories always end with a slash
        if (v && v.charAt(v.length - 1) !== '/') {
          v += '/';
        }

        v = URI.recodePath(v);
        this._parts.path = this._parts.path.replace(replace, v);
        this.build(!build);
        return this;
      }
    };
    p.filename = function(v, build) {
      if (this._parts.urn) {
        return v === undefined ? '' : this;
      }

      if (typeof v !== 'string') {
        if (!this._parts.path || this._parts.path === '/') {
          return '';
        }

        var pos = this._parts.path.lastIndexOf('/');
        var res = this._parts.path.substring(pos+1);

        return v ? URI.decodePathSegment(res) : res;
      } else {
        var mutatedDirectory = false;

        if (v.charAt(0) === '/') {
          v = v.substring(1);
        }

        if (v.match(/\.?\//)) {
          mutatedDirectory = true;
        }

        var replace = new RegExp(escapeRegEx(this.filename()) + '$');
        v = URI.recodePath(v);
        this._parts.path = this._parts.path.replace(replace, v);

        if (mutatedDirectory) {
          this.normalizePath(build);
        } else {
          this.build(!build);
        }

        return this;
      }
    };
    p.suffix = function(v, build) {
      if (this._parts.urn) {
        return v === undefined ? '' : this;
      }

      if (v === undefined || v === true) {
        if (!this._parts.path || this._parts.path === '/') {
          return '';
        }

        var filename = this.filename();
        var pos = filename.lastIndexOf('.');
        var s, res;

        if (pos === -1) {
          return '';
        }

        // suffix may only contain alnum characters (yup, I made this up.)
        s = filename.substring(pos+1);
        res = (/^[a-z0-9%]+$/i).test(s) ? s : '';
        return v ? URI.decodePathSegment(res) : res;
      } else {
        if (v.charAt(0) === '.') {
          v = v.substring(1);
        }

        var suffix = this.suffix();
        var replace;

        if (!suffix) {
          if (!v) {
            return this;
          }

          this._parts.path += '.' + URI.recodePath(v);
        } else if (!v) {
          replace = new RegExp(escapeRegEx('.' + suffix) + '$');
        } else {
          replace = new RegExp(escapeRegEx(suffix) + '$');
        }

        if (replace) {
          v = URI.recodePath(v);
          this._parts.path = this._parts.path.replace(replace, v);
        }

        this.build(!build);
        return this;
      }
    };
    p.segment = function(segment, v, build) {
      var separator = this._parts.urn ? ':' : '/';
      var path = this.path();
      var absolute = path.substring(0, 1) === '/';
      var segments = path.split(separator);

      if (segment !== undefined && typeof segment !== 'number') {
        build = v;
        v = segment;
        segment = undefined;
      }

      if (segment !== undefined && typeof segment !== 'number') {
        throw new Error('Bad segment "' + segment + '", must be 0-based integer');
      }

      if (absolute) {
        segments.shift();
      }

      if (segment < 0) {
        // allow negative indexes to address from the end
        segment = Math.max(segments.length + segment, 0);
      }

      if (v === undefined) {
        /*jshint laxbreak: true */
        return segment === undefined
          ? segments
          : segments[segment];
        /*jshint laxbreak: false */
      } else if (segment === null || segments[segment] === undefined) {
        if (isArray(v)) {
          segments = [];
          // collapse empty elements within array
          for (var i=0, l=v.length; i < l; i++) {
            if (!v[i].length && (!segments.length || !segments[segments.length -1].length)) {
              continue;
            }

            if (segments.length && !segments[segments.length -1].length) {
              segments.pop();
            }

            segments.push(trimSlashes(v[i]));
          }
        } else if (v || typeof v === 'string') {
          v = trimSlashes(v);
          if (segments[segments.length -1] === '') {
            // empty trailing elements have to be overwritten
            // to prevent results such as /foo//bar
            segments[segments.length -1] = v;
          } else {
            segments.push(v);
          }
        }
      } else {
        if (v) {
          segments[segment] = trimSlashes(v);
        } else {
          segments.splice(segment, 1);
        }
      }

      if (absolute) {
        segments.unshift('');
      }

      return this.path(segments.join(separator), build);
    };
    p.segmentCoded = function(segment, v, build) {
      var segments, i, l;

      if (typeof segment !== 'number') {
        build = v;
        v = segment;
        segment = undefined;
      }

      if (v === undefined) {
        segments = this.segment(segment, v, build);
        if (!isArray(segments)) {
          segments = segments !== undefined ? URI.decode(segments) : undefined;
        } else {
          for (i = 0, l = segments.length; i < l; i++) {
            segments[i] = URI.decode(segments[i]);
          }
        }

        return segments;
      }

      if (!isArray(v)) {
        v = (typeof v === 'string' || v instanceof String) ? URI.encode(v) : v;
      } else {
        for (i = 0, l = v.length; i < l; i++) {
          v[i] = URI.encode(v[i]);
        }
      }

      return this.segment(segment, v, build);
    };

    // mutating query string
    var q = p.query;
    p.query = function(v, build) {
      if (v === true) {
        return URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
      } else if (typeof v === 'function') {
        var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
        var result = v.call(this, data);
        this._parts.query = URI.buildQuery(result || data, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
        this.build(!build);
        return this;
      } else if (v !== undefined && typeof v !== 'string') {
        this._parts.query = URI.buildQuery(v, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
        this.build(!build);
        return this;
      } else {
        return q.call(this, v, build);
      }
    };
    p.setQuery = function(name, value, build) {
      var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);

      if (typeof name === 'string' || name instanceof String) {
        data[name] = value !== undefined ? value : null;
      } else if (typeof name === 'object') {
        for (var key in name) {
          if (hasOwn.call(name, key)) {
            data[key] = name[key];
          }
        }
      } else {
        throw new TypeError('URI.addQuery() accepts an object, string as the name parameter');
      }

      this._parts.query = URI.buildQuery(data, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
      if (typeof name !== 'string') {
        build = value;
      }

      this.build(!build);
      return this;
    };
    p.addQuery = function(name, value, build) {
      var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
      URI.addQuery(data, name, value === undefined ? null : value);
      this._parts.query = URI.buildQuery(data, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
      if (typeof name !== 'string') {
        build = value;
      }

      this.build(!build);
      return this;
    };
    p.removeQuery = function(name, value, build) {
      var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
      URI.removeQuery(data, name, value);
      this._parts.query = URI.buildQuery(data, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
      if (typeof name !== 'string') {
        build = value;
      }

      this.build(!build);
      return this;
    };
    p.hasQuery = function(name, value, withinArray) {
      var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
      return URI.hasQuery(data, name, value, withinArray);
    };
    p.setSearch = p.setQuery;
    p.addSearch = p.addQuery;
    p.removeSearch = p.removeQuery;
    p.hasSearch = p.hasQuery;

    // sanitizing URLs
    p.normalize = function() {
      if (this._parts.urn) {
        return this
          .normalizeProtocol(false)
          .normalizePath(false)
          .normalizeQuery(false)
          .normalizeFragment(false)
          .build();
      }

      return this
        .normalizeProtocol(false)
        .normalizeHostname(false)
        .normalizePort(false)
        .normalizePath(false)
        .normalizeQuery(false)
        .normalizeFragment(false)
        .build();
    };
    p.normalizeProtocol = function(build) {
      if (typeof this._parts.protocol === 'string') {
        this._parts.protocol = this._parts.protocol.toLowerCase();
        this.build(!build);
      }

      return this;
    };
    p.normalizeHostname = function(build) {
      if (this._parts.hostname) {
        if (this.is('IDN') && punycode) {
          this._parts.hostname = punycode.toASCII(this._parts.hostname);
        } else if (this.is('IPv6') && IPv6) {
          this._parts.hostname = IPv6.best(this._parts.hostname);
        }

        this._parts.hostname = this._parts.hostname.toLowerCase();
        this.build(!build);
      }

      return this;
    };
    p.normalizePort = function(build) {
      // remove port of it's the protocol's default
      if (typeof this._parts.protocol === 'string' && this._parts.port === URI.defaultPorts[this._parts.protocol]) {
        this._parts.port = null;
        this.build(!build);
      }

      return this;
    };
    p.normalizePath = function(build) {
      var _path = this._parts.path;
      if (!_path) {
        return this;
      }

      if (this._parts.urn) {
        this._parts.path = URI.recodeUrnPath(this._parts.path);
        this.build(!build);
        return this;
      }

      if (this._parts.path === '/') {
        return this;
      }

      _path = URI.recodePath(_path);

      var _was_relative;
      var _leadingParents = '';
      var _parent, _pos;

      // handle relative paths
      if (_path.charAt(0) !== '/') {
        _was_relative = true;
        _path = '/' + _path;
      }

      // handle relative files (as opposed to directories)
      if (_path.slice(-3) === '/..' || _path.slice(-2) === '/.') {
        _path += '/';
      }

      // resolve simples
      _path = _path
        .replace(/(\/(\.\/)+)|(\/\.$)/g, '/')
        .replace(/\/{2,}/g, '/');

      // remember leading parents
      if (_was_relative) {
        _leadingParents = _path.substring(1).match(/^(\.\.\/)+/) || '';
        if (_leadingParents) {
          _leadingParents = _leadingParents[0];
        }
      }

      // resolve parents
      while (true) {
        _parent = _path.search(/\/\.\.(\/|$)/);
        if (_parent === -1) {
          // no more ../ to resolve
          break;
        } else if (_parent === 0) {
          // top level cannot be relative, skip it
          _path = _path.substring(3);
          continue;
        }

        _pos = _path.substring(0, _parent).lastIndexOf('/');
        if (_pos === -1) {
          _pos = _parent;
        }
        _path = _path.substring(0, _pos) + _path.substring(_parent + 3);
      }

      // revert to relative
      if (_was_relative && this.is('relative')) {
        _path = _leadingParents + _path.substring(1);
      }

      this._parts.path = _path;
      this.build(!build);
      return this;
    };
    p.normalizePathname = p.normalizePath;
    p.normalizeQuery = function(build) {
      if (typeof this._parts.query === 'string') {
        if (!this._parts.query.length) {
          this._parts.query = null;
        } else {
          this.query(URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace));
        }

        this.build(!build);
      }

      return this;
    };
    p.normalizeFragment = function(build) {
      if (!this._parts.fragment) {
        this._parts.fragment = null;
        this.build(!build);
      }

      return this;
    };
    p.normalizeSearch = p.normalizeQuery;
    p.normalizeHash = p.normalizeFragment;

    p.iso8859 = function() {
      // expect unicode input, iso8859 output
      var e = URI.encode;
      var d = URI.decode;

      URI.encode = escape;
      URI.decode = decodeURIComponent;
      try {
        this.normalize();
      } finally {
        URI.encode = e;
        URI.decode = d;
      }
      return this;
    };

    p.unicode = function() {
      // expect iso8859 input, unicode output
      var e = URI.encode;
      var d = URI.decode;

      URI.encode = strictEncodeURIComponent;
      URI.decode = unescape;
      try {
        this.normalize();
      } finally {
        URI.encode = e;
        URI.decode = d;
      }
      return this;
    };

    p.readable = function() {
      var uri = this.clone();
      // removing username, password, because they shouldn't be displayed according to RFC 3986
      uri.username('').password('').normalize();
      var t = '';
      if (uri._parts.protocol) {
        t += uri._parts.protocol + '://';
      }

      if (uri._parts.hostname) {
        if (uri.is('punycode') && punycode) {
          t += punycode.toUnicode(uri._parts.hostname);
          if (uri._parts.port) {
            t += ':' + uri._parts.port;
          }
        } else {
          t += uri.host();
        }
      }

      if (uri._parts.hostname && uri._parts.path && uri._parts.path.charAt(0) !== '/') {
        t += '/';
      }

      t += uri.path(true);
      if (uri._parts.query) {
        var q = '';
        for (var i = 0, qp = uri._parts.query.split('&'), l = qp.length; i < l; i++) {
          var kv = (qp[i] || '').split('=');
          q += '&' + URI.decodeQuery(kv[0], this._parts.escapeQuerySpace)
            .replace(/&/g, '%26');

          if (kv[1] !== undefined) {
            q += '=' + URI.decodeQuery(kv[1], this._parts.escapeQuerySpace)
              .replace(/&/g, '%26');
          }
        }
        t += '?' + q.substring(1);
      }

      t += URI.decodeQuery(uri.hash(), true);
      return t;
    };

    // resolving relative and absolute URLs
    p.absoluteTo = function(base) {
      var resolved = this.clone();
      var properties = ['protocol', 'username', 'password', 'hostname', 'port'];
      var basedir, i, p;

      if (this._parts.urn) {
        throw new Error('URNs do not have any generally defined hierarchical components');
      }

      if (!(base instanceof URI)) {
        base = new URI(base);
      }

      if (resolved._parts.protocol) {
        // Directly returns even if this._parts.hostname is empty.
        return resolved;
      } else {
        resolved._parts.protocol = base._parts.protocol;
      }

      if (this._parts.hostname) {
        return resolved;
      }

      for (i = 0; (p = properties[i]); i++) {
        resolved._parts[p] = base._parts[p];
      }

      if (!resolved._parts.path) {
        resolved._parts.path = base._parts.path;
        if (!resolved._parts.query) {
          resolved._parts.query = base._parts.query;
        }
      } else {
        if (resolved._parts.path.substring(-2) === '..') {
          resolved._parts.path += '/';
        }

        if (resolved.path().charAt(0) !== '/') {
          basedir = base.directory();
          basedir = basedir ? basedir : base.path().indexOf('/') === 0 ? '/' : '';
          resolved._parts.path = (basedir ? (basedir + '/') : '') + resolved._parts.path;
          resolved.normalizePath();
        }
      }

      resolved.build();
      return resolved;
    };
    p.relativeTo = function(base) {
      var relative = this.clone().normalize();
      var relativeParts, baseParts, common, relativePath, basePath;

      if (relative._parts.urn) {
        throw new Error('URNs do not have any generally defined hierarchical components');
      }

      base = new URI(base).normalize();
      relativeParts = relative._parts;
      baseParts = base._parts;
      relativePath = relative.path();
      basePath = base.path();

      if (relativePath.charAt(0) !== '/') {
        throw new Error('URI is already relative');
      }

      if (basePath.charAt(0) !== '/') {
        throw new Error('Cannot calculate a URI relative to another relative URI');
      }

      if (relativeParts.protocol === baseParts.protocol) {
        relativeParts.protocol = null;
      }

      if (relativeParts.username !== baseParts.username || relativeParts.password !== baseParts.password) {
        return relative.build();
      }

      if (relativeParts.protocol !== null || relativeParts.username !== null || relativeParts.password !== null) {
        return relative.build();
      }

      if (relativeParts.hostname === baseParts.hostname && relativeParts.port === baseParts.port) {
        relativeParts.hostname = null;
        relativeParts.port = null;
      } else {
        return relative.build();
      }

      if (relativePath === basePath) {
        relativeParts.path = '';
        return relative.build();
      }

      // determine common sub path
      common = URI.commonPath(relativePath, basePath);

      // If the paths have nothing in common, return a relative URL with the absolute path.
      if (!common) {
        return relative.build();
      }

      var parents = baseParts.path
        .substring(common.length)
        .replace(/[^\/]*$/, '')
        .replace(/.*?\//g, '../');

      relativeParts.path = (parents + relativeParts.path.substring(common.length)) || './';

      return relative.build();
    };

    // comparing URIs
    p.equals = function(uri) {
      var one = this.clone();
      var two = new URI(uri);
      var one_map = {};
      var two_map = {};
      var checked = {};
      var one_query, two_query, key;

      one.normalize();
      two.normalize();

      // exact match
      if (one.toString() === two.toString()) {
        return true;
      }

      // extract query string
      one_query = one.query();
      two_query = two.query();
      one.query('');
      two.query('');

      // definitely not equal if not even non-query parts match
      if (one.toString() !== two.toString()) {
        return false;
      }

      // query parameters have the same length, even if they're permuted
      if (one_query.length !== two_query.length) {
        return false;
      }

      one_map = URI.parseQuery(one_query, this._parts.escapeQuerySpace);
      two_map = URI.parseQuery(two_query, this._parts.escapeQuerySpace);

      for (key in one_map) {
        if (hasOwn.call(one_map, key)) {
          if (!isArray(one_map[key])) {
            if (one_map[key] !== two_map[key]) {
              return false;
            }
          } else if (!arraysEqual(one_map[key], two_map[key])) {
            return false;
          }

          checked[key] = true;
        }
      }

      for (key in two_map) {
        if (hasOwn.call(two_map, key)) {
          if (!checked[key]) {
            // two contains a parameter not present in one
            return false;
          }
        }
      }

      return true;
    };

    // state
    p.preventInvalidHostname = function(v) {
      this._parts.preventInvalidHostname = !!v;
      return this;
    };

    p.duplicateQueryParameters = function(v) {
      this._parts.duplicateQueryParameters = !!v;
      return this;
    };

    p.escapeQuerySpace = function(v) {
      this._parts.escapeQuerySpace = !!v;
      return this;
    };

    return URI;
  }));
  });

  // Copyright Joyent, Inc. and other Node contributors.

  var R = typeof Reflect === 'object' ? Reflect : null;
  var ReflectApply = R && typeof R.apply === 'function'
    ? R.apply
    : function ReflectApply(target, receiver, args) {
      return Function.prototype.apply.call(target, receiver, args);
    };

  var ReflectOwnKeys;
  if (R && typeof R.ownKeys === 'function') {
    ReflectOwnKeys = R.ownKeys;
  } else if (Object.getOwnPropertySymbols) {
    ReflectOwnKeys = function ReflectOwnKeys(target) {
      return Object.getOwnPropertyNames(target)
        .concat(Object.getOwnPropertySymbols(target));
    };
  } else {
    ReflectOwnKeys = function ReflectOwnKeys(target) {
      return Object.getOwnPropertyNames(target);
    };
  }

  function ProcessEmitWarning(warning) {
    if (console && console.warn) console.warn(warning);
  }

  var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
    return value !== value;
  };

  function EventEmitter() {
    EventEmitter.init.call(this);
  }
  var events = EventEmitter;

  // Backwards-compat with node 0.10.x
  EventEmitter.EventEmitter = EventEmitter;

  EventEmitter.prototype._events = undefined;
  EventEmitter.prototype._eventsCount = 0;
  EventEmitter.prototype._maxListeners = undefined;

  // By default EventEmitters will print a warning if more than 10 listeners are
  // added to it. This is a useful default which helps finding memory leaks.
  var defaultMaxListeners = 10;

  Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
    enumerable: true,
    get: function() {
      return defaultMaxListeners;
    },
    set: function(arg) {
      if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
        throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
      }
      defaultMaxListeners = arg;
    }
  });

  EventEmitter.init = function() {

    if (this._events === undefined ||
        this._events === Object.getPrototypeOf(this)._events) {
      this._events = Object.create(null);
      this._eventsCount = 0;
    }

    this._maxListeners = this._maxListeners || undefined;
  };

  // Obviously not all Emitters should be limited to 10. This function allows
  // that to be increased. Set to zero for unlimited.
  EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
    if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
      throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
    }
    this._maxListeners = n;
    return this;
  };

  function $getMaxListeners(that) {
    if (that._maxListeners === undefined)
      return EventEmitter.defaultMaxListeners;
    return that._maxListeners;
  }

  EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
    return $getMaxListeners(this);
  };

  EventEmitter.prototype.emit = function emit(type) {
    var args = [];
    for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
    var doError = (type === 'error');

    var events = this._events;
    if (events !== undefined)
      doError = (doError && events.error === undefined);
    else if (!doError)
      return false;

    // If there is no 'error' event listener then throw.
    if (doError) {
      var er;
      if (args.length > 0)
        er = args[0];
      if (er instanceof Error) {
        // Note: The comments on the `throw` lines are intentional, they show
        // up in Node's output if this results in an unhandled exception.
        throw er; // Unhandled 'error' event
      }
      // At least give some kind of context to the user
      var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
      err.context = er;
      throw err; // Unhandled 'error' event
    }

    var handler = events[type];

    if (handler === undefined)
      return false;

    if (typeof handler === 'function') {
      ReflectApply(handler, this, args);
    } else {
      var len = handler.length;
      var listeners = arrayClone(handler, len);
      for (var i = 0; i < len; ++i)
        ReflectApply(listeners[i], this, args);
    }

    return true;
  };

  function _addListener(target, type, listener, prepend) {
    var m;
    var events;
    var existing;

    if (typeof listener !== 'function') {
      throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
    }

    events = target._events;
    if (events === undefined) {
      events = target._events = Object.create(null);
      target._eventsCount = 0;
    } else {
      // To avoid recursion in the case that type === "newListener"! Before
      // adding it to the listeners, first emit "newListener".
      if (events.newListener !== undefined) {
        target.emit('newListener', type,
                    listener.listener ? listener.listener : listener);

        // Re-assign `events` because a newListener handler could have caused the
        // this._events to be assigned to a new object
        events = target._events;
      }
      existing = events[type];
    }

    if (existing === undefined) {
      // Optimize the case of one listener. Don't need the extra array object.
      existing = events[type] = listener;
      ++target._eventsCount;
    } else {
      if (typeof existing === 'function') {
        // Adding the second element, need to change to array.
        existing = events[type] =
          prepend ? [listener, existing] : [existing, listener];
        // If we've already got an array, just append.
      } else if (prepend) {
        existing.unshift(listener);
      } else {
        existing.push(listener);
      }

      // Check for listener leak
      m = $getMaxListeners(target);
      if (m > 0 && existing.length > m && !existing.warned) {
        existing.warned = true;
        // No error code for this since it is a Warning
        // eslint-disable-next-line no-restricted-syntax
        var w = new Error('Possible EventEmitter memory leak detected. ' +
                            existing.length + ' ' + String(type) + ' listeners ' +
                            'added. Use emitter.setMaxListeners() to ' +
                            'increase limit');
        w.name = 'MaxListenersExceededWarning';
        w.emitter = target;
        w.type = type;
        w.count = existing.length;
        ProcessEmitWarning(w);
      }
    }

    return target;
  }

  EventEmitter.prototype.addListener = function addListener(type, listener) {
    return _addListener(this, type, listener, false);
  };

  EventEmitter.prototype.on = EventEmitter.prototype.addListener;

  EventEmitter.prototype.prependListener =
      function prependListener(type, listener) {
        return _addListener(this, type, listener, true);
      };

  function onceWrapper() {
    var args = [];
    for (var i = 0; i < arguments.length; i++) args.push(arguments[i]);
    if (!this.fired) {
      this.target.removeListener(this.type, this.wrapFn);
      this.fired = true;
      ReflectApply(this.listener, this.target, args);
    }
  }

  function _onceWrap(target, type, listener) {
    var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
    var wrapped = onceWrapper.bind(state);
    wrapped.listener = listener;
    state.wrapFn = wrapped;
    return wrapped;
  }

  EventEmitter.prototype.once = function once(type, listener) {
    if (typeof listener !== 'function') {
      throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
    }
    this.on(type, _onceWrap(this, type, listener));
    return this;
  };

  EventEmitter.prototype.prependOnceListener =
      function prependOnceListener(type, listener) {
        if (typeof listener !== 'function') {
          throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
        }
        this.prependListener(type, _onceWrap(this, type, listener));
        return this;
      };

  // Emits a 'removeListener' event if and only if the listener was removed.
  EventEmitter.prototype.removeListener =
      function removeListener(type, listener) {
        var list, events, position, i, originalListener;

        if (typeof listener !== 'function') {
          throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
        }

        events = this._events;
        if (events === undefined)
          return this;

        list = events[type];
        if (list === undefined)
          return this;

        if (list === listener || list.listener === listener) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else {
            delete events[type];
            if (events.removeListener)
              this.emit('removeListener', type, list.listener || listener);
          }
        } else if (typeof list !== 'function') {
          position = -1;

          for (i = list.length - 1; i >= 0; i--) {
            if (list[i] === listener || list[i].listener === listener) {
              originalListener = list[i].listener;
              position = i;
              break;
            }
          }

          if (position < 0)
            return this;

          if (position === 0)
            list.shift();
          else {
            spliceOne(list, position);
          }

          if (list.length === 1)
            events[type] = list[0];

          if (events.removeListener !== undefined)
            this.emit('removeListener', type, originalListener || listener);
        }

        return this;
      };

  EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

  EventEmitter.prototype.removeAllListeners =
      function removeAllListeners(type) {
        var listeners, events, i;

        events = this._events;
        if (events === undefined)
          return this;

        // not listening for removeListener, no need to emit
        if (events.removeListener === undefined) {
          if (arguments.length === 0) {
            this._events = Object.create(null);
            this._eventsCount = 0;
          } else if (events[type] !== undefined) {
            if (--this._eventsCount === 0)
              this._events = Object.create(null);
            else
              delete events[type];
          }
          return this;
        }

        // emit removeListener for all listeners on all events
        if (arguments.length === 0) {
          var keys = Object.keys(events);
          var key;
          for (i = 0; i < keys.length; ++i) {
            key = keys[i];
            if (key === 'removeListener') continue;
            this.removeAllListeners(key);
          }
          this.removeAllListeners('removeListener');
          this._events = Object.create(null);
          this._eventsCount = 0;
          return this;
        }

        listeners = events[type];

        if (typeof listeners === 'function') {
          this.removeListener(type, listeners);
        } else if (listeners !== undefined) {
          // LIFO order
          for (i = listeners.length - 1; i >= 0; i--) {
            this.removeListener(type, listeners[i]);
          }
        }

        return this;
      };

  function _listeners(target, type, unwrap) {
    var events = target._events;

    if (events === undefined)
      return [];

    var evlistener = events[type];
    if (evlistener === undefined)
      return [];

    if (typeof evlistener === 'function')
      return unwrap ? [evlistener.listener || evlistener] : [evlistener];

    return unwrap ?
      unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
  }

  EventEmitter.prototype.listeners = function listeners(type) {
    return _listeners(this, type, true);
  };

  EventEmitter.prototype.rawListeners = function rawListeners(type) {
    return _listeners(this, type, false);
  };

  EventEmitter.listenerCount = function(emitter, type) {
    if (typeof emitter.listenerCount === 'function') {
      return emitter.listenerCount(type);
    } else {
      return listenerCount.call(emitter, type);
    }
  };

  EventEmitter.prototype.listenerCount = listenerCount;
  function listenerCount(type) {
    var events = this._events;

    if (events !== undefined) {
      var evlistener = events[type];

      if (typeof evlistener === 'function') {
        return 1;
      } else if (evlistener !== undefined) {
        return evlistener.length;
      }
    }

    return 0;
  }

  EventEmitter.prototype.eventNames = function eventNames() {
    return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
  };

  function arrayClone(arr, n) {
    var copy = new Array(n);
    for (var i = 0; i < n; ++i)
      copy[i] = arr[i];
    return copy;
  }

  function spliceOne(list, index) {
    for (; index + 1 < list.length; index++)
      list[index] = list[index + 1];
    list.pop();
  }

  function unwrapListeners(arr) {
    var ret = new Array(arr.length);
    for (var i = 0; i < ret.length; ++i) {
      ret[i] = arr[i].listener || arr[i];
    }
    return ret;
  }

  var freeze$1 = Object.freeze || function (x) {
    return x;
  };

  var html = freeze$1(['a', 'abbr', 'acronym', 'address', 'area', 'article', 'aside', 'audio', 'b', 'bdi', 'bdo', 'big', 'blink', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'center', 'cite', 'code', 'col', 'colgroup', 'content', 'data', 'datalist', 'dd', 'decorator', 'del', 'details', 'dfn', 'dir', 'div', 'dl', 'dt', 'element', 'em', 'fieldset', 'figcaption', 'figure', 'font', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'img', 'input', 'ins', 'kbd', 'label', 'legend', 'li', 'main', 'map', 'mark', 'marquee', 'menu', 'menuitem', 'meter', 'nav', 'nobr', 'ol', 'optgroup', 'option', 'output', 'p', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'section', 'select', 'shadow', 'small', 'source', 'spacer', 'span', 'strike', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'tr', 'track', 'tt', 'u', 'ul', 'var', 'video', 'wbr']);

  // SVG
  var svg = freeze$1(['svg', 'a', 'altglyph', 'altglyphdef', 'altglyphitem', 'animatecolor', 'animatemotion', 'animatetransform', 'audio', 'canvas', 'circle', 'clippath', 'defs', 'desc', 'ellipse', 'filter', 'font', 'g', 'glyph', 'glyphref', 'hkern', 'image', 'line', 'lineargradient', 'marker', 'mask', 'metadata', 'mpath', 'path', 'pattern', 'polygon', 'polyline', 'radialgradient', 'rect', 'stop', 'style', 'switch', 'symbol', 'text', 'textpath', 'title', 'tref', 'tspan', 'video', 'view', 'vkern']);

  var svgFilters = freeze$1(['feBlend', 'feColorMatrix', 'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap', 'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR', 'feGaussianBlur', 'feMerge', 'feMergeNode', 'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile', 'feTurbulence']);

  var mathMl = freeze$1(['math', 'menclose', 'merror', 'mfenced', 'mfrac', 'mglyph', 'mi', 'mlabeledtr', 'mmultiscripts', 'mn', 'mo', 'mover', 'mpadded', 'mphantom', 'mroot', 'mrow', 'ms', 'mspace', 'msqrt', 'mstyle', 'msub', 'msup', 'msubsup', 'mtable', 'mtd', 'mtext', 'mtr', 'munder', 'munderover']);

  var text = freeze$1(['#text']);

  var freeze$2 = Object.freeze || function (x) {
    return x;
  };

  var html$1 = freeze$2(['accept', 'action', 'align', 'alt', 'autocomplete', 'background', 'bgcolor', 'border', 'cellpadding', 'cellspacing', 'checked', 'cite', 'class', 'clear', 'color', 'cols', 'colspan', 'coords', 'crossorigin', 'datetime', 'default', 'dir', 'disabled', 'download', 'enctype', 'face', 'for', 'headers', 'height', 'hidden', 'high', 'href', 'hreflang', 'id', 'integrity', 'ismap', 'label', 'lang', 'list', 'loop', 'low', 'max', 'maxlength', 'media', 'method', 'min', 'multiple', 'name', 'noshade', 'novalidate', 'nowrap', 'open', 'optimum', 'pattern', 'placeholder', 'poster', 'preload', 'pubdate', 'radiogroup', 'readonly', 'rel', 'required', 'rev', 'reversed', 'role', 'rows', 'rowspan', 'spellcheck', 'scope', 'selected', 'shape', 'size', 'sizes', 'span', 'srclang', 'start', 'src', 'srcset', 'step', 'style', 'summary', 'tabindex', 'title', 'type', 'usemap', 'valign', 'value', 'width', 'xmlns']);

  var svg$1 = freeze$2(['accent-height', 'accumulate', 'additive', 'alignment-baseline', 'ascent', 'attributename', 'attributetype', 'azimuth', 'basefrequency', 'baseline-shift', 'begin', 'bias', 'by', 'class', 'clip', 'clip-path', 'clip-rule', 'color', 'color-interpolation', 'color-interpolation-filters', 'color-profile', 'color-rendering', 'cx', 'cy', 'd', 'dx', 'dy', 'diffuseconstant', 'direction', 'display', 'divisor', 'dur', 'edgemode', 'elevation', 'end', 'fill', 'fill-opacity', 'fill-rule', 'filter', 'flood-color', 'flood-opacity', 'font-family', 'font-size', 'font-size-adjust', 'font-stretch', 'font-style', 'font-variant', 'font-weight', 'fx', 'fy', 'g1', 'g2', 'glyph-name', 'glyphref', 'gradientunits', 'gradienttransform', 'height', 'href', 'id', 'image-rendering', 'in', 'in2', 'k', 'k1', 'k2', 'k3', 'k4', 'kerning', 'keypoints', 'keysplines', 'keytimes', 'lang', 'lengthadjust', 'letter-spacing', 'kernelmatrix', 'kernelunitlength', 'lighting-color', 'local', 'marker-end', 'marker-mid', 'marker-start', 'markerheight', 'markerunits', 'markerwidth', 'maskcontentunits', 'maskunits', 'max', 'mask', 'media', 'method', 'mode', 'min', 'name', 'numoctaves', 'offset', 'operator', 'opacity', 'order', 'orient', 'orientation', 'origin', 'overflow', 'paint-order', 'path', 'pathlength', 'patterncontentunits', 'patterntransform', 'patternunits', 'points', 'preservealpha', 'preserveaspectratio', 'r', 'rx', 'ry', 'radius', 'refx', 'refy', 'repeatcount', 'repeatdur', 'restart', 'result', 'rotate', 'scale', 'seed', 'shape-rendering', 'specularconstant', 'specularexponent', 'spreadmethod', 'stddeviation', 'stitchtiles', 'stop-color', 'stop-opacity', 'stroke-dasharray', 'stroke-dashoffset', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit', 'stroke-opacity', 'stroke', 'stroke-width', 'style', 'surfacescale', 'tabindex', 'targetx', 'targety', 'transform', 'text-anchor', 'text-decoration', 'text-rendering', 'textlength', 'type', 'u1', 'u2', 'unicode', 'values', 'viewbox', 'visibility', 'version', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'width', 'word-spacing', 'wrap', 'writing-mode', 'xchannelselector', 'ychannelselector', 'x', 'x1', 'x2', 'xmlns', 'y', 'y1', 'y2', 'z', 'zoomandpan']);

  var mathMl$1 = freeze$2(['accent', 'accentunder', 'align', 'bevelled', 'close', 'columnsalign', 'columnlines', 'columnspan', 'denomalign', 'depth', 'dir', 'display', 'displaystyle', 'fence', 'frame', 'height', 'href', 'id', 'largeop', 'length', 'linethickness', 'lspace', 'lquote', 'mathbackground', 'mathcolor', 'mathsize', 'mathvariant', 'maxsize', 'minsize', 'movablelimits', 'notation', 'numalign', 'open', 'rowalign', 'rowlines', 'rowspacing', 'rowspan', 'rspace', 'rquote', 'scriptlevel', 'scriptminsize', 'scriptsizemultiplier', 'selection', 'separator', 'separators', 'stretchy', 'subscriptshift', 'supscriptshift', 'symmetric', 'voffset', 'width', 'xmlns']);

  var xml = freeze$2(['xlink:href', 'xml:id', 'xlink:title', 'xml:space', 'xmlns:xlink']);

  var hasOwnProperty = Object.hasOwnProperty;
  var setPrototypeOf = Object.setPrototypeOf;

  var _ref$1 = typeof Reflect !== 'undefined' && Reflect;
  var apply$1 = _ref$1.apply;

  if (!apply$1) {
    apply$1 = function apply(fun, thisValue, args) {
      return fun.apply(thisValue, args);
    };
  }

  /* Add properties to a lookup table */
  function addToSet(set, array) {
    if (setPrototypeOf) {
      // Make 'in' and truthy checks like Boolean(set.constructor)
      // independent of any properties defined on Object.prototype.
      // Prevent prototype setters from intercepting set as a this value.
      setPrototypeOf(set, null);
    }

    var l = array.length;
    while (l--) {
      var element = array[l];
      if (typeof element === 'string') {
        var lcElement = element.toLowerCase();
        if (lcElement !== element) {
          // Config presets (e.g. tags.js, attrs.js) are immutable.
          if (!Object.isFrozen(array)) {
            array[l] = lcElement;
          }

          element = lcElement;
        }
      }

      set[element] = true;
    }

    return set;
  }

  /* Shallow clone an object */
  function clone(object) {
    var newObject = {};

    var property = void 0;
    for (property in object) {
      if (apply$1(hasOwnProperty, object, [property])) {
        newObject[property] = object[property];
      }
    }

    return newObject;
  }

  var seal = Object.seal || function (x) {
    return x;
  };

  var MUSTACHE_EXPR = seal(/\{\{[\s\S]*|[\s\S]*\}\}/gm); // Specify template detection regex for SAFE_FOR_TEMPLATES mode
  var ERB_EXPR = seal(/<%[\s\S]*|[\s\S]*%>/gm);
  var DATA_ATTR = seal(/^data-[\-\w.\u00B7-\uFFFF]/); // eslint-disable-line no-useless-escape
  var ARIA_ATTR = seal(/^aria-[\-\w]+$/); // eslint-disable-line no-useless-escape
  var IS_ALLOWED_URI = seal(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i // eslint-disable-line no-useless-escape
  );
  var IS_SCRIPT_OR_DATA = seal(/^(?:\w+script|data):/i);
  var ATTR_WHITESPACE = seal(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205f\u3000]/g // eslint-disable-line no-control-regex
  );

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

  function _toConsumableArray$1(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

  var _ref = typeof Reflect !== 'undefined' && Reflect;
  var apply = _ref.apply;

  var arraySlice = Array.prototype.slice;
  var freeze = Object.freeze;

  var getGlobal = function getGlobal() {
    return typeof window === 'undefined' ? null : window;
  };

  if (!apply) {
    apply = function apply(fun, thisValue, args) {
      return fun.apply(thisValue, args);
    };
  }

  /**
   * Creates a no-op policy for internal use only.
   * Don't export this function outside this module!
   * @param {?TrustedTypePolicyFactory} trustedTypes The policy factory.
   * @param {Document} document The document object (to determine policy name suffix)
   * @return {?TrustedTypePolicy} The policy created (or null, if Trusted Types
   * are not supported).
   */
  var _createTrustedTypesPolicy = function _createTrustedTypesPolicy(trustedTypes, document) {
    if ((typeof trustedTypes === 'undefined' ? 'undefined' : _typeof(trustedTypes)) !== 'object' || typeof trustedTypes.createPolicy !== 'function') {
      return null;
    }

    // Allow the callers to control the unique policy name
    // by adding a data-tt-policy-suffix to the script element with the DOMPurify.
    // Policy creation with duplicate names throws in Trusted Types.
    var suffix = null;
    var ATTR_NAME = 'data-tt-policy-suffix';
    if (document.currentScript && document.currentScript.hasAttribute(ATTR_NAME)) {
      suffix = document.currentScript.getAttribute(ATTR_NAME);
    }

    var policyName = 'dompurify' + (suffix ? '#' + suffix : '');

    try {
      return trustedTypes.createPolicy(policyName, {
        createHTML: function createHTML(html$$1) {
          return html$$1;
        }
      });
    } catch (error) {
      // Policy creation failed (most likely another DOMPurify script has
      // already run). Skip creating the policy, as this will only cause errors
      // if TT are enforced.
      console.warn('TrustedTypes policy ' + policyName + ' could not be created.');
      return null;
    }
  };

  function createDOMPurify() {
    var window = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getGlobal();

    var DOMPurify = function DOMPurify(root) {
      return createDOMPurify(root);
    };

    /**
     * Version label, exposed for easier checks
     * if DOMPurify is up to date or not
     */
    DOMPurify.version = '1.0.10';

    /**
     * Array of elements that DOMPurify removed during sanitation.
     * Empty if nothing was removed.
     */
    DOMPurify.removed = [];

    if (!window || !window.document || window.document.nodeType !== 9) {
      // Not running in a browser, provide a factory function
      // so that you can pass your own Window
      DOMPurify.isSupported = false;

      return DOMPurify;
    }

    var originalDocument = window.document;
    var useDOMParser = false;
    var removeTitle = false;

    var document = window.document;
    var DocumentFragment = window.DocumentFragment,
        HTMLTemplateElement = window.HTMLTemplateElement,
        Node = window.Node,
        NodeFilter = window.NodeFilter,
        _window$NamedNodeMap = window.NamedNodeMap,
        NamedNodeMap = _window$NamedNodeMap === undefined ? window.NamedNodeMap || window.MozNamedAttrMap : _window$NamedNodeMap,
        Text = window.Text,
        Comment = window.Comment,
        DOMParser = window.DOMParser,
        TrustedTypes = window.TrustedTypes;

    // As per issue #47, the web-components registry is inherited by a
    // new document created via createHTMLDocument. As per the spec
    // (http://w3c.github.io/webcomponents/spec/custom/#creating-and-passing-registries)
    // a new empty registry is used when creating a template contents owner
    // document, so we use that as our parent document to ensure nothing
    // is inherited.

    if (typeof HTMLTemplateElement === 'function') {
      var template = document.createElement('template');
      if (template.content && template.content.ownerDocument) {
        document = template.content.ownerDocument;
      }
    }

    var trustedTypesPolicy = _createTrustedTypesPolicy(TrustedTypes, originalDocument);
    var emptyHTML = trustedTypesPolicy ? trustedTypesPolicy.createHTML('') : '';

    var _document = document,
        implementation = _document.implementation,
        createNodeIterator = _document.createNodeIterator,
        getElementsByTagName = _document.getElementsByTagName,
        createDocumentFragment = _document.createDocumentFragment;
    var importNode = originalDocument.importNode;


    var hooks = {};

    /**
     * Expose whether this browser supports running the full DOMPurify.
     */
    DOMPurify.isSupported = implementation && typeof implementation.createHTMLDocument !== 'undefined' && document.documentMode !== 9;

    var MUSTACHE_EXPR$$1 = MUSTACHE_EXPR,
        ERB_EXPR$$1 = ERB_EXPR,
        DATA_ATTR$$1 = DATA_ATTR,
        ARIA_ATTR$$1 = ARIA_ATTR,
        IS_SCRIPT_OR_DATA$$1 = IS_SCRIPT_OR_DATA,
        ATTR_WHITESPACE$$1 = ATTR_WHITESPACE;
    var IS_ALLOWED_URI$$1 = IS_ALLOWED_URI;
    /**
     * We consider the elements and attributes below to be safe. Ideally
     * don't add any new ones but feel free to remove unwanted ones.
     */

    /* allowed element names */

    var ALLOWED_TAGS = null;
    var DEFAULT_ALLOWED_TAGS = addToSet({}, [].concat(_toConsumableArray$1(html), _toConsumableArray$1(svg), _toConsumableArray$1(svgFilters), _toConsumableArray$1(mathMl), _toConsumableArray$1(text)));

    /* Allowed attribute names */
    var ALLOWED_ATTR = null;
    var DEFAULT_ALLOWED_ATTR = addToSet({}, [].concat(_toConsumableArray$1(html$1), _toConsumableArray$1(svg$1), _toConsumableArray$1(mathMl$1), _toConsumableArray$1(xml)));

    /* Explicitly forbidden tags (overrides ALLOWED_TAGS/ADD_TAGS) */
    var FORBID_TAGS = null;

    /* Explicitly forbidden attributes (overrides ALLOWED_ATTR/ADD_ATTR) */
    var FORBID_ATTR = null;

    /* Decide if ARIA attributes are okay */
    var ALLOW_ARIA_ATTR = true;

    /* Decide if custom data attributes are okay */
    var ALLOW_DATA_ATTR = true;

    /* Decide if unknown protocols are okay */
    var ALLOW_UNKNOWN_PROTOCOLS = false;

    /* Output should be safe for jQuery's $() factory? */
    var SAFE_FOR_JQUERY = false;

    /* Output should be safe for common template engines.
     * This means, DOMPurify removes data attributes, mustaches and ERB
     */
    var SAFE_FOR_TEMPLATES = false;

    /* Decide if document with <html>... should be returned */
    var WHOLE_DOCUMENT = false;

    /* Track whether config is already set on this instance of DOMPurify. */
    var SET_CONFIG = false;

    /* Decide if all elements (e.g. style, script) must be children of
     * document.body. By default, browsers might move them to document.head */
    var FORCE_BODY = false;

    /* Decide if a DOM `HTMLBodyElement` should be returned, instead of a html
     * string (or a TrustedHTML object if Trusted Types are supported).
     * If `WHOLE_DOCUMENT` is enabled a `HTMLHtmlElement` will be returned instead
     */
    var RETURN_DOM = false;

    /* Decide if a DOM `DocumentFragment` should be returned, instead of a html
     * string  (or a TrustedHTML object if Trusted Types are supported) */
    var RETURN_DOM_FRAGMENT = false;

    /* If `RETURN_DOM` or `RETURN_DOM_FRAGMENT` is enabled, decide if the returned DOM
     * `Node` is imported into the current `Document`. If this flag is not enabled the
     * `Node` will belong (its ownerDocument) to a fresh `HTMLDocument`, created by
     * DOMPurify. */
    var RETURN_DOM_IMPORT = false;

    /* Output should be free from DOM clobbering attacks? */
    var SANITIZE_DOM = true;

    /* Keep element content when removing element? */
    var KEEP_CONTENT = true;

    /* If a `Node` is passed to sanitize(), then performs sanitization in-place instead
     * of importing it into a new Document and returning a sanitized copy */
    var IN_PLACE = false;

    /* Allow usage of profiles like html, svg and mathMl */
    var USE_PROFILES = {};

    /* Tags to ignore content of when KEEP_CONTENT is true */
    var FORBID_CONTENTS = addToSet({}, ['audio', 'head', 'math', 'script', 'style', 'template', 'svg', 'video']);

    /* Tags that are safe for data: URIs */
    var DATA_URI_TAGS = addToSet({}, ['audio', 'video', 'img', 'source', 'image']);

    /* Attributes safe for values like "javascript:" */
    var URI_SAFE_ATTRIBUTES = addToSet({}, ['alt', 'class', 'for', 'id', 'label', 'name', 'pattern', 'placeholder', 'summary', 'title', 'value', 'style', 'xmlns']);

    /* Keep a reference to config to pass to hooks */
    var CONFIG = null;

    /* Ideally, do not touch anything below this line */
    /* ______________________________________________ */

    var formElement = document.createElement('form');

    /**
     * _parseConfig
     *
     * @param  {Object} cfg optional config literal
     */
    // eslint-disable-next-line complexity
    var _parseConfig = function _parseConfig(cfg) {
      if (CONFIG && CONFIG === cfg) {
        return;
      }

      /* Shield configuration object from tampering */
      if (!cfg || (typeof cfg === 'undefined' ? 'undefined' : _typeof(cfg)) !== 'object') {
        cfg = {};
      }

      /* Set configuration parameters */
      ALLOWED_TAGS = 'ALLOWED_TAGS' in cfg ? addToSet({}, cfg.ALLOWED_TAGS) : DEFAULT_ALLOWED_TAGS;
      ALLOWED_ATTR = 'ALLOWED_ATTR' in cfg ? addToSet({}, cfg.ALLOWED_ATTR) : DEFAULT_ALLOWED_ATTR;
      FORBID_TAGS = 'FORBID_TAGS' in cfg ? addToSet({}, cfg.FORBID_TAGS) : {};
      FORBID_ATTR = 'FORBID_ATTR' in cfg ? addToSet({}, cfg.FORBID_ATTR) : {};
      USE_PROFILES = 'USE_PROFILES' in cfg ? cfg.USE_PROFILES : false;
      ALLOW_ARIA_ATTR = cfg.ALLOW_ARIA_ATTR !== false; // Default true
      ALLOW_DATA_ATTR = cfg.ALLOW_DATA_ATTR !== false; // Default true
      ALLOW_UNKNOWN_PROTOCOLS = cfg.ALLOW_UNKNOWN_PROTOCOLS || false; // Default false
      SAFE_FOR_JQUERY = cfg.SAFE_FOR_JQUERY || false; // Default false
      SAFE_FOR_TEMPLATES = cfg.SAFE_FOR_TEMPLATES || false; // Default false
      WHOLE_DOCUMENT = cfg.WHOLE_DOCUMENT || false; // Default false
      RETURN_DOM = cfg.RETURN_DOM || false; // Default false
      RETURN_DOM_FRAGMENT = cfg.RETURN_DOM_FRAGMENT || false; // Default false
      RETURN_DOM_IMPORT = cfg.RETURN_DOM_IMPORT || false; // Default false
      FORCE_BODY = cfg.FORCE_BODY || false; // Default false
      SANITIZE_DOM = cfg.SANITIZE_DOM !== false; // Default true
      KEEP_CONTENT = cfg.KEEP_CONTENT !== false; // Default true
      IN_PLACE = cfg.IN_PLACE || false; // Default false

      IS_ALLOWED_URI$$1 = cfg.ALLOWED_URI_REGEXP || IS_ALLOWED_URI$$1;

      if (SAFE_FOR_TEMPLATES) {
        ALLOW_DATA_ATTR = false;
      }

      if (RETURN_DOM_FRAGMENT) {
        RETURN_DOM = true;
      }

      /* Parse profile info */
      if (USE_PROFILES) {
        ALLOWED_TAGS = addToSet({}, [].concat(_toConsumableArray$1(text)));
        ALLOWED_ATTR = [];
        if (USE_PROFILES.html === true) {
          addToSet(ALLOWED_TAGS, html);
          addToSet(ALLOWED_ATTR, html$1);
        }

        if (USE_PROFILES.svg === true) {
          addToSet(ALLOWED_TAGS, svg);
          addToSet(ALLOWED_ATTR, svg$1);
          addToSet(ALLOWED_ATTR, xml);
        }

        if (USE_PROFILES.svgFilters === true) {
          addToSet(ALLOWED_TAGS, svgFilters);
          addToSet(ALLOWED_ATTR, svg$1);
          addToSet(ALLOWED_ATTR, xml);
        }

        if (USE_PROFILES.mathMl === true) {
          addToSet(ALLOWED_TAGS, mathMl);
          addToSet(ALLOWED_ATTR, mathMl$1);
          addToSet(ALLOWED_ATTR, xml);
        }
      }

      /* Merge configuration parameters */
      if (cfg.ADD_TAGS) {
        if (ALLOWED_TAGS === DEFAULT_ALLOWED_TAGS) {
          ALLOWED_TAGS = clone(ALLOWED_TAGS);
        }

        addToSet(ALLOWED_TAGS, cfg.ADD_TAGS);
      }

      if (cfg.ADD_ATTR) {
        if (ALLOWED_ATTR === DEFAULT_ALLOWED_ATTR) {
          ALLOWED_ATTR = clone(ALLOWED_ATTR);
        }

        addToSet(ALLOWED_ATTR, cfg.ADD_ATTR);
      }

      if (cfg.ADD_URI_SAFE_ATTR) {
        addToSet(URI_SAFE_ATTRIBUTES, cfg.ADD_URI_SAFE_ATTR);
      }

      /* Add #text in case KEEP_CONTENT is set to true */
      if (KEEP_CONTENT) {
        ALLOWED_TAGS['#text'] = true;
      }

      /* Add html, head and body to ALLOWED_TAGS in case WHOLE_DOCUMENT is true */
      if (WHOLE_DOCUMENT) {
        addToSet(ALLOWED_TAGS, ['html', 'head', 'body']);
      }

      /* Add tbody to ALLOWED_TAGS in case tables are permitted, see #286 */
      if (ALLOWED_TAGS.table) {
        addToSet(ALLOWED_TAGS, ['tbody']);
      }

      // Prevent further manipulation of configuration.
      // Not available in IE8, Safari 5, etc.
      if (freeze) {
        freeze(cfg);
      }

      CONFIG = cfg;
    };

    /**
     * _forceRemove
     *
     * @param  {Node} node a DOM node
     */
    var _forceRemove = function _forceRemove(node) {
      DOMPurify.removed.push({ element: node });
      try {
        node.parentNode.removeChild(node);
      } catch (error) {
        node.outerHTML = emptyHTML;
      }
    };

    /**
     * _removeAttribute
     *
     * @param  {String} name an Attribute name
     * @param  {Node} node a DOM node
     */
    var _removeAttribute = function _removeAttribute(name, node) {
      try {
        DOMPurify.removed.push({
          attribute: node.getAttributeNode(name),
          from: node
        });
      } catch (error) {
        DOMPurify.removed.push({
          attribute: null,
          from: node
        });
      }

      node.removeAttribute(name);
    };

    /**
     * _initDocument
     *
     * @param  {String} dirty a string of dirty markup
     * @return {Document} a DOM, filled with the dirty markup
     */
    var _initDocument = function _initDocument(dirty) {
      /* Create a HTML document */
      var doc = void 0;
      var leadingWhitespace = void 0;

      if (FORCE_BODY) {
        dirty = '<remove></remove>' + dirty;
      } else {
        /* If FORCE_BODY isn't used, leading whitespace needs to be preserved manually */
        var matches = dirty.match(/^[\s]+/);
        leadingWhitespace = matches && matches[0];
        if (leadingWhitespace) {
          dirty = dirty.slice(leadingWhitespace.length);
        }
      }

      /* Use DOMParser to workaround Firefox bug (see comment below) */
      if (useDOMParser) {
        try {
          doc = new DOMParser().parseFromString(dirty, 'text/html');
        } catch (error) {}
      }

      /* Remove title to fix a mXSS bug in older MS Edge */
      if (removeTitle) {
        addToSet(FORBID_TAGS, ['title']);
      }

      /* Otherwise use createHTMLDocument, because DOMParser is unsafe in
      Safari (see comment below) */
      if (!doc || !doc.documentElement) {
        doc = implementation.createHTMLDocument('');
        var _doc = doc,
            body = _doc.body;

        body.parentNode.removeChild(body.parentNode.firstElementChild);
        body.outerHTML = trustedTypesPolicy ? trustedTypesPolicy.createHTML(dirty) : dirty;
      }

      if (leadingWhitespace) {
        doc.body.insertBefore(document.createTextNode(leadingWhitespace), doc.body.childNodes[0] || null);
      }

      /* Work on whole document or just its body */
      return getElementsByTagName.call(doc, WHOLE_DOCUMENT ? 'html' : 'body')[0];
    };

    // Firefox uses a different parser for innerHTML rather than
    // DOMParser (see https://bugzilla.mozilla.org/show_bug.cgi?id=1205631)
    // which means that you *must* use DOMParser, otherwise the output may
    // not be safe if used in a document.write context later.
    //
    // So we feature detect the Firefox bug and use the DOMParser if necessary.
    //
    // MS Edge, in older versions, is affected by an mXSS behavior. The second
    // check tests for the behavior and fixes it if necessary.
    if (DOMPurify.isSupported) {
      (function () {
        try {
          var doc = _initDocument('<svg><p><style><img src="</style><img src=x onerror=1//">');
          if (doc.querySelector('svg img')) {
            useDOMParser = true;
          }
        } catch (error) {}
      })();

      (function () {
        try {
          var doc = _initDocument('<x/><title>&lt;/title&gt;&lt;img&gt;');
          if (doc.querySelector('title').innerHTML.match(/<\/title/)) {
            removeTitle = true;
          }
        } catch (error) {}
      })();
    }

    /**
     * _createIterator
     *
     * @param  {Document} root document/fragment to create iterator for
     * @return {Iterator} iterator instance
     */
    var _createIterator = function _createIterator(root) {
      return createNodeIterator.call(root.ownerDocument || root, root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT, function () {
        return NodeFilter.FILTER_ACCEPT;
      }, false);
    };

    /**
     * _isClobbered
     *
     * @param  {Node} elm element to check for clobbering attacks
     * @return {Boolean} true if clobbered, false if safe
     */
    var _isClobbered = function _isClobbered(elm) {
      if (elm instanceof Text || elm instanceof Comment) {
        return false;
      }

      if (typeof elm.nodeName !== 'string' || typeof elm.textContent !== 'string' || typeof elm.removeChild !== 'function' || !(elm.attributes instanceof NamedNodeMap) || typeof elm.removeAttribute !== 'function' || typeof elm.setAttribute !== 'function') {
        return true;
      }

      return false;
    };

    /**
     * _isNode
     *
     * @param  {Node} obj object to check whether it's a DOM node
     * @return {Boolean} true is object is a DOM node
     */
    var _isNode = function _isNode(obj) {
      return (typeof Node === 'undefined' ? 'undefined' : _typeof(Node)) === 'object' ? obj instanceof Node : obj && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && typeof obj.nodeType === 'number' && typeof obj.nodeName === 'string';
    };

    /**
     * _executeHook
     * Execute user configurable hooks
     *
     * @param  {String} entryPoint  Name of the hook's entry point
     * @param  {Node} currentNode node to work on with the hook
     * @param  {Object} data additional hook parameters
     */
    var _executeHook = function _executeHook(entryPoint, currentNode, data) {
      if (!hooks[entryPoint]) {
        return;
      }

      hooks[entryPoint].forEach(function (hook) {
        hook.call(DOMPurify, currentNode, data, CONFIG);
      });
    };

    /**
     * _sanitizeElements
     *
     * @protect nodeName
     * @protect textContent
     * @protect removeChild
     *
     * @param   {Node} currentNode to check for permission to exist
     * @return  {Boolean} true if node was killed, false if left alive
     */
    // eslint-disable-next-line complexity
    var _sanitizeElements = function _sanitizeElements(currentNode) {
      var content = void 0;

      /* Execute a hook if present */
      _executeHook('beforeSanitizeElements', currentNode, null);

      /* Check if element is clobbered or can clobber */
      if (_isClobbered(currentNode)) {
        _forceRemove(currentNode);
        return true;
      }

      /* Now let's check the element's type and name */
      var tagName = currentNode.nodeName.toLowerCase();

      /* Execute a hook if present */
      _executeHook('uponSanitizeElement', currentNode, {
        tagName: tagName,
        allowedTags: ALLOWED_TAGS
      });

      /* Remove element if anything forbids its presence */
      if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
        /* Keep content except for black-listed elements */
        if (KEEP_CONTENT && !FORBID_CONTENTS[tagName] && typeof currentNode.insertAdjacentHTML === 'function') {
          try {
            var htmlToInsert = currentNode.innerHTML;
            currentNode.insertAdjacentHTML('AfterEnd', trustedTypesPolicy ? trustedTypesPolicy.createHTML(htmlToInsert) : htmlToInsert);
          } catch (error) {}
        }

        _forceRemove(currentNode);
        return true;
      }

      /* Remove in case a noscript/noembed XSS is suspected */
      if (tagName === 'noscript' && currentNode.innerHTML.match(/<\/noscript/i)) {
        _forceRemove(currentNode);
        return true;
      }

      if (tagName === 'noembed' && currentNode.innerHTML.match(/<\/noembed/i)) {
        _forceRemove(currentNode);
        return true;
      }

      /* Convert markup to cover jQuery behavior */
      if (SAFE_FOR_JQUERY && !currentNode.firstElementChild && (!currentNode.content || !currentNode.content.firstElementChild) && /</g.test(currentNode.textContent)) {
        DOMPurify.removed.push({ element: currentNode.cloneNode() });
        if (currentNode.innerHTML) {
          currentNode.innerHTML = currentNode.innerHTML.replace(/</g, '&lt;');
        } else {
          currentNode.innerHTML = currentNode.textContent.replace(/</g, '&lt;');
        }
      }

      /* Sanitize element content to be template-safe */
      if (SAFE_FOR_TEMPLATES && currentNode.nodeType === 3) {
        /* Get the element's text content */
        content = currentNode.textContent;
        content = content.replace(MUSTACHE_EXPR$$1, ' ');
        content = content.replace(ERB_EXPR$$1, ' ');
        if (currentNode.textContent !== content) {
          DOMPurify.removed.push({ element: currentNode.cloneNode() });
          currentNode.textContent = content;
        }
      }

      /* Execute a hook if present */
      _executeHook('afterSanitizeElements', currentNode, null);

      return false;
    };

    /**
     * _isValidAttribute
     *
     * @param  {string} lcTag Lowercase tag name of containing element.
     * @param  {string} lcName Lowercase attribute name.
     * @param  {string} value Attribute value.
     * @return {Boolean} Returns true if `value` is valid, otherwise false.
     */
    // eslint-disable-next-line complexity
    var _isValidAttribute = function _isValidAttribute(lcTag, lcName, value) {
      /* Make sure attribute cannot clobber */
      if (SANITIZE_DOM && (lcName === 'id' || lcName === 'name') && (value in document || value in formElement)) {
        return false;
      }

      /* Allow valid data-* attributes: At least one character after "-"
          (https://html.spec.whatwg.org/multipage/dom.html#embedding-custom-non-visible-data-with-the-data-*-attributes)
          XML-compatible (https://html.spec.whatwg.org/multipage/infrastructure.html#xml-compatible and http://www.w3.org/TR/xml/#d0e804)
          We don't need to check the value; it's always URI safe. */
      if (ALLOW_DATA_ATTR && DATA_ATTR$$1.test(lcName)) ; else if (ALLOW_ARIA_ATTR && ARIA_ATTR$$1.test(lcName)) ; else if (!ALLOWED_ATTR[lcName] || FORBID_ATTR[lcName]) {
        return false;

        /* Check value is safe. First, is attr inert? If so, is safe */
      } else if (URI_SAFE_ATTRIBUTES[lcName]) ; else if (IS_ALLOWED_URI$$1.test(value.replace(ATTR_WHITESPACE$$1, ''))) ; else if ((lcName === 'src' || lcName === 'xlink:href') && lcTag !== 'script' && value.indexOf('data:') === 0 && DATA_URI_TAGS[lcTag]) ; else if (ALLOW_UNKNOWN_PROTOCOLS && !IS_SCRIPT_OR_DATA$$1.test(value.replace(ATTR_WHITESPACE$$1, ''))) ; else if (!value) ; else {
        return false;
      }

      return true;
    };

    /**
     * _sanitizeAttributes
     *
     * @protect attributes
     * @protect nodeName
     * @protect removeAttribute
     * @protect setAttribute
     *
     * @param  {Node} currentNode to sanitize
     */
    var _sanitizeAttributes = function _sanitizeAttributes(currentNode) {
      var attr = void 0;
      var value = void 0;
      var lcName = void 0;
      var idAttr = void 0;
      var l = void 0;
      /* Execute a hook if present */
      _executeHook('beforeSanitizeAttributes', currentNode, null);

      var attributes = currentNode.attributes;

      /* Check if we have attributes; if not we might have a text node */

      if (!attributes) {
        return;
      }

      var hookEvent = {
        attrName: '',
        attrValue: '',
        keepAttr: true,
        allowedAttributes: ALLOWED_ATTR
      };
      l = attributes.length;

      /* Go backwards over all attributes; safely remove bad ones */
      while (l--) {
        attr = attributes[l];
        var _attr = attr,
            name = _attr.name,
            namespaceURI = _attr.namespaceURI;

        value = attr.value.trim();
        lcName = name.toLowerCase();

        /* Execute a hook if present */
        hookEvent.attrName = lcName;
        hookEvent.attrValue = value;
        hookEvent.keepAttr = true;
        _executeHook('uponSanitizeAttribute', currentNode, hookEvent);
        value = hookEvent.attrValue;

        /* Remove attribute */
        // Safari (iOS + Mac), last tested v8.0.5, crashes if you try to
        // remove a "name" attribute from an <img> tag that has an "id"
        // attribute at the time.
        if (lcName === 'name' && currentNode.nodeName === 'IMG' && attributes.id) {
          idAttr = attributes.id;
          attributes = apply(arraySlice, attributes, []);
          _removeAttribute('id', currentNode);
          _removeAttribute(name, currentNode);
          if (attributes.indexOf(idAttr) > l) {
            currentNode.setAttribute('id', idAttr.value);
          }
        } else if (
        // This works around a bug in Safari, where input[type=file]
        // cannot be dynamically set after type has been removed
        currentNode.nodeName === 'INPUT' && lcName === 'type' && value === 'file' && (ALLOWED_ATTR[lcName] || !FORBID_ATTR[lcName])) {
          continue;
        } else {
          // This avoids a crash in Safari v9.0 with double-ids.
          // The trick is to first set the id to be empty and then to
          // remove the attribute
          if (name === 'id') {
            currentNode.setAttribute(name, '');
          }

          _removeAttribute(name, currentNode);
        }

        /* Did the hooks approve of the attribute? */
        if (!hookEvent.keepAttr) {
          continue;
        }

        /* Sanitize attribute content to be template-safe */
        if (SAFE_FOR_TEMPLATES) {
          value = value.replace(MUSTACHE_EXPR$$1, ' ');
          value = value.replace(ERB_EXPR$$1, ' ');
        }

        /* Is `value` valid for this attribute? */
        var lcTag = currentNode.nodeName.toLowerCase();
        if (!_isValidAttribute(lcTag, lcName, value)) {
          continue;
        }

        /* Handle invalid data-* attribute set by try-catching it */
        try {
          if (namespaceURI) {
            currentNode.setAttributeNS(namespaceURI, name, value);
          } else {
            /* Fallback to setAttribute() for browser-unrecognized namespaces e.g. "x-schema". */
            currentNode.setAttribute(name, value);
          }

          DOMPurify.removed.pop();
        } catch (error) {}
      }

      /* Execute a hook if present */
      _executeHook('afterSanitizeAttributes', currentNode, null);
    };

    /**
     * _sanitizeShadowDOM
     *
     * @param  {DocumentFragment} fragment to iterate over recursively
     */
    var _sanitizeShadowDOM = function _sanitizeShadowDOM(fragment) {
      var shadowNode = void 0;
      var shadowIterator = _createIterator(fragment);

      /* Execute a hook if present */
      _executeHook('beforeSanitizeShadowDOM', fragment, null);

      while (shadowNode = shadowIterator.nextNode()) {
        /* Execute a hook if present */
        _executeHook('uponSanitizeShadowNode', shadowNode, null);

        /* Sanitize tags and elements */
        if (_sanitizeElements(shadowNode)) {
          continue;
        }

        /* Deep shadow DOM detected */
        if (shadowNode.content instanceof DocumentFragment) {
          _sanitizeShadowDOM(shadowNode.content);
        }

        /* Check attributes, sanitize if necessary */
        _sanitizeAttributes(shadowNode);
      }

      /* Execute a hook if present */
      _executeHook('afterSanitizeShadowDOM', fragment, null);
    };

    /**
     * Sanitize
     * Public method providing core sanitation functionality
     *
     * @param {String|Node} dirty string or DOM node
     * @param {Object} configuration object
     */
    // eslint-disable-next-line complexity
    DOMPurify.sanitize = function (dirty, cfg) {
      var body = void 0;
      var importedNode = void 0;
      var currentNode = void 0;
      var oldNode = void 0;
      var returnNode = void 0;
      /* Make sure we have a string to sanitize.
        DO NOT return early, as this will return the wrong type if
        the user has requested a DOM object rather than a string */
      if (!dirty) {
        dirty = '<!-->';
      }

      /* Stringify, in case dirty is an object */
      if (typeof dirty !== 'string' && !_isNode(dirty)) {
        // eslint-disable-next-line no-negated-condition
        if (typeof dirty.toString !== 'function') {
          throw new TypeError('toString is not a function');
        } else {
          dirty = dirty.toString();
          if (typeof dirty !== 'string') {
            throw new TypeError('dirty is not a string, aborting');
          }
        }
      }

      /* Check we can run. Otherwise fall back or ignore */
      if (!DOMPurify.isSupported) {
        if (_typeof(window.toStaticHTML) === 'object' || typeof window.toStaticHTML === 'function') {
          if (typeof dirty === 'string') {
            return window.toStaticHTML(dirty);
          }

          if (_isNode(dirty)) {
            return window.toStaticHTML(dirty.outerHTML);
          }
        }

        return dirty;
      }

      /* Assign config vars */
      if (!SET_CONFIG) {
        _parseConfig(cfg);
      }

      /* Clean up removed elements */
      DOMPurify.removed = [];

      if (IN_PLACE) ; else if (dirty instanceof Node) {
        /* If dirty is a DOM element, append to an empty document to avoid
           elements being stripped by the parser */
        body = _initDocument('<!-->');
        importedNode = body.ownerDocument.importNode(dirty, true);
        if (importedNode.nodeType === 1 && importedNode.nodeName === 'BODY') {
          /* Node is already a body, use as is */
          body = importedNode;
        } else {
          // eslint-disable-next-line unicorn/prefer-node-append
          body.appendChild(importedNode);
        }
      } else {
        /* Exit directly if we have nothing to do */
        if (!RETURN_DOM && !SAFE_FOR_TEMPLATES && !WHOLE_DOCUMENT && dirty.indexOf('<') === -1) {
          return trustedTypesPolicy ? trustedTypesPolicy.createHTML(dirty) : dirty;
        }

        /* Initialize the document to work on */
        body = _initDocument(dirty);

        /* Check we have a DOM node from the data */
        if (!body) {
          return RETURN_DOM ? null : emptyHTML;
        }
      }

      /* Remove first element node (ours) if FORCE_BODY is set */
      if (body && FORCE_BODY) {
        _forceRemove(body.firstChild);
      }

      /* Get node iterator */
      var nodeIterator = _createIterator(IN_PLACE ? dirty : body);

      /* Now start iterating over the created document */
      while (currentNode = nodeIterator.nextNode()) {
        /* Fix IE's strange behavior with manipulated textNodes #89 */
        if (currentNode.nodeType === 3 && currentNode === oldNode) {
          continue;
        }

        /* Sanitize tags and elements */
        if (_sanitizeElements(currentNode)) {
          continue;
        }

        /* Shadow DOM detected, sanitize it */
        if (currentNode.content instanceof DocumentFragment) {
          _sanitizeShadowDOM(currentNode.content);
        }

        /* Check attributes, sanitize if necessary */
        _sanitizeAttributes(currentNode);

        oldNode = currentNode;
      }

      oldNode = null;

      /* If we sanitized `dirty` in-place, return it. */
      if (IN_PLACE) {
        return dirty;
      }

      /* Return sanitized string or DOM */
      if (RETURN_DOM) {
        if (RETURN_DOM_FRAGMENT) {
          returnNode = createDocumentFragment.call(body.ownerDocument);

          while (body.firstChild) {
            // eslint-disable-next-line unicorn/prefer-node-append
            returnNode.appendChild(body.firstChild);
          }
        } else {
          returnNode = body;
        }

        if (RETURN_DOM_IMPORT) {
          /* AdoptNode() is not used because internal state is not reset
                 (e.g. the past names map of a HTMLFormElement), this is safe
                 in theory but we would rather not risk another attack vector.
                 The state that is cloned by importNode() is explicitly defined
                 by the specs. */
          returnNode = importNode.call(originalDocument, returnNode, true);
        }

        return returnNode;
      }

      var serializedHTML = WHOLE_DOCUMENT ? body.outerHTML : body.innerHTML;

      /* Sanitize final string template-safe */
      if (SAFE_FOR_TEMPLATES) {
        serializedHTML = serializedHTML.replace(MUSTACHE_EXPR$$1, ' ');
        serializedHTML = serializedHTML.replace(ERB_EXPR$$1, ' ');
      }

      return trustedTypesPolicy ? trustedTypesPolicy.createHTML(serializedHTML) : serializedHTML;
    };

    /**
     * Public method to set the configuration once
     * setConfig
     *
     * @param {Object} cfg configuration object
     */
    DOMPurify.setConfig = function (cfg) {
      _parseConfig(cfg);
      SET_CONFIG = true;
    };

    /**
     * Public method to remove the configuration
     * clearConfig
     *
     */
    DOMPurify.clearConfig = function () {
      CONFIG = null;
      SET_CONFIG = false;
    };

    /**
     * Public method to check if an attribute value is valid.
     * Uses last set config, if any. Otherwise, uses config defaults.
     * isValidAttribute
     *
     * @param  {string} tag Tag name of containing element.
     * @param  {string} attr Attribute name.
     * @param  {string} value Attribute value.
     * @return {Boolean} Returns true if `value` is valid. Otherwise, returns false.
     */
    DOMPurify.isValidAttribute = function (tag, attr, value) {
      /* Initialize shared config vars if necessary. */
      if (!CONFIG) {
        _parseConfig({});
      }

      var lcTag = tag.toLowerCase();
      var lcName = attr.toLowerCase();
      return _isValidAttribute(lcTag, lcName, value);
    };

    /**
     * AddHook
     * Public method to add DOMPurify hooks
     *
     * @param {String} entryPoint entry point for the hook to add
     * @param {Function} hookFunction function to execute
     */
    DOMPurify.addHook = function (entryPoint, hookFunction) {
      if (typeof hookFunction !== 'function') {
        return;
      }

      hooks[entryPoint] = hooks[entryPoint] || [];
      hooks[entryPoint].push(hookFunction);
    };

    /**
     * RemoveHook
     * Public method to remove a DOMPurify hook at a given entryPoint
     * (pops it from the stack of hooks if more are present)
     *
     * @param {String} entryPoint entry point for the hook to remove
     */
    DOMPurify.removeHook = function (entryPoint) {
      if (hooks[entryPoint]) {
        hooks[entryPoint].pop();
      }
    };

    /**
     * RemoveHooks
     * Public method to remove all DOMPurify hooks at a given entryPoint
     *
     * @param  {String} entryPoint entry point for the hooks to remove
     */
    DOMPurify.removeHooks = function (entryPoint) {
      if (hooks[entryPoint]) {
        hooks[entryPoint] = [];
      }
    };

    /**
     * RemoveAllHooks
     * Public method to remove all DOMPurify hooks
     *
     */
    DOMPurify.removeAllHooks = function () {
      hooks = {};
    };

    return DOMPurify;
  }

  var purify = createDOMPurify();

  var trim = function trim(str) {
    if (!str) return '';
    return str.trim();
  };

  var tryDownload = function tryDownload(content, filename) {
    var eleLink = document.createElement('a');
    eleLink.download = filename;
    eleLink.style.display = 'none';
    var blob = new Blob([content], {
      type: 'text/csv'
    });
    eleLink.href = URL.createObjectURL(blob);
    document.body.appendChild(eleLink);
    eleLink.click();
    document.body.removeChild(eleLink);
  };

  var removeTag = function removeTag(html) {
    if (html.startsWith('<')) {
      return html.replace(/^<[^>]+>([^<]*)<\/[^>]+>/, '$1');
    }

    return html;
  };

  var removeNotMatchedHtmlTag = function removeNotMatchedHtmlTag(str) {
    if (/<\/?(span|div)[^>]*>/.test(str)) {
      return str.replace(/<\/?(span|div)[^>]*>/g, '');
    }

    return str;
  };

  var removeNormalHtmlTag = function removeNormalHtmlTag(str) {
    var count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var wrap = arguments.length > 2 ? arguments[2] : undefined;
    count++;
    if (!/<(\w{1,7})[^>]*>/.test(str) || count > 2) return str;

    var _str;

    if (wrap) {
      _str = str.replace(/<br\s?\/?>/ig, '\n').replace(/\n+/g, '\n');
    } else {
      _str = str.replace(/<br\s?\/?>/ig, '');
    }

    _str = _str.replace(/<(\w{1,7})[^>]*>([^<]*)<\/\1>/g, '$2');
    return removeNormalHtmlTag(_str, count, wrap);
  };

  var removeHtmlTag = function removeHtmlTag(str) {
    var count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var wrap = arguments.length > 2 ? arguments[2] : undefined;

    var _str = removeNormalHtmlTag(str, count, wrap);

    return removeNotMatchedHtmlTag(_str);
  };

  var replaceWords = function replaceWords(str, map) {
    var lang = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'en';
    if (!str) return str;
    var _str = str;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = map[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _step$value = _slicedToArray(_step.value, 2),
            key = _step$value[0],
            val = _step$value[1];

        if (!key || key.length < 2) continue;
        var expr = key.replace(/\?/g, '\\?').replace(/\./g, '\\.').replace(/\*/g, '\\*').replace(/\+/g, '\\+');
        var reStr = lang === 'en' ? "\\b".concat(expr, "\\b") : "".concat(expr);

        if (typeof val === 'string') {
          _str = _str.replace(new RegExp(reStr, 'g'), val);
        } else if (val && val.trans && !val.noun) {
          if (val.ignoreCase) {
            _str = _str.replace(new RegExp(reStr, 'gi'), val.trans);
          } else {
            _str = _str.replace(new RegExp(reStr, 'g'), val.trans);
          }
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return _str;
  };

  var getPreview = function getPreview() {
    var str = sessionStorage.getItem('blhxfy:preview');
    var data = [];

    if (str) {
      try {
        data = JSON.parse(str);
      } catch (e) {
        console.error(e);
      }
    }

    return data;
  };

  var getPreviewCsv = function getPreviewCsv(name) {
    var data = getPreview();
    var csv = '';
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = data[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var item = _step2.value;

        if (item.name === name) {
          csv = purify.sanitize(item.csv);
        }
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    return csv;
  };

  var splitSingleLineSkill = function splitSingleLineSkill(csv) {
    return csv.replace(/\s(skill|special|npc|support|intro|,|active)/g, '\n$1');
  };

  var isDomain = function isDomain(str) {
    if (!/^https?:\/\//.test(str)) return false;
    if (/\s/.test(str.trim())) return false;
    return true;
  };

  var getPlusStr = function getPlusStr(str) {
    var plusStr = '';
    var plusStr2 = '';
    var _str = str;

    while (_str.endsWith('+') || _str.endsWith('＋')) {
      plusStr += '＋';
      plusStr2 += '+';
      _str = _str.slice(0, _str.length - 1);
    }

    return [plusStr, plusStr2, _str];
  };

  var race = function race(func) {
    var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
    return function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var promise1 = func.apply(void 0, args);
      var promise2 = new Promise(function (rev) {
        setTimeout(function () {
          rev(args[0]);
        }, time);
      });
      return Promise.race([promise1, promise2]);
    };
  };

  /** Detect free variable `global` from Node.js. */
  var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

  var _freeGlobal = freeGlobal;

  /** Detect free variable `self`. */
  var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

  /** Used as a reference to the global object. */
  var root = _freeGlobal || freeSelf || Function('return this')();

  var _root = root;

  /** Built-in value references. */
  var Symbol$1 = _root.Symbol;

  var _Symbol = Symbol$1;

  /** Used for built-in method references. */
  var objectProto = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$1 = objectProto.hasOwnProperty;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString = objectProto.toString;

  /** Built-in value references. */
  var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

  /**
   * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the raw `toStringTag`.
   */
  function getRawTag(value) {
    var isOwn = hasOwnProperty$1.call(value, symToStringTag),
        tag = value[symToStringTag];

    try {
      value[symToStringTag] = undefined;
      var unmasked = true;
    } catch (e) {}

    var result = nativeObjectToString.call(value);
    if (unmasked) {
      if (isOwn) {
        value[symToStringTag] = tag;
      } else {
        delete value[symToStringTag];
      }
    }
    return result;
  }

  var _getRawTag = getRawTag;

  /** Used for built-in method references. */
  var objectProto$1 = Object.prototype;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString$1 = objectProto$1.toString;

  /**
   * Converts `value` to a string using `Object.prototype.toString`.
   *
   * @private
   * @param {*} value The value to convert.
   * @returns {string} Returns the converted string.
   */
  function objectToString(value) {
    return nativeObjectToString$1.call(value);
  }

  var _objectToString = objectToString;

  /** `Object#toString` result references. */
  var nullTag = '[object Null]',
      undefinedTag = '[object Undefined]';

  /** Built-in value references. */
  var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;

  /**
   * The base implementation of `getTag` without fallbacks for buggy environments.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */
  function baseGetTag(value) {
    if (value == null) {
      return value === undefined ? undefinedTag : nullTag;
    }
    return (symToStringTag$1 && symToStringTag$1 in Object(value))
      ? _getRawTag(value)
      : _objectToString(value);
  }

  var _baseGetTag = baseGetTag;

  /**
   * Checks if `value` is classified as an `Array` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an array, else `false`.
   * @example
   *
   * _.isArray([1, 2, 3]);
   * // => true
   *
   * _.isArray(document.body.children);
   * // => false
   *
   * _.isArray('abc');
   * // => false
   *
   * _.isArray(_.noop);
   * // => false
   */
  var isArray = Array.isArray;

  var isArray_1 = isArray;

  /**
   * Checks if `value` is object-like. A value is object-like if it's not `null`
   * and has a `typeof` result of "object".
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
   * @example
   *
   * _.isObjectLike({});
   * // => true
   *
   * _.isObjectLike([1, 2, 3]);
   * // => true
   *
   * _.isObjectLike(_.noop);
   * // => false
   *
   * _.isObjectLike(null);
   * // => false
   */
  function isObjectLike(value) {
    return value != null && typeof value == 'object';
  }

  var isObjectLike_1 = isObjectLike;

  /** `Object#toString` result references. */
  var stringTag = '[object String]';

  /**
   * Checks if `value` is classified as a `String` primitive or object.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a string, else `false`.
   * @example
   *
   * _.isString('abc');
   * // => true
   *
   * _.isString(1);
   * // => false
   */
  function isString(value) {
    return typeof value == 'string' ||
      (!isArray_1(value) && isObjectLike_1(value) && _baseGetTag(value) == stringTag);
  }

  var isString_1 = isString;

  /** `Object#toString` result references. */
  var boolTag = '[object Boolean]';

  /**
   * Checks if `value` is classified as a boolean primitive or object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a boolean, else `false`.
   * @example
   *
   * _.isBoolean(false);
   * // => true
   *
   * _.isBoolean(null);
   * // => false
   */
  function isBoolean(value) {
    return value === true || value === false ||
      (isObjectLike_1(value) && _baseGetTag(value) == boolTag);
  }

  var isBoolean_1 = isBoolean;

  /**
   * Creates a unary function that invokes `func` with its argument transformed.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {Function} transform The argument transform.
   * @returns {Function} Returns the new function.
   */
  function overArg(func, transform) {
    return function(arg) {
      return func(transform(arg));
    };
  }

  var _overArg = overArg;

  /** Built-in value references. */
  var getPrototype = _overArg(Object.getPrototypeOf, Object);

  var _getPrototype = getPrototype;

  /** `Object#toString` result references. */
  var objectTag = '[object Object]';

  /** Used for built-in method references. */
  var funcProto = Function.prototype,
      objectProto$2 = Object.prototype;

  /** Used to resolve the decompiled source of functions. */
  var funcToString = funcProto.toString;

  /** Used to check objects for own properties. */
  var hasOwnProperty$2 = objectProto$2.hasOwnProperty;

  /** Used to infer the `Object` constructor. */
  var objectCtorString = funcToString.call(Object);

  /**
   * Checks if `value` is a plain object, that is, an object created by the
   * `Object` constructor or one with a `[[Prototype]]` of `null`.
   *
   * @static
   * @memberOf _
   * @since 0.8.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   * }
   *
   * _.isPlainObject(new Foo);
   * // => false
   *
   * _.isPlainObject([1, 2, 3]);
   * // => false
   *
   * _.isPlainObject({ 'x': 0, 'y': 0 });
   * // => true
   *
   * _.isPlainObject(Object.create(null));
   * // => true
   */
  function isPlainObject(value) {
    if (!isObjectLike_1(value) || _baseGetTag(value) != objectTag) {
      return false;
    }
    var proto = _getPrototype(value);
    if (proto === null) {
      return true;
    }
    var Ctor = hasOwnProperty$2.call(proto, 'constructor') && proto.constructor;
    return typeof Ctor == 'function' && Ctor instanceof Ctor &&
      funcToString.call(Ctor) == objectCtorString;
  }

  var isPlainObject_1 = isPlainObject;

  var whiteList = ['需要<%= quest_ap - sp %><%= point_name %>来开始。', '使用道具恢复<%= point_name %>？', "\u6765\u81EA<span class='txt-request-name'><%= n.attributes.called_user_name %></span>\u7684\u6551\u63F4\u8BF7\u6C42", '物品「<%= contents[0].higher_order_info.from_name %>」的<br>效果已经生效了，<br>所以「<%= contents[0].name %>」的效果无法生效', "\u6765\u81EA<span class='txt-request-name'><%= raid['called_user_name'] %></span>\u7684\u6551\u63F4\u8BF7\u6C42", '还剩<%= can_quest_start_count %>回挑战（一共<%= max_quest_start_count %>回）', '<%= set_user.name %> Rank <%= set_user.rank %> 选择任务', '更改第<%= stamp.priority %>个表情', '→掷出了<%= log[i].result_number %>', '<%= log[i].nickname %>对<%= log[i].item_name %>进行ROLL点', '<%= log[i].nickname %>获得了<%= log[i].item_name %>', '<%= title %>'];

  var filter = function filter(str) {
    var notTrim = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (!whiteList.includes(str) && /[><]/.test(str)) {
      var _str = purify.sanitize(str);

      return notTrim ? _str : trim(_str);
    }

    return notTrim ? str : trim(str);
  };

  var version = "1.9.12";

  var config = {
    origin: 'https://blhx.danmu9.com',
    apiHosts: ['game.granbluefantasy.jp', 'gbf.game.mbga.jp'],
    hash: '',
    userName: '',
    displayName: '',
    defaultName: '姬塔',
    defaultEnName: 'Djeeta',
    font: '',
    fontBold: false,
    transApi: 'caiyun',
    timeout: 8,
    plainText: false,
    autoDownload: false,
    bottomToolbar: false,
    removeScroller: true,
    hideSidebar: false,
    battleTrans: true,
    localHash: '',
    transJa: true,
    transEn: true,
    keepBgm: false,
    originText: false,
    version: version
  };

  var getLocalConfig = function getLocalConfig() {
    var str = localStorage.getItem('blhxfy:setting');
    var setting = JSON.parse(str);
    if (!isPlainObject_1(setting)) setting = {};
    var _setting = setting,
        origin = _setting.origin;

    if (isDomain(origin)) {
      config.origin = origin.trim();
    }

    var keys = ['autoDownload', 'bottomToolbar', 'displayName', 'removeScroller', 'hideSidebar', 'originText', 'transJa', 'transEn', 'keepBgm', 'font', 'transApi', 'fontBold', 'plainText', 'battleTrans'];
    keys.forEach(function (key) {
      var value = setting[key];
      if (isString_1(value)) value = filter(value.trim());

      if (isBoolean_1(value) || value) {
        config[key] = value;
      }

      if (key === 'transApi' && value === 'baidu') {
        config[key] = 'caiyun';
      }
    });
  };

  var getLocalHash = function getLocalHash() {
    try {
      var str = sessionStorage.getItem('blhxfy:data');
      var data = JSON.parse(str);
      config.localHash = data.hash;
    } catch (err) {// ignore
    }
  };

  getLocalConfig();
  getLocalHash();

  var origin = config.origin;
  var ee = new events();
  var lacia;

  var insertCSS = function insertCSS(name) {
    var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = "".concat(origin, "/blhxfy/data/static/style/").concat(name, ".css?lacia=").concat(config.hash || config.localHash);
    document.head.appendChild(link);
  };

  var timeoutStyleInserted = false;

  var timeoutStyle = function timeoutStyle() {
    if (timeoutStyleInserted) return;
    timeoutStyleInserted = true;
    var style = document.createElement('style');
    style.innerHTML = "\n  .wrapper .cnt-global-header .prt-head-current {\n    color: #ff6565;\n  }\n  ";
    document.head.appendChild(style);
  };

  var loadIframe = function loadIframe() {
    return new Promise(function (rev, rej) {
      window.addEventListener('load', function () {
        var iframe = document.createElement('iframe');
        iframe.src = "".concat(origin, "/blhxfy/lacia.html");
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
        lacia = iframe.contentWindow;
      });
      var timer = setTimeout(function () {
        rej("\u52A0\u8F7Diframe\u8D85\u65F6");
      }, config.timeout * 1000);
      ee.once('loaded', function () {
        clearTimeout(timer);
        rev();
      });
    });
  };

  var iframeLoaded = false;

  var fetchData =
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(pathname) {
      var url, flag;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              url = pathname;
              flag = Math.random();
              _context.prev = 2;

              if (!iframeLoaded) {
                loadIframe = loadIframe();
                iframeLoaded = true;
              }

              _context.next = 6;
              return loadIframe;

            case 6:
              lacia.postMessage({
                type: 'fetch',
                url: url,
                flag: flag
              }, origin);
              _context.next = 12;
              break;

            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](2);
              return _context.abrupt("return", '');

            case 12:
              return _context.abrupt("return", new Promise(function (rev, rej) {
                var timer = setTimeout(function () {
                  rej("\u52A0\u8F7D".concat(pathname, "\u8D85\u65F6"));
                  timeoutStyle();
                }, config.timeout * 1000);
                ee.once("response".concat(flag), function (data) {
                  clearTimeout(timer);

                  if (data.error) {
                    rej(data.error);
                  } else {
                    rev(data.data);
                  }
                });
              }));

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[2, 9]]);
    }));

    return function fetchData(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var fetchInfo = {
    status: 'init',
    result: false,
    data: null
  };

  var tryFetch =
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var res, data;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!window.fetch) {
                _context2.next = 19;
                break;
              }

              if (!(sessionStorage.getItem('blhxfy:cors') === 'disabled')) {
                _context2.next = 4;
                break;
              }

              fetchInfo.status = 'finished';
              return _context2.abrupt("return");

            case 4:
              _context2.prev = 4;
              _context2.next = 7;
              return fetch("".concat(origin, "/blhxfy/manifest.json"));

            case 7:
              res = _context2.sent;
              _context2.next = 10;
              return res.json();

            case 10:
              data = _context2.sent;
              fetchInfo.data = data;
              fetchInfo.result = true;
              sessionStorage.setItem('blhxfy:cors', 'enabled');
              _context2.next = 19;
              break;

            case 16:
              _context2.prev = 16;
              _context2.t0 = _context2["catch"](4);
              sessionStorage.setItem('blhxfy:cors', 'disabled');

            case 19:
              fetchInfo.status = 'finished';

            case 20:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[4, 16]]);
    }));

    return function tryFetch() {
      return _ref2.apply(this, arguments);
    };
  }();

  var request =
  /*#__PURE__*/
  function () {
    var _ref3 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(pathname) {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!fetchInfo.result) {
                _context3.next = 4;
                break;
              }

              return _context3.abrupt("return", new Promise(function (rev, rej) {
                var timer = setTimeout(function () {
                  rej("\u52A0\u8F7D".concat(pathname, "\u8D85\u65F6"));
                  timeoutStyle();
                }, config.timeout * 1000);
                fetch("".concat(origin).concat(pathname)).then(function (res) {
                  clearTimeout(timer);
                  var type = res.headers.get('content-type');

                  if (type.includes('json')) {
                    return res.json();
                  }

                  return res.text();
                }).then(rev).catch(rej);
              }));

            case 4:
              _context3.next = 6;
              return fetchData(pathname);

            case 6:
              return _context3.abrupt("return", _context3.sent);

            case 7:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function request(_x2) {
      return _ref3.apply(this, arguments);
    };
  }();

  var getHash = new Promise(function (rev, rej) {
    if (fetchInfo.status !== 'finished') {
      tryFetch().then(function () {
        var beforeStart = function beforeStart(data) {
          config.newVersion = data.version;
          config.hash = data.hash;
          insertCSS('BLHXFY');
        };

        if (fetchInfo.result) {
          beforeStart(fetchInfo.data);
          rev(fetchInfo.data.hash);
        } else {
          fetchData('/blhxfy/manifest.json').then(function (data) {
            beforeStart(data);
            rev(data.hash);
          });
        }
      }).catch(rej);
    } else {
      rev(fetchInfo.data.hash);
    }
  });

  var fetchWithHash =
  /*#__PURE__*/
  function () {
    var _ref4 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(pathname) {
      var hash, data;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return getHash;

            case 2:
              hash = _context4.sent;
              _context4.next = 5;
              return request("".concat(pathname, "?lacia=").concat(hash));

            case 5:
              data = _context4.sent;
              return _context4.abrupt("return", data);

            case 7:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function fetchWithHash(_x3) {
      return _ref4.apply(this, arguments);
    };
  }();

  var receiveMessage = function receiveMessage(event) {
    if (event.origin !== origin) return;

    if (event.data && event.data.type) {
      if (event.data.type === 'response') {
        ee.emit("response".concat(event.data.flag), event.data);
      } else if (event.data.type === 'loaded') {
        ee.emit('loaded');
      }
    }
  };

  window.addEventListener("message", receiveMessage, false);

  var papaparse_min = createCommonjsModule(function (module, exports) {
  /* @license
  Papa Parse
  v4.6.3
  https://github.com/mholt/PapaParse
  License: MIT
  */
  Array.isArray||(Array.isArray=function(e){return "[object Array]"===Object.prototype.toString.call(e)}),function(e,t){module.exports=t();}(commonjsGlobal,function(){var s,e,f="undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==f?f:{},n=!f.document&&!!f.postMessage,o=n&&/(\?|&)papaworker(=|&|$)/.test(f.location.search),a=!1,h={},u=0,k={parse:function(e,t){var r=(t=t||{}).dynamicTyping||!1;z(r)&&(t.dynamicTypingFunction=r,r={});if(t.dynamicTyping=r,t.transform=!!z(t.transform)&&t.transform,t.worker&&k.WORKERS_SUPPORTED){var i=function(){if(!k.WORKERS_SUPPORTED)return !1;if(!a&&null===k.SCRIPT_PATH)throw new Error("Script path cannot be determined automatically when Papa Parse is loaded asynchronously. You need to set Papa.SCRIPT_PATH manually.");var e=k.SCRIPT_PATH||s;e+=(-1!==e.indexOf("?")?"&":"?")+"papaworker";var t=new f.Worker(e);return t.onmessage=m,t.id=u++,h[t.id]=t}();return i.userStep=t.step,i.userChunk=t.chunk,i.userComplete=t.complete,i.userError=t.error,t.step=z(t.step),t.chunk=z(t.chunk),t.complete=z(t.complete),t.error=z(t.error),delete t.worker,void i.postMessage({input:e,config:t,workerId:i.id})}var n=null;"string"==typeof e?n=t.download?new c(t):new _(t):!0===e.readable&&z(e.read)&&z(e.on)?n=new g(t):(f.File&&e instanceof File||e instanceof Object)&&(n=new p(t));return n.stream(e)},unparse:function(e,t){var i=!1,g=!0,m=",",y="\r\n",n='"',r=!1;!function(){if("object"!=typeof t)return;"string"!=typeof t.delimiter||k.BAD_DELIMITERS.filter(function(e){return -1!==t.delimiter.indexOf(e)}).length||(m=t.delimiter);("boolean"==typeof t.quotes||Array.isArray(t.quotes))&&(i=t.quotes);"boolean"!=typeof t.skipEmptyLines&&"string"!=typeof t.skipEmptyLines||(r=t.skipEmptyLines);"string"==typeof t.newline&&(y=t.newline);"string"==typeof t.quoteChar&&(n=t.quoteChar);"boolean"==typeof t.header&&(g=t.header);}();var s=new RegExp(M(n),"g");"string"==typeof e&&(e=JSON.parse(e));if(Array.isArray(e)){if(!e.length||Array.isArray(e[0]))return o(null,e,r);if("object"==typeof e[0])return o(a(e[0]),e,r)}else if("object"==typeof e)return "string"==typeof e.data&&(e.data=JSON.parse(e.data)),Array.isArray(e.data)&&(e.fields||(e.fields=e.meta&&e.meta.fields),e.fields||(e.fields=Array.isArray(e.data[0])?e.fields:a(e.data[0])),Array.isArray(e.data[0])||"object"==typeof e.data[0]||(e.data=[e.data])),o(e.fields||[],e.data||[],r);throw "exception: Unable to serialize unrecognized input";function a(e){if("object"!=typeof e)return [];var t=[];for(var r in e)t.push(r);return t}function o(e,t,r){var i="";"string"==typeof e&&(e=JSON.parse(e)),"string"==typeof t&&(t=JSON.parse(t));var n=Array.isArray(e)&&0<e.length,s=!Array.isArray(t[0]);if(n&&g){for(var a=0;a<e.length;a++)0<a&&(i+=m),i+=v(e[a],a);0<t.length&&(i+=y);}for(var o=0;o<t.length;o++){var h=n?e.length:t[o].length,u=!1,f=n?0===Object.keys(t[o]).length:0===t[o].length;if(r&&!n&&(u="greedy"===r?""===t[o].join("").trim():1===t[o].length&&0===t[o][0].length),"greedy"===r&&n){for(var d=[],l=0;l<h;l++){var c=s?e[l]:l;d.push(t[o][c]);}u=""===d.join("").trim();}if(!u){for(var p=0;p<h;p++){0<p&&!f&&(i+=m);var _=n&&s?e[p]:p;i+=v(t[o][_],p);}o<t.length-1&&(!r||0<h&&!f)&&(i+=y);}}return i}function v(e,t){if(null==e)return "";if(e.constructor===Date)return JSON.stringify(e).slice(1,25);e=e.toString().replace(s,n+n);var r="boolean"==typeof i&&i||Array.isArray(i)&&i[t]||function(e,t){for(var r=0;r<t.length;r++)if(-1<e.indexOf(t[r]))return !0;return !1}(e,k.BAD_DELIMITERS)||-1<e.indexOf(m)||" "===e.charAt(0)||" "===e.charAt(e.length-1);return r?n+e+n:e}}};if(k.RECORD_SEP=String.fromCharCode(30),k.UNIT_SEP=String.fromCharCode(31),k.BYTE_ORDER_MARK="\ufeff",k.BAD_DELIMITERS=["\r","\n",'"',k.BYTE_ORDER_MARK],k.WORKERS_SUPPORTED=!n&&!!f.Worker,k.SCRIPT_PATH=null,k.NODE_STREAM_INPUT=1,k.LocalChunkSize=10485760,k.RemoteChunkSize=5242880,k.DefaultDelimiter=",",k.Parser=v,k.ParserHandle=r,k.NetworkStreamer=c,k.FileStreamer=p,k.StringStreamer=_,k.ReadableStreamStreamer=g,f.jQuery){var d=f.jQuery;d.fn.parse=function(o){var r=o.config||{},h=[];return this.each(function(e){if(!("INPUT"===d(this).prop("tagName").toUpperCase()&&"file"===d(this).attr("type").toLowerCase()&&f.FileReader)||!this.files||0===this.files.length)return !0;for(var t=0;t<this.files.length;t++)h.push({file:this.files[t],inputElem:this,instanceConfig:d.extend({},r)});}),e(),this;function e(){if(0!==h.length){var e,t,r,i,n=h[0];if(z(o.before)){var s=o.before(n.file,n.inputElem);if("object"==typeof s){if("abort"===s.action)return e="AbortError",t=n.file,r=n.inputElem,i=s.reason,void(z(o.error)&&o.error({name:e},t,r,i));if("skip"===s.action)return void u();"object"==typeof s.config&&(n.instanceConfig=d.extend(n.instanceConfig,s.config));}else if("skip"===s)return void u()}var a=n.instanceConfig.complete;n.instanceConfig.complete=function(e){z(a)&&a(e,n.file,n.inputElem),u();},k.parse(n.file,n.instanceConfig);}else z(o.complete)&&o.complete();}function u(){h.splice(0,1),e();}};}function l(e){this._handle=null,this._finished=!1,this._completed=!1,this._input=null,this._baseIndex=0,this._partialLine="",this._rowCount=0,this._start=0,this._nextChunk=null,this.isFirstChunk=!0,this._completeResults={data:[],errors:[],meta:{}},function(e){var t=E(e);t.chunkSize=parseInt(t.chunkSize),e.step||e.chunk||(t.chunkSize=null);this._handle=new r(t),(this._handle.streamer=this)._config=t;}.call(this,e),this.parseChunk=function(e,t){if(this.isFirstChunk&&z(this._config.beforeFirstChunk)){var r=this._config.beforeFirstChunk(e);void 0!==r&&(e=r);}this.isFirstChunk=!1;var i=this._partialLine+e;this._partialLine="";var n=this._handle.parse(i,this._baseIndex,!this._finished);if(!this._handle.paused()&&!this._handle.aborted()){var s=n.meta.cursor;this._finished||(this._partialLine=i.substring(s-this._baseIndex),this._baseIndex=s),n&&n.data&&(this._rowCount+=n.data.length);var a=this._finished||this._config.preview&&this._rowCount>=this._config.preview;if(o)f.postMessage({results:n,workerId:k.WORKER_ID,finished:a});else if(z(this._config.chunk)&&!t){if(this._config.chunk(n,this._handle),this._handle.paused()||this._handle.aborted())return;n=void 0,this._completeResults=void 0;}return this._config.step||this._config.chunk||(this._completeResults.data=this._completeResults.data.concat(n.data),this._completeResults.errors=this._completeResults.errors.concat(n.errors),this._completeResults.meta=n.meta),this._completed||!a||!z(this._config.complete)||n&&n.meta.aborted||(this._config.complete(this._completeResults,this._input),this._completed=!0),a||n&&n.meta.paused||this._nextChunk(),n}},this._sendError=function(e){z(this._config.error)?this._config.error(e):o&&this._config.error&&f.postMessage({workerId:k.WORKER_ID,error:e,finished:!1});};}function c(e){var i;(e=e||{}).chunkSize||(e.chunkSize=k.RemoteChunkSize),l.call(this,e),this._nextChunk=n?function(){this._readChunk(),this._chunkLoaded();}:function(){this._readChunk();},this.stream=function(e){this._input=e,this._nextChunk();},this._readChunk=function(){if(this._finished)this._chunkLoaded();else{if(i=new XMLHttpRequest,this._config.withCredentials&&(i.withCredentials=this._config.withCredentials),n||(i.onload=w(this._chunkLoaded,this),i.onerror=w(this._chunkError,this)),i.open("GET",this._input,!n),this._config.downloadRequestHeaders){var e=this._config.downloadRequestHeaders;for(var t in e)i.setRequestHeader(t,e[t]);}if(this._config.chunkSize){var r=this._start+this._config.chunkSize-1;i.setRequestHeader("Range","bytes="+this._start+"-"+r),i.setRequestHeader("If-None-Match","webkit-no-cache");}try{i.send();}catch(e){this._chunkError(e.message);}n&&0===i.status?this._chunkError():this._start+=this._config.chunkSize;}},this._chunkLoaded=function(){4===i.readyState&&(i.status<200||400<=i.status?this._chunkError():(this._finished=!this._config.chunkSize||this._start>function(e){var t=e.getResponseHeader("Content-Range");if(null===t)return -1;return parseInt(t.substr(t.lastIndexOf("/")+1))}(i),this.parseChunk(i.responseText)));},this._chunkError=function(e){var t=i.statusText||e;this._sendError(new Error(t));};}function p(e){var i,n;(e=e||{}).chunkSize||(e.chunkSize=k.LocalChunkSize),l.call(this,e);var s="undefined"!=typeof FileReader;this.stream=function(e){this._input=e,n=e.slice||e.webkitSlice||e.mozSlice,s?((i=new FileReader).onload=w(this._chunkLoaded,this),i.onerror=w(this._chunkError,this)):i=new FileReaderSync,this._nextChunk();},this._nextChunk=function(){this._finished||this._config.preview&&!(this._rowCount<this._config.preview)||this._readChunk();},this._readChunk=function(){var e=this._input;if(this._config.chunkSize){var t=Math.min(this._start+this._config.chunkSize,this._input.size);e=n.call(e,this._start,t);}var r=i.readAsText(e,this._config.encoding);s||this._chunkLoaded({target:{result:r}});},this._chunkLoaded=function(e){this._start+=this._config.chunkSize,this._finished=!this._config.chunkSize||this._start>=this._input.size,this.parseChunk(e.target.result);},this._chunkError=function(){this._sendError(i.error);};}function _(e){var r;l.call(this,e=e||{}),this.stream=function(e){return r=e,this._nextChunk()},this._nextChunk=function(){if(!this._finished){var e=this._config.chunkSize,t=e?r.substr(0,e):r;return r=e?r.substr(e):"",this._finished=!r,this.parseChunk(t)}};}function g(e){l.call(this,e=e||{});var t=[],r=!0,i=!1;this.pause=function(){l.prototype.pause.apply(this,arguments),this._input.pause();},this.resume=function(){l.prototype.resume.apply(this,arguments),this._input.resume();},this.stream=function(e){this._input=e,this._input.on("data",this._streamData),this._input.on("end",this._streamEnd),this._input.on("error",this._streamError);},this._checkIsFinished=function(){i&&1===t.length&&(this._finished=!0);},this._nextChunk=function(){this._checkIsFinished(),t.length?this.parseChunk(t.shift()):r=!0;},this._streamData=w(function(e){try{t.push("string"==typeof e?e:e.toString(this._config.encoding)),r&&(r=!1,this._checkIsFinished(),this.parseChunk(t.shift()));}catch(e){this._streamError(e);}},this),this._streamError=w(function(e){this._streamCleanUp(),this._sendError(e);},this),this._streamEnd=w(function(){this._streamCleanUp(),i=!0,this._streamData("");},this),this._streamCleanUp=w(function(){this._input.removeListener("data",this._streamData),this._input.removeListener("end",this._streamEnd),this._input.removeListener("error",this._streamError);},this);}function r(g){var a,o,h,i=/^\s*-?(\d*\.?\d+|\d+\.?\d*)(e[-+]?\d+)?\s*$/i,n=/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/,t=this,r=0,s=0,u=!1,e=!1,f=[],d={data:[],errors:[],meta:{}};if(z(g.step)){var l=g.step;g.step=function(e){if(d=e,p())c();else{if(c(),0===d.data.length)return;r+=e.data.length,g.preview&&r>g.preview?o.abort():l(d,t);}};}function m(e){return "greedy"===g.skipEmptyLines?""===e.join("").trim():1===e.length&&0===e[0].length}function c(){if(d&&h&&(y("Delimiter","UndetectableDelimiter","Unable to auto-detect delimiting character; defaulted to '"+k.DefaultDelimiter+"'"),h=!1),g.skipEmptyLines)for(var e=0;e<d.data.length;e++)m(d.data[e])&&d.data.splice(e--,1);return p()&&function(){if(!d)return;for(var e=0;p()&&e<d.data.length;e++)for(var t=0;t<d.data[e].length;t++){var r=d.data[e][t];g.trimHeaders&&(r=r.trim()),f.push(r);}d.data.splice(0,1);}(),function(){if(!d||!g.header&&!g.dynamicTyping&&!g.transform)return d;for(var e=0;e<d.data.length;e++){var t,r=g.header?{}:[];for(t=0;t<d.data[e].length;t++){var i=t,n=d.data[e][t];g.header&&(i=t>=f.length?"__parsed_extra":f[t]),g.transform&&(n=g.transform(n,i)),n=_(i,n),"__parsed_extra"===i?(r[i]=r[i]||[],r[i].push(n)):r[i]=n;}d.data[e]=r,g.header&&(t>f.length?y("FieldMismatch","TooManyFields","Too many fields: expected "+f.length+" fields but parsed "+t,s+e):t<f.length&&y("FieldMismatch","TooFewFields","Too few fields: expected "+f.length+" fields but parsed "+t,s+e));}g.header&&d.meta&&(d.meta.fields=f);return s+=d.data.length,d}()}function p(){return g.header&&0===f.length}function _(e,t){return r=e,g.dynamicTypingFunction&&void 0===g.dynamicTyping[r]&&(g.dynamicTyping[r]=g.dynamicTypingFunction(r)),!0===(g.dynamicTyping[r]||g.dynamicTyping)?"true"===t||"TRUE"===t||"false"!==t&&"FALSE"!==t&&(i.test(t)?parseFloat(t):n.test(t)?new Date(t):""===t?null:t):t;var r;}function y(e,t,r,i){d.errors.push({type:e,code:t,message:r,row:i});}this.parse=function(e,t,r){var i=g.quoteChar||'"';if(g.newline||(g.newline=function(e,t){e=e.substr(0,1048576);var r=new RegExp(M(t)+"([^]*?)"+M(t),"gm"),i=(e=e.replace(r,"")).split("\r"),n=e.split("\n"),s=1<n.length&&n[0].length<i[0].length;if(1===i.length||s)return "\n";for(var a=0,o=0;o<i.length;o++)"\n"===i[o][0]&&a++;return a>=i.length/2?"\r\n":"\r"}(e,i)),h=!1,g.delimiter)z(g.delimiter)&&(g.delimiter=g.delimiter(e),d.meta.delimiter=g.delimiter);else{var n=function(e,t,r,i){for(var n,s,a,o=[",","\t","|",";",k.RECORD_SEP,k.UNIT_SEP],h=0;h<o.length;h++){var u=o[h],f=0,d=0,l=0;a=void 0;for(var c=new v({comments:i,delimiter:u,newline:t,preview:10}).parse(e),p=0;p<c.data.length;p++)if(r&&m(c.data[p]))l++;else{var _=c.data[p].length;d+=_,void 0!==a?1<_&&(f+=Math.abs(_-a),a=_):a=0;}0<c.data.length&&(d/=c.data.length-l),(void 0===s||s<f)&&1.99<d&&(s=f,n=u);}return {successful:!!(g.delimiter=n),bestDelimiter:n}}(e,g.newline,g.skipEmptyLines,g.comments);n.successful?g.delimiter=n.bestDelimiter:(h=!0,g.delimiter=k.DefaultDelimiter),d.meta.delimiter=g.delimiter;}var s=E(g);return g.preview&&g.header&&s.preview++,a=e,o=new v(s),d=o.parse(a,t,r),c(),u?{meta:{paused:!0}}:d||{meta:{paused:!1}}},this.paused=function(){return u},this.pause=function(){u=!0,o.abort(),a=a.substr(o.getCharIndex());},this.resume=function(){u=!1,t.streamer.parseChunk(a,!0);},this.aborted=function(){return e},this.abort=function(){e=!0,o.abort(),d.meta.aborted=!0,z(g.complete)&&g.complete(d),a="";};}function M(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function v(e){var S,O=(e=e||{}).delimiter,x=e.newline,T=e.comments,I=e.step,A=e.preview,D=e.fastMode,L=S=void 0===e.quoteChar?'"':e.quoteChar;if(void 0!==e.escapeChar&&(L=e.escapeChar),("string"!=typeof O||-1<k.BAD_DELIMITERS.indexOf(O))&&(O=","),T===O)throw "Comment character same as delimiter";!0===T?T="#":("string"!=typeof T||-1<k.BAD_DELIMITERS.indexOf(T))&&(T=!1),"\n"!==x&&"\r"!==x&&"\r\n"!==x&&(x="\n");var P=0,F=!1;this.parse=function(i,t,r){if("string"!=typeof i)throw "Input must be a string";var n=i.length,e=O.length,s=x.length,a=T.length,o=z(I),h=[],u=[],f=[],d=P=0;if(!i)return C();if(D||!1!==D&&-1===i.indexOf(S)){for(var l=i.split(x),c=0;c<l.length;c++){if(f=l[c],P+=f.length,c!==l.length-1)P+=x.length;else if(r)return C();if(!T||f.substr(0,a)!==T){if(o){if(h=[],k(f.split(O)),R(),F)return C()}else k(f.split(O));if(A&&A<=c)return h=h.slice(0,A),C(!0)}}return C()}for(var p,_=i.indexOf(O,P),g=i.indexOf(x,P),m=new RegExp(M(L)+M(S),"g");;)if(i[P]!==S)if(T&&0===f.length&&i.substr(P,a)===T){if(-1===g)return C();P=g+s,g=i.indexOf(x,P),_=i.indexOf(O,P);}else if(-1!==_&&(_<g||-1===g))f.push(i.substring(P,_)),P=_+e,_=i.indexOf(O,P);else{if(-1===g)break;if(f.push(i.substring(P,g)),w(g+s),o&&(R(),F))return C();if(A&&h.length>=A)return C(!0)}else for(p=P,P++;;){if(-1===(p=i.indexOf(S,p+1)))return r||u.push({type:"Quotes",code:"MissingQuotes",message:"Quoted field unterminated",row:h.length,index:P}),E();if(p===n-1)return E(i.substring(P,p).replace(m,S));if(S!==L||i[p+1]!==L){if(S===L||0===p||i[p-1]!==L){var y=b(-1===g?_:Math.min(_,g));if(i[p+1+y]===O){f.push(i.substring(P,p).replace(m,S)),P=p+1+y+e,_=i.indexOf(O,P),g=i.indexOf(x,P);break}var v=b(g);if(i.substr(p+1+v,s)===x){if(f.push(i.substring(P,p).replace(m,S)),w(p+1+v+s),_=i.indexOf(O,P),o&&(R(),F))return C();if(A&&h.length>=A)return C(!0);break}u.push({type:"Quotes",code:"InvalidQuotes",message:"Trailing quote on quoted field is malformed",row:h.length,index:P}),p++;}}else p++;}return E();function k(e){h.push(e),d=P;}function b(e){var t=0;if(-1!==e){var r=i.substring(p+1,e);r&&""===r.trim()&&(t=r.length);}return t}function E(e){return r||(void 0===e&&(e=i.substr(P)),f.push(e),P=n,k(f),o&&R()),C()}function w(e){P=e,k(f),f=[],g=i.indexOf(x,P);}function C(e){return {data:h,errors:u,meta:{delimiter:O,linebreak:x,aborted:F,truncated:!!e,cursor:d+(t||0)}}}function R(){I(C()),h=[],u=[];}},this.abort=function(){F=!0;},this.getCharIndex=function(){return P};}function m(e){var t=e.data,r=h[t.workerId],i=!1;if(t.error)r.userError(t.error,t.file);else if(t.results&&t.results.data){var n={abort:function(){i=!0,y(t.workerId,{data:[],errors:[],meta:{aborted:!0}});},pause:b,resume:b};if(z(r.userStep)){for(var s=0;s<t.results.data.length&&(r.userStep({data:[t.results.data[s]],errors:t.results.errors,meta:t.results.meta},n),!i);s++);delete t.results;}else z(r.userChunk)&&(r.userChunk(t.results,n,t.file),delete t.results);}t.finished&&!i&&y(t.workerId,t.results);}function y(e,t){var r=h[e];z(r.userComplete)&&r.userComplete(t),r.terminate(),delete h[e];}function b(){throw "Not implemented."}function E(e){if("object"!=typeof e||null===e)return e;var t=Array.isArray(e)?[]:{};for(var r in e)t[r]=E(e[r]);return t}function w(e,t){return function(){e.apply(t,arguments);}}function z(e){return "function"==typeof e}return o?f.onmessage=function(e){var t=e.data;void 0===k.WORKER_ID&&t&&(k.WORKER_ID=t.workerId);if("string"==typeof t.input)f.postMessage({workerId:k.WORKER_ID,results:k.parse(t.input,t.config),finished:!0});else if(f.File&&t.input instanceof File||t.input instanceof Object){var r=k.parse(t.input,t.config);r&&f.postMessage({workerId:k.WORKER_ID,results:r,finished:!0});}}:k.WORKERS_SUPPORTED&&(e=document.getElementsByTagName("script"),s=e.length?e[e.length-1].src:"",document.body?document.addEventListener("DOMContentLoaded",function(){a=!0;},!0):a=!0),(c.prototype=Object.create(l.prototype)).constructor=c,(p.prototype=Object.create(l.prototype)).constructor=p,(_.prototype=Object.create(_.prototype)).constructor=_,(g.prototype=Object.create(l.prototype)).constructor=g,k});
  });

  var parseCsv = function parseCsv(str) {
    try {
      return papaparse_min.parse(str.replace(/^\ufeff/, ''), {
        header: true
      }).data;
    } catch (err) {
      console.error(err);
      return {};
    }
  };

  var sortKeywords = function sortKeywords(list) {
    var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'EMPTY';
    return list.sort(function (prev, next) {
      var valPrev = prev;
      var valNext = next;

      if (key !== 'EMPTY') {
        valPrev = prev[key];
        valNext = next[key];
      }

      if (!valNext) valNext = '';
      if (!valPrev) valPrev = '';

      if (valNext.length > valPrev.length) {
        return 1;
      } else if (valPrev.length > valNext.length) {
        return -1;
      } else {
        return 0;
      }
    });
  };

  var enNameMap = new Map();
  var jpNameMap = new Map();
  var nounMap = new Map();
  var nounFixMap = new Map();
  var caiyunPrefixMap = new Map();
  var loaded = false;
  var nounLoaded = false;

  var nameWithScenario = function nameWithScenario(list) {
    var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'name';
    var newList = [];
    var keys = [];
    list.forEach(function (item) {
      var existIdx = keys.indexOf(item[key]);

      if (existIdx !== -1) {
        var obj = newList[existIdx];

        if (item.scenario) {
          obj[item.scenario] = item;
          obj.scenarios.push(item.scenario);
        } else {
          obj.trans = filter(item.trans);
          obj.noun = !!item.noun;
        }
      } else {
        var _obj2;

        var _obj = (_obj2 = {}, _defineProperty(_obj2, key, item[key]), _defineProperty(_obj2, "scenarios", []), _obj2);

        if (item.scenario) {
          _obj[item.scenario] = item;

          _obj.scenarios.push(item.scenario);
        } else {
          _obj.trans = filter(item.trans);
          _obj.noun = !!item.noun;
        }

        newList.push(_obj);
        keys.push(item[key]);
      }
    });
    return newList;
  };

  var getNameData =
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var nameEn, nameJp, listEn, listJp;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (loaded) {
                _context.next = 12;
                break;
              }

              _context.next = 3;
              return fetchWithHash('/blhxfy/data/npc-name-en.csv');

            case 3:
              nameEn = _context.sent;
              _context.next = 6;
              return fetchWithHash('/blhxfy/data/npc-name-jp.csv');

            case 6:
              nameJp = _context.sent;
              listEn = nameWithScenario(parseCsv(nameEn));
              listJp = nameWithScenario(parseCsv(nameJp));
              sortKeywords(listEn, 'name').forEach(function (item) {
                enNameMap.set(item.name, item);
              });
              sortKeywords(listJp, 'name').forEach(function (item) {
                jpNameMap.set(item.name, item);
              });
              loaded = true;

            case 12:
              return _context.abrupt("return", {
                enNameMap: enNameMap,
                jpNameMap: jpNameMap
              });

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function getNameData() {
      return _ref.apply(this, arguments);
    };
  }();

  var getNounData =
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var noun, nounFix, caiyunPrefix, listNoun, listNounFix, listCaiyunPrefix;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (nounLoaded) {
                _context2.next = 17;
                break;
              }

              _context2.next = 3;
              return fetchWithHash('/blhxfy/data/noun.csv');

            case 3:
              noun = _context2.sent;
              _context2.next = 6;
              return fetchWithHash('/blhxfy/data/noun-fix.csv');

            case 6:
              nounFix = _context2.sent;
              _context2.next = 9;
              return fetchWithHash('/blhxfy/data/caiyun-prefix.csv');

            case 9:
              caiyunPrefix = _context2.sent;
              listNoun = parseCsv(noun);
              listNounFix = parseCsv(nounFix);
              listCaiyunPrefix = parseCsv(caiyunPrefix);
              sortKeywords(listNoun, 'keyword').forEach(function (item) {
                var keyword = trim(item.keyword);
                var trans = filter(item.trans);

                if (keyword && trans) {
                  nounMap.set(keyword, {
                    trans: trans,
                    ignoreCase: !item.cs
                  });
                }
              });
              sortKeywords(listNounFix, 'text').forEach(function (item) {
                var text = trim(item.text);
                var fix = filter(item.fixed);

                if (text && fix) {
                  nounFixMap.set(text, fix);
                }
              });
              sortKeywords(listCaiyunPrefix, 'text').forEach(function (item) {
                var text = trim(item.text);
                var fix = filter(item.fixed);

                if (text && fix) {
                  caiyunPrefixMap.set(text, fix);
                }
              });
              nounLoaded = true;

            case 17:
              return _context2.abrupt("return", {
                nounMap: nounMap,
                nounFixMap: nounFixMap,
                caiyunPrefixMap: caiyunPrefixMap
              });

            case 18:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function getNounData() {
      return _ref2.apply(this, arguments);
    };
  }();

  var template = "\n<style>\n#btn-setting-blhxfy {\n  position: absolute;\n  left: 16px;\n  top: 104px;\n}\n#blhxfy-setting-modal {\n  display: none;\n  position: absolute;\n  top: 0;\n  left: 0;\n  background: #f6feff;\n  width: 100%;\n  min-height: 100%;\n  z-index: 99999;\n  padding-bottom: 38px;\n}\n#blhxfy-setting-modal input[type=text] {\n  display: block !important;\n  outline: none;\n  width: 274px;\n  font-size: 12px;\n  padding: 4px;\n  box-shadow: none;\n  border: 1px solid #78bbd8;\n  border-radius: 2px;\n  font-family: sans-serif;\n  color: #4d6671;\n}\n#blhxfy-setting-modal.show {\n  display: block;\n}\n#blhxfy-setting-modal input[type=text]::placeholder {\n  color: #aaa;\n}\n</style>\n<div id=\"blhxfy-setting-modal\">\n<div class=\"cnt-setting\">\n\t<div class=\"prt-setting-header\"><img class=\"img-header\" src=\"https://blhx.danmu9.com/blhxfy/data/static/image/setting-header.jpg\" alt=\"header_public\"></div>\n\n\n\t<div class=\"prt-setting-module\">\n\t\t<div class=\"txt-setting-title\">\u63D2\u4EF6\u8BBE\u7F6E</div>\n\t\t<div class=\"prt-setting-frame\">\n\t\t\t<div class=\"prt-setting-article\">\n\t\t\t\t<div class=\"txt-article-title\">\u7FFB\u8BD1\u6570\u636E\u57DF\u540D</div>\n\t\t\t\t<ul class=\"txt-article-lead\">\n\t\t\t\t\t<li>\u7559\u7A7A\u5219\u4F7F\u7528\u9ED8\u8BA4\u7684\u6570\u636E\u6E90</li>\n\t\t\t\t</ul>\n\t\t\t\t<div class=\"prt-button-l\">\n          <input id=\"origin-setting-blhxfy\" oninput=\"window.blhxfy.sendEvent('setting', 'origin', this.value)\" type=\"text\" value=\"\" placeholder=\"https://blhx.danmu9.com\">\n        </div>\n      </div>\n      <div class=\"txt-setting-lead\">\n        \u203B\u4F7F\u7528\u7B2C\u4E09\u65B9\u6570\u636E\u6E90\u6709\u98CE\u9669\uFF0C\u8BF7\u9009\u62E9\u53EF\u4EE5\u4FE1\u4EFB\u7684\u6570\u636E\u6E90\u3002\n      </div>\n\n      <div class=\"prt-setting-article\">\n\t\t\t\t<div class=\"txt-article-title\">\u4E3B\u89D2\u540D</div>\n\t\t\t\t<ul class=\"txt-article-lead\">\n\t\t\t\t\t<li>\u5267\u60C5\u91CC\u663E\u793A\u7684\u4E3B\u89D2\u540D\u5B57\uFF0C\u7559\u7A7A\u5219\u4F7F\u7528\u4F60\u81EA\u5DF1\u7684\u6635\u79F0</li>\n\t\t\t\t</ul>\n\t\t\t\t<div class=\"prt-button-l\">\n          <input id=\"username-setting-blhxfy\" oninput=\"window.blhxfy.sendEvent('setting', 'username', this.value)\" type=\"text\" value=\"\" placeholder=\"\u8BF7\u8F93\u5165\u4E3B\u89D2\u540D\">\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t\t<div class=\"prt-setting-article\">\n\t\t\t\t<div class=\"txt-article-title\">\u673A\u7FFB\u8BBE\u7F6E</div>\n\t\t\t\t<ul class=\"txt-article-lead\">\n\t\t\t\t\t<li>\u5728\u4E00\u4E9B\u4F7F\u7528\u573A\u666F\u4E0B\uFF0C\u53EF\u80FD\u4E0D\u4F1A\u751F\u6548</li>\n\t\t\t\t</ul>\n\t\t\t\t<div class=\"prt-button\">\n\t\t\t\t\t<div class=\"prt-select-box\" style=\"margin:0 6px 0 0\">\n\t\t\t\t\t\t<div style=\"width:103px\" id=\"trans-api-setting-blhxfy-pulldown\" class=\"prt-list-pulldown btn-sort\">\n\t\t\t\t\t\t\t<div id=\"trans-api-setting-blhxfy-txt\" class=\"txt-selected\">\u5F69\u4E91\u5C0F\u8BD1</div>\n\t\t\t\t\t\t\t<select id=\"trans-api-setting-blhxfy\" class=\"frm-list-select\" onchange=\"window.blhxfy.sendEvent('setting', 'trans-api', this.value)\">\n\t\t\t\t\t\t\t<option value=\"google\">Google\u7FFB\u8BD1</option>\n\t\t\t\t\t\t\t<option value=\"caiyun\" selected>\u5F69\u4E91\u5C0F\u8BD1</option>\n\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div>\n\t\t\t\t\t\t<input id=\"trans-ja-setting-blhxfy\" onchange=\"window.blhxfy.sendEvent('setting', 'trans-ja', this.checked)\" type=\"checkbox\" value=\"\">\n\t\t\t\t\t\t<label for=\"trans-ja-setting-blhxfy\" class=\"btn-usual-setting-new adjust-font-s\">\u65E5\u8BED\u673A\u7FFB</label>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div>\n\t\t\t\t\t\t<input id=\"trans-en-setting-blhxfy\" onchange=\"window.blhxfy.sendEvent('setting', 'trans-en', this.checked)\" type=\"checkbox\" value=\"\">\n\t\t\t\t\t\t<label for=\"trans-en-setting-blhxfy\" class=\"btn-usual-setting-new adjust-font-s\">\u82F1\u8BED\u673A\u7FFB</label>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t\t<div class=\"prt-setting-article\">\n\t\t\t\t<div class=\"txt-article-title\">\u5B57\u4F53\u8BBE\u7F6E</div>\n\t\t\t\t<ul class=\"txt-article-lead\">\n\t\t\t\t\t<li>\u5267\u60C5\u6587\u672C\u4F7F\u7528\u7684\u5B57\u4F53\u3002</li>\n\t\t\t\t</ul>\n\t\t\t\t<div class=\"prt-button\">\n\t\t\t\t\t<input style=\"width:180px;margin-right:10px\" id=\"font-setting-blhxfy\" oninput=\"window.blhxfy.sendEvent('setting', 'font', this.value)\" type=\"text\" value=\"\" placeholder=\"\u8BF7\u8F93\u5165\u5B57\u4F53\">\n\t\t\t\t\t<div>\n\t\t\t\t\t\t<input id=\"font-bold-setting-blhxfy\" onchange=\"window.blhxfy.sendEvent('setting', 'font-bold', this.checked)\" type=\"checkbox\" value=\"\">\n\t\t\t\t\t\t<label style=\"top:2px\" for=\"font-bold-setting-blhxfy\" class=\"btn-usual-setting-new adjust-font-s\">\u52A0\u7C97</label>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t\t<div class=\"txt-setting-lead\">\n        \u203B\u683C\u5F0F\u540CCSS\u7684font-family\u3002\u586B none \u5219\u4E0D\u4FEE\u6539\u5B57\u4F53\uFF0C\u663E\u793A\u6E38\u620F\u9ED8\u8BA4\u5B57\u4F53\u6548\u679C\u3002\n      </div>\n\n      <div class=\"prt-setting-article\">\n\t\t\t\t<div class=\"txt-article-title\">\u6218\u6597\u754C\u9762\u7684\u6280\u80FD\u7FFB\u8BD1</div>\n\t\t\t\t<ul class=\"txt-article-lead\">\n\t\t\t\t\t<li>\u6FC0\u6D3B\u540E\u5728\u6C49\u5316\u6218\u6597\u754C\u9762\u7684\u6280\u80FD\u6309\u94AE</li>\n\t\t\t\t</ul>\n\t\t\t\t<div class=\"prt-button-l\">\n\t\t\t\t\t<div>\n\t\t\t\t\t\t<input id=\"battle-trans-setting-blhxfy\" onchange=\"window.blhxfy.sendEvent('setting', 'battle-trans', this.checked)\" type=\"checkbox\" value=\"\">\n\t\t\t\t\t\t<label for=\"battle-trans-setting-blhxfy\" class=\"btn-usual-setting-new adjust-font-s\">\u542F\u7528</label>\n\t\t\t\t\t</div>\n        </div>\n\t\t\t</div>\n\n\t\t\t<div class=\"prt-setting-article\">\n\t\t\t\t<div class=\"txt-article-title\">\u5267\u60C5CSV\u6587\u4EF6\u5FEB\u6377\u4E0B\u8F7D</div>\n\t\t\t\t<ul class=\"txt-article-lead\">\n\t\t\t\t\t<li>\u6FC0\u6D3B\u540E\u5728 SKIP \u7684\u65F6\u5019\u81EA\u52A8\u4E0B\u8F7D\u5267\u60C5CSV</li>\n\t\t\t\t</ul>\n\t\t\t\t<div class=\"prt-button-l\">\n\t\t\t\t\t<div>\n\t\t\t\t\t\t<input id=\"auto-download-setting-blhxfy\" onchange=\"window.blhxfy.sendEvent('setting', 'auto-download', this.checked)\" type=\"checkbox\" value=\"\">\n\t\t\t\t\t\t<label for=\"auto-download-setting-blhxfy\" class=\"btn-usual-setting-new adjust-font-s\">\u81EA\u52A8\u4E0B\u8F7DCSV</label>\n\t\t\t\t\t</div>\n        </div>\n\t\t\t</div>\n\n\t\t\t<div class=\"prt-setting-article\">\n\t\t\t\t<div class=\"txt-article-title\">\u5176\u4ED6\u8BBE\u7F6E</div>\n\t\t\t\t<ul class=\"txt-article-lead\">\n\t\t\t\t\t<li>\u53EF\u4EE5\u9009\u62E9\u9690\u85CF\u7F51\u9875\u6EDA\u52A8\u6761 / \u9690\u85CFMobage\u4FA7\u8FB9\u680F\uFF08\u4EC5PC\u7F51\u9875\uFF09 / \u5728\u540E\u53F0\u64AD\u653EBGM</li>\n\t\t\t\t</ul>\n\t\t\t\t<div class=\"prt-button\" style=\"flex-wrap: wrap;display: flex;\">\n\t\t\t\t\t<div>\n\t\t\t\t\t\t<input id=\"remove-scroller-setting-blhxfy\" onchange=\"window.blhxfy.sendEvent('setting', 'remove-scroller', this.checked)\" type=\"checkbox\" value=\"\">\n\t\t\t\t\t\t<label for=\"remove-scroller-setting-blhxfy\" class=\"btn-usual-setting-new adjust-font-s\">\u9690\u85CF\u6EDA\u52A8\u6761</label>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div>\n\t\t\t\t\t\t<input id=\"hide-sidebar-setting-blhxfy\" onchange=\"window.blhxfy.sendEvent('setting', 'hide-sidebar', this.checked)\" type=\"checkbox\" value=\"\">\n\t\t\t\t\t\t<label for=\"hide-sidebar-setting-blhxfy\" class=\"btn-usual-setting-new adjust-font-s\">\u9690\u85CF\u4FA7\u8FB9\u680F</label>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div>\n\t\t\t\t\t\t<input id=\"keep-bgm-setting-blhxfy\" onchange=\"window.blhxfy.sendEvent('setting', 'keep-bgm', this.checked)\" type=\"checkbox\" value=\"\">\n\t\t\t\t\t\t<label for=\"keep-bgm-setting-blhxfy\" class=\"btn-usual-setting-new adjust-font-s\">\u4FDD\u6301BGM</label>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div style=\"margin-top:5px;\">\n\t\t\t\t\t\t<input id=\"origin-text-setting-blhxfy\" onchange=\"window.blhxfy.sendEvent('setting', 'origin-text', this.checked);window.blhxfy.sendEvent('setting', 'fast-mode', event);\" type=\"checkbox\" value=\"\" data-post-name=\"scene_fast_text_mode\" name=\"scene-fast-text-mode\">\n\t\t\t\t\t\t<label for=\"origin-text-setting-blhxfy\" class=\"btn-usual-setting-new adjust-font-s\">\u539F\u6587\u5BF9\u7167</label>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\n      <div class=\"txt-setting-lead\">\n        \u203B\u4FEE\u6539\u7684\u8BBE\u7F6E\u5728\u5237\u65B0\u9875\u9762\u540E\u751F\u6548\n      </div>\n\t\t</div>\n\t</div>\n\n\t<div class=\"prt-lead-link\">\n\t\t<div class=\"lis-lead-prev\" data-href=\"setting\"><div class=\"atx-lead-link\">\u8FD4\u56DE\u8BBE\u7F6E</div></div>\n\t\t<div class=\"lis-lead-prev\" data-href=\"mypage\"><div class=\"atx-lead-link\">\u8FD4\u56DE\u9996\u9875</div></div>\n\t</div>\n</div>\n</div>\n";
  var templateForWheel = "\n<style>\n#blhxfy-setting-modal {\n\theight: 100%;\n\toverflow: auto;\n}\n</style>\n";

  var wheelStopPg = function wheelStopPg(e) {
    e.stopImmediatePropagation();
  };

  function insertSettingHtml (html) {
    html = html.replace('<div class="cnt-setting">', "".concat(template, "<div class=\"cnt-setting\"><div class=\"cnt-setting\"><div class=\"btn-usual-text\" id=\"btn-setting-blhxfy\" onclick=\"window.blhxfy.sendEvent('setting', 'show')\">\u6C49\u5316\u63D2\u4EF6\u8BBE\u7F6E</div>"));

    if (location.hash !== '#setting') {
      html = html.replace('<div class="btn-usual-text" id="btn-setting-blhxfy"', "".concat(templateForWheel, "<div class=\"btn-usual-text\" id=\"btn-setting-blhxfy\""));
      setTimeout(function () {
        var modal = document.getElementById('blhxfy-setting-modal');
        modal.removeEventListener('wheel', wheelStopPg);
        modal.removeEventListener('DOMMouseScroll', wheelStopPg);
        modal.removeEventListener('mousewheel', wheelStopPg);
        modal.addEventListener('wheel', wheelStopPg, false);
        modal.addEventListener('DOMMouseScroll', wheelStopPg, false);
        modal.addEventListener('mousewheel', wheelStopPg, false);
      }, 1000);
    }

    return html;
  }

  var extraHtml = template.replace('data-href="setting"', 'onclick="window.blhxfy.sendEvent(\'setting\', \'hide\')"').replace('返回设置', '返回剧情');
  var html$2 = "\n<style>\n.cnt-quest-scene .prt-log-display {\n  padding-top: 74px;\n}\n#blhxfy-story-tool {\n  display: none;\n}\n#blhxfy-story-tool > div {\n  width: 152px;\n  margin: 7px auto;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n#blhxfy-story-input button,\n#blhxfy-story-tool button {\n  border: none;\n  background: none;\n  cursor: pointer;\n  padding: 4px 6px;\n  font-size: 10px;\n  margin: 0;\n  letter-spacing: 1px;\n  line-height: 1;\n  outline: none;\n  position: relative;\n  transition: none;\n  border-radius: 3px;\n  background: #539cba;\n  color: #fff;\n  box-shadow: 0 3px #165c85;\n  text-shadow: 1px 1px 2px rgba(0,0,0,0.5)\n}\n\n#blhxfy-story-input button:hover,\n#blhxfy-story-tool button:hover {\n  box-shadow: 0 2px #165c85;\n  top: 1px;\n}\n#blhxfy-story-input button:active,\n#blhxfy-story-tool button:active {\n  box-shadow: 0 1px #165c85;\n  top: 2px;\n}\n.log #blhxfy-story-tool {\n  display: block;\n  position: absolute;\n  top: 26px;\n  left: 50%;\n  width: 180px;\n  margin-left: -90px;\n  z-index: 9999;\n  text-align: center;\n}\n#blhxfy-story-input {\n  position: absolute;\n  display: none;\n  top: 0;\n  left: 0;\n  width: 320px;\n  height: 100%;\n  background: #fff;\n  z-index: 10000;\n}\n.blhxfy-preview-tool {\n  padding-top: 10px;\n  padding-bottom: 10px;\n  border-bottom: 1px solid #e3e3e3;\n  display: flex;\n  justify-content: space-between;\n  padding-left: 10px;\n  padding-right: 10px;\n  background: #116d82;\n}\n#blhxfy-story-input p {\n  margin: 10px 10px 0 10px;\n  color: #5b8690;\n  text-align: left;\n  font-size: 10px;\n  position: relative;\n}\n#blhxfy-story-input p a {\n  color: #29b82d;\n  position: absolute;\n  cursor: pointer;\n  padding: 4px;\n  right: 0;\n  top: -5px;\n}\n#blhxfy-story-input textarea {\n  width: 300px;\n  height: calc(100% - 80px);\n  margin: 10px;\n  box-sizing: border-box;\n  font-size: 8px;\n  padding: 4px;\n  border-radius: 2px;\n  box-shadow: inset 0 0 3px #2c88d775;\n  outline: none;\n  resize: none;\n  font-family: Consolas, \"Microsoft Yahei\";\n}\n.language-setting-blhxfy {\n  font-size: 10px;\n  color: #fff;\n  top: 1px;\n  position: relative;\n  font-family: Microsoft Jhenghei;\n}\n.language-setting-blhxfy select {\n  border: none;\n  border-radius: 2px;\n}\n.blhxfy-story-plaintext {\n  position: absolute;\n  right: -33px;\n  top: 8px;\n  color: #fff;\n  width: auto !important;\n  font-size: 8px;\n}\n</style>\n<div id=\"blhxfy-story-tool\">\n  <div class=\"blhxfy-story-plaintext\">\n    <input id=\"plain-text-blhxfy\" type=\"checkbox\" onchange=\"window.blhxfy.sendEvent('setting', 'plain-text', this.checked)\">\n    <label for=\"plain-text-blhxfy\" style=\"padding-left:2px\" title=\"\u52FE\u9009\u540E\uFF0C\u4E0B\u8F7D\u7684csv\u6587\u4EF6\u4F1A\u53BB\u6389\u91CC\u9762\u7684html\u4EE3\u7801\">\u7EAF\u6587\u672C</label>\n  </div>\n  <div>\n    <button onclick=\"window.blhxfy.sendEvent('dlStoryCsv')\" title=\"\u4E0B\u8F7D\u672A\u7FFB\u8BD1\u7684\u5267\u60C5\u6587\u672C\">\u539F\u6587</button>\n    <button onclick=\"window.blhxfy.sendEvent('dlStoryCsv', 'fill')\" title=\"\u4E0B\u8F7D\u7528\u539F\u6587\u586B\u5145trans\u5217\u7684\u5267\u60C5\u6587\u672C\">\u586B\u5145</button>\n    <button onclick=\"window.blhxfy.sendEvent('dlStoryCsv', 'trans')\" title=\"\u4E0B\u8F7D\u5DF2\u7FFB\u8BD1\u7684\u5267\u60C5\u6587\u672C\">\u8BD1\u6587</button>\n    <button onclick=\"window.blhxfy.sendEvent('previewCsv', 'show')\" title=\"\u586B\u5199\u7FFB\u8BD1\u597D\u7684\u5267\u60C5\u6587\u672C\u6765\u9884\u89C8\">\u9884\u89C8</button>\n  </div>\n  <div>\n    <div class=\"language-setting-blhxfy\">\n      <span>\u8BED\u8A00\uFF1A</span>\n      <select id=\"language-type-blhxfy\" onchange=\"window.blhxfy.sendEvent('setting', 'language', event)\" class=\"frm-list-select frm-post-async is-reload\" data-post-name=\"language_type\">\n        <option value=\"1\">\u65E5\u672C\u8A9E</option>\n        <option value=\"2\">English</option>\n      </select>\n    </div>\n    <button onclick=\"window.blhxfy.sendEvent('setting', 'show')\" title=\"\u63D2\u4EF6\u8BBE\u7F6E\">\u8BBE\u7F6E</button>\n  </div>\n</div>\n<div id=\"blhxfy-story-input\">\n  <div class=\"blhxfy-preview-tool\">\n    <button onclick=\"window.blhxfy.sendEvent('previewCsv', 'hide')\">\u53D6\u6D88</button>\n    <button onclick=\"window.blhxfy.sendEvent('previewCsv', 'save')\" title=\"\u4FDD\u5B58\u9884\u89C8\u6587\u672C\u5E76\u5237\u65B0\u9875\u9762\">\u4FDD\u5B58</button>\n  </div>\n  <p>\u8BF7\u5C06\u7F16\u8F91\u597D\u7684\u5267\u60C5\u6587\u672C\u7C98\u8D34\u5230\u6587\u672C\u6846<a onclick=\"window.blhxfy.sendEvent('previewCsv', 'clear')\" title=\"\u6E05\u9664\u9884\u89C8\u6587\u672C\">\u6E05\u7A7A</a></p>\n  <textarea placeholder=\"\u5267\u60C5\u6587\u672C\"></textarea>\n</div>\n<link type=\"text/css\" rel=\"stylesheet\" href=\"".concat(Game.cssUri, "/setting/index.css\">\n").concat(extraHtml, "\n");
  function insertToolHtml () {
    var cont = $('.cnt-quest-scene');
    var tool = $('#blhxfy-story-tool');
    if (tool[0]) return;

    if (cont[0]) {
      cont.prepend(html$2);
      var langVal = {
        ja: 1,
        en: 2
      };
      $('#language-type-blhxfy').val(langVal[Game.lang]);
      $('#plain-text-blhxfy')[0].checked = config.plainText;

      if (config.originText) {
        cont.find('.prt-scene-comment').prepend("<div class=\"blhxfy-btn-origin-text\"></div>");
      }
    }
  }

  function autoDownloadCsv () {
    if (config.autoDownload) {
      var downloaded = false;
      $('#wrapper').off('click.blhxfy-dlcsv').on('click.blhxfy-dlcsv', '.cnt-quest-scene .btn-skip', function () {
        setTimeout(function () {
          if (!document.querySelector('.pop-synopsis')) {
            window.blhx.sendEvent('dlStoryCsv');
            downloaded = true;
          }
        }, 100);
      });
      $('#wrapper').off('click.blhxfy-dlcsv2').on('click.blhxfy-dlcsv2', '.pop-synopsis .btn-usual-ok', function () {
        if (!downloaded) {
          window.blhx.sendEvent('dlStoryCsv');
        }
      });
    }
  }

  /**
   * Removes all key-value entries from the list cache.
   *
   * @private
   * @name clear
   * @memberOf ListCache
   */
  function listCacheClear() {
    this.__data__ = [];
    this.size = 0;
  }

  var _listCacheClear = listCacheClear;

  /**
   * Performs a
   * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * comparison between two values to determine if they are equivalent.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
   * @example
   *
   * var object = { 'a': 1 };
   * var other = { 'a': 1 };
   *
   * _.eq(object, object);
   * // => true
   *
   * _.eq(object, other);
   * // => false
   *
   * _.eq('a', 'a');
   * // => true
   *
   * _.eq('a', Object('a'));
   * // => false
   *
   * _.eq(NaN, NaN);
   * // => true
   */
  function eq(value, other) {
    return value === other || (value !== value && other !== other);
  }

  var eq_1 = eq;

  /**
   * Gets the index at which the `key` is found in `array` of key-value pairs.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} key The key to search for.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function assocIndexOf(array, key) {
    var length = array.length;
    while (length--) {
      if (eq_1(array[length][0], key)) {
        return length;
      }
    }
    return -1;
  }

  var _assocIndexOf = assocIndexOf;

  /** Used for built-in method references. */
  var arrayProto = Array.prototype;

  /** Built-in value references. */
  var splice = arrayProto.splice;

  /**
   * Removes `key` and its value from the list cache.
   *
   * @private
   * @name delete
   * @memberOf ListCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function listCacheDelete(key) {
    var data = this.__data__,
        index = _assocIndexOf(data, key);

    if (index < 0) {
      return false;
    }
    var lastIndex = data.length - 1;
    if (index == lastIndex) {
      data.pop();
    } else {
      splice.call(data, index, 1);
    }
    --this.size;
    return true;
  }

  var _listCacheDelete = listCacheDelete;

  /**
   * Gets the list cache value for `key`.
   *
   * @private
   * @name get
   * @memberOf ListCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function listCacheGet(key) {
    var data = this.__data__,
        index = _assocIndexOf(data, key);

    return index < 0 ? undefined : data[index][1];
  }

  var _listCacheGet = listCacheGet;

  /**
   * Checks if a list cache value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf ListCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function listCacheHas(key) {
    return _assocIndexOf(this.__data__, key) > -1;
  }

  var _listCacheHas = listCacheHas;

  /**
   * Sets the list cache `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf ListCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the list cache instance.
   */
  function listCacheSet(key, value) {
    var data = this.__data__,
        index = _assocIndexOf(data, key);

    if (index < 0) {
      ++this.size;
      data.push([key, value]);
    } else {
      data[index][1] = value;
    }
    return this;
  }

  var _listCacheSet = listCacheSet;

  /**
   * Creates an list cache object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function ListCache(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  // Add methods to `ListCache`.
  ListCache.prototype.clear = _listCacheClear;
  ListCache.prototype['delete'] = _listCacheDelete;
  ListCache.prototype.get = _listCacheGet;
  ListCache.prototype.has = _listCacheHas;
  ListCache.prototype.set = _listCacheSet;

  var _ListCache = ListCache;

  /**
   * Removes all key-value entries from the stack.
   *
   * @private
   * @name clear
   * @memberOf Stack
   */
  function stackClear() {
    this.__data__ = new _ListCache;
    this.size = 0;
  }

  var _stackClear = stackClear;

  /**
   * Removes `key` and its value from the stack.
   *
   * @private
   * @name delete
   * @memberOf Stack
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function stackDelete(key) {
    var data = this.__data__,
        result = data['delete'](key);

    this.size = data.size;
    return result;
  }

  var _stackDelete = stackDelete;

  /**
   * Gets the stack value for `key`.
   *
   * @private
   * @name get
   * @memberOf Stack
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function stackGet(key) {
    return this.__data__.get(key);
  }

  var _stackGet = stackGet;

  /**
   * Checks if a stack value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf Stack
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function stackHas(key) {
    return this.__data__.has(key);
  }

  var _stackHas = stackHas;

  /**
   * Checks if `value` is the
   * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
   * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an object, else `false`.
   * @example
   *
   * _.isObject({});
   * // => true
   *
   * _.isObject([1, 2, 3]);
   * // => true
   *
   * _.isObject(_.noop);
   * // => true
   *
   * _.isObject(null);
   * // => false
   */
  function isObject(value) {
    var type = typeof value;
    return value != null && (type == 'object' || type == 'function');
  }

  var isObject_1 = isObject;

  /** `Object#toString` result references. */
  var asyncTag = '[object AsyncFunction]',
      funcTag = '[object Function]',
      genTag = '[object GeneratorFunction]',
      proxyTag = '[object Proxy]';

  /**
   * Checks if `value` is classified as a `Function` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a function, else `false`.
   * @example
   *
   * _.isFunction(_);
   * // => true
   *
   * _.isFunction(/abc/);
   * // => false
   */
  function isFunction(value) {
    if (!isObject_1(value)) {
      return false;
    }
    // The use of `Object#toString` avoids issues with the `typeof` operator
    // in Safari 9 which returns 'object' for typed arrays and other constructors.
    var tag = _baseGetTag(value);
    return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
  }

  var isFunction_1 = isFunction;

  /** Used to detect overreaching core-js shims. */
  var coreJsData = _root['__core-js_shared__'];

  var _coreJsData = coreJsData;

  /** Used to detect methods masquerading as native. */
  var maskSrcKey = (function() {
    var uid = /[^.]+$/.exec(_coreJsData && _coreJsData.keys && _coreJsData.keys.IE_PROTO || '');
    return uid ? ('Symbol(src)_1.' + uid) : '';
  }());

  /**
   * Checks if `func` has its source masked.
   *
   * @private
   * @param {Function} func The function to check.
   * @returns {boolean} Returns `true` if `func` is masked, else `false`.
   */
  function isMasked(func) {
    return !!maskSrcKey && (maskSrcKey in func);
  }

  var _isMasked = isMasked;

  /** Used for built-in method references. */
  var funcProto$1 = Function.prototype;

  /** Used to resolve the decompiled source of functions. */
  var funcToString$1 = funcProto$1.toString;

  /**
   * Converts `func` to its source code.
   *
   * @private
   * @param {Function} func The function to convert.
   * @returns {string} Returns the source code.
   */
  function toSource(func) {
    if (func != null) {
      try {
        return funcToString$1.call(func);
      } catch (e) {}
      try {
        return (func + '');
      } catch (e) {}
    }
    return '';
  }

  var _toSource = toSource;

  /**
   * Used to match `RegExp`
   * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
   */
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

  /** Used to detect host constructors (Safari). */
  var reIsHostCtor = /^\[object .+?Constructor\]$/;

  /** Used for built-in method references. */
  var funcProto$2 = Function.prototype,
      objectProto$3 = Object.prototype;

  /** Used to resolve the decompiled source of functions. */
  var funcToString$2 = funcProto$2.toString;

  /** Used to check objects for own properties. */
  var hasOwnProperty$3 = objectProto$3.hasOwnProperty;

  /** Used to detect if a method is native. */
  var reIsNative = RegExp('^' +
    funcToString$2.call(hasOwnProperty$3).replace(reRegExpChar, '\\$&')
    .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
  );

  /**
   * The base implementation of `_.isNative` without bad shim checks.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a native function,
   *  else `false`.
   */
  function baseIsNative(value) {
    if (!isObject_1(value) || _isMasked(value)) {
      return false;
    }
    var pattern = isFunction_1(value) ? reIsNative : reIsHostCtor;
    return pattern.test(_toSource(value));
  }

  var _baseIsNative = baseIsNative;

  /**
   * Gets the value at `key` of `object`.
   *
   * @private
   * @param {Object} [object] The object to query.
   * @param {string} key The key of the property to get.
   * @returns {*} Returns the property value.
   */
  function getValue(object, key) {
    return object == null ? undefined : object[key];
  }

  var _getValue = getValue;

  /**
   * Gets the native function at `key` of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {string} key The key of the method to get.
   * @returns {*} Returns the function if it's native, else `undefined`.
   */
  function getNative(object, key) {
    var value = _getValue(object, key);
    return _baseIsNative(value) ? value : undefined;
  }

  var _getNative = getNative;

  /* Built-in method references that are verified to be native. */
  var Map$1 = _getNative(_root, 'Map');

  var _Map = Map$1;

  /* Built-in method references that are verified to be native. */
  var nativeCreate = _getNative(Object, 'create');

  var _nativeCreate = nativeCreate;

  /**
   * Removes all key-value entries from the hash.
   *
   * @private
   * @name clear
   * @memberOf Hash
   */
  function hashClear() {
    this.__data__ = _nativeCreate ? _nativeCreate(null) : {};
    this.size = 0;
  }

  var _hashClear = hashClear;

  /**
   * Removes `key` and its value from the hash.
   *
   * @private
   * @name delete
   * @memberOf Hash
   * @param {Object} hash The hash to modify.
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function hashDelete(key) {
    var result = this.has(key) && delete this.__data__[key];
    this.size -= result ? 1 : 0;
    return result;
  }

  var _hashDelete = hashDelete;

  /** Used to stand-in for `undefined` hash values. */
  var HASH_UNDEFINED = '__lodash_hash_undefined__';

  /** Used for built-in method references. */
  var objectProto$4 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$4 = objectProto$4.hasOwnProperty;

  /**
   * Gets the hash value for `key`.
   *
   * @private
   * @name get
   * @memberOf Hash
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function hashGet(key) {
    var data = this.__data__;
    if (_nativeCreate) {
      var result = data[key];
      return result === HASH_UNDEFINED ? undefined : result;
    }
    return hasOwnProperty$4.call(data, key) ? data[key] : undefined;
  }

  var _hashGet = hashGet;

  /** Used for built-in method references. */
  var objectProto$5 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$5 = objectProto$5.hasOwnProperty;

  /**
   * Checks if a hash value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf Hash
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function hashHas(key) {
    var data = this.__data__;
    return _nativeCreate ? (data[key] !== undefined) : hasOwnProperty$5.call(data, key);
  }

  var _hashHas = hashHas;

  /** Used to stand-in for `undefined` hash values. */
  var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

  /**
   * Sets the hash `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf Hash
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the hash instance.
   */
  function hashSet(key, value) {
    var data = this.__data__;
    this.size += this.has(key) ? 0 : 1;
    data[key] = (_nativeCreate && value === undefined) ? HASH_UNDEFINED$1 : value;
    return this;
  }

  var _hashSet = hashSet;

  /**
   * Creates a hash object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function Hash(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  // Add methods to `Hash`.
  Hash.prototype.clear = _hashClear;
  Hash.prototype['delete'] = _hashDelete;
  Hash.prototype.get = _hashGet;
  Hash.prototype.has = _hashHas;
  Hash.prototype.set = _hashSet;

  var _Hash = Hash;

  /**
   * Removes all key-value entries from the map.
   *
   * @private
   * @name clear
   * @memberOf MapCache
   */
  function mapCacheClear() {
    this.size = 0;
    this.__data__ = {
      'hash': new _Hash,
      'map': new (_Map || _ListCache),
      'string': new _Hash
    };
  }

  var _mapCacheClear = mapCacheClear;

  /**
   * Checks if `value` is suitable for use as unique object key.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
   */
  function isKeyable(value) {
    var type = typeof value;
    return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
      ? (value !== '__proto__')
      : (value === null);
  }

  var _isKeyable = isKeyable;

  /**
   * Gets the data for `map`.
   *
   * @private
   * @param {Object} map The map to query.
   * @param {string} key The reference key.
   * @returns {*} Returns the map data.
   */
  function getMapData(map, key) {
    var data = map.__data__;
    return _isKeyable(key)
      ? data[typeof key == 'string' ? 'string' : 'hash']
      : data.map;
  }

  var _getMapData = getMapData;

  /**
   * Removes `key` and its value from the map.
   *
   * @private
   * @name delete
   * @memberOf MapCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function mapCacheDelete(key) {
    var result = _getMapData(this, key)['delete'](key);
    this.size -= result ? 1 : 0;
    return result;
  }

  var _mapCacheDelete = mapCacheDelete;

  /**
   * Gets the map value for `key`.
   *
   * @private
   * @name get
   * @memberOf MapCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function mapCacheGet(key) {
    return _getMapData(this, key).get(key);
  }

  var _mapCacheGet = mapCacheGet;

  /**
   * Checks if a map value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf MapCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function mapCacheHas(key) {
    return _getMapData(this, key).has(key);
  }

  var _mapCacheHas = mapCacheHas;

  /**
   * Sets the map `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf MapCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the map cache instance.
   */
  function mapCacheSet(key, value) {
    var data = _getMapData(this, key),
        size = data.size;

    data.set(key, value);
    this.size += data.size == size ? 0 : 1;
    return this;
  }

  var _mapCacheSet = mapCacheSet;

  /**
   * Creates a map cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function MapCache(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  // Add methods to `MapCache`.
  MapCache.prototype.clear = _mapCacheClear;
  MapCache.prototype['delete'] = _mapCacheDelete;
  MapCache.prototype.get = _mapCacheGet;
  MapCache.prototype.has = _mapCacheHas;
  MapCache.prototype.set = _mapCacheSet;

  var _MapCache = MapCache;

  /** Used as the size to enable large array optimizations. */
  var LARGE_ARRAY_SIZE = 200;

  /**
   * Sets the stack `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf Stack
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the stack cache instance.
   */
  function stackSet(key, value) {
    var data = this.__data__;
    if (data instanceof _ListCache) {
      var pairs = data.__data__;
      if (!_Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
        pairs.push([key, value]);
        this.size = ++data.size;
        return this;
      }
      data = this.__data__ = new _MapCache(pairs);
    }
    data.set(key, value);
    this.size = data.size;
    return this;
  }

  var _stackSet = stackSet;

  /**
   * Creates a stack cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function Stack(entries) {
    var data = this.__data__ = new _ListCache(entries);
    this.size = data.size;
  }

  // Add methods to `Stack`.
  Stack.prototype.clear = _stackClear;
  Stack.prototype['delete'] = _stackDelete;
  Stack.prototype.get = _stackGet;
  Stack.prototype.has = _stackHas;
  Stack.prototype.set = _stackSet;

  var _Stack = Stack;

  /**
   * A specialized version of `_.forEach` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns `array`.
   */
  function arrayEach(array, iteratee) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
      if (iteratee(array[index], index, array) === false) {
        break;
      }
    }
    return array;
  }

  var _arrayEach = arrayEach;

  var defineProperty = (function() {
    try {
      var func = _getNative(Object, 'defineProperty');
      func({}, '', {});
      return func;
    } catch (e) {}
  }());

  var _defineProperty$1 = defineProperty;

  /**
   * The base implementation of `assignValue` and `assignMergeValue` without
   * value checks.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {string} key The key of the property to assign.
   * @param {*} value The value to assign.
   */
  function baseAssignValue(object, key, value) {
    if (key == '__proto__' && _defineProperty$1) {
      _defineProperty$1(object, key, {
        'configurable': true,
        'enumerable': true,
        'value': value,
        'writable': true
      });
    } else {
      object[key] = value;
    }
  }

  var _baseAssignValue = baseAssignValue;

  /** Used for built-in method references. */
  var objectProto$6 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$6 = objectProto$6.hasOwnProperty;

  /**
   * Assigns `value` to `key` of `object` if the existing value is not equivalent
   * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * for equality comparisons.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {string} key The key of the property to assign.
   * @param {*} value The value to assign.
   */
  function assignValue(object, key, value) {
    var objValue = object[key];
    if (!(hasOwnProperty$6.call(object, key) && eq_1(objValue, value)) ||
        (value === undefined && !(key in object))) {
      _baseAssignValue(object, key, value);
    }
  }

  var _assignValue = assignValue;

  /**
   * Copies properties of `source` to `object`.
   *
   * @private
   * @param {Object} source The object to copy properties from.
   * @param {Array} props The property identifiers to copy.
   * @param {Object} [object={}] The object to copy properties to.
   * @param {Function} [customizer] The function to customize copied values.
   * @returns {Object} Returns `object`.
   */
  function copyObject(source, props, object, customizer) {
    var isNew = !object;
    object || (object = {});

    var index = -1,
        length = props.length;

    while (++index < length) {
      var key = props[index];

      var newValue = customizer
        ? customizer(object[key], source[key], key, object, source)
        : undefined;

      if (newValue === undefined) {
        newValue = source[key];
      }
      if (isNew) {
        _baseAssignValue(object, key, newValue);
      } else {
        _assignValue(object, key, newValue);
      }
    }
    return object;
  }

  var _copyObject = copyObject;

  /**
   * The base implementation of `_.times` without support for iteratee shorthands
   * or max array length checks.
   *
   * @private
   * @param {number} n The number of times to invoke `iteratee`.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the array of results.
   */
  function baseTimes(n, iteratee) {
    var index = -1,
        result = Array(n);

    while (++index < n) {
      result[index] = iteratee(index);
    }
    return result;
  }

  var _baseTimes = baseTimes;

  /** `Object#toString` result references. */
  var argsTag = '[object Arguments]';

  /**
   * The base implementation of `_.isArguments`.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an `arguments` object,
   */
  function baseIsArguments(value) {
    return isObjectLike_1(value) && _baseGetTag(value) == argsTag;
  }

  var _baseIsArguments = baseIsArguments;

  /** Used for built-in method references. */
  var objectProto$7 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$7 = objectProto$7.hasOwnProperty;

  /** Built-in value references. */
  var propertyIsEnumerable = objectProto$7.propertyIsEnumerable;

  /**
   * Checks if `value` is likely an `arguments` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an `arguments` object,
   *  else `false`.
   * @example
   *
   * _.isArguments(function() { return arguments; }());
   * // => true
   *
   * _.isArguments([1, 2, 3]);
   * // => false
   */
  var isArguments = _baseIsArguments(function() { return arguments; }()) ? _baseIsArguments : function(value) {
    return isObjectLike_1(value) && hasOwnProperty$7.call(value, 'callee') &&
      !propertyIsEnumerable.call(value, 'callee');
  };

  var isArguments_1 = isArguments;

  /**
   * This method returns `false`.
   *
   * @static
   * @memberOf _
   * @since 4.13.0
   * @category Util
   * @returns {boolean} Returns `false`.
   * @example
   *
   * _.times(2, _.stubFalse);
   * // => [false, false]
   */
  function stubFalse() {
    return false;
  }

  var stubFalse_1 = stubFalse;

  var isBuffer_1 = createCommonjsModule(function (module, exports) {
  /** Detect free variable `exports`. */
  var freeExports =  exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports;

  /** Built-in value references. */
  var Buffer = moduleExports ? _root.Buffer : undefined;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

  /**
   * Checks if `value` is a buffer.
   *
   * @static
   * @memberOf _
   * @since 4.3.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
   * @example
   *
   * _.isBuffer(new Buffer(2));
   * // => true
   *
   * _.isBuffer(new Uint8Array(2));
   * // => false
   */
  var isBuffer = nativeIsBuffer || stubFalse_1;

  module.exports = isBuffer;
  });

  /** Used as references for various `Number` constants. */
  var MAX_SAFE_INTEGER = 9007199254740991;

  /** Used to detect unsigned integer values. */
  var reIsUint = /^(?:0|[1-9]\d*)$/;

  /**
   * Checks if `value` is a valid array-like index.
   *
   * @private
   * @param {*} value The value to check.
   * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
   * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
   */
  function isIndex(value, length) {
    var type = typeof value;
    length = length == null ? MAX_SAFE_INTEGER : length;

    return !!length &&
      (type == 'number' ||
        (type != 'symbol' && reIsUint.test(value))) &&
          (value > -1 && value % 1 == 0 && value < length);
  }

  var _isIndex = isIndex;

  /** Used as references for various `Number` constants. */
  var MAX_SAFE_INTEGER$1 = 9007199254740991;

  /**
   * Checks if `value` is a valid array-like length.
   *
   * **Note:** This method is loosely based on
   * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
   * @example
   *
   * _.isLength(3);
   * // => true
   *
   * _.isLength(Number.MIN_VALUE);
   * // => false
   *
   * _.isLength(Infinity);
   * // => false
   *
   * _.isLength('3');
   * // => false
   */
  function isLength(value) {
    return typeof value == 'number' &&
      value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER$1;
  }

  var isLength_1 = isLength;

  /** `Object#toString` result references. */
  var argsTag$1 = '[object Arguments]',
      arrayTag = '[object Array]',
      boolTag$1 = '[object Boolean]',
      dateTag = '[object Date]',
      errorTag = '[object Error]',
      funcTag$1 = '[object Function]',
      mapTag = '[object Map]',
      numberTag = '[object Number]',
      objectTag$1 = '[object Object]',
      regexpTag = '[object RegExp]',
      setTag = '[object Set]',
      stringTag$1 = '[object String]',
      weakMapTag = '[object WeakMap]';

  var arrayBufferTag = '[object ArrayBuffer]',
      dataViewTag = '[object DataView]',
      float32Tag = '[object Float32Array]',
      float64Tag = '[object Float64Array]',
      int8Tag = '[object Int8Array]',
      int16Tag = '[object Int16Array]',
      int32Tag = '[object Int32Array]',
      uint8Tag = '[object Uint8Array]',
      uint8ClampedTag = '[object Uint8ClampedArray]',
      uint16Tag = '[object Uint16Array]',
      uint32Tag = '[object Uint32Array]';

  /** Used to identify `toStringTag` values of typed arrays. */
  var typedArrayTags = {};
  typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
  typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
  typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
  typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
  typedArrayTags[uint32Tag] = true;
  typedArrayTags[argsTag$1] = typedArrayTags[arrayTag] =
  typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag$1] =
  typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
  typedArrayTags[errorTag] = typedArrayTags[funcTag$1] =
  typedArrayTags[mapTag] = typedArrayTags[numberTag] =
  typedArrayTags[objectTag$1] = typedArrayTags[regexpTag] =
  typedArrayTags[setTag] = typedArrayTags[stringTag$1] =
  typedArrayTags[weakMapTag] = false;

  /**
   * The base implementation of `_.isTypedArray` without Node.js optimizations.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
   */
  function baseIsTypedArray(value) {
    return isObjectLike_1(value) &&
      isLength_1(value.length) && !!typedArrayTags[_baseGetTag(value)];
  }

  var _baseIsTypedArray = baseIsTypedArray;

  /**
   * The base implementation of `_.unary` without support for storing metadata.
   *
   * @private
   * @param {Function} func The function to cap arguments for.
   * @returns {Function} Returns the new capped function.
   */
  function baseUnary(func) {
    return function(value) {
      return func(value);
    };
  }

  var _baseUnary = baseUnary;

  var _nodeUtil = createCommonjsModule(function (module, exports) {
  /** Detect free variable `exports`. */
  var freeExports =  exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports;

  /** Detect free variable `process` from Node.js. */
  var freeProcess = moduleExports && _freeGlobal.process;

  /** Used to access faster Node.js helpers. */
  var nodeUtil = (function() {
    try {
      // Use `util.types` for Node.js 10+.
      var types = freeModule && freeModule.require && freeModule.require('util').types;

      if (types) {
        return types;
      }

      // Legacy `process.binding('util')` for Node.js < 10.
      return freeProcess && freeProcess.binding && freeProcess.binding('util');
    } catch (e) {}
  }());

  module.exports = nodeUtil;
  });

  /* Node.js helper references. */
  var nodeIsTypedArray = _nodeUtil && _nodeUtil.isTypedArray;

  /**
   * Checks if `value` is classified as a typed array.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
   * @example
   *
   * _.isTypedArray(new Uint8Array);
   * // => true
   *
   * _.isTypedArray([]);
   * // => false
   */
  var isTypedArray = nodeIsTypedArray ? _baseUnary(nodeIsTypedArray) : _baseIsTypedArray;

  var isTypedArray_1 = isTypedArray;

  /** Used for built-in method references. */
  var objectProto$8 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$8 = objectProto$8.hasOwnProperty;

  /**
   * Creates an array of the enumerable property names of the array-like `value`.
   *
   * @private
   * @param {*} value The value to query.
   * @param {boolean} inherited Specify returning inherited property names.
   * @returns {Array} Returns the array of property names.
   */
  function arrayLikeKeys(value, inherited) {
    var isArr = isArray_1(value),
        isArg = !isArr && isArguments_1(value),
        isBuff = !isArr && !isArg && isBuffer_1(value),
        isType = !isArr && !isArg && !isBuff && isTypedArray_1(value),
        skipIndexes = isArr || isArg || isBuff || isType,
        result = skipIndexes ? _baseTimes(value.length, String) : [],
        length = result.length;

    for (var key in value) {
      if ((inherited || hasOwnProperty$8.call(value, key)) &&
          !(skipIndexes && (
             // Safari 9 has enumerable `arguments.length` in strict mode.
             key == 'length' ||
             // Node.js 0.10 has enumerable non-index properties on buffers.
             (isBuff && (key == 'offset' || key == 'parent')) ||
             // PhantomJS 2 has enumerable non-index properties on typed arrays.
             (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
             // Skip index properties.
             _isIndex(key, length)
          ))) {
        result.push(key);
      }
    }
    return result;
  }

  var _arrayLikeKeys = arrayLikeKeys;

  /** Used for built-in method references. */
  var objectProto$9 = Object.prototype;

  /**
   * Checks if `value` is likely a prototype object.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
   */
  function isPrototype(value) {
    var Ctor = value && value.constructor,
        proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$9;

    return value === proto;
  }

  var _isPrototype = isPrototype;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeKeys = _overArg(Object.keys, Object);

  var _nativeKeys = nativeKeys;

  /** Used for built-in method references. */
  var objectProto$a = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$9 = objectProto$a.hasOwnProperty;

  /**
   * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */
  function baseKeys(object) {
    if (!_isPrototype(object)) {
      return _nativeKeys(object);
    }
    var result = [];
    for (var key in Object(object)) {
      if (hasOwnProperty$9.call(object, key) && key != 'constructor') {
        result.push(key);
      }
    }
    return result;
  }

  var _baseKeys = baseKeys;

  /**
   * Checks if `value` is array-like. A value is considered array-like if it's
   * not a function and has a `value.length` that's an integer greater than or
   * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
   * @example
   *
   * _.isArrayLike([1, 2, 3]);
   * // => true
   *
   * _.isArrayLike(document.body.children);
   * // => true
   *
   * _.isArrayLike('abc');
   * // => true
   *
   * _.isArrayLike(_.noop);
   * // => false
   */
  function isArrayLike(value) {
    return value != null && isLength_1(value.length) && !isFunction_1(value);
  }

  var isArrayLike_1 = isArrayLike;

  /**
   * Creates an array of the own enumerable property names of `object`.
   *
   * **Note:** Non-object values are coerced to objects. See the
   * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
   * for more details.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Object
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.keys(new Foo);
   * // => ['a', 'b'] (iteration order is not guaranteed)
   *
   * _.keys('hi');
   * // => ['0', '1']
   */
  function keys(object) {
    return isArrayLike_1(object) ? _arrayLikeKeys(object) : _baseKeys(object);
  }

  var keys_1 = keys;

  /**
   * The base implementation of `_.assign` without support for multiple sources
   * or `customizer` functions.
   *
   * @private
   * @param {Object} object The destination object.
   * @param {Object} source The source object.
   * @returns {Object} Returns `object`.
   */
  function baseAssign(object, source) {
    return object && _copyObject(source, keys_1(source), object);
  }

  var _baseAssign = baseAssign;

  /**
   * This function is like
   * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
   * except that it includes inherited enumerable properties.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */
  function nativeKeysIn(object) {
    var result = [];
    if (object != null) {
      for (var key in Object(object)) {
        result.push(key);
      }
    }
    return result;
  }

  var _nativeKeysIn = nativeKeysIn;

  /** Used for built-in method references. */
  var objectProto$b = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$a = objectProto$b.hasOwnProperty;

  /**
   * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */
  function baseKeysIn(object) {
    if (!isObject_1(object)) {
      return _nativeKeysIn(object);
    }
    var isProto = _isPrototype(object),
        result = [];

    for (var key in object) {
      if (!(key == 'constructor' && (isProto || !hasOwnProperty$a.call(object, key)))) {
        result.push(key);
      }
    }
    return result;
  }

  var _baseKeysIn = baseKeysIn;

  /**
   * Creates an array of the own and inherited enumerable property names of `object`.
   *
   * **Note:** Non-object values are coerced to objects.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Object
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.keysIn(new Foo);
   * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
   */
  function keysIn$1(object) {
    return isArrayLike_1(object) ? _arrayLikeKeys(object, true) : _baseKeysIn(object);
  }

  var keysIn_1 = keysIn$1;

  /**
   * The base implementation of `_.assignIn` without support for multiple sources
   * or `customizer` functions.
   *
   * @private
   * @param {Object} object The destination object.
   * @param {Object} source The source object.
   * @returns {Object} Returns `object`.
   */
  function baseAssignIn(object, source) {
    return object && _copyObject(source, keysIn_1(source), object);
  }

  var _baseAssignIn = baseAssignIn;

  var _cloneBuffer = createCommonjsModule(function (module, exports) {
  /** Detect free variable `exports`. */
  var freeExports =  exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports;

  /** Built-in value references. */
  var Buffer = moduleExports ? _root.Buffer : undefined,
      allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

  /**
   * Creates a clone of  `buffer`.
   *
   * @private
   * @param {Buffer} buffer The buffer to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Buffer} Returns the cloned buffer.
   */
  function cloneBuffer(buffer, isDeep) {
    if (isDeep) {
      return buffer.slice();
    }
    var length = buffer.length,
        result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

    buffer.copy(result);
    return result;
  }

  module.exports = cloneBuffer;
  });

  /**
   * Copies the values of `source` to `array`.
   *
   * @private
   * @param {Array} source The array to copy values from.
   * @param {Array} [array=[]] The array to copy values to.
   * @returns {Array} Returns `array`.
   */
  function copyArray(source, array) {
    var index = -1,
        length = source.length;

    array || (array = Array(length));
    while (++index < length) {
      array[index] = source[index];
    }
    return array;
  }

  var _copyArray = copyArray;

  /**
   * A specialized version of `_.filter` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {Array} Returns the new filtered array.
   */
  function arrayFilter(array, predicate) {
    var index = -1,
        length = array == null ? 0 : array.length,
        resIndex = 0,
        result = [];

    while (++index < length) {
      var value = array[index];
      if (predicate(value, index, array)) {
        result[resIndex++] = value;
      }
    }
    return result;
  }

  var _arrayFilter = arrayFilter;

  /**
   * This method returns a new empty array.
   *
   * @static
   * @memberOf _
   * @since 4.13.0
   * @category Util
   * @returns {Array} Returns the new empty array.
   * @example
   *
   * var arrays = _.times(2, _.stubArray);
   *
   * console.log(arrays);
   * // => [[], []]
   *
   * console.log(arrays[0] === arrays[1]);
   * // => false
   */
  function stubArray() {
    return [];
  }

  var stubArray_1 = stubArray;

  /** Used for built-in method references. */
  var objectProto$c = Object.prototype;

  /** Built-in value references. */
  var propertyIsEnumerable$1 = objectProto$c.propertyIsEnumerable;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeGetSymbols = Object.getOwnPropertySymbols;

  /**
   * Creates an array of the own enumerable symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of symbols.
   */
  var getSymbols = !nativeGetSymbols ? stubArray_1 : function(object) {
    if (object == null) {
      return [];
    }
    object = Object(object);
    return _arrayFilter(nativeGetSymbols(object), function(symbol) {
      return propertyIsEnumerable$1.call(object, symbol);
    });
  };

  var _getSymbols = getSymbols;

  /**
   * Copies own symbols of `source` to `object`.
   *
   * @private
   * @param {Object} source The object to copy symbols from.
   * @param {Object} [object={}] The object to copy symbols to.
   * @returns {Object} Returns `object`.
   */
  function copySymbols(source, object) {
    return _copyObject(source, _getSymbols(source), object);
  }

  var _copySymbols = copySymbols;

  /**
   * Appends the elements of `values` to `array`.
   *
   * @private
   * @param {Array} array The array to modify.
   * @param {Array} values The values to append.
   * @returns {Array} Returns `array`.
   */
  function arrayPush(array, values) {
    var index = -1,
        length = values.length,
        offset = array.length;

    while (++index < length) {
      array[offset + index] = values[index];
    }
    return array;
  }

  var _arrayPush = arrayPush;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeGetSymbols$1 = Object.getOwnPropertySymbols;

  /**
   * Creates an array of the own and inherited enumerable symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of symbols.
   */
  var getSymbolsIn = !nativeGetSymbols$1 ? stubArray_1 : function(object) {
    var result = [];
    while (object) {
      _arrayPush(result, _getSymbols(object));
      object = _getPrototype(object);
    }
    return result;
  };

  var _getSymbolsIn = getSymbolsIn;

  /**
   * Copies own and inherited symbols of `source` to `object`.
   *
   * @private
   * @param {Object} source The object to copy symbols from.
   * @param {Object} [object={}] The object to copy symbols to.
   * @returns {Object} Returns `object`.
   */
  function copySymbolsIn(source, object) {
    return _copyObject(source, _getSymbolsIn(source), object);
  }

  var _copySymbolsIn = copySymbolsIn;

  /**
   * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
   * `keysFunc` and `symbolsFunc` to get the enumerable property names and
   * symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Function} keysFunc The function to get the keys of `object`.
   * @param {Function} symbolsFunc The function to get the symbols of `object`.
   * @returns {Array} Returns the array of property names and symbols.
   */
  function baseGetAllKeys(object, keysFunc, symbolsFunc) {
    var result = keysFunc(object);
    return isArray_1(object) ? result : _arrayPush(result, symbolsFunc(object));
  }

  var _baseGetAllKeys = baseGetAllKeys;

  /**
   * Creates an array of own enumerable property names and symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names and symbols.
   */
  function getAllKeys(object) {
    return _baseGetAllKeys(object, keys_1, _getSymbols);
  }

  var _getAllKeys = getAllKeys;

  /**
   * Creates an array of own and inherited enumerable property names and
   * symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names and symbols.
   */
  function getAllKeysIn(object) {
    return _baseGetAllKeys(object, keysIn_1, _getSymbolsIn);
  }

  var _getAllKeysIn = getAllKeysIn;

  /* Built-in method references that are verified to be native. */
  var DataView = _getNative(_root, 'DataView');

  var _DataView = DataView;

  /* Built-in method references that are verified to be native. */
  var Promise$1 = _getNative(_root, 'Promise');

  var _Promise = Promise$1;

  /* Built-in method references that are verified to be native. */
  var Set = _getNative(_root, 'Set');

  var _Set = Set;

  /* Built-in method references that are verified to be native. */
  var WeakMap$1 = _getNative(_root, 'WeakMap');

  var _WeakMap = WeakMap$1;

  /** `Object#toString` result references. */
  var mapTag$1 = '[object Map]',
      objectTag$2 = '[object Object]',
      promiseTag = '[object Promise]',
      setTag$1 = '[object Set]',
      weakMapTag$1 = '[object WeakMap]';

  var dataViewTag$1 = '[object DataView]';

  /** Used to detect maps, sets, and weakmaps. */
  var dataViewCtorString = _toSource(_DataView),
      mapCtorString = _toSource(_Map),
      promiseCtorString = _toSource(_Promise),
      setCtorString = _toSource(_Set),
      weakMapCtorString = _toSource(_WeakMap);

  /**
   * Gets the `toStringTag` of `value`.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */
  var getTag = _baseGetTag;

  // Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
  if ((_DataView && getTag(new _DataView(new ArrayBuffer(1))) != dataViewTag$1) ||
      (_Map && getTag(new _Map) != mapTag$1) ||
      (_Promise && getTag(_Promise.resolve()) != promiseTag) ||
      (_Set && getTag(new _Set) != setTag$1) ||
      (_WeakMap && getTag(new _WeakMap) != weakMapTag$1)) {
    getTag = function(value) {
      var result = _baseGetTag(value),
          Ctor = result == objectTag$2 ? value.constructor : undefined,
          ctorString = Ctor ? _toSource(Ctor) : '';

      if (ctorString) {
        switch (ctorString) {
          case dataViewCtorString: return dataViewTag$1;
          case mapCtorString: return mapTag$1;
          case promiseCtorString: return promiseTag;
          case setCtorString: return setTag$1;
          case weakMapCtorString: return weakMapTag$1;
        }
      }
      return result;
    };
  }

  var _getTag = getTag;

  /** Used for built-in method references. */
  var objectProto$d = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$b = objectProto$d.hasOwnProperty;

  /**
   * Initializes an array clone.
   *
   * @private
   * @param {Array} array The array to clone.
   * @returns {Array} Returns the initialized clone.
   */
  function initCloneArray(array) {
    var length = array.length,
        result = new array.constructor(length);

    // Add properties assigned by `RegExp#exec`.
    if (length && typeof array[0] == 'string' && hasOwnProperty$b.call(array, 'index')) {
      result.index = array.index;
      result.input = array.input;
    }
    return result;
  }

  var _initCloneArray = initCloneArray;

  /** Built-in value references. */
  var Uint8Array = _root.Uint8Array;

  var _Uint8Array = Uint8Array;

  /**
   * Creates a clone of `arrayBuffer`.
   *
   * @private
   * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
   * @returns {ArrayBuffer} Returns the cloned array buffer.
   */
  function cloneArrayBuffer(arrayBuffer) {
    var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
    new _Uint8Array(result).set(new _Uint8Array(arrayBuffer));
    return result;
  }

  var _cloneArrayBuffer = cloneArrayBuffer;

  /**
   * Creates a clone of `dataView`.
   *
   * @private
   * @param {Object} dataView The data view to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Object} Returns the cloned data view.
   */
  function cloneDataView(dataView, isDeep) {
    var buffer = isDeep ? _cloneArrayBuffer(dataView.buffer) : dataView.buffer;
    return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
  }

  var _cloneDataView = cloneDataView;

  /** Used to match `RegExp` flags from their coerced string values. */
  var reFlags = /\w*$/;

  /**
   * Creates a clone of `regexp`.
   *
   * @private
   * @param {Object} regexp The regexp to clone.
   * @returns {Object} Returns the cloned regexp.
   */
  function cloneRegExp(regexp) {
    var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
    result.lastIndex = regexp.lastIndex;
    return result;
  }

  var _cloneRegExp = cloneRegExp;

  /** Used to convert symbols to primitives and strings. */
  var symbolProto = _Symbol ? _Symbol.prototype : undefined,
      symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

  /**
   * Creates a clone of the `symbol` object.
   *
   * @private
   * @param {Object} symbol The symbol object to clone.
   * @returns {Object} Returns the cloned symbol object.
   */
  function cloneSymbol(symbol) {
    return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
  }

  var _cloneSymbol = cloneSymbol;

  /**
   * Creates a clone of `typedArray`.
   *
   * @private
   * @param {Object} typedArray The typed array to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Object} Returns the cloned typed array.
   */
  function cloneTypedArray(typedArray, isDeep) {
    var buffer = isDeep ? _cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
    return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
  }

  var _cloneTypedArray = cloneTypedArray;

  /** `Object#toString` result references. */
  var boolTag$2 = '[object Boolean]',
      dateTag$1 = '[object Date]',
      mapTag$2 = '[object Map]',
      numberTag$1 = '[object Number]',
      regexpTag$1 = '[object RegExp]',
      setTag$2 = '[object Set]',
      stringTag$2 = '[object String]',
      symbolTag = '[object Symbol]';

  var arrayBufferTag$1 = '[object ArrayBuffer]',
      dataViewTag$2 = '[object DataView]',
      float32Tag$1 = '[object Float32Array]',
      float64Tag$1 = '[object Float64Array]',
      int8Tag$1 = '[object Int8Array]',
      int16Tag$1 = '[object Int16Array]',
      int32Tag$1 = '[object Int32Array]',
      uint8Tag$1 = '[object Uint8Array]',
      uint8ClampedTag$1 = '[object Uint8ClampedArray]',
      uint16Tag$1 = '[object Uint16Array]',
      uint32Tag$1 = '[object Uint32Array]';

  /**
   * Initializes an object clone based on its `toStringTag`.
   *
   * **Note:** This function only supports cloning values with tags of
   * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
   *
   * @private
   * @param {Object} object The object to clone.
   * @param {string} tag The `toStringTag` of the object to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Object} Returns the initialized clone.
   */
  function initCloneByTag(object, tag, isDeep) {
    var Ctor = object.constructor;
    switch (tag) {
      case arrayBufferTag$1:
        return _cloneArrayBuffer(object);

      case boolTag$2:
      case dateTag$1:
        return new Ctor(+object);

      case dataViewTag$2:
        return _cloneDataView(object, isDeep);

      case float32Tag$1: case float64Tag$1:
      case int8Tag$1: case int16Tag$1: case int32Tag$1:
      case uint8Tag$1: case uint8ClampedTag$1: case uint16Tag$1: case uint32Tag$1:
        return _cloneTypedArray(object, isDeep);

      case mapTag$2:
        return new Ctor;

      case numberTag$1:
      case stringTag$2:
        return new Ctor(object);

      case regexpTag$1:
        return _cloneRegExp(object);

      case setTag$2:
        return new Ctor;

      case symbolTag:
        return _cloneSymbol(object);
    }
  }

  var _initCloneByTag = initCloneByTag;

  /** Built-in value references. */
  var objectCreate = Object.create;

  /**
   * The base implementation of `_.create` without support for assigning
   * properties to the created object.
   *
   * @private
   * @param {Object} proto The object to inherit from.
   * @returns {Object} Returns the new object.
   */
  var baseCreate = (function() {
    function object() {}
    return function(proto) {
      if (!isObject_1(proto)) {
        return {};
      }
      if (objectCreate) {
        return objectCreate(proto);
      }
      object.prototype = proto;
      var result = new object;
      object.prototype = undefined;
      return result;
    };
  }());

  var _baseCreate = baseCreate;

  /**
   * Initializes an object clone.
   *
   * @private
   * @param {Object} object The object to clone.
   * @returns {Object} Returns the initialized clone.
   */
  function initCloneObject(object) {
    return (typeof object.constructor == 'function' && !_isPrototype(object))
      ? _baseCreate(_getPrototype(object))
      : {};
  }

  var _initCloneObject = initCloneObject;

  /** `Object#toString` result references. */
  var mapTag$3 = '[object Map]';

  /**
   * The base implementation of `_.isMap` without Node.js optimizations.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a map, else `false`.
   */
  function baseIsMap(value) {
    return isObjectLike_1(value) && _getTag(value) == mapTag$3;
  }

  var _baseIsMap = baseIsMap;

  /* Node.js helper references. */
  var nodeIsMap = _nodeUtil && _nodeUtil.isMap;

  /**
   * Checks if `value` is classified as a `Map` object.
   *
   * @static
   * @memberOf _
   * @since 4.3.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a map, else `false`.
   * @example
   *
   * _.isMap(new Map);
   * // => true
   *
   * _.isMap(new WeakMap);
   * // => false
   */
  var isMap = nodeIsMap ? _baseUnary(nodeIsMap) : _baseIsMap;

  var isMap_1 = isMap;

  /** `Object#toString` result references. */
  var setTag$3 = '[object Set]';

  /**
   * The base implementation of `_.isSet` without Node.js optimizations.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a set, else `false`.
   */
  function baseIsSet(value) {
    return isObjectLike_1(value) && _getTag(value) == setTag$3;
  }

  var _baseIsSet = baseIsSet;

  /* Node.js helper references. */
  var nodeIsSet = _nodeUtil && _nodeUtil.isSet;

  /**
   * Checks if `value` is classified as a `Set` object.
   *
   * @static
   * @memberOf _
   * @since 4.3.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a set, else `false`.
   * @example
   *
   * _.isSet(new Set);
   * // => true
   *
   * _.isSet(new WeakSet);
   * // => false
   */
  var isSet = nodeIsSet ? _baseUnary(nodeIsSet) : _baseIsSet;

  var isSet_1 = isSet;

  /** Used to compose bitmasks for cloning. */
  var CLONE_DEEP_FLAG = 1,
      CLONE_FLAT_FLAG = 2,
      CLONE_SYMBOLS_FLAG = 4;

  /** `Object#toString` result references. */
  var argsTag$2 = '[object Arguments]',
      arrayTag$1 = '[object Array]',
      boolTag$3 = '[object Boolean]',
      dateTag$2 = '[object Date]',
      errorTag$1 = '[object Error]',
      funcTag$2 = '[object Function]',
      genTag$1 = '[object GeneratorFunction]',
      mapTag$4 = '[object Map]',
      numberTag$2 = '[object Number]',
      objectTag$3 = '[object Object]',
      regexpTag$2 = '[object RegExp]',
      setTag$4 = '[object Set]',
      stringTag$3 = '[object String]',
      symbolTag$1 = '[object Symbol]',
      weakMapTag$2 = '[object WeakMap]';

  var arrayBufferTag$2 = '[object ArrayBuffer]',
      dataViewTag$3 = '[object DataView]',
      float32Tag$2 = '[object Float32Array]',
      float64Tag$2 = '[object Float64Array]',
      int8Tag$2 = '[object Int8Array]',
      int16Tag$2 = '[object Int16Array]',
      int32Tag$2 = '[object Int32Array]',
      uint8Tag$2 = '[object Uint8Array]',
      uint8ClampedTag$2 = '[object Uint8ClampedArray]',
      uint16Tag$2 = '[object Uint16Array]',
      uint32Tag$2 = '[object Uint32Array]';

  /** Used to identify `toStringTag` values supported by `_.clone`. */
  var cloneableTags = {};
  cloneableTags[argsTag$2] = cloneableTags[arrayTag$1] =
  cloneableTags[arrayBufferTag$2] = cloneableTags[dataViewTag$3] =
  cloneableTags[boolTag$3] = cloneableTags[dateTag$2] =
  cloneableTags[float32Tag$2] = cloneableTags[float64Tag$2] =
  cloneableTags[int8Tag$2] = cloneableTags[int16Tag$2] =
  cloneableTags[int32Tag$2] = cloneableTags[mapTag$4] =
  cloneableTags[numberTag$2] = cloneableTags[objectTag$3] =
  cloneableTags[regexpTag$2] = cloneableTags[setTag$4] =
  cloneableTags[stringTag$3] = cloneableTags[symbolTag$1] =
  cloneableTags[uint8Tag$2] = cloneableTags[uint8ClampedTag$2] =
  cloneableTags[uint16Tag$2] = cloneableTags[uint32Tag$2] = true;
  cloneableTags[errorTag$1] = cloneableTags[funcTag$2] =
  cloneableTags[weakMapTag$2] = false;

  /**
   * The base implementation of `_.clone` and `_.cloneDeep` which tracks
   * traversed objects.
   *
   * @private
   * @param {*} value The value to clone.
   * @param {boolean} bitmask The bitmask flags.
   *  1 - Deep clone
   *  2 - Flatten inherited properties
   *  4 - Clone symbols
   * @param {Function} [customizer] The function to customize cloning.
   * @param {string} [key] The key of `value`.
   * @param {Object} [object] The parent object of `value`.
   * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
   * @returns {*} Returns the cloned value.
   */
  function baseClone(value, bitmask, customizer, key, object, stack) {
    var result,
        isDeep = bitmask & CLONE_DEEP_FLAG,
        isFlat = bitmask & CLONE_FLAT_FLAG,
        isFull = bitmask & CLONE_SYMBOLS_FLAG;

    if (customizer) {
      result = object ? customizer(value, key, object, stack) : customizer(value);
    }
    if (result !== undefined) {
      return result;
    }
    if (!isObject_1(value)) {
      return value;
    }
    var isArr = isArray_1(value);
    if (isArr) {
      result = _initCloneArray(value);
      if (!isDeep) {
        return _copyArray(value, result);
      }
    } else {
      var tag = _getTag(value),
          isFunc = tag == funcTag$2 || tag == genTag$1;

      if (isBuffer_1(value)) {
        return _cloneBuffer(value, isDeep);
      }
      if (tag == objectTag$3 || tag == argsTag$2 || (isFunc && !object)) {
        result = (isFlat || isFunc) ? {} : _initCloneObject(value);
        if (!isDeep) {
          return isFlat
            ? _copySymbolsIn(value, _baseAssignIn(result, value))
            : _copySymbols(value, _baseAssign(result, value));
        }
      } else {
        if (!cloneableTags[tag]) {
          return object ? value : {};
        }
        result = _initCloneByTag(value, tag, isDeep);
      }
    }
    // Check for circular references and return its corresponding clone.
    stack || (stack = new _Stack);
    var stacked = stack.get(value);
    if (stacked) {
      return stacked;
    }
    stack.set(value, result);

    if (isSet_1(value)) {
      value.forEach(function(subValue) {
        result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
      });
    } else if (isMap_1(value)) {
      value.forEach(function(subValue, key) {
        result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
      });
    }

    var keysFunc = isFull
      ? (isFlat ? _getAllKeysIn : _getAllKeys)
      : (isFlat ? keysIn : keys_1);

    var props = isArr ? undefined : keysFunc(value);
    _arrayEach(props || value, function(subValue, key) {
      if (props) {
        key = subValue;
        subValue = value[key];
      }
      // Recursively populate clone (susceptible to call stack limits).
      _assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
    });
    return result;
  }

  var _baseClone = baseClone;

  /** Used to compose bitmasks for cloning. */
  var CLONE_DEEP_FLAG$1 = 1,
      CLONE_SYMBOLS_FLAG$1 = 4;

  /**
   * This method is like `_.clone` except that it recursively clones `value`.
   *
   * @static
   * @memberOf _
   * @since 1.0.0
   * @category Lang
   * @param {*} value The value to recursively clone.
   * @returns {*} Returns the deep cloned value.
   * @see _.clone
   * @example
   *
   * var objects = [{ 'a': 1 }, { 'b': 2 }];
   *
   * var deep = _.cloneDeep(objects);
   * console.log(deep[0] === objects[0]);
   * // => false
   */
  function cloneDeep(value) {
    return _baseClone(value, CLONE_DEEP_FLAG$1 | CLONE_SYMBOLS_FLAG$1);
  }

  var cloneDeep_1 = cloneDeep;

  var CROSS_DOMAIN_REQ = !!window.GM_xmlhttpRequest;

  var request$1 = function request(url, option) {
    var _option$method = option.method,
        method = _option$method === void 0 ? 'GET' : _option$method,
        headers = option.headers,
        _option$responseType = option.responseType,
        responseType = _option$responseType === void 0 ? 'json' : _option$responseType,
        data = option.data,
        _option$cors = option.cors,
        cors = _option$cors === void 0 ? false : _option$cors,
        credentials = option.credentials;

    if (cors) {
      return fetch(url, {
        body: data,
        headers: headers,
        method: method,
        mode: 'cors',
        credentials: credentials
      }).then(function (res) {
        return res.json();
      });
    }

    return new Promise(function (rev, rej) {
      if (!CROSS_DOMAIN_REQ) {
        return rej('GM_XHR MISSING');
      }

      window.GM_xmlhttpRequest({
        method: method,
        url: url,
        headers: headers,
        responseType: responseType,
        data: data,
        onload: function onload(_ref) {
          var status = _ref.status,
              responseText = _ref.responseText,
              statusText = _ref.statusText;

          if (status >= 200 && status < 300) {
            if (responseType === 'json') {
              var obj = JSON.parse(responseText);
              rev(obj);
            } else {
              rev(responseText);
            }
          } else {
            rej(statusText);
          }
        },
        onerror: function onerror(err) {
          rej(err);
        }
      });
    });
  };

  try {
    if (new URLSearchParams({
      q: '+'
    }).get('q') !== '+' || new URLSearchParams('q=%2B').get('q') !== '+') throw {};
  } catch (error) {
    window.URLSearchParams = void 0;
  }

  var urlSearchParams_node = createCommonjsModule(function (module) {

  function URLSearchParams(query) {
    var
      index, key, value,
      pairs, i, length,
      dict = Object.create(null)
    ;
    this[secret] = dict;
    if (!query) return;
    if (typeof query === 'string') {
      if (query.charAt(0) === '?') {
        query = query.slice(1);
      }
      for (
        pairs = query.split('&'),
        i = 0,
        length = pairs.length; i < length; i++
      ) {
        value = pairs[i];
        index = value.indexOf('=');
        if (-1 < index) {
          appendTo(
            dict,
            decode(value.slice(0, index)),
            decode(value.slice(index + 1))
          );
        } else if (value.length){
          appendTo(
            dict,
            decode(value),
            ''
          );
        }
      }
    } else {
      if (isArray(query)) {
        for (
          i = 0,
          length = query.length; i < length; i++
        ) {
          value = query[i];
          appendTo(dict, value[0], value[1]);
        }
      } else if (query.forEach) {
        query.forEach(addEach, dict);
      } else {
        for (key in query) {
           appendTo(dict, key, query[key]);
        }
      }
    }
  }

  var
    isArray = Array.isArray,
    URLSearchParamsProto = URLSearchParams.prototype,
    find = /[!'\(\)~]|%20|%00/g,
    plus = /\+/g,
    replace = {
      '!': '%21',
      "'": '%27',
      '(': '%28',
      ')': '%29',
      '~': '%7E',
      '%20': '+',
      '%00': '\x00'
    },
    replacer = function (match) {
      return replace[match];
    },
    secret = '__URLSearchParams__:' + Math.random()
  ;

  function addEach(value, key) {
    /* jshint validthis:true */
    appendTo(this, key, value);
  }

  function appendTo(dict, name, value) {
    var res = isArray(value) ? value.join(',') : value;
    if (name in dict)
      dict[name].push(res);
    else
      dict[name] = [res];
  }

  function decode(str) {
    return decodeURIComponent(str.replace(plus, ' '));
  }

  function encode(str) {
    return encodeURIComponent(str).replace(find, replacer);
  }

  URLSearchParamsProto.append = function append(name, value) {
    appendTo(this[secret], name, value);
  };

  URLSearchParamsProto.delete = function del(name) {
    delete this[secret][name];
  };

  URLSearchParamsProto.get = function get(name) {
    var dict = this[secret];
    return name in dict ? dict[name][0] : null;
  };

  URLSearchParamsProto.getAll = function getAll(name) {
    var dict = this[secret];
    return name in dict ? dict[name].slice(0) : [];
  };

  URLSearchParamsProto.has = function has(name) {
    return name in this[secret];
  };

  URLSearchParamsProto.set = function set(name, value) {
    this[secret][name] = ['' + value];
  };

  URLSearchParamsProto.forEach = function forEach(callback, thisArg) {
    var dict = this[secret];
    Object.getOwnPropertyNames(dict).forEach(function(name) {
      dict[name].forEach(function(value) {
        callback.call(thisArg, value, name, this);
      }, this);
    }, this);
  };

  /*
  URLSearchParamsProto.toBody = function() {
    return new Blob(
      [this.toString()],
      {type: 'application/x-www-form-urlencoded'}
    );
  };
  */

  URLSearchParamsProto.toJSON = function toJSON() {
    return {};
  };

  URLSearchParamsProto.toString = function toString() {
    var dict = this[secret], query = [], i, key, name, value;
    for (key in dict) {
      name = encode(key);
      for (
        i = 0,
        value = dict[key];
        i < value.length; i++
      ) {
        query.push(name + '=' + encode(value[i]));
      }
    }
    return query.join('&');
  };

  URLSearchParams = (module.exports = commonjsGlobal.URLSearchParams || URLSearchParams);

  (function (URLSearchParamsProto) {

    var iterable = (function () {
      try {
        return !!Symbol.iterator;
      } catch(error) {
        return false;
      }
    }());

    // mostly related to issue #24
    if (!('forEach' in URLSearchParamsProto)) {
      URLSearchParamsProto.forEach = function forEach(callback, thisArg) {
        var names = Object.create(null);
        this.toString()
            .replace(/=[\s\S]*?(?:&|$)/g, '=')
            .split('=')
            .forEach(function (name) {
              if (!name.length || name in names) return;
              (names[name] = this.getAll(name)).forEach(function(value) {
                callback.call(thisArg, value, name, this);
              }, this);
            }, this);
      };
    }

    if (!('keys' in URLSearchParamsProto)) {
      URLSearchParamsProto.keys = function keys() {
        var items = [];
        this.forEach(function(value, name) { items.push(name); });
        var iterator = {
          next: function() {
            var value = items.shift();
            return {done: value === undefined, value: value};
          }
        };

        if (iterable) {
          iterator[Symbol.iterator] = function() {
            return iterator;
          };
        }

        return iterator;
      };
    }

    if (!('values' in URLSearchParamsProto)) {
      URLSearchParamsProto.values = function values() {
        var items = [];
        this.forEach(function(value) { items.push(value); });
        var iterator = {
          next: function() {
            var value = items.shift();
            return {done: value === undefined, value: value};
          }
        };

        if (iterable) {
          iterator[Symbol.iterator] = function() {
            return iterator;
          };
        }

        return iterator;
      };
    }

    if (!('entries' in URLSearchParamsProto)) {
      URLSearchParamsProto.entries = function entries() {
        var items = [];
        this.forEach(function(value, name) { items.push([name, value]); });
        var iterator = {
          next: function() {
            var value = items.shift();
            return {done: value === undefined, value: value};
          }
        };

        if (iterable) {
          iterator[Symbol.iterator] = function() {
            return iterator;
          };
        }

        return iterator;
      };
    }

    if (iterable && !(Symbol.iterator in URLSearchParamsProto)) {
      URLSearchParamsProto[Symbol.iterator] = URLSearchParamsProto.entries;
    }

    if (!('sort' in URLSearchParamsProto)) {
      URLSearchParamsProto.sort = function sort() {
        var
          entries = this.entries(),
          entry = entries.next(),
          done = entry.done,
          keys = [],
          values = Object.create(null),
          i, key, value
        ;
        while (!done) {
          value = entry.value;
          key = value[0];
          keys.push(key);
          if (!(key in values)) {
            values[key] = [];
          }
          values[key].push(value[1]);
          entry = entries.next();
          done = entry.done;
        }
        // not the champion in efficiency
        // but these two bits just do the job
        keys.sort();
        for (i = 0; i < keys.length; i++) {
          this.delete(keys[i]);
        }
        for (i = 0; i < keys.length; i++) {
          key = keys[i];
          this.append(key, values[key].shift());
        }
      };
    }

  }(URLSearchParams.prototype));
  });

  var BrowserId = (function () {

    var e = function e(t) {
      if (!(this instanceof e)) return new e(t);
      this.options = this.extend(t, {
        swfContainerId: "fingerprintjs2",
        swfPath: "flash/compiled/FontList.swf",
        detectScreenOrientation: !0,
        sortPluginsFor: [/palemoon/i],
        userDefinedFonts: [],
        excludeDoNotTrack: !0,
        excludePixelRatio: !0
      }), this.nativeForEach = Array.prototype.forEach, this.nativeMap = Array.prototype.map;
    };

    return e.prototype = {
      extend: function extend(e, t) {
        if (null == e) return t;

        for (var n in e) {
          null != e[n] && t[n] !== e[n] && (t[n] = e[n]);
        }

        return t;
      },
      get: function get(e) {
        var t = this,
            n = {
          data: [],
          addPreprocessedComponent: function addPreprocessedComponent(e) {
            var r = e.value;
            "function" == typeof t.options.preprocessor && (r = t.options.preprocessor(e.key, r)), n.data.push({
              key: e.key,
              value: r
            });
          }
        };
        n = this.userAgentKey(n), n = this.languageKey(n), n = this.colorDepthKey(n), n = this.deviceMemoryKey(n), n = this.pixelRatioKey(n), n = this.hardwareConcurrencyKey(n), n = this.screenResolutionKey(n), n = this.availableScreenResolutionKey(n), n = this.timezoneOffsetKey(n), n = this.sessionStorageKey(n), n = this.localStorageKey(n), n = this.indexedDbKey(n), n = this.addBehaviorKey(n), n = this.openDatabaseKey(n), n = this.cpuClassKey(n), n = this.platformKey(n), n = this.doNotTrackKey(n), n = this.pluginsKey(n), n = this.canvasKey(n), n = this.webglKey(n), n = this.webglVendorAndRendererKey(n), n = this.adBlockKey(n), n = this.hasLiedLanguagesKey(n), n = this.hasLiedResolutionKey(n), n = this.hasLiedOsKey(n), n = this.hasLiedBrowserKey(n), n = this.touchSupportKey(n), n = this.customEntropyFunction(n), this.fontsKey(n, function (n) {
          var r = [];
          t.each(n.data, function (e) {
            var t = e.value;
            t && "function" == typeof t.join && (t = t.join(";")), r.push(t);
          });
          var i = t.x64hash128(r.join("~~~"), 31);
          return e(i, n.data);
        });
      },
      customEntropyFunction: function customEntropyFunction(e) {
        return "function" == typeof this.options.customFunction && e.addPreprocessedComponent({
          key: "custom",
          value: this.options.customFunction()
        }), e;
      },
      userAgentKey: function userAgentKey(e) {
        return this.options.excludeUserAgent || e.addPreprocessedComponent({
          key: "user_agent",
          value: this.getUserAgent()
        }), e;
      },
      getUserAgent: function getUserAgent() {
        return navigator.userAgent;
      },
      languageKey: function languageKey(e) {
        return this.options.excludeLanguage || e.addPreprocessedComponent({
          key: "language",
          value: navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage || ""
        }), e;
      },
      colorDepthKey: function colorDepthKey(e) {
        return this.options.excludeColorDepth || e.addPreprocessedComponent({
          key: "color_depth",
          value: window.screen.colorDepth || -1
        }), e;
      },
      deviceMemoryKey: function deviceMemoryKey(e) {
        return this.options.excludeDeviceMemory || e.addPreprocessedComponent({
          key: "device_memory",
          value: this.getDeviceMemory()
        }), e;
      },
      getDeviceMemory: function getDeviceMemory() {
        return navigator.deviceMemory || -1;
      },
      pixelRatioKey: function pixelRatioKey(e) {
        return this.options.excludePixelRatio || e.addPreprocessedComponent({
          key: "pixel_ratio",
          value: this.getPixelRatio()
        }), e;
      },
      getPixelRatio: function getPixelRatio() {
        return window.devicePixelRatio || "";
      },
      screenResolutionKey: function screenResolutionKey(e) {
        return this.options.excludeScreenResolution ? e : this.getScreenResolution(e);
      },
      getScreenResolution: function getScreenResolution(e) {
        var t;
        return t = this.options.detectScreenOrientation && window.screen.height > window.screen.width ? [window.screen.height, window.screen.width] : [window.screen.width, window.screen.height], e.addPreprocessedComponent({
          key: "resolution",
          value: t
        }), e;
      },
      availableScreenResolutionKey: function availableScreenResolutionKey(e) {
        return this.options.excludeAvailableScreenResolution ? e : this.getAvailableScreenResolution(e);
      },
      getAvailableScreenResolution: function getAvailableScreenResolution(e) {
        var t;
        return window.screen.availWidth && window.screen.availHeight && (t = this.options.detectScreenOrientation ? window.screen.availHeight > window.screen.availWidth ? [window.screen.availHeight, window.screen.availWidth] : [window.screen.availWidth, window.screen.availHeight] : [window.screen.availHeight, window.screen.availWidth]), void 0 !== t && e.addPreprocessedComponent({
          key: "available_resolution",
          value: t
        }), e;
      },
      timezoneOffsetKey: function timezoneOffsetKey(e) {
        return this.options.excludeTimezoneOffset || e.addPreprocessedComponent({
          key: "timezone_offset",
          value: new Date().getTimezoneOffset()
        }), e;
      },
      sessionStorageKey: function sessionStorageKey(e) {
        return !this.options.excludeSessionStorage && this.hasSessionStorage() && e.addPreprocessedComponent({
          key: "session_storage",
          value: 1
        }), e;
      },
      localStorageKey: function localStorageKey(e) {
        return !this.options.excludeSessionStorage && this.hasLocalStorage() && e.addPreprocessedComponent({
          key: "local_storage",
          value: 1
        }), e;
      },
      indexedDbKey: function indexedDbKey(e) {
        return !this.options.excludeIndexedDB && this.hasIndexedDB() && e.addPreprocessedComponent({
          key: "indexed_db",
          value: 1
        }), e;
      },
      addBehaviorKey: function addBehaviorKey(e) {
        return !this.options.excludeAddBehavior && document.body && document.body.addBehavior && e.addPreprocessedComponent({
          key: "add_behavior",
          value: 1
        }), e;
      },
      openDatabaseKey: function openDatabaseKey(e) {
        return !this.options.excludeOpenDatabase && window.openDatabase && e.addPreprocessedComponent({
          key: "open_database",
          value: 1
        }), e;
      },
      cpuClassKey: function cpuClassKey(e) {
        return this.options.excludeCpuClass || e.addPreprocessedComponent({
          key: "cpu_class",
          value: this.getNavigatorCpuClass()
        }), e;
      },
      platformKey: function platformKey(e) {
        return this.options.excludePlatform || e.addPreprocessedComponent({
          key: "navigator_platform",
          value: this.getNavigatorPlatform()
        }), e;
      },
      doNotTrackKey: function doNotTrackKey(e) {
        return this.options.excludeDoNotTrack || e.addPreprocessedComponent({
          key: "do_not_track",
          value: this.getDoNotTrack()
        }), e;
      },
      canvasKey: function canvasKey(e) {
        return !this.options.excludeCanvas && this.isCanvasSupported() && e.addPreprocessedComponent({
          key: "canvas",
          value: this.getCanvasFp()
        }), e;
      },
      webglKey: function webglKey(e) {
        return !this.options.excludeWebGL && this.isWebGlSupported() && e.addPreprocessedComponent({
          key: "webgl",
          value: this.getWebglFp()
        }), e;
      },
      webglVendorAndRendererKey: function webglVendorAndRendererKey(e) {
        return !this.options.excludeWebGLVendorAndRenderer && this.isWebGlSupported() && e.addPreprocessedComponent({
          key: "webgl_vendor",
          value: this.getWebglVendorAndRenderer()
        }), e;
      },
      adBlockKey: function adBlockKey(e) {
        return this.options.excludeAdBlock || e.addPreprocessedComponent({
          key: "adblock",
          value: this.getAdBlock()
        }), e;
      },
      hasLiedLanguagesKey: function hasLiedLanguagesKey(e) {
        return this.options.excludeHasLiedLanguages || e.addPreprocessedComponent({
          key: "has_lied_languages",
          value: this.getHasLiedLanguages()
        }), e;
      },
      hasLiedResolutionKey: function hasLiedResolutionKey(e) {
        return this.options.excludeHasLiedResolution || e.addPreprocessedComponent({
          key: "has_lied_resolution",
          value: this.getHasLiedResolution()
        }), e;
      },
      hasLiedOsKey: function hasLiedOsKey(e) {
        return this.options.excludeHasLiedOs || e.addPreprocessedComponent({
          key: "has_lied_os",
          value: this.getHasLiedOs()
        }), e;
      },
      hasLiedBrowserKey: function hasLiedBrowserKey(e) {
        return this.options.excludeHasLiedBrowser || e.addPreprocessedComponent({
          key: "has_lied_browser",
          value: this.getHasLiedBrowser()
        }), e;
      },
      fontsKey: function fontsKey(e, t) {
        return this.options.excludeJsFonts ? this.flashFontsKey(e, t) : this.jsFontsKey(e, t);
      },
      flashFontsKey: function flashFontsKey(e, t) {
        return this.options.excludeFlashFonts ? t(e) : this.hasSwfObjectLoaded() && this.hasMinFlashInstalled() ? void 0 === this.options.swfPath ? t(e) : void this.loadSwfAndDetectFonts(function (n) {
          e.addPreprocessedComponent({
            key: "swf_fonts",
            value: n.join(";")
          }), t(e);
        }) : t(e);
      },
      jsFontsKey: function jsFontsKey(e, t) {
        var n = this;
        return setTimeout(function () {
          var r = ["monospace", "sans-serif", "serif"],
              i = ["Andale Mono", "Arial", "Arial Black", "Arial Hebrew", "Arial MT", "Arial Narrow", "Arial Rounded MT Bold", "Arial Unicode MS", "Bitstream Vera Sans Mono", "Book Antiqua", "Bookman Old Style", "Calibri", "Cambria", "Cambria Math", "Century", "Century Gothic", "Century Schoolbook", "Comic Sans", "Comic Sans MS", "Consolas", "Courier", "Courier New", "Geneva", "Georgia", "Helvetica", "Helvetica Neue", "Impact", "Lucida Bright", "Lucida Calligraphy", "Lucida Console", "Lucida Fax", "LUCIDA GRANDE", "Lucida Handwriting", "Lucida Sans", "Lucida Sans Typewriter", "Lucida Sans Unicode", "Microsoft Sans Serif", "Monaco", "Monotype Corsiva", "MS Gothic", "MS Outlook", "MS PGothic", "MS Reference Sans Serif", "MS Sans Serif", "MS Serif", "MYRIAD", "MYRIAD PRO", "Palatino", "Palatino Linotype", "Segoe Print", "Segoe Script", "Segoe UI", "Segoe UI Light", "Segoe UI Semibold", "Segoe UI Symbol", "Tahoma", "Times", "Times New Roman", "Times New Roman PS", "Trebuchet MS", "Verdana", "Wingdings", "Wingdings 2", "Wingdings 3"];
          n.options.extendedJsFonts && (i = i.concat(["Abadi MT Condensed Light", "Academy Engraved LET", "ADOBE CASLON PRO", "Adobe Garamond", "ADOBE GARAMOND PRO", "Agency FB", "Aharoni", "Albertus Extra Bold", "Albertus Medium", "Algerian", "Amazone BT", "American Typewriter", "American Typewriter Condensed", "AmerType Md BT", "Andalus", "Angsana New", "AngsanaUPC", "Antique Olive", "Aparajita", "Apple Chancery", "Apple Color Emoji", "Apple SD Gothic Neo", "Arabic Typesetting", "ARCHER", "ARNO PRO", "Arrus BT", "Aurora Cn BT", "AvantGarde Bk BT", "AvantGarde Md BT", "AVENIR", "Ayuthaya", "Bandy", "Bangla Sangam MN", "Bank Gothic", "BankGothic Md BT", "Baskerville", "Baskerville Old Face", "Batang", "BatangChe", "Bauer Bodoni", "Bauhaus 93", "Bazooka", "Bell MT", "Bembo", "Benguiat Bk BT", "Berlin Sans FB", "Berlin Sans FB Demi", "Bernard MT Condensed", "BernhardFashion BT", "BernhardMod BT", "Big Caslon", "BinnerD", "Blackadder ITC", "BlairMdITC TT", "Bodoni 72", "Bodoni 72 Oldstyle", "Bodoni 72 Smallcaps", "Bodoni MT", "Bodoni MT Black", "Bodoni MT Condensed", "Bodoni MT Poster Compressed", "Bookshelf Symbol 7", "Boulder", "Bradley Hand", "Bradley Hand ITC", "Bremen Bd BT", "Britannic Bold", "Broadway", "Browallia New", "BrowalliaUPC", "Brush Script MT", "Californian FB", "Calisto MT", "Calligrapher", "Candara", "CaslonOpnface BT", "Castellar", "Centaur", "Cezanne", "CG Omega", "CG Times", "Chalkboard", "Chalkboard SE", "Chalkduster", "Charlesworth", "Charter Bd BT", "Charter BT", "Chaucer", "ChelthmITC Bk BT", "Chiller", "Clarendon", "Clarendon Condensed", "CloisterBlack BT", "Cochin", "Colonna MT", "Constantia", "Cooper Black", "Copperplate", "Copperplate Gothic", "Copperplate Gothic Bold", "Copperplate Gothic Light", "CopperplGoth Bd BT", "Corbel", "Cordia New", "CordiaUPC", "Cornerstone", "Coronet", "Cuckoo", "Curlz MT", "DaunPenh", "Dauphin", "David", "DB LCD Temp", "DELICIOUS", "Denmark", "DFKai-SB", "Didot", "DilleniaUPC", "DIN", "DokChampa", "Dotum", "DotumChe", "Ebrima", "Edwardian Script ITC", "Elephant", "English 111 Vivace BT", "Engravers MT", "EngraversGothic BT", "Eras Bold ITC", "Eras Demi ITC", "Eras Light ITC", "Eras Medium ITC", "EucrosiaUPC", "Euphemia", "Euphemia UCAS", "EUROSTILE", "Exotc350 Bd BT", "FangSong", "Felix Titling", "Fixedsys", "FONTIN", "Footlight MT Light", "Forte", "FrankRuehl", "Fransiscan", "Freefrm721 Blk BT", "FreesiaUPC", "Freestyle Script", "French Script MT", "FrnkGothITC Bk BT", "Fruitger", "FRUTIGER", "Futura", "Futura Bk BT", "Futura Lt BT", "Futura Md BT", "Futura ZBlk BT", "FuturaBlack BT", "Gabriola", "Galliard BT", "Gautami", "Geeza Pro", "Geometr231 BT", "Geometr231 Hv BT", "Geometr231 Lt BT", "GeoSlab 703 Lt BT", "GeoSlab 703 XBd BT", "Gigi", "Gill Sans", "Gill Sans MT", "Gill Sans MT Condensed", "Gill Sans MT Ext Condensed Bold", "Gill Sans Ultra Bold", "Gill Sans Ultra Bold Condensed", "Gisha", "Gloucester MT Extra Condensed", "GOTHAM", "GOTHAM BOLD", "Goudy Old Style", "Goudy Stout", "GoudyHandtooled BT", "GoudyOLSt BT", "Gujarati Sangam MN", "Gulim", "GulimChe", "Gungsuh", "GungsuhChe", "Gurmukhi MN", "Haettenschweiler", "Harlow Solid Italic", "Harrington", "Heather", "Heiti SC", "Heiti TC", "HELV", "Herald", "High Tower Text", "Hiragino Kaku Gothic ProN", "Hiragino Mincho ProN", "Hoefler Text", "Humanst 521 Cn BT", "Humanst521 BT", "Humanst521 Lt BT", "Imprint MT Shadow", "Incised901 Bd BT", "Incised901 BT", "Incised901 Lt BT", "INCONSOLATA", "Informal Roman", "Informal011 BT", "INTERSTATE", "IrisUPC", "Iskoola Pota", "JasmineUPC", "Jazz LET", "Jenson", "Jester", "Jokerman", "Juice ITC", "Kabel Bk BT", "Kabel Ult BT", "Kailasa", "KaiTi", "Kalinga", "Kannada Sangam MN", "Kartika", "Kaufmann Bd BT", "Kaufmann BT", "Khmer UI", "KodchiangUPC", "Kokila", "Korinna BT", "Kristen ITC", "Krungthep", "Kunstler Script", "Lao UI", "Latha", "Leelawadee", "Letter Gothic", "Levenim MT", "LilyUPC", "Lithograph", "Lithograph Light", "Long Island", "Lydian BT", "Magneto", "Maiandra GD", "Malayalam Sangam MN", "Malgun Gothic", "Mangal", "Marigold", "Marion", "Marker Felt", "Market", "Marlett", "Matisse ITC", "Matura MT Script Capitals", "Meiryo", "Meiryo UI", "Microsoft Himalaya", "Microsoft JhengHei", "Microsoft New Tai Lue", "Microsoft PhagsPa", "Microsoft Tai Le", "Microsoft Uighur", "Microsoft YaHei", "Microsoft Yi Baiti", "MingLiU", "MingLiU_HKSCS", "MingLiU_HKSCS-ExtB", "MingLiU-ExtB", "Minion", "Minion Pro", "Miriam", "Miriam Fixed", "Mistral", "Modern", "Modern No. 20", "Mona Lisa Solid ITC TT", "Mongolian Baiti", "MONO", "MoolBoran", "Mrs Eaves", "MS LineDraw", "MS Mincho", "MS PMincho", "MS Reference Specialty", "MS UI Gothic", "MT Extra", "MUSEO", "MV Boli", "Nadeem", "Narkisim", "NEVIS", "News Gothic", "News GothicMT", "NewsGoth BT", "Niagara Engraved", "Niagara Solid", "Noteworthy", "NSimSun", "Nyala", "OCR A Extended", "Old Century", "Old English Text MT", "Onyx", "Onyx BT", "OPTIMA", "Oriya Sangam MN", "OSAKA", "OzHandicraft BT", "Palace Script MT", "Papyrus", "Parchment", "Party LET", "Pegasus", "Perpetua", "Perpetua Titling MT", "PetitaBold", "Pickwick", "Plantagenet Cherokee", "Playbill", "PMingLiU", "PMingLiU-ExtB", "Poor Richard", "Poster", "PosterBodoni BT", "PRINCETOWN LET", "Pristina", "PTBarnum BT", "Pythagoras", "Raavi", "Rage Italic", "Ravie", "Ribbon131 Bd BT", "Rockwell", "Rockwell Condensed", "Rockwell Extra Bold", "Rod", "Roman", "Sakkal Majalla", "Santa Fe LET", "Savoye LET", "Sceptre", "Script", "Script MT Bold", "SCRIPTINA", "Serifa", "Serifa BT", "Serifa Th BT", "ShelleyVolante BT", "Sherwood", "Shonar Bangla", "Showcard Gothic", "Shruti", "Signboard", "SILKSCREEN", "SimHei", "Simplified Arabic", "Simplified Arabic Fixed", "SimSun", "SimSun-ExtB", "Sinhala Sangam MN", "Sketch Rockwell", "Skia", "Small Fonts", "Snap ITC", "Snell Roundhand", "Socket", "Souvenir Lt BT", "Staccato222 BT", "Steamer", "Stencil", "Storybook", "Styllo", "Subway", "Swis721 BlkEx BT", "Swiss911 XCm BT", "Sylfaen", "Synchro LET", "System", "Tamil Sangam MN", "Technical", "Teletype", "Telugu Sangam MN", "Tempus Sans ITC", "Terminal", "Thonburi", "Traditional Arabic", "Trajan", "TRAJAN PRO", "Tristan", "Tubular", "Tunga", "Tw Cen MT", "Tw Cen MT Condensed", "Tw Cen MT Condensed Extra Bold", "TypoUpright BT", "Unicorn", "Univers", "Univers CE 55 Medium", "Univers Condensed", "Utsaah", "Vagabond", "Vani", "Vijaya", "Viner Hand ITC", "VisualUI", "Vivaldi", "Vladimir Script", "Vrinda", "Westminster", "WHITNEY", "Wide Latin", "ZapfEllipt BT", "ZapfHumnst BT", "ZapfHumnst Dm BT", "Zapfino", "Zurich BlkEx BT", "Zurich Ex BT", "ZWAdobeF"])), i = (i = i.concat(n.options.userDefinedFonts)).filter(function (e, t) {
            return i.indexOf(e) === t;
          });

          var o = document.getElementsByTagName("body")[0],
              a = document.createElement("div"),
              s = document.createElement("div"),
              c = {},
              u = {},
              l = function l() {
            var e = document.createElement("span");
            return e.style.position = "absolute", e.style.left = "-9999px", e.style.fontSize = "72px", e.style.fontStyle = "normal", e.style.fontWeight = "normal", e.style.letterSpacing = "normal", e.style.lineBreak = "auto", e.style.lineHeight = "normal", e.style.textTransform = "none", e.style.textAlign = "left", e.style.textDecoration = "none", e.style.textShadow = "none", e.style.whiteSpace = "normal", e.style.wordBreak = "normal", e.style.wordSpacing = "normal", e.innerHTML = "mmmmmmmmmmlli", e;
          },
              d = function () {
            for (var e = [], t = 0, n = r.length; t < n; t++) {
              var i = l();
              i.style.fontFamily = r[t], a.appendChild(i), e.push(i);
            }

            return e;
          }();

          o.appendChild(a);

          for (var p = 0, f = r.length; p < f; p++) {
            c[r[p]] = d[p].offsetWidth, u[r[p]] = d[p].offsetHeight;
          }

          var h = function () {
            for (var e, t, n, o = {}, a = 0, c = i.length; a < c; a++) {
              for (var u = [], d = 0, p = r.length; d < p; d++) {
                var f = (e = i[a], t = r[d], n = void 0, (n = l()).style.fontFamily = "'" + e + "'," + t, n);
                s.appendChild(f), u.push(f);
              }

              o[i[a]] = u;
            }

            return o;
          }();

          o.appendChild(s);

          for (var g = [], m = 0, y = i.length; m < y; m++) {
            (function (e) {
              for (var t = !1, n = 0; n < r.length; n++) {
                if (t = e[n].offsetWidth !== c[r[n]] || e[n].offsetHeight !== u[r[n]]) return t;
              }

              return t;
            })(h[i[m]]) && g.push(i[m]);
          }

          o.removeChild(s), o.removeChild(a), e.addPreprocessedComponent({
            key: "js_fonts",
            value: g
          }), t(e);
        }, 1);
      },
      pluginsKey: function pluginsKey(e) {
        return this.options.excludePlugins || (this.isIE() ? this.options.excludeIEPlugins || e.addPreprocessedComponent({
          key: "ie_plugins",
          value: this.getIEPlugins()
        }) : e.addPreprocessedComponent({
          key: "regular_plugins",
          value: this.getRegularPlugins()
        })), e;
      },
      getRegularPlugins: function getRegularPlugins() {
        var e = [];
        if (navigator.plugins) for (var t = 0, n = navigator.plugins.length; t < n; t++) {
          navigator.plugins[t] && e.push(navigator.plugins[t]);
        }
        return this.pluginsShouldBeSorted() && (e = e.sort(function (e, t) {
          return e.name > t.name ? 1 : e.name < t.name ? -1 : 0;
        })), this.map(e, function (e) {
          var t = this.map(e, function (e) {
            return [e.type, e.suffixes].join("~");
          }).join(",");
          return [e.name, e.description, t].join("::");
        }, this);
      },
      getIEPlugins: function getIEPlugins() {
        var e = [];
        return (Object.getOwnPropertyDescriptor && Object.getOwnPropertyDescriptor(window, "ActiveXObject") || "ActiveXObject" in window) && (e = this.map(["AcroPDF.PDF", "Adodb.Stream", "AgControl.AgControl", "DevalVRXCtrl.DevalVRXCtrl.1", "MacromediaFlashPaper.MacromediaFlashPaper", "Msxml2.DOMDocument", "Msxml2.XMLHTTP", "PDF.PdfCtrl", "QuickTime.QuickTime", "QuickTimeCheckObject.QuickTimeCheck.1", "RealPlayer", "RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)", "RealVideo.RealVideo(tm) ActiveX Control (32-bit)", "Scripting.Dictionary", "SWCtl.SWCtl", "Shell.UIHelper", "ShockwaveFlash.ShockwaveFlash", "Skype.Detection", "TDCCtl.TDCCtl", "WMPlayer.OCX", "rmocx.RealPlayer G2 Control", "rmocx.RealPlayer G2 Control.1"], function (e) {
          try {
            return new window.ActiveXObject(e), e;
          } catch (e) {
            return null;
          }
        })), navigator.plugins && (e = e.concat(this.getRegularPlugins())), e;
      },
      pluginsShouldBeSorted: function pluginsShouldBeSorted() {
        for (var e = !1, t = 0, n = this.options.sortPluginsFor.length; t < n; t++) {
          var r = this.options.sortPluginsFor[t];

          if (navigator.userAgent.match(r)) {
            e = !0;
            break;
          }
        }

        return e;
      },
      touchSupportKey: function touchSupportKey(e) {
        return this.options.excludeTouchSupport || e.addPreprocessedComponent({
          key: "touch_support",
          value: this.getTouchSupport()
        }), e;
      },
      hardwareConcurrencyKey: function hardwareConcurrencyKey(e) {
        return this.options.excludeHardwareConcurrency || e.addPreprocessedComponent({
          key: "hardware_concurrency",
          value: this.getHardwareConcurrency()
        }), e;
      },
      hasSessionStorage: function hasSessionStorage() {
        try {
          return !!window.sessionStorage;
        } catch (e) {
          return !0;
        }
      },
      hasLocalStorage: function hasLocalStorage() {
        try {
          return !!window.localStorage;
        } catch (e) {
          return !0;
        }
      },
      hasIndexedDB: function hasIndexedDB() {
        try {
          return !!window.indexedDB;
        } catch (e) {
          return !0;
        }
      },
      getHardwareConcurrency: function getHardwareConcurrency() {
        return navigator.hardwareConcurrency ? navigator.hardwareConcurrency : "unknown";
      },
      getNavigatorCpuClass: function getNavigatorCpuClass() {
        return navigator.cpuClass ? navigator.cpuClass : "unknown";
      },
      getNavigatorPlatform: function getNavigatorPlatform() {
        return navigator.platform ? navigator.platform : "unknown";
      },
      getDoNotTrack: function getDoNotTrack() {
        return navigator.doNotTrack ? navigator.doNotTrack : navigator.msDoNotTrack ? navigator.msDoNotTrack : window.doNotTrack ? window.doNotTrack : "unknown";
      },
      getTouchSupport: function getTouchSupport() {
        var e = 0,
            t = !1;
        void 0 !== navigator.maxTouchPoints ? e = navigator.maxTouchPoints : void 0 !== navigator.msMaxTouchPoints && (e = navigator.msMaxTouchPoints);

        try {
          document.createEvent("TouchEvent"), t = !0;
        } catch (e) {}

        return [e, t, "ontouchstart" in window];
      },
      getCanvasFp: function getCanvasFp() {
        var e = [],
            t = document.createElement("canvas");
        t.width = 2e3, t.height = 200, t.style.display = "inline";
        var n = t.getContext("2d");
        return n.rect(0, 0, 10, 10), n.rect(2, 2, 6, 6), e.push("canvas winding:" + (!1 === n.isPointInPath(5, 5, "evenodd") ? "yes" : "no")), n.textBaseline = "alphabetic", n.fillStyle = "#f60", n.fillRect(125, 1, 62, 20), n.fillStyle = "#069", this.options.dontUseFakeFontInCanvas ? n.font = "11pt Arial" : n.font = "11pt no-real-font-123", n.fillText("Cwm fjordbank glyphs vext quiz, 😃", 2, 15), n.fillStyle = "rgba(102, 204, 0, 0.2)", n.font = "18pt Arial", n.fillText("Cwm fjordbank glyphs vext quiz, 😃", 4, 45), n.globalCompositeOperation = "multiply", n.fillStyle = "rgb(255,0,255)", n.beginPath(), n.arc(50, 50, 50, 0, 2 * Math.PI, !0), n.closePath(), n.fill(), n.fillStyle = "rgb(0,255,255)", n.beginPath(), n.arc(100, 50, 50, 0, 2 * Math.PI, !0), n.closePath(), n.fill(), n.fillStyle = "rgb(255,255,0)", n.beginPath(), n.arc(75, 100, 50, 0, 2 * Math.PI, !0), n.closePath(), n.fill(), n.fillStyle = "rgb(255,0,255)", n.arc(75, 75, 75, 0, 2 * Math.PI, !0), n.arc(75, 75, 25, 0, 2 * Math.PI, !0), n.fill("evenodd"), t.toDataURL && e.push("canvas fp:" + t.toDataURL()), e.join("~");
      },
      getWebglFp: function getWebglFp() {
        var e,
            t = function t(_t) {
          return e.clearColor(0, 0, 0, 1), e.enable(e.DEPTH_TEST), e.depthFunc(e.LEQUAL), e.clear(e.COLOR_BUFFER_BIT | e.DEPTH_BUFFER_BIT), "[" + _t[0] + ", " + _t[1] + "]";
        };

        if (!(e = this.getWebglCanvas())) return null;
        var n = [],
            r = e.createBuffer();
        e.bindBuffer(e.ARRAY_BUFFER, r);
        var i = new Float32Array([-.2, -.9, 0, .4, -.26, 0, 0, .732134444, 0]);
        e.bufferData(e.ARRAY_BUFFER, i, e.STATIC_DRAW), r.itemSize = 3, r.numItems = 3;
        var o = e.createProgram(),
            a = e.createShader(e.VERTEX_SHADER);
        e.shaderSource(a, "attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}"), e.compileShader(a);
        var s = e.createShader(e.FRAGMENT_SHADER);
        e.shaderSource(s, "precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}"), e.compileShader(s), e.attachShader(o, a), e.attachShader(o, s), e.linkProgram(o), e.useProgram(o), o.vertexPosAttrib = e.getAttribLocation(o, "attrVertex"), o.offsetUniform = e.getUniformLocation(o, "uniformOffset"), e.enableVertexAttribArray(o.vertexPosArray), e.vertexAttribPointer(o.vertexPosAttrib, r.itemSize, e.FLOAT, !1, 0, 0), e.uniform2f(o.offsetUniform, 1, 1), e.drawArrays(e.TRIANGLE_STRIP, 0, r.numItems);

        try {
          n.push(e.canvas.toDataURL());
        } catch (e) {}

        n.push("extensions:" + (e.getSupportedExtensions() || []).join(";")), n.push("webgl aliased line width range:" + t(e.getParameter(e.ALIASED_LINE_WIDTH_RANGE))), n.push("webgl aliased point size range:" + t(e.getParameter(e.ALIASED_POINT_SIZE_RANGE))), n.push("webgl alpha bits:" + e.getParameter(e.ALPHA_BITS)), n.push("webgl antialiasing:" + (e.getContextAttributes().antialias ? "yes" : "no")), n.push("webgl blue bits:" + e.getParameter(e.BLUE_BITS)), n.push("webgl depth bits:" + e.getParameter(e.DEPTH_BITS)), n.push("webgl green bits:" + e.getParameter(e.GREEN_BITS)), n.push("webgl max anisotropy:" + function (e) {
          var t = e.getExtension("EXT_texture_filter_anisotropic") || e.getExtension("WEBKIT_EXT_texture_filter_anisotropic") || e.getExtension("MOZ_EXT_texture_filter_anisotropic");

          if (t) {
            var n = e.getParameter(t.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
            return 0 === n && (n = 2), n;
          }

          return null;
        }(e)), n.push("webgl max combined texture image units:" + e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS)), n.push("webgl max cube map texture size:" + e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE)), n.push("webgl max fragment uniform vectors:" + e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS)), n.push("webgl max render buffer size:" + e.getParameter(e.MAX_RENDERBUFFER_SIZE)), n.push("webgl max texture image units:" + e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS)), n.push("webgl max texture size:" + e.getParameter(e.MAX_TEXTURE_SIZE)), n.push("webgl max varying vectors:" + e.getParameter(e.MAX_VARYING_VECTORS)), n.push("webgl max vertex attribs:" + e.getParameter(e.MAX_VERTEX_ATTRIBS)), n.push("webgl max vertex texture image units:" + e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS)), n.push("webgl max vertex uniform vectors:" + e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS)), n.push("webgl max viewport dims:" + t(e.getParameter(e.MAX_VIEWPORT_DIMS))), n.push("webgl red bits:" + e.getParameter(e.RED_BITS)), n.push("webgl renderer:" + e.getParameter(e.RENDERER)), n.push("webgl shading language version:" + e.getParameter(e.SHADING_LANGUAGE_VERSION)), n.push("webgl stencil bits:" + e.getParameter(e.STENCIL_BITS)), n.push("webgl vendor:" + e.getParameter(e.VENDOR)), n.push("webgl version:" + e.getParameter(e.VERSION));

        try {
          var c = e.getExtension("WEBGL_debug_renderer_info");
          c && (n.push("webgl unmasked vendor:" + e.getParameter(c.UNMASKED_VENDOR_WEBGL)), n.push("webgl unmasked renderer:" + e.getParameter(c.UNMASKED_RENDERER_WEBGL)));
        } catch (e) {}

        return e.getShaderPrecisionFormat ? (n.push("webgl vertex shader high float precision:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.HIGH_FLOAT).precision), n.push("webgl vertex shader high float precision rangeMin:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.HIGH_FLOAT).rangeMin), n.push("webgl vertex shader high float precision rangeMax:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.HIGH_FLOAT).rangeMax), n.push("webgl vertex shader medium float precision:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.MEDIUM_FLOAT).precision), n.push("webgl vertex shader medium float precision rangeMin:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.MEDIUM_FLOAT).rangeMin), n.push("webgl vertex shader medium float precision rangeMax:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.MEDIUM_FLOAT).rangeMax), n.push("webgl vertex shader low float precision:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.LOW_FLOAT).precision), n.push("webgl vertex shader low float precision rangeMin:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.LOW_FLOAT).rangeMin), n.push("webgl vertex shader low float precision rangeMax:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.LOW_FLOAT).rangeMax), n.push("webgl fragment shader high float precision:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.HIGH_FLOAT).precision), n.push("webgl fragment shader high float precision rangeMin:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.HIGH_FLOAT).rangeMin), n.push("webgl fragment shader high float precision rangeMax:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.HIGH_FLOAT).rangeMax), n.push("webgl fragment shader medium float precision:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.MEDIUM_FLOAT).precision), n.push("webgl fragment shader medium float precision rangeMin:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.MEDIUM_FLOAT).rangeMin), n.push("webgl fragment shader medium float precision rangeMax:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.MEDIUM_FLOAT).rangeMax), n.push("webgl fragment shader low float precision:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.LOW_FLOAT).precision), n.push("webgl fragment shader low float precision rangeMin:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.LOW_FLOAT).rangeMin), n.push("webgl fragment shader low float precision rangeMax:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.LOW_FLOAT).rangeMax), n.push("webgl vertex shader high int precision:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.HIGH_INT).precision), n.push("webgl vertex shader high int precision rangeMin:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.HIGH_INT).rangeMin), n.push("webgl vertex shader high int precision rangeMax:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.HIGH_INT).rangeMax), n.push("webgl vertex shader medium int precision:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.MEDIUM_INT).precision), n.push("webgl vertex shader medium int precision rangeMin:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.MEDIUM_INT).rangeMin), n.push("webgl vertex shader medium int precision rangeMax:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.MEDIUM_INT).rangeMax), n.push("webgl vertex shader low int precision:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.LOW_INT).precision), n.push("webgl vertex shader low int precision rangeMin:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.LOW_INT).rangeMin), n.push("webgl vertex shader low int precision rangeMax:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.LOW_INT).rangeMax), n.push("webgl fragment shader high int precision:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.HIGH_INT).precision), n.push("webgl fragment shader high int precision rangeMin:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.HIGH_INT).rangeMin), n.push("webgl fragment shader high int precision rangeMax:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.HIGH_INT).rangeMax), n.push("webgl fragment shader medium int precision:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.MEDIUM_INT).precision), n.push("webgl fragment shader medium int precision rangeMin:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.MEDIUM_INT).rangeMin), n.push("webgl fragment shader medium int precision rangeMax:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.MEDIUM_INT).rangeMax), n.push("webgl fragment shader low int precision:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.LOW_INT).precision), n.push("webgl fragment shader low int precision rangeMin:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.LOW_INT).rangeMin), n.push("webgl fragment shader low int precision rangeMax:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.LOW_INT).rangeMax), n.join("~")) : n.join("~");
      },
      getWebglVendorAndRenderer: function getWebglVendorAndRenderer() {
        try {
          var e = this.getWebglCanvas(),
              t = e.getExtension("WEBGL_debug_renderer_info");
          return e.getParameter(t.UNMASKED_VENDOR_WEBGL) + "~" + e.getParameter(t.UNMASKED_RENDERER_WEBGL);
        } catch (e) {
          return null;
        }
      },
      getAdBlock: function getAdBlock() {
        var e = document.createElement("div");
        e.innerHTML = "&nbsp;", e.className = "adsbox";
        var t = !1;

        try {
          document.body.appendChild(e), t = 0 === document.getElementsByClassName("adsbox")[0].offsetHeight, document.body.removeChild(e);
        } catch (e) {
          t = !1;
        }

        return t;
      },
      getHasLiedLanguages: function getHasLiedLanguages() {
        if (void 0 !== navigator.languages) try {
          if (navigator.languages[0].substr(0, 2) !== navigator.language.substr(0, 2)) return !0;
        } catch (e) {
          return !0;
        }
        return !1;
      },
      getHasLiedResolution: function getHasLiedResolution() {
        return window.screen.width < window.screen.availWidth || window.screen.height < window.screen.availHeight;
      },
      getHasLiedOs: function getHasLiedOs() {
        var e,
            t = navigator.userAgent.toLowerCase(),
            n = navigator.oscpu,
            r = navigator.platform.toLowerCase();
        if (e = t.indexOf("windows phone") >= 0 ? "Windows Phone" : t.indexOf("win") >= 0 ? "Windows" : t.indexOf("android") >= 0 ? "Android" : t.indexOf("linux") >= 0 ? "Linux" : t.indexOf("iphone") >= 0 || t.indexOf("ipad") >= 0 ? "iOS" : t.indexOf("mac") >= 0 ? "Mac" : "Other", ("ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0) && "Windows Phone" !== e && "Android" !== e && "iOS" !== e && "Other" !== e) return !0;

        if (void 0 !== n) {
          if ((n = n.toLowerCase()).indexOf("win") >= 0 && "Windows" !== e && "Windows Phone" !== e) return !0;
          if (n.indexOf("linux") >= 0 && "Linux" !== e && "Android" !== e) return !0;
          if (n.indexOf("mac") >= 0 && "Mac" !== e && "iOS" !== e) return !0;
          if ((-1 === n.indexOf("win") && -1 === n.indexOf("linux") && -1 === n.indexOf("mac")) != ("Other" === e)) return !0;
        }

        return r.indexOf("win") >= 0 && "Windows" !== e && "Windows Phone" !== e || (r.indexOf("linux") >= 0 || r.indexOf("android") >= 0 || r.indexOf("pike") >= 0) && "Linux" !== e && "Android" !== e || (r.indexOf("mac") >= 0 || r.indexOf("ipad") >= 0 || r.indexOf("ipod") >= 0 || r.indexOf("iphone") >= 0) && "Mac" !== e && "iOS" !== e || (-1 === r.indexOf("win") && -1 === r.indexOf("linux") && -1 === r.indexOf("mac")) != ("Other" === e) || void 0 === navigator.plugins && "Windows" !== e && "Windows Phone" !== e;
      },
      getHasLiedBrowser: function getHasLiedBrowser() {
        var e,
            t = navigator.userAgent.toLowerCase(),
            n = navigator.productSub;
        if (("Chrome" == (e = t.indexOf("firefox") >= 0 ? "Firefox" : t.indexOf("opera") >= 0 || t.indexOf("opr") >= 0 ? "Opera" : t.indexOf("chrome") >= 0 ? "Chrome" : t.indexOf("safari") >= 0 ? "Safari" : t.indexOf("trident") >= 0 ? "Internet Explorer" : "Other") || "Safari" === e || "Opera" === e) && "20030107" !== n) return !0;
        var r,
            i = eval.toString().length;
        if (37 === i && "Safari" !== e && "Firefox" !== e && "Other" !== e) return !0;
        if (39 === i && "Internet Explorer" !== e && "Other" !== e) return !0;
        if (33 === i && "Chrome" !== e && "Opera" !== e && "Other" !== e) return !0;

        try {
          throw "a";
        } catch (e) {
          try {
            e.toSource(), r = !0;
          } catch (e) {
            r = !1;
          }
        }

        return !(!r || "Firefox" === e || "Other" === e);
      },
      isCanvasSupported: function isCanvasSupported() {
        var e = document.createElement("canvas");
        return !(!e.getContext || !e.getContext("2d"));
      },
      isWebGlSupported: function isWebGlSupported() {
        if (!this.isCanvasSupported()) return !1;
        var e = this.getWebglCanvas();
        return !!window.WebGLRenderingContext && !!e;
      },
      isIE: function isIE() {
        return "Microsoft Internet Explorer" === navigator.appName || !("Netscape" !== navigator.appName || !/Trident/.test(navigator.userAgent));
      },
      hasSwfObjectLoaded: function hasSwfObjectLoaded() {
        return void 0 !== window.swfobject;
      },
      hasMinFlashInstalled: function hasMinFlashInstalled() {
        return window.swfobject.hasFlashPlayerVersion("9.0.0");
      },
      addFlashDivNode: function addFlashDivNode() {
        var e = document.createElement("div");
        e.setAttribute("id", this.options.swfContainerId), document.body.appendChild(e);
      },
      loadSwfAndDetectFonts: function loadSwfAndDetectFonts(e) {
        var t = "___fp_swf_loaded";

        window[t] = function (t) {
          e(t);
        };

        var n = this.options.swfContainerId;
        this.addFlashDivNode();
        var r = {
          onReady: t
        };
        window.swfobject.embedSWF(this.options.swfPath, n, "1", "1", "9.0.0", !1, r, {
          allowScriptAccess: "always",
          menu: "false"
        }, {});
      },
      getWebglCanvas: function getWebglCanvas() {
        var e = document.createElement("canvas"),
            t = null;

        try {
          t = e.getContext("webgl") || e.getContext("experimental-webgl");
        } catch (e) {}

        return t || (t = null), t;
      },
      each: function each(e, t, n) {
        if (null !== e) if (this.nativeForEach && e.forEach === this.nativeForEach) e.forEach(t, n);else if (e.length === +e.length) {
          for (var r = 0, i = e.length; r < i; r++) {
            if (t.call(n, e[r], r, e) === {}) return;
          }
        } else for (var o in e) {
          if (e.hasOwnProperty(o) && t.call(n, e[o], o, e) === {}) return;
        }
      },
      map: function map(e, t, n) {
        var r = [];
        return null == e ? r : this.nativeMap && e.map === this.nativeMap ? e.map(t, n) : (this.each(e, function (e, i, o) {
          r[r.length] = t.call(n, e, i, o);
        }), r);
      },
      x64Add: function x64Add(e, t) {
        e = [e[0] >>> 16, 65535 & e[0], e[1] >>> 16, 65535 & e[1]], t = [t[0] >>> 16, 65535 & t[0], t[1] >>> 16, 65535 & t[1]];
        var n = [0, 0, 0, 0];
        return n[3] += e[3] + t[3], n[2] += n[3] >>> 16, n[3] &= 65535, n[2] += e[2] + t[2], n[1] += n[2] >>> 16, n[2] &= 65535, n[1] += e[1] + t[1], n[0] += n[1] >>> 16, n[1] &= 65535, n[0] += e[0] + t[0], n[0] &= 65535, [n[0] << 16 | n[1], n[2] << 16 | n[3]];
      },
      x64Multiply: function x64Multiply(e, t) {
        e = [e[0] >>> 16, 65535 & e[0], e[1] >>> 16, 65535 & e[1]], t = [t[0] >>> 16, 65535 & t[0], t[1] >>> 16, 65535 & t[1]];
        var n = [0, 0, 0, 0];
        return n[3] += e[3] * t[3], n[2] += n[3] >>> 16, n[3] &= 65535, n[2] += e[2] * t[3], n[1] += n[2] >>> 16, n[2] &= 65535, n[2] += e[3] * t[2], n[1] += n[2] >>> 16, n[2] &= 65535, n[1] += e[1] * t[3], n[0] += n[1] >>> 16, n[1] &= 65535, n[1] += e[2] * t[2], n[0] += n[1] >>> 16, n[1] &= 65535, n[1] += e[3] * t[1], n[0] += n[1] >>> 16, n[1] &= 65535, n[0] += e[0] * t[3] + e[1] * t[2] + e[2] * t[1] + e[3] * t[0], n[0] &= 65535, [n[0] << 16 | n[1], n[2] << 16 | n[3]];
      },
      x64Rotl: function x64Rotl(e, t) {
        return 32 == (t %= 64) ? [e[1], e[0]] : t < 32 ? [e[0] << t | e[1] >>> 32 - t, e[1] << t | e[0] >>> 32 - t] : (t -= 32, [e[1] << t | e[0] >>> 32 - t, e[0] << t | e[1] >>> 32 - t]);
      },
      x64LeftShift: function x64LeftShift(e, t) {
        return 0 == (t %= 64) ? e : t < 32 ? [e[0] << t | e[1] >>> 32 - t, e[1] << t] : [e[1] << t - 32, 0];
      },
      x64Xor: function x64Xor(e, t) {
        return [e[0] ^ t[0], e[1] ^ t[1]];
      },
      x64Fmix: function x64Fmix(e) {
        return e = this.x64Xor(e, [0, e[0] >>> 1]), e = this.x64Multiply(e, [4283543511, 3981806797]), e = this.x64Xor(e, [0, e[0] >>> 1]), e = this.x64Multiply(e, [3301882366, 444984403]), this.x64Xor(e, [0, e[0] >>> 1]);
      },
      x64hash128: function x64hash128(e, t) {
        t = t || 0;

        for (var n = (e = e || "").length % 16, r = e.length - n, i = [0, t], o = [0, t], a = [0, 0], s = [0, 0], c = [2277735313, 289559509], u = [1291169091, 658871167], l = 0; l < r; l += 16) {
          a = [255 & e.charCodeAt(l + 4) | (255 & e.charCodeAt(l + 5)) << 8 | (255 & e.charCodeAt(l + 6)) << 16 | (255 & e.charCodeAt(l + 7)) << 24, 255 & e.charCodeAt(l) | (255 & e.charCodeAt(l + 1)) << 8 | (255 & e.charCodeAt(l + 2)) << 16 | (255 & e.charCodeAt(l + 3)) << 24], s = [255 & e.charCodeAt(l + 12) | (255 & e.charCodeAt(l + 13)) << 8 | (255 & e.charCodeAt(l + 14)) << 16 | (255 & e.charCodeAt(l + 15)) << 24, 255 & e.charCodeAt(l + 8) | (255 & e.charCodeAt(l + 9)) << 8 | (255 & e.charCodeAt(l + 10)) << 16 | (255 & e.charCodeAt(l + 11)) << 24], a = this.x64Multiply(a, c), a = this.x64Rotl(a, 31), a = this.x64Multiply(a, u), i = this.x64Xor(i, a), i = this.x64Rotl(i, 27), i = this.x64Add(i, o), i = this.x64Add(this.x64Multiply(i, [0, 5]), [0, 1390208809]), s = this.x64Multiply(s, u), s = this.x64Rotl(s, 33), s = this.x64Multiply(s, c), o = this.x64Xor(o, s), o = this.x64Rotl(o, 31), o = this.x64Add(o, i), o = this.x64Add(this.x64Multiply(o, [0, 5]), [0, 944331445]);
        }

        switch (a = [0, 0], s = [0, 0], n) {
          case 15:
            s = this.x64Xor(s, this.x64LeftShift([0, e.charCodeAt(l + 14)], 48));

          case 14:
            s = this.x64Xor(s, this.x64LeftShift([0, e.charCodeAt(l + 13)], 40));

          case 13:
            s = this.x64Xor(s, this.x64LeftShift([0, e.charCodeAt(l + 12)], 32));

          case 12:
            s = this.x64Xor(s, this.x64LeftShift([0, e.charCodeAt(l + 11)], 24));

          case 11:
            s = this.x64Xor(s, this.x64LeftShift([0, e.charCodeAt(l + 10)], 16));

          case 10:
            s = this.x64Xor(s, this.x64LeftShift([0, e.charCodeAt(l + 9)], 8));

          case 9:
            s = this.x64Xor(s, [0, e.charCodeAt(l + 8)]), s = this.x64Multiply(s, u), s = this.x64Rotl(s, 33), s = this.x64Multiply(s, c), o = this.x64Xor(o, s);

          case 8:
            a = this.x64Xor(a, this.x64LeftShift([0, e.charCodeAt(l + 7)], 56));

          case 7:
            a = this.x64Xor(a, this.x64LeftShift([0, e.charCodeAt(l + 6)], 48));

          case 6:
            a = this.x64Xor(a, this.x64LeftShift([0, e.charCodeAt(l + 5)], 40));

          case 5:
            a = this.x64Xor(a, this.x64LeftShift([0, e.charCodeAt(l + 4)], 32));

          case 4:
            a = this.x64Xor(a, this.x64LeftShift([0, e.charCodeAt(l + 3)], 24));

          case 3:
            a = this.x64Xor(a, this.x64LeftShift([0, e.charCodeAt(l + 2)], 16));

          case 2:
            a = this.x64Xor(a, this.x64LeftShift([0, e.charCodeAt(l + 1)], 8));

          case 1:
            a = this.x64Xor(a, [0, e.charCodeAt(l)]), a = this.x64Multiply(a, c), a = this.x64Rotl(a, 31), a = this.x64Multiply(a, u), i = this.x64Xor(i, a);
        }

        return i = this.x64Xor(i, [0, e.length]), o = this.x64Xor(o, [0, e.length]), i = this.x64Add(i, o), o = this.x64Add(o, i), i = this.x64Fmix(i), o = this.x64Fmix(o), i = this.x64Add(i, o), o = this.x64Add(o, i), ("00000000" + (i[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (i[1] >>> 0).toString(16)).slice(-8) + ("00000000" + (o[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (o[1] >>> 0).toString(16)).slice(-8);
      }
    }, e.VERSION = "1.8.0", e;
  })();

  var defaultUid = '5a096eec830f7876a48aac47';
  var bid = '';
  var uid = '';
  var pid = '';
  var auth = null;
  var limited = false;

  var sleep = function sleep(time) {
    return new Promise(function (rev) {
      setTimeout(rev, time);
    });
  };

  var testCookies =
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var res, data;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return getHash;

            case 2:
              _context.next = 4;
              return request$1('https://biz.caiyunapp.com/test_cookies', {
                cors: true,
                credentials: 'include',
                headers: {
                  'X-Authorization': "token ".concat(fetchInfo.data.cyweb_token)
                }
              });

            case 4:
              res = _context.sent;

              if (!(res.status === 'ok' && res.cookies.cy_user)) {
                _context.next = 10;
                break;
              }

              data = JSON.parse(decodeURIComponent(res.cookies.cy_user));
              uid = data._id || defaultUid;
              _context.next = 11;
              break;

            case 10:
              return _context.abrupt("return", false);

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function testCookies() {
      return _ref.apply(this, arguments);
    };
  }();

  var getAuth = function getAuth() {
    if (!auth) {
      auth = new Promise(function (rev, rej) {
        testCookies().then(
        /*#__PURE__*/
        _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee2() {
          var count;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  if (!(!uid && !bid)) {
                    _context2.next = 10;
                    break;
                  }

                  new BrowserId().get(function (id) {
                    return bid = id;
                  });
                  count = 5;

                case 3:
                  if (!(!bid || --count > 0)) {
                    _context2.next = 8;
                    break;
                  }

                  _context2.next = 6;
                  return sleep(300);

                case 6:
                  _context2.next = 3;
                  break;

                case 8:
                  if (bid) {
                    _context2.next = 10;
                    break;
                  }

                  throw new Error('timeout: get browser id ');

                case 10:
                  return _context2.abrupt("return", request$1('https://api.interpreter.caiyunai.com/v1/page/auth', {
                    cors: true,
                    method: 'POST',
                    headers: {
                      'X-Authorization': "token ".concat(fetchInfo.data.cyweb_token),
                      'Content-Type': 'application/json'
                    },
                    data: JSON.stringify({
                      browser_id: bid,
                      device_id: '',
                      os_type: 'web',
                      title: 'グランブルーファンタジー',
                      url: document.URL,
                      user_id: uid
                    })
                  }));

                case 11:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }))).then(function (res) {
          if (res.auth_type === -1 || !res.page_id) {
            limited = true;
          } else {
            pid = res.page_id;
          }
        }).then(rev).catch(rej);
      });
    }

    return auth;
  };

  var translator =
  /*#__PURE__*/
  function () {
    var _ref3 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(list) {
      var from,
          res,
          _args3 = arguments;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              from = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : 'ja';
              _context3.next = 3;
              return getAuth();

            case 3:
              _context3.next = 5;
              return auth;

            case 5:
              if (!limited) {
                _context3.next = 7;
                break;
              }

              return _context3.abrupt("return", ['caiyunoutoflimit']);

            case 7:
              _context3.next = 9;
              return request$1('https://api.interpreter.caiyunai.com/v1/page/translator', {
                cors: true,
                method: 'POST',
                headers: {
                  'X-Authorization': "token ".concat(fetchInfo.data.cyweb_token),
                  'Content-Type': 'application/json'
                },
                data: JSON.stringify({
                  cached: true,
                  os_type: 'web',
                  page_id: pid,
                  replaced: true,
                  request_id: bid || uid,
                  source: list,
                  trans_type: "".concat(from, "2zh"),
                  url: document.URL
                })
              });

            case 9:
              res = _context3.sent;

              if (!(res && res.target)) {
                _context3.next = 12;
                break;
              }

              return _context3.abrupt("return", res.target.map(function (item) {
                return item.target;
              }));

            case 12:
              return _context3.abrupt("return", []);

            case 13:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function translator(_x) {
      return _ref3.apply(this, arguments);
    };
  }();

  var joinBr = function joinBr(list, br, transArr) {
    br.forEach(function (count) {
      var i = count;
      var str = '';

      while (i >= 0) {
        i--;

        var _str = list.shift();

        if (_str) {
          str += _str + '\n';
        }
      }

      if (str) {
        transArr.push(str.slice(0, str.length - 1));
      }
    });
  };

  var getTransResult = function getTransResult(data) {
    if (data[0] && data[0].length) {
      var result = data[0].map(function (item) {
        return item[0];
      });
      return result.join('').split('\n');
    }

    return [];
  };

  var trim$1 = function trim(str) {
    if (!str) return '';

    var _str = str.replace(/[\u0020]+$/g, '');

    return _str.replace(/^[\u0020]+/g, '');
  };

  var fixWrap = function fixWrap(str) {
    return trim$1(str).replace(/\r/g, '\n').replace(/\n{2,}/g, '\n');
  };

  var joinText = function joinText(list) {
    var br = [];

    var _list = list.map(function (text) {
      return removeHtmlTag(fixWrap(text));
    });

    _list.forEach(function (text) {
      var count = _toConsumableArray(text).filter(function (l) {
        return l === '\n';
      }).length;

      br.push(count);
    });

    var query = _list.join('\n');

    return [query, br];
  };

  var splitText = function splitText(text) {
    var WORDS_LIMIT = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4000;
    var strTemp = '';
    var arr = [];
    var count = 0;
    text.split('\n').forEach(function (txt) {
      strTemp += txt;
      count += new Blob([txt]).size;

      if (count > WORDS_LIMIT) {
        arr.push(strTemp);
        count = 0;
        strTemp = '';
      } else {
        strTemp += '\n';
      }
    });

    if (strTemp) {
      arr.push(strTemp.replace(/\n$/, ''));
    }

    return arr;
  };

  var googleApi =
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(keyword) {
      var from,
          query,
          data,
          res,
          _args = arguments;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              from = _args.length > 1 && _args[1] !== undefined ? _args[1] : 'ja';
              query = new urlSearchParams_node({
                client: 'gtx',
                sl: from,
                tl: 'zh-CN',
                hl: 'zh-CN',
                ie: 'UTF-8',
                oe: 'UTF-8'
              });
              query = query.toString();
              ['at', 'bd', 'ex', 'ld', 'md', 'qca', 'rw', 'rm', 'ss', 't'].forEach(function (item) {
                query += "&dt=".concat(item);
              });
              data = new urlSearchParams_node({
                q: keyword
              });
              _context.next = 7;
              return request$1("https://translate.google.cn/translate_a/single?".concat(query), {
                data: data.toString(),
                method: 'POST',
                headers: {
                  'accept': '*/*',
                  'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
                  'referer': 'https://translate.google.cn',
                  'origin': 'https://translate.google.cn'
                }
              });

            case 7:
              res = _context.sent;
              return _context.abrupt("return", getTransResult(res));

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function googleApi(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var googleTrans =
  /*#__PURE__*/
  function () {
    var _ref3 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(source) {
      var from,
          _joinText,
          _joinText2,
          query,
          br,
          textArr,
          result,
          list,
          transArr,
          _args3 = arguments;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              from = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : 'ja';
              _context3.prev = 1;
              _joinText = joinText(source), _joinText2 = _slicedToArray(_joinText, 2), query = _joinText2[0], br = _joinText2[1];
              textArr = splitText(query);
              _context3.next = 6;
              return Promise.all(textArr.map(function (query) {
                return googleApi(query, from);
              }));

            case 6:
              result = _context3.sent;
              list = result.reduce(function (a, b) {
                return a.concat(b);
              });
              transArr = [];
              joinBr(list, br, transArr);
              return _context3.abrupt("return", transArr);

            case 13:
              _context3.prev = 13;
              _context3.t0 = _context3["catch"](1);
              console.log(_context3.t0);
              return _context3.abrupt("return", []);

            case 17:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[1, 13]]);
    }));

    return function googleTrans(_x3) {
      return _ref3.apply(this, arguments);
    };
  }();

  var caiyunTrans =
  /*#__PURE__*/
  function () {
    var _ref5 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5(source, from) {
      var _joinText5, _joinText6, query, br, textArr, result, list, transArr;

      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _joinText5 = joinText(source), _joinText6 = _slicedToArray(_joinText5, 2), query = _joinText6[0], br = _joinText6[1];
              textArr = splitText(query);
              _context5.next = 5;
              return Promise.all(textArr.map(function (query) {
                return translator(query.split('\n'), from);
              }));

            case 5:
              result = _context5.sent;
              list = result.reduce(function (a, b) {
                return a.concat(b);
              });
              transArr = [];
              joinBr(list, br, transArr);
              return _context5.abrupt("return", transArr);

            case 12:
              _context5.prev = 12;
              _context5.t0 = _context5["catch"](0);
              console.log(_context5.t0);
              return _context5.abrupt("return", []);

            case 16:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 12]]);
    }));

    return function caiyunTrans(_x5, _x6) {
      return _ref5.apply(this, arguments);
    };
  }();

  function transApi () {
    return _ref6.apply(this, arguments);
  }

  function _ref6() {
    _ref6 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6() {
      var _args6 = arguments;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              if (!(config.transApi === 'caiyun')) {
                _context6.next = 4;
                break;
              }

              return _context6.abrupt("return", caiyunTrans.apply(void 0, _args6));

            case 4:
              if (!(config.transApi === 'google')) {
                _context6.next = 6;
                break;
              }

              return _context6.abrupt("return", googleTrans.apply(void 0, _args6));

            case 6:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));
    return _ref6.apply(this, arguments);
  }

  var insertCSS$1 = function insertCSS(fontValue) {
    var style = document.createElement('style');
    style.innerHTML = ".prt-scene-comment :not(.blhxfy-origin-text), .prt-pop-synopsis, .prt-log-display, .btn-select-baloon {\n    font-family: ".concat(fontValue, ", nickname_scene, \"FOT-\u30CB\u30E5\u30FC\u30B7\u30CD\u30DEA Std D\", \"Average Sans\", sans-serif !important;\n  }");
    document.head.appendChild(style);
  };

  var setBold = function setBold() {
    var style = document.createElement('style');
    style.innerHTML = ".prt-scene-comment, .prt-log-display, .btn-select-baloon {\n    font-weight: bold;\n  }";
    document.head.appendChild(style);
  };

  var scenarioFont = function scenarioFont() {
    if (!config.font) {
      if (Game.ua.os.name === 'Windows') {
        insertCSS$1('none');
      } else {
        insertCSS$1('none');
      }
    } else if (config.font !== 'none') {
      insertCSS$1(config.font);
    }

    if (config.fontBold) setBold();
  };

  var txtKeys = ['chapter_name', 'synopsis', 'detail', 'sel1_txt', 'sel2_txt', 'sel3_txt', 'sel4_txt', 'sel5_txt', 'sel6_txt'];
  var scenarioCache = {
    data: null,
    name: '',
    originName: '',
    hasTrans: false,
    hasAutoTrans: false,
    csv: '',
    nameMap: null,
    transMap: null
  };

  var getFilename = function getFilename(pathname) {
    var rgs = pathname.match(/([^\/\\]+)$/);

    if (rgs && rgs[1]) {
      return rgs[1];
    }

    return pathname;
  };

  var collectTxt = function collectTxt(data) {
    var txtList = [];
    var infoList = [];

    var getTxt = function getTxt(obj, key, index) {
      var txt = obj[key];

      if (txt) {
        txtList.push(txt.replace(/\n/g, '').trim());
        infoList.push({
          id: obj.id,
          type: key,
          index: index
        });
      }
    };

    data.forEach(function (item, index) {
      txtKeys.forEach(function (key) {
        return getTxt(item, key, index);
      });
    });
    return {
      txtList: txtList,
      infoList: infoList
    };
  };

  var getStartIndex = function getStartIndex(data) {
    var findStart = function findStart(item, index) {
      if (!item) return false;

      if (item.detail) {
        return index;
      } else if (item.next) {
        var next = item.next | 0 || -1;
        return findStart(data[next], next);
      } else {
        return findStart(data[index + 1], index + 1);
      }
    };

    return findStart(data[0], 0);
  };

  var transMulti =
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(list, nameMap, nounMap, nounFixMap, caiyunPrefixMap) {
      var userName, lang, _list, transList, fixedList;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              userName = config.userName;
              lang = Game.lang;
              _list = list.map(function (txt) {
                if (config.transApi === 'google') {
                  if (lang === 'en') {
                    txt = replaceWords(txt, nameMap, lang);
                  }

                  txt = replaceWords(txt, nounMap, lang);
                } else if (config.transApi === 'caiyun') {
                  txt = replaceWords(txt, caiyunPrefixMap, lang);
                }

                if (userName) {
                  var _lang = lang;
                  if (!/^\w+$/.test(userName)) _lang = 'unknown';

                  if (lang === 'en') {
                    txt = replaceWords(txt, new Map([[userName, config.defaultEnName]]), _lang);
                  } else if (config.transApi !== 'google') {
                    txt = replaceWords(txt, new Map([[userName, config.defaultName]]), _lang);
                  }
                }

                return txt;
              });
              _context.next = 5;
              return transApi(_list, lang);

            case 5:
              transList = _context.sent;

              if (!(transList[0] === 'caiyunoutoflimit')) {
                _context.next = 8;
                break;
              }

              return _context.abrupt("return", transList);

            case 8:
              fixedList = transList.map(function (txt) {
                var _str = txt;

                if (_str) {
                  _str = _str.replace(/\n/g, '<br>');
                  var _iteratorNormalCompletion = true;
                  var _didIteratorError = false;
                  var _iteratorError = undefined;

                  try {
                    for (var _iterator = nounFixMap[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                      var _step$value = _slicedToArray(_step.value, 2),
                          text = _step$value[0],
                          fix = _step$value[1];

                      _str = _str.replace(new RegExp(text, 'g'), fix);
                    }
                  } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                  } finally {
                    try {
                      if (!_iteratorNormalCompletion && _iterator.return != null) {
                        _iterator.return();
                      }
                    } finally {
                      if (_didIteratorError) {
                        throw _iteratorError;
                      }
                    }
                  }

                  if (config.displayName || userName) {
                    var name = config.displayName || userName;

                    if (lang === 'en') {
                      _str = _str.replace(new RegExp("".concat(config.defaultEnName), 'g'), name);
                    }

                    _str = _str.replace(new RegExp("".concat(config.defaultName, "(\u5148\u751F|\u5C0F\u59D0)?"), 'g'), name);
                  }
                }

                return _str;
              });
              return _context.abrupt("return", fixedList);

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function transMulti(_x, _x2, _x3, _x4, _x5) {
      return _ref.apply(this, arguments);
    };
  }();

  var getScenario =
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(name) {
      var csv, scenarioData, pathname, list, transMap;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              csv = getPreviewCsv(name);

              if (csv) {
                _context2.next = 12;
                break;
              }

              _context2.next = 4;
              return fetchWithHash('/blhxfy/data/scenario.json');

            case 4:
              scenarioData = _context2.sent;
              pathname = scenarioData[name];

              if (pathname) {
                _context2.next = 8;
                break;
              }

              return _context2.abrupt("return", {
                transMap: null,
                csv: ''
              });

            case 8:
              scenarioCache.originName = getFilename(pathname);
              _context2.next = 11;
              return fetchWithHash("/blhxfy/data/scenario/".concat(pathname));

            case 11:
              csv = _context2.sent;

            case 12:
              list = parseCsv(csv);
              transMap = new Map();
              list.forEach(function (item) {
                if (item.id) {
                  var idArr = item.id.split('-');
                  var id = idArr[0];
                  var type = idArr[1] || 'detail';
                  var obj = transMap.get(id) || {};
                  obj[type] = item.trans ? filter(item.trans.replace(new RegExp(config.defaultName, 'g'), config.displayName || config.userName)) : false;

                  if (item.trans) {
                    var rep = new RegExp(config.defaultName, 'g');
                    var uname = config.displayName || config.userName;
                    var str = filter(item.trans.replace(rep, uname));
                    obj[type] = str.replace(/<span\sclass="nickname"><\/span>/g, "<span class='nickname'></span>");
                  }

                  obj["".concat(type, "-origin")] = item.trans;
                  transMap.set(id, obj);
                }
              });
              return _context2.abrupt("return", {
                transMap: transMap,
                csv: csv
              });

            case 16:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function getScenario(_x6) {
      return _ref2.apply(this, arguments);
    };
  }();

  var getNameTrans = function getNameTrans(name, map, scenarioName) {
    var item = map.get(name);

    if (item) {
      var existScenario = '';

      if (item.scenarios.length) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = item.scenarios[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var sName = _step2.value;

            if (scenarioName.indexOf(sName) !== -1) {
              existScenario = sName;
              break;
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }

      var result = {
        trans: item.trans,
        noun: item.noun
      };

      if (existScenario) {
        result.trans = item[existScenario].trans;
        result.noun = item[existScenario].noun;
      }

      return result.trans;
    }

    return null;
  };

  var collectNameHtml = function collectNameHtml(str) {
    if (!str) return str;
    var name = str;
    var html = '';
    var rgs = name.match(/<[^>]+>([^<]*)<\/[^>]+>/);

    if (rgs && rgs[1]) {
      name = rgs[1];
      html = str.replace(name, '$name');
    }

    return {
      name: name,
      html: html
    };
  };

  var replaceChar = function replaceChar(key, item, map, scenarioName) {
    var nameStr = item[key] ? item[key].trim() : '';

    var _collectNameHtml = collectNameHtml(nameStr),
        name = _collectNameHtml.name,
        html = _collectNameHtml.html;

    if (name && name !== 'null' && name !== '???' && name !== '？？？') {
      var trans = getNameTrans(name, map, scenarioName);
      var _name = name;

      if (/\s?[\?？0-9０-９]{1,2}$/.test(name)) {
        // name with number or symbol
        var nameRst = name.match(/(.+?)\s?([\?？0-9０-９]{1,2})$/);

        var _trans = getNameTrans(nameRst[1], map, scenarioName);

        _name = nameRst[1];
        if (_trans) trans = "".concat(_trans).concat(nameRst[2]);
      } else if (/'s\sVoice$/.test(name)) {
        var nmKey = name.slice(0, name.length - 8);

        var _trans2 = getNameTrans(nmKey, map, scenarioName);

        if (_trans2) trans = "".concat(_trans2, "\u7684\u58F0\u97F3");
      } else if (/の声$/.test(name)) {
        var _nmKey = name.slice(0, name.length - 2);

        var _trans3 = getNameTrans(_nmKey, map, scenarioName);

        if (_trans3) trans = "".concat(_trans3, "\u7684\u58F0\u97F3");
      } else if (!trans && /・/.test(name)) {
        var arr = _name.split('・');

        trans = arr.map(function (nm) {
          var rst = getNameTrans(nm, map, scenarioName);
          return rst || nm;
        }).join('・');
      } else if (!trans && /\band\b/i.test(name)) {
        var _arr = _name.split(' and ');

        trans = _arr.map(function (nm) {
          var rst = getNameTrans(nm, map, scenarioName);
          return rst || nm;
        }).join('・');
      }

      if (trans) {
        if (html) {
          trans = html.replace('$name', trans);
        }

        item[key] = trans;
      } else if (trans !== '') {
        return name;
      }
    }
  };

  var getUsernameFromTutorial = function getUsernameFromTutorial(data) {
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = data[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var item = _step3.value;
        var id = parseInt(item.id);

        if (id === 25 || id === 24) {
          if (item.charcter1_name) {
            config.userName = item.charcter1_name;
            localStorage.setItem('blhxfy:name', config.userName);
          }
        }
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
          _iterator3.return();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }
  };

  var transStart =
  /*#__PURE__*/
  function () {
    var _ref3 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(data, pathname) {
      var pathRst, sNameTemp, rst, scenarioName, _ref4, transMap, csv, nameData, nameMap, _ref5, nounMap, nounFixMap, caiyunPrefixMap, _collectTxt, txtList, infoList, startIndex, transList, transNotice, transApiName, apiData;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              pathRst = pathname.match(/\/[^/]*?scenario.*?\/(scene[^\/]+)\/?/);

              if (!(!pathRst || !pathRst[1])) {
                _context3.next = 3;
                break;
              }

              return _context3.abrupt("return", data);

            case 3:
              sNameTemp = pathRst[1];

              if (!(pathRst[1].includes('birthday') || pathname.includes('season_event'))) {
                _context3.next = 9;
                break;
              }

              rst = pathname.match(/\/[^/]*?scenario.*?\/(scene.+)$/);

              if (!(!rst || !rst[1])) {
                _context3.next = 8;
                break;
              }

              return _context3.abrupt("return", data);

            case 8:
              sNameTemp = rst[1].replace(/\//g, '_');

            case 9:
              if (pathname.includes('scene_tutorial02')) {
                getUsernameFromTutorial(data);
              }

              insertToolHtml();
              autoDownloadCsv();
              scenarioName = sNameTemp;
              scenarioCache.data = cloneDeep_1(data);
              scenarioCache.name = scenarioName;
              scenarioCache.hasTrans = false;
              scenarioCache.hasAutoTrans = false;
              scenarioCache.transMap = null;
              scenarioCache.originName = '';
              _context3.next = 21;
              return getScenario(scenarioName);

            case 21:
              _ref4 = _context3.sent;
              transMap = _ref4.transMap;
              csv = _ref4.csv;
              _context3.next = 26;
              return getNameData();

            case 26:
              nameData = _context3.sent;
              nameMap = Game.lang !== 'ja' ? nameData['enNameMap'] : nameData['jpNameMap'];
              scenarioCache.nameMap = nameMap;

              if (transMap) {
                _context3.next = 53;
                break;
              }

              if (!(config.transJa && Game.lang === 'ja' || config.transEn && Game.lang === 'en')) {
                _context3.next = 50;
                break;
              }

              _context3.next = 33;
              return getNounData();

            case 33:
              _ref5 = _context3.sent;
              nounMap = _ref5.nounMap;
              nounFixMap = _ref5.nounFixMap;
              caiyunPrefixMap = _ref5.caiyunPrefixMap;
              transMap = new Map();
              _collectTxt = collectTxt(data), txtList = _collectTxt.txtList, infoList = _collectTxt.infoList;
              startIndex = getStartIndex(data);
              _context3.next = 42;
              return transMulti(txtList, nameMap, nounMap, nounFixMap, caiyunPrefixMap);

            case 42:
              transList = _context3.sent;
              transNotice = false;
              transApiName = {
                google: ['Google翻译', 'https://translate.google.cn'],
                baidu: ['百度翻译', 'https://fanyi.baidu.com/'],
                caiyun: ['彩云小译', 'https://fanyi.caiyunapp.com/']
              };
              apiData = transApiName[config.transApi];
              infoList.forEach(function (info, index) {
                var obj = transMap.get(info.id) || {};
                obj[info.type] = transList[index] || '';

                if (!transNotice && info.index === startIndex && info.type === 'detail' && transList.length > 0) {
                  if (transList[0] === 'caiyunoutoflimit') {
                    obj[info.type] = "<span style=\"color:#fd8484;font-size:10px;\">\u5F69\u4E91\u5C0F\u8BD1\u8D85\u51FA\u4F7F\u7528\u6B21\u6570\uFF0C\u8BF7\u5C1D\u8BD5\u767B\u5F55\u5F69\u4E91\u8D26\u53F7\u540E\u518D\u4F7F\u7528\u3002\u53EF\u4EE5\u901A\u8FC7\u70B9\u51FB\u53F3\u4E0A\u89D2Log\u6309\u94AE\uFF0C\u7136\u540E\u70B9\u51FB\u94FE\u63A5\u6253\u5F00\u767B\u5F55\u9875\u9762\uFF1A</span><a style=\"color:#62dccb;font-size:10px;\" href=\"http://www.caiyunapp.com/user/login/\" target=\"_blank\">\u5F69\u4E91\u7528\u6237\u767B\u5F55</a>\n              <span style=\"font-size:10px;color:#999\">\u5982\u679C\u767B\u5F55\u540E\u4ECD\u7136\u770B\u5230\u8FD9\u4E2A\u63D0\u793A\uFF0C\u5219\u53EF\u80FD\u9700\u8981\u6210\u4E3A\u5F69\u4E91\u4ED8\u8D39\u4F1A\u5458\u540E\u624D\u80FD\u7EE7\u7EED\u4F7F\u7528\u3002</span>";
                  } else {
                    obj[info.type] = "<a href=\"".concat(apiData[1], "\" target=\"_blank\" class=\"autotrans-hint-blhxfy ").concat(config.transApi, "-blhxfy\"> </a>").concat(obj[info.type]);
                  }

                  transNotice = true;
                }

                transMap.set(info.id, obj);
              });

              if (transList.length > 0) {
                scenarioCache.hasAutoTrans = true;
                scenarioCache.transMap = transMap;
              }

              _context3.next = 51;
              break;

            case 50:
              return _context3.abrupt("return", data);

            case 51:
              _context3.next = 56;
              break;

            case 53:
              scenarioCache.hasTrans = true;
              scenarioCache.csv = csv;
              scenarioCache.transMap = transMap;

            case 56:
              if (scenarioCache.hasAutoTrans || scenarioCache.hasTrans) {
                scenarioFont();
              }

              data.forEach(function (item) {
                var name1, name2, name3;
                name1 = replaceChar('charcter1_name', item, nameMap, scenarioName);
                name2 = replaceChar('charcter2_name', item, nameMap, scenarioName);
                name3 = replaceChar('charcter3_name', item, nameMap, scenarioName);
                var obj = transMap.get(item.id);
                if (!obj) return;
                txtKeys.forEach(function (key) {
                  if (obj[key]) {
                    if (key === 'detail' && config.originText) {
                      item[key] = "".concat(obj[key], "\n          <div class=\"blhxfy-origin-text\" data-text='").concat(removeHtmlTag(item[key], 0, true), "'> </div>");
                    } else {
                      item[key] = obj[key];
                    }
                  }
                });
              });
              return _context3.abrupt("return", data);

            case 59:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function transStart(_x7, _x8) {
      return _ref3.apply(this, arguments);
    };
  }();

  function transScenario (_x9, _x10) {
    return _ref6$1.apply(this, arguments);
  }

  function _ref6$1() {
    _ref6$1 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(data, pathname) {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (!Array.isArray(data)) {
                _context4.next = 6;
                break;
              }

              _context4.next = 3;
              return transStart(data, pathname);

            case 3:
              return _context4.abrupt("return", _context4.sent);

            case 6:
              if (!Array.isArray(data.scene_list)) {
                _context4.next = 16;
                break;
              }

              _context4.t0 = Object;
              _context4.t1 = data;
              _context4.next = 11;
              return transStart(data.scene_list, pathname);

            case 11:
              _context4.t2 = _context4.sent;
              _context4.t3 = {
                scene_list: _context4.t2
              };
              return _context4.abrupt("return", _context4.t0.assign.call(_context4.t0, _context4.t1, _context4.t3));

            case 16:
              if (!Array.isArray(data.scenario)) {
                _context4.next = 26;
                break;
              }

              _context4.t4 = Object;
              _context4.t5 = data;
              _context4.next = 21;
              return transStart(data.scenario, pathname);

            case 21:
              _context4.t6 = _context4.sent;
              _context4.t7 = {
                scenario: _context4.t6
              };
              return _context4.abrupt("return", _context4.t4.assign.call(_context4.t4, _context4.t5, _context4.t7));

            case 26:
              return _context4.abrupt("return", data);

            case 27:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));
    return _ref6$1.apply(this, arguments);
  }

  var data = null;

  var getLocalData =
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(type) {
      var hash, str;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!data) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return", data[type]);

            case 2:
              _context.next = 4;
              return getHash;

            case 4:
              hash = _context.sent;
              _context.prev = 5;
              str = sessionStorage.getItem('blhxfy:data');

              if (str) {
                _context.next = 9;
                break;
              }

              return _context.abrupt("return", false);

            case 9:
              data = JSON.parse(str);

              if (!(data.hash !== hash)) {
                _context.next = 15;
                break;
              }

              data = null;
              sessionStorage.removeItem('blhxfy:data');
              localStorage.removeItem('blhxfy:data');
              return _context.abrupt("return", false);

            case 15:
              return _context.abrupt("return", data[type]);

            case 18:
              _context.prev = 18;
              _context.t0 = _context["catch"](5);
              console.error(_context.t0);

            case 21:
              return _context.abrupt("return", false);

            case 22:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[5, 18]]);
    }));

    return function getLocalData(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var setLocalData = function setLocalData(type, value) {
    if (!data) data = {
      hash: config.hash
    };
    data[type] = value;
    var str = JSON.stringify(data);

    try {
      sessionStorage.setItem('blhxfy:data', str);
    } catch (err) {
      console.error(err);
    }
  };

  var langMsgMap = new Map();
  var loaded$1 = false;

  var getLangMsgData =
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var langMsg, list;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (loaded$1) {
                _context.next = 12;
                break;
              }

              _context.next = 3;
              return getLocalData('langMsg');

            case 3:
              langMsg = _context.sent;

              if (langMsg) {
                _context.next = 9;
                break;
              }

              _context.next = 7;
              return fetchWithHash('/blhxfy/data/lang-msg.csv');

            case 7:
              langMsg = _context.sent;
              setLocalData('langMsg', langMsg);

            case 9:
              list = parseCsv(langMsg);
              list.forEach(function (item) {
                var trans = filter(item.trans);

                if (trim(item.id)) {
                  item.en && langMsgMap.set("".concat(item.id).concat(item.en), {
                    trans: trans,
                    en: item.en,
                    jp: item.jp
                  });
                  item.jp && langMsgMap.set("".concat(item.jp), {
                    trans: trans,
                    en: item.en,
                    jp: item.jp
                  });
                }
              });
              loaded$1 = true;

            case 12:
              return _context.abrupt("return", langMsgMap);

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function getLangMsgData() {
      return _ref.apply(this, arguments);
    };
  }();

  function transLangMsg(_x, _x2) {
    return _transLangMsg.apply(this, arguments);
  }

  function _transLangMsg() {
    _transLangMsg = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(data, pathname) {
      var lang, msgs, langMsgMap, _i, _Object$keys, key, msg;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(!data.option || !data.option.langMsg)) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return", data);

            case 2:
              lang = Game.lang;
              msgs = data.option.langMsg;
              _context.next = 6;
              return getLangMsgData();

            case 6:
              langMsgMap = _context.sent;

              for (_i = 0, _Object$keys = Object.keys(msgs); _i < _Object$keys.length; _i++) {
                key = _Object$keys[_i];
                msg = langMsgMap.get("".concat(lang === 'ja' ? '' : key).concat(msgs[key].msg));

                if (msg && msg.trans) {
                  msgs[key].msg = msg.trans;
                }
              }

              return _context.abrupt("return", data);

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _transLangMsg.apply(this, arguments);
  }

  /**
   * Gets the timestamp of the number of milliseconds that have elapsed since
   * the Unix epoch (1 January 1970 00:00:00 UTC).
   *
   * @static
   * @memberOf _
   * @since 2.4.0
   * @category Date
   * @returns {number} Returns the timestamp.
   * @example
   *
   * _.defer(function(stamp) {
   *   console.log(_.now() - stamp);
   * }, _.now());
   * // => Logs the number of milliseconds it took for the deferred invocation.
   */
  var now = function() {
    return _root.Date.now();
  };

  var now_1 = now;

  /** `Object#toString` result references. */
  var symbolTag$2 = '[object Symbol]';

  /**
   * Checks if `value` is classified as a `Symbol` primitive or object.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
   * @example
   *
   * _.isSymbol(Symbol.iterator);
   * // => true
   *
   * _.isSymbol('abc');
   * // => false
   */
  function isSymbol(value) {
    return typeof value == 'symbol' ||
      (isObjectLike_1(value) && _baseGetTag(value) == symbolTag$2);
  }

  var isSymbol_1 = isSymbol;

  /** Used as references for various `Number` constants. */
  var NAN = 0 / 0;

  /** Used to match leading and trailing whitespace. */
  var reTrim = /^\s+|\s+$/g;

  /** Used to detect bad signed hexadecimal string values. */
  var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

  /** Used to detect binary string values. */
  var reIsBinary = /^0b[01]+$/i;

  /** Used to detect octal string values. */
  var reIsOctal = /^0o[0-7]+$/i;

  /** Built-in method references without a dependency on `root`. */
  var freeParseInt = parseInt;

  /**
   * Converts `value` to a number.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to process.
   * @returns {number} Returns the number.
   * @example
   *
   * _.toNumber(3.2);
   * // => 3.2
   *
   * _.toNumber(Number.MIN_VALUE);
   * // => 5e-324
   *
   * _.toNumber(Infinity);
   * // => Infinity
   *
   * _.toNumber('3.2');
   * // => 3.2
   */
  function toNumber(value) {
    if (typeof value == 'number') {
      return value;
    }
    if (isSymbol_1(value)) {
      return NAN;
    }
    if (isObject_1(value)) {
      var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
      value = isObject_1(other) ? (other + '') : other;
    }
    if (typeof value != 'string') {
      return value === 0 ? value : +value;
    }
    value = value.replace(reTrim, '');
    var isBinary = reIsBinary.test(value);
    return (isBinary || reIsOctal.test(value))
      ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
      : (reIsBadHex.test(value) ? NAN : +value);
  }

  var toNumber_1 = toNumber;

  /** Error message constants. */
  var FUNC_ERROR_TEXT = 'Expected a function';

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeMax = Math.max,
      nativeMin = Math.min;

  /**
   * Creates a debounced function that delays invoking `func` until after `wait`
   * milliseconds have elapsed since the last time the debounced function was
   * invoked. The debounced function comes with a `cancel` method to cancel
   * delayed `func` invocations and a `flush` method to immediately invoke them.
   * Provide `options` to indicate whether `func` should be invoked on the
   * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
   * with the last arguments provided to the debounced function. Subsequent
   * calls to the debounced function return the result of the last `func`
   * invocation.
   *
   * **Note:** If `leading` and `trailing` options are `true`, `func` is
   * invoked on the trailing edge of the timeout only if the debounced function
   * is invoked more than once during the `wait` timeout.
   *
   * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
   * until to the next tick, similar to `setTimeout` with a timeout of `0`.
   *
   * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
   * for details over the differences between `_.debounce` and `_.throttle`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Function
   * @param {Function} func The function to debounce.
   * @param {number} [wait=0] The number of milliseconds to delay.
   * @param {Object} [options={}] The options object.
   * @param {boolean} [options.leading=false]
   *  Specify invoking on the leading edge of the timeout.
   * @param {number} [options.maxWait]
   *  The maximum time `func` is allowed to be delayed before it's invoked.
   * @param {boolean} [options.trailing=true]
   *  Specify invoking on the trailing edge of the timeout.
   * @returns {Function} Returns the new debounced function.
   * @example
   *
   * // Avoid costly calculations while the window size is in flux.
   * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
   *
   * // Invoke `sendMail` when clicked, debouncing subsequent calls.
   * jQuery(element).on('click', _.debounce(sendMail, 300, {
   *   'leading': true,
   *   'trailing': false
   * }));
   *
   * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
   * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
   * var source = new EventSource('/stream');
   * jQuery(source).on('message', debounced);
   *
   * // Cancel the trailing debounced invocation.
   * jQuery(window).on('popstate', debounced.cancel);
   */
  function debounce(func, wait, options) {
    var lastArgs,
        lastThis,
        maxWait,
        result,
        timerId,
        lastCallTime,
        lastInvokeTime = 0,
        leading = false,
        maxing = false,
        trailing = true;

    if (typeof func != 'function') {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    wait = toNumber_1(wait) || 0;
    if (isObject_1(options)) {
      leading = !!options.leading;
      maxing = 'maxWait' in options;
      maxWait = maxing ? nativeMax(toNumber_1(options.maxWait) || 0, wait) : maxWait;
      trailing = 'trailing' in options ? !!options.trailing : trailing;
    }

    function invokeFunc(time) {
      var args = lastArgs,
          thisArg = lastThis;

      lastArgs = lastThis = undefined;
      lastInvokeTime = time;
      result = func.apply(thisArg, args);
      return result;
    }

    function leadingEdge(time) {
      // Reset any `maxWait` timer.
      lastInvokeTime = time;
      // Start the timer for the trailing edge.
      timerId = setTimeout(timerExpired, wait);
      // Invoke the leading edge.
      return leading ? invokeFunc(time) : result;
    }

    function remainingWait(time) {
      var timeSinceLastCall = time - lastCallTime,
          timeSinceLastInvoke = time - lastInvokeTime,
          timeWaiting = wait - timeSinceLastCall;

      return maxing
        ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
        : timeWaiting;
    }

    function shouldInvoke(time) {
      var timeSinceLastCall = time - lastCallTime,
          timeSinceLastInvoke = time - lastInvokeTime;

      // Either this is the first call, activity has stopped and we're at the
      // trailing edge, the system time has gone backwards and we're treating
      // it as the trailing edge, or we've hit the `maxWait` limit.
      return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
        (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
    }

    function timerExpired() {
      var time = now_1();
      if (shouldInvoke(time)) {
        return trailingEdge(time);
      }
      // Restart the timer.
      timerId = setTimeout(timerExpired, remainingWait(time));
    }

    function trailingEdge(time) {
      timerId = undefined;

      // Only invoke if we have `lastArgs` which means `func` has been
      // debounced at least once.
      if (trailing && lastArgs) {
        return invokeFunc(time);
      }
      lastArgs = lastThis = undefined;
      return result;
    }

    function cancel() {
      if (timerId !== undefined) {
        clearTimeout(timerId);
      }
      lastInvokeTime = 0;
      lastArgs = lastCallTime = lastThis = timerId = undefined;
    }

    function flush() {
      return timerId === undefined ? result : trailingEdge(now_1());
    }

    function debounced() {
      var time = now_1(),
          isInvoking = shouldInvoke(time);

      lastArgs = arguments;
      lastThis = this;
      lastCallTime = time;

      if (isInvoking) {
        if (timerId === undefined) {
          return leadingEdge(lastCallTime);
        }
        if (maxing) {
          // Handle invocations in a tight loop.
          clearTimeout(timerId);
          timerId = setTimeout(timerExpired, wait);
          return invokeFunc(lastCallTime);
        }
      }
      if (timerId === undefined) {
        timerId = setTimeout(timerExpired, wait);
      }
      return result;
    }
    debounced.cancel = cancel;
    debounced.flush = flush;
    return debounced;
  }

  var debounce_1 = debounce;

  var skillMap = new Map();
  var skillKeys = [['special_skill', 'special'], ['action_ability1', 'skill-1'], ['action_ability2', 'skill-2'], ['action_ability3', 'skill-3'], ['action_ability4', 'skill-4'], ['support_ability1', 'support-1'], ['support_ability2', 'support-2'], ['support_ability_of_npczenith', 'skill-lb']];
  var state = {
    status: 'init',
    cStatus: 'init',
    locSkMap: false,
    locASMap: false,
    skillMap: skillMap,
    skillKeys: skillKeys,
    skillData: null,
    commSkillMap: new Map(),
    autoTransCache: new Map(),
    nounMap: new Map(),
    nounRE: ''
  };

  var getCommSkillMap =
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var csvData, list, sortedList, nounArr;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(state.cStatus === 'loaded')) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return");

            case 2:
              _context.next = 4;
              return getLocalData('comm-skill');

            case 4:
              csvData = _context.sent;

              if (csvData) {
                _context.next = 10;
                break;
              }

              _context.next = 8;
              return fetchWithHash('/blhxfy/data/common-skill.csv');

            case 8:
              csvData = _context.sent;
              setLocalData('comm-skill', csvData);

            case 10:
              _context.next = 12;
              return parseCsv(csvData);

            case 12:
              list = _context.sent;
              sortedList = sortKeywords(list, 'comment');
              nounArr = [];
              sortedList.forEach(function (item) {
                if (item.comment && item.trans && item.type) {
                  var comment = trim(item.comment);
                  var trans = filter(item.trans);
                  var type = trim(item.type) || '1';

                  if (comment && trans) {
                    if (type === '4') {
                      state.nounMap.set(comment, trans);
                      nounArr.push(comment);
                    } else {
                      state.commSkillMap.set(comment, {
                        trans: trans,
                        type: type
                      });
                    }
                  }
                }
              });
              if (nounArr.length) state.nounRE = "(".concat(nounArr.join('|'), ")");
              state.cStatus = 'loaded';

            case 18:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function getCommSkillMap() {
      return _ref.apply(this, arguments);
    };
  }();

  var saveSkillMap =
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(skillMap) {
      var arr;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              arr = _toConsumableArray(skillMap).slice(-20);
              setLocalData('skill-npc', JSON.stringify(arr));

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function saveSkillMap(_x) {
      return _ref2.apply(this, arguments);
    };
  }();

  var getSkillMap =
  /*#__PURE__*/
  function () {
    var _ref3 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      var str, arr, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _step$value, key, item, _key;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return getLocalData('skill-npc');

            case 2:
              str = _context3.sent;
              _context3.prev = 3;
              arr = JSON.parse(str);
              state.skillMap = new Map(arr);
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context3.prev = 9;

              for (_iterator = state.skillMap[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                _step$value = _slicedToArray(_step.value, 2), key = _step$value[0], item = _step$value[1];

                for (_key in item) {
                  item[_key].name = filter(item[_key].name);
                  item[_key].detail = filter(item[_key].detail);
                }
              }

              _context3.next = 17;
              break;

            case 13:
              _context3.prev = 13;
              _context3.t0 = _context3["catch"](9);
              _didIteratorError = true;
              _iteratorError = _context3.t0;

            case 17:
              _context3.prev = 17;
              _context3.prev = 18;

              if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
              }

            case 20:
              _context3.prev = 20;

              if (!_didIteratorError) {
                _context3.next = 23;
                break;
              }

              throw _iteratorError;

            case 23:
              return _context3.finish(20);

            case 24:
              return _context3.finish(17);

            case 25:
              state.locSkMap = true;
              _context3.next = 30;
              break;

            case 28:
              _context3.prev = 28;
              _context3.t1 = _context3["catch"](3);

            case 30:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[3, 28], [9, 13, 17, 25], [18,, 20, 24]]);
    }));

    return function getSkillMap() {
      return _ref3.apply(this, arguments);
    };
  }();

  var saveAutoTrans = debounce_1(function () {
    var arr = _toConsumableArray(state.autoTransCache).slice(-200);

    setLocalData('auto-trans', JSON.stringify(arr));
  }, 500);

  var getAutoTrans =
  /*#__PURE__*/
  function () {
    var _ref4 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4() {
      var str, arr, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _step2$value, key, item;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return getLocalData('auto-trans');

            case 2:
              str = _context4.sent;
              _context4.prev = 3;
              arr = JSON.parse(str);
              state.autoTransCache = new Map(arr);
              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context4.prev = 9;

              for (_iterator2 = state.autoTransCache[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                _step2$value = _slicedToArray(_step2.value, 2), key = _step2$value[0], item = _step2$value[1];
                state.autoTransCache.set(key, filter(item));
              }

              _context4.next = 17;
              break;

            case 13:
              _context4.prev = 13;
              _context4.t0 = _context4["catch"](9);
              _didIteratorError2 = true;
              _iteratorError2 = _context4.t0;

            case 17:
              _context4.prev = 17;
              _context4.prev = 18;

              if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                _iterator2.return();
              }

            case 20:
              _context4.prev = 20;

              if (!_didIteratorError2) {
                _context4.next = 23;
                break;
              }

              throw _iteratorError2;

            case 23:
              return _context4.finish(20);

            case 24:
              return _context4.finish(17);

            case 25:
              state.locASMap = true;
              _context4.next = 30;
              break;

            case 28:
              _context4.prev = 28;
              _context4.t1 = _context4["catch"](3);

            case 30:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[3, 28], [9, 13, 17, 25], [18,, 20, 24]]);
    }));

    return function getAutoTrans() {
      return _ref4.apply(this, arguments);
    };
  }();

  var saveSkillPath =
  /*#__PURE__*/
  function () {
    var _ref5 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5(skillData) {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              setLocalData('skill-path', JSON.stringify(skillData));

            case 1:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    return function saveSkillPath(_x2) {
      return _ref5.apply(this, arguments);
    };
  }();

  var getSkillPath =
  /*#__PURE__*/
  function () {
    var _ref6 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6() {
      var str, data;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return getLocalData('skill-path');

            case 2:
              str = _context6.sent;

              try {
                data = JSON.parse(str);
                state.skillData = data;
              } catch (e) {}

            case 4:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    return function getSkillPath() {
      return _ref6.apply(this, arguments);
    };
  }();

  var setSkillMap = function setSkillMap(list) {
    var stable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var npcId, active, idArr;
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = list[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var row = _step3.value;

        if (row.id === 'npc') {
          idArr = row.detail.split('|');
        } else if (row.id === 'active') {
          if (row.name !== '0') {
            active = true;
          }
        }
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
          _iterator3.return();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }

    if (!idArr.length || !idArr[0]) return;
    npcId = idArr[1] || idArr[0];
    var skillData = {};
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
      for (var _iterator4 = list[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
        var _row = _step4.value;

        if (stable || active) {
          skillData[_row.id] = _row;
        }
      }
    } catch (err) {
      _didIteratorError4 = true;
      _iteratorError4 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
          _iterator4.return();
        }
      } finally {
        if (_didIteratorError4) {
          throw _iteratorError4;
        }
      }
    }

    state.skillMap.set(npcId, skillData);
    saveSkillMap(state.skillMap);
  };

  var getSkillData =
  /*#__PURE__*/
  function () {
    var _ref7 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee7(npcId) {
      var csvName, csvData, list;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              if (state.locSkMap) {
                _context7.next = 3;
                break;
              }

              _context7.next = 3;
              return getSkillMap();

            case 3:
              if (state.locASMap) {
                _context7.next = 6;
                break;
              }

              _context7.next = 6;
              return getAutoTrans();

            case 6:
              if (!state.skillMap.has(npcId)) {
                _context7.next = 8;
                break;
              }

              return _context7.abrupt("return", state);

            case 8:
              _context7.next = 10;
              return getSkillPath();

            case 10:
              if (state.skillData) {
                _context7.next = 15;
                break;
              }

              _context7.next = 13;
              return fetchWithHash('/blhxfy/data/skill.json');

            case 13:
              state.skillData = _context7.sent;
              saveSkillPath(state.skillData);

            case 15:
              csvName = state.skillData[npcId];

              if (!csvName) {
                _context7.next = 22;
                break;
              }

              _context7.next = 19;
              return fetchWithHash("/blhxfy/data/skill/".concat(csvName));

            case 19:
              csvData = _context7.sent;
              list = parseCsv(filter(csvData));
              setSkillMap(list);

            case 22:
              return _context7.abrupt("return", state);

            case 23:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }));

    return function getSkillData(_x3) {
      return _ref7.apply(this, arguments);
    };
  }();

  var getLocalSkillData = function getLocalSkillData(npcId) {
    var str = sessionStorage.getItem('blhxfy:skill-preview');

    if (str) {
      try {
        var data = JSON.parse(str);

        if (data.id === npcId) {
          var csv = filter(data.csv);
          var list = parseCsv(csv);
          list.forEach(function (item) {
            if (item.id === 'npc') {
              item.detail = npcId;
            }
          });
          setSkillMap(list);
          return state;
        }
      } catch (err) {
        console.error(err);
      }
    }

    return false;
  };

  function replaceTurn (str) {
    return str.replace('ターン', '回合').replace('turns', '回合').replace('turn', '回合').replace('Cooldown', '使用间隔').replace('使用間隔', '使用间隔').replace('初回召喚', '初次召唤').replace('後', '后');
  }

  var buffMap = {
    buff: new Map(),
    debuff: new Map()
  };
  var loaded$2 = false;

  var getData =
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(type) {
      var csv, list;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return getLocalData(type);

            case 2:
              csv = _context.sent;

              if (csv) {
                _context.next = 8;
                break;
              }

              _context.next = 6;
              return fetchWithHash("/blhxfy/data/".concat(type, ".csv"));

            case 6:
              csv = _context.sent;
              setLocalData(type, csv);

            case 8:
              list = parseCsv(csv);
              list.forEach(function (item) {
                var detail = trim(item.detail);
                var trans = filter(item.trans);

                if (detail && trans) {
                  buffMap[type].set(detail, trans);
                }
              });

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function getData(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var getBuffData =
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(type) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (loaded$2) {
                _context2.next = 6;
                break;
              }

              _context2.next = 3;
              return getData('buff');

            case 3:
              _context2.next = 5;
              return getData('debuff');

            case 5:
              loaded$2 = true;

            case 6:
              return _context2.abrupt("return", buffMap[type]);

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function getBuffData(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  var transBuff =
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(data) {
      var keys, _i, _keys, key, buffMap, k, item;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              keys = ['buff', 'debuff'];
              _i = 0, _keys = keys;

            case 2:
              if (!(_i < _keys.length)) {
                _context.next = 12;
                break;
              }

              key = _keys[_i];

              if (!data[key]) {
                _context.next = 9;
                break;
              }

              _context.next = 7;
              return getBuffData(key);

            case 7:
              buffMap = _context.sent;

              for (k in data[key]) {
                item = data[key][k];

                if (item.detail && buffMap.has(item.detail)) {
                  item.detail = buffMap.get(item.detail);
                }

                if (item.effect) item.effect = replaceTurn(item.effect);
              }

            case 9:
              _i++;
              _context.next = 2;
              break;

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function transBuff(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var elemtRE = '([光闇水火風土無全]|light|dark|water|wind|earth|fire|plain|all)';
  var elemtMap = {
    light: '光',
    '光': '光',
    dark: '暗',
    '闇': '暗',
    water: '水',
    '水': '水',
    wind: '风',
    '風': '风',
    earth: '土',
    '土': '土',
    fire: '火',
    '火': '火',
    plain: '无',
    '無': '无',
    all: '全',
    '全': '全'
  };
  var numRE = '(\\d{1,10}\\.?\\d{0,4}?)';
  var percentRE = '(\\d{1,10}\\.?\\d{0,4}?[%％])';

  var parseRegExp = function parseRegExp(str, nounRE) {
    return str.replace(/\(/g, '\\(').replace(/\)/g, '\\)').replace(/\$elemt/g, elemtRE).replace(/\$num/g, numRE).replace(/\$percent/g, percentRE).replace(/\$noun/g, nounRE);
  };

  var transSkill = function transSkill(comment, _ref) {
    var commSkillMap = _ref.commSkillMap,
        nounMap = _ref.nounMap,
        nounRE = _ref.nounRE,
        autoTransCache = _ref.autoTransCache;
    if (autoTransCache.has(comment)) return autoTransCache.get(comment);
    var result = comment;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      var _loop = function _loop() {
        var _step$value = _slicedToArray(_step.value, 2),
            key = _step$value[0],
            value = _step$value[1];

        if (!trim(key)) return "continue";
        var trans = value.trans,
            type = value.type;

        if (type === '1') {
          var re = new RegExp(parseRegExp(key, nounRE), 'gi');
          result = result.replace(re, function () {
            var _trans = trans;

            for (var _len = arguments.length, arr = new Array(_len), _key = 0; _key < _len; _key++) {
              arr[_key] = arguments[_key];
            }

            for (var i = 1; i < arr.length - 2; i++) {
              var eleKey = arr[i].toLowerCase();

              if (elemtMap[eleKey]) {
                _trans = _trans.replace("$".concat(i), elemtMap[eleKey]);
              } else if (nounMap.has(eleKey)) {
                _trans = _trans.replace("$".concat(i), nounMap.get(eleKey));
              } else {
                _trans = _trans.replace("$".concat(i), arr[i]);
              }
            }

            return _trans;
          });
        } else if (type === '2') {
          var res,
              i = 0;

          while (res !== result && i < 10) {
            res = result;
            result = result.replace(key, trans);
            i++;
          }
        } else if (type === '3') {
          result = result.replace("(".concat(key, ")"), "(".concat(trans, ")"));
        }
      };

      for (var _iterator = commSkillMap[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _ret = _loop();

        if (_ret === "continue") continue;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    autoTransCache.set(comment, result);
    saveAutoTrans();
    return result;
  };

  var parseBuff =
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(data) {
      var _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, item, key, ability;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context.prev = 3;
              _iterator2 = skillKeys[Symbol.iterator]();

            case 5:
              if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                _context.next = 21;
                break;
              }

              item = _step2.value;
              key = item[0];
              ability = data[key];

              if (ability) {
                _context.next = 15;
                break;
              }

              if (data.ability) {
                _context.next = 12;
                break;
              }

              return _context.abrupt("continue", 18);

            case 12:
              ability = data.ability[key];

              if (ability) {
                _context.next = 15;
                break;
              }

              return _context.abrupt("continue", 18);

            case 15:
              if (!ability.ability_detail) {
                _context.next = 18;
                break;
              }

              _context.next = 18;
              return transBuff(ability.ability_detail);

            case 18:
              _iteratorNormalCompletion2 = true;
              _context.next = 5;
              break;

            case 21:
              _context.next = 27;
              break;

            case 23:
              _context.prev = 23;
              _context.t0 = _context["catch"](3);
              _didIteratorError2 = true;
              _iteratorError2 = _context.t0;

            case 27:
              _context.prev = 27;
              _context.prev = 28;

              if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                _iterator2.return();
              }

            case 30:
              _context.prev = 30;

              if (!_didIteratorError2) {
                _context.next = 33;
                break;
              }

              throw _iteratorError2;

            case 33:
              return _context.finish(30);

            case 34:
              return _context.finish(27);

            case 35:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[3, 23, 27, 35], [28,, 30, 34]]);
    }));

    return function parseBuff(_x) {
      return _ref2.apply(this, arguments);
    };
  }();

  var previewSkill = function previewSkill(npcId) {
    $('#cnt-detail').off('click.blhxfy').on('click.blhxfy', '.prt-evolution-star>div:eq(1)', function () {
      var csv = window.prompt('粘贴要预览的技能翻译CSV文本');

      if (csv) {
        sessionStorage.setItem('blhxfy:skill-preview', JSON.stringify({
          id: npcId,
          csv: splitSingleLineSkill(csv)
        }));
        location.reload();
      }
    }).on('click.blhxfy', '.prt-evolution-star>div:eq(2)', function () {
      if (confirm('清除技能预览？')) {
        sessionStorage.removeItem('blhxfy:skill-preview');
        location.reload();
      }
    });
  };

  var parseSkill =
  /*#__PURE__*/
  function () {
    var _ref3 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(data, pathname) {
      var npcId, skillState, skillData, translated, keys, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, item, key1, key2, ability, _getPlusStr, _getPlusStr2, plus1, plus2, _trans4, trans, intro, _trans2, _intro, _trans3;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(Game.lang === 'en')) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt("return", data);

            case 2:
              if (!pathname.includes('/npc/npc/')) {
                _context2.next = 8;
                break;
              }

              if (!(!data.master || !data.master.id)) {
                _context2.next = 5;
                break;
              }

              return _context2.abrupt("return", data);

            case 5:
              npcId = "".concat(data.master.id);
              _context2.next = 12;
              break;

            case 8:
              if (!pathname.includes('/archive/npc_detail')) {
                _context2.next = 12;
                break;
              }

              if (data.id) {
                _context2.next = 11;
                break;
              }

              return _context2.abrupt("return", data);

            case 11:
              npcId = data.id;

            case 12:
              _context2.next = 14;
              return parseBuff(data);

            case 14:
              previewSkill(npcId);
              skillState = getLocalSkillData(npcId);

              if (skillState) {
                _context2.next = 20;
                break;
              }

              _context2.next = 19;
              return getSkillData(npcId);

            case 19:
              skillState = _context2.sent;

            case 20:
              skillData = skillState.skillMap.get(npcId);
              translated = new Map();
              keys = skillState.skillKeys;

              if (!skillData) {
                _context2.next = 72;
                break;
              }

              _iteratorNormalCompletion3 = true;
              _didIteratorError3 = false;
              _iteratorError3 = undefined;
              _context2.prev = 27;
              _iterator3 = keys[Symbol.iterator]();

            case 29:
              if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                _context2.next = 56;
                break;
              }

              item = _step3.value;
              key1 = item[0];
              key2 = item[1];
              ability = data[key1];

              if (ability) {
                _context2.next = 40;
                break;
              }

              if (data.ability) {
                _context2.next = 37;
                break;
              }

              return _context2.abrupt("continue", 53);

            case 37:
              ability = data.ability[key1];

              if (ability) {
                _context2.next = 40;
                break;
              }

              return _context2.abrupt("continue", 53);

            case 40:
              if (ability.recast_comment) {
                ability.recast_comment = replaceTurn(ability.recast_comment);
              }

              _getPlusStr = getPlusStr(ability.name), _getPlusStr2 = _slicedToArray(_getPlusStr, 2), plus1 = _getPlusStr2[0], plus2 = _getPlusStr2[1];
              _trans4 = skillData["skill-".concat(ability.name)];

              if (_trans4) {
                _context2.next = 51;
                break;
              }

              _trans4 = skillData["special-".concat(ability.name)];

              if (_trans4) {
                _context2.next = 51;
                break;
              }

              _trans4 = skillData[key2 + plus2];

              if (_trans4) {
                _context2.next = 51;
                break;
              }

              _trans4 = skillData[key2];

              if (_trans4) {
                _context2.next = 51;
                break;
              }

              return _context2.abrupt("continue", 53);

            case 51:
              if (_trans4.name) {
                ability.name = _trans4.name + plus1;
              }

              if (_trans4.detail) {
                ability.comment = _trans4.detail;
                translated.set(key1, true);
              }

            case 53:
              _iteratorNormalCompletion3 = true;
              _context2.next = 29;
              break;

            case 56:
              _context2.next = 62;
              break;

            case 58:
              _context2.prev = 58;
              _context2.t0 = _context2["catch"](27);
              _didIteratorError3 = true;
              _iteratorError3 = _context2.t0;

            case 62:
              _context2.prev = 62;
              _context2.prev = 63;

              if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
                _iterator3.return();
              }

            case 65:
              _context2.prev = 65;

              if (!_didIteratorError3) {
                _context2.next = 68;
                break;
              }

              throw _iteratorError3;

            case 68:
              return _context2.finish(65);

            case 69:
              return _context2.finish(62);

            case 70:
              if (data.master) {
                trans = skillData['npc'];

                if (trans && trans.name) {
                  data.master.name = trans.name;
                  intro = skillData['intro'];
                  if (intro && intro.name) data.master.evo_name = "[".concat(intro.name, "]").concat(trans.name);
                }
              } else if (data.name) {
                _trans2 = skillData['npc'];

                if (_trans2 && _trans2.name) {
                  data.name = _trans2.name;
                  _intro = skillData['intro'];
                  if (_intro && _intro.name) data.evo_name = "[".concat(_intro.name, "]").concat(_trans2.name);
                }
              }

              if (data.comment) {
                _trans3 = skillData['intro'];
                if (_trans3 && _trans3.detail) data.comment = _trans3.detail;
              }

            case 72:
              _context2.next = 74;
              return getCommSkillMap();

            case 74:
              keys.forEach(function (item) {
                if (!translated.get(item[0])) {
                  var skill = data[item[0]];

                  if (skill) {
                    skill.comment = transSkill(skill.comment, skillState);
                  }
                }
              });
              return _context2.abrupt("return", data);

            case 76:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[27, 58, 62, 70], [63,, 65, 69]]);
    }));

    return function parseSkill(_x2, _x3) {
      return _ref3.apply(this, arguments);
    };
  }();

  var skillMap$1 = new Map();
  var loaded$3 = false;

  var getSkillData$1 =
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(id) {
      var csv, list, trans;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (loaded$3) {
                _context.next = 12;
                break;
              }

              _context.next = 3;
              return getLocalData('job-skill');

            case 3:
              csv = _context.sent;

              if (csv) {
                _context.next = 9;
                break;
              }

              _context.next = 7;
              return fetchWithHash('/blhxfy/data/job-skill.csv');

            case 7:
              csv = _context.sent;
              setLocalData('job-skill', csv);

            case 9:
              list = parseCsv(csv);
              list.forEach(function (item) {
                if (item && item.id) {
                  var _id = trim(item.id);

                  var _en = trim(item.en);

                  var _ja = trim(item.ja);

                  if (_id) {
                    var value = {
                      name: filter(item.name),
                      detail: filter(item.detail)
                    };
                    skillMap$1.set(_id, value);
                    if (_ja) skillMap$1.set(_ja, value);
                    if (_en) skillMap$1.set(_en, value);
                  }
                }
              });
              loaded$3 = true;

            case 12:
              trans = skillMap$1.get(id);
              return _context.abrupt("return", trans);

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function getSkillData(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var startTrans =
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(data) {
      var key, trans;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.t0 = regeneratorRuntime.keys(data);

            case 1:
              if ((_context.t1 = _context.t0()).done) {
                _context.next = 15;
                break;
              }

              key = _context.t1.value;

              if (!data[key]) {
                _context.next = 13;
                break;
              }

              _context.next = 6;
              return getSkillData$1(data[key].action_id);

            case 6:
              trans = _context.sent;

              if (trans) {
                data[key].name = trans.name;
                data[key].comment = trans.detail;
              }

              if (data[key].recast_comment) {
                data[key].recast_comment = replaceTurn(data[key].recast_comment);
              }

              if (data[key].turn_comment) {
                data[key].turn_comment = replaceTurn(data[key].turn_comment);
              }

              if (!data[key].ability_detail) {
                _context.next = 13;
                break;
              }

              _context.next = 13;
              return transBuff(data[key].ability_detail);

            case 13:
              _context.next = 1;
              break;

            case 15:
              return _context.abrupt("return", data);

            case 16:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function startTrans(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var replaceSkill =
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(data) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!data.action_ability) {
                _context2.next = 4;
                break;
              }

              _context2.next = 3;
              return startTrans(data.action_ability);

            case 3:
              data.action_ability = _context2.sent;

            case 4:
              if (!data.support_ability) {
                _context2.next = 8;
                break;
              }

              _context2.next = 7;
              return startTrans(data.support_ability);

            case 7:
              data.support_ability = _context2.sent;

            case 8:
              return _context2.abrupt("return", data);

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function replaceSkill(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  var transSkill$1 =
  /*#__PURE__*/
  function () {
    var _ref3 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(data, pathname) {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!/\/party\/job\/\d+\//.test(pathname)) {
                _context3.next = 7;
                break;
              }

              if (!data.job) {
                _context3.next = 5;
                break;
              }

              _context3.next = 4;
              return replaceSkill(data.job);

            case 4:
              data.job = _context3.sent;

            case 5:
              _context3.next = 36;
              break;

            case 7:
              if (!pathname.includes('/party_ability_subaction/')) {
                _context3.next = 14;
                break;
              }

              if (!data.list) {
                _context3.next = 12;
                break;
              }

              _context3.next = 11;
              return startTrans(data.list);

            case 11:
              data.list = _context3.sent;

            case 12:
              _context3.next = 36;
              break;

            case 14:
              if (!/\/party\/ability_list\/\d+\//.test(pathname)) {
                _context3.next = 20;
                break;
              }

              _context3.next = 17;
              return replaceSkill(data);

            case 17:
              data = _context3.sent;
              _context3.next = 36;
              break;

            case 20:
              if (!/\/party\/job_info\/\d+\//.test(pathname)) {
                _context3.next = 31;
                break;
              }

              if (!data.after_job_master) {
                _context3.next = 25;
                break;
              }

              _context3.next = 24;
              return replaceSkill(data.after_job_master);

            case 24:
              data.after_job_master = _context3.sent;

            case 25:
              if (!data.before_job_info) {
                _context3.next = 29;
                break;
              }

              _context3.next = 28;
              return replaceSkill(data.before_job_info);

            case 28:
              data.before_job_info = _context3.sent;

            case 29:
              _context3.next = 36;
              break;

            case 31:
              if (!/\/zenith\/ability_list\/\d+/.test(pathname)) {
                _context3.next = 36;
                break;
              }

              if (!data.ability_list) {
                _context3.next = 36;
                break;
              }

              _context3.next = 35;
              return startTrans(data.ability_list);

            case 35:
              data.list = _context3.sent;

            case 36:
              return _context3.abrupt("return", data);

            case 37:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function transSkill(_x3, _x4) {
      return _ref3.apply(this, arguments);
    };
  }();

  var htmlMap = new Map();
  var loaded$4 = false;

  var getCommHtmlData =
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var csv, list, tempMap;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (loaded$4) {
                _context.next = 14;
                break;
              }

              _context.next = 3;
              return getLocalData('common-html');

            case 3:
              csv = _context.sent;

              if (csv) {
                _context.next = 9;
                break;
              }

              _context.next = 7;
              return fetchWithHash('/blhxfy/data/common-html.csv');

            case 7:
              csv = _context.sent;
              setLocalData('common-html', csv);

            case 9:
              list = parseCsv(csv);
              tempMap = new Map();
              sortKeywords(list, 'text').forEach(function (item, index) {
                var pathname = trim(item.path);
                var text = trim(item.text);
                var trans = filter(item.trans);
                var times = item.count | 0 || 1;

                if (pathname && text && trans) {
                  if (tempMap.has(pathname)) {
                    tempMap.get(pathname).push({
                      text: text,
                      trans: trans,
                      times: times,
                      index: index
                    });
                  } else {
                    tempMap.set(pathname, [{
                      text: text,
                      trans: trans,
                      times: times,
                      index: index
                    }]);
                  }
                }
              });
              sortKeywords(Array.from(tempMap.keys())).forEach(function (key) {
                htmlMap.set(key, tempMap.get(key));
              });
              loaded$4 = true;

            case 14:
              return _context.abrupt("return", htmlMap);

            case 15:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function getCommHtmlData() {
      return _ref.apply(this, arguments);
    };
  }();

  var htmlMap$1 = new Map();
  var loaded$5 = false;

  var getArchiveData =
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var csv, list;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (loaded$5) {
                _context.next = 7;
                break;
              }

              _context.next = 3;
              return fetchWithHash('/blhxfy/data/archive.csv');

            case 3:
              csv = _context.sent;
              list = parseCsv(csv);
              sortKeywords(list, 'text').forEach(function (item) {
                var text = trim(item.text);
                var trans = filter(item.trans);
                var times = item.count | 0 || 1;

                if (text && trans) {
                  htmlMap$1.set(text, {
                    trans: trans,
                    times: times
                  });
                }
              });
              loaded$5 = true;

            case 7:
              return _context.abrupt("return", htmlMap$1);

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function getArchiveData() {
      return _ref.apply(this, arguments);
    };
  }();

  var replaceHTML =
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(html, pathname) {
      var _html, theList, htmlMap, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _step$value, key, list;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _html = html;
              theList = [];
              _context.next = 4;
              return getCommHtmlData();

            case 4:
              htmlMap = _context.sent;
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 8;

              for (_iterator = htmlMap.entries()[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                _step$value = _slicedToArray(_step.value, 2), key = _step$value[0], list = _step$value[1];

                if (pathname.includes(key)) {
                  theList = theList.concat(list);
                }
              }

              _context.next = 16;
              break;

            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](8);
              _didIteratorError = true;
              _iteratorError = _context.t0;

            case 16:
              _context.prev = 16;
              _context.prev = 17;

              if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
              }

            case 19:
              _context.prev = 19;

              if (!_didIteratorError) {
                _context.next = 22;
                break;
              }

              throw _iteratorError;

            case 22:
              return _context.finish(19);

            case 23:
              return _context.finish(16);

            case 24:
              theList.sort(function (prev, next) {
                return prev.index - next.index;
              }).forEach(function (item) {
                for (var i = 0; i < item.times; i++) {
                  var newHtml = _html.replace(item.text, item.trans);

                  if (newHtml !== _html) {
                    _html = newHtml;
                  } else {
                    break;
                  }
                }
              });
              return _context.abrupt("return", _html);

            case 26:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[8, 12, 16, 24], [17,, 19, 23]]);
    }));

    return function replaceHTML(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  var replaceArchive =
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(html) {
      var _html, htmlMap, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _step2$value, text, item, i, newHtml;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _html = html;
              _context2.next = 3;
              return getArchiveData();

            case 3:
              htmlMap = _context2.sent;
              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context2.prev = 7;
              _iterator2 = htmlMap.entries()[Symbol.iterator]();

            case 9:
              if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                _context2.next = 25;
                break;
              }

              _step2$value = _slicedToArray(_step2.value, 2), text = _step2$value[0], item = _step2$value[1];
              i = 0;

            case 12:
              if (!(i < item.times)) {
                _context2.next = 22;
                break;
              }

              newHtml = _html.replace(text, item.trans);

              if (!(newHtml !== _html)) {
                _context2.next = 18;
                break;
              }

              _html = newHtml;
              _context2.next = 19;
              break;

            case 18:
              return _context2.abrupt("break", 22);

            case 19:
              i++;
              _context2.next = 12;
              break;

            case 22:
              _iteratorNormalCompletion2 = true;
              _context2.next = 9;
              break;

            case 25:
              _context2.next = 31;
              break;

            case 27:
              _context2.prev = 27;
              _context2.t0 = _context2["catch"](7);
              _didIteratorError2 = true;
              _iteratorError2 = _context2.t0;

            case 31:
              _context2.prev = 31;
              _context2.prev = 32;

              if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                _iterator2.return();
              }

            case 34:
              _context2.prev = 34;

              if (!_didIteratorError2) {
                _context2.next = 37;
                break;
              }

              throw _iteratorError2;

            case 37:
              return _context2.finish(34);

            case 38:
              return _context2.finish(31);

            case 39:
              return _context2.abrupt("return", _html);

            case 40:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[7, 27, 31, 39], [32,, 34, 38]]);
    }));

    return function replaceArchive(_x3) {
      return _ref2.apply(this, arguments);
    };
  }();

  var settingHtml = false;

  var getHtml =
  /*#__PURE__*/
  function () {
    var _ref3 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(encodedHtml, pathname) {
      var html;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              html = decodeURIComponent(encodedHtml);
              _context3.next = 7;
              break;

            case 4:
              _context3.prev = 4;
              _context3.t0 = _context3["catch"](0);
              return _context3.abrupt("return", encodedHtml);

            case 7:
              _context3.prev = 7;

              if (!pathname.includes('/archive/content/library/')) {
                _context3.next = 14;
                break;
              }

              _context3.next = 11;
              return replaceArchive(html);

            case 11:
              html = _context3.sent;
              _context3.next = 17;
              break;

            case 14:
              _context3.next = 16;
              return replaceHTML(html, pathname);

            case 16:
              html = _context3.sent;

            case 17:
              _context3.next = 22;
              break;

            case 19:
              _context3.prev = 19;
              _context3.t1 = _context3["catch"](7);
              console.error(_context3.t1);

            case 22:
              if (!settingHtml && pathname.includes('/setting/content/index/index')) {
                html = insertSettingHtml(html);
                settingHtml = true;
              }

              return _context3.abrupt("return", encodeURIComponent(html));

            case 24:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 4], [7, 19]]);
    }));

    return function getHtml(_x4, _x5) {
      return _ref3.apply(this, arguments);
    };
  }();

  function transHTML(_x6, _x7) {
    return _transHTML.apply(this, arguments);
  }

  function _transHTML() {
    _transHTML = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(data, pathname) {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (!data.data) {
                _context4.next = 4;
                break;
              }

              _context4.next = 3;
              return getHtml(data.data, pathname);

            case 3:
              data.data = _context4.sent;

            case 4:
              if (!(data.option && data.option.progress)) {
                _context4.next = 8;
                break;
              }

              _context4.next = 7;
              return getHtml(data.option.progress, pathname);

            case 7:
              data.option.progress = _context4.sent;

            case 8:
              if (!(data.option && data.option.quest)) {
                _context4.next = 17;
                break;
              }

              if (!data.option.quest.content__index) {
                _context4.next = 13;
                break;
              }

              _context4.next = 12;
              return getHtml(data.option.quest.content__index, pathname);

            case 12:
              data.option.quest.content__index = _context4.sent;

            case 13:
              if (!data.option.quest.content_list) {
                _context4.next = 17;
                break;
              }

              _context4.next = 16;
              return getHtml(data.option.quest.content_list, pathname);

            case 16:
              data.option.quest.content_list = _context4.sent;

            case 17:
              return _context4.abrupt("return", data);

            case 18:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));
    return _transHTML.apply(this, arguments);
  }

  var townMap = new Map();
  var loaded$6 = false;

  var getTownData =
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var csv, list;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (loaded$6) {
                _context.next = 12;
                break;
              }

              _context.next = 3;
              return getLocalData('town-info');

            case 3:
              csv = _context.sent;

              if (csv) {
                _context.next = 9;
                break;
              }

              _context.next = 7;
              return fetchWithHash('/blhxfy/data/town-info.csv');

            case 7:
              csv = _context.sent;
              setLocalData('town-info', csv);

            case 9:
              list = parseCsv(csv);
              list.forEach(function (item) {
                var id = trim(item.id);
                var name = filter(item.name);
                var detail = filter(item.detail);
                var vyrn = filter(item.vyrn);

                if (id && name) {
                  townMap.set(id, {
                    name: name,
                    detail: detail,
                    vyrn: vyrn
                  });
                }
              });
              loaded$6 = true;

            case 12:
              return _context.abrupt("return", townMap);

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function getTownData() {
      return _ref.apply(this, arguments);
    };
  }();

  function transTownInfo(_x, _x2) {
    return _transTownInfo.apply(this, arguments);
  }

  function _transTownInfo() {
    _transTownInfo = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(data, pathname) {
      var town, townMap, key, item, id, _data;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              town = data.option.mydata_assets.mydata.town;
              _context.next = 7;
              break;

            case 4:
              _context.prev = 4;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", data);

            case 7:
              _context.next = 9;
              return getTownData();

            case 9:
              townMap = _context.sent;

              if (townMap.has(town.location_id)) {
                town.town_name = townMap.get(town.location_id).name;
              }

              for (key in town.spot) {
                item = town.spot[key];
                id = "".concat(town.location_id, "-").concat(item.id);

                if (townMap.has(id)) {
                  _data = townMap.get(id);
                  item.location = _data.name;
                  item.description = _data.detail;
                  item.bee_comment = _data.vyrn;
                }
              }

              return _context.abrupt("return", data);

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 4]]);
    }));
    return _transTownInfo.apply(this, arguments);
  }

  var islandMap = new Map();
  var loaded$7 = false;

  var getIslandData =
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var csv, list;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (loaded$7) {
                _context.next = 7;
                break;
              }

              _context.next = 3;
              return fetchWithHash('/blhxfy/data/island-info.csv');

            case 3:
              csv = _context.sent;
              list = parseCsv(csv);
              list.forEach(function (item) {
                var id = trim(item.id);
                var name = filter(item.name);
                var detail = filter(item.detail);

                if (id && name) {
                  islandMap.set(id, {
                    name: name,
                    detail: detail
                  });

                  if (id === 'skydom') {
                    islandMap.set(name, detail);
                  }
                }
              });
              loaded$7 = true;

            case 7:
              return _context.abrupt("return", islandMap);

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function getIslandData() {
      return _ref.apply(this, arguments);
    };
  }();

  function transIslandInfo(_x, _x2) {
    return _transIslandInfo.apply(this, arguments);
  }

  function _transIslandInfo() {
    _transIslandInfo = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(data, pathname) {
      var island, islandMap, key, item, id, _data;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              island = data.island_info;
              _context.next = 7;
              break;

            case 4:
              _context.prev = 4;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", data);

            case 7:
              _context.next = 9;
              return getIslandData();

            case 9:
              islandMap = _context.sent;

              if (islandMap.has(island.island_name)) {
                island.island_name = islandMap.get(island.island_name);
              }

              for (key in island) {
                item = island[key];
                id = key;

                if (islandMap.has(id)) {
                  if (id !== 'island_name') {
                    _data = islandMap.get(id);
                    item.name = _data.name;
                    item.area_comment = _data.detail;
                  }
                }
              }

              return _context.abrupt("return", data);

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 4]]);
    }));
    return _transIslandInfo.apply(this, arguments);
  }

  var chatMap = new Map();
  var nChatMap = new Map();
  var loaded$8 = false;

  var getChatData =
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var csv, list;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (loaded$8) {
                _context.next = 12;
                break;
              }

              _context.next = 3;
              return getLocalData('chat-preset');

            case 3:
              csv = _context.sent;

              if (csv) {
                _context.next = 9;
                break;
              }

              _context.next = 7;
              return fetchWithHash('/blhxfy/data/chat-preset.csv');

            case 7:
              csv = _context.sent;
              setLocalData('chat-preset', csv);

            case 9:
              list = parseCsv(csv);
              list.forEach(function (item) {
                var id = trim(item.id);
                var text = trim(item.text);
                var trans = filter(item.trans);

                if (id && trans) {
                  if (/\d+-n/.test(id)) {
                    var rgs = id.match(/(\d+)-n/);
                    var _id = rgs[1];
                    nChatMap.set(_id, {
                      text: text,
                      trans: trans
                    });
                  } else {
                    chatMap.set(id, trans);
                  }
                }
              });
              loaded$8 = true;

            case 12:
              return _context.abrupt("return", {
                chatMap: chatMap,
                nChatMap: nChatMap
              });

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function getChatData() {
      return _ref.apply(this, arguments);
    };
  }();

  function transChat(_x) {
    return _transChat.apply(this, arguments);
  }

  function _transChat() {
    _transChat = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(data) {
      var _ref, chatMap, nChatMap, key, item, ck, id, hasSpecialTrans, _nChatMap$get, text, trans;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (data.chat) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return", data);

            case 2:
              _context.next = 4;
              return getChatData();

            case 4:
              _ref = _context.sent;
              chatMap = _ref.chatMap;
              nChatMap = _ref.nChatMap;

              for (key in data.chat) {
                item = data.chat[key];

                for (ck in item) {
                  id = item[ck].chat_id;

                  if (chatMap.has(id)) {
                    hasSpecialTrans = false;

                    if (nChatMap.has(id)) {
                      _nChatMap$get = nChatMap.get(id), text = _nChatMap$get.text, trans = _nChatMap$get.trans;

                      if (item[ck].text === text) {
                        item[ck].text = trans;
                        hasSpecialTrans = true;
                      }
                    }

                    if (!hasSpecialTrans) {
                      item[ck].text = chatMap.get(id);
                    }
                  }
                }
              }

              return _context.abrupt("return", data);

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _transChat.apply(this, arguments);
  }

  var arcarumMap = new Map();
  var loaded$9 = false;

  var getArcarumData =
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var csv, list;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (loaded$9) {
                _context.next = 12;
                break;
              }

              _context.next = 3;
              return getLocalData('arcarum');

            case 3:
              csv = _context.sent;

              if (csv) {
                _context.next = 9;
                break;
              }

              _context.next = 7;
              return fetchWithHash('/blhxfy/data/arcarum.csv');

            case 7:
              csv = _context.sent;
              setLocalData('arcarum', csv);

            case 9:
              list = parseCsv(csv);
              list.forEach(function (item) {
                var ja = trim(item.ja).replace(/<br>/g, '');
                var zh = filter(item.zh);

                if (ja && zh) {
                  arcarumMap.set(ja, zh);
                }
              });
              loaded$9 = true;

            case 12:
              return _context.abrupt("return", arcarumMap);

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function getArcarumData() {
      return _ref.apply(this, arguments);
    };
  }();

  var skillTemp = new Map();
  var posMap = new Map();
  var arcarumMap$1 = new Map();
  var count = 0;
  var observered = false;
  var obConfig = {
    attributes: true,
    subtree: true
  };

  var mutationCallback = function mutationCallback(mutationsList) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = mutationsList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var mutation = _step.value;
        var type = mutation.type;
        var attr = mutation.attributeName;
        var target = mutation.target;

        if (target.classList.contains('lis-ability') && type === 'attributes' && attr === 'title') {
          var title = target.title;

          if (title && title.endsWith('turn(s)')) {
            viraSkillTitle();
          }
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  };

  var viraSkillTitleFunc = function viraSkillTitleFunc() {
    var list = $('.lis-ability');

    if (list.length) {
      count = 0;

      if (!observered) {
        var targetNode = document.querySelector('.prt-command');
        var observer = new MutationObserver(mutationCallback);
        observer.observe(targetNode, obConfig);
        observered = true;
      }

      list.each(function () {
        var $elem = $(this);
        var title = $elem.attr('title');
        if (!title) return;
        var name = title.split('\n')[0];
        var trans = skillTemp.get(name);

        if (trans) {
          var _getPlusStr = getPlusStr(name),
              _getPlusStr2 = _slicedToArray(_getPlusStr, 1),
              plus1 = _getPlusStr2[0];

          var sName = trans.name + plus1;
          var detail = removeHtmlTag(trans.detail.replace(/<br\s?\/?>/gi, '\n'));
          $elem.attr('title', title.replace(/^([\s\S]+)Cooldown:\s(\d+)\sturn\(s\)$/, "".concat(sName, "\n").concat(detail, "\n\u4F7F\u7528\u95F4\u9694\uFF1A$2 \u56DE\u5408")));
        } else {
          $elem.attr('title', title.replace(/^([\s\S]+)Cooldown:\s(\d+)\sturn\(s\)$/, "$1\u4F7F\u7528\u95F4\u9694\uFF1A$2 \u56DE\u5408"));
        }
      });
    } else if (count < 20) {
      count++;
      viraSkillTitle();
    }
  };

  var viraSkillTitle = debounce_1(viraSkillTitleFunc, 500);

  var collectNpcSkill = function collectNpcSkill(skillData) {
    for (var key in skillData) {
      if (/(skill|special)-\D.*/.test(key)) {
        var rgs = key.match(/(skill|special)-(\D.*)/);

        if (rgs && rgs[2] && !skillTemp.has(rgs[2])) {
          skillTemp.set(rgs[2], skillData[key]);
        }
      }
    }
  };

  var replaceMonsterName = function replaceMonsterName(item, key) {
    var name = item[key].replace(/^Lvl?\s?\d+\s+/, '');

    if (arcarumMap$1.has(name)) {
      var trans = arcarumMap$1.get(name);
      item[key] = item[key].replace(name, trans);
    }
  };

  var transBossName =
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(data) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (data && isArray_1(data.param)) {
                data.param.forEach(function (item) {
                  replaceMonsterName(item, 'monster');
                  replaceMonsterName(item.name, 'en');
                  replaceMonsterName(item.name, 'ja');
                });
              }

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function transBossName(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var battle =
  /*#__PURE__*/
  function () {
    var _battle = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(data, mode) {
      var ability, scenario, spms, abKey, item, key, arr, skill, _name2, trans, tsDetail, npcId, state$1, skillData, index, _key, _arr, _skill, _name3, _getPlusStr3, _getPlusStr4, plus1, plus2, _name, _trans, tsName, _tsDetail, _trans2, _tsName, _tsDetail2, _key2, _arr2, _skill2, _name4, detail, param, _index, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _item, _npcId, _state, _skillData, _name5, _getPlusStr5, _getPlusStr6, _plus, _plus2, _name6, _trans3, _tsName2, _tsDetail3, _trans4, _tsName3, _tsDetail4, _name7, _detail, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, _item2, scKey, _item3, _trans5, _getPlusStr7, _getPlusStr8, _plus3, _trans6, _getPlusStr9, _getPlusStr10, _plus4, _getPlusStr11, _getPlusStr12, _plus5, _plus6, _name8, _trans7, _tsName4, _tsDetail5;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (config.battleTrans) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt("return", data);

            case 2:
              _context2.next = 4;
              return getArcarumData();

            case 4:
              arcarumMap$1 = _context2.sent;

              if (!(mode === 'result')) {
                _context2.next = 9;
                break;
              }

              if (isObject_1(data.status)) {
                ability = data.status.ability;
                spms = data.status.skip_special_motion_setting;
              }

              _context2.next = 15;
              break;

            case 9:
              ability = data.ability;
              spms = data.skip_special_motion_setting;
              data.temporary_potion_all_name = '群体回复药水';
              data.temporary_potion_one_name = '治疗药水';
              _context2.next = 15;
              return transBossName(data.boss);

            case 15:
              if (isArray_1(spms)) {
                spms.forEach(function (item) {
                  posMap.set(item.pos, item.setting_id);
                });
              }

              if (isObject_1(data.scenario)) scenario = data.scenario;
              _context2.next = 19;
              return getCommSkillMap();

            case 19:
              if (!isObject_1(ability)) {
                _context2.next = 120;
                break;
              }

              _context2.t0 = regeneratorRuntime.keys(ability);

            case 21:
              if ((_context2.t1 = _context2.t0()).done) {
                _context2.next = 120;
                break;
              }

              abKey = _context2.t1.value;
              item = ability[abKey];

              if (!(item && isObject_1(item.list))) {
                _context2.next = 118;
                break;
              }

              if (!(item.mode === 'player')) {
                _context2.next = 52;
                break;
              }

              _context2.t2 = regeneratorRuntime.keys(item.list);

            case 27:
              if ((_context2.t3 = _context2.t2()).done) {
                _context2.next = 50;
                break;
              }

              key = _context2.t3.value;
              arr = item.list[key];
              skill = arr[0];

              if (!(skill && skill['ability-name'])) {
                _context2.next = 48;
                break;
              }

              _name2 = skill['ability-name'];
              _context2.next = 35;
              return getSkillData$1(_name2);

            case 35:
              trans = _context2.sent;

              if (!trans) {
                _context2.next = 42;
                break;
              }

              if (!skillTemp.has(_name2)) skillTemp.set(_name2, trans);
              skill['ability-name'] = trans.name;
              skill['text-data'] = trans.detail;
              _context2.next = 47;
              break;

            case 42:
              _context2.next = 44;
              return transSkill(skill['text-data'], state);

            case 44:
              tsDetail = _context2.sent;
              skill['text-data'] = tsDetail;
              if (!skillTemp.has(_name2)) skillTemp.set(_name2, {
                name: _name2,
                detail: tsDetail
              });

            case 47:
              skill['duration-type'] = replaceTurn(skill['duration-type']);

            case 48:
              _context2.next = 27;
              break;

            case 50:
              _context2.next = 118;
              break;

            case 52:
              if (!(item.mode === 'npc')) {
                _context2.next = 118;
                break;
              }

              npcId = posMap.get(item.pos);
              _context2.next = 56;
              return getSkillData(npcId);

            case 56:
              state$1 = _context2.sent;
              skillData = state$1.skillMap.get(npcId);

              if (!(skillData && isObject_1(item.list))) {
                _context2.next = 104;
                break;
              }

              collectNpcSkill(skillData);
              index = 0;
              _context2.t4 = regeneratorRuntime.keys(item.list);

            case 62:
              if ((_context2.t5 = _context2.t4()).done) {
                _context2.next = 102;
                break;
              }

              _key = _context2.t5.value;
              index++;
              _arr = item.list[_key];
              _skill = _arr[0];

              if (!(_skill && _skill['ability-name'])) {
                _context2.next = 100;
                break;
              }

              _name3 = _skill['ability-name'];
              _getPlusStr3 = getPlusStr(_name3), _getPlusStr4 = _slicedToArray(_getPlusStr3, 3), plus1 = _getPlusStr4[0], plus2 = _getPlusStr4[1], _name = _getPlusStr4[2];

              if (!skillData["skill-".concat(_name)]) {
                _context2.next = 86;
                break;
              }

              _trans = skillData["skill-".concat(_name).concat(plus2)];
              if (!_trans) _trans = skillData["skill-".concat(_name)];
              tsName = _name3;
              _tsDetail = _skill['text-data'];

              if (_trans) {
                if (_trans.name) tsName = _trans.name + plus1;
                if (_trans.detail) _tsDetail = _trans.detail;
              }

              if (!(_tsDetail === _skill['text-data'])) {
                _context2.next = 81;
                break;
              }

              _context2.next = 79;
              return transSkill(_skill['text-data'], state$1);

            case 79:
              _tsDetail = _context2.sent;
              _skill['text-data'] = _tsDetail;

            case 81:
              _skill['ability-name'] = tsName;
              _skill['text-data'] = _tsDetail;
              skillTemp.set(_name3, {
                name: getPlusStr(tsName)[2],
                detail: _tsDetail
              });
              _context2.next = 99;
              break;

            case 86:
              _trans2 = skillData["skill-".concat(index).concat(plus2)];
              if (!_trans2) _trans2 = skillData["skill-".concat(index)];
              _tsName = _name3;
              _tsDetail2 = _skill['text-data'];

              if (_trans2) {
                if (_trans2.name) _tsName = _trans2.name + plus1;
                if (_trans2.detail) _tsDetail2 = _trans2.detail;
              }

              if (!(_tsDetail2 === _skill['text-data'])) {
                _context2.next = 96;
                break;
              }

              _context2.next = 94;
              return transSkill(_skill['text-data'], state$1);

            case 94:
              _tsDetail2 = _context2.sent;
              _skill['text-data'] = _tsDetail2;

            case 96:
              _skill['ability-name'] = _tsName;
              _skill['text-data'] = _tsDetail2;
              skillTemp.set(_name3, {
                name: getPlusStr(_tsName)[2],
                detail: _tsDetail2
              });

            case 99:
              _skill['duration-type'] = replaceTurn(_skill['duration-type']);

            case 100:
              _context2.next = 62;
              break;

            case 102:
              _context2.next = 118;
              break;

            case 104:
              _context2.t6 = regeneratorRuntime.keys(item.list);

            case 105:
              if ((_context2.t7 = _context2.t6()).done) {
                _context2.next = 118;
                break;
              }

              _key2 = _context2.t7.value;
              _arr2 = item.list[_key2];
              _skill2 = _arr2[0];

              if (!(_skill2 && _skill2['ability-name'] && _skill2['text-data'])) {
                _context2.next = 116;
                break;
              }

              _name4 = _skill2['ability-name'];
              _context2.next = 113;
              return transSkill(_skill2['text-data'], state$1);

            case 113:
              detail = _context2.sent;
              _skill2['text-data'] = detail;
              skillTemp.set(_name4, {
                name: getPlusStr(_name4)[2],
                detail: detail
              });

            case 116:
              _context2.next = 105;
              break;

            case 118:
              _context2.next = 21;
              break;

            case 120:
              if (!(mode !== 'result' && data.player && isArray_1(data.player.param))) {
                _context2.next = 196;
                break;
              }

              param = data.player.param;
              _index = 0;
              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context2.prev = 126;
              _iterator2 = param[Symbol.iterator]();

            case 128:
              if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                _context2.next = 182;
                break;
              }

              _item = _step2.value;
              _npcId = posMap.get(_index);
              _index++;
              _context2.next = 134;
              return getSkillData(_npcId);

            case 134:
              _state = _context2.sent;
              _skillData = _state.skillMap.get(_npcId);

              if (!_skillData) {
                _context2.next = 172;
                break;
              }

              collectNpcSkill(_skillData);

              if (!_item['special_skill']) {
                _context2.next = 170;
                break;
              }

              _name5 = _item['special_skill'];
              _getPlusStr5 = getPlusStr(_name5), _getPlusStr6 = _slicedToArray(_getPlusStr5, 3), _plus = _getPlusStr6[0], _plus2 = _getPlusStr6[1], _name6 = _getPlusStr6[2];

              if (!_skillData["special-".concat(_name6)]) {
                _context2.next = 157;
                break;
              }

              _trans3 = _skillData["special-".concat(_name6).concat(_plus2)];
              if (!_trans3) _trans3 = _skillData["special-".concat(_name6)];
              _tsName2 = _name5;
              _tsDetail3 = _item['special_comment'];

              if (_trans3) {
                if (_trans3.name) _tsName2 = _trans3.name + _plus;
                if (_trans3.detail) _tsDetail3 = _trans3.detail;
              }

              if (!(_tsDetail3 === _item['special_comment'])) {
                _context2.next = 152;
                break;
              }

              _context2.next = 150;
              return transSkill(_item['special_comment'], _state);

            case 150:
              _tsDetail3 = _context2.sent;
              _item['special_comment'] = _tsDetail3;

            case 152:
              _item['special_skill'] = _tsName2;
              _item['special_comment'] = _tsDetail3;
              skillTemp.set(_name5, {
                name: getPlusStr(_tsName2)[2],
                detail: _tsDetail3
              });
              _context2.next = 170;
              break;

            case 157:
              _trans4 = _skillData["special".concat(_plus2)];
              if (!_trans4) _trans4 = _skillData["special"];
              _tsName3 = _name5;
              _tsDetail4 = _item['special_comment'];

              if (_trans4) {
                if (_trans4.name) _tsName3 = _trans4.name + _plus;
                if (_trans4.detail) _tsDetail4 = _trans4.detail;
              }

              if (!(_tsDetail4 === _item['special_comment'])) {
                _context2.next = 167;
                break;
              }

              _context2.next = 165;
              return transSkill(_item['special_comment'], _state);

            case 165:
              _tsDetail4 = _context2.sent;
              _item['special_comment'] = _tsDetail4;

            case 167:
              _item['special_skill'] = _tsName3;
              _item['special_comment'] = _tsDetail4;
              skillTemp.set(_name5, {
                name: getPlusStr(_tsName3)[2],
                detail: _tsDetail4
              });

            case 170:
              _context2.next = 179;
              break;

            case 172:
              if (!(_item['special_skill'] && _item['special_comment'])) {
                _context2.next = 179;
                break;
              }

              _name7 = _item['special_skill'];
              _context2.next = 176;
              return transSkill(_item['special_comment'], _state);

            case 176:
              _detail = _context2.sent;
              _item['special_comment'] = _detail;
              skillTemp.set(_name7, {
                name: getPlusStr(_name7)[2],
                detail: _detail
              });

            case 179:
              _iteratorNormalCompletion2 = true;
              _context2.next = 128;
              break;

            case 182:
              _context2.next = 188;
              break;

            case 184:
              _context2.prev = 184;
              _context2.t8 = _context2["catch"](126);
              _didIteratorError2 = true;
              _iteratorError2 = _context2.t8;

            case 188:
              _context2.prev = 188;
              _context2.prev = 189;

              if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                _iterator2.return();
              }

            case 191:
              _context2.prev = 191;

              if (!_didIteratorError2) {
                _context2.next = 194;
                break;
              }

              throw _iteratorError2;

            case 194:
              return _context2.finish(191);

            case 195:
              return _context2.finish(188);

            case 196:
              if (!(data.summon && isArray_1(data.summon))) {
                _context2.next = 230;
                break;
              }

              _iteratorNormalCompletion3 = true;
              _didIteratorError3 = false;
              _iteratorError3 = undefined;
              _context2.prev = 200;
              _iterator3 = data.summon[Symbol.iterator]();

            case 202:
              if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                _context2.next = 216;
                break;
              }

              _item2 = _step3.value;

              if (!_item2) {
                _context2.next = 213;
                break;
              }

              if (!_item2.comment) {
                _context2.next = 209;
                break;
              }

              _context2.next = 208;
              return transSkill(_item2.comment, state);

            case 208:
              _item2.comment = _context2.sent;

            case 209:
              if (!_item2.protection) {
                _context2.next = 213;
                break;
              }

              _context2.next = 212;
              return transSkill(_item2.protection, state);

            case 212:
              _item2.protection = _context2.sent;

            case 213:
              _iteratorNormalCompletion3 = true;
              _context2.next = 202;
              break;

            case 216:
              _context2.next = 222;
              break;

            case 218:
              _context2.prev = 218;
              _context2.t9 = _context2["catch"](200);
              _didIteratorError3 = true;
              _iteratorError3 = _context2.t9;

            case 222:
              _context2.prev = 222;
              _context2.prev = 223;

              if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
                _iterator3.return();
              }

            case 225:
              _context2.prev = 225;

              if (!_didIteratorError3) {
                _context2.next = 228;
                break;
              }

              throw _iteratorError3;

            case 228:
              return _context2.finish(225);

            case 229:
              return _context2.finish(222);

            case 230:
              if (!(data.supporter && data.supporter.name)) {
                _context2.next = 240;
                break;
              }

              _context2.next = 233;
              return transSkill(data.supporter.comment, state);

            case 233:
              data.supporter.comment = _context2.sent;
              _context2.next = 236;
              return transSkill(data.supporter.detail, state);

            case 236:
              data.supporter.detail = _context2.sent;
              _context2.next = 239;
              return transSkill(data.supporter.protection, state);

            case 239:
              data.supporter.protection = _context2.sent;

            case 240:
              if (!scenario) {
                _context2.next = 278;
                break;
              }

              _context2.t10 = regeneratorRuntime.keys(scenario);

            case 242:
              if ((_context2.t11 = _context2.t10()).done) {
                _context2.next = 278;
                break;
              }

              scKey = _context2.t11.value;
              _item3 = scenario[scKey];

              if (!(_item3 && _item3.name)) {
                _context2.next = 276;
                break;
              }

              if (!(_item3.cmd === 'ability')) {
                _context2.next = 252;
                break;
              }

              _trans5 = skillTemp.get(_item3.name);
              _getPlusStr7 = getPlusStr(_item3.name), _getPlusStr8 = _slicedToArray(_getPlusStr7, 1), _plus3 = _getPlusStr8[0];

              if (_trans5) {
                _item3.name = _trans5.name + _plus3;
                _item3.comment = _trans5.detail;
              }

              _context2.next = 276;
              break;

            case 252:
              if (!(_item3.cmd === 'special_npc')) {
                _context2.next = 258;
                break;
              }

              _trans6 = skillTemp.get(_item3.name);
              _getPlusStr9 = getPlusStr(_item3.name), _getPlusStr10 = _slicedToArray(_getPlusStr9, 1), _plus4 = _getPlusStr10[0];

              if (_trans6) {
                _item3.name = _trans6.name + _plus4;
              }

              _context2.next = 276;
              break;

            case 258:
              if (!(_item3.cmd === 'special_change')) {
                _context2.next = 275;
                break;
              }

              _getPlusStr11 = getPlusStr(_item3.name), _getPlusStr12 = _slicedToArray(_getPlusStr11, 3), _plus5 = _getPlusStr12[0], _plus6 = _getPlusStr12[1], _name8 = _getPlusStr12[2];
              _trans7 = skillTemp.get(_item3.name);
              if (!_trans7) _trans7 = skillTemp.get(_name8);
              _tsName4 = _item3.name;
              _tsDetail5 = _item3.text;

              if (_trans7) {
                if (_trans7.name) _tsName4 = _trans7.name + _plus5;
                if (_trans7.detail) _tsDetail5 = _trans7.detail;
              }

              if (!(_tsDetail5 === _item3.text)) {
                _context2.next = 270;
                break;
              }

              _context2.next = 268;
              return transSkill(_item3.text, state);

            case 268:
              _tsDetail5 = _context2.sent;
              _item3.text = _tsDetail5;

            case 270:
              _item3.name = _tsName4;
              _item3.text = _tsDetail5;
              skillTemp.set(name, {
                name: getPlusStr(_tsName4)[2],
                detail: _tsDetail5
              });
              _context2.next = 276;
              break;

            case 275:
              if (_item3.cmd === 'boss_gauge') {
                replaceMonsterName(_item3.name, 'ja');
                replaceMonsterName(_item3.name, 'en');
              }

            case 276:
              _context2.next = 242;
              break;

            case 278:
              viraSkillTitle();
              return _context2.abrupt("return", data);

            case 280:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[126, 184, 188, 196], [189,, 191, 195], [200, 218, 222, 230], [223,, 225, 229]]);
    }));

    function battle(_x2, _x3) {
      return _battle.apply(this, arguments);
    }

    return battle;
  }();

  var transBattle = race(battle);

  var autoTrans = function autoTrans(skill) {
    if (!skill.comment) return;
    skill.comment = transSkill(skill.comment, state);
  };

  var weaponSkill =
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(data) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return getCommSkillMap();

            case 2:
              if (data.skill1) {
                autoTrans(data.skill1);
              }

              if (data.skill2) {
                autoTrans(data.skill2);
              }

              if (data.special_skill) {
                autoTrans(data.special_skill);
              }

              return _context.abrupt("return", data);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function weaponSkill(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var autoTrans$1 = function autoTrans(skill, type) {
    if (!skill.comment) return;
    skill.comment = transSkill(skill.comment, state);

    if (type === 'call') {
      if (skill.recast_comment) skill.recast_comment = replaceTurn(skill.recast_comment);
      if (skill.start_recast_comment) skill.start_recast_comment = replaceTurn(skill.start_recast_comment);
    }
  };

  var summonSkill =
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(data) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return getCommSkillMap();

            case 2:
              if (data.skill) {
                autoTrans$1(data.skill);
              }

              if (data.sub_skill) {
                autoTrans$1(data.sub_skill);
              }

              if (data.special_skill) {
                autoTrans$1(data.special_skill, 'call');
              }

              return _context.abrupt("return", data);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function summonSkill(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var comicMap = new Map();
  var loaded$a = false;

  var getComicData =
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var csv, list;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (loaded$a) {
                _context.next = 7;
                break;
              }

              _context.next = 3;
              return fetchWithHash('/blhxfy/data/comic.csv');

            case 3:
              csv = _context.sent;
              list = parseCsv(csv);
              list.forEach(function (item) {
                var id = trim(item.id);
                var title = filter(item.title);
                var url = filter(item.url);

                if (id && url) {
                  comicMap.set(id, {
                    title: title,
                    url: url
                  });
                }
              });
              loaded$a = true;

            case 7:
              return _context.abrupt("return", comicMap);

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function getComicData() {
      return _ref.apply(this, arguments);
    };
  }();

  var insertTemplate = function insertTemplate(html) {
    return html.replace('<div class="prt-episode-thumbnail">', "<% if (n.trans) { %><div class=\"comic-transtag-blhxfy\">\uD83C\uDF3C</div><% } %><div class=\"prt-episode-thumbnail\">");
  };

  var comic =
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(data, pathname) {
      var type,
          html,
          comicMap,
          key,
          item,
          rgs,
          id,
          _comicMap,
          info,
          _html,
          _args = arguments;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              type = _args.length > 2 && _args[2] !== undefined ? _args[2] : 'default';

              if (!(type === 'template')) {
                _context.next = 13;
                break;
              }

              _context.prev = 2;
              html = decodeURIComponent(data.data);
              _context.next = 9;
              break;

            case 6:
              _context.prev = 6;
              _context.t0 = _context["catch"](2);
              return _context.abrupt("return", data);

            case 9:
              html = insertTemplate(html);
              data.data = encodeURIComponent(html);
              _context.next = 38;
              break;

            case 13:
              if (!(type === 'data')) {
                _context.next = 20;
                break;
              }

              _context.next = 16;
              return getComicData();

            case 16:
              comicMap = _context.sent;

              if (data.list) {
                for (key in data.list) {
                  item = data.list[key];

                  if (comicMap.has(item.id)) {
                    item.trans = true;
                  }
                }
              }

              _context.next = 38;
              break;

            case 20:
              rgs = pathname.match(/\/comic\/content\/episode\/(\d+)/);

              if (!(rgs && rgs[1])) {
                _context.next = 38;
                break;
              }

              id = rgs[1];
              _context.next = 25;
              return getComicData();

            case 25:
              _comicMap = _context.sent;
              info = _comicMap.get(id);

              if (!info) {
                _context.next = 38;
                break;
              }

              _context.prev = 28;
              _html = decodeURIComponent(data.data);
              _context.next = 35;
              break;

            case 32:
              _context.prev = 32;
              _context.t1 = _context["catch"](28);
              return _context.abrupt("return", data);

            case 35:
              if (info.title) {
                _html = _html.replace(/(<div\s+class=["']*prt-episode-title["']*>)[^<]*(<\/div>)/, "$1".concat(info.title, "$2"));
              }

              _html = _html.replace(/(<img\s+class=["']*img-episode["']* src=["']*)[^\s"'>]+(?=[\s"'>])/, "$1".concat(info.url));
              data.data = encodeURIComponent(_html);

            case 38:
              return _context.abrupt("return", data);

            case 39:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[2, 6], [28, 32]]);
    }));

    return function comic(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  var arcarumMap$2 = new Map();
  var textTempArr = [];
  var debounceLog = debounce_1(function () {
    if (!textTempArr.length) return;
    var text = textTempArr.join(',\n');
    console.log(text + ',');
    textTempArr = [];
  }, 200);

  var replaceText = function replaceText(key, data) {
    if (data && data[key]) {
      var text = data[key].replace(/<br\s?\/?>/gi, '').replace(/\r?\n/g, '');

      if (arcarumMap$2.has(text)) {
        data[key] = arcarumMap$2.get(text);
      } else {
        var _text = data[key].replace(/\r?\n/g, '');

        if (!textTempArr.includes(_text)) {
          textTempArr.push(_text);
        }

        debounceLog();
      }
    }
  };

  var replaceListText = function replaceListText(key, list) {
    if (list && list.length) {
      list.forEach(function (item) {
        if (Array.isArray(key)) {
          key.forEach(function (k) {
            replaceText(k, item);
          });
        } else {
          replaceText(key, item);
        }
      });
    }
  };

  var transDivisionList = function transDivisionList(list) {
    for (var key in list) {
      var item = list[key];
      replaceText('text', item);
      replaceListText('message', item.gatepost_list);
      replaceListText('message', item.chest_list);

      for (var qlk in item.quest_list) {
        replaceText('quest_name', item.quest_list[qlk]);
        replaceText('chapter_name', item.quest_list[qlk]);
      }
    }
  };

  var transArcarum =
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(data) {
      var key, obj;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return getArcarumData();

            case 2:
              arcarumMap$2 = _context.sent;
              replaceText('group_name', data.condition);
              replaceText('name', data.stage);

              if (data.map && data.map.division_list) {
                transDivisionList(data.map.division_list);
              }

              if (data.notice_effect) {
                for (key in data.notice_effect) {
                  obj = data.notice_effect[key];

                  if (obj && obj.maps) {
                    obj.maps.forEach(function (map) {
                      if (map.division_list) {
                        transDivisionList(map.division_list);
                      }
                    });
                  }
                }
              }

              return _context.abrupt("return", data);

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function transArcarum(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var replaceTime = function replaceTime(str) {
    if (!str) return str;
    return str.replace('時間', '小时');
  };

  var pageIndex =
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(data) {
      var messages, mydata, status, newMessages;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              mydata = data.option.mydata_assets.mydata;
              messages = mydata.messages;
              status = mydata.status;
              _context.next = 9;
              break;

            case 6:
              _context.prev = 6;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", data);

            case 9:
              if (messages.length) {
                newMessages = [];
                messages.forEach(function (item) {
                  if (item.url !== 'news/detail/1/20002') {
                    newMessages.push(item);
                  }
                });
                mydata.messages = newMessages;
              }

              status.action_point_remain = replaceTime(status.action_point_remain);
              status.battle_point_remain = replaceTime(status.battle_point_remain);
              return _context.abrupt("return", data);

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 6]]);
    }));

    return function pageIndex(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var replaceHour = function replaceHour(data, type) {
    if (!data.status && (!data.option || !data.option.user_status)) {
      return data;
    }

    var status;

    try {
      if (type === 'user') {
        status = data.status;
      } else {
        status = data.option.user_status;
      }
    } catch (e) {
      return data;
    }

    if (status) {
      if (status.action_point_remain) status.action_point_remain = replaceTime(status.action_point_remain);
      if (status.battle_point_remain) status.battle_point_remain = replaceTime(status.battle_point_remain);
    }

    return data;
  };

  var voiceMap = new Map();
  var loaded$b = false;

  var getTownData$1 =
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var csv, list;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (loaded$b) {
                _context.next = 7;
                break;
              }

              _context.next = 3;
              return fetchWithHash('/blhxfy/data/voice-mypage.csv');

            case 3:
              csv = _context.sent;
              list = parseCsv(csv);
              list.forEach(function (item) {
                var path = trim(item.path);
                var trans = filter(item.trans);
                var duration = trim(item.duration) || 10;

                if (path && trans) {
                  voiceMap.set(path, {
                    trans: trans,
                    duration: duration
                  });
                }
              });
              loaded$b = true;

            case 7:
              return _context.abrupt("return", voiceMap);

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function getTownData() {
      return _ref.apply(this, arguments);
    };
  }();

  var voiceList = [];

  var saveList =
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(data) {
      var obj, key, item, vkey, voice;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              obj = data.data;

              for (key in obj) {
                item = obj[key];

                for (vkey in item) {
                  voice = item[vkey].replace(/\.[\w\d]+$/, '');

                  if (!voiceList.includes(voice)) {
                    voiceList.push(voice);
                  }
                }
              }

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function saveList(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var createBox = function createBox() {
    var box = document.createElement('div');
    box.id = 'box-sub-blhxfy';
    return box;
  };

  var hideTimer = null;

  var hideBox = function hideBox() {
    var box = document.getElementById('box-sub-blhxfy');
    if (!box) return;
    box.style.pointerEvents = 'none';
    box.style.opacity = 0;
    box.style.transition = 'opacity 1.5s';
    clearTimeout(hideTimer);
  };

  var setSubBox = function setSubBox(text, duration) {
    var cont = document.querySelector('.cnt-mypage .prt-user-scene') || document.querySelector('.cnt-detail .prt-image');
    if (!cont) return;
    var box = document.getElementById('box-sub-blhxfy');

    if (!box) {
      box = createBox();
      cont.appendChild(box);
    }

    var _text = text;

    if (config.userName && (config.userName !== '姬塔' || config.userName !== '古兰')) {
      _text = _text.replace(/(团长|姬塔)/g, config.userName);
    }

    box.innerText = _text.replace(/\\n/g, '\n');
    setTimeout(function () {
      box.style.opacity = 1;
      box.style.pointerEvents = 'auto';
      box.style.transition = 'opacity 0.5s';
    }, 100);
    clearTimeout(hideTimer);
    hideTimer = setTimeout(hideBox, duration * 1000);
    box.removeEventListener('click', hideBox);
    box.addEventListener('click', hideBox);
  };

  var showSub =
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(src) {
      var voice, voiceMap, data;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (src) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt("return");

            case 2:
              hideBox();
              voice = src.replace(/\.[\w\d]+$/, '');

              if (voiceList.includes(voice)) {
                _context2.next = 6;
                break;
              }

              return _context2.abrupt("return");

            case 6:
              _context2.next = 8;
              return getTownData$1();

            case 8:
              voiceMap = _context2.sent;

              if (voiceMap.has(voice)) {
                _context2.next = 11;
                break;
              }

              return _context2.abrupt("return");

            case 11:
              data = voiceMap.get(voice);
              setSubBox(data.trans, data.duration);

            case 13:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function showSub(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  var soundInjected = false;
  function showVoiceSub(_x3, _x4, _x5) {
    return _showVoiceSub.apply(this, arguments);
  }

  function _showVoiceSub() {
    _showVoiceSub = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(data, pathname, type) {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!soundInjected) {
                require(['model/sound'], function (sound) {
                  var playVoice = sound.prototype.playVoice;

                  sound.prototype.playVoice = function (src, force) {
                    if (!Game.setting.sound_flag) return;
                    showSub(src);
                    playVoice.call(this, src, force);
                  };
                });
              }

              soundInjected = true;

              if (!(type === 'list')) {
                _context3.next = 7;
                break;
              }

              _context3.next = 5;
              return saveList(data);

            case 5:
              _context3.next = 9;
              break;

            case 7:
              _context3.next = 9;
              return showSub(pathname);

            case 9:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));
    return _showVoiceSub.apply(this, arguments);
  }

  var getUserName = function getUserName(data) {
    var html = decodeURIComponent(data.data);
    var rgs = html.match(/<span\sclass="txt-user-name">([^<]+)<\/span>/);

    if (rgs && rgs[1]) {
      config.userName = rgs[1];
      localStorage.setItem('blhxfy:name', rgs[1]);
    }
  };

  var setUserName = function setUserName() {
    if ((!config.userName || config.userName === '<span>古兰</span>') && Game.userId && location.hash !== '#tutorial/4' && location.hash !== '#tutorial/6' && location.hash !== '#tutorial/8') {
      require(['model/content'], function (mc) {
        var req = new mc({
          controller: "profile",
          action: "index",
          param: {
            user_id: Game.userId
          }
        });
        req.fetch();
      });

      config.userName = '<span>古兰</span>';
      localStorage.setItem('blhxfy:name', config.userName);
    }
  };

  var getLocalName = function getLocalName() {
    var name = localStorage.getItem('blhxfy:name');
    if (name) config.userName = filter(name);
  };

  getLocalName();

  var apiHosts = ['game.granbluefantasy.jp', 'gbf.game.mbga.jp'];
  function translate(_x) {
    return _translate.apply(this, arguments);
  }

  function _translate() {
    _translate = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(state) {
      var uri, pathname, hostname, data, isJSON;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              uri = URI(state.url);
              pathname = uri.pathname();
              hostname = uri.hostname();
              data = state.result;
              isJSON = true;

              try {
                data = JSON.parse(data);
              } catch (err) {
                isJSON = false;
              }

              if (!(apiHosts.indexOf(hostname) !== -1)) {
                _context.next = 118;
                break;
              }

              if (!pathname.includes('scenario')) {
                _context.next = 14;
                break;
              }

              setUserName();
              _context.next = 11;
              return transScenario(data, pathname);

            case 11:
              data = _context.sent;
              _context.next = 116;
              break;

            case 14:
              if (!pathname.includes('/content/')) {
                _context.next = 44;
                break;
              }

              _context.prev = 15;

              if (pathname.includes('/profile/content/index/')) {
                getUserName(data);
              }

              if (!pathname.includes('/user/content/index')) {
                _context.next = 26;
                break;
              }

              _context.next = 20;
              return transTownInfo(data, pathname);

            case 20:
              data = _context.sent;
              _context.next = 23;
              return pageIndex(data, pathname);

            case 23:
              data = _context.sent;
              _context.next = 27;
              break;

            case 26:
              data = replaceHour(data);

            case 27:
              if (!pathname.includes('/comic/content/episode/')) {
                _context.next = 31;
                break;
              }

              _context.next = 30;
              return comic(data, pathname);

            case 30:
              data = _context.sent;

            case 31:
              if (!pathname.includes('/comic/content/index')) {
                _context.next = 35;
                break;
              }

              _context.next = 34;
              return comic(data, pathname, 'template');

            case 34:
              data = _context.sent;

            case 35:
              _context.next = 40;
              break;

            case 37:
              _context.prev = 37;
              _context.t0 = _context["catch"](15);
              console.error(_context.t0);

            case 40:
              _context.next = 42;
              return Promise.all([transLangMsg(data, pathname), transHTML(data, pathname)]);

            case 42:
              _context.next = 116;
              break;

            case 44:
              if (!pathname.includes('/comic/list/')) {
                _context.next = 50;
                break;
              }

              _context.next = 47;
              return comic(data, pathname, 'data');

            case 47:
              data = _context.sent;
              _context.next = 116;
              break;

            case 50:
              if (!(pathname.includes('/npc/npc/') || pathname.includes('/archive/npc_detail'))) {
                _context.next = 56;
                break;
              }

              _context.next = 53;
              return parseSkill(data, pathname);

            case 53:
              data = _context.sent;
              _context.next = 116;
              break;

            case 56:
              if (!(pathname.includes('/party_ability_subaction/') || pathname.includes('/party/job/') || pathname.includes('/party/ability_list/') || pathname.includes('/zenith/ability_list/') || pathname.includes('/party/job_info/'))) {
                _context.next = 62;
                break;
              }

              _context.next = 59;
              return transSkill$1(data, pathname);

            case 59:
              data = _context.sent;
              _context.next = 116;
              break;

            case 62:
              if (!pathname.includes('/island/init')) {
                _context.next = 68;
                break;
              }

              _context.next = 65;
              return transIslandInfo(data, pathname);

            case 65:
              data = _context.sent;
              _context.next = 116;
              break;

            case 68:
              if (!(pathname.includes('/rest/sound/mypage_voice') || pathname.includes('/rest/sound/archive_voice'))) {
                _context.next = 73;
                break;
              }

              _context.next = 71;
              return showVoiceSub(data, pathname, 'list');

            case 71:
              _context.next = 116;
              break;

            case 73:
              if (!(/\/rest\/(multi)?raid\/start\.json/.test(pathname) || /\/rest\/tutorial\/tutorial\d{1,2}\.json/.test(pathname))) {
                _context.next = 82;
                break;
              }

              _context.next = 76;
              return transChat(data);

            case 76:
              data = _context.sent;
              _context.next = 79;
              return transBattle(data);

            case 79:
              data = _context.sent;
              _context.next = 116;
              break;

            case 82:
              if (!(/\/rest\/(multi)?raid\/ability_result\.json/.test(pathname) || /\/rest\/(multi)?raid\/temporary_item_result\.json/.test(pathname) || /\/rest\/(multi)?raid\/normal_attack_result\.json/.test(pathname) || /\/rest\/(multi)?raid\/summon_result\.json/.test(pathname) || /\/rest\/tutorial\/tutorial_battle_\d+_\d+\.json/.test(pathname))) {
                _context.next = 88;
                break;
              }

              _context.next = 85;
              return transBattle(data, 'result');

            case 85:
              data = _context.sent;
              _context.next = 116;
              break;

            case 88:
              if (!/\/rest\/.*?raid\/condition\/\d+\/\d\/\d\.json/.test(pathname)) {
                _context.next = 93;
                break;
              }

              _context.next = 91;
              return transBuff(data.condition);

            case 91:
              _context.next = 116;
              break;

            case 93:
              if (!pathname.includes('/user/status')) {
                _context.next = 97;
                break;
              }

              data = replaceHour(data, 'user');
              _context.next = 116;
              break;

            case 97:
              if (!(pathname.includes('/weapon/weapon/') || pathname.includes('/archive/weapon_detail'))) {
                _context.next = 103;
                break;
              }

              _context.next = 100;
              return weaponSkill(data);

            case 100:
              data = _context.sent;
              _context.next = 116;
              break;

            case 103:
              if (!(pathname.includes('/summon/summon/') || pathname.includes('/archive/summon_detail'))) {
                _context.next = 109;
                break;
              }

              _context.next = 106;
              return summonSkill(data);

            case 106:
              data = _context.sent;
              _context.next = 116;
              break;

            case 109:
              if (!(pathname.includes('/rest/arcarum/move_division') || pathname.includes('/rest/arcarum/start_stage') || pathname.includes('/rest/arcarum/open_gatepost') || pathname.includes('/rest/arcarum/open_chest') || pathname.includes('/rest/arcarum/next_stage') || pathname.includes('/rest/arcarum/stage'))) {
                _context.next = 115;
                break;
              }

              _context.next = 112;
              return transArcarum(data);

            case 112:
              data = _context.sent;
              _context.next = 116;
              break;

            case 115:
              return _context.abrupt("return");

            case 116:
              _context.next = 119;
              break;

            case 118:
              return _context.abrupt("return");

            case 119:
              state.result = isJSON ? JSON.stringify(data) : data;

            case 120:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[15, 37]]);
    }));
    return _translate.apply(this, arguments);
  }

  var injectXHR = function injectXHR() {
    // The following code are inspired by viramate/external.js
    // intercept xhr request and modify the response
    var XHR = XMLHttpRequest;
    var originOpen = XHR.prototype.open;
    var originSend = XHR.prototype.send;
    var originAddEventListener = XHR.prototype.addEventListener;
    var stateMap = new WeakMap();

    function log(data) {
      console.error(data);
    }

    function getXhrState(xhr) {
      var result = stateMap.get(xhr);

      if (!result) {
        result = {};
        stateMap.set(xhr, result);
      }

      if (!result.readyStateListeners) {
        result.readyStateListeners = [];
      }

      if (!result.loadListeners) {
        result.loadListeners = [];
      }

      return result;
    }

    var customOnLoad =
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(evt) {
        var state;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                state = getXhrState(this);
                state.onLoadEvent = evt;
                Object.defineProperties(this, {
                  response: {
                    get: function get() {
                      return state.result;
                    }
                  },
                  responseText: {
                    get: function get() {
                      return state.result;
                    }
                  }
                });
                _context.prev = 3;
                _context.next = 6;
                return translate(state);

              case 6:
                _context.next = 11;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](3);
                log(_context.t0);

              case 11:
                state.onload && state.onload.call(this, state.onLoadEvent);

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[3, 8]]);
      }));

      return function customOnLoad(_x) {
        return _ref.apply(this, arguments);
      };
    }();

    var customOnReadyStateChange =
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var state,
            i,
            l,
            _args2 = arguments;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                try {
                  state = getXhrState(this);

                  if (this.readyState == XHR.DONE) {
                    state.onComplete.call(this, state);
                  }
                } catch (err) {
                  log(err);
                }

                try {
                  for (i = 0, l = state.readyStateListeners.length; i < l; i++) {
                    try {
                      state.readyStateListeners[i].apply(this, _args2);
                    } catch (err) {
                      log(err);
                    }
                  }
                } catch (err) {
                  log(err);
                }

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function customOnReadyStateChange() {
        return _ref2.apply(this, arguments);
      };
    }();

    function customOnComplete(state) {
      if (state.done) return;
      state.done = performance.now();
      state.response = this.response;
      state.responseType = this.responseType;

      if (state.responseType === "" || state.responseType === "text") {
        state.responseText = this.responseText;
        state.result = this.response || this.responseText;
      }

      state.status = this.status;
      state.statusText = this.statusText;
      state.contentType = this.getResponseHeader('content-type');
    }

    XHR.prototype.open = function open(method, url, async, user, password) {
      try {
        var state = getXhrState(this);
        state.method = method;
        state.url = url;
      } catch (err) {
        log(err);
      }

      originAddEventListener.call(this, "readystatechange", customOnReadyStateChange, false);
      var result = originOpen.apply(this, arguments);
      return result;
    };

    XHR.prototype.addEventListener = function addEventListener(eventName, listener, useCapture) {
      try {
        var state = getXhrState(this);

        if (eventName === "readystatechange") {
          state.readyStateListeners.push(listener);
          return true;
        }
      } catch (err) {
        log(err);
      }

      var result = originAddEventListener.apply(this, arguments);
      return result;
    };

    XHR.prototype.send = function send(data) {
      var state = null;

      try {
        state = getXhrState(this);

        if (state.url) {
          state.sent = performance.now();
          state.data = data;
          state.onComplete = customOnComplete;
          state.onload = this.onload;
          this.onload = customOnLoad;
        }
      } catch (err) {
        log(err);
      }

      originSend.call(this, data);
    };

    XHR.prototype.open.toString = function toString() {
      return originOpen.toString();
    };

    XHR.prototype.addEventListener.toString = function toString() {
      return originAddEventListener.toString();
    };

    XHR.prototype.send.toString = function toString() {
      return originSend.toString();
    };
  };

  document.addEventListener('DOMContentLoaded', function () {
    document.head.insertAdjacentHTML('afterbegin', "\n  <meta name=\"mobile-web-app-capable\" content=\"yes\">\n  <meta name=\"apple-mobile-web-app-capable\" content=\"yes\">\n  <link rel=\"apple-touch-startup-image\" href=\"".concat(config.origin, "/blhxfy/data/static/image/splash.png\">\n  "));
    document.querySelector('meta[name="apple-mobile-web-app-title"]').setAttribute('content', '碧蓝幻想');
    document.title = '碧蓝幻想';
  });

  var removeScroller = function removeScroller() {
    if (config.removeScroller) {
      var style = document.createElement('style');
      style.innerHTML = "\n      ::-webkit-scrollbar {\n        display: none;\n      }\n    ";
      document.head.appendChild(style);
    }
  };

  removeScroller();

  var hideSidebar = function hideSidebar() {
    if (config.hideSidebar) {
      insertCSS('hide-sidebar');
    }
  };

  hideSidebar();

  var keepBgm = function keepBgm() {
    if (config.keepBgm) {
      window.addEventListener('blur', function (e) {
        e.stopImmediatePropagation();
      }, false);
    }
  };

  keepBgm();

  /** Error message constants. */
  var FUNC_ERROR_TEXT$1 = 'Expected a function';

  /**
   * Creates a throttled function that only invokes `func` at most once per
   * every `wait` milliseconds. The throttled function comes with a `cancel`
   * method to cancel delayed `func` invocations and a `flush` method to
   * immediately invoke them. Provide `options` to indicate whether `func`
   * should be invoked on the leading and/or trailing edge of the `wait`
   * timeout. The `func` is invoked with the last arguments provided to the
   * throttled function. Subsequent calls to the throttled function return the
   * result of the last `func` invocation.
   *
   * **Note:** If `leading` and `trailing` options are `true`, `func` is
   * invoked on the trailing edge of the timeout only if the throttled function
   * is invoked more than once during the `wait` timeout.
   *
   * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
   * until to the next tick, similar to `setTimeout` with a timeout of `0`.
   *
   * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
   * for details over the differences between `_.throttle` and `_.debounce`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Function
   * @param {Function} func The function to throttle.
   * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
   * @param {Object} [options={}] The options object.
   * @param {boolean} [options.leading=true]
   *  Specify invoking on the leading edge of the timeout.
   * @param {boolean} [options.trailing=true]
   *  Specify invoking on the trailing edge of the timeout.
   * @returns {Function} Returns the new throttled function.
   * @example
   *
   * // Avoid excessively updating the position while scrolling.
   * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
   *
   * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
   * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
   * jQuery(element).on('click', throttled);
   *
   * // Cancel the trailing throttled invocation.
   * jQuery(window).on('popstate', throttled.cancel);
   */
  function throttle(func, wait, options) {
    var leading = true,
        trailing = true;

    if (typeof func != 'function') {
      throw new TypeError(FUNC_ERROR_TEXT$1);
    }
    if (isObject_1(options)) {
      leading = 'leading' in options ? !!options.leading : leading;
      trailing = 'trailing' in options ? !!options.trailing : trailing;
    }
    return debounce_1(func, wait, {
      'leading': leading,
      'maxWait': wait,
      'trailing': trailing
    });
  }

  var throttle_1 = throttle;

  var saveToLocalstorage = function saveToLocalstorage(key, value) {
    var data;

    try {
      var str = localStorage.getItem('blhxfy:setting');
      data = JSON.parse(str);
    } catch (err) {
      console.error(err);
    }

    if (!isPlainObject_1(data)) {
      data = {};
    }

    data[key] = value;
    config[key] = value;
    localStorage.setItem('blhxfy:setting', JSON.stringify(data));
  };

  var keyMap = new Map([['origin', 'origin'], ['auto-download', 'autoDownload'], ['bottom-toolbar', 'bottomToolbar'], ['username', 'displayName'], ['remove-scroller', 'removeScroller'], ['hide-sidebar', 'hideSidebar'], ['trans-ja', 'transJa'], ['trans-en', 'transEn'], ['keep-bgm', 'keepBgm'], ['trans-api', 'transApi'], ['font', 'font'], ['font-bold', 'fontBold'], ['plain-text', 'plainText'], ['battle-trans', 'battleTrans'], ['origin-text', 'originText']]);

  var setting = function setting(type, value) {
    if (type === 'show') {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = keyMap[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = _slicedToArray(_step.value, 2),
              id = _step$value[0],
              key = _step$value[1];

          var ipt = $("#".concat(id, "-setting-blhxfy"));
          if (!ipt.length) continue;

          if (ipt.attr('type') === 'checkbox') {
            ipt[0].checked = config[key];
          } else if (ipt[0].tagName.toUpperCase() === 'SELECT') {
            ipt.val(config[key]);
            var text = ipt.find('option:selected').text();
            $("#".concat(id, "-setting-blhxfy-txt")).text(text);
          } else {
            ipt.val(config[key]);
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      $('#blhxfy-setting-modal').addClass('show');
    } else if (type === 'hide') {
      $('#blhxfy-setting-modal').removeClass('show');
    } else if (type === 'language' || type === 'fast-mode') {
      require(['view/setting/index'], function (sett) {
        sett.prototype.onChangePostAsyncInput({
          currentTarget: value.target
        });
      });
    } else {
      if (type === 'trans-api') {
        var _text = $('#trans-api-setting-blhxfy').find('option:selected').text();

        $('#trans-api-setting-blhxfy-txt').text(_text);
      }

      saveToLocalstorage(keyMap.get(type), value);
    }
  };

  var thSetting = throttle_1(setting, 300);

  var papaparse = createCommonjsModule(function (module, exports) {
  /* @license
  Papa Parse
  v4.6.3
  https://github.com/mholt/PapaParse
  License: MIT
  */

  // Polyfills
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray#Polyfill
  if (!Array.isArray)
  {
  	Array.isArray = function(arg) {
  		return Object.prototype.toString.call(arg) === '[object Array]';
  	};
  }

  (function(root, factory)
  {
  	/* globals define */
  	{
  		// Node. Does not work with strict CommonJS, but
  		// only CommonJS-like environments that support module.exports,
  		// like Node.
  		module.exports = factory();
  	}
  }(commonjsGlobal, function()
  {

  	var global = (function() {
  		// alternative method, similar to `Function('return this')()`
  		// but without using `eval` (which is disabled when
  		// using Content Security Policy).

  		if (typeof self !== 'undefined') { return self; }
  		if (typeof window !== 'undefined') { return window; }
  		if (typeof global !== 'undefined') { return global; }

  		// When running tests none of the above have been defined
  		return {};
  	})();

  	var IS_WORKER = !global.document && !!global.postMessage,
  		IS_PAPA_WORKER = IS_WORKER && /(\?|&)papaworker(=|&|$)/.test(global.location.search),
  		LOADED_SYNC = false, AUTO_SCRIPT_PATH;
  	var workers = {}, workerIdCounter = 0;

  	var Papa = {};

  	Papa.parse = CsvToJson;
  	Papa.unparse = JsonToCsv;

  	Papa.RECORD_SEP = String.fromCharCode(30);
  	Papa.UNIT_SEP = String.fromCharCode(31);
  	Papa.BYTE_ORDER_MARK = '\ufeff';
  	Papa.BAD_DELIMITERS = ['\r', '\n', '"', Papa.BYTE_ORDER_MARK];
  	Papa.WORKERS_SUPPORTED = !IS_WORKER && !!global.Worker;
  	Papa.SCRIPT_PATH = null;	// Must be set by your code if you use workers and this lib is loaded asynchronously
  	Papa.NODE_STREAM_INPUT = 1;

  	// Configurable chunk sizes for local and remote files, respectively
  	Papa.LocalChunkSize = 1024 * 1024 * 10;	// 10 MB
  	Papa.RemoteChunkSize = 1024 * 1024 * 5;	// 5 MB
  	Papa.DefaultDelimiter = ',';			// Used if not specified and detection fails

  	// Exposed for testing and development only
  	Papa.Parser = Parser;
  	Papa.ParserHandle = ParserHandle;
  	Papa.NetworkStreamer = NetworkStreamer;
  	Papa.FileStreamer = FileStreamer;
  	Papa.StringStreamer = StringStreamer;
  	Papa.ReadableStreamStreamer = ReadableStreamStreamer;
  	if (typeof PAPA_BROWSER_CONTEXT === 'undefined') {
  		Papa.DuplexStreamStreamer = DuplexStreamStreamer;
  	}

  	if (global.jQuery)
  	{
  		var $ = global.jQuery;
  		$.fn.parse = function(options)
  		{
  			var config = options.config || {};
  			var queue = [];

  			this.each(function(idx)
  			{
  				var supported = $(this).prop('tagName').toUpperCase() === 'INPUT'
  								&& $(this).attr('type').toLowerCase() === 'file'
  								&& global.FileReader;

  				if (!supported || !this.files || this.files.length === 0)
  					return true;	// continue to next input element

  				for (var i = 0; i < this.files.length; i++)
  				{
  					queue.push({
  						file: this.files[i],
  						inputElem: this,
  						instanceConfig: $.extend({}, config)
  					});
  				}
  			});

  			parseNextFile();	// begin parsing
  			return this;		// maintains chainability


  			function parseNextFile()
  			{
  				if (queue.length === 0)
  				{
  					if (isFunction(options.complete))
  						options.complete();
  					return;
  				}

  				var f = queue[0];

  				if (isFunction(options.before))
  				{
  					var returned = options.before(f.file, f.inputElem);

  					if (typeof returned === 'object')
  					{
  						if (returned.action === 'abort')
  						{
  							error('AbortError', f.file, f.inputElem, returned.reason);
  							return;	// Aborts all queued files immediately
  						}
  						else if (returned.action === 'skip')
  						{
  							fileComplete();	// parse the next file in the queue, if any
  							return;
  						}
  						else if (typeof returned.config === 'object')
  							f.instanceConfig = $.extend(f.instanceConfig, returned.config);
  					}
  					else if (returned === 'skip')
  					{
  						fileComplete();	// parse the next file in the queue, if any
  						return;
  					}
  				}

  				// Wrap up the user's complete callback, if any, so that ours also gets executed
  				var userCompleteFunc = f.instanceConfig.complete;
  				f.instanceConfig.complete = function(results)
  				{
  					if (isFunction(userCompleteFunc))
  						userCompleteFunc(results, f.file, f.inputElem);
  					fileComplete();
  				};

  				Papa.parse(f.file, f.instanceConfig);
  			}

  			function error(name, file, elem, reason)
  			{
  				if (isFunction(options.error))
  					options.error({name: name}, file, elem, reason);
  			}

  			function fileComplete()
  			{
  				queue.splice(0, 1);
  				parseNextFile();
  			}
  		};
  	}


  	if (IS_PAPA_WORKER)
  	{
  		global.onmessage = workerThreadReceivedMessage;
  	}
  	else if (Papa.WORKERS_SUPPORTED)
  	{
  		AUTO_SCRIPT_PATH = getScriptPath();

  		// Check if the script was loaded synchronously
  		if (!document.body)
  		{
  			// Body doesn't exist yet, must be synchronous
  			LOADED_SYNC = true;
  		}
  		else
  		{
  			document.addEventListener('DOMContentLoaded', function() {
  				LOADED_SYNC = true;
  			}, true);
  		}
  	}




  	function CsvToJson(_input, _config)
  	{
  		_config = _config || {};
  		var dynamicTyping = _config.dynamicTyping || false;
  		if (isFunction(dynamicTyping)) {
  			_config.dynamicTypingFunction = dynamicTyping;
  			// Will be filled on first row call
  			dynamicTyping = {};
  		}
  		_config.dynamicTyping = dynamicTyping;

  		_config.transform = isFunction(_config.transform) ? _config.transform : false;

  		if (_config.worker && Papa.WORKERS_SUPPORTED)
  		{
  			var w = newWorker();

  			w.userStep = _config.step;
  			w.userChunk = _config.chunk;
  			w.userComplete = _config.complete;
  			w.userError = _config.error;

  			_config.step = isFunction(_config.step);
  			_config.chunk = isFunction(_config.chunk);
  			_config.complete = isFunction(_config.complete);
  			_config.error = isFunction(_config.error);
  			delete _config.worker;	// prevent infinite loop

  			w.postMessage({
  				input: _input,
  				config: _config,
  				workerId: w.id
  			});

  			return;
  		}

  		var streamer = null;
  		if (_input === Papa.NODE_STREAM_INPUT && typeof PAPA_BROWSER_CONTEXT === 'undefined')
  		{
  			// create a node Duplex stream for use
  			// with .pipe
  			streamer = new DuplexStreamStreamer(_config);
  			return streamer.getStream();
  		}
  		else if (typeof _input === 'string')
  		{
  			if (_config.download)
  				streamer = new NetworkStreamer(_config);
  			else
  				streamer = new StringStreamer(_config);
  		}
  		else if (_input.readable === true && isFunction(_input.read) && isFunction(_input.on))
  		{
  			streamer = new ReadableStreamStreamer(_config);
  		}
  		else if ((global.File && _input instanceof File) || _input instanceof Object)	// ...Safari. (see issue #106)
  			streamer = new FileStreamer(_config);

  		return streamer.stream(_input);
  	}






  	function JsonToCsv(_input, _config)
  	{
  		// Default configuration

  		/** whether to surround every datum with quotes */
  		var _quotes = false;

  		/** whether to write headers */
  		var _writeHeader = true;

  		/** delimiting character(s) */
  		var _delimiter = ',';

  		/** newline character(s) */
  		var _newline = '\r\n';

  		/** quote character */
  		var _quoteChar = '"';

  		/** whether to skip empty lines */
  		var _skipEmptyLines = false;

  		unpackConfig();

  		var quoteCharRegex = new RegExp(escapeRegExp(_quoteChar), 'g');

  		if (typeof _input === 'string')
  			_input = JSON.parse(_input);

  		if (Array.isArray(_input))
  		{
  			if (!_input.length || Array.isArray(_input[0]))
  				return serialize(null, _input, _skipEmptyLines);
  			else if (typeof _input[0] === 'object')
  				return serialize(objectKeys(_input[0]), _input, _skipEmptyLines);
  		}
  		else if (typeof _input === 'object')
  		{
  			if (typeof _input.data === 'string')
  				_input.data = JSON.parse(_input.data);

  			if (Array.isArray(_input.data))
  			{
  				if (!_input.fields)
  					_input.fields =  _input.meta && _input.meta.fields;

  				if (!_input.fields)
  					_input.fields =  Array.isArray(_input.data[0])
  						? _input.fields
  						: objectKeys(_input.data[0]);

  				if (!(Array.isArray(_input.data[0])) && typeof _input.data[0] !== 'object')
  					_input.data = [_input.data];	// handles input like [1,2,3] or ['asdf']
  			}

  			return serialize(_input.fields || [], _input.data || [], _skipEmptyLines);
  		}

  		// Default (any valid paths should return before this)
  		throw 'exception: Unable to serialize unrecognized input';


  		function unpackConfig()
  		{
  			if (typeof _config !== 'object')
  				return;

  			if (typeof _config.delimiter === 'string'
                  && !Papa.BAD_DELIMITERS.filter(function(value) { return _config.delimiter.indexOf(value) !== -1; }).length)
  			{
  				_delimiter = _config.delimiter;
  			}

  			if (typeof _config.quotes === 'boolean'
  				|| Array.isArray(_config.quotes))
  				_quotes = _config.quotes;

  			if (typeof _config.skipEmptyLines === 'boolean'
  				|| typeof _config.skipEmptyLines === 'string')
  				_skipEmptyLines = _config.skipEmptyLines;

  			if (typeof _config.newline === 'string')
  				_newline = _config.newline;

  			if (typeof _config.quoteChar === 'string')
  				_quoteChar = _config.quoteChar;

  			if (typeof _config.header === 'boolean')
  				_writeHeader = _config.header;
  		}


  		/** Turns an object's keys into an array */
  		function objectKeys(obj)
  		{
  			if (typeof obj !== 'object')
  				return [];
  			var keys = [];
  			for (var key in obj)
  				keys.push(key);
  			return keys;
  		}

  		/** The double for loop that iterates the data and writes out a CSV string including header row */
  		function serialize(fields, data, skipEmptyLines)
  		{
  			var csv = '';

  			if (typeof fields === 'string')
  				fields = JSON.parse(fields);
  			if (typeof data === 'string')
  				data = JSON.parse(data);

  			var hasHeader = Array.isArray(fields) && fields.length > 0;
  			var dataKeyedByField = !(Array.isArray(data[0]));

  			// If there a header row, write it first
  			if (hasHeader && _writeHeader)
  			{
  				for (var i = 0; i < fields.length; i++)
  				{
  					if (i > 0)
  						csv += _delimiter;
  					csv += safe(fields[i], i);
  				}
  				if (data.length > 0)
  					csv += _newline;
  			}

  			// Then write out the data
  			for (var row = 0; row < data.length; row++)
  			{
  				var maxCol = hasHeader ? fields.length : data[row].length;

  				var emptyLine = false;
  				var nullLine = hasHeader ? Object.keys(data[row]).length === 0 : data[row].length === 0;
  				if (skipEmptyLines && !hasHeader)
  				{
  					emptyLine = skipEmptyLines === 'greedy' ? data[row].join('').trim() === '' : data[row].length === 1 && data[row][0].length === 0;
  				}
  				if (skipEmptyLines === 'greedy' && hasHeader) {
  					var line = [];
  					for (var c = 0; c < maxCol; c++) {
  						var cx = dataKeyedByField ? fields[c] : c;
  						line.push(data[row][cx]);
  					}
  					emptyLine = line.join('').trim() === '';
  				}
  				if (!emptyLine)
  				{
  					for (var col = 0; col < maxCol; col++)
  					{
  						if (col > 0 && !nullLine)
  							csv += _delimiter;
  						var colIdx = hasHeader && dataKeyedByField ? fields[col] : col;
  						csv += safe(data[row][colIdx], col);
  					}
  					if (row < data.length - 1 && (!skipEmptyLines || (maxCol > 0 && !nullLine)))
  					{
  						csv += _newline;
  					}
  				}
  			}
  			return csv;
  		}

  		/** Encloses a value around quotes if needed (makes a value safe for CSV insertion) */
  		function safe(str, col)
  		{
  			if (typeof str === 'undefined' || str === null)
  				return '';

  			if (str.constructor === Date)
  				return JSON.stringify(str).slice(1, 25);

  			str = str.toString().replace(quoteCharRegex, _quoteChar + _quoteChar);

  			var needsQuotes = (typeof _quotes === 'boolean' && _quotes)
  							|| (Array.isArray(_quotes) && _quotes[col])
  							|| hasAny(str, Papa.BAD_DELIMITERS)
  							|| str.indexOf(_delimiter) > -1
  							|| str.charAt(0) === ' '
  							|| str.charAt(str.length - 1) === ' ';

  			return needsQuotes ? _quoteChar + str + _quoteChar : str;
  		}

  		function hasAny(str, substrings)
  		{
  			for (var i = 0; i < substrings.length; i++)
  				if (str.indexOf(substrings[i]) > -1)
  					return true;
  			return false;
  		}
  	}

  	/** ChunkStreamer is the base prototype for various streamer implementations. */
  	function ChunkStreamer(config)
  	{
  		this._handle = null;
  		this._finished = false;
  		this._completed = false;
  		this._input = null;
  		this._baseIndex = 0;
  		this._partialLine = '';
  		this._rowCount = 0;
  		this._start = 0;
  		this._nextChunk = null;
  		this.isFirstChunk = true;
  		this._completeResults = {
  			data: [],
  			errors: [],
  			meta: {}
  		};
  		replaceConfig.call(this, config);

  		this.parseChunk = function(chunk, isFakeChunk)
  		{
  			// First chunk pre-processing
  			if (this.isFirstChunk && isFunction(this._config.beforeFirstChunk))
  			{
  				var modifiedChunk = this._config.beforeFirstChunk(chunk);
  				if (modifiedChunk !== undefined)
  					chunk = modifiedChunk;
  			}
  			this.isFirstChunk = false;

  			// Rejoin the line we likely just split in two by chunking the file
  			var aggregate = this._partialLine + chunk;
  			this._partialLine = '';

  			var results = this._handle.parse(aggregate, this._baseIndex, !this._finished);

  			if (this._handle.paused() || this._handle.aborted())
  				return;

  			var lastIndex = results.meta.cursor;

  			if (!this._finished)
  			{
  				this._partialLine = aggregate.substring(lastIndex - this._baseIndex);
  				this._baseIndex = lastIndex;
  			}

  			if (results && results.data)
  				this._rowCount += results.data.length;

  			var finishedIncludingPreview = this._finished || (this._config.preview && this._rowCount >= this._config.preview);

  			if (IS_PAPA_WORKER)
  			{
  				global.postMessage({
  					results: results,
  					workerId: Papa.WORKER_ID,
  					finished: finishedIncludingPreview
  				});
  			}
  			else if (isFunction(this._config.chunk) && !isFakeChunk)
  			{
  				this._config.chunk(results, this._handle);
  				if (this._handle.paused() || this._handle.aborted())
  					return;
  				results = undefined;
  				this._completeResults = undefined;
  			}

  			if (!this._config.step && !this._config.chunk) {
  				this._completeResults.data = this._completeResults.data.concat(results.data);
  				this._completeResults.errors = this._completeResults.errors.concat(results.errors);
  				this._completeResults.meta = results.meta;
  			}

  			if (!this._completed && finishedIncludingPreview && isFunction(this._config.complete) && (!results || !results.meta.aborted)) {
  				this._config.complete(this._completeResults, this._input);
  				this._completed = true;
  			}

  			if (!finishedIncludingPreview && (!results || !results.meta.paused))
  				this._nextChunk();

  			return results;
  		};

  		this._sendError = function(error)
  		{
  			if (isFunction(this._config.error))
  				this._config.error(error);
  			else if (IS_PAPA_WORKER && this._config.error)
  			{
  				global.postMessage({
  					workerId: Papa.WORKER_ID,
  					error: error,
  					finished: false
  				});
  			}
  		};

  		function replaceConfig(config)
  		{
  			// Deep-copy the config so we can edit it
  			var configCopy = copy(config);
  			configCopy.chunkSize = parseInt(configCopy.chunkSize);	// parseInt VERY important so we don't concatenate strings!
  			if (!config.step && !config.chunk)
  				configCopy.chunkSize = null;  // disable Range header if not streaming; bad values break IIS - see issue #196
  			this._handle = new ParserHandle(configCopy);
  			this._handle.streamer = this;
  			this._config = configCopy;	// persist the copy to the caller
  		}
  	}


  	function NetworkStreamer(config)
  	{
  		config = config || {};
  		if (!config.chunkSize)
  			config.chunkSize = Papa.RemoteChunkSize;
  		ChunkStreamer.call(this, config);

  		var xhr;

  		if (IS_WORKER)
  		{
  			this._nextChunk = function()
  			{
  				this._readChunk();
  				this._chunkLoaded();
  			};
  		}
  		else
  		{
  			this._nextChunk = function()
  			{
  				this._readChunk();
  			};
  		}

  		this.stream = function(url)
  		{
  			this._input = url;
  			this._nextChunk();	// Starts streaming
  		};

  		this._readChunk = function()
  		{
  			if (this._finished)
  			{
  				this._chunkLoaded();
  				return;
  			}

  			xhr = new XMLHttpRequest();

  			if (this._config.withCredentials)
  			{
  				xhr.withCredentials = this._config.withCredentials;
  			}

  			if (!IS_WORKER)
  			{
  				xhr.onload = bindFunction(this._chunkLoaded, this);
  				xhr.onerror = bindFunction(this._chunkError, this);
  			}

  			xhr.open('GET', this._input, !IS_WORKER);
  			// Headers can only be set when once the request state is OPENED
  			if (this._config.downloadRequestHeaders)
  			{
  				var headers = this._config.downloadRequestHeaders;

  				for (var headerName in headers)
  				{
  					xhr.setRequestHeader(headerName, headers[headerName]);
  				}
  			}

  			if (this._config.chunkSize)
  			{
  				var end = this._start + this._config.chunkSize - 1;	// minus one because byte range is inclusive
  				xhr.setRequestHeader('Range', 'bytes=' + this._start + '-' + end);
  				xhr.setRequestHeader('If-None-Match', 'webkit-no-cache'); // https://bugs.webkit.org/show_bug.cgi?id=82672
  			}

  			try {
  				xhr.send();
  			}
  			catch (err) {
  				this._chunkError(err.message);
  			}

  			if (IS_WORKER && xhr.status === 0)
  				this._chunkError();
  			else
  				this._start += this._config.chunkSize;
  		};

  		this._chunkLoaded = function()
  		{
  			if (xhr.readyState !== 4)
  				return;

  			if (xhr.status < 200 || xhr.status >= 400)
  			{
  				this._chunkError();
  				return;
  			}

  			this._finished = !this._config.chunkSize || this._start > getFileSize(xhr);
  			this.parseChunk(xhr.responseText);
  		};

  		this._chunkError = function(errorMessage)
  		{
  			var errorText = xhr.statusText || errorMessage;
  			this._sendError(new Error(errorText));
  		};

  		function getFileSize(xhr)
  		{
  			var contentRange = xhr.getResponseHeader('Content-Range');
  			if (contentRange === null) { // no content range, then finish!
  				return -1;
  			}
  			return parseInt(contentRange.substr(contentRange.lastIndexOf('/') + 1));
  		}
  	}
  	NetworkStreamer.prototype = Object.create(ChunkStreamer.prototype);
  	NetworkStreamer.prototype.constructor = NetworkStreamer;


  	function FileStreamer(config)
  	{
  		config = config || {};
  		if (!config.chunkSize)
  			config.chunkSize = Papa.LocalChunkSize;
  		ChunkStreamer.call(this, config);

  		var reader, slice;

  		// FileReader is better than FileReaderSync (even in worker) - see http://stackoverflow.com/q/24708649/1048862
  		// But Firefox is a pill, too - see issue #76: https://github.com/mholt/PapaParse/issues/76
  		var usingAsyncReader = typeof FileReader !== 'undefined';	// Safari doesn't consider it a function - see issue #105

  		this.stream = function(file)
  		{
  			this._input = file;
  			slice = file.slice || file.webkitSlice || file.mozSlice;

  			if (usingAsyncReader)
  			{
  				reader = new FileReader();		// Preferred method of reading files, even in workers
  				reader.onload = bindFunction(this._chunkLoaded, this);
  				reader.onerror = bindFunction(this._chunkError, this);
  			}
  			else
  				reader = new FileReaderSync();	// Hack for running in a web worker in Firefox

  			this._nextChunk();	// Starts streaming
  		};

  		this._nextChunk = function()
  		{
  			if (!this._finished && (!this._config.preview || this._rowCount < this._config.preview))
  				this._readChunk();
  		};

  		this._readChunk = function()
  		{
  			var input = this._input;
  			if (this._config.chunkSize)
  			{
  				var end = Math.min(this._start + this._config.chunkSize, this._input.size);
  				input = slice.call(input, this._start, end);
  			}
  			var txt = reader.readAsText(input, this._config.encoding);
  			if (!usingAsyncReader)
  				this._chunkLoaded({ target: { result: txt } });	// mimic the async signature
  		};

  		this._chunkLoaded = function(event)
  		{
  			// Very important to increment start each time before handling results
  			this._start += this._config.chunkSize;
  			this._finished = !this._config.chunkSize || this._start >= this._input.size;
  			this.parseChunk(event.target.result);
  		};

  		this._chunkError = function()
  		{
  			this._sendError(reader.error);
  		};

  	}
  	FileStreamer.prototype = Object.create(ChunkStreamer.prototype);
  	FileStreamer.prototype.constructor = FileStreamer;


  	function StringStreamer(config)
  	{
  		config = config || {};
  		ChunkStreamer.call(this, config);

  		var remaining;
  		this.stream = function(s)
  		{
  			remaining = s;
  			return this._nextChunk();
  		};
  		this._nextChunk = function()
  		{
  			if (this._finished) return;
  			var size = this._config.chunkSize;
  			var chunk = size ? remaining.substr(0, size) : remaining;
  			remaining = size ? remaining.substr(size) : '';
  			this._finished = !remaining;
  			return this.parseChunk(chunk);
  		};
  	}
  	StringStreamer.prototype = Object.create(StringStreamer.prototype);
  	StringStreamer.prototype.constructor = StringStreamer;


  	function ReadableStreamStreamer(config)
  	{
  		config = config || {};

  		ChunkStreamer.call(this, config);

  		var queue = [];
  		var parseOnData = true;
  		var streamHasEnded = false;

  		this.pause = function()
  		{
  			ChunkStreamer.prototype.pause.apply(this, arguments);
  			this._input.pause();
  		};

  		this.resume = function()
  		{
  			ChunkStreamer.prototype.resume.apply(this, arguments);
  			this._input.resume();
  		};

  		this.stream = function(stream)
  		{
  			this._input = stream;

  			this._input.on('data', this._streamData);
  			this._input.on('end', this._streamEnd);
  			this._input.on('error', this._streamError);
  		};

  		this._checkIsFinished = function()
  		{
  			if (streamHasEnded && queue.length === 1) {
  				this._finished = true;
  			}
  		};

  		this._nextChunk = function()
  		{
  			this._checkIsFinished();
  			if (queue.length)
  			{
  				this.parseChunk(queue.shift());
  			}
  			else
  			{
  				parseOnData = true;
  			}
  		};

  		this._streamData = bindFunction(function(chunk)
  		{
  			try
  			{
  				queue.push(typeof chunk === 'string' ? chunk : chunk.toString(this._config.encoding));

  				if (parseOnData)
  				{
  					parseOnData = false;
  					this._checkIsFinished();
  					this.parseChunk(queue.shift());
  				}
  			}
  			catch (error)
  			{
  				this._streamError(error);
  			}
  		}, this);

  		this._streamError = bindFunction(function(error)
  		{
  			this._streamCleanUp();
  			this._sendError(error);
  		}, this);

  		this._streamEnd = bindFunction(function()
  		{
  			this._streamCleanUp();
  			streamHasEnded = true;
  			this._streamData('');
  		}, this);

  		this._streamCleanUp = bindFunction(function()
  		{
  			this._input.removeListener('data', this._streamData);
  			this._input.removeListener('end', this._streamEnd);
  			this._input.removeListener('error', this._streamError);
  		}, this);
  	}
  	ReadableStreamStreamer.prototype = Object.create(ChunkStreamer.prototype);
  	ReadableStreamStreamer.prototype.constructor = ReadableStreamStreamer;


  	function DuplexStreamStreamer(_config) {
  		var Duplex = require('stream').Duplex;
  		var config = copy(_config);
  		var parseOnWrite = true;
  		var writeStreamHasFinished = false;
  		var parseCallbackQueue = [];
  		var stream = null;

  		this._onCsvData = function(results)
  		{
  			var data = results.data;
  			for (var i = 0; i < data.length; i++) {
  				if (!stream.push(data[i]) && !this._handle.paused()) {
  					// the writeable consumer buffer has filled up
  					// so we need to pause until more items
  					// can be processed
  					this._handle.pause();
  				}
  			}
  		};

  		this._onCsvComplete = function()
  		{
  			// node will finish the read stream when
  			// null is pushed
  			stream.push(null);
  		};

  		config.step = bindFunction(this._onCsvData, this);
  		config.complete = bindFunction(this._onCsvComplete, this);
  		ChunkStreamer.call(this, config);

  		this._nextChunk = function()
  		{
  			if (writeStreamHasFinished && parseCallbackQueue.length === 1) {
  				this._finished = true;
  			}
  			if (parseCallbackQueue.length) {
  				parseCallbackQueue.shift()();
  			} else {
  				parseOnWrite = true;
  			}
  		};

  		this._addToParseQueue = function(chunk, callback)
  		{
  			// add to queue so that we can indicate
  			// completion via callback
  			// node will automatically pause the incoming stream
  			// when too many items have been added without their
  			// callback being invoked
  			parseCallbackQueue.push(bindFunction(function() {
  				this.parseChunk(typeof chunk === 'string' ? chunk : chunk.toString(config.encoding));
  				if (isFunction(callback)) {
  					return callback();
  				}
  			}, this));
  			if (parseOnWrite) {
  				parseOnWrite = false;
  				this._nextChunk();
  			}
  		};

  		this._onRead = function()
  		{
  			if (this._handle.paused()) {
  				// the writeable consumer can handle more data
  				// so resume the chunk parsing
  				this._handle.resume();
  			}
  		};

  		this._onWrite = function(chunk, encoding, callback)
  		{
  			this._addToParseQueue(chunk, callback);
  		};

  		this._onWriteComplete = function()
  		{
  			writeStreamHasFinished = true;
  			// have to write empty string
  			// so parser knows its done
  			this._addToParseQueue('');
  		};

  		this.getStream = function()
  		{
  			return stream;
  		};
  		stream = new Duplex({
  			readableObjectMode: true,
  			decodeStrings: false,
  			read: bindFunction(this._onRead, this),
  			write: bindFunction(this._onWrite, this)
  		});
  		stream.once('finish', bindFunction(this._onWriteComplete, this));
  	}
  	if (typeof PAPA_BROWSER_CONTEXT === 'undefined') {
  		DuplexStreamStreamer.prototype = Object.create(ChunkStreamer.prototype);
  		DuplexStreamStreamer.prototype.constructor = DuplexStreamStreamer;
  	}


  	// Use one ParserHandle per entire CSV file or string
  	function ParserHandle(_config)
  	{
  		// One goal is to minimize the use of regular expressions...
  		var FLOAT = /^\s*-?(\d*\.?\d+|\d+\.?\d*)(e[-+]?\d+)?\s*$/i;
  		var ISO_DATE = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/;

  		var self = this;
  		var _stepCounter = 0;	// Number of times step was called (number of rows parsed)
  		var _rowCounter = 0;	// Number of rows that have been parsed so far
  		var _input;				// The input being parsed
  		var _parser;			// The core parser being used
  		var _paused = false;	// Whether we are paused or not
  		var _aborted = false;	// Whether the parser has aborted or not
  		var _delimiterError;	// Temporary state between delimiter detection and processing results
  		var _fields = [];		// Fields are from the header row of the input, if there is one
  		var _results = {		// The last results returned from the parser
  			data: [],
  			errors: [],
  			meta: {}
  		};

  		if (isFunction(_config.step))
  		{
  			var userStep = _config.step;
  			_config.step = function(results)
  			{
  				_results = results;

  				if (needsHeaderRow())
  					processResults();
  				else	// only call user's step function after header row
  				{
  					processResults();

  					// It's possbile that this line was empty and there's no row here after all
  					if (_results.data.length === 0)
  						return;

  					_stepCounter += results.data.length;
  					if (_config.preview && _stepCounter > _config.preview)
  						_parser.abort();
  					else
  						userStep(_results, self);
  				}
  			};
  		}

  		/**
  		 * Parses input. Most users won't need, and shouldn't mess with, the baseIndex
  		 * and ignoreLastRow parameters. They are used by streamers (wrapper functions)
  		 * when an input comes in multiple chunks, like from a file.
  		 */
  		this.parse = function(input, baseIndex, ignoreLastRow)
  		{
  			var quoteChar = _config.quoteChar || '"';
  			if (!_config.newline)
  				_config.newline = guessLineEndings(input, quoteChar);

  			_delimiterError = false;
  			if (!_config.delimiter)
  			{
  				var delimGuess = guessDelimiter(input, _config.newline, _config.skipEmptyLines, _config.comments);
  				if (delimGuess.successful)
  					_config.delimiter = delimGuess.bestDelimiter;
  				else
  				{
  					_delimiterError = true;	// add error after parsing (otherwise it would be overwritten)
  					_config.delimiter = Papa.DefaultDelimiter;
  				}
  				_results.meta.delimiter = _config.delimiter;
  			}
  			else if(isFunction(_config.delimiter))
  			{
  				_config.delimiter = _config.delimiter(input);
  				_results.meta.delimiter = _config.delimiter;
  			}

  			var parserConfig = copy(_config);
  			if (_config.preview && _config.header)
  				parserConfig.preview++;	// to compensate for header row

  			_input = input;
  			_parser = new Parser(parserConfig);
  			_results = _parser.parse(_input, baseIndex, ignoreLastRow);
  			processResults();
  			return _paused ? { meta: { paused: true } } : (_results || { meta: { paused: false } });
  		};

  		this.paused = function()
  		{
  			return _paused;
  		};

  		this.pause = function()
  		{
  			_paused = true;
  			_parser.abort();
  			_input = _input.substr(_parser.getCharIndex());
  		};

  		this.resume = function()
  		{
  			_paused = false;
  			self.streamer.parseChunk(_input, true);
  		};

  		this.aborted = function()
  		{
  			return _aborted;
  		};

  		this.abort = function()
  		{
  			_aborted = true;
  			_parser.abort();
  			_results.meta.aborted = true;
  			if (isFunction(_config.complete))
  				_config.complete(_results);
  			_input = '';
  		};

  		function testEmptyLine(s) {
  			return _config.skipEmptyLines === 'greedy' ? s.join('').trim() === '' : s.length === 1 && s[0].length === 0;
  		}

  		function processResults()
  		{
  			if (_results && _delimiterError)
  			{
  				addError('Delimiter', 'UndetectableDelimiter', 'Unable to auto-detect delimiting character; defaulted to \'' + Papa.DefaultDelimiter + '\'');
  				_delimiterError = false;
  			}

  			if (_config.skipEmptyLines)
  			{
  				for (var i = 0; i < _results.data.length; i++)
  					if (testEmptyLine(_results.data[i]))
  						_results.data.splice(i--, 1);
  			}

  			if (needsHeaderRow())
  				fillHeaderFields();

  			return applyHeaderAndDynamicTypingAndTransformation();
  		}

  		function needsHeaderRow()
  		{
  			return _config.header && _fields.length === 0;
  		}

  		function fillHeaderFields()
  		{
  			if (!_results)
  				return;
  			for (var i = 0; needsHeaderRow() && i < _results.data.length; i++)
  				for (var j = 0; j < _results.data[i].length; j++)
  				{
  					var header = _results.data[i][j];

  					if (_config.trimHeaders) {
  						header = header.trim();
  					}

  					_fields.push(header);
  				}
  			_results.data.splice(0, 1);
  		}

  		function shouldApplyDynamicTyping(field) {
  			// Cache function values to avoid calling it for each row
  			if (_config.dynamicTypingFunction && _config.dynamicTyping[field] === undefined) {
  				_config.dynamicTyping[field] = _config.dynamicTypingFunction(field);
  			}
  			return (_config.dynamicTyping[field] || _config.dynamicTyping) === true;
  		}

  		function parseDynamic(field, value)
  		{
  			if (shouldApplyDynamicTyping(field))
  			{
  				if (value === 'true' || value === 'TRUE')
  					return true;
  				else if (value === 'false' || value === 'FALSE')
  					return false;
  				else if (FLOAT.test(value))
  					return parseFloat(value);
  				else if (ISO_DATE.test(value))
  					return new Date(value);
  				else
  					return (value === '' ? null : value);
  			}
  			return value;
  		}

  		function applyHeaderAndDynamicTypingAndTransformation()
  		{
  			if (!_results || (!_config.header && !_config.dynamicTyping && !_config.transform))
  				return _results;

  			for (var i = 0; i < _results.data.length; i++)
  			{
  				var row = _config.header ? {} : [];

  				var j;
  				for (j = 0; j < _results.data[i].length; j++)
  				{
  					var field = j;
  					var value = _results.data[i][j];

  					if (_config.header)
  						field = j >= _fields.length ? '__parsed_extra' : _fields[j];

  					if (_config.transform)
  						value = _config.transform(value,field);

  					value = parseDynamic(field, value);

  					if (field === '__parsed_extra')
  					{
  						row[field] = row[field] || [];
  						row[field].push(value);
  					}
  					else
  						row[field] = value;
  				}

  				_results.data[i] = row;

  				if (_config.header)
  				{
  					if (j > _fields.length)
  						addError('FieldMismatch', 'TooManyFields', 'Too many fields: expected ' + _fields.length + ' fields but parsed ' + j, _rowCounter + i);
  					else if (j < _fields.length)
  						addError('FieldMismatch', 'TooFewFields', 'Too few fields: expected ' + _fields.length + ' fields but parsed ' + j, _rowCounter + i);
  				}
  			}

  			if (_config.header && _results.meta)
  				_results.meta.fields = _fields;

  			_rowCounter += _results.data.length;
  			return _results;
  		}

  		function guessDelimiter(input, newline, skipEmptyLines, comments)
  		{
  			var delimChoices = [',', '\t', '|', ';', Papa.RECORD_SEP, Papa.UNIT_SEP];
  			var bestDelim, bestDelta, fieldCountPrevRow;

  			for (var i = 0; i < delimChoices.length; i++)
  			{
  				var delim = delimChoices[i];
  				var delta = 0, avgFieldCount = 0, emptyLinesCount = 0;
  				fieldCountPrevRow = undefined;

  				var preview = new Parser({
  					comments: comments,
  					delimiter: delim,
  					newline: newline,
  					preview: 10
  				}).parse(input);

  				for (var j = 0; j < preview.data.length; j++)
  				{
  					if (skipEmptyLines && testEmptyLine(preview.data[j]))
  					{
  						emptyLinesCount++;
  						continue;
  					}
  					var fieldCount = preview.data[j].length;
  					avgFieldCount += fieldCount;

  					if (typeof fieldCountPrevRow === 'undefined')
  					{
  						fieldCountPrevRow = 0;
  						continue;
  					}
  					else if (fieldCount > 1)
  					{
  						delta += Math.abs(fieldCount - fieldCountPrevRow);
  						fieldCountPrevRow = fieldCount;
  					}
  				}

  				if (preview.data.length > 0)
  					avgFieldCount /= (preview.data.length - emptyLinesCount);

  				if ((typeof bestDelta === 'undefined' || delta > bestDelta)
  					&& avgFieldCount > 1.99)
  				{
  					bestDelta = delta;
  					bestDelim = delim;
  				}
  			}

  			_config.delimiter = bestDelim;

  			return {
  				successful: !!bestDelim,
  				bestDelimiter: bestDelim
  			};
  		}

  		function guessLineEndings(input, quoteChar)
  		{
  			input = input.substr(0, 1024 * 1024);	// max length 1 MB
  			// Replace all the text inside quotes
  			var re = new RegExp(escapeRegExp(quoteChar) + '([^]*?)' + escapeRegExp(quoteChar), 'gm');
  			input = input.replace(re, '');

  			var r = input.split('\r');

  			var n = input.split('\n');

  			var nAppearsFirst = (n.length > 1 && n[0].length < r[0].length);

  			if (r.length === 1 || nAppearsFirst)
  				return '\n';

  			var numWithN = 0;
  			for (var i = 0; i < r.length; i++)
  			{
  				if (r[i][0] === '\n')
  					numWithN++;
  			}

  			return numWithN >= r.length / 2 ? '\r\n' : '\r';
  		}

  		function addError(type, code, msg, row)
  		{
  			_results.errors.push({
  				type: type,
  				code: code,
  				message: msg,
  				row: row
  			});
  		}
  	}

  	/** https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions */
  	function escapeRegExp(string)
  	{
  		return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  	}

  	/** The core parser implements speedy and correct CSV parsing */
  	function Parser(config)
  	{
  		// Unpack the config object
  		config = config || {};
  		var delim = config.delimiter;
  		var newline = config.newline;
  		var comments = config.comments;
  		var step = config.step;
  		var preview = config.preview;
  		var fastMode = config.fastMode;
  		var quoteChar;
  		/** Allows for no quoteChar by setting quoteChar to undefined in config */
  		if (config.quoteChar === undefined) {
  			quoteChar = '"';
  		} else {
  			quoteChar = config.quoteChar;
  		}
  		var escapeChar = quoteChar;
  		if (config.escapeChar !== undefined) {
  			escapeChar = config.escapeChar;
  		}

  		// Delimiter must be valid
  		if (typeof delim !== 'string'
  			|| Papa.BAD_DELIMITERS.indexOf(delim) > -1)
  			delim = ',';

  		// Comment character must be valid
  		if (comments === delim)
  			throw 'Comment character same as delimiter';
  		else if (comments === true)
  			comments = '#';
  		else if (typeof comments !== 'string'
  			|| Papa.BAD_DELIMITERS.indexOf(comments) > -1)
  			comments = false;

  		// Newline must be valid: \r, \n, or \r\n
  		if (newline !== '\n' && newline !== '\r' && newline !== '\r\n')
  			newline = '\n';

  		// We're gonna need these at the Parser scope
  		var cursor = 0;
  		var aborted = false;

  		this.parse = function(input, baseIndex, ignoreLastRow)
  		{
  			// For some reason, in Chrome, this speeds things up (!?)
  			if (typeof input !== 'string')
  				throw 'Input must be a string';

  			// We don't need to compute some of these every time parse() is called,
  			// but having them in a more local scope seems to perform better
  			var inputLen = input.length,
  				delimLen = delim.length,
  				newlineLen = newline.length,
  				commentsLen = comments.length;
  			var stepIsFunction = isFunction(step);

  			// Establish starting state
  			cursor = 0;
  			var data = [], errors = [], row = [], lastCursor = 0;

  			if (!input)
  				return returnable();

  			if (fastMode || (fastMode !== false && input.indexOf(quoteChar) === -1))
  			{
  				var rows = input.split(newline);
  				for (var i = 0; i < rows.length; i++)
  				{
  					row = rows[i];
  					cursor += row.length;
  					if (i !== rows.length - 1)
  						cursor += newline.length;
  					else if (ignoreLastRow)
  						return returnable();
  					if (comments && row.substr(0, commentsLen) === comments)
  						continue;
  					if (stepIsFunction)
  					{
  						data = [];
  						pushRow(row.split(delim));
  						doStep();
  						if (aborted)
  							return returnable();
  					}
  					else
  						pushRow(row.split(delim));
  					if (preview && i >= preview)
  					{
  						data = data.slice(0, preview);
  						return returnable(true);
  					}
  				}
  				return returnable();
  			}

  			var nextDelim = input.indexOf(delim, cursor);
  			var nextNewline = input.indexOf(newline, cursor);
  			var quoteCharRegex = new RegExp(escapeRegExp(escapeChar) + escapeRegExp(quoteChar), 'g');
  			var quoteSearch;

  			// Parser loop
  			for (;;)
  			{
  				// Field has opening quote
  				if (input[cursor] === quoteChar)
  				{
  					// Start our search for the closing quote where the cursor is
  					quoteSearch = cursor;

  					// Skip the opening quote
  					cursor++;

  					for (;;)
  					{
  						// Find closing quote
  						quoteSearch = input.indexOf(quoteChar, quoteSearch + 1);

  						//No other quotes are found - no other delimiters
  						if (quoteSearch === -1)
  						{
  							if (!ignoreLastRow) {
  								// No closing quote... what a pity
  								errors.push({
  									type: 'Quotes',
  									code: 'MissingQuotes',
  									message: 'Quoted field unterminated',
  									row: data.length,	// row has yet to be inserted
  									index: cursor
  								});
  							}
  							return finish();
  						}

  						// Closing quote at EOF
  						if (quoteSearch === inputLen - 1)
  						{
  							var value = input.substring(cursor, quoteSearch).replace(quoteCharRegex, quoteChar);
  							return finish(value);
  						}

  						// If this quote is escaped, it's part of the data; skip it
  						// If the quote character is the escape character, then check if the next character is the escape character
  						if (quoteChar === escapeChar &&  input[quoteSearch + 1] === escapeChar)
  						{
  							quoteSearch++;
  							continue;
  						}

  						// If the quote character is not the escape character, then check if the previous character was the escape character
  						if (quoteChar !== escapeChar && quoteSearch !== 0 && input[quoteSearch - 1] === escapeChar)
  						{
  							continue;
  						}

  						// Check up to nextDelim or nextNewline, whichever is closest
  						var checkUpTo = nextNewline === -1 ? nextDelim : Math.min(nextDelim, nextNewline);
  						var spacesBetweenQuoteAndDelimiter = extraSpaces(checkUpTo);

  						// Closing quote followed by delimiter or 'unnecessary spaces + delimiter'
  						if (input[quoteSearch + 1 + spacesBetweenQuoteAndDelimiter] === delim)
  						{
  							row.push(input.substring(cursor, quoteSearch).replace(quoteCharRegex, quoteChar));
  							cursor = quoteSearch + 1 + spacesBetweenQuoteAndDelimiter + delimLen;
  							nextDelim = input.indexOf(delim, cursor);
  							nextNewline = input.indexOf(newline, cursor);
  							break;
  						}

  						var spacesBetweenQuoteAndNewLine = extraSpaces(nextNewline);

  						// Closing quote followed by newline or 'unnecessary spaces + newLine'
  						if (input.substr(quoteSearch + 1 + spacesBetweenQuoteAndNewLine, newlineLen) === newline)
  						{
  							row.push(input.substring(cursor, quoteSearch).replace(quoteCharRegex, quoteChar));
  							saveRow(quoteSearch + 1 + spacesBetweenQuoteAndNewLine + newlineLen);
  							nextDelim = input.indexOf(delim, cursor);	// because we may have skipped the nextDelim in the quoted field

  							if (stepIsFunction)
  							{
  								doStep();
  								if (aborted)
  									return returnable();
  							}

  							if (preview && data.length >= preview)
  								return returnable(true);

  							break;
  						}


  						// Checks for valid closing quotes are complete (escaped quotes or quote followed by EOF/delimiter/newline) -- assume these quotes are part of an invalid text string
  						errors.push({
  							type: 'Quotes',
  							code: 'InvalidQuotes',
  							message: 'Trailing quote on quoted field is malformed',
  							row: data.length,	// row has yet to be inserted
  							index: cursor
  						});

  						quoteSearch++;
  						continue;

  					}

  					continue;
  				}

  				// Comment found at start of new line
  				if (comments && row.length === 0 && input.substr(cursor, commentsLen) === comments)
  				{
  					if (nextNewline === -1)	// Comment ends at EOF
  						return returnable();
  					cursor = nextNewline + newlineLen;
  					nextNewline = input.indexOf(newline, cursor);
  					nextDelim = input.indexOf(delim, cursor);
  					continue;
  				}

  				// Next delimiter comes before next newline, so we've reached end of field
  				if (nextDelim !== -1 && (nextDelim < nextNewline || nextNewline === -1))
  				{
  					row.push(input.substring(cursor, nextDelim));
  					cursor = nextDelim + delimLen;
  					nextDelim = input.indexOf(delim, cursor);
  					continue;
  				}

  				// End of row
  				if (nextNewline !== -1)
  				{
  					row.push(input.substring(cursor, nextNewline));
  					saveRow(nextNewline + newlineLen);

  					if (stepIsFunction)
  					{
  						doStep();
  						if (aborted)
  							return returnable();
  					}

  					if (preview && data.length >= preview)
  						return returnable(true);

  					continue;
  				}

  				break;
  			}


  			return finish();


  			function pushRow(row)
  			{
  				data.push(row);
  				lastCursor = cursor;
  			}

  			/**
               * checks if there are extra spaces after closing quote and given index without any text
               * if Yes, returns the number of spaces
               */
  			function extraSpaces(index) {
  				var spaceLength = 0;
  				if (index !== -1) {
  					var textBetweenClosingQuoteAndIndex = input.substring(quoteSearch + 1, index);
  					if (textBetweenClosingQuoteAndIndex && textBetweenClosingQuoteAndIndex.trim() === '') {
  						spaceLength = textBetweenClosingQuoteAndIndex.length;
  					}
  				}
  				return spaceLength;
  			}

  			/**
  			 * Appends the remaining input from cursor to the end into
  			 * row, saves the row, calls step, and returns the results.
  			 */
  			function finish(value)
  			{
  				if (ignoreLastRow)
  					return returnable();
  				if (typeof value === 'undefined')
  					value = input.substr(cursor);
  				row.push(value);
  				cursor = inputLen;	// important in case parsing is paused
  				pushRow(row);
  				if (stepIsFunction)
  					doStep();
  				return returnable();
  			}

  			/**
  			 * Appends the current row to the results. It sets the cursor
  			 * to newCursor and finds the nextNewline. The caller should
  			 * take care to execute user's step function and check for
  			 * preview and end parsing if necessary.
  			 */
  			function saveRow(newCursor)
  			{
  				cursor = newCursor;
  				pushRow(row);
  				row = [];
  				nextNewline = input.indexOf(newline, cursor);
  			}

  			/** Returns an object with the results, errors, and meta. */
  			function returnable(stopped)
  			{
  				return {
  					data: data,
  					errors: errors,
  					meta: {
  						delimiter: delim,
  						linebreak: newline,
  						aborted: aborted,
  						truncated: !!stopped,
  						cursor: lastCursor + (baseIndex || 0)
  					}
  				};
  			}

  			/** Executes the user's step function and resets data & errors. */
  			function doStep()
  			{
  				step(returnable());
  				data = [];
  				errors = [];
  			}
  		};

  		/** Sets the abort flag */
  		this.abort = function()
  		{
  			aborted = true;
  		};

  		/** Gets the cursor position */
  		this.getCharIndex = function()
  		{
  			return cursor;
  		};
  	}


  	// If you need to load Papa Parse asynchronously and you also need worker threads, hard-code
  	// the script path here. See: https://github.com/mholt/PapaParse/issues/87#issuecomment-57885358
  	function getScriptPath()
  	{
  		var scripts = document.getElementsByTagName('script');
  		return scripts.length ? scripts[scripts.length - 1].src : '';
  	}

  	function newWorker()
  	{
  		if (!Papa.WORKERS_SUPPORTED)
  			return false;
  		if (!LOADED_SYNC && Papa.SCRIPT_PATH === null)
  			throw new Error(
  				'Script path cannot be determined automatically when Papa Parse is loaded asynchronously. ' +
  				'You need to set Papa.SCRIPT_PATH manually.'
  			);
  		var workerUrl = Papa.SCRIPT_PATH || AUTO_SCRIPT_PATH;
  		// Append 'papaworker' to the search string to tell papaparse that this is our worker.
  		workerUrl += (workerUrl.indexOf('?') !== -1 ? '&' : '?') + 'papaworker';
  		var w = new global.Worker(workerUrl);
  		w.onmessage = mainThreadReceivedMessage;
  		w.id = workerIdCounter++;
  		workers[w.id] = w;
  		return w;
  	}

  	/** Callback when main thread receives a message */
  	function mainThreadReceivedMessage(e)
  	{
  		var msg = e.data;
  		var worker = workers[msg.workerId];
  		var aborted = false;

  		if (msg.error)
  			worker.userError(msg.error, msg.file);
  		else if (msg.results && msg.results.data)
  		{
  			var abort = function() {
  				aborted = true;
  				completeWorker(msg.workerId, { data: [], errors: [], meta: { aborted: true } });
  			};

  			var handle = {
  				abort: abort,
  				pause: notImplemented,
  				resume: notImplemented
  			};

  			if (isFunction(worker.userStep))
  			{
  				for (var i = 0; i < msg.results.data.length; i++)
  				{
  					worker.userStep({
  						data: [msg.results.data[i]],
  						errors: msg.results.errors,
  						meta: msg.results.meta
  					}, handle);
  					if (aborted)
  						break;
  				}
  				delete msg.results;	// free memory ASAP
  			}
  			else if (isFunction(worker.userChunk))
  			{
  				worker.userChunk(msg.results, handle, msg.file);
  				delete msg.results;
  			}
  		}

  		if (msg.finished && !aborted)
  			completeWorker(msg.workerId, msg.results);
  	}

  	function completeWorker(workerId, results) {
  		var worker = workers[workerId];
  		if (isFunction(worker.userComplete))
  			worker.userComplete(results);
  		worker.terminate();
  		delete workers[workerId];
  	}

  	function notImplemented() {
  		throw 'Not implemented.';
  	}

  	/** Callback when worker thread receives a message */
  	function workerThreadReceivedMessage(e)
  	{
  		var msg = e.data;

  		if (typeof Papa.WORKER_ID === 'undefined' && msg)
  			Papa.WORKER_ID = msg.workerId;

  		if (typeof msg.input === 'string')
  		{
  			global.postMessage({
  				workerId: Papa.WORKER_ID,
  				results: Papa.parse(msg.input, msg.config),
  				finished: true
  			});
  		}
  		else if ((global.File && msg.input instanceof File) || msg.input instanceof Object)	// thank you, Safari (see issue #106)
  		{
  			var results = Papa.parse(msg.input, msg.config);
  			if (results)
  				global.postMessage({
  					workerId: Papa.WORKER_ID,
  					results: results,
  					finished: true
  				});
  		}
  	}

  	/** Makes a deep copy of an array or object (mostly) */
  	function copy(obj)
  	{
  		if (typeof obj !== 'object' || obj === null)
  			return obj;
  		var cpy = Array.isArray(obj) ? [] : {};
  		for (var key in obj)
  			cpy[key] = copy(obj[key]);
  		return cpy;
  	}

  	function bindFunction(f, self)
  	{
  		return function() { f.apply(self, arguments); };
  	}

  	function isFunction(func)
  	{
  		return typeof func === 'function';
  	}

  	return Papa;
  }));
  });

  var txtKeys$1 = ['chapter_name', 'synopsis', 'detail', 'sel1_txt', 'sel2_txt', 'sel3_txt', 'sel4_txt', 'sel5_txt', 'sel6_txt'];

  var replaceName = function replaceName(content, userName) {
    if (userName) {
      content.forEach(function (item) {
        if (item.id === 'info') return;
        ['name', 'text', 'trans'].forEach(function (key) {
          if (!item[key]) return;
          var _lang = Game.lang;
          if (!/^\w+$/.test(userName)) _lang = 'unknown';
          item[key] = replaceWords(item[key], new Map([[userName, '姬塔']]), _lang);
        });
      });
    }
  };

  var dataToCsv = function dataToCsv(data, fill, isTrans, isAutoTrans) {
    var result = [];

    var _data = cloneDeep_1(data);

    _data.forEach(function (item) {
      var name = removeTag(item.charcter1_name);
      replaceChar('charcter1_name', item, scenarioCache.nameMap, scenarioCache.name);
      var transName = removeTag(item.charcter1_name);
      var hasTransName = name !== transName;
      txtKeys$1.forEach(function (key) {
        var txt = item[key];
        var hasName = key === 'detail' && name && name !== 'null';

        if (txt) {
          txt = txt.replace(/\n/g, '');
          var trans = '';

          if (isTrans) {
            var obj = scenarioCache.transMap.get(item.id);

            if (obj && obj["".concat(key, "-origin")]) {
              trans = obj["".concat(key, "-origin")];
            }
          } else if (isAutoTrans) {
            var _obj = scenarioCache.transMap.get(item.id);

            if (_obj && _obj[key]) {
              trans = _obj[key];
            }
          } else if (fill) {
            trans = txt;
          }

          if (config.plainText) {
            txt = removeHtmlTag(txt);
            trans = removeHtmlTag(trans);
          }

          result.push({
            id: "".concat(item.id).concat(key === 'detail' ? '' : '-' + key),
            name: hasName ? "".concat(name).concat(hasTransName ? '/' + transName : '') : '',
            text: txt,
            trans: trans
          });
        }
      });
    });

    var extraInfo = {
      id: 'info',
      name: '',
      text: '',
      trans: scenarioCache.name
    };
    replaceName(result, config.userName);
    result.push(extraInfo);
    result.push({
      id: '译者',
      name: '',
      text: '',
      trans: ''
    });
    return papaparse.unparse(result);
  };

  function dlStoryCsv () {
    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'normal';

    if (type === 'normal') {
      tryDownload(dataToCsv(scenarioCache.data), scenarioCache.name + '.csv');
    } else if (type === 'trans') {
      if (scenarioCache.hasTrans) {
        tryDownload(dataToCsv(scenarioCache.data, false, true), scenarioCache.originName || "".concat(scenarioCache.name, ".csv"));
      } else {
        if (scenarioCache.hasAutoTrans) {
          if (confirm('这个章节还没有翻译，是否下载含有机翻文本的文件。')) {
            tryDownload(dataToCsv(scenarioCache.data, false, false, true), scenarioCache.name + '.csv');
          }
        } else {
          alert('这个章节还没有翻译。');
        }
      }
    } else if (type === 'fill') {
      tryDownload(dataToCsv(scenarioCache.data, true), scenarioCache.name + '.csv');
    }
  }

  var setLocalData$1 = function setLocalData(name, csv) {
    var data = getPreview();
    var exist = false;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var item = _step.value;

        if (item.name === name) {
          exist = true;
          item.csv = csv;
          break;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    if (!exist) {
      if (data.length >= 5) {
        data.shift();
      }

      data.push({
        name: name,
        csv: csv
      });
    }

    sessionStorage.setItem('blhxfy:preview', JSON.stringify(data));
  };

  function previewCsv (type) {
    var cont = document.getElementById('blhxfy-story-input');

    if (type === 'hide') {
      cont.style.display = 'none';
    } else if (type === 'show') {
      var csv = getPreviewCsv(scenarioCache.name);
      cont.querySelector('textarea').value = csv;
      cont.style.display = 'block';
    } else if (type === 'clear') {
      cont.querySelector('textarea').value = '';
    } else if (type === 'save') {
      setLocalData$1(scenarioCache.name, cont.querySelector('textarea').value);
      location.reload();
    }
  }

  function eventMessage () {
    window.addEventListener('load', function () {
      var script = document.createElement('script');
      script.innerHTML = "\n    window.blhxfy || (window.blhxfy = {})\n    window.blhxfy.sendEvent = function (name, type, data) {\n      var event = new CustomEvent('blhxfy:message', {\n        detail: {\n          type: type,\n          data: data,\n          name: name\n        }\n      })\n      document.body.dispatchEvent(event)\n    }\n    ";
      document.head.appendChild(script);
      document.body.addEventListener('blhxfy:message', function (e) {
        var _e$detail = e.detail,
            name = _e$detail.name,
            type = _e$detail.type,
            data = _e$detail.data;

        if (name === 'setting') {
          thSetting(type, data);
        } else if (name === 'dlStoryCsv') {
          dlStoryCsv(type, data);
        } else if (name === 'previewCsv') {
          previewCsv(type);
        }
      });
    });
  }
  window.blhx || (window.blhx = {});

  window.blhx.sendEvent = function (name, type, data) {
    var event = new CustomEvent('blhxfy:message', {
      detail: {
        type: type,
        data: data,
        name: name
      }
    });
    document.body.dispatchEvent(event);
  };

  var main = function main() {
    var time = sessionStorage.getItem('blhxfy:startTime') || 0;
    var now = Date.now();
    if (now - time < 1000) return;
    sessionStorage.setItem('blhxfy:startTime', now);
    eventMessage();
    injectXHR();
  };

  main();

}());

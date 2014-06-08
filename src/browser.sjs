// Copyright (c) 2014 Quildreen Motta <quildreen@gmail.com>
//
// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation files
// (the "Software"), to deal in the Software without restriction,
// including without limitation the rights to use, copy, modify, merge,
// publish, distribute, sublicense, and/or sell copies of the Software,
// and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

/**
 * HTTP client for browsers.
 *
 * @module http-client/browser
 */

// -- Dependencies -----------------------------------------------------
var Future = require('data.future')
var curry  = require('core.lambda').curry
var extend = require('xtend')


// -- Helpers ----------------------------------------------------------

/**
 * Constructs a new XHR object for the current platform.
 *
 * @summary Void → XMLHttpRequest
 */
function makeXhr() {
  return 'XMLHttpRequest' in window?  λ(_) -> new XMLHttpRequest()
  :      /* otherwise */              λ(_) -> new ActiveXObject('Microsoft.XMLHTTP')
}

/**
 * Verifies if a response is a success.
 *
 * @method
 * @summary XMLHttpRequest → Boolean
 */
exports.isSuccess = isSuccess
function isSuccess(http) {
  return /2\d\d/.test(http.status.toString())
}

/**
 * Invokes a function for each key/value pair in an object.
 *
 * @method
 * @summary Object, (String, a → Void) → Void
 */
exports.each = each
function each(o, f) {
  Object.keys(o).forEach(function(k) {
    f(k, o[k])
  })
}


// -- Core implementation ----------------------------------------------

/**
 * Makes an HTTP request.
 *
 * @summary Method → Options → URI → Future(Error, Response)
 */
function request(method, options, uri) { return new Future(function(reject, resolve) {
  var headers = extend(options.headers || {}, { 'X-Requested-With': 'XMLHttpRequest' });
  var client  = makeXhr();

  client.onreadystatechange = function() {
    if (client.readyState === 4) {
      if (isSuccess(client))  resolve({ body: client.responseText, response: client })
      else                    reject(new HttpError(client)) }};

  client.open(method.toUpperCase(), uri.toString(), true);
  each(headers, client.setRequestHeader.bind(client));
  client.send(options.body)
})}


// -- Exports ----------------------------------------------------------
var _req = module.exports = curry(3, request)
_req.get     = _req('GET')
_req.post    = _req('POST')
_req.put     = _req('PUT')
_req.head    = _req('HEAD')
_req.remove  = _req['delete'] = _req('DELETE')
_req.options = _req('OPTIONS')

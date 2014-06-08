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
 * HTTP client for Node.
 *
 * @module http-client/node
 */

// -- Dependencies -----------------------------------------------------
var Future = require('data.future')
var req    = require('request')
var extend = require('xtend/mutable')


// -- Helpers ----------------------------------------------------------

/**
 * Fixes the options for `request`.
 *
 * @summary Object → Method → URI → Object
 */
function fix(options, method, uri) {
  return { uri                : uri.toString()
         , method             : method.toUpperCase()
         , headers            : options.headers
         , body               : options.body
         , auth               : options.auth
         , followRedirect     : options.followRedirect
         , followAllRedirects : options.followAllRedirects
         , maxRedirects       : options.maxRedirects
         , encoding           : options.encoding
         , pool               : options.pool
         , proxy              : options.proxy
         , oauth              : options.oauth
         , hawk               : options.hawk
         , strictSSL          : options.strictSSL
         , jar                : options.jar
         , aws                : options.aws
         , httpSignature      : options.httpSignature
         , localAddress       : options.localAddress }
}

// -- Core implementation ----------------------------------------------

/**
 * Makes an HTTP request.
 *
 * @summary Method → Options → URI → Future(Error, Response)
 */
function request(method, options, uri){ return new Future(function(reject, resolve) {
  req(fix(options, method, uri), function(error, response, body) {
    if (error)  reject(error)
    else        resolve({ body     : body
                        , response : extend(response, { status: response.statusCode })})
  })
})}


// -- Exports ----------------------------------------------------------
var _req = module.exports = curry(3, request)
_req.get     = _req('GET')
_req.post    = _req('POST')
_req.put     = _req('PUT')
_req.head    = _req('HEAD')
_req.remove  = _req['delete'] = _req('DELETE')
_req.options = _req('OPTIONS')
_req.jar     = req.jar
_req.cookie  = req.cookie

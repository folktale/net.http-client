# # net.http-client

/** ^
 * Copyright (c) 2013 Quildreen Motta
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation files
 * (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */


# # Dependencies
Future = require 'data.future'


make-xhr =
  | 'XMLHttpRequest' of window => -> new XMLHttpRequest
  | otherwise                  => -> new ActiveXObject 'Microsoft.XMLHTTP'


is-success = (http) -> /2\d\d/.test http.status


export class HttpError extends Error
  name: 'HttpError'
  (response, status) ->
    super "HTTP request failed with status #status"
    @data   = response
    @status = status


export class Headers
  ->
    @values = {}
  from-object = (a) -> new Headers <<< { values: ^^a }
  from-headers = (a) -> new Headers <<< { values: ^^a.values }
  add: (key, value) -> new Headers <<< { values: ^^@values <<< { "#key": value }}
  remove: (key) -> @values = {[k,v] for k,v of @values when k isnt key}
  reduce-right: (f,z) -> for k,x of @values => z := f {name:k,value:x}, z


# + type: Method -> URI -> Headers -> Body -> Future(Error,String)
export request = (method, uri, original-headers, body) -->
  new Future (reject, resolve) ->
    headers = original-headers.add 'X-Requested-With', 'XMLHttpRequest'
    client  = make-xhr!
    
    client.onreadystatechange = -> if client.ready-state is 4 => switch
      | is-success client => resolve client.response-text
      | otherwise         => reject (new HttpError client.response-text, client.status)
    
    client.open method, uri.to-string!, true
    headers.reduce-right (a, _) -> client.set-request-header a.name, a.value
    client.send body


export get     = request \GET
export post    = request \POST
export put     = request \PUT
export head    = request \HEAD
export remove  = request \DELETE
export options = request \OPTIONS

net.http-client
===============

[![Build Status](https://secure.travis-ci.org/folktale/net.http-client.png?branch=master)](https://travis-ci.org/folktale/net.http-client)
[![NPM version](https://badge.fury.io/js/net.http-client.png)](http://badge.fury.io/js/net.http-client)
[![Dependencies Status](https://david-dm.org/folktale/net.http-client.png)](https://david-dm.org/folktale/net.http-client)
[![experimental](http://hughsk.github.io/stability-badges/dist/experimental.svg)](http://github.com/hughsk/stability-badges)


Monadic HTTP client library.


## Example

```js
( ... )
```


## Installing

The easiest way is to grab it from NPM. If you're running in a Browser
environment, you can use [Browserify][]

    $ npm install net.http-client


### Using with CommonJS

If you're not using NPM, [Download the latest release][release], and require
the `net.http-client.umd.js` file:

```js
var httpClient = require('net.http-client')
```


### Using with AMD

[Download the latest release][release], and require the `net.http-client.umd.js`
file:

```js
require(['net.http-client'], function(httpClient) {
  ( ... )
})
```


### Using without modules

[Download the latest release][release], and load the `net.http-client.umd.js`
file. The properties are exposed in the global `folktale.net.httpClient` object:

```html
<script src="/path/to/net.http-client.umd.js"></script>
```


### Compiling from source

If you want to compile this library from the source, you'll need [Git][],
[Make][], [Node.js][], and run the following commands:

    $ git clone git://github.com/folktale/net.http-client.git
    $ cd net.http-client
    $ npm install
    $ make bundle
    
This will generate the `dist/net.http-client.umd.js` file, which you can load in
any JavaScript environment.

    
## Documentation

You can [read the documentation online][docs] or build it yourself:

    $ git clone git://github.com/folktale/net.http-client.git
    $ cd net.http-client
    $ npm install
    $ make documentation

Then open the file `docs/literate/index.html` in your browser.


## Platform support

This library assumes an ES5 environment, but can be easily supported in ES3
platforms by the use of shims. Just include [es5-shim][] :)

Currently only browser platforms (IE8+, Chrome, Firefox, Safari, Opera) are
supported, though there are plans to support Node.


## Licence

Copyright (c) 2013 Quildreen Motta.

Released under the [MIT licence](https://github.com/folktale/net.http-client/blob/master/LICENCE).

<!-- links -->
[Fantasy Land]: https://github.com/fantasyland/fantasy-land
[Browserify]: http://browserify.org/
[release]: https://github.com/folktale/net.http-client/releases/download/v0.0.0/net.http-client-0.0.0.tar.gz
[Git]: http://git-scm.com/
[Make]: http://www.gnu.org/software/make/
[Node.js]: http://nodejs.org/
[es5-shim]: https://github.com/kriskowal/es5-shim
[docs]: http://folktale.github.io/net.http-client

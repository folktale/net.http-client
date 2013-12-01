bin        = $(shell npm bin)
lsc        = $(bin)/lsc
browserify = $(bin)/browserify
groc       = $(bin)/groc
uglify     = $(bin)/uglifyjs
VERSION    = $(shell node -e 'console.log(require("./package.json").version)')


lib: src/*.ls
	$(lsc) -o lib -c src/*.ls

dist:
	mkdir -p dist

dist/net.http-client.umd.js: compile dist
	$(browserify) lib/index.js --standalone folktale.net.httpClient > $@

dist/net.http-client.umd.min.js: dist/net.http-client.umd.js
	$(uglify) --mangle - < $^ > $@

# ----------------------------------------------------------------------
bundle: dist/net.http-client.umd.js

minify: dist/net.http-client.umd.min.js

compile: lib

documentation:
	$(groc) --index "README.md"                                              \
	        --out "docs/literate"                                            \
	        src/*.ls test/*.ls test/specs/**.ls README.md

clean:
	rm -rf dist build lib

test:
	$(lsc) test/tap.ls

package: compile documentation bundle minify
	mkdir -p dist/net.http-client-$(VERSION)
	cp -r docs/literate dist/net.http-client-$(VERSION)/docs
	cp -r lib dist/net.http-client-$(VERSION)
	cp dist/*.js dist/net.http-client-$(VERSION)
	cp package.json dist/net.http-client-$(VERSION)
	cp README.md dist/net.http-client-$(VERSION)
	cp LICENCE dist/net.http-client-$(VERSION)
	cd dist && tar -czf net.http-client-$(VERSION).tar.gz net.http-client-$(VERSION)

publish: clean
	npm install
	npm publish

bump:
	node tools/bump-version.js $$VERSION_BUMP

bump-feature:
	VERSION_BUMP=FEATURE $(MAKE) bump

bump-major:
	VERSION_BUMP=MAJOR $(MAKE) bump


.PHONY: test

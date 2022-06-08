install: 
		npm ci

gendiff:
		node bin/gendiff.js

publish:
		npm publish --dry-run

lint: 
		npx eslint $(arg) .

test: 
		npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8
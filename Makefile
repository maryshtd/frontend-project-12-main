start-backend:
	npx nodemon --exec npx babel-node server/bin/index.js

start-frontend:
	npx webpack-dev-server

install-deps:
	npm install

build:
	rm -rf dist
	npm run build

test:
	npm test

lint:
	npx eslint . --ext js,jsx

publish:
	npm publish
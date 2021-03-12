# bootleg-spatial-recall

Convolution reverb on a shoe-string. Website accompanying projects by [Otto Willberg](http://www.ottowillberg.com/) for uploading, listening to and archiving convolution reverbs. Uses webaudio in the browser to perform convolution. Built by [Sam Andreae](https://samandreae.com).

- Express API
- Nuxt frontend
- Docker
- openAPI + validation
- redocs UI
- Ngrok
- Jest
- ESlint & Prettier
- Github Actions

## Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate

# run tests (needs test db to be running)
$ npm run test:server
$ npm run test

# run linter
$ npm run lint
```

## Docker Setup

```bash
# Build and run container
$ npm run docker:start

# Build and run container for testing linting
$ npm run docker:test-server
# then...
$ npm run docker:test
$ npm run docker:lint

# Run just the db
$ npm run docker:db


```

## API

The `express` API is located in api/ and is served as a middleware module through `nuxt`.




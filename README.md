# bootleg-spatial-recall-nuxt

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
$ npm run test

# run linter
$ npm run lint
```

## Docker Setup

```bash
# Build and run container
$ npm run docker:dev

# run container for testing linting
$ npm run docker:test-server
# then...
$ npm run docker:test
$ npm run docker:lint

```

## API

The `express` API is located in api/ and is served as a middleware module through `nuxt`.




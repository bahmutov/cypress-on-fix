# cypress-on-fix

> Fixes multiple Cypress plugins subscribing to "on" events

## Install

Add this NPM package as a dev dependency

```
# install using NPM
$ npm i -D cypress-on-fix
# install using Yarn
$ yarn add -D cypress-on-fix
```

Wrap the `on` passed by Cypress in your config file

```js
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    // baseUrl, etc
    supportFile: false,
    fixturesFolder: false,
    setupNodeEvents(cypressOn, config) {
      const on = require('.')(cypressOn)
      // use "on" to register plugins, for example
      // https://github.com/bahmutov/cypress-split
      require('cypress-split')(on, config)
      // https://github.com/bahmutov/cypress-watch-and-reload
      require('cypress-watch-and-reload/plugins')(on, config)
      // https://github.com/bahmutov/cypress-code-coverage
      require('@bahmutov/cypress-code-coverage/plugin')(on, config)
    },
  },
})
```

## Debugging

This module uses [debug](https://github.com/debug-js/debug#readme) to print verbose log messages. Run Cypress with

```
DEBUG=cypress-on-fix npx cypress run ...
```

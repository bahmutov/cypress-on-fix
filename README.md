# cypress-on-fix ![cypress version](https://img.shields.io/badge/cypress-12.9.0-brightgreen)

> Fixes multiple Cypress plugins subscribing to "on" events

See [#22428](https://github.com/cypress-io/cypress/issues/22428) issue.

Read the blog post [Fix For Cypress Plugin Events](https://glebbahmutov.com/blog/fix-for-cypress-plugin-events/).

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
      // https://github.com/bahmutov/cypress-on-fix
      const on = require('cypress-on-fix')(cypressOn)
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

If there are multiple plugins that returns a value, the last one result will be returned

```js
const on = require('cypress-on-fix')(cypressOn)
on('before:browser:launch', (browser, launchOptions) => {
  if (browser.name === 'chrome') {
    launchOptions.args.push('--window-size=1366,768')
    return launchOptions
  }
})
on('before:browser:launch', (browser, launchOptions) => {
  if (browser.name === 'chrome') {
    launchOptions.args.push('--window-size=1280,720')
    return launchOptions
  }
})
```

In the situation above, the Chrome browser will be opened with the window size 1280x720

## Debugging

This module uses [debug](https://github.com/debug-js/debug#readme) to print verbose log messages. Run Cypress with

```
DEBUG=cypress-on-fix npx cypress run ...
```

## Example

```js
setupNodeEvents(on, config) {
  on('after:spec', (a) => {
    console.log('after spec 1', a.relative)
  })
  on('after:spec', (a) => {
    console.log('after spec 2', a.relative)
  })
  on('after:spec', (a) => {
    console.log('after spec 3', a.relative)
  })
}
```

Without this plugin only the last event listener is invoked

```
after spec 3 cypress/e2e/spec1.cy.js
```

With this proxy, all listeners are invoked

```js
setupNodeEvents(cypressOn, config) {
  // https://github.com/bahmutov/cypress-on-fix
  const on = require('cypress-on-fix')(cypressOn)
  on('after:spec', (a) => {
    console.log('after spec 1', a.relative)
  })
  on('after:spec', (a) => {
    console.log('after spec 2', a.relative)
  })
  on('after:spec', (a) => {
    console.log('after spec 3', a.relative)
  })
}
```

```
after spec 1 cypress/e2e/spec1.cy.js
after spec 2 cypress/e2e/spec1.cy.js
after spec 3 cypress/e2e/spec1.cy.js
```

## Small print

Author: Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt; &copy; 20223

- [@bahmutov](https://twitter.com/bahmutov)
- [glebbahmutov.com](https://glebbahmutov.com)
- [blog](https://glebbahmutov.com/blog)
- [videos](https://www.youtube.com/glebbahmutov)
- [presentations](https://slides.com/bahmutov)
- [cypress.tips](https://cypress.tips)
- [Cypress Tips & Tricks Newsletter](https://cypresstips.substack.com/)
- [my Cypress courses](https://cypress.tips/courses)

License: MIT - do anything with the code, but don't blame me if it does not work.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/cypress-on-fix/issues) on Github

## MIT License

Copyright (c) 2023 Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt;

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

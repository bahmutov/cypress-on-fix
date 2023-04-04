const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    // baseUrl, etc
    supportFile: false,
    fixturesFolder: false,
    setupNodeEvents(cypressOn, config) {
      const on = require('.')(cypressOn)
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.name === 'chrome') {
          launchOptions.args.push('--window-size=1366,768')
          return launchOptions
        }
      })

      on('after:spec', (a) => {
        console.log('after spec 1', a.relative)
      })
      on('after:spec', (a) => {
        console.log('after spec 2', a.relative)
      })
      on('after:spec', (a) => {
        console.log('after spec 3', a.relative)
      })
    },
  },
})

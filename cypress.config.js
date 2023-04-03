const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    // baseUrl, etc
    supportFile: false,
    fixturesFolder: false,
    setupNodeEvents(cypressOn, config) {
      const on = require('.')(cypressOn)
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

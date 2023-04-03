const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    // baseUrl, etc
    supportFile: false,
    fixturesFolder: false,
    setupNodeEvents(cypressOn, config) {
      const on = require('.')(cypressOn)
      on('after:spec', (a) => {
        console.log('after spec 1', a)
      })
      on('after:spec', () => {
        console.log('after spec 2')
      })
      on('after:spec', () => {
        console.log('after spec 3')
      })
    },
  },
})

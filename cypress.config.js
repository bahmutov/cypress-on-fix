const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    // baseUrl, etc
    supportFile: false,
    fixturesFolder: false,
    video: false,
    setupNodeEvents(cypressOn, config) {
      const on = require('.')(cypressOn)

      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.name === 'chrome') {
          launchOptions.args.push('--window-size=1366,768')
          return launchOptions
        }
      })

      on('after:spec', (a) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            console.log('after spec 1', a.relative)
            resolve()
          }, 100)
        })
      })
      on('after:spec', (a) => {
        console.log('after spec 2', a.relative)
      })
      on('after:spec', (a) => {
        console.log('after spec 3', a.relative)
      })

      on('after:run', async () => {
        console.log('after run async callback')
      })
    },
  },
})

/// <reference types="cypress" />

const debug = require('debug')('cypress-on-fix')

/**
 * @param {Cypress.PluginEvents} on
 */
function onProxy(on) {
  const listeners = {}
  return function proxiedOn(eventName, callback) {
    if (eventName === 'task') {
      // no need to proxy tasks
      return on('task', callback)
    }

    debug('registering %s', eventName)
    if (listeners[eventName]) {
      debug('there are already %d listeners', listeners[eventName].length)
      listeners[eventName].push(callback)
    } else {
      debug('the only listener so far')
      listeners[eventName] = [callback]
      on(eventName, function () {
        debug(
          'proxy %s to %d listeners',
          eventName,
          listeners[eventName].length,
        )
        listeners[eventName].forEach((fn) => {
          fn.apply(null, arguments)
        })
      })
    }
  }
}

module.exports = onProxy

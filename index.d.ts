/// <reference types="cypress" />

declare function onProxy(on: Cypress.PluginEvents): Cypress.PluginEvents
export = onProxy;

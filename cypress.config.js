const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here

      // const cucumber = require('cypress-cucumber-preprocessor').default
      // on('file:preprocessor', cucumber());
      const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild').createEsbuildPlugin
      const createBundler = require('@bahmutov/cypress-esbuild-preprocessor')
      const nodePolyfills = require('@esbuild-plugins/node-modules-polyfill').NodeModulesPolyfillPlugin
      const addCucumberPreprocessorPlugin = require('@badeball/cypress-cucumber-preprocessor').addCucumberPreprocessorPlugin
      addCucumberPreprocessorPlugin(on, config) // to allow json to be produced
        // To use esBuild for the bundler when preprocessing
        on(
          'file:preprocessor',
          createBundler({
            plugins: [nodePolyfills(), createEsbuildPlugin(config)],
          })
        )
        return config
    },
    specPattern: ["**/*.feature", "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}"]
  },
});

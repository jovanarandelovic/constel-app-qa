const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 20000,
  watchForFileChanges: true,
  numTestKeptInMemory: 1,
  requestTimeout: 15000,
  responseTimeout: 15000,
  viewportHeight: 1920,
  viewportWidth: 1440,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://constel-social-network.vercel.app/login",
    experimentalRunAllSpecs: true,
  },
});

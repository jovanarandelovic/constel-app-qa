const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 20000,
  watchForFileChanges: true,
  numTestKeptInMemory: 1,
  requestTimeout: 15000,
  responseTimeout: 15000,
  viewportWidth: 768,
  viewportHeight: 1000,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://constel-social-network.vercel.app/login",
  },
});

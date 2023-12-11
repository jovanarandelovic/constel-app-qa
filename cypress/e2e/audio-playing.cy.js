import HomePage from "../page/home-page";
import LoginPage from "../page/login-page";

const homePage = new HomePage();
const loginPage = new LoginPage();
describe("Verifies that the audio is playing", () => {
  before(() => {
    cy.visit("");
    loginPage.login(
      Cypress.env("validCred").email,
      Cypress.env("validCred").password
    );
    //homePage.waitForTheAudiosToLoad();
    cy.wait(5000);
  });

  it("Should play audio recordings", () => {
    homePage.verifyAudiosArePlaying();
  });
});

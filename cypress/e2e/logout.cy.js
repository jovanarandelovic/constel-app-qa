import HomePage from "../page/home-page";
import LoginPage from "../page/login-page";

const homePage = new HomePage();
const loginPage = new LoginPage();

describe("Log Out functionality", () => {
  before(() => {
    cy.visit("");
    loginPage.login(
      Cypress.env("validCred").email,
      Cypress.env("validCred").password
    );
  });

  it("Should verify that the user is loggeded out ", () => {
    homePage.logout();
    cy.get(loginPage.LOGIN_BUTTON).should("be.visible");
  });
});

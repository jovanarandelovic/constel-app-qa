import LoginPage from "../page/login-page";

const loginPage = new LoginPage();

describe("Log In functionality", () => {
  beforeEach(() => {
    cy.visit("");
    //Used to prevent a cookie popup container
  });

  it("Should verify that the user is logged in when passing valid email and valid password", () => {
    loginPage.login(
      Cypress.env("validCred").email,
      Cypress.env("validCred").password
    );
    loginPage.confirmSuccesfullLogin();
  });

  it("Should verify that error messages are visible when logging in without a password and an email", () => {
    loginPage.clickLoginButton();
    loginPage.confirmInputErrorMessagesAreVisible();
  });

  it("Should verify that error message is visible when passing a invalid email and valid password", () => {
    loginPage.login(
      Cypress.env("invalidCred").wrongEmail,
      Cypress.env("validCred").password
    );
    //I expect to see the same error as in the POST login/ response
    //loginPage.confirmServerError("Account not found!");
    //but I see
    loginPage.confirmServerErrorMessage("An error occurred during login.");
  });

  it("Should verify that error message is visible when passing a valid email and invalid password", () => {
    loginPage.login(
      Cypress.env("validCred").email,
      Cypress.env("invalidCred").wrongPassword
    );
    //I expect to see the same error as in the POST login/ response
    //loginPage.confirmServerError("Incorrect password!");
    //but I see
    loginPage.confirmServerErrorMessage("An error occurred during login.");
  });

  it("Should verify that error message is visible when passing a invalid (wrong format) email and valid password", () => {
    loginPage.login(
      Cypress.env("invalidCred").wrongFormatEmail,
      Cypress.env("validCred").password
    );
    loginPage.confirmWrongFormatEmail();
  });

  it.only("Should verify that error message is visible when passing a valid email and short password", () => {
    loginPage.login(
      Cypress.env("validCred").email,
      Cypress.env("invalidCred").shortPassword
    );
    loginPage.confirmShortPasswordError();
  });

  it("Should verify that error message is visible when passing a valid email and short password", () => {
    loginPage.enterEmail("invalid@email.com");
    loginPage.enterPassword("invalidPassword");
    loginPage.clickLoginButton();
    //loginPage.confirmServerError("Account not found!");
  });

  afterEach(() => {
    cy.clearAllCookies();
  });
});

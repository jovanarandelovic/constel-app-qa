import LoginPage from "../page/login-page";

const loginPage = new LoginPage();

describe("Log In functionality", () => {
  beforeEach(() => {
    cy.visit("");
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

  it("Should verify that error message is visible when passing a wrong email and valid password", () => {
    loginPage.login(
      Cypress.env("invalidCred").wrongEmail,
      Cypress.env("validCred").password
    );
    //I expect to see the same error as in the POST login/ response
    loginPage.confirmServerErrorMessage("Account not found!");
    //but I see
    // loginPage.confirmServerErrorMessage("An error occurred during login.");
    //Suggestion for security reasons: Don't show that the account wasn't found. Something like "Wrong credentials" would be more appropriate
  });

  it("Should verify that error message is visible when passing a valid email and wrong password", () => {
    loginPage.login(
      Cypress.env("validCred").email,
      Cypress.env("invalidCred").wrongPassword
    );
    //I expect to see the same error as in the POST login/ response
    loginPage.confirmServerErrorMessage("Incorrect password!");
    //but I see
    // loginPage.confirmServerErrorMessage("An error occurred during login.");
    //Suggestion for security reasons: Don't show that the password is wrong. Something like "Wrong credentials" would be more appropriate
  });

  it("Should verify that error message is visible when passing a invalid (wrong format) email and valid password", () => {
    loginPage.login(
      Cypress.env("invalidCred").wrongFormatEmail,
      Cypress.env("validCred").password
    );
    loginPage.confirmWrongFormatEmail();
  });

  it("Should verify that error message is visible when passing a valid email and short password", () => {
    loginPage.login(
      Cypress.env("validCred").email,
      Cypress.env("invalidCred").shortPassword
    );
    loginPage.confirmShortPasswordError();
  });
});

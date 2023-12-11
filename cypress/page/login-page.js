export default class LoginPage {
  EMAIL_INPUT = '[id="email"]';
  PASSWORD_INPUT = '[id="password"]';
  LOGIN_BUTTON = '[id="loginSubmitBtn"]';
  ERROR_INPUT = ".invalid-feedback";
  ALERT_MESSAGE = '[role="alert"]';
  SUCCESS_TOAST_TITLE = 'strong[class="me-auto"]';
  SUCCESS_TOAST_BODY = ".text-light.toast-body";

  enterEmail(email) {
    cy.get(this.EMAIL_INPUT).type(email);
  }

  enterPassword(password) {
    cy.get(this.PASSWORD_INPUT).type(password);
  }

  clickLoginButton() {
    cy.get(this.LOGIN_BUTTON).click();
  }

  confirmWrongFormatEmail() {
    cy.get(this.EMAIL_INPUT).should("have.class", "is-invalid");
    cy.get(this.EMAIL_INPUT)
      .siblings(this.ERROR_INPUT)
      .should("have.text", "Email format is not valid.")
      .should("be.visible");
  }

  confirmShortPasswordError() {
    cy.get(this.PASSWORD_INPUT).should("have.class", "is-invalid");
    cy.get(this.PASSWORD_INPUT)
      .siblings(this.ERROR_INPUT)
      .should("have.text", "Please provide a minimum of 6 characters")
      .should("be.visible");
  }

  confirmInputErrorMessagesAreVisible() {
    cy.get(this.EMAIL_INPUT).should("have.class", "is-invalid");
    cy.get(this.EMAIL_INPUT)
      .siblings(this.ERROR_INPUT)
      .should("have.text", "Email field is required.")
      .should("be.visible");
    cy.get(this.PASSWORD_INPUT)
      .siblings(this.ERROR_INPUT)
      .should("have.text", "Password field is required.")
      .should("be.visible");
  }

  confirmServerErrorMessage(error) {
    cy.get(this.ALERT_MESSAGE).should("have.text", error);
  }

  confirmSuccesfullLogin() {
    cy.get(this.SUCCESS_TOAST_TITLE)
      .should("be.visible")
      .and("have.text", "Login Successful");
    cy.get(this.SUCCESS_TOAST_BODY)
      .should("be.visible")
      .and(
        "have.text",
        "Welcome back! You've successfully logged in to your account."
      );
    cy.get("h1").contains("Home").should("be.visible");
  }

  login(email, password) {
    this.enterEmail(email);
    this.enterPassword(password);
    this.clickLoginButton();
  }
}

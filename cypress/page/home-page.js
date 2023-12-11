export default class HomePage {
  LOGOUT_BUTTON = '[id="email"]';

  logout() {
    cy.get("a").contains("Log out").click();
  }
}

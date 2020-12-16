export class AuthPage {
  private userInfo = {
    firstName: "Bob",
    lastName: "Ross",
    username: "PainterJoy90",
    password: "s3cret",
  };

  checkRedirect() {
    cy.visit("/personal");
    cy.location("pathname").should("equal", "/signin");
    cy.visualSnapshot("Redirect to SignIn");

    return this;
  }
}

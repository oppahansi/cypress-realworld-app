import { SignIn } from "./signin.page";

export class SignUp<T> {

  fillFirstName(firstName: string) {
    cy.getBySel("signup-first-name").type(firstName);
    return this;
  }

  fillLastName(lastName: string) {
    cy.getBySel("signup-last-name").type(lastName);
    return this;
  }

  fillUsername(username: string) {
    cy.getBySel("signup-username").type(username);
    return this;
  }

  fillPassword(password: string) {
    cy.getBySel("signup-password").type(password);
    return this;
  }

  fillConfirmPassword(password: string) {
    cy.getBySel("signup-confirmPassword").type(password);
    return this;
  }

  submitForm() {
    cy.getBySel("signup-submit").click();
  }

  fillAndClearInput(selector: string, input: string) {
    cy.getBySel(selector).type(input).find("input").clear().blur();
    return this;
  }

  verifyHelpText(selector: string, verifyAgainst: string) {
    cy.get(selector).should("be.visible").and("contain", verifyAgainst);
    return this;
  }

  verifyDisabledSubmit() {
    cy.getBySel("signup-submit").should("be.disabled");
    return this;
  }

  verifcyLocation() {
    cy.getBySel("signup-title").should("be.visible").and("contain", "Sign Up");
    return this;
  }

  screenshot(title: string) {
    cy.visualSnapshot(title);
    return this;
  }

  goToSignInByLink() {
    cy.getBySel("signin").click();
    return new SignIn();
  }

}
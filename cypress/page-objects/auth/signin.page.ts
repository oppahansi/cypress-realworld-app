import { User } from "models";
import { OnboardingDialog } from "../onboarding/onboarding.page";
import { Overview } from "../overview/overview.page";
import { SignUp } from "./singup.page";

export class SignIn {

  loginFirstTime(username: string, password: string) {
    cy.login(username, password);
    return new OnboardingDialog();
  }

  login(username: string, password: string) {
    cy.login(username, password);
    return new Overview()
  }

  loginInvalid() {
    cy.login("invalidUserName", "invalidPa$$word");
    return this;
  }

  loginWrongPassword() {
    cy.database("find", "users").then((user: User) => {
      cy.login(user.username, "INVALID");
    });
    return this
  }

  fillAndClearUsername() {
    cy.getBySel("signin-username").type("User").find("input").clear().blur();
    return this;
  }

  verifyUsernameHelpText() {
    cy.get("#username-helper-text").should("be.visible").and("contain", "Username is required");
    return this;
  }

  fillAndClearPassword() {
    cy.getBySel("signin-password").type("abc").find("input").blur();
    return this;
  }

  verifyPasswordHelpText() {
    cy.get("#password-helper-text")
      .should("be.visible").and("contain", "Password must contain at least 4 characters");
    return this;
  }

  verifyDisabledSubmit() {
    cy.getBySel("signin-submit").should("be.disabled");
    return this;
  }

  verifyFailedLogin() {
    cy.getBySel("signin-error")
      .should("be.visible").and("have.text", "Username or password is invalid");
    return this;
  }

  confirmLocation() {
    cy.location("pathname").should("eq", "/signin");
    return this;
  }

  screenshot(title: string) {
    cy.visualSnapshot(title);
    return this;
  }

  goToSignUpByLink() {
    cy.getBySel("signup").click();
    return new SignUp();
  }
}

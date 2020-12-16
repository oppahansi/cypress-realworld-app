import { isMobile } from "../../support/utils";
import { SignIn } from "../auth/signin.page";

export class Overview {

  confirmLocation() {
    cy.getBySel("transaction-list").should("be.visible");
    return this;
  }

  screenshot(title: string) {
    cy.visualSnapshot(title);
    return this;
  }

  logout() {
    if (isMobile()) {
      cy.getBySel("sidenav-toggle").click();
    }
    cy.getBySel("sidenav-signout").click();

    return new SignIn();
  }

}
import { Overview } from "../overview/overview.page";

export class OnboardingDialog {
  
  fillBankName(bankName: string) {
    cy.getBySelLike("bankName-input").type(bankName);
    return this;
  }

  fillAccountNumber(accountNumber: string) {
    cy.getBySelLike("accountNumber-input").type(accountNumber);
    return this;
  }

  fillRoutingNumber(routingNumber: string) {
    cy.getBySelLike("routingNumber-input").type(routingNumber);
    return this;
  }

  submitForm() {
    cy.getBySelLike("submit").click();
    return this;
  }

  confirmFinishedOnboarding() {
    cy.getBySel("user-onboarding-dialog-title").should("contain", "Finished");
    cy.getBySel("user-onboarding-dialog-content").should("contain", "You're all set!");
    return this;
  }
  
  confirmLocation() {
    cy.getBySel("user-onboarding-dialog").should("be.visible");
    return this;
  }

  confirmLocationBankCreation() {
    cy.getBySel("user-onboarding-dialog-title").should("contain", "Create Bank Account");
    return this;
  }

  screenshot(title: string) {
    cy.visualSnapshot(title);
    return this;
  }

  clickNext() {
    cy.getBySel("user-onboarding-next").click();
    return this;
  }

  clickNextToFinish() {
    cy.getBySel("user-onboarding-next").click();
    return new Overview();
  }
}
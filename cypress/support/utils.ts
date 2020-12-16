export const isMobile = () => {
  return Cypress.config("viewportWidth") < Cypress.env("mobileViewportWidthBreakpoint");
};

export const seedBb = () => {
  cy.task("db:seed");

  cy.intercept("POST", "/users").as("signup");
  cy.intercept("POST", "/bankAccounts").as("createBankAccount");
};

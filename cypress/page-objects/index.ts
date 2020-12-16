import { SignIn } from "./auth/signin.page";
import { SignUp } from "./auth/singup.page";

export function openApp() {
    cy.visit("/");
    return new SignIn();
}

export function openAppSignUp() {
    cy.visit("/signup");
    return new SignUp();
}
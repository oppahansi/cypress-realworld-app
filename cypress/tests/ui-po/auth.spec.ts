import { openApp, openAppSignUp } from "../../page-objects/index";
import { seedBb } from "../../support/utils";

describe("User Sign-up and Login - PO pattern", function () {
  beforeEach(function () {
    seedBb();
  });

  it("should allow a visitor to sign-up, login, and logout", function () {
    const userInfo = {
      firstName: "Bob",
      lastName: "Ross",
      username: "PainterJoy90",
      password: "s3cret",
    };

    const bankInfo = {
      bankName: "The Best Bank",
      accountNumber: "123456789",
      routingNumber: "987654321"
    }

    // Sign Up
    openApp()
      .goToSignUpByLink()
      .verifcyLocation()
      .screenshot("Sign Up Title")
      .fillFirstName(userInfo.firstName)
      .fillLastName(userInfo.lastName)
      .fillUsername(userInfo.username)
      .fillPassword(userInfo.password)
      .fillConfirmPassword(userInfo.password)
      .screenshot("About to Sign Up")
      .submitForm();

    cy.wait("@signup");

    // Sign In and Logout
    openApp()
      .loginFirstTime(userInfo.username, userInfo.password)
      .confirmLocation()
      .screenshot("User Onboarding Dialog")
      .clickNext()
      .confirmLocationBankCreation()
      .fillBankName(bankInfo.bankName)
      .fillAccountNumber(bankInfo.accountNumber)
      .fillRoutingNumber(bankInfo.routingNumber)
      .screenshot("About to complete User Onboarding")
      .submitForm()
      .confirmFinishedOnboarding()
      .screenshot("Finished User Onboarding")
      .clickNextToFinish()
      .confirmLocation()
      .screenshot("Transaction List is visible after User Onboarding")
      .logout()
      .confirmLocation()
      .screenshot("Redirect to SignIn");
  });

  it("should display login errors", function () {
    openApp()
      .fillAndClearUsername()
      .verifyUsernameHelpText()
      .screenshot("Display Username is Required Error")
      .fillAndClearPassword()
      .verifyPasswordHelpText()
      .screenshot("Display Password Error")
      .verifyDisabledSubmit()
      .screenshot("Sign In Submit Disabled");
  });

  it("should display signup errors", function () {
    openAppSignUp()
      .fillAndClearInput("signup-first-name", "First")
      .verifyHelpText("#firstName-helper-text", "First Name is required")
      .fillAndClearInput("signup-last-name", "Last")
      .verifyHelpText("#lastName-helper-text", "Last Name is required")
      .fillAndClearInput("signup-username", "User")
      .verifyHelpText("#username-helper-text", "Username is required")
      .fillAndClearInput("signup-password", "password")
      .verifyHelpText("#password-helper-text", "Enter your password")
      .fillAndClearInput("signup-confirmPassword", "DIFFERENT PASSWORD")
      .verifyHelpText("#confirmPassword-helper-text", "Confirm your password")
      .verifyDisabledSubmit()
      .screenshot("Sign Up Submit Disabled");
  });

  it("should error for an invalid user", function () {
    openApp()
      .loginInvalid()
      .verifyFailedLogin()
      .screenshot("Sign In, Invalid Username and Password, Username or Password is Invalid");
  });

  it("should error for an invalid password for existing user", function () {
    openApp()
      .loginWrongPassword()
      .verifyFailedLogin()
      .screenshot("Sign In, Invalid Username, Username or Password is Invalid");
  });
});

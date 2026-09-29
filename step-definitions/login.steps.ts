import { Given, Then, When } from '@cucumber/cucumber';
import { config } from '../config/config';
import { LoginPage } from '../pages/LoginPage';
import { FrameworkWorld } from '../utils/world';

// Step definitions translate readable Gherkin steps into page-object calls.
Given('I navigate to the login page', async function (this: FrameworkWorld) {
  this.loginPage = new LoginPage(this.getPage());
  await this.loginPage.navigateToLoginPage();
});

When('I enter valid username and password', async function (this: FrameworkWorld) {
  this.loginPage = this.loginPage ?? new LoginPage(this.getPage());
  await this.loginPage.enterUsername(config.username);
  await this.loginPage.enterPassword(config.password);
});

When('I enter invalid username and password', async function (this: FrameworkWorld) {
  this.loginPage = this.loginPage ?? new LoginPage(this.getPage());
  await this.loginPage.enterUsername('invalid-user');
  await this.loginPage.enterPassword('invalid-password');
});

When('I click the login button', async function (this: FrameworkWorld) {
  this.loginPage = this.loginPage ?? new LoginPage(this.getPage());
  await this.loginPage.clickLogin();
});

Then('I should be successfully logged in', async function (this: FrameworkWorld) {
  this.loginPage = this.loginPage ?? new LoginPage(this.getPage());
  await this.loginPage.verifySuccessfulLogin();
});

Then('I should see a login error message', async function (this: FrameworkWorld) {
  this.loginPage = this.loginPage ?? new LoginPage(this.getPage());
  await this.loginPage.verifyLoginError();
});
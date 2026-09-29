import type { Page } from 'playwright';
import { config } from '../config/config';

// The Page Object Model keeps selectors and UI behavior out of step definitions.
export class LoginPage {
  private readonly usernameInput: ReturnType<Page['locator']>;
  private readonly passwordInput: ReturnType<Page['locator']>;
  private readonly loginButton: ReturnType<Page['locator']>;
  private readonly inventoryList: ReturnType<Page['locator']>;
  private readonly errorMessage: ReturnType<Page['locator']>;

  constructor(private readonly page: Page) {
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.inventoryList = page.locator('[data-test="inventory-list"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async navigateToLoginPage(): Promise<void> {
    await this.page.goto(config.baseUrl);
  }

  async enterUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
  }

  async enterPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async clickLogin(): Promise<void> {
    await this.loginButton.click();
  }

  async verifySuccessfulLogin(): Promise<void> {
    await this.inventoryList.waitFor({ state: 'visible', timeout: config.timeout });
    if (new URL(this.page.url()).pathname !== '/inventory.html') {
      throw new Error('The inventory page was not visible after login.');
    }
  }

  async verifyLoginError(): Promise<void> {
    if (!(await this.errorMessage.isVisible())) {
      throw new Error('The expected login error message was not visible.');
    }
    const message = (await this.errorMessage.textContent())?.trim();
    if (!message) {
      throw new Error('The login error message was empty.');
    }
  }
}
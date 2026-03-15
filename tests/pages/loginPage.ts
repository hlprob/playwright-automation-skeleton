import { Page, Locator } from '@playwright/test';
import { locators } from '../locators/loginLocators';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async visit() {
    await this.page.goto('/login');
  }

  async login(email: string, password: string) {
    await this.page.fill(locators.login.emailInput, email);
    await this.page.fill(locators.login.passwordInput, password);
    await this.page.click(locators.login.loginBtn);
  }

  getErrorMessage(): Locator {
    return this.page.locator(locators.login.errorMessage);
  }
}

import { Page, Locator } from '@playwright/test';

export class LoginPage {
  private page!: Page;
  private _usernameInput!: Locator;
  private _passwordInput!: Locator;
  private _loginButton!: Locator;
  private _errorMessage!: Locator;

  static async create(page: Page): Promise<LoginPage> {
    const loginPage = new LoginPage();
    loginPage.page = page;
    loginPage._usernameInput = page.locator('[data-test="username"]');
    loginPage._passwordInput = page.locator('[data-test="password"]');
    loginPage._loginButton = page.locator('[data-test="login-button"]');
    loginPage._errorMessage = page.locator('[data-test="error"]');
    return loginPage;
  }

  get usernameInput() { return this._usernameInput; }
  get passwordInput() { return this._passwordInput; }
  get loginButton() { return this._loginButton; }
  get errorMessage() { return this._errorMessage; }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(username: string, password: string) {
    await this._usernameInput.fill(username);
    await this._passwordInput.fill(password);
    await this._loginButton.click();
  }

  async getErrorMessage() {
    return await this._errorMessage.textContent();
  }

  async isErrorVisible() {
    return await this._errorMessage.isVisible();
  }
}
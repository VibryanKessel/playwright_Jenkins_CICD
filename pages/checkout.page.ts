import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  private page!: Page;
  private firstNameInput!: Locator;
  private lastNameInput!: Locator;
  private postalCodeInput!: Locator;
  private continueButton!: Locator;
  private cancelButton!: Locator;
  private errorMessage!: Locator;
  private finishButton!: Locator;
  private completeHeader!: Locator;
  private backHomeButton!: Locator;
  private summaryInfo!: Locator;
  private totalPrice!: Locator;

  static async create(page: Page): Promise<CheckoutPage> {
    const checkoutPage = new CheckoutPage();
    checkoutPage.page = page;
    checkoutPage.firstNameInput = page.locator('[data-test="firstName"]');
    checkoutPage.lastNameInput = page.locator('[data-test="lastName"]');
    checkoutPage.postalCodeInput = page.locator('[data-test="postalCode"]');
    checkoutPage.continueButton = page.locator('[data-test="continue"]');
    checkoutPage.cancelButton = page.locator('[data-test="cancel"]');
    checkoutPage.errorMessage = page.locator('[data-test="error"]');
    checkoutPage.finishButton = page.locator('[data-test="finish"]');
    checkoutPage.completeHeader = page.locator('[data-test="complete-header"]');
    checkoutPage.backHomeButton = page.locator('[data-test="back-to-products"]');
    checkoutPage.summaryInfo = page.locator('[data-test="checkout-summary-container"]');
    checkoutPage.totalPrice = page.locator('[data-test="total-label"]');
    return checkoutPage;
  }

  async fillShippingInformation(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continueToOverview() {
    await this.continueButton.click();
  }

  async finishOrder() {
    await this.finishButton.click();
  }

  async cancelCheckout() {
    await this.cancelButton.click();
  }

  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }

  async isOrderComplete() {
    return await this.completeHeader.isVisible();
  }

  async getCompleteMessage() {
    return await this.completeHeader.textContent();
  }

  async backToProducts() {
    await this.backHomeButton.click();
  }

  async getTotalPrice() {
    return await this.totalPrice.textContent();
  }
}

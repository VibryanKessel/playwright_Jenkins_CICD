import { Page, Locator } from '@playwright/test';

export class CartPage {
  private page!: Page;
  private _cartItems!: Locator;
  private _cartItemNames!: Locator;
  private _cartItemPrices!: Locator;
  private _cartItemQuantities!: Locator;
  private _removeButtons!: Locator;
  private _continueShoppingButton!: Locator;
  private _checkoutButton!: Locator;
  private _cartBadge!: Locator;

  static async create(page: Page): Promise<CartPage> {
    const cartPage = new CartPage();
    cartPage.page = page;
    cartPage._cartItems = page.locator('[data-test="cart-item"]');
    cartPage._cartItemNames = page.locator('[data-test="inventory-item-name"]');
    cartPage._cartItemPrices = page.locator('[data-test="inventory-item-price"]');
    cartPage._cartItemQuantities = page.locator('[data-test="item-quantity"]');
    cartPage._removeButtons = page.locator('[data-test*="remove"]');
    cartPage._continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    cartPage._checkoutButton = page.locator('[data-test="checkout"]');
    cartPage._cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    return cartPage;
  }

  // Getters pour accéder aux locators
  get cartItems() { return this._cartItems; }
  get cartItemNames() { return this._cartItemNames; }
  get cartItemPrices() { return this._cartItemPrices; }
  get cartItemQuantities() { return this._cartItemQuantities; }
  get removeButtons() { return this._removeButtons; }
  get continueShoppingButton() { return this._continueShoppingButton; }
  get checkoutButton() { return this._checkoutButton; }
  get cartBadge() { return this._cartBadge; }

  async getCartItemsCount() {
    return await this._cartItems.count();
  }

  async getCartItemNames() {
    return await this._cartItemNames.allTextContents();
  }

  async getCartItemPrices() {
    return await this._cartItemPrices.allTextContents();
  }

  async removeItemByIndex(index: number) {
    await this._removeButtons.nth(index).click();
  }

  async removeItemByName(productName: string) {
    const removeButton = this.page.locator(`[data-test="remove-${productName.toLowerCase().replace(/\s+/g, '-')}"]`);
    await removeButton.click();
  }

  async continueShopping() {
    await this._continueShoppingButton.click();
  }

  async proceedToCheckout() {
    await this._checkoutButton.click();
  }

  async isCartEmpty() {
    return (await this._cartItems.count()) === 0;
  }

  async getCartBadgeText() {
    if (await this._cartBadge.isVisible()) {
      return await this._cartBadge.textContent();
    }
    return null;
  }

  async clearCart() {
    const itemCount = await this.getCartItemsCount();
    for (let i = itemCount - 1; i >= 0; i--) {
      await this.removeItemByIndex(i);
    }
  }
}

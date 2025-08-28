import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  private page!: Page;
  private _inventoryContainer!: Locator;
  private _inventoryItems!: Locator;
  private _cartBadge!: Locator;
  private _cartButton!: Locator;
  private _menuButton!: Locator;
  private _logoutLink!: Locator;
  private _sortDropdown!: Locator;

  static async create(page: Page): Promise<InventoryPage> {
    const inventoryPage = new InventoryPage();
    inventoryPage.page = page;
    inventoryPage._inventoryContainer = page.locator('[data-test="inventory-container"]');
    inventoryPage._inventoryItems = page.locator('[data-test="inventory-item"]');
    inventoryPage._cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    inventoryPage._cartButton = page.locator('[data-test="shopping-cart-link"]');
    inventoryPage._menuButton = page.locator('#react-burger-menu-btn');
    inventoryPage._logoutLink = page.locator('[data-test="logout-sidebar-link"]');
    inventoryPage._sortDropdown = page.locator('[data-test="product-sort-container"]');
    return inventoryPage;
  }

  // Getters pour accéder aux locators
  get inventoryContainer() { return this._inventoryContainer; }
  get inventoryItems() { return this._inventoryItems; }
  get cartBadge() { return this._cartBadge; }
  get cartButton() { return this._cartButton; }
  get menuButton() { return this._menuButton; }
  get logoutLink() { return this._logoutLink; }
  get sortDropdown() { return this._sortDropdown; }

  async addToCartByIndex(index: number) {
    const addToCartButton = this._inventoryItems.nth(index).locator('[data-test*="add-to-cart"]');
    await addToCartButton.click();
  }

  async addToCartByName(productName: string) {
    const productButton = this.page.locator(`[data-test="add-to-cart-${productName.toLowerCase().replace(/\s+/g, '-')}"]`);
    await productButton.click();
  }

  async removeFromCartByIndex(index: number) {
    const removeButton = this._inventoryItems.nth(index).locator('[data-test*="remove"]');
    await removeButton.click();
  }

  async getProductNames() {
    return await this._inventoryItems.locator('[data-test="inventory-item-name"]').allTextContents();
  }

  async getProductPrices() {
    return await this._inventoryItems.locator('[data-test="inventory-item-price"]').allTextContents();
  }

  async getCartItemCount() {
    if (await this._cartBadge.isVisible()) {
      return await this._cartBadge.textContent();
    }
    return '0';
  }

  async goToCart() {
    await this._cartButton.click();
  }

  async sortProducts(option: string) {
    await this._sortDropdown.selectOption(option);
  }

  async logout() {
    await this._menuButton.click();
    await this._logoutLink.click();
  }

  async getInventoryItemsCount() {
    return await this._inventoryItems.count();
  }
}

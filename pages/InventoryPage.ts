import type { Page, Locator } from "@playwright/test";

export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly inventoryList: Locator;
  readonly shoppingCartLink: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByTestId("title");
    this.inventoryList = page.getByTestId("inventory-list");
    this.shoppingCartLink = page.getByTestId("shopping-cart-link");
    this.cartBadge = page.getByTestId("shopping-cart-badge");
  }

  getProductItem(productName: string) {
    return this.page
      .getByTestId("inventory-item")
      .filter({ hasText: productName });
  }

  getRemoveButton(productName: string) {
    const product = this.getProductItem(productName);
    return product.getByRole("button", { name: "Remove" });
  }

  async addProductToCart(productName: string) {
    const product = this.getProductItem(productName);
    await product.getByRole("button", { name: "Add to cart" }).click();
  }

  async removeProductFromCart(productName: string) {
    const product = this.getProductItem(productName);
    await product.getByRole("button", { name: "Remove" }).click();
  }

  async openCart() {
    await this.shoppingCartLink.click();
  }
}

import type { Page, Locator } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly title: Locator;
  readonly cartList: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByTestId("title");
    this.cartList = page.getByTestId("cart-list");
    this.checkoutButton = page.getByRole("button", { name: "Checkout" });
  }

  getCartItem(productName: string) {
    return this.page
      .getByTestId("inventory-item")
      .filter({ hasText: productName });
  }

  async removeProduct(productName: string) {
    const cartItem = this.getCartItem(productName);

    await cartItem.getByRole("button", { name: "Remove" }).click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}

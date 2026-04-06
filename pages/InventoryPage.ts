import type { Page, Locator } from "@playwright/test";

export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly inventoryList: Locator;
  readonly shoppingCartLink: Locator;
  readonly cartBadge: Locator;
  readonly sortContainer: Locator;
  readonly activeSortOption: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByTestId("title");
    this.inventoryList = page.getByTestId("inventory-list");
    this.shoppingCartLink = page.getByTestId("shopping-cart-link");
    this.cartBadge = page.getByTestId("shopping-cart-badge");
    this.sortContainer = page.getByTestId("product-sort-container");
    this.activeSortOption = page.getByTestId("active-option");
  }

  getProductItem(productName: string): Locator {
    return this.page
      .getByTestId("inventory-item")
      .filter({ hasText: productName });
  }

  getAddToCartButton(productName: string): Locator {
    const product = this.getProductItem(productName);
    return product.getByRole("button", { name: "Add to cart" });
  }

  getRemoveButton(productName: string): Locator {
    const product = this.getProductItem(productName);
    return product.getByRole("button", { name: "Remove" });
  }

  async getProductNameList(): Promise<string[]> {
    return await this.inventoryList
      .getByTestId("inventory-item-name")
      .allTextContents();
  }

  async getProductPriceList(): Promise<number[]> {
    const priceStringList = await this.inventoryList
      .getByTestId("inventory-item-price")
      .allTextContents();

    return priceStringList.map((price) =>
      Number(price.replace(/[^0-9.]/g, "")),
    );
  }

  async addProductToCart(productName: string) {
    await this.getAddToCartButton(productName).click();
  }

  async removeProductFromCart(productName: string) {
    await this.getRemoveButton(productName).click();
  }

  async openCart() {
    await this.shoppingCartLink.click();
  }

  async sortNameAscending() {
    await this.sortContainer.selectOption("az");
  }

  async sortNameDescending() {
    await this.sortContainer.selectOption("za");
  }

  async sortPriceAscending() {
    await this.sortContainer.selectOption("lohi");
  }

  async sortPriceDescending() {
    await this.sortContainer.selectOption("hilo");
  }
}

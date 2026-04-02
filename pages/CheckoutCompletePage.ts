import type { Page, Locator } from "@playwright/test";

export class CheckoutCompletePage {
  readonly page: Page;
  readonly title: Locator;
  readonly header: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByTestId("title");
    this.header = page.getByTestId("complete-header");
    this.backHomeButton = page.getByRole("button", { name: "Back Home" });
  }
}

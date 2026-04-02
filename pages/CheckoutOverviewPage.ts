import type { Page, Locator } from "@playwright/test";

export class CheckoutOverviewPage {
  readonly page: Page;
  readonly title: Locator;
  readonly summaryInfoContainer: Locator;
  readonly finishButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByTestId("title");
    this.summaryInfoContainer = page.getByTestId("checkout-summary-container");
    this.finishButton = page.getByRole("button", { name: "Finish" });
  }

  async finishCheckout() {
    await this.finishButton.click();
  }
}

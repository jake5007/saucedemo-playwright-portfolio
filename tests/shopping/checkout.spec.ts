import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { InventoryPage } from "../../pages/InventoryPage";
import { CartPage } from "../../pages/CartPage";
import { CheckoutInfoPage } from "../../pages/CheckoutInfoPage";
import { CheckoutOverviewPage } from "../../pages/CheckoutOverviewPage";
import { CheckoutCompletePage } from "../../pages/CheckoutCompletePage";

const PRODUCT_NAME = "Sauce Labs Backpack";

const CHECKOUT_INFO = {
  firstName: "John",
  lastName: "Doe",
  postalCode: "12345",
};

async function goToCheckoutInfo(
  inventoryPage: InventoryPage,
  cartPage: CartPage,
) {
  await inventoryPage.addProductToCart(PRODUCT_NAME);
  await inventoryPage.openCart();
  await cartPage.proceedToCheckout();
}

test.describe("Checkout Flow", () => {
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutInfoPage: CheckoutInfoPage;
  let checkoutOverviewPage: CheckoutOverviewPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutInfoPage = new CheckoutInfoPage(page);
    checkoutOverviewPage = new CheckoutOverviewPage(page);

    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");
  });

  test("should navigate to checkout info page from cart", async ({ page }) => {
    await goToCheckoutInfo(inventoryPage, cartPage);

    await expect(checkoutInfoPage.title).toContainText(
      "Checkout: Your Information",
    );
    await expect(checkoutInfoPage.firstNameInput).toBeVisible();
    await expect(page).toHaveURL(/checkout-step-one.html/);
  });

  test("should navigate to checkout overview after submitting checkout info", async ({
    page,
  }) => {
    await goToCheckoutInfo(inventoryPage, cartPage);
    await checkoutInfoPage.submitCheckoutInfo(
      CHECKOUT_INFO.firstName,
      CHECKOUT_INFO.lastName,
      CHECKOUT_INFO.postalCode,
    );

    await expect(checkoutOverviewPage.title).toContainText(
      "Checkout: Overview",
    );
    await expect(checkoutOverviewPage.summaryInfoContainer).toBeVisible();
    await expect(page).toHaveURL(/checkout-step-two.html/);
  });

  test("should complete checkout successfully", async ({ page }) => {
    const checkoutCompletePage = new CheckoutCompletePage(page);

    await goToCheckoutInfo(inventoryPage, cartPage);
    await checkoutInfoPage.submitCheckoutInfo(
      CHECKOUT_INFO.firstName,
      CHECKOUT_INFO.lastName,
      CHECKOUT_INFO.postalCode,
    );
    await checkoutOverviewPage.finishCheckout();

    await expect(checkoutCompletePage.title).toContainText(
      "Checkout: Complete",
    );
    await expect(checkoutCompletePage.header).toContainText(
      "Thank you for your order",
    );
    await expect(checkoutCompletePage.backHomeButton).toBeVisible();
    await expect(page).toHaveURL(/checkout-complete.html/);
  });

  test("should show an error when first name is missing", async ({ page }) => {
    await goToCheckoutInfo(inventoryPage, cartPage);

    await checkoutInfoPage.fillLastName(CHECKOUT_INFO.lastName);
    await checkoutInfoPage.fillPostalCode(CHECKOUT_INFO.postalCode);
    await checkoutInfoPage.continueCheckout();

    await expect(checkoutInfoPage.errorMessage).toBeVisible();
    await expect(checkoutInfoPage.errorMessage).toContainText(
      "First Name is required",
    );
    await expect(page).toHaveURL(/checkout-step-one.html/);
  });

  test("should show an error when last name is missing", async ({ page }) => {
    await goToCheckoutInfo(inventoryPage, cartPage);

    await checkoutInfoPage.fillFirstName(CHECKOUT_INFO.firstName);
    await checkoutInfoPage.fillPostalCode(CHECKOUT_INFO.postalCode);
    await checkoutInfoPage.continueCheckout();

    await expect(checkoutInfoPage.errorMessage).toBeVisible();
    await expect(checkoutInfoPage.errorMessage).toContainText(
      "Last Name is required",
    );
    await expect(page).toHaveURL(/checkout-step-one.html/);
  });

  test("should show an error when postal code is missing", async ({ page }) => {
    await goToCheckoutInfo(inventoryPage, cartPage);

    await checkoutInfoPage.fillFirstName(CHECKOUT_INFO.firstName);
    await checkoutInfoPage.fillLastName(CHECKOUT_INFO.lastName);
    await checkoutInfoPage.continueCheckout();

    await expect(checkoutInfoPage.errorMessage).toBeVisible();
    await expect(checkoutInfoPage.errorMessage).toContainText(
      "Postal Code is required",
    );
    await expect(page).toHaveURL(/checkout-step-one.html/);
  });

  test("should show an error when all fields are missing", async ({ page }) => {
    await goToCheckoutInfo(inventoryPage, cartPage);

    await checkoutInfoPage.continueCheckout();

    await expect(checkoutInfoPage.errorMessage).toBeVisible();
    await expect(checkoutInfoPage.errorMessage).toContainText(
      "First Name is required",
    );
    await expect(page).toHaveURL(/checkout-step-one.html/);
  });
});

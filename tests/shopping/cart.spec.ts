import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { InventoryPage } from "../../pages/InventoryPage";
import { CartPage } from "../../pages/CartPage";

const PRODUCT_NAME = "Sauce Labs Backpack";

test.describe("Cart Flow", () => {
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);

    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");
  });

  test("should add a backpack to the cart and update cart badge", async () => {
    await inventoryPage.addProductToCart(PRODUCT_NAME);
    await expect(inventoryPage.getRemoveButton(PRODUCT_NAME)).toBeVisible();
    await expect(inventoryPage.cartBadge).toHaveText("1");
  });

  test("should show backpack in cart after adding it from inventory", async () => {
    await inventoryPage.addProductToCart(PRODUCT_NAME);
    await inventoryPage.openCart();

    await expect(cartPage.title).toContainText("Your Cart");
    await expect(cartPage.getCartItem(PRODUCT_NAME)).toContainText(
      PRODUCT_NAME,
    );
  });

  test("should remove product from cart and verify UI consistency", async () => {
    await inventoryPage.addProductToCart(PRODUCT_NAME);

    await expect(inventoryPage.getRemoveButton(PRODUCT_NAME)).toBeVisible();
    await expect(inventoryPage.cartBadge).toHaveText("1");

    await inventoryPage.removeProductFromCart(PRODUCT_NAME);

    await expect(inventoryPage.cartBadge).toHaveCount(0);
    await expect(inventoryPage.getAddToCartButton(PRODUCT_NAME)).toBeVisible();

    await inventoryPage.openCart();
    await expect(cartPage.getCartItem(PRODUCT_NAME)).toHaveCount(0);
  });

  test("should add the correct product to cart after sorting", async () => {
    await inventoryPage.sortPriceAscending();
    await inventoryPage.addProductToCart(PRODUCT_NAME);

    await expect(inventoryPage.cartBadge).toHaveText("1");

    await inventoryPage.openCart();

    await expect(cartPage.getCartItem(PRODUCT_NAME)).toBeVisible();
  });
});

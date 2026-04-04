import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { InventoryPage } from "../../pages/InventoryPage";
import {
  sortStringsAscending,
  sortStringsDescending,
  sortNumbersAscending,
  sortNumbersDescending,
} from "../helpers/sortHelpers";

const SORT_OPTIONS = {
  nameAsc: "Name (A to Z)",
  nameDesc: "Name (Z to A)",
  priceAsc: "Price (low to high)",
  priceDesc: "Price (high to low)",
} as const;

test.describe("Product sorting", () => {
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");
  });

  test("should sort products by name in ascending order", async () => {
    const beforeSort = await inventoryPage.getProductNameList();
    await inventoryPage.sortNameAscending();
    const afterSort = await inventoryPage.getProductNameList();

    const expected = sortStringsAscending(beforeSort);

    await expect(inventoryPage.activeSortOption).toContainText(
      SORT_OPTIONS.nameAsc,
    );
    expect(afterSort).toEqual(expected);
  });

  test("should sort products by name in descending order", async () => {
    const beforeSort = await inventoryPage.getProductNameList();
    await inventoryPage.sortNameDescending();
    const afterSort = await inventoryPage.getProductNameList();

    const expected = sortStringsDescending(beforeSort);

    await expect(inventoryPage.activeSortOption).toContainText(
      SORT_OPTIONS.nameDesc,
    );
    expect(afterSort).toEqual(expected);
  });

  test("should sort products by price in ascending order", async () => {
    const beforeSort = await inventoryPage.getProductPriceList();
    await inventoryPage.sortPriceAscending();
    const afterSort = await inventoryPage.getProductPriceList();

    const expected = sortNumbersAscending(beforeSort);

    await expect(inventoryPage.activeSortOption).toContainText(
      SORT_OPTIONS.priceAsc,
    );
    expect(afterSort).toEqual(expected);
  });

  test("should sort products by price in descending order", async () => {
    const beforeSort = await inventoryPage.getProductPriceList();
    await inventoryPage.sortPriceDescending();
    const afterSort = await inventoryPage.getProductPriceList();

    const expected = sortNumbersDescending(beforeSort);

    await expect(inventoryPage.activeSortOption).toContainText(
      SORT_OPTIONS.priceDesc,
    );
    expect(afterSort).toEqual(expected);
  });
});

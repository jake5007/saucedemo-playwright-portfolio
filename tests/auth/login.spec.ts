import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";

test.describe("Authentication - Login", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test("should login successfully with valid credentials", async ({ page }) => {
    await loginPage.login("standard_user", "secret_sauce");

    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.getByTestId("title")).toHaveText("Products");
  });

  test("should show an error message for locked out user", async ({ page }) => {
    await loginPage.login("locked_out_user", "secret_sauce");

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText("locked out");
    await expect(page).not.toHaveURL(/inventory.html/);
  });

  test("should show an error when password is missing", async ({ page }) => {
    await loginPage.fillUsername("standard_user");
    await loginPage.clickLogin();

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText("password is required", {
      ignoreCase: true,
    });
    await expect(page).not.toHaveURL(/inventory.html/);
  });

  test("should show an error when username is missing", async ({ page }) => {
    await loginPage.fillPassword("secret_sauce");
    await loginPage.clickLogin();

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText("username is required", {
      ignoreCase: true,
    });
    await expect(page).not.toHaveURL(/inventory.html/);
  });

  test("should show an error when username and password are missing", async ({
    page,
  }) => {
    await loginPage.clickLogin();

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText("username is required", {
      ignoreCase: true,
    });
    await expect(page).not.toHaveURL(/inventory.html/);
  });

  test("should show an error when username and password do not match", async ({
    page,
  }) => {
    await loginPage.login("standard_user", "1234");

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText("do not match", {
      ignoreCase: true,
    });
    await expect(page).not.toHaveURL(/inventory.html/);
  });
});

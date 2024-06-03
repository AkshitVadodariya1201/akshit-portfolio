import { expect, test } from "@playwright/test";

test.describe("Login Page", () => {
  test.beforeEach("Log in URL", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
  });

  test("Valid login", async ({ page }) => {
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="inventory-list"]')).toBeVisible();
    await expect(page.locator('[data-test="title"]')).toContainText("Products");
    page.close();
  });

  test("Invalid login", async ({ page }) => {
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill("secrat_sauce");
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    page.close();
  });

  test("Empty username", async ({ page }) => {
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toContainText(
      "Epic sadface: Username is required",
    );
    page.close();
  });

  test("Empty password", async ({ page }) => {
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toContainText(
      "Epic sadface: Password is required",
    );
    page.close();
  });

  test("Password masking", async ({ page }) => {
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await expect(page.locator('[data-test="password"]')).toHaveAttribute(
      "type",
      "password",
    );
    page.close();
  });
});

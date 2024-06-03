import { expect, test } from "@playwright/test";

test.describe("Complete Test", () => {
  test.beforeEach("Log in", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')
      .click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]')
      .click();
    await page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]')
      .click();
    await expect(page.locator('[data-test="shopping-cart-badge"]'))
      .toContainText(
        "3",
      );
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').click();
    await page.locator('[data-test="firstName"]').fill("user");
    await page.locator('[data-test="lastName"]').click();
    await page.locator('[data-test="lastName"]').fill("admin");
    await page.locator('[data-test="postalCode"]').click();
    await page.locator('[data-test="postalCode"]').fill("123456");
    await page.locator('[data-test="continue"]').click();
    await page.locator('[data-test="finish"]').click();
  });

  test("Confirmation Message", async ({ page }) => {
    await expect(page.locator('[data-test="checkout-complete-container"]'))
      .toBeVisible();
    await expect(page.locator('[data-test="title"]')).toContainText(
      "Checkout: Complete!",
    );
    await expect(page.locator('[data-test="checkout-complete-container"]'))
      .toContainText(
        "Thank you for your order!Your order has been dispatched, and will arrive just as fast as the pony can get there!Back Home",
      );
  });

  test("Back Home Button", async ({ page }) => {
    await expect(page.locator('[data-test="checkout-complete-container"]'))
      .toBeVisible();
    await expect(page.locator('[data-test="title"]')).toContainText(
      "Checkout: Complete!",
    );
    await expect(page.locator('[data-test="checkout-complete-container"]'))
      .toContainText(
        "Thank you for your order!Your order has been dispatched, and will arrive just as fast as the pony can get there!Back Home",
      );
    await page.locator('[data-test="back-to-products"]').click();
    await expect(page.locator('[data-test="inventory-container"]'))
      .toBeVisible();
  });

  test.afterEach("Log out", async ({ page }) => {
    await page.getByRole("button", { name: "Open Menu" }).click();
    await page.locator('[data-test="logout-sidebar-link"]').click();
    page.close();
  });
});

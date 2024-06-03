import { expect, test } from "@playwright/test";

test.describe("Product Page", () => {
  test.beforeEach("Log in", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();
  });

  test("Product List", async ({ page }) => {
    await expect(page.locator('[data-test="inventory-list"]')).toBeVisible();
  });

  test("Product Details", async ({ page }) => {
    await page.locator('[data-test="item-4-img-link"]').click();
    await expect(page.locator('[data-test="item-sauce-labs-backpack-img"]'))
      .toBeVisible();
    await expect(page.getByText("Sauce Labs Backpackcarry.")).toBeVisible();
    await expect(page.locator('[data-test="inventory-item-name"]'))
      .toBeVisible();
    await expect(page.locator('[data-test="inventory-item-desc"]'))
      .toBeVisible();
    await expect(page.locator('[data-test="inventory-item-price"]'))
      .toBeVisible();
    await expect(page.locator('[data-test="add-to-cart"]')).toBeVisible();
  });

  test("Add to Cart", async ({ page }) => {
    await page.locator('[data-test="item-4-img-link"]').click();
    await page.locator('[data-test="add-to-cart"]').click();
    await expect(page.locator('[data-test="shopping-cart-link"]'))
      .toBeVisible();
    await expect(page.locator('[data-test="shopping-cart-badge"]'))
      .toContainText(
        "1",
      );
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.locator('[data-test="inventory-item"]')).toBeVisible();
  });

  test("Remove from Cart", async ({ page }) => {
    await page.locator('[data-test="item-4-img-link"]').click();
    await page.locator('[data-test="add-to-cart"]').click();
    await expect(page.locator('[data-test="shopping-cart-link"]'))
      .toBeVisible();
    await expect(page.locator('[data-test="shopping-cart-badge"]'))
      .toContainText(
        "1",
      );
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.locator('[data-test="inventory-item"]')).toBeVisible();
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
    await expect(page.locator('[data-test="cart-list"]')).toBeVisible();
  });

  test("Cart Navigation", async ({ page }) => {
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.locator('[data-test="cart-contents-container"]'))
      .toBeVisible();
    await expect(page.locator('[data-test="secondary-header"]')).toBeVisible();
    await expect(page.locator('[data-test="secondary-header"]')).toContainText(
      "Your Cart",
    );
  });

  test("Sort Products", async ({ page }) => {
    await page.getByText("Name (A to Z)Name (A to Z)").click();
    await page.locator('[data-test="product-sort-container"]').selectOption(
      "za",
    );
    const productElements = await page.$$(".inventory_item_name");
    const productNames = await Promise.all(
      productElements.map((element) => element.innerText()),
    );
    const sortedProductNames = [...productNames].sort((a, b) =>
      a.localeCompare(b)
    ).reverse();
    expect(productNames).toEqual(sortedProductNames);
  });

  test.afterEach("Log out", async ({ page }) => {
    await page.getByRole("button", { name: "Open Menu" }).click();
    await page.locator('[data-test="logout-sidebar-link"]').click();
    page.close();
  });
});

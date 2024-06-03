import { expect, test } from "@playwright/test";

test.describe("Cart Overview", () => {
  test.beforeEach("Log in", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();
  });

  test("Item List", async ({ page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]')
      .click();
    await page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]')
      .click();
    await expect(page.locator('[data-test="shopping-cart-badge"]'))
      .toContainText(
        "3",
      );
    await expect(page.locator('[data-test="shopping-cart-link"]'))
      .toBeVisible();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.locator('[data-test="cart-list"]')).toBeVisible();
  });

  test("Item Details", async ({ page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]')
      .click();
    await page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]')
      .click();
    await expect(page.locator('[data-test="shopping-cart-badge"]'))
      .toContainText(
        "3",
      );
    await expect(page.locator('[data-test="shopping-cart-link"]'))
      .toBeVisible();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.locator('[data-test="cart-list"]')).toBeVisible();
    await expect(
      page.locator(
        '[data-test="item-4-title-link"] [data-test="inventory-item-name"]',
      ),
    ).toContainText("Sauce Labs Backpack");
    await expect(page.locator('[data-test="cart-list"]')).toContainText(
      "carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.",
    );
    await expect(page.locator('[data-test="cart-list"]')).toContainText(
      "$29.99",
    );
    await expect(
      page.locator(
        '[data-test="item-0-title-link"] [data-test="inventory-item-name"]',
      ),
    ).toContainText("Sauce Labs Bike Light");
    await expect(page.locator('[data-test="cart-list"]')).toContainText(
      "A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.",
    );
    await expect(page.locator('[data-test="cart-list"]')).toContainText(
      "$9.99",
    );
    await expect(
      page.locator(
        '[data-test="item-5-title-link"] [data-test="inventory-item-name"]',
      ),
    ).toContainText("Sauce Labs Fleece Jacket");
    await expect(page.locator('[data-test="cart-list"]')).toContainText(
      "It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.",
    );
    await expect(page.locator('[data-test="cart-list"]')).toContainText(
      "$49.99",
    );
  });

  test("Total Price", async ({ page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]')
      .click();

    await expect(page.locator('[data-test="shopping-cart-badge"]'))
      .toContainText(
        "2",
      );
    await page.locator('[data-test="shopping-cart-link"]').click();
    const backpackPriceElement = await page.locator(':text("$29.99")');
    const backpackPrice = parseFloat(
      (await backpackPriceElement.innerText()).replace("$", ""),
    );
    const bikeLightPriceElement = await page.locator(':text("$9.99")');
    const bikeLightPrice = parseFloat(
      (await bikeLightPriceElement.innerText()).replace("$", ""),
    );
    const expectedTotalPrice = backpackPrice + bikeLightPrice;
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').click();
    await page.locator('[data-test="firstName"]').fill("user");
    await page.locator('[data-test="lastName"]').click();
    await page.locator('[data-test="lastName"]').fill("admin");
    await page.locator('[data-test="postalCode"]').click();
    await page.locator('[data-test="postalCode"]').fill("123456");
    await page.locator('[data-test="continue"]').click();
    const totalPriceElement = await page.locator(
      '[data-test="subtotal-label"]',
    );
    const totalPrice = parseFloat(
      (await totalPriceElement.innerText()).replace("Item total: $", ""),
    );
    expect(totalPrice).toBeCloseTo(expectedTotalPrice, 2);
  });

  test("Cancel Button", async ({ page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
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
    await page.locator('[data-test="cancel"]').click();
    await expect(page.locator('[data-test="cart-list"]')).toBeVisible();
  });

  test("Finish Button", async ({ page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
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
    await expect(page.locator('[data-test="checkout-complete-container"]'))
      .toBeVisible();
    await expect(page.locator('[data-test="title"]')).toContainText(
      "Checkout: Complete!",
    );
  });

  test.afterEach("Log out", async ({ page }) => {
    await page.getByRole("button", { name: "Open Menu" }).click();
    await page.locator('[data-test="logout-sidebar-link"]').click();
    page.close();
  });
});

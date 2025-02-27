import { test, expect, chromium } from "@playwright/test";
let browser: any;
let page;

test.beforeAll(async () => {
  browser = await chromium.launch();
  page = await browser.newPage();
});

test.afterAll(async () => {
  await browser.close();
});

test("Login test with standard_user and secret_sauce", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await page.fill('input[name="user-name"]', "standard_user");
  await page.fill('input[name="password"]', "secret_sauce");
  await page.click('input[data-test="login-button"]');
  await page.waitForURL("https://www.saucedemo.com/inventory.html");
  const inventoryPage = await page.isVisible('//div[@class="app_logo" and text()="Swag Labs"]');
  expect(inventoryPage).toBe(true);
  await page.locator("#item_4_title_link").click();
  await page.waitForURL("https://www.saucedemo.com/inventory-item.html?id=4");
  const checkoutPage = await page.isVisible(
    '[data-test="inventory-item-name"]:has-text("Sauce Labs Backpack")'
  );
  expect(checkoutPage).toBe(true);
  await page.getByRole("button", { name: /add to cart/i }).click();
  await page.waitForTimeout(1000);
  const cartPage = await page.isVisible('[data-test="remove"]');
  expect(cartPage).toBe(true);
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="checkout"]').click();
  await page.fill('input[data-test="firstName"]', "Goutham");
  await page.fill('input[data-test="lastName"]', "Last Name");
  await page.fill('input[data-test="postalCode"]', "1768798");
  await page.getByRole("button", { name: "Continue" }).click();
  await page.waitForURL("https://www.saucedemo.com/checkout-step-two.html");
  const checkoutOverviewPage = await page.isVisible('span[data-test="title"]');
  expect(checkoutOverviewPage).toBe(true);
  await page.waitForTimeout(1000);
  await page.locator('button[data-test="finish"]').click();
});




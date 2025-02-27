import { test, expect, chromium } from "@playwright/test";
import { ai } from "@zerostep/playwright";
let browser: any;
let page;

test.beforeAll(async () => {
  browser = await chromium.launch();
  page = await browser.newPage();
});

test.afterAll(async () => {
  await browser.close();
});

test("Login and checkout", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  const aiArgs = { page, test };
  await ai(`Enter standard_user as the username`, aiArgs);
  await ai(`Enter secret_sauce as the password`, aiArgs);
  await ai("Click Login", aiArgs);
  await page.waitForURL("https://www.saucedemo.com/inventory.html");
  const inventoryPage = await page.isVisible('//div[@class="app_logo" and text()="Swag Labs"]');
  expect(inventoryPage).toBe(true);
  await ai("Click on Sauce Labs Backpack", aiArgs);
  await page.waitForURL("https://www.saucedemo.com/inventory-item.html?id=4");
  const checkoutPage = await page.isVisible('[data-test="inventory-item-name"]:has-text("Sauce Labs Backpack")');
  expect(checkoutPage).toBe(true);
  await ai("Click on Add to Cart", aiArgs);
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="checkout"]').click();
  await ai("Fill out the fields with realistic values",aiArgs)
  await page.getByRole("button", { name: "Continue" }).click();
  await page.waitForTimeout(1000);
  await page.locator('button[data-test="finish"]').click();
  
})


test("checkout", async ({ page}) => {
      await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login', { waitUntil: 'networkidle' })
      const aiArgs = { page, test };
      await ai('Enter Admin as the username',aiArgs)
      await ai('Enter admin123 as the password',aiArgs)  
      await page.locator('button.oxd-button--main').click()
      await page.waitForTimeout(5000)
      await ai('Search for "performance"',aiArgs)
      await ai('Click the Performance link',aiArgs)
      await page.waitForTimeout(2000)
      await ai('Enter "Pavitra" in the employee name input',aiArgs)
      await page.waitForTimeout(2000)
      await ai('Click on the result displayed',aiArgs)
      await page.waitForTimeout(2000)
      await ai('Click the "Search" button in the employee reviews section',aiArgs)
      const noRecordsFound = await ai('Confirm there are no records found',aiArgs)
      expect(noRecordsFound).toEqual(false)
    })
  

import { test, expect } from '@playwright/test';

test.describe('loggedin state', () => {

  test('add item to cart', async ({page}) => {
    // Go to homepage
    await page.goto('https://www.saucedemo.com/inventory.html')

    // Add backpack to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // Click on shopping cart
    await page.locator('[data-test="shopping-cart-link"]').click();

    // Click on checkout
    await page.locator('[data-test="checkout"]').click();

    // Fill first name
    await page.locator('[data-test="firstName"]').click();
    await page.locator('[data-test="firstName"]').fill('Richard');

    // Fill last name
    await page.locator('[data-test="lastName"]').click();
    await page.locator('[data-test="lastName"]').fill('Nassar');

    // Fill postal code
    await page.locator('[data-test="postalCode"]').click();
    await page.locator('[data-test="postalCode"]').fill('1212');

    // Click on Continue
    await page.locator('[data-test="continue"]').click();
    await expect(page.locator('[data-test="item-4-title-link"]')).toBeVisible();

    // Verify total price
    await expect(page.locator('[data-test="total-label"]')).toBeVisible();

    // Click on finish
    await page.locator('[data-test="finish"]').click();

    // Expect to see success message
    await expect(page.locator('[data-test="complete-header"]')).toBeVisible();

    // Go back to homepage
    await page.locator('[data-test="back-to-products"]').click();
    await expect(page.getByText('Swag Labs')).toBeVisible();
  })
})

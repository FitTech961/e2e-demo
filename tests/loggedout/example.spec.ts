import { test, expect } from '@playwright/test';

test.describe('loggedout state', () => {

  test('verify login page redirection', async ({page}) => {
    await page.goto('https://www.saucedemo.com/inventory.html');

    // Expect to be redireted to the login screen
    expect(page.url()).toBe('https://www.saucedemo.com/');

    await expect(page.locator('[data-test="error"]')).toBeVisible();

  })
})
import { test, expect } from '@playwright/test';

test.describe('loggedout state', () => {

  test('verify login page redirection', async ({page}) => {
    await page.goto('https://www.saucedemo.com/inventory.html');

    // Expect to be redireted to the login screen
    expect(page.url()).toBe('https://www.saucedemo.com/');

    await expect(page.locator('[data-test="error"]')).toBeVisible();
  })

  test('correct username wrong password', async ({page}) => {
    await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('wrongpassword');
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="error"]')).toBeVisible();
  });

  test('correct username and correct password password', async ({page}) => {
    await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('wrongpassword');
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="error"]')).not.toBeVisible();
  })
})
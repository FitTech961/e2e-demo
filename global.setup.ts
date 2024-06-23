import { test as setup , expect} from '@playwright/test';

import { STORAGE_STATE } from './playwright.config';

setup('signup user', async ({ page }) => {

  // Navigate to the site
  await page.goto('https://www.saucedemo.com/')

  // Fill username
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');

  // fill password
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');

  // Click on login
  await page.locator('[data-test="login-button"]').click();

  // Verify that we are navigated to the landing page
  await expect(page.getByText('Swag Labs')).toBeVisible();

  // Save the storage state
  await page.context().storageState({ path: STORAGE_STATE });

});

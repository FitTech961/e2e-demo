import { defineConfig, devices } from '@playwright/test';
import path from 'path';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

export const STORAGE_STATE = path.join(__dirname, '.auth/user.json');


/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects */
  projects: [
    {
      name: 'sign up user',
      testMatch: /global.setup\.ts/,
      teardown: 'global teardown',
    },
    {
      name: 'global teardown',
      testMatch: /global.teardown\.ts/,
    },
    {
      name: 'logged in user',
      use: {
        ...devices['Desktop Chrome'],
        storageState: STORAGE_STATE,
        permissions: ['clipboard-read', 'clipboard-write'],
      },
      testMatch: '/loggedin/*.spec.ts',
      dependencies: ['sign up user'],
    },
    {
      name: 'logged out user',
      use: {
        ...devices['Desktop Chrome'],
        permissions: ['clipboard-read', 'clipboard-write'],
      },
      testMatch: '/loggedout/*.spec.ts',
    },
  ],

});

import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config(); // loads .env


export default defineConfig({
  testDir: '../tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['line'], // will be used to report test run in terminal
    ['json', {  outputFile: '../test-results/last-run-results.json' }] // will be using json to store test results in the test-results file
  ],
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  retries: Number(process.env.RETRY_TIMES) ? 2 : 0,
  expect: {
    timeout: Number(process.env.ELEMENT_TIMEOUT),
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],
});

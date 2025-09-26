import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: false, // Deshabilitado para evitar conflictos
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: 1,
  /* Opt out of parallel tests on CI. */
  workers: 1, // Solo un worker para evitar conflictos
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Global timeout for each test */
  timeout: 60 * 1000,
  /* Expect timeout for assertions */
  expect: {
    timeout: 10 * 1000,
  },
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:5173',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    /* Take screenshot on failure */
    screenshot: 'only-on-failure',
    /* Record video on failure */
    video: 'retain-on-failure',
    /* Navigation timeout */
    navigationTimeout: 30 * 1000,
    /* Action timeout */
    actionTimeout: 15 * 1000,
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
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },

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

  /* Configure web servers - Commented out as servers are already running */
  // webServer: [
  //   {
  //     command: 'cd ../../Frontend/joyeria && npm run dev',
  //     url: 'http://localhost:5173',
  //     reuseExistingServer: !process.env.CI,
  //     timeout: 180 * 1000, // 3 minutes
  //     stdout: 'pipe',
  //     stderr: 'pipe',
  //   },
  //   {
  //     command: 'cd ../../Frontend/admin && npm run dev -- --port 5174',
  //     url: 'http://localhost:5174',
  //     reuseExistingServer: !process.env.CI,
  //     timeout: 180 * 1000, // 3 minutes
  //     stdout: 'pipe',
  //     stderr: 'pipe',
  //   },
  //   {
  //     command: 'cd ../../Backend && python manage.py runserver 8000',
  //     url: 'http://localhost:8000',
  //     reuseExistingServer: !process.env.CI,
  //     timeout: 180 * 1000, // 3 minutes
  //     stdout: 'pipe',
  //     stderr: 'pipe',
  //   }
  // ],
});
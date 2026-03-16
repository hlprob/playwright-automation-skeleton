# Playwright Automation Skeleton

A starting point for building a Playwright end-to-end test suite from scratch using TypeScript. Includes a scalable folder structure with page objects, locators, fixtures, and spec files ready to be built out.

## Project Structure

```
tests/
  specs/
    login.spec.ts         # Login test skeleton
    payment.spec.ts       # Payment test skeleton (CC and ACH)
  pages/
    loginPage.ts          # Login page object with readonly Locator properties
  locators/
    paymentLocators.ts    # Payment test IDs — used with page.getByTestId() in the spec.
                          # Login locators live in loginPage.ts since it has a page object.
  fixtures/
    paymentData.json      # Dynamic fixture data (written/read between tests)
    generated/            # Gitignored — for data written during test runs.
                          # Contains a .gitkeep so the folder is present when cloning,
                          # but its contents are never committed
  testData/
    index.ts              # Static typed test data constants
playwright.config.ts      # Playwright configuration
tsconfig.json             # TypeScript configuration
```

## Installation and How to Run

```
npm install
npx playwright install                                          # Install browsers
npx playwright test                                            # Run all tests headlessly
npx playwright test tests/specs/login.spec.ts                  # Run a single spec headlessly
npx playwright test --headed                                   # Run tests with browser visible
npx playwright test --ui                                       # Open Playwright UI mode
```

## Getting Started

This skeleton is ready to run once you swap in your application's real values:

1. Update `baseURL` in `playwright.config.ts` to point to your application
2. Update `page.goto()` paths in the spec files to match your real routes
3. Replace `data-testid` values in the locator files and page objects with your actual element test IDs
4. Add page objects for additional pages
5. Fill in the `TODO` sections in the spec files with your test logic
6. Update `testData/index.ts` with your real static test data
7. Use `fixtures/paymentData.json` for data that needs to be shared between tests

## Auth State

Once your tests require authenticated pages, use Playwright's [`storageState`](https://playwright.dev/docs/auth) to save and restore login state — avoiding a full UI login in every test that needs an authenticated user.

## Network Interception

Use [`page.route()`](https://playwright.dev/docs/network) to intercept, stub, or modify HTTP requests during tests — useful for controlling API responses, simulating error states, or testing loading behavior without a real backend.

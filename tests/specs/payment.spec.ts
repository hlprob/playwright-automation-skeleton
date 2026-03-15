import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { creditCard, ach } from '../testData/index';
import { paymentLocators } from '../locators/paymentLocators';

// NOTE: The CC and ACH tests are intentionally dependent — the CC test writes payerName
// to the fixture, and the ACH test reads it back. This is a skeleton example of the
// write/read fixture pattern. In a real project, tests should generally be independent.
//
// NOTE: This spec intentionally interacts with the page directly via page.getByTestId()
// rather than through a page object. This is an alternative pattern to the page object
// approach shown in login.spec.ts — useful for simpler flows or when a page object would
// add unnecessary overhead.

const fixturesPath = path.join(__dirname, '../fixtures/paymentData.json');

test.describe('Payment', () => {
  // serial mode ensures CC runs before ACH — required because CC writes fixture data that ACH reads.
  // Without this, fullyParallel in playwright.config.ts would run them simultaneously and break ACH.
  test.describe.configure({ mode: 'serial' });

  test.beforeEach(async ({ page }) => {
    await page.goto('/pay/faker-national-bank');
  });

  test('should submit a CC payment successfully', async ({ page }) => {
    const payerName = 'Test User';

    // Read fixture and write payerName before test runs
    const data = JSON.parse(fs.readFileSync(fixturesPath, 'utf-8'));
    fs.writeFileSync(fixturesPath, JSON.stringify({ ...data, payerName }));

    // TODO: update test IDs to match the payment form
    await page.getByTestId(paymentLocators.typeCc).click();
    await page.getByTestId(paymentLocators.payerName).fill(payerName);
    await page.getByTestId(paymentLocators.ccNumber).fill(creditCard.number);
    await page.getByTestId(paymentLocators.ccExpiration).fill(creditCard.expirationDate);
    await page.getByTestId(paymentLocators.ccCvv).fill(creditCard.cvv);
    await page.getByTestId(paymentLocators.amount).fill('1.00');
    await page.getByTestId(paymentLocators.submitBtn).click();

    // TODO: assert successful payment submission
    await expect(page.getByTestId(paymentLocators.successMessage)).toBeVisible();
  });

  test('should submit an ACH payment successfully', async ({ page }) => {
    // Read payerName written during CC test
    const data = JSON.parse(fs.readFileSync(fixturesPath, 'utf-8'));

    // TODO: update test IDs to match the payment form
    await page.getByTestId(paymentLocators.typeAch).click();
    await page.getByTestId(paymentLocators.payerName).fill(data.payerName);
    await page.getByTestId(paymentLocators.routingNumber).fill(ach.routingNumber);
    await page.getByTestId(paymentLocators.accountNumber).fill(ach.accountNumber);
    await page.getByTestId(paymentLocators.amount).fill('1.00');
    await page.getByTestId(paymentLocators.submitBtn).click();

    // TODO: assert successful payment submission
    await expect(page.getByTestId(paymentLocators.successMessage)).toBeVisible();
  });
});

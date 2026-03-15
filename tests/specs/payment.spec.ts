import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { creditCard, ach } from '../testData/index';
import { locators } from '../locators/loginLocators';

// NOTE: The CC and ACH tests are intentionally dependent — the CC test writes payerName
// to the fixture, and the ACH test reads it back. This is a skeleton example of the
// write/read fixture pattern. In a real project, tests should generally be independent.

const fixturesPath = path.join(__dirname, '../fixtures/paymentData.json');

test.describe('Payment Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/pay/faker-national-bank');
  });

  test.describe('Credit Card Payment', () => {
    test('should submit a CC payment successfully', async ({ page }) => {
      const payerName = 'Test User';

      // Read fixture and write payerName before test runs
      const data = JSON.parse(fs.readFileSync(fixturesPath, 'utf-8'));
      fs.writeFileSync(fixturesPath, JSON.stringify({ ...data, payerName }));

      // TODO: update selectors to match the payment form
      await page.click(locators.payment.typeCc);
      await page.fill(locators.payment.payerName, payerName);
      await page.fill(locators.payment.ccNumber, creditCard.number);
      await page.fill(locators.payment.ccExpiration, creditCard.expirationDate);
      await page.fill(locators.payment.ccCvv, creditCard.cvv);
      await page.fill(locators.payment.amount, '1.00');
      await page.click(locators.payment.submitBtn);

      // TODO: assert successful payment submission
      await expect(page.locator(locators.payment.successMessage)).toBeVisible();
    });
  });

  test.describe('ACH Payment', () => {
    test('should submit an ACH payment successfully', async ({ page }) => {
      // Read payerName written during CC test
      const data = JSON.parse(fs.readFileSync(fixturesPath, 'utf-8'));

      // TODO: update selectors to match the payment form
      await page.click(locators.payment.typeAch);
      await page.fill(locators.payment.payerName, data.payerName);
      await page.fill(locators.payment.routingNumber, ach.routingNumber);
      await page.fill(locators.payment.accountNumber, ach.accountNumber);
      await page.fill(locators.payment.amount, '1.00');
      await page.click(locators.payment.submitBtn);

      // TODO: assert successful payment submission
      await expect(page.locator(locators.payment.successMessage)).toBeVisible();
    });
  });
});

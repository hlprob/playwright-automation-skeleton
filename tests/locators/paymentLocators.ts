// Payment test IDs — used with page.getByTestId() in payment.spec.ts, which intentionally
// skips a page object to demonstrate the direct-locator pattern as an alternative approach.
// Locators for page-object-backed pages (e.g. login) live in their page class instead.
export const paymentLocators = {
  typeCc: 'payment-type-cc',
  typeAch: 'payment-type-ach',
  payerName: 'payer-name',
  ccNumber: 'cc-number',
  ccExpiration: 'cc-expiration',
  ccCvv: 'cc-cvv',
  routingNumber: 'routing-number',
  accountNumber: 'account-number',
  amount: 'amount',
  submitBtn: 'submit-btn',
  successMessage: 'success-message',
};

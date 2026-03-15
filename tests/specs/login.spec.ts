import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

test.describe('Authentication', () => {
  test('should log in successfully with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.visit();

    // TODO: update test IDs to match the login form
    await loginPage.login('test@example.com', 'password123');

    // TODO: assert successful login (e.g. redirect, welcome message)
    await expect(page).not.toHaveURL('/login');
  });

  test('should show an error with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.visit();

    // TODO: update test IDs to match the login form
    await loginPage.login('invalid@example.com', 'wrongpassword');

    // TODO: assert error message
    await expect(loginPage.errorMessage).toBeVisible();
  });

  test('should log out successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.visit();

    // TODO: update test IDs to match the login form
    await loginPage.login('test@example.com', 'password123');
    await loginPage.logoutBtn.click();

    // TODO: assert logout page URL
    await expect(page).toHaveURL('/logout');

    // TODO: assert return to login button is visible
    await expect(loginPage.returnToLoginBtn).toBeVisible();
  });
});

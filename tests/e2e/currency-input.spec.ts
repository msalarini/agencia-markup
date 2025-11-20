
import { test, expect } from '@playwright/test';

test.describe('Currency Input Behavior', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should format input correctly when typing 150', async ({ page }) => {
    const input = page.locator('#custo');
    
    // Type 1, 5, 0 sequentially
    await input.pressSequentially('150', { delay: 100 });
    
    // Expected behavior:
    // 1 -> 0,01
    // 15 -> 0,15
    // 150 -> 1,50
    await expect(input).toHaveValue('1,50');
  });

  test('should format input correctly when typing 15000', async ({ page }) => {
    const input = page.locator('#custo');
    
    await input.pressSequentially('15000', { delay: 50 });
    await expect(input).toHaveValue('150,00');
  });

  test('should handle float precision correctly (0.29 case)', async ({ page }) => {
    const input = page.locator('#custo');
    
    // Type 2, 9 -> 0,29
    // Previously this caused massive numbers due to floating point math
    await input.pressSequentially('29', { delay: 50 });
    
    await expect(input).toHaveValue('0,29');
  });

  test('should not produce erratic values when typing fast', async ({ page }) => {
     const input = page.locator('#custo');
     // Simulate fast typing
     await input.pressSequentially('123456', { delay: 10 });
     
     // 1 -> 0,01
     // 12 -> 0,12
     // 123 -> 1,23
     // 1234 -> 12,34
     // 12345 -> 123,45
     // 12346 -> 1.234,56
     await expect(input).toHaveValue('1.234,56');
  });
});

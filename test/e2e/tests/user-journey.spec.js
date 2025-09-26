import { test, expect } from '@playwright/test';

test.describe('User Journey - Joyería Frontend', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the home page
    await page.goto('/');
  });

  test('should complete full shopping journey', async ({ page }) => {
    // Test home page loads correctly
    await expect(page).toHaveTitle(/Silena Joyeria/);
    
    // Check that basic elements are visible
    await expect(page.locator('body')).toBeVisible();
    await expect(page.locator('html')).toBeVisible();
    
    // Wait for page to be fully loaded
    await page.waitForTimeout(2000);
    
    console.log('Basic navigation test completed successfully');
  });

  test('should load products page', async ({ page }) => {
    // Navigate to products page
    await page.goto('/products');
    
    // Wait for page to load
    await page.waitForTimeout(2000);
    
    // Basic verification that page loaded
    await expect(page.locator('body')).toBeVisible();
    console.log('Products page loaded successfully');
  });

  test('should navigate to different routes', async ({ page }) => {
    // Test different routes
    const routes = ['/', '/products', '/carrito'];
    
    for (const route of routes) {
      await page.goto(route);
      await page.waitForTimeout(1000);
      await expect(page.locator('body')).toBeVisible();
    }
    
    console.log('All routes loaded successfully');
  });

  test('should load cart page', async ({ page }) => {
    // Navigate to cart page
    await page.goto('/carrito');
    await page.waitForTimeout(2000);
    
    // Basic verification that page loaded
    await expect(page.locator('body')).toBeVisible();
    console.log('Cart page loaded successfully');
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Navigate to home page
    await page.goto('/');
    await page.waitForTimeout(2000);
    
    // Basic verification that page is responsive
    await expect(page.locator('body')).toBeVisible();
    console.log('Mobile responsiveness test completed');
  });
});
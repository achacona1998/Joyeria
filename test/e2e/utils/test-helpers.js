/**
 * Test utilities and helpers for E2E tests
 */

/**
 * Mock product data generator
 */
export const generateMockProduct = (id, type = 'anillo', overrides = {}) => {
  const baseProduct = {
    id,
    name: `${type.charAt(0).toUpperCase() + type.slice(1)} ${id}`,
    precio_unidad: 100 + (id * 10),
    pureza: '18k',
    size: 'M',
    peso_neto: 5.5,
    es_publico: true,
    genero_usuario: 'unisex',
    cantUnidades: 10,
    lugar_de_uso: type === 'anillo' ? 'dedo' : 'cuello',
    cantidad: 1,
    photo1: `/media/${type}-${id}.jpg`,
    ...overrides
  };

  // Add type-specific fields
  if (type === 'anillo') {
    baseProduct.tipo_anillo = 'compromiso';
  } else if (type === 'collar') {
    baseProduct.tipo_collar = 'cadena';
    baseProduct.largo = '45cm';
  } else if (type === 'brazalete') {
    baseProduct.tipo_brazalete = 'pulsera';
    baseProduct.largo = '18cm';
  } else if (type === 'dije') {
    baseProduct.tipo_dije = 'colgante';
  }

  return baseProduct;
};

/**
 * Generate mock API response
 */
export const generateMockApiResponse = (products, totalCount = null) => {
  return {
    results: products,
    count: totalCount || products.length,
    next: totalCount && products.length < totalCount ? 'next-page-url' : null,
    previous: null
  };
};

/**
 * Mock authentication response
 */
export const mockAuthResponse = {
  access: 'mock-access-token-' + Date.now(),
  refresh: 'mock-refresh-token-' + Date.now()
};

/**
 * Mock order response
 */
export const generateMockOrder = (items = [], overrides = {}) => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  return {
    id: Math.floor(Math.random() * 10000),
    status: 'pending',
    total,
    created_at: new Date().toISOString(),
    items,
    customer_name: 'Test Customer',
    customer_email: 'test@example.com',
    customer_phone: '+1234567890',
    ...overrides
  };
};

/**
 * Setup common API mocks
 */
export const setupApiMocks = async (page, options = {}) => {
  const {
    products = [],
    enableAuth = false,
    enableOrders = false,
    apiDelay = 0
  } = options;

  // Mock products API
  if (products.length > 0) {
    await page.route('**/app/**/', async route => {
      if (apiDelay > 0) {
        await new Promise(resolve => setTimeout(resolve, apiDelay));
      }
      
      const url = new URL(route.request().url());
      const pathParts = url.pathname.split('/');
      const productType = pathParts[pathParts.length - 2]; // Get product type from URL
      
      const filteredProducts = products.filter(p => 
        p.name.toLowerCase().includes(productType) || 
        url.pathname.includes('all')
      );
      
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(generateMockApiResponse(filteredProducts))
      });
    });
  }

  // Mock authentication API
  if (enableAuth) {
    await page.route('**/auth/jwt/create/', async route => {
      if (route.request().method() === 'POST') {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(mockAuthResponse)
        });
      }
    });
  }

  // Mock orders API
  if (enableOrders) {
    await page.route('**/compra/orden/', async route => {
      if (route.request().method() === 'POST') {
        const requestBody = await route.request().postDataJSON();
        const mockOrder = generateMockOrder(requestBody.items || []);
        
        await route.fulfill({
          status: 201,
          contentType: 'application/json',
          body: JSON.stringify(mockOrder)
        });
      }
    });
  }
};

/**
 * Wait for element with retry logic
 */
export const waitForElementWithRetry = async (page, selector, options = {}) => {
  const { timeout = 10000, retries = 3 } = options;
  
  for (let i = 0; i < retries; i++) {
    try {
      await page.waitForSelector(selector, { timeout: timeout / retries });
      return true;
    } catch (error) {
      if (i === retries - 1) throw error;
      await page.waitForTimeout(1000); // Wait 1 second before retry
    }
  }
};

/**
 * Add products to cart helper
 */
export const addProductsToCart = async (page, productCount = 1) => {
  await page.goto('/products');
  await waitForElementWithRetry(page, '[data-testid="product-card"]');
  
  const addButtons = page.locator('[data-testid="add-to-cart-btn"]');
  const availableButtons = await addButtons.count();
  const itemsToAdd = Math.min(productCount, availableButtons);
  
  for (let i = 0; i < itemsToAdd; i++) {
    await addButtons.nth(i).click();
    await page.waitForTimeout(200); // Small delay between additions
  }
  
  return itemsToAdd;
};

/**
 * Login helper for admin tests
 */
export const loginAsAdmin = async (page, credentials = { username: 'admin', password: 'admin123' }) => {
  await page.goto('http://localhost:5174/login');
  
  await page.fill('[data-testid="username-input"]', credentials.username);
  await page.fill('[data-testid="password-input"]', credentials.password);
  await page.click('[data-testid="login-btn"]');
  
  // Wait for redirect to dashboard
  await page.waitForURL(/.*dashboard/);
};

/**
 * Fill checkout form helper
 */
export const fillCheckoutForm = async (page, customerData = {}) => {
  const defaultData = {
    name: 'Test Customer',
    email: 'test@example.com',
    phone: '+1234567890',
    address: '123 Test Street',
    city: 'Test City',
    ...customerData
  };
  
  await page.fill('[data-testid="customer-name"]', defaultData.name);
  await page.fill('[data-testid="customer-email"]', defaultData.email);
  await page.fill('[data-testid="customer-phone"]', defaultData.phone);
  
  if (defaultData.address) {
    await page.fill('[data-testid="customer-address"]', defaultData.address);
  }
  
  if (defaultData.city) {
    await page.fill('[data-testid="customer-city"]', defaultData.city);
  }
};

/**
 * Check responsive design helper
 */
export const checkResponsiveDesign = async (page, url = '/') => {
  const viewports = [
    { width: 375, height: 667, name: 'Mobile' },
    { width: 768, height: 1024, name: 'Tablet' },
    { width: 1024, height: 768, name: 'Tablet Landscape' },
    { width: 1920, height: 1080, name: 'Desktop' }
  ];
  
  const results = {};
  
  for (const viewport of viewports) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto(url);
    await page.waitForLoadState('networkidle');
    
    // Check if main content is visible
    const isContentVisible = await page.locator('main, [data-testid="main-content"]').isVisible();
    
    results[viewport.name] = {
      viewport,
      contentVisible: isContentVisible,
      url: page.url()
    };
  }
  
  return results;
};

/**
 * Performance measurement helper
 */
export const measurePagePerformance = async (page, url) => {
  const startTime = Date.now();
  
  await page.goto(url);
  await page.waitForLoadState('networkidle');
  
  const loadTime = Date.now() - startTime;
  
  // Get performance metrics
  const metrics = await page.evaluate(() => {
    const navigation = performance.getEntriesByType('navigation')[0];
    const paint = performance.getEntriesByType('paint');
    
    return {
      domContentLoaded: navigation?.domContentLoadedEventEnd - navigation?.domContentLoadedEventStart,
      loadComplete: navigation?.loadEventEnd - navigation?.loadEventStart,
      firstPaint: paint.find(p => p.name === 'first-paint')?.startTime,
      firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime
    };
  });
  
  return {
    totalLoadTime: loadTime,
    ...metrics
  };
};

/**
 * Screenshot comparison helper
 */
export const takeScreenshotComparison = async (page, name, options = {}) => {
  const { fullPage = false, clip = null } = options;
  
  const screenshotOptions = {
    path: `test-results/screenshots/${name}.png`,
    fullPage,
    ...(clip && { clip })
  };
  
  await page.screenshot(screenshotOptions);
  
  return screenshotOptions.path;
};

/**
 * Database cleanup helper (for integration tests)
 */
export const cleanupTestData = async (page) => {
  // Clear localStorage
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
  
  // Clear cookies
  await page.context().clearCookies();
};

/**
 * Wait for API call completion
 */
export const waitForApiCall = async (page, urlPattern, method = 'GET') => {
  return new Promise((resolve) => {
    page.on('response', async (response) => {
      if (response.url().match(urlPattern) && response.request().method() === method) {
        resolve(response);
      }
    });
  });
};

/**
 * Simulate network conditions
 */
export const simulateNetworkConditions = async (page, conditions) => {
  const presets = {
    slow3g: { downloadThroughput: 500 * 1024, uploadThroughput: 500 * 1024, latency: 400 },
    fast3g: { downloadThroughput: 1.6 * 1024 * 1024, uploadThroughput: 750 * 1024, latency: 150 },
    offline: { downloadThroughput: 0, uploadThroughput: 0, latency: 0 }
  };
  
  const networkCondition = presets[conditions] || conditions;
  
  await page.route('**/*', async (route) => {
    if (networkCondition.downloadThroughput === 0) {
      await route.abort();
    } else {
      await new Promise(resolve => setTimeout(resolve, networkCondition.latency));
      await route.continue();
    }
  });
};
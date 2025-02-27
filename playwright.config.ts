import { defineConfig } from '@playwright/test';

export default defineConfig({
  projects: [
    {
      name: 'chrome',
      use: {
        browserName: 'chromium', 
        headless: false, // Runs in headed mode
      },
    },
  ],
});

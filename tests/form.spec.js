import {test, expect} from '@playwright/test';

test('should render page with correct title', async ({page}) => {
  await page.goto('http://localhost:3040/index.html');

  await expect(page).toHaveURL('Sample Pag');
});

test('should render form in main page', async ({page}) => {
  await page.goto('http://localhost:63342/Cake-Factory/HTMLs/index.html');

  await page.fill('input[name="name"]', 'John Doe');

  await page.click('button[type="submit"]');

  await expect(page).toHaveURL('http://localhost:63342/Cake-Factory/HTMLs/index.html');
});

import {test, expect} from '@playwright/test';

test('user should register and to be able to login with that', async ({page}) => {
  await page.goto('http://localhost:3040/index.html');

  const username = await generateRandomString(5);

  await page.locator('#loginButton').click();
  await page.getByRole('button', {name: 'Register'}).click();
  await page.getByPlaceholder('Enter your name').click();
  await page.getByPlaceholder('Enter your name').fill(username);
  await page.getByPlaceholder('Enter your name').press('Tab');
  await page.getByPlaceholder('Enter your username').fill(username);
  await page.getByPlaceholder('Enter your username').press('Tab');
  await page.getByPlaceholder('Enter your email').fill(username + '@gmail.com');
  await page.getByPlaceholder('Enter your email').press('Tab');
  await page.getByPlaceholder('Enter your password').fill('12345');
  await page.getByPlaceholder('Enter your password').press('Tab');
  await page.getByPlaceholder('Enter your Street name').fill(username);
  await page.getByPlaceholder('Enter your Street name').press('Tab');
  await page.getByPlaceholder('Enter your Street address').fill('1');
  await page.getByPlaceholder('Enter your Street address').press('Tab');
  await page.getByPlaceholder('Enter your postal code').fill('12345');
  await page.getByPlaceholder('Enter your postal code').press('Tab');
  await page.getByPlaceholder('Enter your city').fill(username);
  await page.getByRole('button', {name: 'Register'}).click();

  await page.locator('#loginButton').click();
  await page.getByRole('button', {name: 'Login'}).click();
  await page.getByPlaceholder('Enter username').click();
  await page.getByPlaceholder('Enter username').fill(username);
  await page.getByPlaceholder('Enter username').press('Tab');
  await page.getByPlaceholder('Enter password').fill('12345');
  await page.getByPlaceholder('Enter password').press('Enter');

  await expect(page.locator('#logoutButton')).toHaveText('Logout');
  await expect(page.locator('#loginButton')).toHaveText(username);

  await page.locator('#logoutButton').click();
  await page.locator('#loginButton').click();
  await page.getByRole('button', {name: 'Login'}).click();
  await page.getByPlaceholder('Enter username').click();
  await page.getByPlaceholder('Enter username').fill(username);
  await page.getByPlaceholder('Enter username').press('Tab');
  await page.getByPlaceholder('Enter password').fill('12345');
  await page.getByPlaceholder('Enter password').press('Enter');

  await expect(page.locator('#logoutButton')).toHaveText('Logout');
  await expect(page.locator('#loginButton')).toHaveText(username);
  await page.locator('#logoutButton').click();
});

test('should render form in main page', async ({page}) => {
  await page.goto('http://localhost:63342/Cake-Factory/HTMLs/index.html');

  await page.fill('input[name="name"]', 'John Doe');

  await page.click('button[type="submit"]');

  await expect(page).toHaveURL('http://localhost:63342/Cake-Factory/HTMLs/index.html');
});


function generateRandomString(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

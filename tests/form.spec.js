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
  await page.getByRole('button', {name: 'Login'}).click();

  await expect(page.locator('#logoutButton')).toHaveText('Logout');
  await expect(page.locator('#loginButton')).toHaveText(username);

  await page.locator('#logoutButton').click();
  await page.locator('#loginButton').click();
  await page.getByRole('button', {name: 'Login'}).click();
  await page.getByPlaceholder('Enter username').click();
  await page.getByPlaceholder('Enter username').fill(username);
  await page.getByPlaceholder('Enter username').press('Tab');
  await page.getByPlaceholder('Enter password').fill('12345');
  await page.getByRole('button', {name: 'Login'}).click();

  await expect(page.locator('#logoutButton')).toHaveText('Logout');
  await expect(page.locator('#loginButton')).toHaveText(username);
  await page.locator('#logoutButton').click();
});


// Test to verify that the user can't register with an existing username
test('user should not be able to register with an existing username', async ({page}) => {
  const username = await generateRandomString(5);

  // Register the first user
  await registerUser(page, username);

  // Try to register a second user with the same username
  await registerUser(page, username);

  // Check for an error message
  await expect(page.locator('#loginButton')).not.toHaveText(username);
});

// Test to verify that the user can't login with incorrect credentials
test('user should not be able to login with incorrect credentials', async ({page}) => {
  const username = await generateRandomString(5);

  // Register the user
  await registerUser(page, username);

  // Try to login with incorrect password
  await loginUser(page, username, 'wrongPassword');

  // Check for an error message
  await expect(page.locator('#loginButton')).not.toHaveText(username);
});

// Test to verify that the login button is present on the page
test('login button should be present on the page', async ({page}) => {
  await page.goto('http://localhost:3040/index.html');
  const loginButton = await page.locator('#loginButton');
  await expect(loginButton).toBeVisible();
});

// Test to verify that the register button is present on the page
test('register button should be present on the page', async ({page}) => {
  await page.goto('http://localhost:3040/index.html');
  await page.locator('#loginButton').click();
  const registerButton = await page.getByRole('button', {name: 'Register'});
  await expect(registerButton).toBeVisible();
});

// Test to verify that the logout button is not present on the page before login
test('logout button should not be present on the page before login', async ({page}) => {
  await page.goto('http://localhost:3040/index.html');
  const logoutButton = await page.locator('#logoutButton');
  await expect(logoutButton).toBeHidden();
});

async function registerUser(page, username, email = username + '@gmail.com') {
  await page.goto('http://localhost:3040/index.html');
  await page.locator('#loginButton').click();
  await page.getByRole('button', {name: 'Register'}).click();
  await page.getByPlaceholder('Enter your name').click();
  await page.getByPlaceholder('Enter your name').fill(username);
  await page.getByPlaceholder('Enter your name').press('Tab');
  await page.getByPlaceholder('Enter your username').fill(username);
  await page.getByPlaceholder('Enter your username').press('Tab');
  await page.getByPlaceholder('Enter your email').fill(email);
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
}

async function loginUser(page, username, password = '12345') {
  await page.locator('#loginButton').click();
  await page.getByRole('button', {name: 'Login'}).click();
  await page.getByPlaceholder('Enter username').click();
  await page.getByPlaceholder('Enter username').fill(username);
  await page.getByPlaceholder('Enter username').press('Tab');
  await page.getByPlaceholder('Enter password').fill('12345');
  await page.getByRole('button', {name: 'Login'}).click();
}

function generateRandomString(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}


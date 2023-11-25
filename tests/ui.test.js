const { test, expect } = require("@playwright/test");

// Verify LOGO LINK is visible//

test("Check all-book link is visable", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await page.waitForSelector("nav.navbar");

  const allBookLink = await page.$("#site-header > nav > section > a");
  const isLinkVisible = await allBookLink.isVisible();

  expect(isLinkVisible).toBe(true);
});

// ---------------- END -------------------//

// Verify Login button is visible//

test("Check login button is visable", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await page.waitForSelector("nav.navbar");

  const logoButton = await page.$("#guest > a:nth-child(1)");
  const isButtonVisible = await logoButton.isVisible();

  expect(isButtonVisible).toBe(true);
});

// ---------------- END -------------------//

//  Verify LOGO LINK is visible after login//
test("Check all-book link is visable after login", async ({ page }) => {
  await page.goto("http://localhost:3000/login");
  await page.fill('input[name="email"]', "peter@abv.bg");
  await page.fill('input[name="password"]', "123456");
  await page.click('input[type="submit"]');

  const allBookLink = await page.$("#site-header > nav > section > a");
  const isLinkVisible = await allBookLink.isVisible();

  expect(isLinkVisible).toBe(true);
});

//  Verify Login with valid credtentials//

test("Login with valid credentials", async ({ page }) => {
  await page.goto("http://localhost:3000/login");
  await page.fill('input[name="email"]', "peter@abv.bg");
  await page.fill('input[name="password"]', "123456");
  await page.click('input[type="submit"]');

  await page.$('a[href="/catalog"]');
  expect(page.url()).toBe("http://localhost:3000/catalog");
});

// ---------------- END -------------------//

//  Verify Login with valid credtentials//

test("Login with not valid credentials", async ({ page }) => {
  await page.goto("http://localhost:3000/login");
  await page.click('input[type="submit"]');

  page.on("dialog", async (dialog) => {
    expect(dialog.type()).toContain("alert");
    expect(dialog.message()).toContain("All fields are required!");
    await dialog.expect();
  });

  await page.$('a[href="/login"]');
  expect(page.url()).toBe("http://localhost:3000/login");
});

// ---------------- END -------------------//

test("Login with empty email field", async ({ page }) => {
  await page.goto("http://localhost:3000/login");
  await page.fill('input[name="password"]', "123456");
  await page.click('input[type="submit"]');

  page.on("dialog", async (dialog) => {
    expect(dialog.type()).toContain("alert");
    expect(dialog.message()).toContain("Email field required");
    await dialog.expect();
  });

  await page.$('a[href="/login"]');
  expect(page.url()).toBe("http://localhost:3000/login");
});


// ---------------- END -------------------//

test("Login with empty password field", async ({ page }) => {
  await page.goto("http://localhost:3000/login");
  await page.fill('input[name="email"]', "peter@abv.bg");
  await page.click('input[type="submit"]');

  page.on("dialog", async (dialog) => {
    expect(dialog.type()).toContain("alert");
    expect(dialog.message()).toContain("Password field required");
    await dialog.expect();
  });

  await page.$('a[href="/login"]');
  expect(page.url()).toBe("http://localhost:3000/login");
});

// ---------------- START -------------------//

test("Register with valid credentials", async ({ page }) => {
  await page.goto("http://localhost:3000/register");
  await page.fill('input[name="email"]', "petar@abv.bg");
  await page.fill('input[name="password"]', "123456");
  await page.fill('input[name="confirm-pass"]', "123456");
  await page.click('input[type="submit"]');

  await page.$('a[href="/catalog"]');
  expect(page.url()).toBe("http://localhost:3000/catalog");
});


// ---------------- END -------------------//

// ---------------- START -------------------//

test("Register with empty  field", async ({ page }) => {
  await page.goto("http://localhost:3000/register");
  await page.click('input[type="submit"]');

  page.on("dialog", async (dialog) => {
    expect(dialog.type()).toContain("alert");
    expect(dialog.message()).toContain("Fields are required");
    await dialog.expect();
  });

  await page.$('a[href="/register"]');
  expect(page.url()).toBe("http://localhost:3000/register");
});

// ---------------- END -------------------//


// ---------------- START -------------------//

test("Register with empty  passowrd", async ({ page }) => {
  await page.goto("http://localhost:3000/register");
  await page.fill('input[name="email"]', "kalin@abv.bg");
  await page.fill('input[name="confirm-pass"]', "123456");
  await page.click('input[type="submit"]');

  page.on("dialog", async (dialog) => {
    expect(dialog.type()).toContain("alert");
    expect(dialog.message()).toContain("Password Field is required");
    await dialog.expect();
  });

  await page.$('a[href="/register"]');
  expect(page.url()).toBe("http://localhost:3000/register");
});

// ---------------- END -------------------//


// ---------------- START -------------------//

test("Register with empty  email", async ({ page }) => {
  await page.goto("http://localhost:3000/register");
  await page.fill('input[name="email"]', "kalin@abv.bg");
  await page.fill('input[name="confirm-pass"]', "123456");
  await page.click('input[type="submit"]');

  page.on("dialog", async (dialog) => {
    expect(dialog.type()).toContain("alert");
    expect(dialog.message()).toContain("Password Field is required");
    await dialog.expect();
  });

  await page.$('a[href="/register"]');
  expect(page.url()).toBe("http://localhost:3000/register");
});

// ---------------- END -------------------//

test("Register with diffrent passwords", async ({ page }) => {
  await page.goto("http://localhost:3000/register");
  await page.fill('input[name="email"]', "pesho@abv.bg");
  await page.fill('input[name="password"]', "123456");
  await page.fill('input[name="confirm-pass"]', "1234567");
  await page.click('input[type="submit"]');

  page.on("dialog", async (dialog) => {
    expect(dialog.type()).toContain("alert");
    expect(dialog.message()).toContain("Passwords doesn't match");
    await dialog.expect();
  });

  await page.$('a[href="/register"]');
  expect(page.url()).toBe("http://localhost:3000/register");
});

// ---------------- END -------------------//

//---------------- Start ------------------//

test("Add a book with correct data", async ({ page }) => {
  await page.goto("http://localhost:3000/login");
  await page.fill('input[name="email"]', "pesho@abv.bg");
  await page.fill('input[name="password"]', "123456");

  await Promise.all([
    page.click('input[type="submit"]'),
    page.waitForURL('http://localhost:3000/catalog')
  ])

  await page.click('a[href="/create"]');
  
  await page.fill('#title', 'Test Book');
  await page.fill('#description', 'This is a test book description');
  await page.fill('#iamge', 'http://example.com/book-image.jpg');
  await page.selectOption('#type', 'Fiction');

  await page.click('#create-form input[type="submit"]');

  await page.waitForURL('http://localhost:3000/catalog')
  expect(page.url()).toBe("http://localhost:3000/catalog");
});




// test('user can delete a task', async ({ page }) => {
//   await page.goto('http://127.0.0.1:5500/');
//   await page.fill('#task-input', 'Test Task');
//   await page.click('#add-task');

//   await page.click('.task .delete-task')

//   const tasks = await page.$$eval('.task', tasks => tasks.map(task => task.textContent));

//   expect(tasks).not.toContain('Test Task')
// });

// test('user can mark a task as complete', async ({ page }) => {
//   await page.goto('http://127.0.0.1:5500/');
//   await page.fill('#task-input', 'Test Task');
//   await page.click('#add-task');

//   await page.click('.task .task-complete')

//   const completedTask = await page.$('.task.completed');

//   expect(completedTask).not.toBeNull();

// });

// test('user can filter tasks', async ({ page }) => {
//   await page.goto('http://127.0.0.1:5500/');
//   await page.fill('#task-input', 'Test Task');
//   await page.click('#add-task');

//   await page.click('.task .task-complete')

//   await page.selectOption('#filter', 'Completed')

//   const incopleteTask = await page.$('.task:not(.completed)');

//   expect(incopleteTask).toBeNull();

// });

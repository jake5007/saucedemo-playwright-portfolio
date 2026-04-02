# SauceDemo Playwright QA Automation Portfolio

This project demonstrates end-to-end test automation using Playwright on the Sauce Demo website.

The goal of this project is to showcase QA automation skills including test design, Page Object Model, and handling both positive and negative test scenarios.

## Tech Stack

- Playwright (TypeScript)
- Node.js

## Test Coverage

### Authentication

- Login with valid credentials
- Login with locked out user
- Validation: missing username
- Validation: missing password
- Validation: both fields missing
- Invalid password scenario

## Project Structure

- tests/auth/login.spec.ts → authentication test scenarios
- pages/LoginPage.ts → Page Object for login page

## How to Run

```bash
npm install
npx playwright test
```

---

## Future Improvements

- Add Inventory and Cart test scenarios
- Integrate CI with GitHub Actions
- Improve test data management

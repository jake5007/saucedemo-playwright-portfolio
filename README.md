# SauceDemo Playwright QA Automation Portfolio

This project demonstrates end-to-end test automation using Playwright on the Sauce Demo website.

The goal of this project is to showcase QA automation skills including:

- Test design (positive & negative scenarios)
- Page Object Model (POM)
- End-to-end user flow testing
- Maintainable and scalable test structure

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

---

### Cart

- Add product to cart and verify cart badge update
- Verify product appears in cart after adding

---

### Checkout Flow

#### Happy Path

- Navigate to checkout info page
- Submit user information
- Navigate to checkout overview
- Complete checkout successfully

#### Validation

- Missing first name
- Missing last name
- Missing postal code
- All fields missing
- Verify error message and stay on same page

## Project Structure

- tests/auth/login.spec.ts → authentication test scenarios
- tests/shopping/cart.spec.ts → cart-related test scenarios
- tests/shopping/checkout.spec.ts → checkout flow and validation tests

- pages/LoginPage.ts → Page Object for login page
- pages/InventoryPage.ts → Page Object for inventory page
- pages/CartPage.ts → Page Object for cart page
- pages/CheckoutInfoPage.ts → Page Object for checkout step one
- pages/CheckoutOverviewPage.ts → Page Object for checkout overview
- pages/CheckoutCompletePage.ts → Page Object for checkout complete page

## How to Run

```bash
npm install
npx playwright test
```

---

## Future Improvements

- Add inventory sorting tests
- Add remove-from-cart scenarios
- Integrate CI with GitHub Actions
- Add test reporting (Allure / HTML report enhancement)
- Improve test data management (fixtures / data files)

# Playwright API Technical Assessment

Automated API test suite for [restful-api.dev](https://restful-api.dev/), built with Playwright and TypeScript. The suite exercises the full CRUD lifecycle of the `/objects` resource and includes negative-path validation. Tests are tracked and reported via Playwright HTML Report and Allure Report for detailed analytics and test history.

## Project Overview

This project validates the core object lifecycle exposed by the restful-api.dev public API:

1. Retrieve the list of all objects.
2. Create a new object.
3. Retrieve the created object by its returned ID.
4. Update the created object.
5. Delete the created object.

Two additional negative tests confirm the API correctly returns `404 Not Found` for a deleted object and for a non-existent object ID. Tests run serially so the object created in step 2 is reused across steps 3-5, mirroring a realistic end-to-end workflow.

> **Note:** The public restful-api.dev API enforces a limit of 50 requests per 24 hours per client. Running the full suite repeatedly in a short period may exhaust this quota.

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- npm (bundled with Node.js)

## Installation

```bash
# Install project dependencies
npm install

# Install Playwright browsers/runtime dependencies
npx playwright install
```

Copy the example environment file and adjust if needed:

```bash
cp .env.example .env
```

## Project Structure

```
Playwright-API-Technical-Assessment
│
├── tests/
│   └── object.spec.ts       # CRUD + negative test scenarios
│
├── utils/
│   ├── apiClient.ts          # Reusable API request wrapper
│   └── testData.ts           # Test data builders
│
├── .env                       # BASE_URL configuration (not committed)
├── .env.example                # Template for .env
├── .gitignore
├── package.json
├── playwright.config.ts
├── tsconfig.json
└── README.md
```

## Running All Tests

```bash
npm test
```

## Running a Single Test

Run a specific test file:

```bash
npx playwright test tests/object.spec.ts
```

Run a single test by name:

```bash
npx playwright test -g "should create a new object"
```

## Test Results

The test suite contains 7 comprehensive tests covering CRUD operations and negative paths:

| Test # | Test Name | Status | Purpose |
|--------|-----------|--------|---------|
| 1 | GET /objects - should return the list of all objects | ✓ | Retrieve all objects in the API |
| 2 | POST /objects - should create a new object | ✓ | Create a new object with unique data |
| 3 | GET /objects/{id} - should retrieve the created object | ✓ | Fetch the created object by ID |
| 4 | PUT /objects/{id} - should update the created object | ✓ | Update object data with PUT |
| 5 | DELETE /objects/{id} - should delete the created object | ✓ | Delete the object successfully |
| 6 | GET /objects/{id} - should return 404 after deletion | ✓ | Validate 404 for deleted object |
| 7 | GET /objects/{id} - should return 404 for non-existent ID | ✓ | Validate 404 for invalid ID |

**Assertions validated in each test:**
- HTTP status codes (200, 404)
- Response headers (Content-Type: application/json)
- Response body structure and field presence
- Object ID, name, and data integrity
- createdAt/updatedAt timestamps
- Delete confirmation message

## Viewing the Playwright HTML Report

After a test run, open the generated HTML report:

```bash
npm run report
```

## Viewing the Allure Report

After a test run, generate and view the Allure report:

```bash
npm run allure:report
```

The Allure report provides detailed test analytics including timelines, statistics, and test history tracking.

## Technologies Used

- [Playwright](https://playwright.dev/) (`@playwright/test`) - test runner and `APIRequestContext`
- [Allure Report](https://docs.qameta.io/allure/) - comprehensive test reporting and analytics
- TypeScript
- Node.js / npm
- dotenv - environment variable management
- Playwright HTML Reporter

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
- (Optional) Allure CLI for report generation: `npm install -g allure-commandline`

## Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/wbandara-tech/Playwright-API-Technical-Assessment.git
cd Playwright-API-Technical-Assessment

# 2. Install dependencies
npm install

# 3. Install Playwright browsers
npx playwright install

# 4. Run all tests
npm test

# 5. View Allure Report
npm run allure:report

# 6. Or view Playwright HTML Report
npm run report
```

## Installation

See **Quick Start** section above for the full setup.

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

**Allure Report Features:**
- **Test execution timeline** - View when each test started and completed
- **Test statistics** - Overall pass/fail rates and execution duration
- **Detailed test logs** - Full request/response details for each API call
- **History tracking** - Compare test runs across different execution sessions
- **Test categorization** - Tests grouped by suite and description
- **Failure analysis** - Detailed error messages and stack traces

**Report Location:**
- Allure results: `/allure-results/` (auto-generated after each test run)
- Allure report: `/allure-report/` (generated on-demand via `npm run allure:report`)
- Open report: `/allure-report/index.html` in your browser

**Sample Allure Report Structure:**
```
allure-report/
├── index.html                    # Main dashboard with overview
├── data/
│   ├── suites.json              # Test suite structure
│   ├── categories.json          # Test categorization
│   ├── timeline.json            # Test execution timeline
│   ├── test-cases/              # Individual test result details (7 files)
│   └── history/                 # Historical trends and comparisons
├── export/mail.html             # Email-friendly report format
└── widgets/                      # Interactive dashboard widgets
```

### Allure Report Location
- Results stored in: `/allure-results/` (generated after each test run)
- Generated report in: `/allure-report/` (created when running `npm run allure:report`)

## Test Execution Notes

**API Rate Limiting:**
The public restful-api.dev API enforces a **50 request per 24-hour limit** per client IP. The full test suite makes approximately 15-20 requests per execution (including API calls for creating, reading, updating, and deleting objects). 

**How to Resolve Rate Limiting Issues:**

1. **Option A: Create a Free Account (Recommended)**
   - Register at [restful-api.dev/sign-in](https://restful-api.dev/sign-in)
   - Authenticate to unlock higher request limits and access private collections
   - Run tests with authenticated credentials

2. **Option B: Wait 24 Hours**
   - The public API limit resets every 24 hours per IP address
   - Wait until the next calendar day to run tests again

3. **Option C: Use Different Network**
   - Switch to a different IP address or network (e.g., mobile hotspot)
   - This gives you a fresh 50-request quota

**Current Status:**
- All tests are designed to pass when the API quota is available
- If you encounter `405 Method Not Allowed` with message "reached the daily request limit", the code is working correctly — the API is just rate limiting

**Example Allure Report Artifacts:**
When tests execute successfully, Allure captures:
```
allure-results/
├── [timestamp]-result.json       # Test execution data
├── categories.json               # Test categorization
└── executor.json                 # Execution metadata
```

## Technologies Used

- [Playwright](https://playwright.dev/) (`@playwright/test`) - test runner and `APIRequestContext`
- [Allure Report](https://docs.qameta.io/allure/) - comprehensive test reporting and analytics
- TypeScript
- Node.js / npm
- dotenv - environment variable management
- Playwright HTML Reporter

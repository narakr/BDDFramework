# Playwright BDD Framework

A beginner-friendly browser automation framework using Playwright as the browser library and Cucumber as the BDD test runner. The Playwright Test runner is not used for these scenarios.

## A. Project architecture

```text
features/          Gherkin feature files, scenarios, and tags
step-definitions/  TypeScript implementations of Gherkin steps
pages/             Page Object Model classes and UI interactions
hooks/             Per-scenario browser setup, screenshots, and cleanup
config/            Environment loading and QA/UAT environment files
test-runner/       TypeScript entry point that forwards arguments to Cucumber
utils/             Shared Cucumber World and scenario browser state
reports/           Generated Cucumber HTML report
screenshots/       PNG screenshots captured for failed scenarios
cucumber.cjs       Cucumber CLI configuration and TypeScript loader
playwright.config.ts Shared Playwright runtime settings for tooling
```

The feature file uses **Gherkin**, a readable language for describing behavior. Step definitions connect its Given/When/Then statements to TypeScript. The **Page Object Model** keeps selectors and page interactions in `LoginPage`, so steps describe intent rather than browser details.

## B. Installation

Install Node.js 20 or newer, then run from the project root:

```bash
npm install
```

## C. Install Playwright browsers

Install Chromium, which is the default browser:

```bash
npx playwright install chromium
```

To use Firefox or WebKit, install those browsers too with `npx playwright install firefox webkit`.

## D. Environment configuration

The framework loads `config/.env.qa` by default. Select another environment with `TEST_ENV=uat`. Set `BASE_URL`, `USERNAME`, and `PASSWORD` in the selected file; the checked-in UAT file is a runnable SauceDemo starter and should be replaced with your actual UAT values when applicable. Process-level `BASE_URL` and `PASSWORD` override file values. On Windows, `USERNAME` is commonly predefined by the operating system, so use `TEST_USERNAME` when you need to override the configured username; otherwise, the selected environment file takes precedence over the OS value.

Optional settings are `BROWSER=chromium|firefox|webkit`, `HEADLESS=true|false`, and `TIMEOUT=30000` (milliseconds). For example, PowerShell:

```powershell
$env:TEST_ENV = "qa"
$env:BROWSER = "chromium"
```

## E. Run all BDD tests

```bash
npm run test:bdd
```

## F. Run a specific feature

```bash
npx cucumber-js features/login.feature
```

The shared Cucumber configuration loads the TypeScript hooks and step definitions for direct Cucumber CLI use.

## G. Run a tagged scenario

```bash
npx cucumber-js --tags "@smoke"
npx cucumber-js --tags "@regression"
npx cucumber-js --name "Successful login with valid credentials"
```

The smoke tag selects the valid-login scenario; regression selects the invalid-login scenario. The wrapper accepts the same options, for example `npm run test:bdd -- --tags "@smoke"`.

## H. Run headed

```bash
npm run test:bdd:headed
```

Or set `HEADLESS=false` when invoking the direct Cucumber CLI.

## I. Generate the HTML report

```bash
npm run test:bdd:html
```

Open `reports/cucumber-report.html` after the run. The Cucumber HTML formatter shows features, scenarios, steps, statuses, durations, failure details, and attached screenshots. The report directory is created as needed.

## J. Failure screenshots

The Cucumber `After` hook checks the scenario result. For a failed scenario, it saves a full-page PNG under `screenshots/` and attaches the image to Cucumber before closing the page, context, and browser. Cucumber continues with later scenarios unless configured otherwise; one scenario failure does not enable fail-fast behavior.

## K. End-to-end execution flow

```text
Feature File
     ↓
Cucumber
     ↓
Step Definition
     ↓
Page Object
     ↓
Playwright
     ↓
Browser
     ↓
Application
     ↓
Cucumber Report
```

Cucumber parses each feature and selects scenarios (including tag filters), then invokes matching step definitions. Each step calls the `LoginPage` object, which uses Playwright's **Page** API to interact with the browser tab. The **Browser** process is launched by a hook; each scenario gets an isolated **BrowserContext** (its cookies and storage) and Page. After execution, Cucumber records step results and timing in the report, with screenshots attached for failures.

## Additional checks

Run the TypeScript compiler without emitting files:

```bash
npm run typecheck
```
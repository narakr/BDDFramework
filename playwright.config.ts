import { config } from './config/config';

// Shared Playwright settings for editor/tooling; Cucumber hooks launch the browser.
const playwrightRuntimeConfig = {
  use: {
    baseURL: config.baseUrl,
    browserName: config.browserType,
    headless: config.headless,
  },
  timeout: config.timeout,
};

export default playwrightRuntimeConfig;
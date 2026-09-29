import { After, Before, setDefaultTimeout, setWorldConstructor, Status } from '@cucumber/cucumber';
import { chromium, firefox, webkit } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { config } from '../config/config';
import { FrameworkWorld } from '../utils/world';

const browserLaunchers = { chromium, firefox, webkit };

// Hooks create isolated browser state for each scenario and always release it.
setWorldConstructor(FrameworkWorld);
setDefaultTimeout(config.timeout);

Before(async function (this: FrameworkWorld) {
  const browserLauncher = browserLaunchers[config.browserType];
  this.browser = await browserLauncher.launch({ headless: config.headless });
  this.context = await this.browser.newContext({ baseURL: config.baseUrl });
  this.page = await this.context.newPage();
});

After(async function (this: FrameworkWorld, scenario) {
  try {
    if (scenario.result?.status === Status.FAILED && this.page) {
      const safeName = scenario.pickle.name.replace(/[^a-zA-Z0-9_-]+/g, '_');
      const screenshotPath = resolve(
        process.cwd(),
        'screenshots',
        `${safeName}-${Date.now()}.png`,
      );
      await mkdir(resolve(process.cwd(), 'screenshots'), { recursive: true });
      const screenshot = await this.page.screenshot({ path: screenshotPath, fullPage: true });
      // Cucumber's HTML formatter renders this image attachment with the failed scenario.
      await this.attach(screenshot, 'image/png');
    }
  } catch (error) {
    console.error('Unable to capture or attach the failure screenshot:', error);
  } finally {
    await this.page?.close().catch(() => undefined);
    await this.context?.close().catch(() => undefined);
    await this.browser?.close().catch(() => undefined);
  }
});
import { World } from '@cucumber/cucumber';
import type { Browser, BrowserContext, Page } from 'playwright';
import type { LoginPage } from '../pages/LoginPage';

// A Cucumber World is per-scenario state; Playwright's Page represents one tab.
export class FrameworkWorld extends World {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;
  loginPage?: LoginPage;

  getPage(): Page {
    if (!this.page) {
      throw new Error('The scenario browser page has not been initialized.');
    }
    return this.page;
  }
}
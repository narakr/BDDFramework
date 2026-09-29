import { existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';

// Cucumber remains the BDD runner; this wrapper forwards its standard CLI options.
const cucumberCli = resolve(
  process.cwd(),
  'node_modules',
  '@cucumber',
  'cucumber',
  'bin',
  'cucumber.js',
);

if (!existsSync(cucumberCli)) {
  throw new Error('Cucumber is not installed. Run "npm install" before starting the test runner.');
}

const result = spawnSync(process.execPath, [cucumberCli, ...process.argv.slice(2)], {
  cwd: process.cwd(),
  env: process.env,
  stdio: 'inherit',
});

if (result.error) {
  throw result.error;
}
process.exitCode = result.status ?? 1;
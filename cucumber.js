module.exports = {
  default: {
    paths: ['features/**/*.feature'],
    requireModule: ['ts-node/register'],
    require: [
      'hooks/**/*.ts',
      'step-definitions/**/*.ts',
      'support/**/*.ts',
      'steps/**/*.ts',
      'support/env.ts'
    ],
    format: ['progress', 'allure-cucumberjs/reporter'],
    formatOptions: {
      snippetInterface: 'async-await',
      allure: { resultsDir: 'allure-results' }
    },
    tags: '@smoke'
  },
};

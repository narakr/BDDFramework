// Cucumber CLI configuration also supports direct commands such as --tags "@smoke".
module.exports = {
  default: {
    paths: ['features/**/*.feature'],
    requireModule: ['tsx/cjs'],
    require: ['hooks/**/*.ts', 'step-definitions/**/*.ts', 'support/**/*.ts'],
    format: ['progress', 'allure-cucumberjs/reporter'],
    formatOptions: { snippetInterface: 'async-await' },
  },
};
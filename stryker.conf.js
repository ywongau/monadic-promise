module.exports = function (config) {
  config.set({
    mutate: [
      'src/**/*.js',
      '!src/**/*.test.js'
    ],
    mutator: 'javascript',
    packageManager: 'npm',
    reporter: ['clear-text', 'progress'],
    testRunner: 'mocha',
    transpilers: [],
    testFramework: 'mocha',
    mochaOptions: {
      spec: ['src/**/*.test.js'],
    }
  });
};

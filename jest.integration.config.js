module.exports = {
  clearMocks: true,
  preset: 'ts-jest/presets/js-with-babel',
  testPathIgnorePatterns: ['/dist/', '/node_modules/'],
  modulePathIgnorePatterns: ['/dist/'],
  testMatch: ['**/tests/integration/**/?(*.)+(spec|test).[jt]s?(x)'],
  testTimeout: 60000,
  testEnvironmentOptions: {
    url: process.env.INTEGRATION_TESTS_BASE_URL,
  },
  reporters: ['default', 'github-actions'],
  transformIgnorePatterns: ['node_modules/(?!@immediate_media)'],
};

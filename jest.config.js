module.exports = {
  clearMocks: true,
  preset: "ts-jest/presets/js-with-babel",
  testMatch: ["**/tests/unit/**/?(*.)+(spec|test).[jt]s?(x)"],
  testPathIgnorePatterns: ["/dist/", "/node_modules/"],
  modulePathIgnorePatterns: ["/dist/"],
  reporters: ["default", "github-actions"],
  transformIgnorePatterns: ["node_modules/(?!@immediate_media)"],
  setupFiles: ["<rootDir>/jest.setup.js"],
};

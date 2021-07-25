/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  preset: "ts-jest",
  coverageProvider: "v8",
  coverageDirectory: "coverage",
  coverageReporters: ["lcov", "json"],
};

export default config;

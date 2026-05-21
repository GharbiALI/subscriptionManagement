import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",

  testEnvironment: "node",

  roots: ["<rootDir>/test"],

  moduleFileExtensions: ["ts", "js"],

  testMatch: ["**/*.test.ts"],

  clearMocks: true,

  collectCoverageFrom: ["src/**/*.ts"],

  coveragePathIgnorePatterns: ["/node_modules/", "/dist/"],
};

export default config;

import type { Config } from 'jest';

const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');


const jestConfig: Config = {
  preset: 'jest-preset-angular',
  testRunner: 'jasmine2',
  testRegex: "^(.*(src\/app\/))..*spec\.ts.*$",
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
  globalSetup: 'jest-preset-angular/global-setup',
  collectCoverage: true,
  moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],
  testPathIgnorePatterns: ["<rootDir>/jest-global-mocks.ts"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
    prefix: '<rootDir>'
  })
};

export default jestConfig;

/** @type {import('ts-jest').JestConfigWithTsJest} **/
const config: import('ts-jest').JestConfigWithTsJest = {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
  setupFiles: ['<rootDir>/jest.setup.ts'],
};

export default config;

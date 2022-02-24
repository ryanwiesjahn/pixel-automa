module.exports = {
  // All our tests and mocks are in the src dir
  // This prevents jest from finding manual mocks in the submodules
  // If there is a need for other dirs to be searched (e.g. a __mocks__
  // dir adjacent to node_modules for manually mocking modules) then
  // add it explicitly here.
  roots: [
    '<rootDir>/src',
  ],
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
  ],
  transform: {
    '^.+\\.(tsx?)$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
    },
  },
  testRegex: '(/src/.*(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  collectCoverageFrom: [
    'src/**/*.{js,ts}',
  ],
  coverageReporters: [
    'text',
    'html',
  ],
  reporters: [
    'default',
    'jest-junit',
  ],
  testEnvironment: 'node',
  setupFiles: [
    './jest.setup.ts',
  ],
}

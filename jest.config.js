module.exports = {
  testEnvironment: 'node',
  collectCoverageFrom: ['**/src/**/*.js'],
  coverageThreshold: {  
    global: {
      statements: 10,
      branches: 0,
      functions: 10,
      lines: 10,
    },
  },
}

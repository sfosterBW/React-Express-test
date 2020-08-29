module.exports = {
  preset: 'ts-jest',
  setupFilesAfterEnv: [
    "@testing-library/react/cleanup-after-each",
    "@testing-library/jest-dom/extend-expect"
  ],
  testEnvironment: 'node'
}

module.exports = {
  preset: 'ts-jest',
  setupFilesAfterEnv: [
    "@testing-library/react/cleanup-after-each",
    "@testing-library/jest-dom/extend-expect"
  ],
  testEnvironment: 'node',
  moduleDirectories: [
    'node_modules',
+   'utils', // a utility folder
+    __dirname, // the root directo
  ],
}

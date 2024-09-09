module.exports = {
    testEnvironment: "jsdom", // Use jsdom for testing React components
    transform: {
      "^.+\\.tsx?$": "ts-jest", // Use ts-jest for TypeScript files
    },
    moduleNameMapper: {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Mock CSS imports
      "~/(.*)": "<rootDir>/app/$1", // Allow imports using "~/"
    },
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // Setup file for Jest DOM matchers
    testPathIgnorePatterns: ["/node_modules/", "/build/"], // Ignore these directories
};
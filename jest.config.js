module.exports = {
  preset: 'ts-jest',
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/test/__mocks__/fileMock.js',
    '\\.(css|scss)$': '<rootDir>/test/__mocks__/styleMock.js',
  },
  testEnvironment: 'node',
  testMatch: [
    '<rootDir>/src/**/__test__/**/*.(test|spec).(ts|tsx)',
    '<rootDir>/tests/**/*.(test|spec).(ts|tsx)',
  ],
};

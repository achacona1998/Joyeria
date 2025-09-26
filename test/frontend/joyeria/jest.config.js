module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png|jpg|jpeg)$': '<rootDir>/__mocks__/fileMock.js',
    '^@/(.*)$': '<rootDir>/../../../Frontend/joyeria/src/$1',
    '^@components/(.*)$': '<rootDir>/../../../Frontend/joyeria/src/components/$1',
    '^@pages/(.*)$': '<rootDir>/../../../Frontend/joyeria/src/pages/$1',
    '^@hooks/(.*)$': '<rootDir>/../../../Frontend/joyeria/src/hooks/$1',
    '^@context/(.*)$': '<rootDir>/../../../Frontend/joyeria/src/context/$1',
    '^@utils/(.*)$': '<rootDir>/../../../Frontend/joyeria/src/utils/$1',
    '^@assets/(.*)$': '<rootDir>/../../../Frontend/joyeria/src/assets/$1'
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', {
      presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        ['@babel/preset-react', { runtime: 'automatic' }],
        '@babel/preset-typescript'
      ],
      plugins: [
        ['transform-import-meta', {
          'import.meta.env.VITE_API_URL': '"http://localhost:8000"',
          'import.meta.env.MODE': '"test"',
          'import.meta.env.DEV': 'false',
          'import.meta.env.PROD': 'false'
        }]
      ]
    }]
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
  testMatch: [
    '<rootDir>/**/__tests__/**/*.(js|jsx|ts|tsx)',
    '<rootDir>/**/*.(test|spec).(js|jsx|ts|tsx)'
  ],
  collectCoverageFrom: [
    '../../../Frontend/joyeria/src/**/*.{js,jsx,ts,tsx}',
    '!../../../Frontend/joyeria/src/**/*.d.ts',
    '!../../../Frontend/joyeria/src/main.jsx',
    '!../../../Frontend/joyeria/src/vite-env.d.ts'
  ],
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/build/',
    '/dist/'
  ]
};
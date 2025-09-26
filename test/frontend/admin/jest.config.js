/**
 * Configuración de Jest para tests del frontend admin
 */
export default {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  moduleNameMapping: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png|jpg|jpeg)$': '<rootDir>/__mocks__/fileMock.js',
    '^@/(.*)$': '<rootDir>/../../../Frontend/admin/src/$1',
    '^@components/(.*)$': '<rootDir>/../../../Frontend/admin/src/components/$1',
    '^@pages/(.*)$': '<rootDir>/../../../Frontend/admin/src/pages/$1',
    '^@utils/(.*)$': '<rootDir>/../../../Frontend/admin/src/utils/$1',
    '^@hooks/(.*)$': '<rootDir>/../../../Frontend/admin/src/hooks/$1',
    '^@services/(.*)$': '<rootDir>/../../../Frontend/admin/src/services/$1',
    '^@store/(.*)$': '<rootDir>/../../../Frontend/admin/src/store/$1'
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', {
      presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        ['@babel/preset-react', { runtime: 'automatic' }],
        '@babel/preset-typescript'
      ]
    }]
  },
  testMatch: [
    '<rootDir>/**/__tests__/**/*.(js|jsx|ts|tsx)',
    '<rootDir>/**/*.(test|spec).(js|jsx|ts|tsx)'
  ],
  collectCoverageFrom: [
    '../../../Frontend/admin/src/**/*.{js,jsx,ts,tsx}',
    '!../../../Frontend/admin/src/**/*.d.ts',
    '!../../../Frontend/admin/src/main.tsx',
    '!../../../Frontend/admin/src/vite-env.d.ts'
  ],
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/build/'
  ],
  watchPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/build/'
  ]
};
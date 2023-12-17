module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  ignorePatterns: ['dist', '/node_modules', '.eslintrc.cjs', '.prettierc.mjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
    project: '.tsconfig.json',
  },
  plugins: ['react-refresh', '@typescript-eslint'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'no-restricted-globals': ['error', 'requestAnimationFrame', 'cancelAnimationFrame', 'devicePixelRatio'],

    // Add TypeScript-specific rules
    '@typescript-eslint/explicit-function-return-type': ['error'],
    '@typescript-eslint/no-explicit-any': ['error'],
    '@typescript-eslint/no-floating-promises': ['error', { ignoreIIFE: true }],

    eqeqeq: 'error',
    'no-var': 'error',
    '@typescript-eslint/strict-boolean-expressions': 'error',
    '@typescript-eslint/promise-function-async': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  override: [
    {
      files: ['**/*.tsx'],
      rules: {
        'react/prop-types': 'off',
      },
    },
  ],
}


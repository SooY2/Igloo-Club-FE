module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended', 'plugin:react-hooks/recommended', 'plugin:storybook/recommended'],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    // project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
      tsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off', //반환타입 명시
    '@typescript-eslint/explicit-module-boundary-types': 'off', //반환타입 명시
    '@typescript-eslint/no-explicit-any': 'error',
    'import/prefer-default-export': 'off', //확장자명 on
    'import/extensions': ['off'], //확장자명 on
    'react/react-in-jsx-scope': 'off', //React import
    'react/no-unknown-property': ['error', { ignore: ['css'] }],
  },
};

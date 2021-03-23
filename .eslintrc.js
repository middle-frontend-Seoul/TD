module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint'],
  extends: ['airbnb-typescript-prettier'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src'],
      },
    },
    'import/ignore': ['models', 'pages'],
  },
  rules: {
    'import/prefer-default-export': 'off',
    'react/button-has-type': 'off',
    '@typescript-eslint/no-empty-interface': ['warn'],
    'max-classes-per-file': 'off',
    'lines-between-class-members': 'off',
  },
};

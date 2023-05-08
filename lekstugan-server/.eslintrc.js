module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'import',
    'node',
    'promise',
  ],
  extends: [
    'google',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    // Add custom rules here
    'new-cap': 'off', // Disable the 'new-cap' rule
  },
  overrides: [
    {
      files: ['*.ts'],
      rules: {
        '@typescript-eslint/naming-convention': [
          'error',
          // {
          //   selector: 'default',
          //   format: ['camelCase'],
          // },
          {
            selector: 'typeLike',
            format: ['PascalCase'],
          },
        ],
      },
    },
  ],
};

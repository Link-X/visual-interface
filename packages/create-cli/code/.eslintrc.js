module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'react-hooks'],
    extends: [
        'standard-with-typescript',
        'plugin:react/recommended'
    ],
    parserOptions: {
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        },
        project: './tsconfig.json'
    },
    env: {
        es6: true,
        node: true
    },
    rules: {
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/promise-function-async': 0,
        'no-callback-literal': 0,
        '@typescript-eslint/indent': ['error', 4],
        '@typescript-eslint/quotes': ['error', 'single'],
        '@typescript-eslint/camelcase': 0,
        '@typescript-eslint/require-await': 'warn',
        '@typescript-eslint/no-floating-promises': ['warn'],
        '@typescript-eslint/no-empty-function': ['warn'],
        '@typescript-eslint/strict-boolean-expressions': [
            'warn',
            {
                allowNullable: false,
                ignoreRhs: true
            }
        ],
        '@typescript-eslint/consistent-type-assertions': 0,
        '@typescript-eslint/require-await': 0,
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'space-before-function-paren': [
            'error',
            {
                anonymous: 'never',
                named: 'never',
                asyncArrow: 'always'
            }
        ],
        'generator-star-spacing': ['error', { before: false, after: true }]
    }
}


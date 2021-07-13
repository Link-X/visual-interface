const { defineConfig } = require('eslint-define-config')

module.exports = defineConfig({
    root: true,
    extends: ['eslint:recommended', 'plugin:node/recommended', 'plugin:@typescript-eslint/recommended'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2020,
        ignorePatterns: ['.eslintrc.js']
    },
    rules: {
        '@typescript-eslint/indent': ['error', 4],
        'no-debugger': ['error'],
        'no-empty': ['warn', { allowEmptyCatch: true }],
        'no-process-exit': 'off',
        'no-useless-escape': 'off',
        'prefer-const': [
            'warn',
            {
                destructuring: 'all'
            }
        ],
        'node/no-missing-import': [
            'error',
            {
                allowModules: ['types', 'estree', 'testUtils', 'stylus'],
                tryExtensions: ['.ts', '.js', '.jsx', '.tsx', '.d.ts']
            }
        ],
        'node/no-missing-require': [
            'error',
            {
                // for try-catching yarn pnp
                allowModules: ['pnpapi'],
                tryExtensions: ['.ts', '.js', '.jsx', '.tsx', '.d.ts']
            }
        ],
        'node/no-deprecated-api': 'off',
        'node/no-unpublished-import': 'off',
        'node/no-unpublished-require': 'off',
        'node/no-unsupported-features/es-syntax': 'off',
        '@typescript-eslint/ban-ts-comment': 'off', // TODO: we should turn this on in a new PR
        '@typescript-eslint/ban-types': 'off', // TODO: we should turn this on in a new PR
        '@typescript-eslint/no-empty-function': ['error', { allow: ['arrowFunctions'] }],
        '@typescript-eslint/no-explicit-any': 'off', // maybe we should turn this on in a new PR
        '@typescript-eslint/no-extra-semi': 'off', // conflicts with prettier
        '@typescript-eslint/no-inferrable-types': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off', // maybe we should turn this on in a new PR
        '@typescript-eslint/no-unused-vars': 'off', // maybe we should turn this on in a new PR
        '@typescript-eslint/no-var-requires': 'off'
    }
})

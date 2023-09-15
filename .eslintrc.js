module.exports = {
    settings: {
        react: {
            version: 'detect', // React version. "detect" automatically picks the version you have installed.
        },
    },
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/jsx-runtime',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint'],
    rules: {
        '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/no-non-null-assertion': 'off',

    },
}

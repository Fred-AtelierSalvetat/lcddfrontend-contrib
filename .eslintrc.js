module.exports = {
    settings: {
        'import/resolver': {
            alias: {
                map: [['~', 'src']],
                extensions: ['.ts', '.js', '.jsx', '.tsx', '.json'],
            },
        },
    },
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
        ecmaFeatures: {
            jsx: true, // Allows for the parsing of JSX
        },
    },
    settings: {
        react: {
            version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
        },
    },
    extends: [
        'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
        'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
        //'airbnb-typescript',
    ],
    ignorePatterns: ['**/*generated.*'],
    rules: {
        // note you must disable the base rule as it can report incorrect errors
        'no-unused-vars': 0,
        '@typescript-eslint/no-unused-vars': [1, { varsIgnorePattern: '^_', ignoreRestSiblings: true }],
        '@typescript-eslint/no-empty-function': 0,
        '@typescript-eslint/ban-types': 1,
        'prefer-const': 1,
        'react/display-name': 0,
        'react/jsx-key': 1,
        'react/prop-types': 1,
        'react/no-unescaped-entities': 1,
        'prettier/prettier': [
            1,
            {
                endOfLine: 'auto',
            },
        ],
        // 'max-len': [2, 120],
        // indent: [1, 4],
        // 'react/jsx-indent': [1, 4],
        // 'react/jsx-indent-props': [1, 4],
        // '@typescript-eslint/indent': [1, 4],
    },
};

// https://www.robertcooper.me/using-eslint-and-prettier-in-a-typescript-project

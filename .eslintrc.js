module.exports = {
    root: true,
    env: {
        es6: true,
        node: true,
        jest: true,
        browser: true,
        jasmine: true,
    },
    extends: [
        'eslint:recommended',
        'react-app',
        'react-app/jest',
        'airbnb-base',
        'prettier',
        'plugin:react/recommended',
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'react', 'prettier'],
    parserOptions: {
        project: 'tsconfig.json',
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    rules: {
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': ['error'],
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': ['error'],
        'prettier/prettier': 'error',
        'block-scoped-var': 'error',
        eqeqeq: 'error',
        'no-var': 'error',
        'prefer-const': 'error',
        'eol-last': 'error',
        'prefer-arrow-callback': 'error',
        'no-trailing-spaces': 'error',
        'import/extensions': 'off',
        'linebreak-style': ['error', 'unix'],
        'no-console': 'warn',
        '@typescript-eslint/no-unused-vars': [
            'error',
            { vars: 'all', args: 'after-used', ignoreRestSiblings: false },
        ],
        '@typescript-eslint/explicit-function-return-type': 'warn',
        quotes: ['warn', 'single', { avoidEscape: true }],
        'no-empty': 'warn',
        'react/jsx-uses-react': 'warn',
        'react/jsx-uses-vars': 'warn',
        'react/react-in-jsx-scope': 'off',
        'import/extensions': 'off',
        'import/no-extraneous-dependencies': [
            'error',
            { devDependencies: true },
        ],
    },
    settings: {
        'import/resolver': {
            typescript: {},
            node: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
        },
        react: {
            createClass: 'createReactClass', // Regex for Component Factory to use,
            // default to createReactClass
            pragma: 'React', // Pragma to use, default to React
            fragment: 'Fragment', // Fragment to use (may be a property of <pragma>), default to Fragment
            version: 'detect', // React version. detect automatically picks the version you have installed.
            // You can also use , , etc, if you want to override the detected value.
            // It will default to latest and warn if missing, and to detect in the future
            flowVersion: '0.53', // Flow version
        },
        propWrapperFunctions: [
            // The names of any function used to wrap propTypes, e.g. . If this isn't set, any propTypes wrapped in a function will be skipped.
            'forbidExtraProps',
            { property: 'freeze', object: 'Object' },
            { property: 'myFavoriteWrapper' },
            // for rules that check exact prop wrappers
            { property: 'forbidExtraProps', exact: true },
        ],
        componentWrapperFunctions: [
            // The name of any function used to wrap components, e.g. Mobx  function. If this isn't set, components wrapped by these functions will be skipped.
            'observer', //
            { property: 'styled' }, //  is optional
            { property: 'observer', object: 'Mobx' },
            { property: 'observer', object: '<pragma>' }, // sets  to whatever value  is set to
        ],
        formComponents: [
            // Components used as alternatives to <form> for forms, eg. <Form endpoint={ url } />
            'CustomForm',
            { name: 'Form', formAttribute: 'endpoint' },
        ],
        linkComponents: [
            // Components used as alternatives to <a> for linking, eg. <Link to={ url } />
            'Hyperlink',
            { name: 'Link', linkAttribute: 'to' },
        ],
    },
};

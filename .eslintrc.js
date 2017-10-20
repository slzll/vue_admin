// http://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    env: {
        browser: true,
    },
    extends: 'airbnb-base',
    // required to lint *.vue files
    plugins: [
        'html'
    ],
    // check if imports actually resolve
    'settings': {
        'import/resolver': {
            'webpack': {
                'config': 'build/webpack.base.conf.js'
            }
        }
    },
    // add your custom rules here
    'rules': {
        // don't require .vue extension when importing
        'import/extensions': ['error', 'always', {
            'js': 'never',
            'vue': 'never'
        }],
        // allow optionalDependencies
        'import/no-extraneous-dependencies': ['error', {
            'optionalDependencies': ['test/unit/index.js']
        }],
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        'indent': ['off'],
        'comma-dangle': [1, 'never'],
        'eol-last': ['off'],
        'object-shorthand': ['off'],
        'arrow-body-style': ['error', 'always'],
        'arrow-parens': ['off'],
        'semi': ['off'],
        'prefer-template': ['off'],
        'no-var': ['off'],
        'wrap-iife': ['off'],
        'vars-on-top': ['off'],
        'no-multi-assign': ['off'],
        'quotes': ['off'],
        'no-unused-vars': ['off'],
        'dot-notation': ['off'],
        'eqeqeq': ['off'],
        'no-undef': ['off'],
        'no-console': ['off'],
        'func-names': ['off'],
        'space-before-function-paren': ['off'],
        'no-unused-expressions': ['off'],
        'no-unneeded-ternary': ['off'],
        'space-before-blocks': ['off'],
        'keyword-spacing': ['off'],
        'no-shadow': ['off'],
        'no-param-reassign': ['off']
    }
}

module.exports = {
  'globals': {
    'exports': true,
  },
  'env': {
    'browser': true,
    'es6': true,
    'jest/globals': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  'parser': 'babel-eslint',
  'parserOptions': {
    'ecmaVersion': 6,
    'ecmaFeatures': {
      'experimentalObjectRestSpread': true,
      'jsx': true
    },
    'sourceType': 'module'
  },
  'plugins': [
    'flowtype',
    'react',
    'jest',
    'class-property',
    'flowtype-errors',
  ],
  'rules': {
    'flowtype-errors/show-errors': 2,
    "flowtype/define-flow-type": 1,

    'no-empty': [
      'off',
      0
    ],
    'no-redeclare': [
      'off',
      0
    ],
    'indent': [
      'warn',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'warn',
      'single'
    ],
    'semi': [
      'warn',
      'always'
    ],
    'no-extra-semi': [
      'warn'
    ],
    'eol-last': [
      'warn',
      'always'
    ],
    'no-unused-vars': [
      'warn',
      {
        'vars': 'all',
        'args': 'after-used',
        'ignoreRestSiblings': false
      }
    ],
    'no-console': [
      'warn', {
        allow: ['warn', 'error', 'info']
      }
    ],
    'max-len': [
      'warn',
      {
        'code': 80,
        'ignoreComments': true,
        'ignoreTrailingComments': true,
        'tabWidth': 2
      }
    ],
    'react/jsx-uses-vars': 2,
    'react/prop-types': 'warn'
  }
};

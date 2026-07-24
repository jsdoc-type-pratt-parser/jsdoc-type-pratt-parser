'use strict';

module.exports = {
  reject: [
    // Peer dependency issues with `eslint-config-love`
    '@typescript-eslint/eslint-plugin',
    'eslint',

    // Peer dependency issue with typedoc
    'typescript'
  ]
};

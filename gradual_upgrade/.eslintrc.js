module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ["eslint:recommended",
  "plugin:@typescript-eslint/recommended",    
  "react-app", "prettier"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    'react/react-in-jsx-scope': 'off'
  }
};

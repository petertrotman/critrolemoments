module.exports = {
  ecmaFeatures: {
    jsx: true,
    modules: true,
  },
  env: {
    browser: true,
    node: true,
  },
  parser: 'babel-eslint',
  extends: 'airbnb',
  rules: {
    quotes: [2, 'single'],
    strict: [2, 'never'],
    'react/jsx-uses-react': 2,
    'react/jsx-uses-vars': 2,
    'react/react-in-jsx-scope': 2,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
  },
  plugins: [
    'react',
    'jsx-a11y',
    'import',
  ],
};

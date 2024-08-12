module.exports = {
  root: true,
  env: { browser: true, es6: true, node: true },
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: { jsx: true },
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      node: {
        extension: [".js", ".jsx"],
      },
    },
  },
  plugins: ["react", "import", "react-refresh"],
  rules: {
    "react/prop-types": 0,
    "react/react-in-jsx-scope": 0,
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    rules: {
      "react/prop-types": "off",
    },
  },
}

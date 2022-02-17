module.exports = {
  root: true,
  plugins: ["prettier"],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 11,
  },
  rules: {
    "prettier/prettier": "error",
  },
};

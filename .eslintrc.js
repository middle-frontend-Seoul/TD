module.exports = {
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    extends: ["airbnb-typescript-prettier"],
    rules: {
        "import/prefer-default-export": "off",
    }
};

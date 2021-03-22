module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "./tsconfig.json",
    },
    plugins: ["@typescript-eslint"],
    extends: ["airbnb-typescript-prettier"],
    settings: {
        "import/resolver": {
            node: {
                extensions: [".js", ".jsx", ".ts", ".tsx"],
                moduleDirectory: ["node_modules", "src"],
            },
        },
    },
    rules: {
        "import/prefer-default-export": "off",
        "@typescript-eslint/no-empty-interface": ["warn"]
    }
};

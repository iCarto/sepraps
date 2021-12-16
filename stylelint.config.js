module.exports = {
    defaultSeverity: "error",

    plugins: ["stylelint-order"],
    extends: "stylelint-config-standard",
    rules: {
        "order/properties-alphabetical-order": true,
        indentation: [4, {baseIndentLevel: 1}],
        linebreaks: "unix",
        "max-line-length": 88,
        "no-empty-first-line": true,
        "string-quotes": ["double", {avoidEscape: true}],
        "font-family-name-quotes": "always-unless-keyword",
        "function-url-quotes": "always",
        "selector-attribute-quotes": "always",

        "no-descending-specificity": null,

        "function-calc-no-unspaced-operator": true,
        "selector-pseudo-class-parentheses-space-inside": "never",
    },

    // https://stylelint.io/user-guide/configuration/#ignorefiles
    // `ignorePath` and `ignorePattern` work in the cli, but not here
    // https://github.com/stylelint/stylelint/issues/4126
    // ignorePath: ".ignore",
    // ignorePattern: ["static/vendor"],
};

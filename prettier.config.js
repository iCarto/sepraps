// prettier.config.js
module.exports = {
    printWidth: 88,
    tabWidth: 4,
    useTabs: false,
    semi: true,
    singleQuote: false,
    quoteProps: "as-needed",
    trailingComma: "es5",
    bracketSpacing: false,
    arrowParens: "avoid",
    proseWrap: "preserve",

    // review https://prettier.io/blog/2018/11/07/1.15.0.html#whitespace-sensitive-formatting
    htmlWhitespaceSensitivity: "ignore",

    endOfLine: "lf",

    overrides: [
        {
            files: "*.html",
            options: {
                printWidth: 100,
                tabWidth: 2,
            },
        },
    ],
};

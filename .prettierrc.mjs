// Documentation for this file: https://prettier.io/docs/en/configuration.html

/** @type {import("prettier").Config} */

const config = {
    // We use a larger print width because Prettier's word-wrapping seems to be tuned
    // for plain JavaScript without type annotations
    printWidth: 110,
    
    // Microsoft style quotes
    singleQuote: true,
    jsxSingleQuote: true,
    
    // Preserve existing newlines
    endOfLine: "auto",
    
    // Allow trailing commas
    trailingComma: "all",
};
    
export default config;
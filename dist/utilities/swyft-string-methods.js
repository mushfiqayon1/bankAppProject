"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toCurrencyFormat = exports.toUppercaseFirst = void 0;
const toUppercaseFirst = (word) => `${word.charAt(0).toUpperCase()}${word.slice(1, word.length)}`;
exports.toUppercaseFirst = toUppercaseFirst;
const toCurrencyFormat = (amount) => amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
});
exports.toCurrencyFormat = toCurrencyFormat;
//# sourceMappingURL=swyft-string-methods.js.map
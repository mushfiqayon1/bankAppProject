"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Swyft_AccountNotFound = void 0;
const common_1 = require("@nestjs/common");
class Swyft_AccountNotFound extends common_1.NotFoundException {
    constructor(message) {
        super(`${message !== undefined && message.length ? message + ' a' : 'A'}ccount does not exist`);
    }
}
exports.Swyft_AccountNotFound = Swyft_AccountNotFound;
//# sourceMappingURL=swyft-account-not-found.exception.js.map
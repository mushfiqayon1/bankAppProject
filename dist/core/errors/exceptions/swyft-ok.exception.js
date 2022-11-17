"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Swyft_OKException = void 0;
const common_1 = require("@nestjs/common");
class Swyft_OKException extends common_1.HttpException {
    constructor(message) {
        super({
            status: common_1.HttpStatus.OK,
            message: message,
        }, common_1.HttpStatus.OK);
    }
}
exports.Swyft_OKException = Swyft_OKException;
//# sourceMappingURL=swyft-ok.exception.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const repository_1 = require("../../repositories/repository");
const isTableInDB = (table) => (target, propertyKey, descriptor) => {
    const mainMethod = descriptor.value;
    descriptor.value = async function (...args) {
        return repository_1.Repository.isTableInDB(table)
            .then(() => mainMethod.apply(this, args))
            .catch(() => {
            return new common_1.BadRequestException('The table does not exist');
        });
    };
    return descriptor;
};
exports.default = isTableInDB;
//# sourceMappingURL=is-table-in-db.decorator.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const repository_1 = require("../../repositories/repository");
const isTableEmpty = (table) => (target, propertyKey, descriptor) => {
    const mainMethod = descriptor.value;
    descriptor.value = async function (...args) {
        return repository_1.Repository.isTableEmpty(table)
            .then(() => mainMethod.apply(this, args))
            .catch(() => {
            return new common_1.BadRequestException('Database is empty');
        });
    };
    return descriptor;
};
exports.default = isTableEmpty;
//# sourceMappingURL=is-table-empty.decorator.js.map
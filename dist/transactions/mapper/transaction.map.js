"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionMapper = void 0;
const transaction_entity_1 = require("../entities/transaction.entity");
const uuid_1 = require("uuid");
class TransactionMapper {
    static toDomain(accountId, targetAccountId, raw) {
        return new transaction_entity_1.Transaction((0, uuid_1.v4)().toString(), targetAccountId, raw.note.trim(), Object.assign({ amount: raw.amount_money.amount.toFixed(2) }, raw.amount_money), accountId);
    }
}
exports.TransactionMapper = TransactionMapper;
//# sourceMappingURL=transaction.map.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionMapper = void 0;
const transaction_entity_1 = require("../entities/transaction.entity");
const uuid_1 = require("uuid");
class TransactionMapper {
    static assignId(accountId, targetAccountId, old) {
        return new transaction_entity_1.Transaction((0, uuid_1.v4)().toString(), targetAccountId, old.note.trim(), Object.assign({ amount: old.amount_money.amount.toFixed(2) }, old.amount_money), accountId);
    }
}
exports.TransactionMapper = TransactionMapper;
//# sourceMappingURL=transaction.trace.js.map
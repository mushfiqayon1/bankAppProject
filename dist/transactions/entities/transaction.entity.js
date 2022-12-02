"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
class Transaction {
    constructor(id, target_account_id, note, amount_money, account_id) {
        this.id = id;
        this.target_account_id = target_account_id;
        this.note = note;
        this.amount_money = amount_money;
        this.account_id = account_id;
    }
}
exports.Transaction = Transaction;
//# sourceMappingURL=transaction.entity.js.map
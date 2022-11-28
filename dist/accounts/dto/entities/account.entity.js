"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
class Account {
    constructor(id, given_name, family_name, email_address, note, balance) {
        this.id = id;
        this.given_name = given_name;
        this.family_name = family_name;
        this.email_address = email_address;
        this.note = note;
        this.balance = balance;
    }
    validAmount() {
        return this.balance.amount > 0;
    }
}
exports.Account = Account;
//# sourceMappingURL=account.entity.js.map
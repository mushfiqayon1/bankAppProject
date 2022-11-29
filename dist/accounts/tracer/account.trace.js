"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountTracer = void 0;
const account_entity_1 = require("../entities/account.entity");
const uuid_1 = require("uuid");
class AccountTracer {
    static assignId(old) {
        console.log(old);
        return new account_entity_1.Account((0, uuid_1.v4)().toString(), old.given_name.trim(), old.family_name.trim(), old.email_address.trim(), old.note.trim(), Object.assign({ amount: old.balance.amount.toFixed(2) }, old.balance));
    }
    static toUpdateAttribute(accountId, old, balance) {
        return new account_entity_1.Account(accountId, old.given_name.trim(), old.family_name.trim(), old.email_address.trim(), old.note.trim(), balance);
    }
}
exports.AccountTracer = AccountTracer;
//# sourceMappingURL=account.trace.js.map
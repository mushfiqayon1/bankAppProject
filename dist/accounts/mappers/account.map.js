"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountMapper = void 0;
const account_entity_1 = require("../entities/account.entity");
const uuid_1 = require("uuid");
const swyft_string_methods_1 = require("../../utilities/swyft-string-methods");
class AccountMapper {
    static toDomain(raw) {
        console.log(raw);
        return new account_entity_1.Account((0, uuid_1.v4)().toString(), (0, swyft_string_methods_1.toUppercaseFirst)(raw.given_name.trim()), (0, swyft_string_methods_1.toUppercaseFirst)(raw.family_name.trim()), raw.email_address.trim(), raw.note.trim(), Object.assign({ amount: raw.balance.amount.toFixed(2) }, raw.balance));
    }
    static toUpdateDomain(accountId, raw, balance) {
        return new account_entity_1.Account(accountId, (0, swyft_string_methods_1.toUppercaseFirst)(raw.given_name.trim()), (0, swyft_string_methods_1.toUppercaseFirst)(raw.family_name.trim()), raw.email_address.trim(), raw.note.trim(), balance);
    }
}
exports.AccountMapper = AccountMapper;
//# sourceMappingURL=account.map.js.map
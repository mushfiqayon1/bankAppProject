"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwyftSession = void 0;
class SwyftSession {
    constructor() {
        this.accountsInSession = [];
        this.killSession = (accountId) => {
            const foundSession = this.isInSession(accountId);
            return !foundSession.status
                ? false
                : this.accountsInSession.splice(foundSession.index, 1);
        };
        this.initSession = (accountId) => {
            return this.accountsInSession.push(accountId);
        };
        this.isInSession = (accountId) => {
            const foundSession = this.accountsInSession.indexOf(accountId);
            return foundSession >= 0
                ? { index: foundSession, status: true, id: accountId }
                : { index: foundSession, status: false, id: accountId };
        };
    }
}
exports.SwyftSession = SwyftSession;
//# sourceMappingURL=swyft-session.session.js.map
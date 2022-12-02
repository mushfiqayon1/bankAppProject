export class BankSession {
  // Session storage/Database for ACID

  private accountsInSession: Array<string> = [];

  // Kill a seesinon by id from the session database
  public killSession = (accountId: string): any => {
    const foundSession: {
      index: number;
      status: boolean;
      id: string;
    } = this.isInSession(accountId);

    return !foundSession.status
      ? false
      : this.accountsInSession.splice(foundSession.index, 1);
  };

  //create a session for a accountId
  public initSession = (accountId: string): number => {
    return this.accountsInSession.push(accountId);
  };

  //Check the accountId is in the session or not
  public isInSession = (
    accountId: string
  ): { index: number; status: boolean; id: string } => {
    const foundSession: number = this.accountsInSession.indexOf(accountId);
    return foundSession >= 0
      ? { index: foundSession, status: true, id: accountId }
      : { index: foundSession, status: false, id: accountId };
  };
}

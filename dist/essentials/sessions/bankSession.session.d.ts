export declare class BankSession {
    private accountsInSession;
    killSession: (accountId: string) => any;
    initSession: (accountId: string) => number;
    isInSession: (accountId: string) => {
        index: number;
        status: boolean;
        id: string;
    };
}

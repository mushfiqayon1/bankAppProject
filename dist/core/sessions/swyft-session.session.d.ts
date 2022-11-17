export declare class SwyftSession {
    private accountsInSession;
    killSession: (accountId: string) => any;
    initSession: (accountId: string) => number;
    isInSession: (accountId: string) => {
        index: number;
        status: boolean;
        id: string;
    };
}

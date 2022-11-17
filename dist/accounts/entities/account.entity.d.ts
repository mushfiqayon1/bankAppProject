export declare class Account {
    readonly id: string;
    readonly given_name: string;
    readonly family_name: string;
    readonly email_address: string;
    readonly note: string;
    readonly balance: {
        amount: number;
        currency: string;
    };
    constructor(id: string, given_name: string, family_name: string, email_address: string, note: string, balance: {
        amount: number;
        currency: string;
    });
    isAmountPositive?(): boolean;
}

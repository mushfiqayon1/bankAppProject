export declare class BalanceAttributes {
    currency: string;
    amount: number;
}
export declare class CreateAccountDto {
    given_name: string;
    family_name: string;
    email_address: string;
    note: string;
    balance: BalanceAttributes;
}

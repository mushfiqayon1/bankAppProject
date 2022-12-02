export declare class TransactionAmountAttributes {
    readonly amount: number;
    readonly currency: string;
}
export declare class CreateTransactionDto {
    readonly id?: string;
    readonly target_account_id: string;
    readonly note?: string;
    readonly amount_money: TransactionAmountAttributes;
}

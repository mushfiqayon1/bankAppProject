export declare class TransactionAmountAttributes {
    readonly amount: number;
    readonly currency: string;
}
export declare class DepositTransactionDto {
    readonly note?: string;
    readonly amount_money: TransactionAmountAttributes;
}

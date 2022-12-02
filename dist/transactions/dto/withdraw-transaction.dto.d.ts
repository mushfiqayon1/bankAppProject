export declare class TransactionAmountAttributes {
    readonly amount: number;
    readonly currency: string;
}
export declare class WithdrawTransactionDto {
    readonly note?: string;
    readonly amount_money: TransactionAmountAttributes;
}

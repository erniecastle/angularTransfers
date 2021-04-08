export interface Transactions {
    transactions: Datum;
    data?: any;
}

export interface Datum {
    categoryCode?: string;
    dates?:        Dates;
    transaction?:  Transaction;
    merchant?:     Merchant;
}

export interface Dates {
    valueDate?: Date | number;
}

export interface Merchant {
    name?:          string;
    accountNumber?: AccountNumber;
}

export enum AccountNumber {
    Si64397745065188826 = "SI64397745065188826",
}

export interface Transaction {
    amountCurrency?:       AmountCurrency;
    type?:                 string;
    creditDebitIndicator?: CreditDebitIndicator;
}

export interface AmountCurrency {
    amount?:       number | string;
    currencyCode?: CurrencyCode;
}

export enum CurrencyCode {
    Eur = "EUR",
}

export enum CreditDebitIndicator {
    Crdt = "CRDT",
    Dbit = "DBIT",
}

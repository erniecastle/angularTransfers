import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Transactions, Datum, Dates, Transaction, AmountCurrency, CurrencyCode,Merchant,AccountNumber } from '../app/interfaces/transactions';

@Injectable({
  providedIn: 'root'
})

export class CardFormService {
  Transactions: Transactions;
  lisData = [];

  constructor(private http: HttpClient) {
    this.http.get("../mock/transactions.json").subscribe((res: Transactions) => {
      this.Transactions = res;
      this.lisData = this.Transactions.data;
      this.change.emit(this.lisData);
    });
  }

  @Output() change: EventEmitter<any> = new EventEmitter();

  setTransfer(formValues) {
    var getIndexCompanie = this.lisData.findIndex(s => s.merchant.name === formValues.toaccount);
    var getBankAccount = this.lisData[getIndexCompanie];
    var newBalance = getBankAccount.transaction.amountCurrency.amount - formValues.amount;
    if(newBalance <= -501){
      alert("you can't overdrat this account");
    }else{
      getBankAccount.transaction.amountCurrency.amount = newBalance;
      this.lisData[getIndexCompanie] = getBankAccount;
      this.change.emit(this.lisData);
    }

    
    //Old code for new companie transfer
    // const merchant = {} as Merchant;
    // merchant.name = "Georgia Power Electric Company";
    // merchant.accountNumber = AccountNumber.Si64397745065188826;
    
    // const amountCurrency = {} as AmountCurrency;
    // amountCurrency.amount = formValues.amount;
    // amountCurrency.currencyCode = CurrencyCode.Eur;

    // const transaction = {} as Transaction;
    // transaction.amountCurrency = amountCurrency;
    // transaction.type = "Free checking(4692)";

    // const dates = {} as Dates;
    // dates.valueDate = new Date();

    // const datum = {} as Datum;
    // datum.categoryCode = '#338dec';
    // datum.dates = dates;
    // datum.transaction = transaction;
    // datum.merchant = merchant;

    // const transactions = {} as Transactions;
    // transactions.data = new Object(datum);

    // this.lisData.unshift(transactions.data);
    // this.change.emit(this.lisData);
  }

  

  filterData(filterValue) {
    let filterValueLower = filterValue.toLowerCase();
    if (filterValueLower === '') {
      this.clearFilter();
    } else {
      this.lisData = this.Transactions.data;
      const result = this.lisData.filter(s => s.merchant.name.includes(filterValueLower));
      this.lisData = result;
      this.change.emit(this.lisData);
    }
  }

  filterPerDate(filterValue) {
    var getDate = new Date(filterValue.year, filterValue.month, filterValue.day);
    var getYear = getDate.getFullYear();
    var getDay = getDate.getDate();
    this.clearFilter();
    const result = this.lisData.filter(f => new Date(f.dates.valueDate).getFullYear() == getYear &&
      new Date(f.dates.valueDate).getDate() == getDay);
    this.lisData = result;
    this.change.emit(this.lisData);
  }

  filterDataPerBenef() {
    this.lisData.sort((a, b) => a.merchant.name.localeCompare(b.merchant.name));
    this.change.emit(this.lisData);
  }

  filterDatamount() {
    this.lisData.sort((a, b) => a.transaction.amountCurrency.amount - b.transaction.amountCurrency.amount);
    this.change.emit(this.lisData);
  }

  clearFilter() {
    this.lisData = this.Transactions.data;
    this.change.emit(this.lisData);
  }

}

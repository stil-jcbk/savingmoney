/*
  HISTORY STRUCT:
  1.amount
  2.action
  3.date (dd.mm.yyyy)

  {"history":
    {
      "amount": 1234
      "action": 0/1
      "date": ?
    }
  }
*/

import displayError from "./displayerror";

/*
  ACTION:
  0. DEPOSIT
  1. WITHDRAW
*/

export type DateType = {
  day: number;
  month: number;
  year: number;
}

export type HistoryElement = {
    amount: number;
    action: 0 | 1;
    date: DateType;
};

type HistoryList = HistoryElement[];

export function loadHistory(){
  let history = localStorage.getItem("history");
  return history;
}

export function addAction(HistoryElement: HistoryElement){
  let balance = getBalance();
  if(HistoryElement.amount > balance && HistoryElement.action === 1) return displayError(3);

  let history = loadHistory()
  if (history === null || history === "") history = "[]";
  let historyList: HistoryList = JSON.parse(history);

  historyList.unshift(HistoryElement);

  let historyString = JSON.stringify(historyList);
  localStorage.setItem("history" ,historyString);
  return changeBalance(HistoryElement.action, HistoryElement.amount);
}

function changeBalance(action: 0 | 1, amount: number){
  let balance = localStorage.getItem("balance");
  if(balance === null || balance === "") balance = "0";

  let newBalance: number;
  if(action === 1){
    newBalance = parseFloat(balance) - amount;
    localStorage.setItem("balance", String(newBalance))
    return newBalance
  }
  newBalance = parseFloat(balance) + amount;
  localStorage.setItem("balance", String(newBalance))
  return newBalance
}

export function getBalance(){
  let balance = localStorage.getItem("balance");
  if(balance === null || balance === "") return 0;

  return parseFloat(balance)
}
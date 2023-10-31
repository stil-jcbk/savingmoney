import { db } from "../components/firebase";
import { setDoc, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import displayError from "../scripts/displayerror"

export type userData = {
  balance: number;
  history: string;
}

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

export type HistoryList = HistoryElement[];


export const newUser = async (userid: string) => {
  const docRef = doc(db, "users", userid)
  const payload = {balance: 0, history: ""}
  await setDoc(docRef, payload)
}

export const checkIfUserExists = async (userid: string, callback: Function) => {
  const docRef = doc(db, "users", userid)
  getDoc(docRef).then((result) => {
    callback(result.exists())
  }).catch((error) => {
    console.error(error)
  })
}

export const getUser = async (userid: string, callback: Function) => {
  const docRef = doc(db, "users", userid)
  getDoc(docRef).then((data) => {
    callback(data.data() as userData)
  });
}

/*
  ACTION:
  0. DEPOSIT
  1. WITHDRAW
*/

export const changeBalance = async (userid: string, action: 0 | 1,balanceChange: number) => {
  const docRef = doc(db, "users", userid)
  await getUser(userid, (data: userData) => {
    let oldBalance = data.balance
    if(action === 1) balanceChange *= -1
    let newBalance = balanceChange + oldBalance;
    const payload = {balance: newBalance}
    updateDoc(docRef, payload)
  })
}

export const updateHistory = async (userid: string, history: string) => {
  const docRef = doc(db, "users", userid)
  await getUser(userid, () => {
    let payload = {history: history}
    updateDoc(docRef, payload);
  })
}

 export const loadHistory = async (userid: string, callback: Function) => {
   await getUser(userid, (data: userData)=> {
     let history = data.history;
     callback(history)
   })
 }

 export const addAction = async (userid: string, HistoryElement: HistoryElement) => {
   
   await getUser(userid, (data: userData) => {
     let balance = data.balance;
   
     if(HistoryElement.amount <= 0) return displayError(1);
     if(HistoryElement.amount > balance && HistoryElement.action === 1) return displayError(3);
  
     loadHistory(userid, (history: string | null) => {
       if (history === null || history === "") history = "[]";
       let historyList: HistoryList = JSON.parse(history);
    
       historyList.unshift(HistoryElement);
    
       let historyString = JSON.stringify(historyList);
       updateHistory(userid, historyString)
       changeBalance(userid ,HistoryElement.action, HistoryElement.amount);
     })
   })
 }
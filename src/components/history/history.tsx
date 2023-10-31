import "./style.css";
import {useState} from "react";
import {loadHistory, HistoryElement} from "../../scripts/db";
import {auth} from "../firebase";

type HistoryProps = {
  history: string | null;
};

export default function History(){
  const [history, setHistory] = useState([])
  let user = auth.currentUser
  let tempHistory: string = "[]";
  if(user){
    loadHistory(user.uid, (history: string) => {
      if(history !== null && history !== "") tempHistory = history;
      setHistory(JSON.parse(tempHistory));
    })
  }
  return (
    <div id="history">
      <span className="title">HISTORY</span>
      <ul className="history-wrapper">
        {history.map((event: HistoryElement, i: number) => {
          return (
            <li
              key={i}
              className={
                "event " + (event.action === 0 ? "deposit" : "withdraw")
              }
            >
              <span className="amount">${event.amount}</span>
              <span className="action">
                {event.action === 0 ? "deposit" : "withdraw"}
              </span>
              <span className="date">
                {event.date.day}.{event.date.month}.{event.date.year}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

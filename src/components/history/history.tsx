import "./style.css";
import { HistoryElement } from "../../scripts/localdb";

type HistoryProps = {
  history: string | null;
};

export default function History(props: HistoryProps) {
  if (props.history === null) props.history = "[]";
  let history = JSON.parse(props.history);
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

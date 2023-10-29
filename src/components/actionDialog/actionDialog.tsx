import "./style.css";
import Select from "../select/select";
import Button from "../button/button";
import displayError from "../../scripts/displayerror";
import { DateType, HistoryElement, addAction } from "../../scripts/localdb";
import {
  changeBlurState,
  changeDialogState,
} from "../../pages/balance/balance";

type ActionDialogProps = {
  id: string;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
  actionClickFunctions: Function;
};

function buttonAction(callback: any) {
  function actionCheck(action: string) {
    if (action === "deposit" || action === "withdraw") return true;
    return false;
  }

  let actionElement = document.getElementById("action") as HTMLSelectElement;
  let amountElement = document.getElementById("amount") as HTMLInputElement;
  if (actionElement && amountElement) {
    let action: string = actionElement.value;
    let amount: number = parseFloat(amountElement.value);
    if (isNaN(amount) || !actionCheck(action)) return displayError(1);
    console.log(`action: ${action}\namount: $${amount}`);

    let actionId: 0 | 1 = 0;
    if (action === "withdraw") actionId = 1;

    let currentDate = new Date();
    let date: DateType = {
      day: currentDate.getDate(),
      month: currentDate.getMonth() + 1,
      year: currentDate.getFullYear(),
    };

    let data: HistoryElement = {
      action: actionId,
      amount: amount,
      date: date,
    };

    callback(addAction(data));
  }

  changeBlurState();
  changeDialogState();
}

export default function ActionDialog(props: ActionDialogProps) {
  return (
    <dialog id={props.id}>
      <div
        onClick={() => {
          props.actionClickFunctions();
        }}
        id="closeDialogButton"
      />
      <span className="title">action</span>
      <Select id="action" items={["deposit", "withdraw"]} />
      <span className="title">amount</span>
      <input id="amount" placeholder="$0" maxLength={20} />
      <Button
        click={() => {
          buttonAction((balance: number | void) => {
            if (isNaN(balance as number)) return;
            return props.setBalance(balance as number);
          });
        }}
      >
        ADD
      </Button>
    </dialog>
  );
}

import React from "react"
import "./style.css";
import Select from "../select/select";
import Button from "../button/button";
import displayError from "../../scripts/displayerror";
import { DateType, HistoryElement, addAction } from "../../scripts/db";
import {
  changeBlurState,
  changeDialogState,
} from "../../pages/balance/balance";
import {auth} from "../firebase";
import {useTranslation} from "react-i18next";

type ActionDialogProps = {
  id: string;
  actionClickFunctions: Function;
};

async function buttonAction() {
  function actionCheck(action: string) {
    return action === "deposit" || action === "withdraw";
  }

  let actionElement = document.getElementById("action") as HTMLSelectElement;
  let amountElement = document.getElementById("amount") as HTMLInputElement;
  if (actionElement && amountElement) {
    let action: string = actionElement.value;
    let amount: number = parseFloat(amountElement.value);
    if (isNaN(amount) || !actionCheck(action)) return displayError(1);

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

    await addAction(auth.currentUser!.uid ,data);
  }

  changeBlurState();
  changeDialogState();
}

export default function ActionDialog(props: ActionDialogProps) {
  const {t} = useTranslation()

  return (
    <dialog id={props.id}>
      <span
        onClick={() => {
          props.actionClickFunctions();
        }}
        id="closeDialogButton"
      />
      <span className="title">{t("Balance.Action")}</span>
      <Select id="action" items={[{name: t("Balance.Deposit"), value: "deposit"}, {name: t("Balance.Withdraw"), value: "withdraw"}]} />
      <span className="title">{t("Balance.Amount")}</span>
      <input id="amount" placeholder="$0" maxLength={20} />
      <Button
        click={buttonAction}
      >
        {t("Balance.Add")}
      </Button>
    </dialog>
  );
}

import Button from "../../components/button/button";
import ActionDialog from "../../components/actionDialog/actiondialog";
import "./style.css";
import { getBalance } from "../../scripts/localdb";
import { useState } from "react";

export function changeDialogState() {
  let dialog = document.getElementById(
    "actionDialog"
  ) as HTMLDialogElement | null;
  if (dialog != null) {
    dialog.open = !dialog.open;
  }
}

export function changeBlurState() {
  let blur = document.getElementById("blur") as HTMLDivElement | null;
  if (blur != null) {
    let hidden = blur.classList.contains("hidden");
    if (hidden) {
      blur.classList.remove("hidden");
      blur.classList.add("shown");
    } else {
      blur.classList.remove("shown");
      blur.classList.add("hidden");
    }
  }
}

export default function Balance() {
  const [balance, setBalance] = useState(getBalance());

  return (
    <div className="body">
      <div id="blur" className="hidden" />
      <div className="balance">
        <span className="title">BALANCE</span>
        <span id="balance">${balance}</span>
      </div>
      <Button
        click={() => {
          changeDialogState();
          changeBlurState();
        }}
      >
        ACTION
      </Button>
      <ActionDialog
        setBalance={setBalance}
        actionClickFunctions={() => {
          changeDialogState();
          changeBlurState();
        }}
        id="actionDialog"
      ></ActionDialog>
    </div>
  );
}

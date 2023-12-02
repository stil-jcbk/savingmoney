import Button from "../../components/button/button";
import ActionDialog from "../../components/actionDialog/actionDialog";
import "./style.css";
import { useEffect, useState } from "react";
import History from "../../components/history/history";
import { getUser, userData } from "../../scripts/db";
import {auth, db} from "../../components/firebase";
import {doc, onSnapshot} from "firebase/firestore";
import {useTranslation} from "react-i18next";

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
  const [balance, setBalance] = useState(0);

  const {t} = useTranslation()

  useEffect(() => {
    let user = auth.currentUser;
    if (user) {
      const docRef = doc(db, "users", user.uid)
      onSnapshot(docRef, (snapshot) => {
        let data = snapshot.data() as userData;
        return setBalance(data.balance)
      })
    }
  }, []);

  return (
    <div className="body">
      <div id="blur" className="hidden" />
      <div className="balance">
        <span className="title">{t("Balance.BalanceTitle")}</span>
        <span id="balance">${balance}</span>
        <Button
          click={() => {
            changeDialogState();
            changeBlurState();
          }}
        >
          {t("Balance.ActionButton")}
        </Button>
      </div>
      <History />
      <ActionDialog
        actionClickFunctions={() => {
          changeDialogState();
          changeBlurState();
        }}
        id="actionDialog"
      ></ActionDialog>
    </div>
  );
}

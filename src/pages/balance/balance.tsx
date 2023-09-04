import Button from "../../components/button/button";
import ActionDialog from "../../components/actionDialog/actiondialog";
import "./style.css";

function changeDialogState() {
  let dialog = document.getElementById(
    "actionDialog"
  ) as HTMLDialogElement | null;
  if (dialog != null) {
    dialog.open = !dialog.open;
  }
}

function changeBlurState() {
  let blur = document.getElementById("blur") as HTMLDivElement | null;
  if (blur != null) {
    let hidden = blur.classList.contains("hidden");
    console.log(123);
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
  return (
    <div className="body">
      <div id="blur" className="hidden" />
      <div className="balance">
        <span className="title">BALANCE</span>
        <span id="balance">$3121.50</span>
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
        actionClickFunctions={() => {
          changeDialogState();
          changeBlurState();
        }}
        id="actionDialog"
      ></ActionDialog>
    </div>
  );
}

import "./style.css";
import Select from "../select/select";
import Button from "../button/button";

type ActionDialogProps = {
  id: string;
  actionClickFunctions: Function;
};

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
      <Select items={["deposit", "withdraw"]} />
      <span className="title">amount</span>
      <input placeholder="$0" maxLength={20} />
      <Button click={() => {}}>ADD</Button>
    </dialog>
  );
}

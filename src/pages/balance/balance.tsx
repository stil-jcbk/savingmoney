import Button from "../../components/button/button";
import "./style.css";

function openDialog() {}

export default function Balance() {
  return (
    <div className="body">
      <div className="balance">
        <span className="title">BALANCE</span>
        <span id="balance">$3121.50</span>
      </div>
      <Button click={() => {}}>ACTION</Button>
    </div>
  );
}

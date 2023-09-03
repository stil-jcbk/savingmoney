import "./style.css";

type ButtonProps = {
  children: string;
  click: Function;
};

export default function Button(props: ButtonProps) {
  return (
    <button
      onClick={() => {
        props.click();
      }}
      className="btn"
    >
      {props.children}
    </button>
  );
}

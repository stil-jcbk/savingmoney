import "./style.css";

type ButtonProps = {
  children: string;
  click: Function;
  className?: string;
};

export default function Button(props: ButtonProps) {
  props.className = "";
  return (
    <button
      onClick={() => {
        props.click();
      }}
      className={
        "btn" +
        (props.className.length > 0
          ? () => {
              return " " + props.className;
            }
          : "")
      }
    >
      {props.children}
    </button>
  );
}

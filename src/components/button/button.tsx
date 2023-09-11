import "./style.css";

type ButtonProps = {
  children: string;
  click: Function;
  className?: string;
};

function classNameCheck(className: string | undefined) {
  if (className) {
    if (className.length > 0) {
      return true;
    }
  }
  return false;
}

export default function Button(props: ButtonProps) {
  return (
    <button
      onClick={() => {
        props.click();
      }}
      className={
        "btn" + (classNameCheck(props.className) ? " " + props.className : "")
      }
    >
      {props.children}
    </button>
  );
}

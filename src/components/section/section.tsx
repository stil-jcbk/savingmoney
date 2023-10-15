import "./style.css";

type SectionProps = {
  title?: string;
  children?: any;
  position?: "left" | "right" | "center";
  textAlignment?: "left" | "right" | "center";
};

export default function Section(props: SectionProps) {
  return (
    <div className={"section " + (props.position ? props.position : "left")}>
      <h2 className="title">{props.title}</h2>
      <p
        className="content"
        style={{
          textAlign: props.textAlignment ? props.textAlignment : "left",
        }}
      >
        {props.children}
      </p>
    </div>
  );
}

import "./style.css";

type SelectProps = {
  items: Array<string>;
};

export default function Select(props: SelectProps) {
  const addOptions = (items: Array<string>) => {
    return items.map((item) => (
      <option value={item} key={item}>
        {item}
      </option>
    ));
  };

  return (
    <select name="action" id="action">
      {addOptions(props.items)}
    </select>
  );
}

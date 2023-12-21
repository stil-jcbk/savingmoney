import "./style.css";

type SelectProps = {
  items: SelectOption[];
  id?: string;
};

type SelectOption = {
  name: string;
  value: string;
}

export default function Select(props: SelectProps) {
  const addOptions = (items: SelectOption[]) => {
    return items.map((item) => (
      <option value={item.value} key={item.value}>
        {item.name}
      </option>
    ));
  };

  return (
    <select name="action" id={props.id}>
      {addOptions(props.items)}
    </select>
  );
}

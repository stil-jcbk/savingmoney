type ActionDialogProps = {
  id: string;
};

export default function ActionDialog(props: ActionDialogProps) {
  return <dialog id={props.id}></dialog>;
}

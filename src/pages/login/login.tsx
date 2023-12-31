import AuthForm from "../../components/authForm/authForm";

export default function Login() {
  return (
    <div className={"auth-body"}>
      <AuthForm type="login" />
    </div>
  );
}

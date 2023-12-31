import "./style.css"
import AuthForm from "../../components/authForm/authForm";
import { Link } from "react-router-dom"

export default function Register() {
  return (
    <div className={"auth-body"}>
      <AuthForm type="register" />
      <p className={"privacy-policy"}>By creating an account you accept the <Link to={"/privacy-policy"}>Privacy Policy</Link></p>
    </div>
  );
}

import "./style.css";
import Button from "../button/button";
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import { auth, signInWithGoogle } from "../firebase";
import { useNavigate } from "react-router-dom";
import { checkIfUserExists, newUser } from "../../scripts/db";
import { useTranslation } from "react-i18next";

type AuthFormProps = {
  type: "login" | "register";
};

export default function AuthForm(props: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {t} = useTranslation()

  const Auth = (callback: (authCheck: boolean, userCredential?: UserCredential) => void) => {
    let vEmail = validateEmail(email);
    let vPass = validatePassword(password);
    if (vEmail && vPass) {
      if (props.type === "login") {
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            callback(true, userCredential);
          })
          .catch((error) => {
            console.error(error);
            callback(false);
          });
      } else {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            callback(true, userCredential);
          })
          .catch((error) => {
            console.error(error);
            callback(false);
          });
      }
    }
  };

  const navigate = useNavigate();

  const getTranslationForm = (type: string) => {
    let typeArray = type.split("");
    typeArray[0] = typeArray[0].toUpperCase()
    let upperType = typeArray.join("");
    return upperType + "Form"
  }

  let translationForm: string = getTranslationForm(props.type);

  return (
    <div className="authform">
      <h2 className="title">{t(`Auth.${translationForm}.Title`)}</h2>
      <div className="input-container">
        <input
          type="email"
          placeholder={t(`Auth.${translationForm}.email`)}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder={t(`Auth.${translationForm}.password`)}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <Button
        click={() => {
          Auth((authCheck, result) => {
            if (authCheck && result){
              navigate("/");
              let userid = result.user.uid;
              checkIfUserExists(userid, (result: boolean) => {
                if (!result) {
                  return newUser(userid);
                }
              });
            }else if(props.type === "login"){
              return alert("Wrong credentials");
            }
          });
        }}
      >
        {t(`Auth.${translationForm}.ButtonText`)}
      </Button>
      <div
        className="google-auth"
        onClick={() => {
          signInWithGoogle((authCheck: boolean, result: UserCredential) => {
            if(!result) return alert("error")
            if (authCheck) navigate("/");
            let userid = result.user.uid;
            checkIfUserExists(userid, (result: boolean) => {
              if (!result) {
                newUser(userid);
              }
            });
          });
        }}
      >
        <svg
          id="google-icon"
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
        >
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
          <path d="M1 1h22v22H1z" fill="none" />
        </svg>
      </div>
      <div className="second-option">
        {(props.type === "login")? <span onClick={() => navigate("/register")}>{t(`Auth.${translationForm}.RegisterInstead`)}</span> : <span onClick={() => navigate("/login")}>{t(`Auth.${translationForm}.LoginInstead`)}</span>}
      </div>
    </div>
  );
}

const validateEmail = (email: string) => {
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (email.match(validRegex)) return true;
  return false;
};

const validatePassword = (password: string) => {
  if (password.length < 8) {
    alert("Password is too short");
    return false;
  }
  return true;
};

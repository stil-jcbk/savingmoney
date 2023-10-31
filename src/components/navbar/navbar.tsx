import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./style.css";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "../firebase";

export default function Navbar() {
  //auth
  const [authUser, setAuthUser] = useState<any>(null);

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setAuthUser(user);
        } else {
          setAuthUser(null);
        }
      }),
    []
  );

  //navbar movement
  useEffect(() => {
    if (window) {
      window.addEventListener("scroll", (e) => {
        let posY = window.scrollY;
        let nav = document.getElementById("nav");
        if (posY > 50 && nav) {
          nav.classList.add("moved");
        } else if (nav) {
          nav.classList.remove("moved");
        }
      });
    }
  }, []);
  let location = useLocation();
  let navigate = useNavigate();

  let activeElements = document.getElementsByClassName(
    "active"
  ) as HTMLCollectionOf<HTMLAnchorElement>;

  for (let i = 0; i < activeElements.length; i++) {
    let activeElement: HTMLAnchorElement = activeElements[i];
    activeElement.classList.remove("active");
  }

  //active page
  useEffect(() => {
    let elements = document.getElementsByTagName("a");

    for (let i = 0; i < elements.length; i++) {
      let element: HTMLAnchorElement = elements[i];
      if (element.href.endsWith(location.pathname)) {
        element.classList.add("active");
      }
    }
  }, []);

  return (
    <div id="nav" className="navbar">
      <div className="hero">
        <div className="hero-title">
          <span className="title">
            <span className="accent">SAVE</span>.CASH
          </span>
        </div>
        <div className="dollar">
          <span>$</span>
        </div>
      </div>
      <div className="routes">
        <Link to={"/"}>HOME</Link>
        {authUser ? (
          <>
            <Link to={"/balance"}>BALANCE</Link>
            <span
              onClick={() => {
                signOut(auth);
                navigate("/");
              }}
              className="username"
            >
              {getUsername(authUser.email)}
            </span>
          </>
        ) : (
          <Link to={"/login"}>LOGIN</Link>
        )}
      </div>
    </div>
  );
}

const getUsername = (email: string) => {
  let parts = email.split("@");
  return parts[0];
};

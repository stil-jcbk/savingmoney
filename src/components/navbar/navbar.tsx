import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./style.css";

export default function Navbar() {
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
  });
  let location = useLocation();

  let activeElements = document.getElementsByClassName(
    "active"
  ) as HTMLCollectionOf<HTMLAnchorElement>;

  for (let i = 0; i < activeElements.length; i++) {
    let activeElement: HTMLAnchorElement = activeElements[i];
    activeElement.classList.remove("active");
  }

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
        <Link to={"/balance"}>BALANCE</Link>
      </div>
    </div>
  );
}

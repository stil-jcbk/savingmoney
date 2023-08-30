import { useEffect } from "react";
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

  useEffect(() => {
    let elements = document.getElementsByTagName("a");
    let currentUrl = window.location.pathname;

    for (let i = 0; i < elements.length; i++) {
      let element: HTMLAnchorElement = elements[i];
      if (element.pathname === currentUrl) {
        element.classList.add("active");
      }
    }
  });

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
        <a href="/">HOME</a>
        <a href="/balance">BALANCE</a>
      </div>
    </div>
  );
}

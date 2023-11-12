import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./style.css";
import NavDrop from "../navdrop/navdrop";
import NavDropItem from "../navdrop/navdropitem";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "../firebase";

const useActiveTabState = (): [HTMLElement | undefined, (element: HTMLElement) => void] => {
  const [activeTab, setActiveTab] = useState<HTMLElement>()
  const setNewActiveTab = async (element: HTMLElement) => {
    if(activeTab && activeTab !== element){
      activeTab.classList.remove("active")
    }
    setActiveTab(element);
    return true;
  }

  return [activeTab, setNewActiveTab]
}

export default function Navbar() {
  const [activeTab, setNewActiveTab] = useActiveTabState();
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
      }),[]);

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
  let navigate = useNavigate();

  if(activeTab){
    activeTab.classList.add("active")
  }

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
        <Link onClick={(e) => {setNewActiveTab(e.currentTarget)}} to={"/"}>HOME</Link>
        {authUser ? (
          <>
            <Link onClick={(e) => {setNewActiveTab(e.currentTarget)}} to={"/balance"}>BALANCE</Link>
            {/*<span*/}
            {/*  onClick={() => {*/}
            {/*    signOut(auth);*/}
            {/*    navigate("/");*/}
            {/*  }}*/}
            {/*  className="username"*/}
            {/*>*/}
            {/*  {getUsername(authUser.email)}*/}
            {/*</span>*/}
            <NavDrop name={getUsername(authUser.email)}>
              <NavDropItem text="goals" onClick={(e) => {
                setNewActiveTab(e.target as HTMLElement)
                navigate("/goals")
              }} />
              <NavDropItem onClick={() => {
                signOut(auth);
                navigate("/");
              }} text="logout"/>
            </NavDrop>
          </>
        ) : (
          <Link onClick={(e) => {setNewActiveTab(e.currentTarget)}} to={"/login"}>LOGIN</Link>
        )}
      </div>
    </div>
  );
}

const getUsername = (email: string) => {
  let parts = email.split("@");
  return parts[0];
};

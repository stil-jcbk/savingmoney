import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export default function AuthRoute() {
  const [authUser, setAuthUser] = useState<any>(null);

  let navigate = useNavigate();
  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setAuthUser(user);
        } else {
          setAuthUser(null);
          navigate("/login");
        }
      }),
    []
  );

  return <>{authUser ? <Outlet /> : <></>}</>;
}

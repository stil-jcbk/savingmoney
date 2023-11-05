import React from "react";
import {NavDropItemProps} from "./navdropitem";
import "./style.css"

type NavDropProps = {
    name: string;
    children: React.ReactElement<NavDropItemProps>[] | React.ReactElement<NavDropItemProps>;
}

export default function NavDrop(props: NavDropProps){
    return(
        <div className="navdrop">
            <span className="username">{props.name}</span>
            <div className="drop">
                {props.children}
            </div>
        </div>
    )
}
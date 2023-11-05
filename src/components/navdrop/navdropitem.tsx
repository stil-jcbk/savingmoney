import {MouseEventHandler} from "react";

export type NavDropItemProps = {
    text: string;
    onClick: MouseEventHandler;
}

export default function NavDropItem(props: NavDropItemProps){
    return(
        <span className="item" onClick={props.onClick}>{props.text}</span>
    )
}
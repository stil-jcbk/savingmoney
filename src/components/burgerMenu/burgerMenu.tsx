import "./style.css";
import React, {ReactElement} from "react";

type BurgerMenuProps = {
    children: ReactElement;
}

export default function BurgerMenu(props: BurgerMenuProps){
    const handleClick = (e: React.MouseEvent) => {
        const element = e.currentTarget as HTMLElement;
        const isOpened = element.getAttribute("aria-expanded");
        if(isOpened === "false"){
           element.setAttribute("aria-expanded", "true") 
        } else {
            element.setAttribute("aria-expanded", "false")
        }
    }
    
    return(
        <div className="burger-container">
        <button onClick={handleClick} className="burger-menu-button" aria-controls="primary-navigation" aria-expanded="false">
            <svg className="burger" viewBox="0 0 100 100" width="50">
                <rect className="line top" width="80" height="10" x="10" y="25" rx="5"></rect>
                <rect className="line middle" width="80" height="10" x="10" y="45" rx="5"></rect>
                <rect className="line bottom" width="80" height="10" x="10" y="65" rx="5"></rect>
            </svg>
        </button>
        <div className="burger-menu">
            {props.children}
        </div>
        </div>
    )
}
import React, {useState} from "react";
import "./style.css"
import Button from "../button/button";
import {useTranslation} from "react-i18next";

type confirmActionProps = {
    action: Function;
    cancel: Function;
    children: string;
}

type confirmation = {
    state: boolean,
    function?: Function;
}

export const useConfirmationState = (): [confirmation, React.Dispatch<React.SetStateAction<confirmation>>] => {
    const [confirm, setConfirm] = useState<confirmation>({state: false, function: () => {}})
    let HTMLElement = document.getElementsByTagName("html")[0];
    let bodyElement = document.getElementsByTagName("body")[0]
    if(confirm.state === true){
        HTMLElement.style.overflow = "hidden";
        bodyElement.style.overflow = "hidden";
    }else{
        HTMLElement.style.overflow = "auto";
        bodyElement.style.overflow = "auto";
    }
    
    return [confirm as confirmation, setConfirm as React.Dispatch<React.SetStateAction<confirmation>>]
}

export default function ConfirmAction(props: confirmActionProps){
    const {t} = useTranslation()

    return(
        <div className="confirm-action">
            <div className="dialog">
                <p>{props.children}</p>
                <div className="buttons">
                    <Button click={props.action}>{t("Confirmation.Yes")}</Button>
                    <Button click={props.cancel}>{t("Confirmation.No")}</Button>
                </div>
                </div>
        </div>
    )
}
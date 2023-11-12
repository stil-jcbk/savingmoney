import "./style.css"
import ProgressBar from "../progressbar/progressbar";
import Button from "../button/button";
import ConfirmAction, {useConfirmationState} from "../confirmAction/confirmAction";
import React from "react";
import {addAction, changeBalance, DateType, getUser, HistoryElement, removeGoal, userData} from "../../scripts/db";
import {auth} from "../firebase";
import displayError from "../../scripts/displayerror";

export type GoalProps = {
    title: string;
    id: string;
    balance: number;
    goal: number;
}

export default function Goal(props: GoalProps){
    const [confirm, setConfirm] = useConfirmationState()
    
    let perc = Math.floor(props.balance/props.goal * 100);
    
    const completeGoal = async () => {
        if(auth.currentUser){
            let userid = auth.currentUser.uid;
            getUser(userid, (user: userData) => {
                if(user.balance < props.goal) return displayError(5);
                changeBalance(userid, 1, props.goal);
                
                let currentDate = new Date();
                let date: DateType = {
                    day: currentDate.getDate(),
                    month: currentDate.getMonth() + 1,
                    year: currentDate.getFullYear(),
                };
                
                let data: HistoryElement = {
                    action: 1,
                    amount: props.goal,
                    date: date,
                }
                addAction(userid, data);
                
                removeGoal(userid, props.id);
            })
        }
    }
    
    const _removeGoal = async () => {
        if(auth.currentUser){
            let userid = auth.currentUser.uid;
            removeGoal(userid, props.id)
        }
    }
    
    const changeHoverState = (element: HTMLElement, type: "show" | "hide") => {
        if(type === "show"){
            element.classList.add("hover")
        }else if(type === "hide"){
            element.classList.remove("hover")
        }
    }
    
    return(
        <>
        {confirm.state?
        <ConfirmAction action={confirm.function!} cancel={() => {setConfirm({state: false})}}>
            This action is permanent. Are you sure you want to continue?
        </ConfirmAction>
            :
        <></>
            }
        <div onMouseLeave={(e) => {
            changeHoverState(e.currentTarget, "hide")
        }} onMouseOver={(e) => {
            changeHoverState(e.currentTarget, "show")
        }} className={"goal" + ((perc >= 100)? " complete" : "")}>
            <div className="options">
                {perc >= -100?
                <Button click={() => {
                    setConfirm({state: true, function: completeGoal})
                }}>COMPLETE</Button>
                :
                <></>
                }
                <Button className="remove-btn" click={() => {setConfirm({state: true, function: _removeGoal})}}>REMOVE</Button>
            </div>
            <div className="content">
                <span className="title">{props.title}</span>
                <ProgressBar perc={perc}/>
                <span className="money">${props.balance}/${props.goal}</span>
            </div>
        </div>
        </>
    )
}
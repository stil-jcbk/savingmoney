import React from "react";
import "./style.css"
import {useEffect, useState} from "react";
import {collection, doc, onSnapshot} from "firebase/firestore";
import {auth, db} from "../../components/firebase";
import {userData} from "../../scripts/db";
import {newGoal} from "../../scripts/db";
import Goal from "../../components/goal/goal"
import Button from "../../components/button/button";
import displayError from "../../scripts/displayerror";
import {useTranslation} from "react-i18next";

function NewGoal(){
    const {t} = useTranslation()
    const switchForm = (type: "hide" | "show") => {
        let goalNew = document.getElementById("goal-new")
        let goalPreform = document.getElementById("goal-preform");
        let goalForm = document.getElementById("goal-form");
        if(goalNew && goalPreform && goalForm){
            if(type === "show"){
                goalNew.classList.toggle("hidden");
                goalPreform.style.display = "none";
                goalForm.style.display = "flex"
            }else if("hide"){
                goalNew.classList.toggle("hidden");
                goalPreform.style.display = "flex";
                goalForm.style.display = "none"
            }
        }
    }
    
    const buttonAction = () => {
        if(auth.currentUser){
            let userid = auth.currentUser.uid
            let goalTitleInput  = document.getElementById("goal-title-input") as HTMLInputElement | null;
            let goalAmountInput = document.getElementById("goal-amount-input")  as HTMLInputElement | null;
            let payload = {title: "", goal: 0, date: Date.now()}
            
            if(goalTitleInput && goalAmountInput){
                let goalAmount = parseFloat(goalAmountInput.value)
                if(isNaN(goalAmount) || goalAmount <= 0) return displayError(4);
                payload.title = goalTitleInput.value;
                payload.goal = parseFloat(goalAmountInput.value);
                
                newGoal(userid, payload).then(() => switchForm("hide"))
            }
            
        }
    }
    
    return(
        <div id="goal-new" className="goal goal-new hidden">
            <div onClick={() => {switchForm("show")}} id="goal-preform">
                <span className="icon">+</span>
            </div>
            <div id="goal-form">
                <span onClick={() => {switchForm("hide")}} id="goal-form-close-btn"/>
                    <div className="goal-form">
                        <input id="goal-title-input" type="text" placeholder={t("Goals.Title")}/>
                        <input id="goal-amount-input" type="text" placeholder="$0" />
                        <Button click={buttonAction}>{t("Goals.Add")}</Button>
                    </div>
            </div>
        </div>
    )
}

export default function Goals(){
    
    type GoalProps = {
        title: string;
        goal: number;
        date: number;
        id: string;
    }
    
    const [balance, setBalance] = useState(0);
    const [goals, setGoals] = useState<any[]>([])
    
    useEffect(() => {
        let user = auth.currentUser;
        if (user) {
            const docRef = doc(db, "users", user.uid)
            onSnapshot(docRef, (snapshot) => {
                let data = snapshot.data() as userData;
                return setBalance(data.balance)
            })
            const collRef = collection(db, `users/${user.uid}/goals`);
            onSnapshot(collRef, (snapshot) => {
                let goals = snapshot.docs.map((goal) => goal.data()) as GoalProps[]
                let goalsIds: string[] = snapshot.docs.map((goal) => goal.id)
                for (let goal in goals){
                    goals[goal].id = goalsIds[goal];
                }
                goals.sort((a,b) => b.date - a.date)
                return setGoals(goals)
            })
        }
    }, []);
    
    return(
        <div className="body">
            <div className="goals-container">
                <NewGoal/>
                {goals.map((goal: GoalProps) => (
                    <Goal key={goal.id} id={goal.id} title={goal.title} balance={balance} goal={goal.goal}/>
                ))}
            </div>
        </div>
    )
}
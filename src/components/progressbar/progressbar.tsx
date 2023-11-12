import "./style.css"
import {useEffect, useState} from "react";

type ProgressBarProps = {
    perc: number;
}

export default function ProgressBar(props: ProgressBarProps){
    const [perc, setPerc] = useState(0);
    useEffect(() => {
        let tempPerc = props.perc/100 * 360;
        setPerc(tempPerc)
    });
    
    return(
        <div className="progressbar">
            <div style={{transform: `rotate(${perc}deg)`}} className="point-container">
                <div className="point"></div>
            </div>
            <div className="bar-container">
                <div className="bar-bg"></div>
                <div style={{background: `conic-gradient(#AC58FF ${perc}deg, var(--main-bg-color) 0deg)`}} className="bar"></div>
            </div>
            <span className="perc">{props.perc}%</span>
        </div>
    )
}
import "./style.css";
import i18n from "../../i18n";
import {ChangeEvent, useState} from "react";

export default function LanguageSelect(){
    const [selectedLanguage, setSelectedLanguage] = useState(i18n.language)
    
    const chooseLanguage = (e: ChangeEvent) => {
        e.preventDefault();
        let selectElement = e.target as HTMLSelectElement; 
        i18n.changeLanguage(selectElement.value);
        setSelectedLanguage(selectElement.value);
        localStorage.setItem("lang", selectElement.value);
    }
    
    return(
        <select className="lang-select" defaultValue={selectedLanguage} onChange={chooseLanguage}>
            <option value="en">🇺🇸</option>
            <option value="pl">🇵🇱</option>
        </select>
    )
}
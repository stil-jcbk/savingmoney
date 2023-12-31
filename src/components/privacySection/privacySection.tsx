import "./style.css"

type PrivacySectionProps = {
    number: number;
    title: string;
    children: any;
}

export default function PrivacySection(props: PrivacySectionProps){
    return(
        <div className={"privacy-section"}>
            <h2 className={"section-title"}>{props.number}. {props.title}</h2>
            <p className={"section-content"}>{props.children}</p>
        </div>
    )
}
import PrivacySection from "../../components/privacySection/privacySection";

export default function PrivacyPolicy(){
    return(
        <div className={"body"}>
            <PrivacySection number={1} title={"General Terms"}>
                This policy applies to the website operating at the URL:
                <a href="https://savecash.jcbk.pl/">https://savecash.jcbk.pl/</a>
                , hereinafter referred to as the Website, the Service, or the Application.
                <br/>
                We want to make it clear that we are not a banking institution or any similar financial entity.
                We do not verify whether the user's balance on the website is adequate to the actual state of the user's financial assets.
                <br/>
                Our service does not facilitate the collection or storage of money from users.
                Users are encouraged to manage their funds independently and securely, keeping their
                money in a safe place, such as a personal safe or secure location of their choice.
                <br/>
                Additionally, it's important to note that we are not responsible for the user's spending decisions or how they choose to allocate their funds.
            </PrivacySection>
            <PrivacySection number={2} title={"Data We Collect"}>
                <ul>
                    <li><span className={"super"}>Email Address:</span> Used for authentication purposes.</li>
                    <li><span className={"super"}>Savings ('Deposits'), Spendings ('Withdrawals'), Goals (Name and Target Amount):</span> Utilized for internal money tracking, analytics, and goal progress within the application.</li>
                </ul>
            </PrivacySection>
            <PrivacySection number={3} title={"How we get the personal information and why"}>
                All personal information is provided directly by the user through registration,
                balance changes (deposits/withdrawals), and goal creation forms. We use this data for authentication,
                personalized money tracking, and internal analytics aimed at enhancing user experience and goal tracking within the application.
            </PrivacySection>
            <PrivacySection number={4} title={"User Rights"}>
                Users retain the right to access, modify, or delete their data within the SaveCash platform. Most data management actions, such as
                adjusting balances or goals, can be directly performed by the user within the application interface.
                <br/>
                However, for complete deletion of all associated data from our system, users can request this action by contacting our support team.
            </PrivacySection>
            <PrivacySection number={5} title={"External Services"}>
                On the website, we use external services that may collect data (Including personal after your acceptation) using cookies or other technologies.
                These services are beyond the control of the Administrator. You can read the privacy policy of these services on their websites. This is a list of services that we use:
                <br/>
                <ul>
                    <li><span className={"super"}>Firebase</span> - <a href={"https://policies.google.com/privacy"}>Privacy Policy</a></li>
                </ul>
            </PrivacySection>
        </div>
    )
}
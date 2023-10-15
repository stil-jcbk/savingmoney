import "./style.css";
import Section from "../../components/section/section";

export default function Home() {
  return (
    <div className="body">
      <div className="home">
        <Section title="ABOUT US">
          Welcome to <span className="more">SAVE.CASH</span>, your digital piggy
          bank for cash! We understand the importance of saving money and making
          it an easy and enjoyable experience. Our platform is designed to help
          you keep track of your cash savings in a simple and convenient way.
        </Section>
        <Section title="WHY CHOOSE US?" position="right" textAlignment="right">
          At <span className="more">SAVE.CASH</span>, we believe that saving
          money should be a hassle-free and rewarding endeavor. We offer a
          seamless solution for individuals looking to manage their cash
          savings, whether you're saving up for a special vacation, a rainy day
          fund, or simply want a digital record of your cash deposits and
          withdrawals.
        </Section>
      </div>
    </div>
  );
}

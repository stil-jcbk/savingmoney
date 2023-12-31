import "./style.css";
import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="footer">
      <a href="https://jcbk.pl/" target="_blank" rel="noreferrer">
        jcbk©2023
      </a>
      <Link to="/privacy-policy">Privacy Policy</Link>
    </footer>
  );
}

import "./style.css";
import Section from "../../components/section/section";
import { onSnapshot, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../components/firebase";
import { useTranslation } from "react-i18next";
//import "../../i18n"

export default function Home() {
  const [data, setData] = useState<any[]>([]);

  const {t} = useTranslation()

  useEffect(
    () =>
      onSnapshot(collection(db, "users"), (snapshot) => {
        setData(snapshot.docs.map((doc) => doc.data()));
      }),
    []
  );

  return (
    <div className="body">
      <div className="home">
        <Section title={t("AboutSection.title")}>
          {t("AboutSection.content.prelogo")}<span className="more">SAVE.CASH</span>{t("AboutSection.content.afterlogo")}
        </Section>
        <Section title={t("WhyUsSection.title")} position="right" textAlignment="right">
          {t("WhyUsSection.content.prelogo")}<span className="more">SAVE.CASH</span>{t("WhyUsSection.content.afterlogo")}
        </Section>
      </div>
    </div>
  );
}

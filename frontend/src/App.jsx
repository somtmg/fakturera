import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import Terms from "./components/Terms";

function App() {
  const [language, setLanguage] = useState("en");
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:3000/translations/${language}`)
      .then((res) => setTranslations(res.data));
  }, [language]);

  return (
    <div>
      <div className="background-image">
        <img
          src="https://storage.123fakturera.se/public/wallpapers/sverige43.jpg"
          alt=""
        />
      </div>
      <Header
        translations={translations}
        language={language}
        onLanguageChange={setLanguage}
      />

      <Terms translations={translations} />
    </div>
  );
}

export default App;

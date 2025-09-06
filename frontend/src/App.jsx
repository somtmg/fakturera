import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import Terms from "./components/Terms";

function App() {
  //Get language option from local storage if its there
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "en";
  });
  const [translations, setTranslations] = useState({});

  useEffect(() => {
     // Save the current language to localStorage
    localStorage.setItem("language", language);

    // Fetch translations
    axios
      .get(`http://localhost:3000/translations/${language}`)
      .then((res) => setTranslations(res.data));
  }, [language]);

  return (
    <div className="container">
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

import { useState } from "react";
export default function Header({ translations, language, onLanguageChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    {
      code: "sv",
      name: "Svenska",
      flag: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Flag_of_Sweden.svg",
    },
    {
      code: "en",
      name: "English",
      flag: "https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg",
    },
  ];
  return (
    <nav className="nav">
      <ul>
        <li>
          <img
            src="https://storage.123fakturera.se/public/icons/diamond.png"
            alt=""
          />
        </li>
        <li>{translations.home || "..."}</li>
        <li>{translations.order || "..."}</li>
        <li>{translations.our_customers || "..."}</li>
        <li>{translations.about_us || "..."}</li>
        <li>{translations.contact_us || "..."}</li>
        <li>
          <div className="language-dropdown">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="dropdown-button"
            >
              {languages.find((lang) => lang.code === language).name}
              <div className="img-div">
                <img
                  src={languages.find((lang) => lang.code === language).flag}
                  alt={language}
                  className="flag-icon"
                />
              </div>
            </button>
            {isOpen && (
              <ul className="dropdown-menu">
                {languages.map((lang) => (
                  <li
                    key={lang.code}
                    onClick={() => {
                      onLanguageChange(lang.code);
                      setIsOpen(false);
                    }}
                    className="dropdown-item"
                  >
                    {lang.name}
                    <img
                      src={lang.flag}
                      alt={lang.name}
                      className="flag-icon"
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </li>
      </ul>
    </nav>
  );
}

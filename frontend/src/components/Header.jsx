import { useState } from "react";

export default function Header({ translations, language, onLanguageChange }) {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

  const currentLang = languages.find((lang) => lang.code === language);

  return (
    <header className="nav-header">
      <div className="logo desktop-only">
        <img
          src="https://storage.123fakturera.se/public/icons/diamond.png"
          alt="Logo"
        />
      </div>
      <div
        className="hamburger mobile-only"
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      {/* Desktop Nav */}
      <nav className="nav desktop-only">
        <ul>
          <li>{translations.home || "..."}</li>
          <li>{translations.order || "..."}</li>
          <li>{translations.our_customers || "..."}</li>
          <li>{translations.about_us || "..."}</li>
          <li>{translations.contact_us || "..."}</li>
          <li>
            <div className="language-dropdown"></div>
          </li>
        </ul>
      </nav>
      {menuOpen && (
        <nav className="nav mobile-only mobile-menu">
          <ul>
            <li>{translations.home || "..."}</li>
            <li>{translations.order || "..."}</li>
            <li>{translations.our_customers || "..."}</li>
            <li>{translations.about_us || "..."}</li>
            <li>{translations.contact_us || "..."}</li>
          </ul>
        </nav>
      )}
      <div className="language-dropdown mobile-only mobile-lang">
        <button
          onClick={() => setIsLangOpen(!isLangOpen)}
          className="dropdown-button"
        >
          <span>{currentLang.name}</span>
          <img src={currentLang.flag} alt={language} className="flag-icon" />
        </button>

        {isLangOpen && (
          <ul className="dropdown-menu">
            {languages.map((lang) => (
              <li
                key={lang.code}
                onClick={() => {
                  onLanguageChange(lang.code);
                  setIsLangOpen(false);
                }}
                className="dropdown-item"
              >
                {lang.name}
                <img src={lang.flag} alt={lang.name} className="flag-icon" />
              </li>
            ))}
          </ul>
        )}
      </div>
    </header>
  );
}

import { useState } from "react";

const LanguageDropdown = ({ language, onLanguageChange }) => {
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
    <div className="language-dropdown">
      <button onClick={() => setIsOpen(!isOpen)} className="dropdown-button">
        <img
          src={languages.find((lang) => lang.code === language).flag}
          alt={language}
          className="flag-icon"
        />
        {languages.find((lang) => lang.code === language).name}
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
              <img src={lang.flag} alt={lang.name} className="flag-icon" />
              {lang.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageDropdown;

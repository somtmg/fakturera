export default function Terms({ translations }) {
  const paragraphs = Object.keys(translations)
    .filter((key) => key.startsWith("terms_paragraph_"))
    .sort((a, b) => {
      const aNum = parseInt(a.split("_").pop(), 10);
      const bNum = parseInt(b.split("_").pop(), 10);
      return aNum - bNum;
    });

  return (
    <main className="terms-container">
      <div className="terms-heading">
        <h1>{translations.terms}</h1>
      </div>
      <div>
        <button className="close-button">{translations.close_button}</button>
      </div>
      <div className="terms-content">
        {paragraphs.map((key) => (
          <p
            key={key}
            dangerouslySetInnerHTML={{ __html: translations[key] }}
          />
        ))}
      </div>
      <div>
        <button className="close-button">{translations.close_button}</button>
      </div>
    </main>
  );
}

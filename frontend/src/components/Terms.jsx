export default function Terms({ translations }) {
  return (
    <main className="terms-container">
      <div className="terms-heading">
        <h1>{translations.terms}</h1>
      </div>
      <div>
        <button className="close-button">{translations.close_button}</button>
      </div>
      <div className="terms-content">
        <p>{translations.terms_content}</p>
      </div>
      <div>
        <button className="close-button">{translations.close_button}</button>
      </div>
    </main>
  );
}

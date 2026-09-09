const marquees = [0, 1];
const words = [0, 1, 2, 3];

export function FooterMarquee() {
  return (
    <section className="footer-marquee" aria-label="ExpoJuy 2026">
      <p className="sr-only">ExpoJuy 2026</p>
      <div className="footer-marquee__viewport" aria-hidden="true">
        <div className="footer-marquee__track">
          {marquees.map((copy) => (
            <div className="footer-marquee__group" key={copy}>
              {words.map((word) => (
                <span className="footer-marquee__word" key={word}>
                  EXPOJUY <strong>26</strong>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

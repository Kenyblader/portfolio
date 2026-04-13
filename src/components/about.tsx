import { datas } from '../assets/data/datas';
import '../style/about.css';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();
  const { about } = datas;

  return (
    <section className="about" id="about">
      <div className="about_glow" />

      <div className="section_header">
        <span className="section_number">04</span>
        <h2 className="section_title">{t('about.title') || 'À propos'}</h2>
        <div className="section_line" />
      </div>

      <div className="about_quote">
        <span className="about_quote_mark">"</span>
        <p className="about_quote_text">
            {about.quote.before}
            <em>{about.quote.highlight}</em>
            {about.quote.after}
        </p>
        <p className="about_quote_sub">{about.sub}</p>
      </div>

      <div className="about_sep" />

      <div className="about_cards">
        {about.cards.map((card, index) => (
          <div key={index} className="about_card">
            <span className="about_card_icon">{card.icon}</span>
            <div className="about_card_title">{card.title}</div>
            <p className="about_card_text">{card.text}</p>
            {card.tags.length > 0 && (
              <div className="about_tags">
                {card.tags.map((tag, i) => (
                  <span key={i} className="about_tag">{tag}</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
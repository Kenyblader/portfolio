import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Github, Linkedin, Mail, Send, Loader } from 'lucide-react';
import { datas } from '../assets/data/datas';
import '../style/contact.css';
import env from '../assets/config/env';

type FormState = 'idle' | 'loading' | 'success' | 'error';

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, setState] = useState<FormState>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setState('loading');
    try {
      await emailjs.sendForm(
        env.SERVICE_ID,
        env.TEMPLATE_ID,
        formRef.current,
        env.PUBLIC_KEY
      );
      setState('success');
      formRef.current.reset();
    } catch(error) {
        console.error('EmailJS error:', error);
      setState('error');
    }
  };

  return (
    <section className="contact" id="contact">
      <div className="contact_glow" />

      <div className="section_header">
        <span className="section_number">05</span>
        <h2 className="section_title">Contact</h2>
        <div className="section_line" />
      </div>

      <div className="contact_inner">

        {/* Gauche */}
        <div className="contact_left">
          <h3 className="contact_headline">
            Travaillons<br /><em>ensemble</em>
          </h3>
          <p className="contact_sub">
            Un projet en tête ? Une opportunité à explorer ?
            Je lis tous mes messages et réponds sous 24h.
          </p>
          <div className="contact_links">
            <a className="contact_link" href={`mailto:${datas.email}`}>
              <span className="contact_link_icon"><Mail size={15} /></span>
              {datas.email}
            </a>
            <a className="contact_link" href={datas.github} target="_blank" rel="noopener noreferrer">
              <span className="contact_link_icon"><Github size={15} /></span>
              {datas.github.replace('https://', '')}
            </a>
            <a className="contact_link" href={datas.linkedin} target="_blank" rel="noopener noreferrer">
              <span className="contact_link_icon"><Linkedin size={15} /></span>
              {datas.linkedin.replace('https://', '')}
            </a>
          </div>
        </div>

        {/* Formulaire */}
        <form className="contact_form" ref={formRef} onSubmit={handleSubmit}>
          <div className="form_row">
            <div className="form_group">
              <label className="form_label">Nom</label>
              <input
                className="form_input"
                type="text"
                name="from_name"
                placeholder="Jean Dupont"
                required
              />
            </div>
            <div className="form_group">
              <label className="form_label">Email</label>
              <input
                className="form_input"
                type="email"
                name="from_email"
                placeholder="jean@mail.com"
                required
              />
            </div>
          </div>

          <div className="form_group">
            <label className="form_label">Sujet</label>
            <input
              className="form_input"
              type="text"
              name="subject"
              placeholder="Proposition de mission"
              required
            />
          </div>

          <div className="form_group">
            <label className="form_label">Message</label>
            <textarea
              className="form_textarea"
              name="message"
              placeholder="Décris ton projet ou ta demande..."
              required
            />
          </div>

          {/* Feedback états */}
          {state === 'success' && (
            <div className="form_feedback form_feedback--success">
              Message envoyé ! Je te réponds sous 24h.
            </div>
          )}
          {state === 'error' && (
            <div className="form_feedback form_feedback--error">
              Une erreur s'est produite. Réessaie ou contacte-moi directement.
            </div>
          )}

          <button
            className="form_submit"
            type="submit"
            disabled={state === 'loading'}
          >
            {state === 'loading' ? (
              <><Loader size={15} className="form_submit_spinner" /> Envoi en cours...</>
            ) : (
              <><Send size={15} /> Envoyer le message</>
            )}
          </button>
        </form>

      </div>
    </section>
  );
};

export default Contact; 
import { Github, Linkedin, FileText } from 'lucide-react';
import { datas } from '../assets/data/datas';
import '../style/footer.css';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <span className="footer_copy">
        © {year} <span className="footer_dot">✦</span> {datas.name}
      </span>
      <div className="footer_links">
        <a className="footer_link" href={datas.github} target="_blank" rel="noopener noreferrer">
          <Github size={13} /> GitHub
        </a>
        <a className="footer_link" href={datas.linkedin} target="_blank" rel="noopener noreferrer">
          <Linkedin size={13} /> LinkedIn
        </a>
        <a className="footer_link" href={datas.cv} download>
          <FileText size={13} /> CV
        </a>
      </div>
    </footer>
  );
};

export default Footer;
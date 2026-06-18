import { GithubIcon, LinkedinIcon, Mail, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { LanguageSwitcher } from "../lngSwitcher";
import ThemeToggle from "../toggleThemeButton";
import { useState } from "react";
import { datas } from '../../assets/data/datas';
import '../../style/hommeHeader.css';
import useAuthHook from "../../utils/hooks/authHook";

const HommeHeaders = () => {
 const { isLoggedIn, logout } = useAuthHook();

  return (
    <header className="hero">

      {/* Navbar flottante */}
      <nav className="hero_nav">
        <div className="hero_nav_left">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
        <div className="hero_nav_right">
          <Link to={isLoggedIn() ? "/dashboard" : "/login"} onClick={logout} className="hero_nav_cta">
            {isLoggedIn() ? 'Dashboard' : 'Login'}
          </Link>
          
        </div>
      </nav>         


      {/* Fond décoratif */}
      <div className="hero_glow hero_glow--purple" />
      <div className="hero_glow hero_glow--pink" />

      {/* Contenu principal */}
      <div className="hero_body">

        <div className="hero_tag">
          <span className={`hero_tag_dot ${datas.available ? 'hero_tag_dot--on' : ''}`} />
          {datas.available ? 'Disponible pour de nouveaux projets' : 'Non disponible'}
        </div>

        <h1 className="hero_title">
          <span className="hero_title_line hero_title_line--1">{datas.name.split(' ')[0]}</span>
          <span className="hero_title_line hero_title_line--2">{datas.name.split(' ').slice(1, 3).join(' ')}</span>
          <span className="hero_title_line hero_title_line--3 hero_title_line--accent">{datas.name.split(' ').slice(3).join(' ')}</span>
        </h1>
        

        <p className="hero_sub">
          <span className="hero_sub_role">{datas.title}</span>
          {' — '}{datas.bio}
        </p>

        <div className="hero_actions">
          <a href="#projects" className="hero_btn hero_btn--primary">
            Voir mes projets
          </a>
          <a href={`mailto:${datas.email}`} className="hero_btn hero_btn--secondary">
            Me contacter
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </a>
          <a href={datas.cv} download className="hero_btn hero_btn--ghost">
            <Download size={14} />
            Télécharger mon CV
          </a>
        </div>

        <div className="hero_socials">
          <a href={datas.github} target="_blank" rel="noopener noreferrer" className="hero_social">
            <GithubIcon size={16} />
            GitHub
          </a>
          <span className="hero_social_sep" />
          <a href={datas.linkedin} target="_blank" rel="noopener noreferrer" className="hero_social">
            <LinkedinIcon size={16} />
            LinkedIn
          </a>
          <span className="hero_social_sep" />
          <a href={`mailto:${datas.email}`} className="hero_social">
            <Mail size={16} />
            {datas.email}
          </a>
        </div>

      </div>

      <div className="hero_scroll">
        <div className="hero_scroll_line" />
        <span>SCROLL</span>
      </div>

    </header>
  );
};

export default HommeHeaders;
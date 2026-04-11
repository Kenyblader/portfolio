import '../style/home.css'
import ProjectCard from '../components/projectCard';
import { useTranslation } from 'react-i18next';
import { authHook } from '../utils/hooks/authHook';
import useProject from '../utils/hooks/projectHook';
import HommeHeaders from '../components/headers/hommeHeader';
import { datas } from '../assets/data/datas';


const Home = () => {
  const {t}= useTranslation();
  const {projects} = useProject();

 
  

  return (
    <>
      <HommeHeaders></HommeHeaders>
      <div>
        <div className="home_container">
        <section className='projects' id="projects">
          <div className='section_header'>
            <span className='section_number'>02</span>
            <h2 className='section_title'>{t('home.myProjects')}</h2>
            <div className='section_line'></div>
          </div>
          <div className="projects_grid">
            {projects.length === 0 ? (
              <p>{t('home.noProject')}</p>
            ) : (
              projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))
            )}
          </div>
        </section>

        <section className='presentation'>
          <div className='section_header'>
            <span className='section_number'>03</span>
            <h2 className='section_title'>{ 'Compétences'}</h2>
            <div className='section_line'></div>
          </div>
          <div className='presentation_content'>
            {datas.presentation.map((item, index) => (
              <div key={index} className='presentation_item'>
                <h3>{item.title}</h3>
                <div className='techs_grid'>
                  {item.techs.map((tech, index) => (
                    <div key={index} className='tech_item' data-name={`${tech.name} | ${tech.type}`}>
                      <img src={tech.icon} alt={tech.name} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      </div>
    </>
  );
};

export default Home;
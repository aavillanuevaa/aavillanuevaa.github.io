import { Link } from 'react-router-dom';
import SkyHero from '../components/newpage/SkyHero';
import Hotbar from '../components/newpage/Hotbar';
import AboutSection from '../components/newpage/AboutSection';
import ExperienceSection from '../components/newpage/ExperienceSection';
import ProjectsSection from '../components/newpage/ProjectsSection';
import ContactSection from '../components/newpage/ContactSection';
import EndCrystals from '../components/newpage/EndCrystals';
import groundBg from '../assets/site-bg-biomes-wide.png';
import './NewPage.css';

const NewPage = () => {
  return (
    <div className="mc-page">
      <SkyHero />

      <div className="mc-ground-wrap">
        <img className="mc-ground-bg" src={groundBg} alt="" />
        <EndCrystals />
        <div className="mc-ground">
          <AboutSection />
          <ExperienceSection />
          <ProjectsSection />
          <ContactSection />

          <footer className="mc-footer">
            <Link to="/old">View old portfolio</Link>
          </footer>
        </div>
      </div>

      <Hotbar />
    </div>
  );
};

export default NewPage;

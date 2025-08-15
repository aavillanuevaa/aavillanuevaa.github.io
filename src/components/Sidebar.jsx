// Sidebar.jsx
import React, { useEffect, useState, useRef } from 'react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';  
import { GoDownload } from 'react-icons/go'; 
import Links from './Links';

const Sidebar = () => {
  const [activeSection, setActiveSection] = useState('about');
  const ticking = useRef(false);

  const sectionMap = {
    ABOUT: 'about',
    EXPERIENCE: 'experience',
    PROJECTS: 'projects',
  };
  const sectionIds = Object.values(sectionMap);

  const handleClick = (id) => {
    if (id === 'about') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const computeActive = () => {
    const scrollY = window.scrollY || window.pageYOffset;
    const vpH = window.innerHeight;
    const center = scrollY + vpH / 2;
    const docH = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    );

    // Hard edges
    if (scrollY <= 2) {
      setActiveSection('about');
      return;
    }
    if (scrollY + vpH >= docH - 2) {
      setActiveSection('projects');
      return;
    }

    let bestId = 'about';
    let bestDist = Infinity;

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      const elTop = rect.top + scrollY;
      const elBottom = elTop + rect.height;
      const mid = (elTop + elBottom) / 2;
      const dist = Math.abs(mid - center);
      if (dist < bestDist) {
        bestDist = dist;
        bestId = id;
      }
    }
    setActiveSection(bestId);
  };

  const onScrollOrResize = () => {
    if (ticking.current) return;
    ticking.current = true;
    requestAnimationFrame(() => {
      computeActive();
      ticking.current = false;
    });
  };

  useEffect(() => {
    computeActive(); // initial
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);
    return () => {
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, []);

  return (
    <div className='w-[50%] bg-mantle p-4 pl-0 fixed top-0 left-0 h-full flex flex-col'>
      <div className='text-text text-left pt-23 pl-[16%] flex-grow'>
        <h1 className='text-5xl font-bold text-text pb-1 '>Angelo Villanueva</h1>
        <p className='mt-2 text-text text-[20px] pb-2'>Computer Science 3rd-Year, Mathematics Minor</p>
        <p className='mt-1 text-subtext text-[16px]'>Pursuing Accelerated B.S. + M.S. in Computer Science</p>
        <p className='text-subtext text-[16px]'>University of Central Florida — Orlando, FL</p>

        <div className='pt-2'>
          <a 
            href='/path/to/your/resume.pdf'
            target='_blank'
            rel='noopener noreferrer'
            className='mb-6 text-subtext text-center transition duration-300 flex items-center gap-2 hover:text-lavender'
          >
            <GoDownload className='text-[16px]' />
            <span className='text-[15px]'>Resume</span>
          </a>
        </div>

        <ul className='pt-[4%] text-xs font-bold flex flex-col'>
          <li className='py-2'>
            <Links
              linkname='ABOUT'
              active={activeSection === sectionMap.ABOUT}
              onClick={() => handleClick(sectionMap.ABOUT)}
            />
          </li>
          <li className='py-2'>
            <Links
              linkname='EXPERIENCE'
              active={activeSection === sectionMap.EXPERIENCE}
              onClick={() => handleClick(sectionMap.EXPERIENCE)}
            />
          </li>
          <li className='py-2'>
            <Links
              linkname='PROJECTS'
              active={activeSection === sectionMap.PROJECTS}
              onClick={() => handleClick(sectionMap.PROJECTS)}
            />
          </li>
        </ul>
      </div>

      <div className='text-xs font-bold mt-auto pl-[16%] pb-[10%] text-text'>
        <ul className='flex gap-4 justify-start'>
          <li>
            <a href='https://github.com/aavillanuevaa' className='flex items-center text-3xl hover:text-overlay transition duration-250 hover:scale-115'>
              <FaGithub />
            </a>
          </li>
          <li>
            <a href='https://www.linkedin.com/in/angelo-villanueva-4aa848314/' className='flex items-center text-3xl hover:text-overlay transition duration-250 hover:scale-115'>
              <FaLinkedin />
            </a>
          </li>
          <li>
            <a href='https://www.instagram.com/angeloovillanueva/' className='flex items-center text-3xl hover:text-overlay transition duration-250 hover:scale-115'>
              <FaInstagram />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

import React from 'react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';  
import { GoDownload } from 'react-icons/go'; 
import Links from './Links';

const Sidebar = () => {
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
           
            <span className='hover:text-overlay transition duration-200'>ABOUT</span>
          </li>
          <li className='py-2'>
            <span className='hover:text-overlay transition duration-200'>- EXPERIENCE</span>
          </li>
          <li className='py-2'>
            <span className='hover:text-overlay transition duration-200'>- PROJECTS</span>
          </li>
        </ul>
      </div>

      {/* Bottom section with icons */}
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

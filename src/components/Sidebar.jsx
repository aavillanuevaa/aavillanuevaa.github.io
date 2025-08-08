import React from 'react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';  // Import icons

const Sidebar = () => {
  return (
    <div className="w-[50%] bg-mantle p-4 fixed top-0 left-0 h-full flex flex-col">
      <div className="text-text text-left pt-23 pl-44 flex-grow">
        <h1 className="text-5xl font-bold text-text pb-1 ">Angelo Villanueva</h1>
        <p className="mt-2 text-text text-[21px] pb-2">Computer Science 3rd-Year, Mathematics Minor</p>
        <p className="mt-1 text-subtext text-[17px]">Pursuing Accelerated B.S. + M.S. in Computer Science</p>
        <p className="text-subtext text-[17px]">University of Central Florida — Orlando, FL</p>

        <ul className="pt-20 text-xs font-bold flex flex-col">
          <li className="py-2">
            <span className="hover:text-overlay transition duration-200">ABOUT</span>
          </li>
          <li className="py-2">
            <span className="hover:text-overlay transition duration-200">EXPERIENCE</span>
          </li>
          <li className="py-2">
            <span className="hover:text-overlay transition duration-200">PROJECTS</span>
          </li>
        </ul>
      </div>

      {/* Bottom section with icons */}
      <div className="text-xs font-bold mt-auto pl-44 pb-20 text-text">
        <ul className="flex gap-4 justify-start">
          <li>
            <a href="https://github.com/aavillanuevaa" className="flex items-center text-3xl hover:text-overlay transition duration-250 hover:scale-115">
              <FaGithub />
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/angelo-villanueva-4aa848314/" className="flex items-center text-3xl hover:text-overlay transition duration-250 hover:scale-115">
              <FaLinkedin />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/angeloovillanueva/" className="flex items-center text-3xl hover:text-overlay transition duration-250 hover:scale-115">
              <FaInstagram />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

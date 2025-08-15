// App.jsx
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import JobCard from './components/JobCard';
import ProjectCard from './components/ProjectCard';

import project1Img from './assets/project1.png';
import project2Img from './assets/project2.png';

const App = () => {
  const [copiedText, setCopiedText] = useState("");

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(""), 2000); 
  };

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div id="about" className="h-0 scroll-mt-24 lg:scroll-mt-40" />
        <MainContent />
      </div>

      <div className='bg-mantle pb-8 scroll-mt-24 lg:scroll-mt-40' id='experience'>
        <JobCard jobtitle={"Undergraduate Research"} time={"JAN 2025 - PRESENT"} />
        <JobCard jobtitle={"Sunrise Coffee Co."} time={"2022 - 2024"} />
      </div>

      <div className='bg-mantle py-8 space-y-3 scroll-mt-24 lg:scroll-mt-40' id='projects'>
        <ProjectCard projecttitle={"Minecraft Discord Bot"} projectdesc={"A Discord bot for Minecraft server management."} imageSrc={project1Img} titleLink={"https://github.com/aavillanuevaa/minecraft-bot"} />
        <ProjectCard projecttitle='Custom Chrome Extension' projectdesc='A Chrome extension for productivity.' imageSrc={project2Img} titleLink={"https://github.com/aavillanuevaa/new-tab-extension"} />
      </div>

      <div className='text-xs font-bold mt-auto pb-[6%] pt-[2%] text-subtext bg-mantle ml-[50%]'>
        <h1>
          Built using React.js and styled with Tailwind CSS. Check out the source code on{" "}
          <a
            className='text-text underline'
            href='https://github.com/aavillanuevaa/portfolio-website/tree/main'
            target='_blank'
            rel='noopener noreferrer'
          >
            GitHub
          </a>.
        </h1>

        <h2>
          Contact:{" "}
          <button
            onClick={() => handleCopy("angelovill0908@gmail.com")}
            className="text-text underline cursor-pointer"
          >
            angelovill0908@gmail.com
          </button>{" "}
          •{" "}
          <button
            onClick={() => handleCopy("8505434769")}
            className="text-text underline cursor-pointer"
          >
            850-543-4769
          </button>
          {copiedText && (
            <span className="ml-2 text-lavender text-xs">
              (Copied!)
            </span>
          )}
        </h2>
      </div>
    </>
  );
};

export default App;

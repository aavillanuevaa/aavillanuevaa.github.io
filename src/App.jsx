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
        <JobCard 
          jobtitle={"Undergraduate Research"} 
          time={"JAN 2025 - PRESENT"} 
          jobdesc={
            <>
              Conducted research under Dr. Yogesh Singh Rawat in computer vision. Evaluated AI models by using image captioning in order to optimize their ability to accurately interpret and describe visual data. Experiments were performed using images from the <a className="text-text" href="https://zeyofu.github.io/blink/" target="_blank" rel="noopener noreferrer">BLINK</a> dataset.
            </>
          } 
        />

      <JobCard 
        jobtitle={"Sunrise Coffee Co."} 
        time={"2022 - 2024"} 
        jobdesc={
          <>
            Built strong communication and time management skills by handling multiple tasks in a fast-paced environment while keeping interactions with customers clear, friendly, and efficient.
          </>
        } 
      />
      </div>

      <div className='bg-mantle py-8 space-y-3 scroll-mt-24 lg:scroll-mt-40' id='projects'>
        <ProjectCard projecttitle={"Minecraft Discord Bot"} projectdesc={"Manages and moderates a private Minecraft server giving simple access to commands and information."} imageSrc={project1Img} titleLink={"https://github.com/aavillanuevaa/minecraft-bot"} />
        <ProjectCard projecttitle={"New Tab Chrome Extension"} projectdesc={"Overrides the default new tab page with a customizable dashboard designed for productivity."} imageSrc={project2Img} titleLink={"https://github.com/aavillanuevaa/new-tab-extension"} />
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

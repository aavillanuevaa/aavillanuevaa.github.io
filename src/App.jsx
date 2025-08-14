import React from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import JobCard from './components/JobCard';
import ProjectCard from './components/ProjectCard';

import project1Img from './assets/project1.png';
import project2Img from './assets/project2.png';

const App = () => {
  return (
    <>
    <div className="flex">
      <Sidebar />
      <MainContent />
    </div>

    <div className='bg-mantle pb-8'>
      <JobCard jobtitle={"Undergraduate Research"} time={"JAN 2025 - PRESENT"}/>
      <JobCard jobtitle={"Sunrise Coffee Co."} time={"2022 - 2024"} />
      
    </div>



    <div className='bg-mantle py-8 space-y-3'>
      <ProjectCard projecttitle={"Minecraft Discord Bot"} projectdesc={"A Discord bot for Minecraft server management."} imageSrc={project1Img} titleLink={"https://github.com/aavillanuevaa/minecraft-bot"} />
      <ProjectCard projecttitle='Custom Chrome Extension' projectdesc='A Chrome extension for productivity.' imageSrc={project2Img} titleLink={"https://github.com/aavillanuevaa/new-tab-extension"} />
      
    </div>

    <div>

    </div>
    </>
    
    
  );
};

export default App;

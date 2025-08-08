import React from 'react';

const Sidebar = () => {
  return (

    <div className="w-[50%] bg-mantle p-4 fixed top-0 left-0 h-full">
      <div className='text-text text-left pt-23 pl-44'>
        <h1 className="text-5xl font-bold text-text pb-1 ">Angelo Villanueva</h1>
        <p className="mt-2 text-text text-[21px] pb-2">Computer Science 3rd-Year, Mathematics Minor</p>
        <p className="mt-1 text-subtext text-[17px]">Pursuing Accelerated B.S. + M.S. in Computer Science</p>
        <p className="text-subtext text-[17px]">University of Central Florida — Orlando, FL</p>

        <div className='pt-20 text-xs font-bold '>
          <h2 className='p-2'>- ABOUT</h2>
          <h2 className='p-2'>- EXPERIENCE</h2>
          <h2 className='p-2'>- PROJECTS</h2>
        </div>

        <div className='pt-20 text-xs font-bold'>
          <ul>
            <li>github</li>
            <li>linkedin</li>
            <li>instagram</li>
          </ul>
        </div>
        
      </div>

      
     
      
      
      

    </div>
    
  );
};

export default Sidebar;

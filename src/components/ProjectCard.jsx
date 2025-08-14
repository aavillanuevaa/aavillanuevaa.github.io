import { IoIosArrowForward } from "react-icons/io";
const ProjectCard = ({
  projecttitle = 'Project Title',
  projectdesc = 'Project description goes here.',
  imageSrc,
  titleLink = '#',
}) => {
  return (
    <div className="bg-mantle ml-[50%] p-4 hover:bg-base rounded-md max-w-[40vw] min-h-[180px] group">
      <div className="grid grid-cols-10 gap-4 items-start">
        <div className="col-start-1 col-span-4 flex items-start p-4">
          <img
            src={imageSrc}
            alt="Project"
            className="w-32 h-32 object-cover"
          />
        </div>
        <div className="col-span-5 col-start-5 text">
          <h1 className="text-xl font-bold py-0">
            <a
              href={titleLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text group-hover:text-lavender inline-flex items-center"
            >
              {projecttitle}
              <IoIosArrowForward className="ml-1 mt-1 group-hover:translate-x-2 duration-125" />
            </a>
          </h1>
          <h2 className="text-sm text-subtext max-w-full">{projectdesc}</h2>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;


const JobCard = ({ time = 'JOB TIMEFRAME', jobtitle = 'Job Title', jobdesc = 'Job Description. Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa soluta dolore quidem aut porro amet aliquam optio quas alias! Aliquid voluptas magni reprehenderit mollitia, iusto esse ullam autem doloremque quibusdam!' }) => {
  return (
    <div className="bg-mantle ml-[50%] p-4 pb-10 hover:bg-base rounded-md max-w-[40vw] min-h-[180px] group">
        <div className="grid grid-cols-8 gap-4">
            <div className="col-start-1 col-span-2 text-xs font-bold text-subtext p-4 pl-1">{time}</div>
            <div className="col-span-5 col-start-3">
                <h1 className="text-xl text-text font-bold py-2 group-hover:text-lavender">{jobtitle}</h1> 
                <h2 className="text-sm text-subtext max-w-full">{jobdesc}</h2>
            </div>
        </div>
    </div>
  );
};

export default JobCard;

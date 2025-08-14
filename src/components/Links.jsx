const Links = (linkname) => {
  return (
    <div className="flex items-center group cursor-pointer">
      {/* Line */}
      <div className="h-0.5 bg-subtext w-8 origin-left scale-x-80 group-hover:scale-x-350 transition-transform duration-300 -mt-0.5"></div>

      <span className="text-subtext group-hover:ml-[6rem] transition-all duration-300 pb-1 group-hover:text-text">
       {linkname}
      </span>
    </div>
  );
};

export default Links;

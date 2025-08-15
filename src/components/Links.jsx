// Links.jsx
const Links = ({ linkname, active = false, onClick }) => {
  return (
    <div
      onClick={onClick} 
      className="flex items-center group cursor-pointer select-none"
    >
      <div
        className={[
          "h-0.5 bg-subtext w-8 origin-left transition-transform duration-300 -mt-0.5",
          "scale-x-80",
          active ? "scale-x-300" : "",
          "group-hover:scale-x-300",
        ].join(" ")}
      ></div>

      <span
        className={[
          "text-subtext transition-all duration-300 pb-1",
          active ? "ml-[5rem] text-text scale-105" : "",
          "group-hover:ml-[5rem] group-hover:text-text group-hover:scale-105",
        ].join(" ")}
      >
        {linkname}
      </span>
    </div>
  );
};

export default Links;

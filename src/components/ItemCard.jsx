// Generic pixel-styled entry card ("mc-item-frame"). Used for individual
// entries within a section — experience roles, project entries, etc.
// Pass `bullets` for a multi-point entry; `children` still works as a
// single trailing paragraph (skills line, link, etc.) either way.
const ItemCard = ({ title, meta, bullets, children }) => {
  return (
    <div className="mc-item-frame">
      <h3>{title}</h3>
      {meta && <div className="mc-meta">{meta}</div>}
      {bullets && (
        <ul className="mc-bullets">
          {bullets.map((bullet, i) => (
            <li key={i}>{bullet}</li>
          ))}
        </ul>
      )}
      {children && <p>{children}</p>}
    </div>
  );
};

export default ItemCard;

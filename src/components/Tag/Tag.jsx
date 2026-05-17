import "./tag.css";

const Tag = ({ type, children }) => {
  return <span className={`tag ${type}`}>{children}</span>;
};

export default Tag;

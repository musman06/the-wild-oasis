import "./row.css";

const Row = ({ type, align, children }) => {
  return <div className={`row ${type} ${align}`}>{children}</div>;
};

export default Row;

import "./dataitem.css";

function DataItem({ icon, label, children }) {
  return (
    <div className="data-item-container">
      <span className="data-item-label">
        {icon}
        <span>{label}</span>
      </span>
      {children}
    </div>
  );
}

export default DataItem;

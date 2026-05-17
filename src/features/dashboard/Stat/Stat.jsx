import "./stat.css";

function Stat({ icon, title, value, color }) {
  return (
    <div className="stat-container">
      <div className={`stat-icon ${color}`}>{icon}</div>
      <div className="stat-column">
        <h5 className="stat-title">{title}</h5>
        <p className="stat-value">{value}</p>
      </div>
    </div>
  );
}

export default Stat;

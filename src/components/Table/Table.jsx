import { createContext } from "react";
import "./table.css";

const TableContext = createContext();

const Table = ({ children }) => {
  return (
    <TableContext.Provider value={{}}>
      <div className="table" role="table">
        {children}
      </div>
    </TableContext.Provider>
  );
};

const Header = ({ children }) => {
  return (
    <header className="table-header" role="table-header">
      {children}
    </header>
  );
};

const Body = ({ data, render }) => {
  if (!data?.length) {
    return <p className="table-body-empty">No data to show at the moment</p>;
  }
  return <div className="table-body">{data.map(render)}</div>;
};

const Row = ({ children }) => {
  return (
    <div className="table-row" role="table-row">
      {children}
    </div>
  );
};

const Footer = ({ children }) => {
  return <footer className="table-footer">{children}</footer>;
};

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;

export default Table;

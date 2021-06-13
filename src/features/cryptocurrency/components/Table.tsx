import Body from "./Body";
import Header from "./Header";
import "./Table.scss";

const Table = ({ children }: { children?: React.ReactNode }) => (
  <table className="table">{children}</table>
);

Table.Body = Body;
Table.Header = Header;

export default Table;

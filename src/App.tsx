import Cryptocurrency from "./features/cryptocurrency/Cryptocurrency";
import InfoPanel from "./features/info-panel/InfoPanel";
import "./App.scss";

function App() {
  return (
    <div className="container">
      <div className="header">
        <h1>Cryptocurrency Market</h1>
      </div>
      <div className="main">
        <Cryptocurrency />
      </div>
      <div className="sidebar">
        <InfoPanel />
      </div>
      <div className="footer"></div>
    </div>
  );
}

export default App;

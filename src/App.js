import Graph from "./Graph";

import { GraphContextProvider } from "./GraphContext";

import "./styles.scss";

export default function App() {
  return (
    <div className="App">
      <GraphContextProvider>
        <Graph />
      </GraphContextProvider>
    </div>
  );
}

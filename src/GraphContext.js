import { createContext, useContext, useEffect, useRef } from "react";
import { useGetGraph } from "./Query";

const GraphContext = createContext("light");

export const GraphContextProvider = ({ children }) => {
  const { data } = useGetGraph();

  const refGraph = useRef();

  const handleOnClickAddNodes = () => {
    const newNodes = [
      {
        data: {
          id: "1200000000000000000000",
          user: "fdsfsdf",
          description: "sfsfsdfsd",
          is_added: true
        }
      },
      {
        data: {
          id: "1300000000000000000000",
          user: "fdsfsdf",
          description: "sfsfsdfsd",
          is_added: true
        }
      },
      {
        data: {
          id: "12sdfsd",
          source: "1200000000000000000000",
          target: "1300000000000000000000",
          connection: "jkgjghjg",
          description: "hjghjfg",
          is_added: true
        }
      }
    ];

    const newLinks = [
      {
        data: {
          id: "35345345353",
          source: "1200000000000000000000",
          target: "1300000000000000000000",
          connection: "fdsfsdf",
          description: "sfsjhgj",
          is_added: true
        }
      }
    ];

    console.log("Click add nodes", { newNodes, newLinks });

    const { nodes, links } = refGraph.current.graphData();

    refGraph.current.graphData({
      nodes: [...nodes, ...newNodes],
      links: [...links, ...newLinks]
    });

    // const nodeToZoom = newNodes[0];

    // const distance = 40;
    // const distRatio =
    //   1 + distance / Math.hypot(nodeToZoom.x, nodeToZoom.y, nodeToZoom.z);

    // refGraph.current.cameraPosition(
    //   {
    //     x: nodeToZoom.x * distRatio,
    //     y: nodeToZoom.y * distRatio,
    //     z: nodeToZoom.z * distRatio
    //   }, // new position
    //   nodeToZoom, // lookAt ({ x, y, z })
    //   2000 // ms transition duration
    // );
  };

  const handleOnClickRunLayout = () => {
    console.log("handleOnClickRunLayout");
  };

  const handleOnLayoutStop = (event) => {
    console.log("Handle on layout stop", event);
  };

  return (
    <GraphContext.Provider value={{ data, refGraph, handleOnLayoutStop }}>
      {children}
      <div className="ui">
        <button onClick={() => handleOnClickAddNodes()}>Add nodes</button>
        <button onClick={() => handleOnClickRunLayout()}>Run layout</button>
      </div>
    </GraphContext.Provider>
  );
};

export const useGraphContext = () => {
  return useContext(GraphContext);
};

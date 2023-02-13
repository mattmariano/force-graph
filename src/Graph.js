import { useEffect, useRef } from "react";

import { useGraphContext } from "./GraphContext";

import ForceGraph3D from "3d-force-graph";

import {
  CSS2DRenderer,
  CSS2DObject
} from "three/examples/jsm/renderers/CSS2DRenderer";

const Graph = () => {
  const refContainer = useRef();
  const activeNode = useRef();

  const { refGraph, data } = useGraphContext();

  useEffect(() => {
    console.log("Initiate graph with initial elements");

    refGraph.current = ForceGraph3D({
      extraRenderers: [new CSS2DRenderer()]
    })(refContainer.current)
      .linkDirectionalParticles(2)
      .nodeAutoColorBy("user")
      .graphData(data)
      .onNodeDragEnd((node) => {
        node.fx = node.x;
        node.fy = node.y;
      })
      // .nodeVal((node) => node.id)
      // .nodeColor((node) => {
      //   if (activeNode.current.id === node.id) {
      //     return "white";
      //   }
      // })

      // .nodeThreeObjectExtend(true)
      .onNodeClick((node) => {
        const distance = 40;
        const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

        activeNode.current = node;

        refGraph.current.cameraPosition(
          {
            x: node.x * distRatio,
            y: node.y * distRatio,
            z: node.z * distRatio + 150
          },
          node,
          2000
        );
      });
  }, [refGraph, data]);

  return <div className="graph" ref={refContainer} />;
};
export default Graph;

import { genRandomTree, LargeGraph, SmallGraph } from "./DataSource";

export const useGetGraph = () => {
  const result = LargeGraph(100);

  const nodes = result.nodes.map((node) => {
    return {
      data: { id: node.id }
    };
  });

  const edges = result.links.map((edge) => {
    // source: "950642", target: "4062045"

    return {
      data: {
        id: `${edge.source} - ${edge.target}`,
        source: edge.source,
        target: edge.target
      }
    };
  });

  const error = false;

  return { data: result, error };
};

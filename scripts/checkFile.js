const graph = {
    A: [{ neighbor: 'B', weight: 10 }, { neighbor: 'C', weight: 3 }],
    B: [{ neighbor: 'C', weight: 1 }, { neighbor: 'D', weight: 2 }],
    C: [{ neighbor: 'B', weight: 4 }, { neighbor: 'D', weight: 8 }, { neighbor: 'E', weight: 2 }],
    D: [{ neighbor: 'E', weight: 7 }],
    E: [{ neighbor: 'D', weight: 9 }]
  };
  
function aStar(graph, start, goal) {
    // Set of unvisited nodes
    const unvisitedNodes = new Set(Object.keys(graph));
  
    // Set initial distance to infinity for all nodes except the starting node
    const distances = {};
    for (const node of unvisitedNodes) {
      distances[node] = Number.POSITIVE_INFINITY;
    }
    distances[start] = 0;
  
    // Set of visited nodes
    const visitedNodes = new Set();
  
    // Set the heuristic distance to the goal for all nodes
    const heuristicDistances = {};
    for (const node of unvisitedNodes) {
      heuristicDistances[node] = Number.POSITIVE_INFINITY;
    }
    heuristicDistances[goal] = 0;
  
    // Flag to indicate if the goal node has been reached
    let goalReached = false;
  
    // While there are unvisited nodes and the goal has not been reached
    while (unvisitedNodes.size > 0 && !goalReached) {
      // Select the unvisited node with the smallest distance + heuristic distance
      const currentNode = [...unvisitedNodes].sort((a, b) => distances[a] + heuristicDistances[a] - distances[b] - heuristicDistances[b])[0];
  
      // Check if we have reached the goal
      if (currentNode === goal) {
        goalReached = true;
        continue;
      }
  
      // Mark the current node as visited
      visitedNodes.add(currentNode);
      unvisitedNodes.delete(currentNode);
  
      // Update the distance to all neighbors
      for (const { neighbor, weight } of graph[currentNode]) {
        if (visitedNodes.has(neighbor)) continue;
        const newDistance = distances[currentNode] + weight;
        if (newDistance < distances[neighbor]) {
          distances[neighbor] = newDistance;
          heuristicDistances[neighbor] = Math.abs(neighbor.charCodeAt(0) - goal.charCodeAt(0)) + Math.abs(neighbor.charCodeAt(1) - goal.charCodeAt(1));
        }
      }
    }
  
    if (goalReached) {
      return distances[goal];
    } else {
      return Number.POSITIVE_INFINITY;
    }
}
async function greedyBestFirstSearch(start, end) {
    var maze = construct2dArray();
    var adjacentsDict = findAdjacents(maze);
    solved = false;
    // create a set to store the nodes we've already visited
    let visited = new Set();
    // create an object to store the path taken to reach the end node
    let cameFrom = {};
    // create an array to store the nodes we need to visit
    let openSet = [start];
  
    // create a function to calculate the distance between two points
    function heuristic(a, b) {
      // use the Euclidean distance formula to calculate the distance
    //   return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
    return Math.abs(a[0] - a[1]) + Math.abs(b[0] - b[1]);
    }
  
    // loop until there are no more nodes to visit
    while (openSet.length > 0) {
        var maze = construct2dArray();
        var adjacentsDict = findAdjacents(maze);
      // find the node in the open set with the lowest heuristic value
      let current = openSet.reduce((acc, node) => {
        if (!acc || heuristic(node, end) < heuristic(acc, end)) {
          return node;
        } else {
          return acc;
        }
      }, null);
  
      // if the current node is the end node, we're done
      if (current == end) {
        solved = true;
        break;
        return reconstructPath(cameFrom, end);
      }
  
      // remove the current node from the open set
      openSet = openSet.filter((node) => node !== current);
      // add the current node to the visited set
      visited.add(current);
  
      // get the neighbors of the current node
      //   const neighbors = getNeighbors(grid, current);

      var adj = adjacentsDict[current];
        for(count = 0; count < adj.length; count++){
            //   document.getElementById('node' + goalNodeNumber).style.backgroundColor = GOAL_NODE_COLOR; // prevents goal node disappear glitch
            var n = adj[count];
              
            // prev.set(maze[n[0]][n[1]], currentNode);
            if(visited.has(maze[n[0]][n[1]])){
                continue;
            }
            openSet.push(maze[n[0]][n[1]]);
            cameFrom[maze[n[0]][n[1]]] = current;
            if(maze[n[0]][n[1]] == end){
                solved = true;
                break;
                return reconstructPath(cameFrom, end);
            }
            document.getElementById('node' + maze[n[0]][n[1]]).style.backgroundColor = EDGE_NODE_COLOR;
            await sleep(1);
            document.getElementById('node' + maze[n[0]][n[1]]).style.backgroundColor = SEARCH_NODE_COLOR;
        }
        if(solved){
            break;
        }
    }

    // if we reach this point, it means we've searched the entire grid and haven't found a path
    return null;
  }
// #region GREEDY_BEST_FIRST_SEARCH
document.querySelector('a#buttonGreedy_BFS').addEventListener('click', function(e){
    var nodes = findStartAndGoalNode(); 
    if(nodes.length < 2){
        alert('You need to provide start and goal nodes!');
        return;
    }
    let startNodeNumber = Node.GetNodeNumber(nodes[0].id);
    let goalNodeNumber = Node.GetNodeNumber(nodes[1].id);

    greedyBestFirstSearch(startNodeNumber, goalNodeNumber);
});
// async function greedyBestFirstSearch(start, end) {
//     var maze = construct2dArray();
//     var adjacentsDict = findAdjacents(maze);
//     solved = false;
//     // create a set to store the nodes we've already visited
//     let visited = new Set();
//     // create an object to store the path taken to reach the end node
//     let cameFrom = {};
//     // create an array to store the nodes we need to visit
//     let openSet = [start];
  
//     // create a function to calculate the distance between two points
//     function heuristic(a, b) {
//       // use the Euclidean distance formula to calculate the distance
//     //   return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
//     return Math.abs(a[0] - a[1]) + Math.abs(b[0] - b[1]);
//     }
  
//     // loop until there are no more nodes to visit
//     while (openSet.length > 0) {
//         var maze = construct2dArray();
//         var adjacentsDict = findAdjacents(maze);
//       // find the node in the open set with the lowest heuristic value
//       let current = openSet.reduce((acc, node) => {
//         if (!acc || heuristic(node, end) < heuristic(acc, end)) {
//           return node;
//         } else {
//           return acc;
//         }
//       }, null);
  
//       // if the current node is the end node, we're done
//       if (current == end) {
//         solved = true;
//         break;
//         return reconstructPath(cameFrom, end);
//       }
  
//       // remove the current node from the open set
//       openSet = openSet.filter((node) => node !== current);
//       // add the current node to the visited set
//       visited.add(current);
  
//       // get the neighbors of the current node
//       //   const neighbors = getNeighbors(grid, current);

//       var adj = adjacentsDict[current];
//         for(count = 0; count < adj.length; count++){
//             //   document.getElementById('node' + goalNodeNumber).style.backgroundColor = GOAL_NODE_COLOR; // prevents goal node disappear glitch
//             var n = adj[count];
              
//             // prev.set(maze[n[0]][n[1]], currentNode);
//             if(visited.has(maze[n[0]][n[1]])){
//                 continue;
//             }
//             openSet.push(maze[n[0]][n[1]]);
//             cameFrom[maze[n[0]][n[1]]] = current;
//             if(maze[n[0]][n[1]] == end){
//                 solved = true;
//                 break;
//                 return reconstructPath(cameFrom, end);
//             }
//             document.getElementById('node' + maze[n[0]][n[1]]).style.backgroundColor = EDGE_NODE_COLOR;
//             await sleep(1);
//             document.getElementById('node' + maze[n[0]][n[1]]).style.backgroundColor = SEARCH_NODE_COLOR;
//         }
//         if(solved){
//             break;
//         }
//     }

//     // if we reach this point, it means we've searched the entire grid and haven't found a path
//     return null;
//   }
async function greedyBestFirstSearch(start, goal) {
    var maze = construct2dArray();
    var adjacentsDict = findAdjacents(maze);
    var solved = false;
    let stack = [];
    let visited = [];
    for(let i = 0; i < HEIGHT; i++){
        visited[i] = new Array(WIDTH).fill(false);
    }
    var prev = new Array(HEIGHT * WIDTH).fill(0);
    stack.push(start);
    let coordinates = getNodeCoordinates(start);
    visited[coordinates[0]][coordinates[1]] = true;
    
    // While there are unvisited nodes
    while (stack.length > 0/*unvisitedNodes.size > 0*/) {
        let neighboursDistance = {};
        var maze = construct2dArray();
        var adjacentsDict = findAdjacents(maze);

        let currentNode = stack.pop();
        // Check if we have reached the goal
        if(currentNode == goal){
            solved = true;
            break;
        }
    
        // Mark the current node as visited
        let coordinates = getNodeCoordinates(currentNode);
        visited[coordinates[0]][coordinates[1]] = true;

        const index = stack.indexOf(currentNode);
        if (index > -1) { // only splice array when item is found
            stack.splice(index, 1); // 2nd parameter means remove one item only
        }
        
        var adj = adjacentsDict[currentNode];
        for(count = 0; count < adj.length; count++){
              document.getElementById('node' + start).style.backgroundColor = START_NODE_COLOR; // prevents goal node disappear glitch
            var n = adj[count];
            if(!visited[n[0]][n[1]]){
                neighboursDistance[maze[n[0]][n[1]]] = heuristicFunction(getNodeCoordinates(maze[n[0]][n[1]]), getNodeCoordinates(goal));
            }
        }
        console.log('----------------------------');
        // checking if length is zero
        if(Object.keys(neighboursDistance).length == 0){
            break;
        }
        var keys  = Object.keys(neighboursDistance).sort(function(a,b) { return neighboursDistance[a] - neighboursDistance[b]; });
        var smallestDistanceNode = keys[0];

        prev[smallestDistanceNode - 1] = currentNode - 1;
        stack.push(smallestDistanceNode);
        
        coordinates = getNodeCoordinates(smallestDistanceNode);
        visited[coordinates[0]][coordinates[1]] = true;

        document.getElementById('node' + smallestDistanceNode).style.backgroundColor = EDGE_NODE_COLOR;
        await sleep(1);
        document.getElementById('node' + smallestDistanceNode).style.backgroundColor = SEARCH_NODE_COLOR;

        if(smallestDistanceNode == goal){
            solved = true;
            break;
        }

        if(solved){
            break;
        }
    }

    if(!solved){
        alert('Impossible to solve! I will reset it.');
        return;
    }

    let loopControl = false;
    goalToStart = []; // gathers nodes from goal to start node by grabbing the previous nodes
    previous = goal - 1;
    goalToStart.push(previous);
    
    while(true){
        let node = prev[previous];
        goalToStart.push(node);

        if(node == 0) loopControl = true;
        else previous = node;

        if(loopControl){
            break;
        }
    }
    console.log('goalToStart : ', goalToStart);
    for(node of goalToStart.reverse()){ //goalToStart.reverse() gives nodes sorted from start to node
        await sleep(25);
        try{
            if(node != 0){
                let n = document.getElementById('node' + (node + 1));
                n.style.backgroundColor = RED_COLOR
                await sleep(1);
                n.style.backgroundColor = ORANGE_COLOR;
                await sleep(1);
                n.style.backgroundColor = PATH_COLOR;
            }
        }catch(err){
            loopControl = true;
        }
        document.getElementById('node' + start).style.backgroundColor = START_NODE_COLOR;
        document.getElementById('node' + goal).style.backgroundColor = GOAL_NODE_COLOR;
    }
}
async function reconstructPath(cameFrom, current) {
    // base case: if the current node has no predecessor, we're at the start node
    if (!(current in cameFrom)) {
      return [current];
    }
    document.getElementById('node' + current).style.backgroundColor = EDGE_NODE_COLOR;
    await sleep(1);
    document.getElementById('node' + current).style.backgroundColor = SEARCH_NODE_COLOR;
    // recursive case: get the path from the start node to the current node's predecessor
    let path = reconstructPath(cameFrom, cameFrom[current]);
    // add the current node to the path
    
    path.push(current);
    // return the path
    return path;
  }
// #endregion
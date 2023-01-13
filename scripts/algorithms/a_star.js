// #region A_STAR_ALGORITHM 
/* --------------------A* algorithm---------------------------*/
document.querySelector('a#buttonA_star').addEventListener('click', function(e){
    var nodes = findStartAndGoalNode(); 
    if(nodes.length < 2){
        alert('You need to provide start and goal nodes!');
        return;
    }
    let startNodeNumber = Node.GetNodeNumber(nodes[0].id);
    let goalNodeNumber = Node.GetNodeNumber(nodes[1].id);
    disablePointerActions();
    solveAstar(startNodeNumber, goalNodeNumber);
});
async function solveAstar(start, goal) {
    var maze = construct2dArray();
    var adjacentsDict = findAdjacents(maze);
    var solved = false;
    // var prev = new Map();
    let queue = []
    var prev = new Array(HEIGHT * WIDTH).fill(0);
    // Set of unvisited nodes
    const unvisitedNodes = new Set();
  
    // Set initial distance to infinity for all nodes except the starting node
    const distances = {};

    for(let i = 0; i < HEIGHT * WIDTH; i++){
        distances[i] = Number.POSITIVE_INFINITY;
        unvisitedNodes.add(i + 1);
    }
    distances[start] = 0;
    queue.push(start);
    // Set of visited nodes
    const visitedNodes = new Set();
  
    // Set the heuristic distance to the goal for all nodes
    const heuristicDistances = {};
    for (const node of unvisitedNodes) {
      heuristicDistances[node] = Number.POSITIVE_INFINITY;
    }
    heuristicDistances[goal] = 0;
    heuristicDistances[start] = heuristicFunction(getNodeCoordinates(start), getNodeCoordinates(goal));
    // While there are unvisited nodes
    while (queue.length > 0/*unvisitedNodes.size > 0*/) {
        var maze = construct2dArray();
        var adjacentsDict = findAdjacents(maze);
        // Select the unvisited node with the smallest distance + heuristic distance
        const currentNode = [...unvisitedNodes].sort((a, b) => distances[a] + heuristicDistances[a] - distances[b] - heuristicDistances[b])[0];
        
        // Check if we have reached the goal
        if(currentNode == goal){
            solved = true;
            break;
        }
    
        // Mark the current node as visited
        visitedNodes.add(currentNode);
        unvisitedNodes.delete(currentNode);
        const index = queue.indexOf(currentNode);
        if (index > -1) { // only splice array when item is found
            queue.splice(index, 1); // 2nd parameter means remove one item only
        }

        var adj = adjacentsDict[currentNode];
        for(count = 0; count < adj.length; count++){
            //   document.getElementById('node' + goalNodeNumber).style.backgroundColor = GOAL_NODE_COLOR; // prevents goal node disappear glitch
            var n = adj[count];
              
            // prev.set(maze[n[0]][n[1]], currentNode);
            if(visitedNodes.has(maze[n[0]][n[1]])){
                continue;
            }
            // (Math.floor(Math.random() * 50000) + 20000); generates value between 20000 and 50000
            let newDistance = undefined;
            let nod = document.getElementById('node' + maze[n[0]][n[1]]);
            if(nod.style.backgroundColor == WEIGHTED_NODE_COLOR){
                newDistance = distances[currentNode] + (Math.floor(Math.random() * 50000) + 20000);
            }else{
                newDistance = distances[currentNode] + 1;
            }
            
            if (newDistance < distances[maze[n[0]][n[1]]]) {
                distances[maze[n[0]][n[1]]] = newDistance;
                heuristicDistances[maze[n[0]][n[1]]] = heuristicFunction(getNodeCoordinates(maze[n[0]][n[1]]), getNodeCoordinates(goal));
                prev[maze[n[0]][n[1]] - 1] = currentNode - 1;
                queue.push(maze[n[0]][n[1]]);
                if(maze[n[0]][n[1]] == goal){
                    solved = true;
                    break;
                }
                document.getElementById('node' + maze[n[0]][n[1]]).style.backgroundColor = EDGE_NODE_COLOR;
                await sleep(1);
                document.getElementById('node' + maze[n[0]][n[1]]).style.backgroundColor = SEARCH_NODE_COLOR;
            } 
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
function heuristicFunction(a, b) {
    // return Math.abs(a[0] - a[1]) + Math.abs(b[0] - b[1]);
    return a
        .map((x, i) => Math.abs( x - b[i] ) ** 2) // square the difference
        .reduce((sum, now) => sum + now) // sum
        ** (1/2)
}
/* ------------------------------------------------------------*/
// #endregion
/* --------------------Greedy Best-First search algorithm---------------------------*/
document.querySelector('a#buttonGreedy_BFS').addEventListener('click', function(e){
    ClearSearchPath();
    var nodes = findStartAndGoalNode(); 
    if(nodes[0] == null || nodes[1] == null){
        showWarningToast('You need to provide start and goal nodes!');
        return;
    }
    let startNodeNumber = Node.GetNodeNumber(nodes[0].id);
    let goalNodeNumber = Node.GetNodeNumber(nodes[1].id);
    disablePointerActions();
    greedyBestFirstSearch(startNodeNumber, goalNodeNumber);
});
async function greedyBestFirstSearch(start, goal) {
    const startTimer = performance.now();
    var maze = construct2dArray();
    var adjacentsDict = findAdjacents(maze);
    var solved = false;
    let queue = [];
    var prev = new Array(HEIGHT * WIDTH).fill(-1);
    const unvisitedNodes = new Set();
    const visitedNodes = new Set();

    for(let i = 0; i <= HEIGHT * WIDTH; i++){ unvisitedNodes.add(i + 1); }
    queue.push(start);
  
    // Set the heuristic distance to the goal for all nodes
    const heuristicDistances = {};
    for (const node of unvisitedNodes) { heuristicDistances[node] = Number.POSITIVE_INFINITY; }
    heuristicDistances[start] = heuristicFunction(getNodeCoordinates(start), getNodeCoordinates(goal));

    // While there are unvisited nodes
    while (queue.length > 0) {
        queue = queue.filter((item, index) => {return queue.indexOf(item) === index;});
        await sleep(SLEEP_VALUE);

        // Select the unvisited node with the smallest distance + heuristic distance
        const currentNode = [...unvisitedNodes].sort((a, b) => heuristicDistances[a] - heuristicDistances[b])[0];
        
        // Check if we have reached the goal
        if(currentNode == goal){
            solved = true;
            break;
        }
    
        // Mark the current node as visited
        visitedNodes.add(currentNode);

        if(isNodeWeighted(currentNode))
            drawWeightedVisitedNodeA(currentNode, start);
        else
            drawVisitedNodeA(currentNode, start);
            
        unvisitedNodes.delete(currentNode);

        const index = queue.indexOf(currentNode);
        if (index > -1) { // only splice array when item is found
            queue.splice(index, 1); // 2nd parameter means remove one item only
        }

        var adj = adjacentsDict[currentNode];
        for(count = 0; count < adj.length; count++){
            var n = adj[count];
            if(visitedNodes.has(maze[n[0]][n[1]])){
                continue;
            }
            heuristicDistances[maze[n[0]][n[1]]] = heuristicFunction(getNodeCoordinates(maze[n[0]][n[1]]), getNodeCoordinates(goal));
            prev[maze[n[0]][n[1]] - 1] = currentNode - 1;
            queue.push(maze[n[0]][n[1]]);
        }
        if(solved){
            break;
        }
    }

    if(!solved){
        showErrorToast('Impossible to solve!');
        enablePointerActions();
    }else if (solved){
        const endTimer = performance.now();
        let noPathNodes = await reconstructPath(goal, prev);
        showSuccessToast('Algorithm is successfully executed.');
        showInfoToast('Greedy BFS', noPathNodes, endTimer - startTimer);
    }
}
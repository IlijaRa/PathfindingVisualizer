/* --------------------Greedy Best-First search algorithm---------------------------*/
document.querySelector('a#buttonGreedy_BFS').addEventListener('click', function(e){
    var nodes = findStartAndGoalNode(); 
    if(nodes[0] == null || nodes[1] == null){
        alert('You need to provide start and goal nodes!');
        return;
    }
    let startNodeNumber = Node.GetNodeNumber(nodes[0].id);
    let goalNodeNumber = Node.GetNodeNumber(nodes[1].id);
    disablePointerActions();
    greedyBestFirstSearch(startNodeNumber, goalNodeNumber);
});
async function greedyBestFirstSearch(start, goal) {
    var maze = construct2dArray();
    var adjacentsDict = findAdjacents(maze);
    var solved = false;
    var prev = new Array(HEIGHT * WIDTH).fill(0);
    let stack = [];
    let visited = new Array(HEIGHT * WIDTH).fill(false);

    for(let i = 0; i < HEIGHT; i++){ visited[i] = new Array(WIDTH).fill(false); }
    
    stack.push(start);
    
    // While there are unvisited nodes
    while (stack.length > 0) {
        await sleep(0);
        let neighboursDistance = {};

        let currentNode = stack.pop();

        // Check if we have reached the goal
        if(currentNode == goal){
            solved = true;
            break;
        }

        visited[currentNode] = true;

        const index = stack.indexOf(currentNode);
        if (index > -1) { // only splice array when item is found
            stack.splice(index, 1); // 2nd parameter means remove one item only
        }
        
        var adj = adjacentsDict[currentNode];
        for(count = 0; count < adj.length; count++){
            var n = adj[count];
            if(!visited[maze[n[0]][n[1]]]){
                neighboursDistance[maze[n[0]][n[1]]] = heuristicFunction(getNodeCoordinates(maze[n[0]][n[1]]), getNodeCoordinates(goal));
            }
        }
        // checking if length is zero
        if(Object.keys(neighboursDistance).length == 0){
            break;
        }
        var keys  = Object.keys(neighboursDistance).sort(function(a,b) { return neighboursDistance[a] - neighboursDistance[b]; });
        var smallestDistanceNode = keys[0];

        prev[smallestDistanceNode - 1] = currentNode - 1;
        stack.push(smallestDistanceNode);

        visited[smallestDistanceNode] = true;
        drawVisitedNodeOne(smallestDistanceNode, start);

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
    reconstructPath(goal, prev);
    enablePointerActions();
}
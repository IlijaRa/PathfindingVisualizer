/* --------------------DIJKSTRA algorithm---------------------------*/
document.querySelector('a#buttonDijkstra').addEventListener('click', function(e){
    var nodes = findStartAndGoalNode(); 
    if(nodes[0] == null || nodes[1] == null){
        showWarningToast('You need to provide start and goal nodes!');
        return;
    }
    ClearSearchPath();
    isAlgorithmFinished = 0;
    ACTIVE_ALGORITHM = "Dijkstra";
    let startNodeNumber = Node.GetNodeNumber(nodes[0].id);
    let goalNodeNumber = Node.GetNodeNumber(nodes[1].id);
    disablePointerActions();
    solveDijkstra(startNodeNumber, goalNodeNumber);
});
async function solveDijkstra(startNodeNumber, goalNodeNumber) {
    const startTimer = performance.now();
    var maze = construct2dArray();
    var adjacentsDict = findAdjacents(maze);
    var solved = false;
    let queue = [];
    var prev = new Array(HEIGHT * WIDTH).fill(-1);
    const unvisitedNodes = new Set();
    const visitedNodes = new Set();
    const distances = {};

    for(let i = 0; i <= HEIGHT * WIDTH; i++){ distances[i] = Number.POSITIVE_INFINITY; unvisitedNodes.add(i + 1); }
    distances[startNodeNumber] = 0;
    queue.push(startNodeNumber);

    // While there are unvisited nodes
    while (queue.length > 0) {
        await sleep(SLEEP_VALUE);

        // Select the unvisited node with the smallest distance
        const currentNode = [...unvisitedNodes].sort((a, b) => distances[a] - distances[b])[0];

        // Check if we have reached the goal
        if(currentNode == goalNodeNumber){
            solved = true;
            break;
        }

        // Mark the current node as visited
        visitedNodes.add(currentNode);
        
        if(isNodeWeighted(currentNode))
            drawWeightedVisitedNodeA(currentNode, startNodeNumber);
        else
            drawVisitedNodeA(currentNode, startNodeNumber);

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
            // WEIGHT_VALUE adds value between 2 and 20, depending on what user entered
            let newDistance = null;
            let currNode = document.getElementById('node' + maze[n[0]][n[1]]);
            if(currNode.classList.contains('weighted-node')){
                newDistance = distances[currentNode] + parseInt(currNode.children[0].innerText);//WEIGHT_VALUE; 
            }else{
                newDistance = distances[currentNode] + 1;
            }

            if (newDistance < distances[maze[n[0]][n[1]]]) {
                distances[maze[n[0]][n[1]]] = newDistance;
                prev[maze[n[0]][n[1]] - 1] = currentNode - 1;
                queue.push(maze[n[0]][n[1]]);
            } 
        }
        if(solved){
            break;
        }
    }
    
    if(!solved){
        showErrorToast('Impossible to solve!');
        enablePointerActions();
    }else if(solved){
        const endTimer = performance.now();
        let noPathNodes = await reconstructPath(goalNodeNumber, prev);
        showSuccessToast('Algorithm is successfully executed.');
        showInfoToast(ACTIVE_ALGORITHM, noPathNodes, endTimer - startTimer);
        isAlgorithmFinished = 1;
    }
}

function solveDijkstraRealTime(){
    var nodes = findStartAndGoalNode(); 
    if(nodes[0] == null || nodes[1] == null){
        showWarningToast('You need to provide start and goal nodes!');
        return;
    }
    ClearSearchPathRealTime();
    let startNodeNumber = Node.GetNodeNumber(nodes[0].id);
    let goalNodeNumber = Node.GetNodeNumber(nodes[1].id);

    var maze = construct2dArray();
    var adjacentsDict = findAdjacents(maze);
    var solved = false;
    let queue = [];
    var prev = new Array(HEIGHT * WIDTH).fill(-1);
    const unvisitedNodes = new Set();
    const visitedNodes = new Set();
    const distances = {};

    for(let i = 0; i <= HEIGHT * WIDTH; i++){ distances[i] = Number.POSITIVE_INFINITY; unvisitedNodes.add(i + 1); }
    distances[startNodeNumber] = 0;
    queue.push(startNodeNumber);

    while (queue.length > 0) {
        const currentNode = [...unvisitedNodes].sort((a, b) => distances[a] - distances[b])[0];

        if(currentNode == goalNodeNumber){
            solved = true;
            break;
        }

        visitedNodes.add(currentNode);
        
        if(isNodeWeighted(currentNode))
            drawWeightedVisitedNodeA(currentNode, startNodeNumber);
        else
            drawVisitedNodeA(currentNode, startNodeNumber);

        unvisitedNodes.delete(currentNode);

        const index = queue.indexOf(currentNode);
        if (index > -1) {
            queue.splice(index, 1);
        }

        var adj = adjacentsDict[currentNode];
        for(count = 0; count < adj.length; count++){
            var n = adj[count];
            if(visitedNodes.has(maze[n[0]][n[1]])){
                continue;
            }
            let newDistance = null;
            let currNode = document.getElementById('node' + maze[n[0]][n[1]]);
            if(currNode.classList.contains('weighted-node')){
                newDistance = distances[currentNode] + parseInt(currNode.children[0].innerText);//WEIGHT_VALUE; 
            }else{
                newDistance = distances[currentNode] + 1;
            }

            if (newDistance < distances[maze[n[0]][n[1]]]) {
                distances[maze[n[0]][n[1]]] = newDistance;
                prev[maze[n[0]][n[1]] - 1] = currentNode - 1;
                queue.push(maze[n[0]][n[1]]);
            } 
        }
        if(solved){
            break;
        }
    }
    
    if(!solved){
        showErrorToast('Impossible to solve!');
        enablePointerActions();
    }else if(solved){
        reconstructPathRealTime(goalNodeNumber, prev);
    }
}
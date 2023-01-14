/* --------------------DIJKSTRA algorithm---------------------------*/
document.querySelector('a#buttonDijkstra').addEventListener('click', function(e){
    var nodes = findStartAndGoalNode(); 
    if(nodes[0] == null || nodes[1] == null){
        alert('You need to provide start and goal nodes!');
        return;
    }
    let startNodeNumber = Node.GetNodeNumber(nodes[0].id);
    let goalNodeNumber = Node.GetNodeNumber(nodes[1].id);
    disablePointerActions();
    solveDijkstra(startNodeNumber, goalNodeNumber);
});
async function solveDijkstra(startNodeNumber, goalNodeNumber) {
    var maze = construct2dArray();
    var adjacentsDict = findAdjacents(maze);
    var solved = false;
    let queue = []
    var prev = new Array(HEIGHT * WIDTH).fill(0);
    const unvisitedNodes = new Set();
    const visitedNodes = new Set();
    const distances = {};

    for(let i = 0; i <= HEIGHT * WIDTH; i++){ distances[i] = Number.POSITIVE_INFINITY; unvisitedNodes.add(i + 1); }
    distances[startNodeNumber] = 0;
    queue.push(startNodeNumber);

    // While there are unvisited nodes
    while (queue.length > 0) {
        await sleep(0);

        // Select the unvisited node with the smallest distance
        const currentNode = [...unvisitedNodes].sort((a, b) => distances[a] - distances[b])[0];

        // Check if we have reached the goal
        if(currentNode == goalNodeNumber){
            solved = true;
            break;
        }

        // Mark the current node as visited
        visitedNodes.add(currentNode);
        drawVisitedNodeOne(currentNode, startNodeNumber);
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
            // (Math.floor(Math.random() * 50) + 5); generates value between 5 and 50
            let newDistance = null;
            if(document.getElementById('node' + maze[n[0]][n[1]]).classList.contains('weighted-node')){
                newDistance = distances[currentNode] + (Math.floor(Math.random() * 50) + 5);
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
        alert('Impossible to solve! I will reset it.');
        return;
    }
    reconstructPath(goalNodeNumber, prev);
    enablePointerActions();
}